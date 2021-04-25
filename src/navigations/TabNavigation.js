/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Platform } from 'react-native';

import GStyles from '../assets/styles/GeneralStyles';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils';

console.log(SCREEN_WIDTH, SCREEN_HEIGHT)

import {
  DashboardStack,
  ProfileStack,
  InboxStack,
  BookingsStack,
  ExploreStack
} from './StackNavigation';

import colors from '../colors';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const {imgStyle} = styles;
  return (
    <Tab.Navigator
      lazy={true}
      swipeEnabled={false}
      tabBarPosition="bottom"
      initialRouteName="Explore"
      timingConfig={{duration: 120}}
      tabBarOptions={{
        showIcon: true,
        labelStyle: {
          fontSize: SCREEN_WIDTH <= 360 || SCREEN_HEIGHT <= 667 ? 7 : 10,
          textTransform: 'uppercase',
          fontFamily: 'Nunito-Regular',
          marginTop: 0,
        },
        tabStyle: {paddingHorizontal: 0},
        indicatorStyle: {
          backgroundColor: colors.white,
        },
        iconStyle: {
          marginBottom: 0,
        },
        activeTintColor: colors.orange,
        inactiveTintColor: colors.darkBlue,
        style: {
          height: Platform.OS === 'ios' ? 75 : 70,
          elevation: 3, ...GStyles.shadow,
        },
      }}>
      <>
        <Tab.Screen
          name="Explore"
          component={ExploreStack}
          options={{
            tabBarIcon({focused, color}) {
              const imgName = focused
                ? require('../assets/images/icons/search_active/search.png')
                : require('../assets/images/icons/search/search.png');
              return (
                <Image source={imgName} style={imgStyle} resizeMode="contain" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardStack}
          options={{
            tabBarIcon({focused, color}) {
              const imgName = focused
                ? require('../assets/images/icons/dashboard_active/dashboard.png')
                : require('../assets/images/icons/dashboard/dashboard.png');
              return (
                <Image source={imgName} style={imgStyle} resizeMode="contain" />
              );
            },
            tabBarOptions: {
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            },
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={BookingsStack}
          options={{
            tabBarIcon({focused, color}) {
              const imgName = focused
                ? require('../assets/images/icons/bookmark_active/bookmark-outline.png')
                : require('../assets/images/icons/bookmark/bookmark-outline.png');
              return (
                <Image source={imgName} style={imgStyle} resizeMode="contain" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={InboxStack}
          options={{
            tabBarIcon({focused, color}) {
              const imgName = focused
                ? require('../assets/images/icons/envelope_active/envelope.png')
                : require('../assets/images/icons/envelope/envelope.png');
              return (
                <Image source={imgName} style={imgStyle} resizeMode="contain" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon({focused, color}) {
              const imgName = focused
                ? require('../assets/images/icons/user_active/user.png')
                : require('../assets/images/icons/user/user.png');
              return (
                <Image source={imgName} style={imgStyle} resizeMode="contain" />
              );
            },
          }}
        />
      </>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  imgStyle: {
    width: 20,
    height: 20,
  },
});

export default MyTabs;
