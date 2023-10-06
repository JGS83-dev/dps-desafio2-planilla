import React, { useState } from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    TextInput,
    TouchableOpacity
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

    const GuardarDatosFormulario = async () => {
        try {
            console.log('Guardando datos...');
            await AsyncStorage.setItem('nombre', nombre);
            await AsyncStorage.setItem('apellido', apellido);
            await AsyncStorage.setItem('sueldo', sueldo.toString());
            console.log('Datos guardados...');
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
                                placeholder="Nombres"
                                onChangeText={text => setNombre(text)}
                                style={styles.input}
                            />
                        </View>


                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Apellido:</Text>
                            <TextInput
                                placeholder="Apellido"
                                onChangeText={text => setApellido(text)}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Sueldo:</Text>
                            <TextInput
                                placeholder="Sueldo"
                                onChangeText={text => setSueldo(text)}
                                style={styles.input}
                            />
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
        color: colores.letra
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

