import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import SubHeader from './SubHeader'



class AmenitiesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container, iconStyle, rowStyle, buttonStyle, buttonContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    const { btn } = this.props
    return (
        <View style={container}>
            <SubHeader title="Amenities" />
            <View style={contentContainer}>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="Feather" name="wifi" style={iconStyle} />
                    <MyText style={[textH3Style]}>Wifi</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="free-breakfast" style={iconStyle} />
                    <MyText style={[textH3Style]}>Coffee, Tea</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="Ionicons" name="restaurant" style={iconStyle} />
                    <MyText style={[textH3Style]}>Kitchen</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="pool" style={iconStyle} />
                    <MyText style={[textH3Style]}>Swimming pool</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="Ionicons" name="tv-outline" style={iconStyle} />
                    <MyText style={[textH3Style]}>Television</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="local-parking" style={iconStyle} />
                    <MyText style={[textH3Style]}>Parking space</MyText>
                </View>

                {btn ? <View style={buttonContainer}>
                    <CustomButton buttonText="Show All Available Amenities" buttonStyle={buttonStyle} textStyle={{color: colors.black}} />
                </View>: <Fragment></Fragment>}
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
    iconStyle: {
        fontSize: 25, marginRight: 25
    },
    rowStyle: {
        marginBottom: 25,  alignItems: 'center'
    },
    
    contentContainer: {
        
    },
    buttonStyle: {
        borderColor: colors.black, borderWidth: 1, backgroundColor: colors.white, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
});

export default AmenitiesComponent;
