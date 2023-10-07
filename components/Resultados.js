import React, { useState, useEffect } from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet,
    Alert,
    View,
    ScrollView
} from 'react-native';
import { colores } from '../config/colores';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row } from 'react-native-table-component';

const Resultados = ({ navigation }) => {

    const [planilla, setPlanilla] = useState([]);
    const cabecera = ['Nombre', 'Apellido', 'Sueldo', 'Renta', 'AFP', 'ISSS', 'Neto'];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const CargarDatosFormulario = async () => {
            try {
                const planillaStorage = await AsyncStorage.getItem('planilla');
                console.log("Leyendo datos...");
                if (planillaStorage !== null) {
                    setPlanilla(JSON.parse(planillaStorage));
                } else {
                    Alert.alert(
                        'Pasos requeridos',
                        'Debe completar el formulario',
                        [
                            {
                                text: 'Aceptar',
                                onPress: () => {
                                    console.log('Regresando a formulario');
                                    navigation.navigate("Formulario");
                                },
                                style: 'default',
                            },
                        ],
                    );
                }

            } catch (e) {
                console.log('Ocurrio un error:', e);
            }
        };
        CargarDatosFormulario();
    }, []);

    useEffect(() => {
        if (planilla.length > 0) {
            // console.log('Planilla:', planilla);
            setIsLoading(false);
        }
    }, [planilla])


    return (

        <ContenedorPrincipal titulo="Resultados"
            navigation={navigation}
            contenido={(
                <>
                    <View style={styles.container}>
                        <Text style={styles.letraTitulo}>Planilla</Text>
                        {isLoading ? (<Text style={styles.letra}>Calculando Planilla...</Text>) :
                            (
                                // <>
                                <ScrollView>
                                    <Table borderStyle={{ borderWidth: 2, borderColor: '#171D26', backgroundColor: 'black', }}>
                                        <Row data={cabecera} textStyle={styles.textHeader} />
                                        {
                                            planilla.map(ele => (
                                                <Row data={[ele.nombre, ele.apellido, `$${ele.sueldo}`, `$${ele.renta}`, `$${ele.pension}`, `$${ele.seguro}`, `$${ele.neto}`]} style={styles.head} textStyle={styles.text} />
                                            ))
                                        }
                                    </Table>
                                </ScrollView>
                                // </>
                            )}
                    </View>

                </>
            )}></ContenedorPrincipal>

    );
}

export default Resultados

const styles = StyleSheet.create({
    letra: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#171D26',
        textAlign: 'center',
    },
    letraTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: colores.letra,
        textAlign: 'center',
        padding: 5,
        marginBottom: 5,
    },
    desc: {
        fontSize: 20,
        color: '#F2F4F7'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    container: {
        flex: 1,
        padding: 7,
        paddingTop: 30,
        backgroundColor: '#313E50',
        justifyContent: 'center',
    },
    head: {
        height: 65,
        backgroundColor: '#F2F4F7'
    },
    text: {
        margin: 6,
        color: '#171D26'
    },
    textHeader: {
        color: '#fff',
        margin: 10,
        fontWeight: 'bold'
    }
});

