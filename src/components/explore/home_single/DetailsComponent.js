import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';


import colors from '../../../colors';




class DetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container, iconStyle, rowStyle, headerStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>Things To Keep In Mind</MyText>
            </View>
            <View style={contentContainer}>
                <MyText style={[textH4Style, textGrey]}>
                Quisque suscipit ipsum est, eu venenatis leo ornare eget. 
                Ut porta facilisis elementum. Sed condimentum sed massa quis ullamcorper. Donec at scelerisque neque. Pellentesque sagittis, 
                massa sodales sodales finibus, felis ligula tempus lorem, eu porttitor ex lacus vel felis.
                </MyText>
            </View>
            <View style={divider}></View>
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
        marginBottom: 30
    },
    
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
});

export default DetailsComponent;
