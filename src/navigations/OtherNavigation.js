import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeSingleScreen from '../screens/explore/HomeSingle';
import FoodSingleScreen from '../screens/explore/FoodSingle';

const Stack = createStackNavigator();

export default function OtherStack() {
    return (
        <Stack.Navigator initialRouteName="HouseSingle" options={{ gestureEnabled: true }}>
            <Stack.Screen name="HouseSingle" component={HomeSingleScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FoodSingle" component={FoodSingleScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}