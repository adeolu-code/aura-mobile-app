/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';



class HostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderVerified = () => {
    const { house } = this.props
    const { iconVerifiedContainer, verifiedStyle } = styles
    if(house.isVerified) {
        return (
            <View style={{ position: 'absolute', right: 0, top: -5}}>
                <View style={iconVerifiedContainer}>
                    <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                </View>
            </View>
        )
    }
  }

  render() {
    const {  contentContainer, divider, container, headerStyle, thumbTxtContainer, thumbContainer, verifiedStyle, 
        iconVerifiedContainer, thumbStyle, buttonContainer, buttonStyle, shieldContainer, textStyle, lowerContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, textH5Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    const { house } = this.props
    const imgUrl = house.hostPicture ? { uri: house.hostPicture } : require('../../assets/images/profile.png')

    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>Host Note</MyText>
            </View>
            <View style={contentContainer}>
                <View style={[flexRow, thumbTxtContainer]}>
                    <View style={thumbContainer}>
                        <Image source={imgUrl} resizeMode="cover" style={thumbStyle} />
                        {this.renderVerified()}
                    </View>
                    <MyText style={[textH3Style]}>{house ? house.hostName : '***'}</MyText>
                </View>
                <View>
                    <MyText style={[textGrey, textH4Style]}>{ house ? house.description : '***'}</MyText>
                </View>
                <View style={buttonContainer}>
                    {/* <CustomButton buttonText="Contact Host" buttonStyle={buttonStyle} textStyle={{color: colors.black}} /> */}
                </View>
                <View style={[flexRow, lowerContainer]}>
                    <View style={shieldContainer}>
                        <Image source={require('../../assets/images/icons/shield/shield.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={textStyle}>
                        <MyText style={[textH5Style, textGrey]}>
                        Do not make any payment or communicate with your host outside of the Aura app or website to protect against scam.
                        </MyText>
                    </View>
                </View>
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
    iconStyle: {
        fontSize: 25, marginRight: 25
    },
    mapContainer: {
        width: '100%', height: 230, borderRadius: 8, overflow: 'hidden', marginTop: 15, marginBottom: 20
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
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white
    },
    thumbContainer: {
        width: 60, height: 60, borderRadius: 60, marginRight: 20, borderWidth: 2, borderColor: colors.orange
    },
    thumbStyle: {
        width: 56, height: 56, borderRadius: 56, 
    },
    thumbTxtContainer: {
        paddingVertical: 15, alignItems:'center'
    },
    buttonStyle: {
        borderColor: colors.black, borderWidth: 1, backgroundColor: colors.white, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginTop: 40, marginBottom: 20
    },
    shieldContainer: {
        width: 25, height:25, borderRadius: 25, backgroundColor: colors.orange, padding: 5, 
    },
    textStyle: {
        paddingLeft: 20, paddingRight: 20
    },
    lowerContainer: {
        marginBottom: 30
    }
});

export default HostComponent;
