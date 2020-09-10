import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//all screens are registered here
const AppNavigator = createStackNavigator(
  {},
);

export default createAppContainer(AppNavigator);
