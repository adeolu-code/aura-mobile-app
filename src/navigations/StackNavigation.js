import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DashboardViewScreen from '../screens/dashboard_stack/Index';
import DashboardScreen from '../screens/dashboard_stack/Dashboard';

import BookingScreen from '../screens/bookings_stack/Index';

import ProfileScreen from '../screens/profile_stack/Index';

import InboxScreen from '../screens/inbox_stack/Index';

const Stack = createStackNavigator();


export function DashboardStack() {
    return (
        <Stack.Navigator initialRouteName="DashboardView" options={{ gestureEnabled: true }}>
            <Stack.Screen name="DashboardView" component={DashboardViewScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export function BookingsStack() {
    return (
        <Stack.Navigator initialRouteName="Bookings" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Bookings" component={BookingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export function InboxStack() {
    return (
        <Stack.Navigator initialRouteName="Inbox" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}



// export default DashboardStack;