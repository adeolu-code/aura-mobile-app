import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import ScrollContent from './ScrollContent';


import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class MoreComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {  contentContainer, divider, container, headerStyle, iconStyle, iconContainer, itemRow, textContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, textH5Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>More Photographers Around You</MyText>
            </View>
            <View style={contentContainer}>
                <ScrollContent />
                
            </View>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20
        width: '100%'
    },
    headerStyle: {
        marginTop: 25, marginBottom: 5
    },
    contentContainer: {
        paddingBottom: 10
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGreyTwo,
        // marginVertical: 30
    },
    iconContainer: {
        borderWidth: 1, borderColor: colors.white, borderRadius: 30, width: 35, height: 35, 
        justifyContent: 'center', alignItems: 'center', marginRight: 20
    },
    iconStyle: {
        fontSize: 20, color: colors.white
    },
    itemRow: {
        marginBottom: 30, alignItems: 'center'
    },
    textContainer: {
        paddingBottom: 30
    }
    
});

export default MoreComponent;
