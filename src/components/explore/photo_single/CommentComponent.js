import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';
import StarComponent from '../../StarComponent';

import CommentRow from '../../CommentRow';
import { Icon } from 'native-base';

import colors from '../../../colors';




class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container, buttonStyle, buttonContainer, headerStyle, iconStyle,
        reportContainer, subContainer } = styles;
    const { flexRow, textUnderline, textExtraBold, textBold, textGrey, textH4Style, textSuccess,
            imgStyle, textWhite, textH2Style, textH3Style, textDarkGrey, textLightGrey, textH5Style } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>Reviews</MyText>
                <View style={[flexRow, subContainer]}>
                    <MyText style={[textH5Style, textWhite]}>384 reviews</MyText>
                    <MyText style={[textLightGrey, { marginHorizontal: 8 }]}>|</MyText> 
                    <StarComponent starContainer={{marginBottom: 0}} />
                </View>
            </View>
            
            <View style={contentContainer}>
                
                <CommentRow name="Banabas Kaviar" white />
                <View style={divider}></View>
                <CommentRow name="Joshua Nwabogor" white />
                <View style={divider}></View>
                <CommentRow name="Ashley Cole" white />
                <View style={buttonContainer}>
                    <CustomButton buttonText="Show All Reviews" buttonStyle={buttonStyle} textStyle={{color: colors.orange}} />
                </View>
                <View style={divider}></View>

                
                <TouchableOpacity style={[flexRow, reportContainer]}>
                    <Icon type="MaterialIcons" name="flag" style={iconStyle} />
                    <MyText style={[textH4Style, textSuccess, textUnderline]}>Report This Listing</MyText>
                </TouchableOpacity>
            </View>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20
    },
    headerStyle: {
        marginTop: 20, marginBottom: 15
    },
    subContainer: {
        alignItems: 'center', marginTop: 10
    },
    contentContainer: {
        paddingBottom: 20
    },
    buttonStyle: {
        borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.blackClose, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGreyTwo,
    },
    iconStyle: {
        fontSize: 25, marginRight: 10, color: colors.success
    },
    reportContainer: {
        marginTop:30
    }
});

export default CommentComponent;
