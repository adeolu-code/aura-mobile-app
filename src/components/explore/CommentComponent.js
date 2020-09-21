import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';

import CommentRow from '../CommentRow';
import { Icon } from 'native-base';

import colors from '../../colors';




class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container, buttonStyle, buttonContainer, headerStyle, iconStyle,
        reportContainer } = styles;
    const { flexRow, textUnderline, textExtraBold, textBold, textGrey, textH4Style, textSuccess,
            imgStyle, textWhite, textH3Style, textDarkGrey, } = GStyles
    return (
        <View style={container}>
           
            <View style={contentContainer}>
                <CommentRow name="Banabas Kaviar" />
                <View style={divider}></View>
                <CommentRow name="Joshua Nwabogor" />
                <View style={divider}></View>
                <CommentRow name="Ashley Cole" />
                <View style={buttonContainer}>
                    <CustomButton buttonText="Show All Reviews" buttonStyle={buttonStyle} textStyle={{color: colors.black}} />
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
        paddingHorizontal: 20
    },
    headerStyle: {
        marginBottom: 15, marginTop: 20
    },
    contentContainer: {
        paddingBottom: 40
    },
    buttonStyle: {
        borderColor: colors.black, borderWidth: 1, backgroundColor: colors.white, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
    },
    iconStyle: {
        fontSize: 25, marginRight: 10, color: colors.success
    },
    reportContainer: {
        marginTop:30
    }
});

export default CommentComponent;
