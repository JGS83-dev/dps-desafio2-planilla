import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet
} from 'react-native';
import { colores } from '../config/colores';

const Formulario = ({navigation}) => {
    return (
        
            <ContenedorPrincipal titulo="Formulario"
            navigation={navigation} 
            contenido={(
                <Text style={styles.letra}>Formulario</Text>
            )}></ContenedorPrincipal>
        
    );
}

export default Formulario

const styles = StyleSheet.create({
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    }
});

