import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    TextInput,
    Button
} from 'react-native';
import { colores } from '../config/colores';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get("window").height;
const cabeceraMensajeHeight = 0.07 * screenHeight;
const cabeceraMensajePadding = 0.01 * screenHeight;
const cabeceraMensajeMargin = 0.03 * screenHeight;
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [sueldo, setSueldo] = useState('');

const GuardarDatosFormulario = async () => {
    try {
        await AsyncStorage.setItem('nombre', nombre);
        await AsyncStorage.setItem('apellido', apellido);
        await AsyncStorage.setItem('sueldo', sueldo);
    } catch (e) {
        console.log('Ocurrio un error:', e)
    }
};

const Formulario = ({ navigation }) => {
    return (
        
            <ContenedorPrincipal titulo="Ejercicio Planilla"
            navigation={navigation} 

            contenido={(
                <>
                 <Text style={styles.letraTitulo}>Complete los formularios</Text>
                 <View style={styles.inputContainer}>
                <Text style={styles.letra}>Nombre:</Text>
                <TextInput
                  placeholder="Nombres"
                  style={styles.input}
                />
              </View>


              <View style={styles.inputContainer}>
                <Text style={styles.letra}>Apellido:</Text>
                <TextInput
                  placeholder="Apellido"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.letra}>Sueldo:</Text>
                <TextInput
                  placeholder="Sueldo"
                  style={styles.input}
                />
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

