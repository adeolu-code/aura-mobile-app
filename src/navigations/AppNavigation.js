import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TabsScreen from './TabNavigation';

import SplashScreen from '../screens/splash_screen/splashScreen';

const RootStack = createStackNavigator();

//all screens are registered here


function AppNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Tabs" options={{ gestureEnabled: true }}>
      <RootStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <RootStack.Screen name="Tabs" component={TabsScreen} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}

export default function App() {
  return <NavigationContainer><AppNavigator /></NavigationContainer>;
}
