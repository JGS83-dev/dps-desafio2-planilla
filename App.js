import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
LogBox
} from 'react-native';
import Formulario from './components/Formulario';
import Resultados from './components/Resultados';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Formulario">
        <Stack.Screen options={{ headerShown: false }} name="Formulario" component={Formulario} />
        <Stack.Screen options={{ headerShown: false }} name="Resultados" component={Resultados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
