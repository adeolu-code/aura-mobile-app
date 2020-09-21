import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class FoodRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { iconStyle, imgContainer } = styles
    return (
      <View>
        <View style={imgContainer}>
            <Image source={require('../../../assets/images/food/food2.png')} resizeMode="cover" />
        </View>
        <View>
            <MyText>Sandwich</MyText>
            <MyText>Phasellus risus turpis, pretium sit amet magna non, molestie ultricies</MyText>
            <MyText>₦ 200,341 / plate</MyText>
        </View>
        <View>
            <View style={iconStyle}>
                <Icon name="plus" />
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    
});

export default FoodRow;
