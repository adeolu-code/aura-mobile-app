import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import TabsScreen from './TabNavigation';

import SplashScreen from '../screens/splash_screen/splashScreen';
import InboxChat from '../screens/inbox/inboxChat';

import { OtherStack, AuthStack } from './OtherNavigation';
import EditProfile from '../screens/edit_profile/editProfile.screen';

const RootStack = createStackNavigator();

//all screens are registered here

function AppNavigator() {
  return (
    <RootStack.Navigator initialRouteName="Splash" options={{gestureEnabled: true}}>
      <RootStack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
      <RootStack.Screen name="Tabs" component={TabsScreen} options={{headerShown: false}} />
      <RootStack.Screen name="Auth" component={AuthStack} options={{headerShown: false}} />
      <RootStack.Screen name="Other" component={OtherStack} options={{headerShown: false}} />
      <RootStack.Screen name="InboxChat" component={InboxChat} options={{headerShown: false}} />
      <RootStack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />
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
