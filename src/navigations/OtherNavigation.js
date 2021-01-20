/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeSingleScreen from '../screens/explore/HomeSingle';
import FoodSingleScreen from '../screens/explore/FoodSingle';
import PhotoSingleScreen from '../screens/explore/PhotoSingle';
import TourSingleScreen from '../screens/explore/TourSingle';

import TermsOfServiceScreen from '../screens/TermsOfService';
import HirePhotographersScreen from '../screens/HirePhotographer';

import FoodPaymentScreen from '../screens/explore/PaymentWebView';
import TourPaymentScreen from '../screens/explore/PaymentTourWebView';

import SignUpScreen from '../screens/auth/signup';
import OtpScreen from '../screens/auth/OtpScreen';
import SuccessScreen from '../screens/auth/SuccessScreen';
import ListPropertyScreen from '../screens/auth/ListPropertyScreen';
import LocationScreen from '../screens/auth/LocationScreen';
import AmenitiesScreen from '../screens/auth/AmenitiesHOC';
import SavedScreen from '../screens/auth/SavedScreen';
import Location from '../screens/auth/Location';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResendScreen from '../screens/auth/Resend';

const Stack = createStackNavigator();

export function OtherStack() {
    return (
        <Stack.Navigator initialRouteName="HouseSingle" options={{ gestureEnabled: true }}>
            <Stack.Screen name="HouseSingle" component={HomeSingleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FoodSingle" component={FoodSingleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotoSingle" component={PhotoSingleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSingle" component={TourSingleScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{headerShown: false}}/>
            <Stack.Screen name="HirePhotographers" component={HirePhotographersScreen} options={{headerShown: false}}/>
            <Stack.Screen name="FoodPayment" component={FoodPaymentScreen} options={{headerShown: false}}/>
            <Stack.Screen name="TourPayment" component={TourPaymentScreen} options={{headerShown: false}}/>
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
            <Stack.Screen name="Location" component={LocationScreen} options={{headerShown: false}} />
            <Stack.Screen name="LocationMap" component={Location} options={{headerShown: false}} />
            <Stack.Screen name="Amenities" component={AmenitiesScreen} options={{headerShown: false}} />
            <Stack.Screen name="Saved" component={SavedScreen} options={{headerShown: false}} />
            <Stack.Screen name="Password" component={ForgotPassword} options={{headerShown: false}} />
            <Stack.Screen name="Resend" component={ResendScreen} options={{headerShown: false}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}