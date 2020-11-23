import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';


import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class HostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    renderVerified = () => {
        const { photo } = this.props;
        if(photo && photo.isVerified) {
            return (
                <View style={{ position: 'absolute', right: 0, top: -5}}>
                    <View style={styles.iconVerifiedContainer}>
                        <Icon name="check" type="FontAwesome5" style={styles.verifiedStyle} />
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
    const { photo } = this.props;
    const fullName = photo ? `${photo.firstName} ${photo.lastName}` : '****'
    const info = photo ? photo.additionalInformation : '****'
    return (
        <View style={container}>
            <View style={contentContainer}>
                <View style={[flexRow, lowerContainer]}>
                    <View style={shieldContainer}>
                        <Image source={require('../../../assets/images/icons/shield/shield.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={textStyle}>
                        <MyText style={[textH5Style, textWhite]}>
                        Do not make any payment to photographers outside of the Aura app or website to protect against scam.
                        </MyText>
                    </View>
                </View>
            </View>
            {/* <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>Host Note</MyText>
            </View>
            <View style={contentContainer}>
                <View style={[flexRow, thumbTxtContainer]}>
                    <View style={thumbContainer}>
                        <Image source={require('../../../assets/images/profile.png')} resizeMode="cover" style={thumbStyle} />
                        {this.renderVerified()}
                    </View>
                    <MyText style={[textH3Style, textWhite]}>{fullName}</MyText>
                </View>
                <View>
                    <MyText style={[textWhite, textH4Style]}>{info}</MyText>
                </View>
                <View style={buttonContainer}>
                    <CustomButton buttonText="Ask Question" buttonStyle={buttonStyle} textStyle={{color: colors.orange}} />
                </View>
                <View style={[flexRow, lowerContainer]}>
                    <View style={shieldContainer}>
                        <Image source={require('../../../assets/images/icons/shield/shield.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={textStyle}>
                        <MyText style={[textH5Style, textWhite]}>
                        Do not make any payment to photographers outside of the Aura app or website to protect against scam.
                        </MyText>
                    </View>
                </View>
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
        width: '100%', height: 1, backgroundColor: colors.greyWhite,
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
        width: 60, height: 60, borderRadius: 60, marginRight: 20
    },
    thumbStyle: {
        width: 60, height: 60, borderRadius: 60,
    },
    thumbTxtContainer: {
        paddingVertical: 15, alignItems:'center'
    },
    buttonStyle: {
        borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.blackClose, borderRadius: 10, elevation: 2
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
