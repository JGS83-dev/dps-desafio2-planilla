import React, { useState, useEffect } from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet,
    Alert,
    View
} from 'react-native';
import { colores } from '../config/colores';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Resultados = ({ navigation }) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [sueldo, setSueldo] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const CargarDatosFormulario = async () => {
            try {
                const nombreStorage = await AsyncStorage.getItem('nombre');
                const apellidoStorage = await AsyncStorage.getItem('apellido');
                const sueldoStorage = await AsyncStorage.getItem('sueldo');
                console.log("Leyendo datos...");
                console.log(nombreStorage);
                console.log(apellidoStorage);
                console.log(sueldoStorage);
                if (nombreStorage !== null && apellidoStorage !== null && sueldoStorage !== 0) {
                    await setNombre(nombreStorage);
                    await setApellido(apellidoStorage);
                    await setSueldo(sueldoStorage);
                    setIsLoading(false);
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

    return (

        <ContenedorPrincipal titulo="Resultados"
            navigation={navigation}
            contenido={(
                <>
                    {isLoading ? (<Text style={styles.letra}>Calculando Planilla...</Text>) :
                        (
                            <View>
                                <Text>Resultado</Text>
                            </View>
                        )}
                </>
            )}></ContenedorPrincipal>

    );
}

export default Resultados

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    }
});

