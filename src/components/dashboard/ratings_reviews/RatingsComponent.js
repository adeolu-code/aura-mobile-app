import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText } from '../../../utils/Index';
import colors from '../../../colors';

import RatingsRowComponent from './RatingsRowComponent';

class RatingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <RatingsRowComponent />
        <RatingsRowComponent />
      </View>
    );
  }
}

export default RatingsComponent;
