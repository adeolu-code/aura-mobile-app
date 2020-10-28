/* eslint-disable prettier/prettier */
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
import BookingInformationRequirements from '../screens/host/bookingInformationRequirements.screen';
import HouseRules from '../screens/host/houseRules.screen';
import BookingPreview from '../screens/host/bookingPreview.screen';
import NotifyHost from '../screens/host/notifyHost.screen';
import BookingDuration from '../screens/host/bookingDuration.screen';
import BookInAdvance from '../screens/host/bookInAdvance.screen';
import PropertyAvailability from '../screens/host/propertyAvailabilty.screen';
import SetPricing from '../screens/host/setPricing.screen';
import GuestPolicy from '../screens/host/guestPolicy.screen';

const Stack = createStackNavigator();

export default function HostPropertyStack() {
    //HostSlider
    //
    return (
        <Stack.Navigator initialRouteName="HostSlider" options={{ gestureEnabled: true }}>
            <Stack.Screen name="HostProperty" component={HostProperty} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyLocation" component={PropertyLocation} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyAmenity" component={PropertyAmenity} options={{ headerShown: false }} />
            <Stack.Screen name="HostSteps" component={HostSteps} options={{ headerShown: false }} />
            <Stack.Screen name="HostSlider" component={HostSlider} options={{ headerShown: false }} />
            <Stack.Screen name="UploadPropertyImage" component={UploadPropertyImage} options={{ headerShown: false }} />
            <Stack.Screen name="PickPropertyImage" component={PickPropertyImage} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyDescription" component={PropertyDescription} options={{ headerShown: false }} />
            <Stack.Screen name="BookingInformationRequirements" component={BookingInformationRequirements} options={{ headerShown: false }} />
            <Stack.Screen name="HouseRules" component={HouseRules} options={{ headerShown: false }} />
            <Stack.Screen name="BookingPreview" component={BookingPreview} options={{ headerShown: false }} />
            <Stack.Screen name="NotifyHost" component={NotifyHost} options={{ headerShown: false }} />
            <Stack.Screen name="BookingDuration" component={BookingDuration} options={{ headerShown: false }} />
            <Stack.Screen name="BookInAdvance" component={BookInAdvance} options={{ headerShown: false }} />
            <Stack.Screen name="PropertyAvailability" component={PropertyAvailability} options={{ headerShown: false }} />
            <Stack.Screen name="SetPricing" component={SetPricing} options={{ headerShown: false }} />
            <Stack.Screen name="GuestPolicy" component={GuestPolicy} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}