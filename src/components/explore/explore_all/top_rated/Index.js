import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText } from '../../../../utils/Index';

import { Icon } from 'native-base';
import ScrollContent from './ScrollContent';

import colors from '../../../../colors';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  linkToFood = () => {

  }
  linkToHouse = () => {

  }
  linkToPhoto = () => {

  }
  linkToTour = () => {
      
  }

  render() {
    return (
      <View>
        <ScrollContent heading="Top Homes & Hotels" onPress={this.linkToHouse} />
        <ScrollContent heading="Top Restaurants" onPress={this.linkToFood} />
        <ScrollContent heading="Top Photographers" onPress={this.linkToPhoto} />
        <ScrollContent heading="Top Tour Guides" noDivider onPress={this.linkToTour} />
      </View>
    );
  }
}

export default Index;
