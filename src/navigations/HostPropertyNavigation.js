import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import PropertyLocation from '../screens/host/propertyLocation.screen';
import HostProperty from '../screens/host/hostProperty.screen';
import PropertyAmenity from '../screens/host/propertyAmenities.screen';

const Stack = createStackNavigator();

export default function HostPropertyStack() {
    return (
        <Stack.Navigator initialRouteName="HostProperty" options={{ gestureEnabled: true }}>
            <Stack.Screen name="HostProperty" component={HostProperty} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyLocation" component={PropertyLocation} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyAmenity" component={PropertyAmenity} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    );
}