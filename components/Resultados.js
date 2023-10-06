import React, { useState,useEffect } from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet,
    Alert
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
                 <Text style={styles.letra}>Resultados</Text>

                 <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Desc. Renta:</Text>
                            <Text style={styles.desc}>
                            Aqui aplica el descuento
                           </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Desc. ISSS:</Text>
                           <Text style={styles.desc}>
                            Aqui aplica el descuento
                           </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Desc. AFP:</Text>
                            <Text style={styles.desc}>
                            Aqui aplica el descuento
                           </Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.letra}>Sueldo neto:</Text>
                            <Text style={styles.desc}>
                            Aqui aplica el descuento
                           </Text>
                        </View>

                </>
            )}></ContenedorPrincipal>

    );
}

export default Resultados

const styles = StyleSheet.create({
    letra: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colores.letra
    },
    desc:{
        fontSize:30,
        color: colores.letra
    }
});

