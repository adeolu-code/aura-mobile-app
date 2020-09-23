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
    const { iconStyle, imgContainer, container, contentContainer, iconContainer, leftContainer, divider, foodContainer } = styles
    const { flexRow, imgStyle, textH3Style, textBold, textGrey, textH4Style, textH5Style, textSuccess, 
        textExtraBold } = GStyles;
    const { border } = this.props
    return (
      <View style={[container]}>
        <View style={[flexRow, foodContainer]}>
            <View style={leftContainer}>
                <View style={imgContainer}>
                    <Image source={require('../../../assets/images/food/food2.png')} resizeMode="cover" style={imgStyle} />
                </View>
            </View>
            <View style={contentContainer}>
                <MyText style={[textH4Style, textExtraBold, { marginBottom: 6 }]}>Sandwich</MyText>
                <MyText style={[textH5Style, textGrey, { marginBottom: 16 }]}>Phasellus risus turpis, pretium sit amet magna non, molestie ultricies</MyText>
                <MyText style={[textExtraBold, textSuccess, textH5Style]}>₦ 200,341 / plate</MyText>
            </View>
            <View style={iconContainer}>
                <TouchableOpacity style={iconStyle}>
                    <Icon name="add-outline" style={{ color: colors.white, fontSize: 20, marginRight: -1}} />
                </TouchableOpacity>
            </View>
        </View>
        {border ? <View style={divider}></View> : <View></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    foodContainer: {
        paddingVertical: 32
    },
    leftContainer: {
        flex: 3.5, 
        // borderWidth: 1
    },
    imgContainer: {
        width: 135, height: 120, borderRadius: 8, overflow: 'hidden',
    },
    contentContainer: {
        flex: 4, paddingHorizontal: 10,
        // borderWidth: 1,
    },
    iconContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        // borderWidth: 1,
    },
    iconStyle: {
        width: 25, height: 25, backgroundColor: colors.orange, borderRadius: 25, justifyContent: 'center', alignItems: 'center'
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    }
});

export default FoodRow;
