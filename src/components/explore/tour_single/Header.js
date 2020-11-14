/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import StarComponent from '../../StarComponent';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    

  render() {
    const { headerStyle, shareStyle, shareContainer, iconStyle, starContainer, contentContainer, iconVerifiedContainer, verifiedStyle, divider, thumbContainer, thumbTxtContainer, 
        thumbStyle, containerOne, photosContainer, header, iconStyleOne, leftImgContainer, leftContainer, middleContainer, middleImgContainer, rightContainer } = styles;
    const { flexRow, textExtraBold, textLgStyle, textH5Style, textGrey, textH4Style, textH3Style, textH6Style, imgStyle } = GStyles
    const { title } = this.props;
    return (
        <View style={{marginBottom: 40}}>
            <View style={[flexRow, headerStyle]}>
                <View style={{flex: 6 }}>
                    <MyText style={[textExtraBold, textLgStyle]}>{title}</MyText>
                    <MyText style={[textH4Style, textGrey, {marginTop: 10}]}>Lagos Photoshoot</MyText>
                    <View style={starContainer}>
                        <StarComponent style={iconStyle} grey />
                    </View>
                </View>
                <View style={{flex: 1,alignItems: 'flex-end' }}>
                    <TouchableOpacity style={shareContainer}>
                        <Icon name="share-social" style={shareStyle} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={containerOne}>
            <View style={[flexRow, photosContainer]}>
            <View style={leftContainer}>
                <View style={leftImgContainer}>
                    <Image source={require('../../../assets/images/photo/pic.png')} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={leftImgContainer}>
                    <Image source={require('../../../assets/images/photo/pic1.png')} resizeMode="cover" style={imgStyle} />
                </View>
            </View>
            <View style={middleContainer}>
                <View style={middleImgContainer}>
                    <Image source={require('../../../assets/images/photo/pic5.png')} resizeMode="cover" style={imgStyle} />
                </View>
            </View>
            <View style={rightContainer}>
                <View style={leftImgContainer}>
                    <Image source={require('../../../assets/images/photo/pic2.png')} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={leftImgContainer}>
                    <Image source={require('../../../assets/images/photo/pic3.png')} resizeMode="cover" style={imgStyle} />
                </View>
            </View>
        </View>
            </View>
            <View style={divider}></View>
                <View style={contentContainer}>
                    <View style={[flexRow, thumbTxtContainer]}>
                        <View style={thumbContainer}>
                            <Image source={require('../../../assets/images/photo/photo3.png')} resizeMode="cover" style={thumbStyle} />
                            <View style={{ position: 'absolute', right: 0, top: -5}}>
                                <View style={iconVerifiedContainer}>
                                    <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                                </View>
                            </View>
                        </View>
                        <MyText style={[textH3Style]}>Hosted By Ikhidie Ehigiator</MyText>
                    </View>
                    <MyText style={[textH5Style, textGrey]}>Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum.</MyText>
                    <View style={[flexRow, header, {flex: 1}]}>
                        <View style={{flex: 1}}>
                            <Icon type="Feather" name="clock" style={iconStyleOne} />
                            <MyText style={[textGrey, textH6Style]}>Duration Of Tour</MyText>
                            <MyText style={[textH4Style]}>2 Hours</MyText>
                        </View>
                        <View style={{flex: 1}}>
                            <Icon type="MaterialIcons" name="people-alt" style={iconStyleOne} />
                            <MyText style={[textGrey, textH6Style]}>People Size</MyText>
                            <MyText style={[textH4Style]}>Up To 4 People</MyText>
                        </View>
                        <View style={{flex: 1, marginLeft: 10}}>
                            <Icon type="MaterialIcons" name="assignment" style={iconStyleOne} />
                        <MyText style={[textGrey, textH6Style]}>Equipment</MyText>
                            <MyText style={[textH4Style]}>Camera</MyText>
                        </View>
                    </View>
                </View>
                <View style={divider}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: 70, paddingBottom: 15,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
    },
    shareContainer: {
        width: 40, height: 40, borderRadius: 40, backgroundColor: colors.white, elevation: 3, justifyContent: 'center',
        alignItems: 'center',
    },
    starContainer: {
        paddingTop: 8, paddingBottom: 0,
    },
    shareStyle: {
        color: colors.success, fontSize: 25, marginLeft: -2,
    },
    iconStyle: {
        fontSize: 16,
    },
    imgContainer: {
        width: '100%', height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 35,
    },
    contentContainer: {
        paddingLeft: 20,
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between', alignItems: 'flex-end', padding: 20,
    },
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifyContainer: {
        position: 'absolute', top: 20, right:20,
    },
    cContainer: {
        position: 'absolute', bottom: 20, right: 20,
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white,
    },
    countContainer: {
        borderRadius: 30, paddingHorizontal: 20, paddingTop:10, paddingBottom: 12, backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    divider: {
    height: 1, backgroundColor: colors.lightGrey,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    thumbContainer: {
        width: 60, height: 60, borderRadius: 60, marginRight: 20,
    },
    thumbStyle: {
        width: 60, height: 60, borderRadius: 60,
    },
    thumbTxtContainer: {
        paddingVertical: 15, alignItems:'center',
    },
    containerOne: {
        paddingHorizontal: 20,
    },
    photosContainer: {
        justifyContent: 'space-between', 
        width: '100%', borderRadius: 10, overflow: 'hidden',
        // borderWidth: 1
    },
    leftContainer: {
        width: '32.3%', height: 288, justifyContent: 'space-between'
    },
    middleContainer:{
        width: '32.3%', height: 288
    },
    rightContainer: {
        width: '32.3%', height: 288, justifyContent: 'space-between'
    },
    
    leftImgContainer: {
        width: '100%', height: 140,
    },
    middleImgContainer: {
        width: '100%', height: 290,
    },
    header: {
        marginTop: 50,
        justifyContent: 'center',
        // alignContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
    },
    iconStyleOne: {
        fontSize: 25,
        color: colors.black,
        marginBottom: 10,
    },

});

export default Header;
