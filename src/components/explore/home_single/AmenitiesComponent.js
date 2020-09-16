import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import SubHeader from './SubHeader'



class AmenitiesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textLgStyle, textH5Style, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
        <View style={container}>
            <SubHeader title="Amenities" />
            <View style={contentContainer}>
                
                <View style={divider}></View>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    
    contentContainer: {
        paddingHorizontal: 20
    },
});

export default AmenitiesComponent;
