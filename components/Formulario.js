import React, { useState, useEffect, useRef } from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { colores } from '../config/colores';
import AsyncStorage from '@react-native-async-storage/async-storage';


const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;

const Formulario = ({ navigation }) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [sueldo, setSueldo] = useState(0);
    const [empleados, setEmpleados] = useState([]);
    const [numEmpleados, setNumEmpleados] = useState(0);

    //Manejadores de Ref de Input
    const inputNombre = useRef();
    const inputApellido = useRef();
    const inputSueldo = useRef();

    useEffect(() => {
        const AgregarEmpleado = async () => {
            if (numEmpleados > 0) {
                try {
                    // console.log('Guardando empleado...');
                    let renta = 0;
                    if (sueldo <= 325) {
                        renta = 0;
                    } else if (sueldo > 325 && sueldo <= 700) {
                        renta = sueldo * (15 / 100);
                    } else if (sueldo > 700 && sueldo <= 1200) {
                        renta = sueldo * (17 / 100);
                    } else if (sueldo > 1200 && sueldo <= 2200) {
                        renta = sueldo * (21 / 100);
                    } else if (sueldo > 2200 && sueldo <= 3700) {
                        renta = sueldo * (25 / 100);
                    } else {
                        renta = sueldo * (29 / 100);
                    }

                    let seguro = sueldo * (3 / 100);
                    seguro = seguro.toFixed(2);
                    let pension = sueldo * (7.25 / 100);
                    pension = pension.toFixed(2);
                    let neto = sueldo - renta - seguro - pension;
                    neto = neto.toFixed(2);
                    renta = renta.toFixed(2);

                    let tempEmpleado = {
                        nombre: nombre,
                        apellido: apellido,
                        sueldo: sueldo,
                        renta: renta,
                        pension: pension,
                        seguro: seguro,
                        neto: neto
                    }
                    // console.log('Info del empleado:', tempEmpleado);
                    setEmpleados([...empleados, tempEmpleado])
                } catch (e) {
                    console.log('Ocurrio un error:', e);
                }
            }
        };
        AgregarEmpleado();

    }, [numEmpleados]);

    useEffect(() => {
        if (empleados.length > 0) {
            // console.log('Empleados actuales:', empleados);
            inputNombre.current.clear();
            inputApellido.current.clear();
            inputSueldo.current.clear();
            inputNombre.current.focus();
            Alert.alert(
                'Empleados en Planilla',
                'Empleado agregado con exito',
                [
                    {
                        text: 'Aceptar',
                        onPress: () => {
                            console.log(numEmpleados);
                        },
                        style: 'default',
                    },
                ],
            );
        }
    }, [empleados])

    const AumentarNumEmpleados = () => {
        setNumEmpleados(numEmpleados => numEmpleados + 1);
    }

    const GuardarDatosFormulario = async () => {
        try {
            // console.log('Guardando datos...');
            const planilla = JSON.stringify(empleados);
            await AsyncStorage.setItem('planilla', planilla);
            // console.log('Datos guardados...');
            navigation.navigate("Resultados");
        } catch (e) {
            console.log('Ocurrio un error:', e);
        }
    };

    return (

        <ContenedorPrincipal titulo="Ejercicio Planilla"
            navigation={navigation}

            contenido={(
                <>
                    <View style={styles.container}>
                        <Text style={styles.letraTitulo}>Complete los formularios</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Nombre:</Text>
                            <TextInput
                                ref={inputNombre}
                                placeholder="Nombres"
                                onChangeText={text => setNombre(text)}
                                style={styles.input}
                                required
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Apellido:</Text>
                            <TextInput
                                ref={inputApellido}
                                placeholder="Apellido"
                                onChangeText={text => setApellido(text)}
                                style={styles.input}
                                required
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Sueldo:</Text>
                            <TextInput
                                ref={inputSueldo}
                                placeholder="Sueldo"
                                onChangeText={text => setSueldo(text)}
                                style={styles.input}
                                keyboardType="numeric"
                                required
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}
                                onPress={AumentarNumEmpleados}>
                                <Text style={styles.buttonText}>Agregar a planilla</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}
                                onPress={GuardarDatosFormulario}>
                                <Text style={styles.buttonText}>Ver calculo de planilla</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}></ContenedorPrincipal>

    );
}

export default Formulario

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    containerIzquierdo: {
        justifyContent: "flex-start",
        padding: 5,
    },
    inputContainer: {
        width: "80%",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        justifyContent: "space-evenly",
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: colores.fondoBarras,
        width: "100%",
        padding: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: colores.letra,
        fontSize: 16,
    },
    letraTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: colores.letra,
    },
    letra: {
        fontSize: 16,
        color: colores.letra,
    },
    cabeceraMensaje: {
        backgroundColor: colores.fondoBarras,
        height: cabeceraMensajeHeight,
        padding: cabeceraMensajePadding,
        marginTop: cabeceraMensajeMargin,
        alignItems: "center",
        alignContent: "center",
    },
});

