/* eslint-disable prettier/prettier */
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import TabsScreen from './TabNavigation';

import SplashScreen from '../screens/splash_screen/splashScreen';
import InboxChat from '../screens/inbox/inboxChat';

import { OtherStack, AuthStack } from './OtherNavigation';
import EditProfile from '../screens/edit_profile/editProfile.screen';
import SelectVerification from '../screens/account_verification/selectVerification.screen';
import UploadVerification from '../screens/account_verification/uploadVerification.screen';
import HostProperty from '../screens/host/hostProperty.screen';
import HostPropertyStack from './HostPropertyNavigation';
import AddProfilePicture from '../screens/edit_profile/addProfilePic.screen';
import VerifyPhoneNumber from '../screens/account_verification/verifyPhone.screen';

import VirtualLandingPageScreen from '../screens/VirtualLandingPage';
import VirtualRegistrationScreen from '../screens/VirtualRegistration';
import VirtualSuccessScreen from '../screens/VirtualSuccess';


import { PhotographStack, ExperienceStack, RestaurantStack } from './StackNavigation';

import { navigationRef, isReadyRef } from '../RootNavigation';


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
      <RootStack.Screen name="SelectVerification" component={SelectVerification} options={{headerShown: false}} />
      <RootStack.Screen name="UploadVerification" component={UploadVerification} options={{headerShown: false}} />
      <RootStack.Screen name="HostPropertyStack" component={HostPropertyStack} options={{headerShown: false}} />
      <RootStack.Screen name="PhotographStack" component={PhotographStack} options={{headerShown: false}} />
      <RootStack.Screen name="TourStack" component={ExperienceStack} options={{headerShown: false}} />
      <RootStack.Screen name="AddProfilePicture" component={AddProfilePicture} options={{headerShown: false}} />
      <RootStack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} options={{headerShown: false}} />
      <RootStack.Screen name="VirtualLandingPage" component={VirtualLandingPageScreen} options={{headerShown: false}} />
      <RootStack.Screen name="VirtualRegistration" component={VirtualRegistrationScreen} options={{headerShown: false}} />
      <RootStack.Screen name="VirtualSuccess" component={VirtualSuccessScreen} options={{headerShown: false}} />
      <RootStack.Screen name="RestaurantStack" component={RestaurantStack} options={{headerShown: false}} />

    </RootStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer ref={navigationRef} onReady={() => {
      isReadyRef.current = true;
    }} >
      <AppNavigator />
    </NavigationContainer>
  );
}
