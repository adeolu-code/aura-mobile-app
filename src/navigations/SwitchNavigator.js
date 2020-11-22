/* eslint-disable prettier/prettier */
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import React from 'react';

import AppNavigator from "./AppNavigation";
import SplashScreen from "./../screens/splash_screen/splashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// const SwitchNavigator = createSwitchNavigator();
const Stack = createStackNavigator();

export function SwitchStack() {
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="AppNavigator" options={{ gestureEnabled: true }}>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
    );
}

// export default createAppContainer(SwitchNavigator);