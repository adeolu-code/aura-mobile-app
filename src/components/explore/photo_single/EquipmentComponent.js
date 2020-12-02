import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';


import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class EquipmentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    renderEquipments = () => {
        const { photo } = this.props
        const { iconStyle, iconContainer, itemRow, } = styles;
        const { flexRow, textH4Style, imgStyle, textWhite } = GStyles
        if(photo.equipment && photo.equipment.length !== 0) {
            return photo.equipment.map((item, index) => {
                const key = `EQ_${index}`
                return (
                    <View style={[flexRow, itemRow]} key={key}>
                        <View style={iconContainer}>
                            <Icon type="MaterialIcons" name="local-see" style={iconStyle} />
                        </View>
                        <MyText style={[textWhite, textH4Style]}>{item.name}</MyText>
                    </View>
                )
            })
        }
        return (
            <MyText style={[textH4Style, textWhite, { marginTop: -5, marginBottom: 10}]}>No Equipment Included</MyText>
        )
    }

  render() {
    const {  contentContainer, divider, container, headerStyle, iconStyle, iconContainer, itemRow, textContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, textH5Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    const { photo } = this.props;
    const info = photo ? photo.additionalInformation : ''

    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>Included Equipments</MyText>
            </View>
            <View style={contentContainer}>
                {/* <View style={[flexRow, itemRow]}>
                    <View style={iconContainer}>
                        <Icon type="MaterialIcons" name="map" style={iconStyle} />
                    </View>
                    <MyText style={[textWhite, textH4Style]}>Map</MyText>
                </View> */}
                {this.renderEquipments()}
                
            </View>
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>Things To Keep In Mind</MyText>
            </View>
            <View style={textContainer}>
                <MyText style={[textWhite, textH4Style]}>{info}</MyText>
            </View>
            <View style={divider}></View>
            {/* <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>Please Read Before Booking</MyText>
            </View>
            <View style={textContainer}>
                <MyText style={[textWhite, textH4Style]}>
                Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum. 
                Sed condimentum sed massa quis ullamcorper. Donec at scelerisque neque. Pellentesque sagittis, 
                massa sodales sodales finibus, felis ligula tempus lorem, eu porttitor ex lacus vel felis.
                </MyText>
            </View>
            <View style={divider}></View> */}
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
        marginTop: 25, marginBottom: 25
    },
    contentContainer: {
        paddingBottom: 10, paddingTop: 10, 
        // borderWidth: 1, borderColor: 'white',
        flexDirection: 'row', flexWrap: 'wrap'
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
        marginBottom: 30, alignItems: 'center', width: '50%'
    },
    textContainer: {
        paddingBottom: 30
    }
    
});

export default EquipmentComponent;
