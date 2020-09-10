import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

const AuthNavigator = createStackNavigator(
    {},
    {
        initialRouteName: 'Login'
    }
);

export default createAppContainer(AuthNavigator);