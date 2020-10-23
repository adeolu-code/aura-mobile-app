import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import SubHeader from './SubHeader';
import { amenityIcons } from '../../helpers'



class AmenitiesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderAmenities = () => {
    const { house } = this.props;
    const {  iconStyle, rowStyle } = styles;
    const { flexRow, textH3Style, textDarkGrey } = GStyles
    const defaultIcon = amenityIcons.find(icon => icon.name === 'default')
    if(house && house.amenity) {
        return house.amenity.map(item => {
            const iconObj = amenityIcons.find(icon => icon.name === item.name.toLowerCase())
            const icon = iconObj ? iconObj : defaultIcon
            return (
                <View style={[flexRow, rowStyle]} key={item.id}>
                    <Icon type={icon.type} name={icon.iconName} style={iconStyle} />
                    <MyText style={[textH3Style]}>{item.name}</MyText>
                </View>
            )
        })
    }
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
                {this.renderAmenities()}
                {/* <View style={[flexRow, rowStyle]}>
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
                </View> */}

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
