import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base'

class GuestHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { iconContainer, iconStyle, headerContainer, imgContainer, imgContainer1, infoContainer, imgTextContainer, container } = styles;
    const { imgStyle, flexRow, textH2Style, textH4Style, textExtraBold, textBold, textSuccess, textLgStyle, textDarkGrey } = GStyles
    const { reservation } = this.props
    const imgUrl = reservation.userIdentityUrl ? {uri: reservation.userIdentityUrl} : require('../../assets/images/profile.png')
    return (
      <View style={container}>
        <TouchableOpacity style={iconContainer} onPress={this.goBack}>
            <Icon type="Feather" name="chevron-left" style={iconStyle} />
        </TouchableOpacity>
        <View style={headerContainer}>
            <View style={imgContainer}>
                <Image source={imgUrl} style={imgStyle} resizeMode="cover" />
            </View>
            <MyText style={[textExtraBold, textLgStyle, textDarkGrey]}>{reservation.guest_Name}</MyText>
            {/* <View style={[flexRow, infoContainer]}>
                <TouchableOpacity style={imgTextContainer}>
                    <View style={imgContainer1}>
                        <Image source={require('../../assets/images/icons/phone.png')} resizeMode="contain"  />
                    </View>
                    <MyText style={[textH4Style, textSuccess, textBold]}>Phone Call</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={imgTextContainer}>
                    <View style={imgContainer1}>
                        <Image source={require('../../assets/images/icons/envelope.png')} resizeMode="contain" />
                    </View>
                    <MyText style={[textH4Style, textSuccess, textBold]}>Message</MyText>
                </TouchableOpacity>
            </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, borderBottomWidth: 3, borderBottomColor: colors.lightGrey, paddingBottom: 35,
        position: 'absolute', top: 0, width: '100%', zIndex: 100, backgroundColor: colors.white, 
        paddingTop: Platform.OS === 'ios' ? 30 : 20
    },
    headerContainer: {
        justifyContent: 'center', width: '100%', display: 'flex', alignItems: 'center'
    },
    imgContainer: {
        width:80, height: 80, borderRadius: 80, overflow:'hidden', marginBottom: 15, backgroundColor: colors.lightGrey
    },
    infoContainer: {
        marginTop: 25
    },
    imgTextContainer: {
        justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15
    },
    imgContainer1: {
        backgroundColor: colors.success, borderRadius: 40, height: 35, width: 35,
        justifyContent:'center', alignItems: 'center', marginBottom: 5, elevation: 3
    },
    iconContainer: {
        marginTop: 20, marginBottom: 10
    },
    iconStyle: { 
        padding: 0,margin: 0, fontSize: 35, marginLeft: -10
    },
});

export default GuestHeader;
