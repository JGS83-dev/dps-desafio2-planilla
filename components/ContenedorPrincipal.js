import { colores } from "../config/colores"
import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquarePollVertical,faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const screenHeight = Dimensions.get('window').height;
const iconSize = 0.06 * screenHeight;
const headerHeight = 0.08 * screenHeight;
const headerPadding = 0.02 * screenHeight;
const footerHeight = 0.08 * screenHeight;
const footerPadding = 0.03 * screenHeight;

const ContenedorPrincipal = (props) => {

    const { titulo, contenido, navigation } = props;

    const IrAFormulario = () => {
        navigation.navigate("Formulario")
    }
    
    const IrAResultados = () => {
        navigation.navigate("Resultados")
    }

    return (
        <>
            <SafeAreaView style={styles.Cabecera}>
                <Text style={styles.letra}>{titulo}</Text>
            </SafeAreaView>

            <View style={styles.container}>
                <View style={styles.content}>
                    {contenido}
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={IrAFormulario}>
                        <FontAwesomeIcon icon={faPenToSquare} size={iconSize} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={IrAResultados}>
                        <FontAwesomeIcon icon={faSquarePollVertical} size={iconSize} />
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )

}

export default ContenedorPrincipal

const styles = StyleSheet.create({
    Cabecera: {
        backgroundColor: colores.fondoBarras,
        height: headerHeight,
        alignItems: 'center',
        alignContent: 'center',
        padding: headerPadding
    },
    letra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colores.letra
    },
    footer: {
        backgroundColor: colores.fondoBarras,
        height: footerHeight,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: footerPadding,
        color: colores.letra
    },
    container: {
        flex: 1,
        backgroundColor: colores.fondo,
    },
    content: {
        flex: 1
    },
});
