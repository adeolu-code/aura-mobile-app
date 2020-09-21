import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import TabsScreen from './TabNavigation';

import SplashScreen from '../screens/splash_screen/splashScreen';
import SignUpScreen from '../screens/auth/signup';
import OtpScreen from '../screens/auth/OtpScreen';
import SuccessScreen from '../screens/auth/SuccessScreen';
import ListPropertyScreen from '../screens/auth/ListPropertyScreen';

import OtherStack from './OtherNavigation';

const RootStack = createStackNavigator();

//all screens are registered here

function AppNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Splash" options={{gestureEnabled: true}}>
      <RootStack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
      <RootStack.Screen name="Tabs" component={TabsScreen} options={{headerShown: false}} />
      <RootStack.Screen name="Auth" component={SignUpScreen} options={{headerShown: false}} />
      <RootStack.Screen name="Other" component={OtherStack} options={{headerShown: false}} />
      <RootStack.Screen name="Otp" component={OtpScreen} options={{headerShown: false}} />
      <RootStack.Screen name="Success" component={SuccessScreen} options={{headerShown: false}} />
      <RootStack.Screen name="List" component={ListPropertyScreen} options={{headerShown: false}} />
    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
