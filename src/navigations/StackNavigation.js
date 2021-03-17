/* eslint-disable prettier/prettier */
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ExploreScreen from '../screens/explore/Index';
import ExploreAllScreen from '../screens/explore/ExploreAll';

import DashboardViewScreen from '../screens/dashboard_stack/Index';
import DashboardScreen from '../screens/dashboard_stack/Dashboard';
import ReservationsScreen from '../screens/dashboard_stack/ReservationsContainerProvider';
import HomeDetailsScreen from '../screens/dashboard_stack/HomeDetails';
import GuestProfileScreen from '../screens/dashboard_stack/GuestProfile';
// import ManagePropertiesScreen from '../screens/dashboard_stack/ManageProperties';
import ManagePropertiesContainerScreen from '../screens/dashboard_stack/ManagePropertiesContainer';
import EarningsScreen from '../screens/dashboard_stack/Earnings';
import TransactionsHistoryScreen from '../screens/dashboard_stack/TransactionsHistory';
import RatingsAndReviewsScreen from '../screens/dashboard_stack/ReviewsProvider';

import TourDashboardScreen from '../screens/dashboard_stack/DashboardTour';
import TourEarningsScreen from '../screens/dashboard_stack/EarningsTour';
import ManageTourScreen from '../screens/dashboard_stack/ManageTours';

import TourReservationsScreen from '../screens/dashboard_stack/ReservationsTourContainerProvider'
import RatingsAndReviewsTourScreen from '../screens/dashboard_stack/ReviewsTourProvider';


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
import AddProfilePicture from '../screens/edit_profile/addProfilePic.screen';
import ChangePassword from '../screens/edit_profile/changePassword.screen';
import Complaint from '../screens/profile/complaints.screen';
import SupportScreen from '../screens/profile/Support';


import TitleDescriptionScreen from '../screens/photograph/TitleDescription';
import PhotoGraphLocationScreen from '../screens/photograph/Location';
import PhotoGraphLocationMapScreen from '../screens/photograph/LocationMap';
import PhotoGraphEquipmentsScreen from '../screens/photograph/Equipments';
import AdditionalInfoScreen from '../screens/photograph/AdditionalInfo';
import PhotoUploadImagesScreen from '../screens/photograph/UploadImages';
import PhotographPolicyScreen from '../screens/photograph/Policy';
import PhotographChangeProfilePicScreen from '../screens/photograph/AddProfilePic.screen';
import PhotographSuccessScreen from '../screens/photograph/SavedScreen';

import TourLocationScreen from '../screens/experience/Location';
import TourThemeScreen from '../screens/experience/Theme';
import TourStepTwoOverviewScreen from '../screens/experience/StepTwo';
import TourExpertiseScreen from '../screens/experience/Expertise';
import TourAccessScreen from '../screens/experience/Access';
import TourConnectionScreen from '../screens/experience/Connection';
import TourLanguageScreen from '../screens/experience/Language';
import TourAudienceScreen from '../screens/experience/Audience';
import TourDescribeActivityScreen from '../screens/experience/DescribeActivity';
import TourEditProfilePhotoScreen from '../screens/experience/EditProfilePhoto';
import TourAddPhotoScreen from '../screens/experience/AddPhoto';
import TourPickImageScreen from '../screens/experience/PickImages';
import TourMeetingLocationScreen from '../screens/experience/MeetingLocation';
import TourNotesScreen from '../screens/experience/Notes';
import TourGuestRequirementScreen from '../screens/experience/GuestRequirements';
import TourNumberOfGuestsScreen from '../screens/experience/NumberOfGuests';
import TourDurationScreen from '../screens/experience/Duration';
import TourCalendarScreen from '../screens/experience/TourCalendar';
import TourGuestPricingScreen from '../screens/experience/GuestPricing';
import TourBookingSettingsScreen from '../screens/experience/BookingSettings';
import TourSafetyOverviewScreen from '../screens/experience/SafetyOverview';
import TourSafetyHygieneScreen from '../screens/experience/SafetyHygiene';
import TourSafetyPhysicalScreen from '../screens/experience/SafetyPhysical';
import TourSafetyLocationScreen from '../screens/experience/SafetyLocation';
import TourSafetyCleaningScreen from '../screens/experience/SafetyCleaning';
import TourSafetyCommitmentScreen from '../screens/experience/SafetyCommitment';
import TourSafetyPolicyScreen from '../screens/experience/SafetyPolicy';
import TourIdentityVerificationScreen from '../screens/experience/IdentityCard';
import TourSuccessScreen from '../screens/experience/Success';

// Restuarent
import RestuarantDashboard from "./../screens/restuarant/dashboard.screen";
import RestaurantDashboardComponent from "./../screens/restuarant/index.screen";

import MyPageScreen from '../screens/photograph/MyPage';
import PortfolioScreen from '../screens/photograph/Portfolio';
import Bank from '../screens/payment/bank.screen';
import RestaurantOrders from '../screens/restuarant/orders.screen';
import AddRestaurant from '../screens/restuarant/addRestuarant.screen';
import RestaurantReviews from '../screens/restuarant/reviews.screen';

import PhotosComponentScreen from '../screens/dashboard_stack/PhotosComponent';
import { CancelBookings } from '../screens/bookings/cancelBooking.screen';
import RestaurantEarnings from '../screens/restuarant/earnings.screen';
import RestaurantUploadImage from '../screens/restuarant/uploadImage.screen';
import RestaurantMenu from '../screens/restuarant/restuarantMenu.screen';
import RestaurantMenuDetail from '../screens/restuarant/menuDetail.screen';


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
            <Stack.Screen name="TourReservations" component={TourReservationsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeDetails" component={HomeDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GuestProfile" component={GuestProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ManageProperties" component={ManagePropertiesContainerScreen} options={{ headerShown: false }} />

            <Stack.Screen name="RatingsReviews" component={RatingsAndReviewsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourRatingsReviews" component={RatingsAndReviewsTourScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Earnings" component={EarningsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TransactionsHistory" component={TransactionsHistoryScreen} options={{ headerShown: false }} />

            <Stack.Screen name="DashboardTour" component={TourDashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourEarnings" component={TourEarningsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ManageTour" component={ManageTourScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantStack" component={RestaurantStack} options={{ headerShown: false }} />


            <Stack.Screen name="MyPage" component={MyPageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Photos" component={PhotosComponentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographChangeProfile" component={PhotographChangeProfilePicScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export function BookingsStack() {
    return (
        <Stack.Navigator initialRouteName="Bookings" options={{ gestureEnabled: true }}>
            <Stack.Screen name="Bookings" component={BookingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BookingDetail" component={BookingsDetail} options={{ headerShown: false }} />
            <Stack.Screen name="CancelBookings" component={CancelBookings} options={{ headerShown: false }} />
            
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
            <Stack.Screen name="Bank" component={Bank} options={{ headerShown: false }} />
            <Stack.Screen name="DeviceSharing" component={DeviceSharing} options={{ headerShown: false }} />
            <Stack.Screen name="AddProfilePicture" component={AddProfilePicture} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <Stack.Screen name="Complaint" component={Complaint} options={{ headerShown: false }} />
            <Stack.Screen name="Support" component={SupportScreen} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    );
}

export function PhotographStack() {
    return (
        <Stack.Navigator initialRouteName="TitleDescription" options={{ gestureEnabled: true }}>
            <Stack.Screen name="TitleDescription" component={TitleDescriptionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographLocation" component={PhotoGraphLocationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographLocationMap" component={PhotoGraphLocationMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographEquipments" component={PhotoGraphEquipmentsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographAdditionalInfo" component={AdditionalInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographUploadImages" component={PhotoUploadImagesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographPolicy" component={PhotographPolicyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PhotographSuccess" component={PhotographSuccessScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export function ExperienceStack() {
    return (
        <Stack.Navigator initialRouteName="TourLocation" options={{ gestureEnabled: true }}>
            <Stack.Screen name="TourLocation" component={TourLocationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourTheme" component={TourThemeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourStepTwo" component={TourStepTwoOverviewScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourExpertise" component={TourExpertiseScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourAccess" component={TourAccessScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourConnection" component={TourConnectionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourLanguage" component={TourLanguageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourAudience" component={TourAudienceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourDescribeActivity" component={TourDescribeActivityScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourEditPhoto" component={TourEditProfilePhotoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourAddImages" component={TourAddPhotoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourPickImage" component={TourPickImageScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourMeetingLocation" component={TourMeetingLocationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourNotes" component={TourNotesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourGuestRequirement" component={TourGuestRequirementScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourNumberOfGuests" component={TourNumberOfGuestsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourDuration" component={TourDurationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourCalendar" component={TourCalendarScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourGuestPricing" component={TourGuestPricingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourBookingSettings" component={TourBookingSettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSafetyOverview" component={TourSafetyOverviewScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSafetyHygiene" component={TourSafetyHygieneScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSafetyPhysical" component={TourSafetyPhysicalScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSafetyLocation" component={TourSafetyLocationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSafetyCleaning" component={TourSafetyCleaningScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSafetyCommitment" component={TourSafetyCommitmentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSafetyPolicy" component={TourSafetyPolicyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourIdentityCard" component={TourIdentityVerificationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TourSuccess" component={TourSuccessScreen} options={{ headerShown: false }} />
            
        </Stack.Navigator>
    ) 
}


export function RestaurantStack() {
    return (
        <Stack.Navigator initialRouteName="RestaurantDashboardComponent" options={{ gestureEnabled: true }}>
            <Stack.Screen name="RestaurantDashboardComponent" component={RestaurantDashboardComponent} options={{ headerShown: false }} />
            <Stack.Screen name="RestuarantDashboard" component={RestuarantDashboard} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantOrders" component={RestaurantOrders} options={{ headerShown: false }} />
            <Stack.Screen name="AddRestaurant" component={AddRestaurant} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantReviews" component={RestaurantReviews} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantEarnings" component={RestaurantEarnings} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantUploadImage" component={RestaurantUploadImage} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} options={{ headerShown: false }} />
            <Stack.Screen name="RestaurantMenuDetail" component={RestaurantMenuDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    ) 
}




// export default DashboardStack;