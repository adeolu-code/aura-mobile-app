import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeSingleScreen from '../screens/explore/HomeSingle';

const Stack = createStackNavigator();

export default function OtherStack() {
    return (
        <Stack.Navigator initialRouteName="HouseSingle" options={{ gestureEnabled: true }}>
            <Stack.Screen name="HouseSingle" component={HomeSingleScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}