import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ExploreScreen from '../screens/explore/Index';
import ExploreAllScreen from '../screens/explore/ExploreAll';

import DashboardViewScreen from '../screens/dashboard_stack/Index';
import DashboardScreen from '../screens/dashboard_stack/Dashboard';
import ReservationsScreen from '../screens/dashboard_stack/Reservations';
import HomeDetailsScreen from '../screens/dashboard_stack/HomeDetails';
import GuestProfileScreen from '../screens/dashboard_stack/GuestProfile';
import ManagePropertiesScreen from '../screens/dashboard_stack/ManageProperties';
import ManagePropertiesContainerScreen from '../screens/dashboard_stack/ManagePropertiesContainer';
import RatingsAndReviewsScreen from '../screens/dashboard_stack/RatingsAndReviews';


import BookingScreen from '../screens/bookings_stack/Index';

import ProfileScreen from '../screens/profile_stack/Index';

import InboxScreen from '../screens/inbox_stack/Index';
import NotificationDetail from '../screens/notifications/notification.detail';
import InboxContent from '../screens/inbox/inboxContent';
import InboxChat from '../screens/inbox/inboxChat';
import BookingsDetail from '../screens/bookings/booking.detail';
import PaymentReferral from '../screens/payments_referrals/paymentReferrals.screen';
import NotificationSettings from '../screens/settings/notification.screen';
import AccountVerification from '../screens/account_verification/index.screen';
import Referrals from '../screens/referrals/refferal.screen';
import AddPayment from '../screens/payment/addPayment.screen';
import PaymentInitial from '../screens/payment/paymentInitial.screen';
import PayWith from '../screens/payment/payWith.screen';
import DeviceSharing from '../screens/profile/deviceSharing.screen';
import HostSteps from '../screens/host/hostSteps.screen';
import HostSlider from '../screens/host/slider.screen';

const Stack = createStackNavigator();

export function ExploreStack() {
    return (
        <Stack.Navigator initialRouteName="Explore" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ExploreAll" component={ExploreAllScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export function DashboardStack() {
    return (
        <Stack.Navigator initialRouteName="DashboardView" options={{ gestureEnabled: true }}>
            <Stack.Screen name="DashboardView" component={DashboardViewScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Reservations" component={ReservationsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeDetails" component={HomeDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GuestProfile" component={GuestProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ManageProperties" component={ManagePropertiesContainerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RatingsReviews" component={RatingsAndReviewsScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export function BookingsStack() {
    return (
        <Stack.Navigator initialRouteName="Bookings" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Bookings" component={BookingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BookingDetail" component={BookingsDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export function InboxStack() {
    return (
        <Stack.Navigator initialRouteName="Inbox" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Inbox" component={InboxScreen} options={{ headerShown: false }} />
            <Stack.Screen name="InboxContent" component={InboxContent} options={{ headerShown: false }} />
            <Stack.Screen name="NotificationDetail" component={NotificationDetail} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    );
}

export function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentReferral" component={PaymentReferral} options={{ headerShown: false }} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettings} options={{ headerShown: false }} />
            <Stack.Screen name="AccountVerification" component={AccountVerification} options={{ headerShown: false }} />
            <Stack.Screen name="Referrals" component={Referrals} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentInitial" component={PaymentInitial} options={{ headerShown: false }} />
            <Stack.Screen name="PayWith" component={PayWith} options={{ headerShown: false }} />
            <Stack.Screen name="AddPayment" component={AddPayment} options={{ headerShown: false }} />
            <Stack.Screen name="DeviceSharing" component={DeviceSharing} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    );
}




// export default DashboardStack;