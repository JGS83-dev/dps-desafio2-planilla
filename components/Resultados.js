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
import { Table, Row, Rows } from 'react-native-table-component';
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
                // console.log(nombreStorage);
                // console.log(apellidoStorage);
                // console.log(sueldoStorage);
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
                
                  <View style={styless.container}>
                  <Text style={styles.letraTitulo}>Planilla</Text>
                  {isLoading ? (<Text style={styles.letra}>Calculando Planilla...</Text>) :
                        (
                            <ScrollView>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#171D26',backgroundColor:'black',}}>
                            <Row data={['Nombre','Apellido','Sueldo','Renta','AFP','ISSS','Neto']}  textStyle={{color:'#fff', margin: 10, fontWeight:'bold'}}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                            <Row data={['Wilfredo','Acosta','1000','90','12','23','900']} style={styless.head} textStyle={styless.text}/>
                    </Table>
                    </ScrollView>
                        )}
                    </View>
                   
                </>
            )}></ContenedorPrincipal>

    );
}

export default Resultados


const styless = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 7, 
        paddingTop: 30, 
        backgroundColor: '#313E50',
        justifyContent:'center',
    },
    head: { 
    height: 65, 
    backgroundColor: '#F2F4F7'
    },
    text: { 
        margin: 6 ,
        color:'#171D26'
    }
  });



const styles = StyleSheet.create({
    letra: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#171D26',
        textAlign:'center',
    },
    letraTitulo: {
        fontSize: 20,
        fontWeight: "bold",
        color: colores.letra,
        textAlign:'center',
        padding:5,
        marginBottom:5,
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
});

