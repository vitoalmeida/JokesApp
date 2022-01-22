// Importações React
import React from "react";

// Importações da biblioteca React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importações de telas
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import HomeScreen from "../screens/HomeScreen.js"

// Função que retorna Screen e Navigator, componentes para configurar o navegador
const Stack = createNativeStackNavigator();

// Estilização do header do navegador
const headerStyle = {
  headerTitle: "",
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0,
  },
};

// Estilização do componente
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
