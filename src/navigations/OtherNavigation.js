/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeSingleScreen from '../screens/explore/HomeSingle';
import FoodSingleScreen from '../screens/explore/FoodSingle';
import PhotoSingleScreen from '../screens/explore/PhotoSingle';
import TourSingleScreen from '../screens/explore/TourSingle';

import SignUpScreen from '../screens/auth/signup';
import OtpScreen from '../screens/auth/OtpScreen';
import SuccessScreen from '../screens/auth/SuccessScreen';
import ListPropertyScreen from '../screens/auth/ListPropertyScreen';

const Stack = createStackNavigator();

export function OtherStack() {
    return (
        <Stack.Navigator initialRouteName="HouseSingle" options={{ gestureEnabled: true }}>
            <Stack.Screen name="HouseSingle" component={HomeSingleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FoodSingle" component={FoodSingleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotoSingle" component={PhotoSingleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSingle" component={TourSingleScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="SignUp" options={{ gestureEnabled: true }}>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
            <Stack.Screen name="Otp" component={OtpScreen} options={{headerShown: false}} />
            <Stack.Screen name="Success" component={SuccessScreen} options={{headerShown: false}} />
            <Stack.Screen name="List" component={ListPropertyScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}