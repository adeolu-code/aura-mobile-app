import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import PropertyLocation from '../screens/host/propertyLocation.screen';
import HostProperty from '../screens/host/hostProperty.screen';
import PropertyAmenity from '../screens/host/propertyAmenities.screen';

import HostSteps from '../screens/host/hostSteps.screen';
import HostSlider from '../screens/host/slider.screen';
import UploadPropertyImage from '../screens/host/uploadPropertyImage.screen';
import PickPropertyImage from '../screens/host/pickPropertyImages.screen';
import PropertyDescription from '../screens/host/propertyDescription.screen';

const Stack = createStackNavigator();

export default function HostPropertyStack() {
    //HostSlider
    //
    return (
        <Stack.Navigator initialRouteName="PropertyDescription" options={{ gestureEnabled: true }}>
            <Stack.Screen name="HostProperty" component={HostProperty} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyLocation" component={PropertyLocation} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyAmenity" component={PropertyAmenity} options={{ headerShown: false }} />
            <Stack.Screen name="HostSteps" component={HostSteps} options={{ headerShown: false }} />
            <Stack.Screen name="HostSlider" component={HostSlider} options={{ headerShown: false }} />
            <Stack.Screen name="UploadPropertyImage" component={UploadPropertyImage} options={{ headerShown: false }} />
            <Stack.Screen name="PickPropertyImage" component={PickPropertyImage} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyDescription" component={PropertyDescription} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}