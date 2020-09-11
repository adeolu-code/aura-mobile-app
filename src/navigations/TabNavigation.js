import React from "react";
import { Image, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ExploreScreen from '../screens/explore/Index';

import { DashboardStack, ProfileStack, InboxStack, BookingsStack } from './StackNavigation';

import colors from '../colors';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    const { imgStyle } = styles
    return (
      <Tab.Navigator tabBarPosition="bottom" initialRouteName="Dashboard" timingConfig={{ duration: 120 }}

      
      tabBarOptions={{
        showIcon: true,
        labelStyle: { fontSize: 10, textTransform: 'uppercase', fontFamily: 'Nunito-Regular', marginTop: 0 },
        tabStyle: { paddingHorizontal: 0 },
        indicatorStyle: {
          backgroundColor: colors.white
        },
        iconStyle: {
            marginBottom:0
        },
        activeTintColor: colors.orange,
        inactiveTintColor: colors.darkBlue,
        style: {
            height: 80, elevation: 3
        }
      }}
      >
        <>
            <Tab.Screen name="Explore" component={ExploreScreen} options={{
                tabBarIcon({ focused, color }) {
                    const imgName = focused ? require("../assets/images/icons/search_active/search.png") : 
                    require("../assets/images/icons/search/search.png");
                    return <Image source={imgName} style={imgStyle} resizeMode="contain" />;
                }
            }} />
            <Tab.Screen name="Dashboard" component={DashboardStack} options={{
                    tabBarIcon({ focused, color }) {
                        const imgName = focused ? require("../assets/images/icons/dashboard_active/dashboard.png") : 
                        require("../assets/images/icons/dashboard/dashboard.png");
                        return <Image source={imgName} style={imgStyle} resizeMode="contain" />;
                    },
                    tabBarOptions: {
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray'
                    }
                }}
             />
            <Tab.Screen name="Booking" component={BookingsStack} 
            options={{
                tabBarIcon({ focused, color }) {
                const imgName = focused ? require("../assets/images/icons/bookmark_active/bookmark-outline.png") 
                : require("../assets/images/icons/bookmark/bookmark-outline.png");
                return <Image source={imgName} style={imgStyle} resizeMode="contain" />;
                }
            }} />
            <Tab.Screen name="Inbox" component={InboxStack} 
                options={{
                tabBarIcon({ focused, color }) {
                    const imgName = focused ? require("../assets/images/icons/envelope_active/envelope.png") 
                    : require("../assets/images/icons/envelope/envelope.png");
                    return <Image source={imgName} style={imgStyle} resizeMode="contain" />;
                }
            }}/>
            <Tab.Screen name="Profile" component={ProfileStack} 
                options={{
                tabBarIcon({ focused, color }) {
                    const imgName = focused ? require("../assets/images/icons/user_active/user.png") 
                    : require("../assets/images/icons/user/user.png");
                    return <Image source={imgName} style={imgStyle} resizeMode="contain" />;
                }
            }}/>

        </>
      </Tab.Navigator>
    );
  }

const styles = StyleSheet.create({
    imgStyle: {
        width: 20, height: 20
    }
});

export default MyTabs;