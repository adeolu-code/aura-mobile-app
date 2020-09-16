import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText } from '../../../utils/Index';
import colors from '../../../colors';

import ReviewRowComponent from './ReviewRowComponent';

class ReviewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { container } = styles
    const { textH6Style } = GStyles
    return (
      <View>
        <ReviewRowComponent wrapperStyle={{backgroundColor: colors.lightOrange}} />
        <ReviewRowComponent />
        <ReviewRowComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, paddingVertical: 15, width: '100%'
    // borderWidth: 1
  },
});

export default ReviewsComponent;
