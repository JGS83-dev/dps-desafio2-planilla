import React from 'react';
import ContenedorPrincipal from './ContenedorPrincipal';
import {
    Text,
    StyleSheet
} from 'react-native';
import { colores } from '../config/colores';

const Resultados = ({ navigation }) => {
    return (

        <ContenedorPrincipal titulo="Resultados"
            navigation={navigation}
            contenido={(
                <Text style={styles.letra}>Resultados</Text>
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

