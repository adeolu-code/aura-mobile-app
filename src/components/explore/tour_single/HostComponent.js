/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';
import StarComponent from '../../StarComponent';
import CommentRow from './CommentRow';

import { Icon } from 'native-base';

import colors from '../../../colors';



class HostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container, headerStyle, thumbTxtContainer, thumbContainer, verifiedStyle, 
        iconVerifiedContainer, thumbStyle, buttonContainer, buttonStyle, shieldContainer, textStyle, iconStyle, imageView, iconStyleOne, lowerContainer, reportContainer, image, ImgContainer, subContainer} = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, textH5Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey, textLightGrey, textSuccess, textUnderline } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>
                    Activities You’ll Experience
                </MyText>
            </View>
            <View>
            <MyText style={[textWhite, textH4Style, {marginBottom: 30}]}>
                    Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum. 
                    Sed condimentum sed massa quis ullamcorper. Donec at scelerisque neque. Pellentesque sagittis, 
                    massa sodales sodales finibus, felis ligula tempus lorem, eu porttitor ex lacus vel felis.
                </MyText>
            </View>
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>Meet Your Host</MyText>
            </View>
            <View style={contentContainer}>
                <View style={[flexRow, thumbTxtContainer]}>
                    <View style={thumbContainer}>
                        <Image source={require('../../../assets/images/photo/photo5.png')} resizeMode="cover" style={thumbStyle} />
                        <View style={{ position: 'absolute', right: 0, top: -5}}>
                            <View style={iconVerifiedContainer}>
                                <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                            </View>
                        </View>
                    </View>
                    <MyText style={[textH3Style, textWhite]}>Ikhidie Ehigiator</MyText>
                </View>
                <View>
                    <MyText style={[textWhite, textH4Style]}>Quisque suscipit ipsum est, eu venenatis leo ornare eget. 
                        Ut porta facilisis elementum. Sed condimentum sed massa quis ullamcorper. 
                        Donec at scelerisque neque. Pellentesque sagittis, 
                        massa sodales sodales finibus, felis ligula tempus lorem, 
                        eu porttitor ex lacus vel felis.</MyText>
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
                        Do not make any payment to tour guides outside of the Aura app or website to protect against scam.</MyText>
                    </View>
                </View>
            </View>
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 30}]}>
                    More Photos
                </MyText>
            </View>
            <View style={{width: '100%', marginBottom: 10}}>
                <View style={[flexRow, ImgContainer]}>
                    <View style={image}>
                        <Image source={require('../../../assets/images/tour/sebastian-sammer-ZAQR0bIijmk-unsplash(5).png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={image}>
                        <Image source={require('../../../assets/images/tour/sebastian-sammer-ZAQR0bIijmk-unsplash(4).png')} resizeMode="cover" style={imgStyle} />
                    </View>
                </View>
                <View style={[flexRow, ImgContainer]}>
                    <View style={image}>
                        <Image source={require('../../../assets/images/tour/sebastian-sammer-ZAQR0bIijmk-unsplash(3).png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={image}>
                        <Image source={require('../../../assets/images/tour/sebastian-sammer-ZAQR0bIijmk-unsplash(2).png')} resizeMode="cover" style={imgStyle}/>
                    </View>
                </View>
                <View style={[flexRow, ImgContainer]}>
                    <View style={image}>
                        <Image source={require('../../../assets/images/tour/sebastian-sammer-ZAQR0bIijmk-unsplash.png')} resizeMode="cover" style={imgStyle}/>
                    </View>
                    <View style={image}>
                        <Image source={require('../../../assets/images/tour/sebastian-sammer-ZAQR0bIijmk-unsplash(1).png')} resizeMode="cover" style={imgStyle}/>
                    </View>
                </View>
            </View>
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 10}]}>Included Equipments</MyText>
            </View>
            <View>
                <View style={{marginBottom: 30, marginTop: 10}}>
                    <View style={[flexRow]}>
                        <View style={[imageView]}>
                            <Icon type="Ionicons" name="map-sharp" style={iconStyleOne} />
                        </View>
                        <View style={{marginLeft: 20, justifyContent: 'center'}}>
                            <MyText style={[textWhite, textH4Style]}>
                                Map
                            </MyText>
                        </View>
                    </View>
                    <View style={[flexRow, {marginTop: 30}]}>
                        <View style={[imageView]}>
                            <Icon type="Ionicons" name="camera" style={iconStyleOne} />
                        </View>
                        <View style={{marginLeft: 20, justifyContent: 'center'}}>
                            <MyText style={[textWhite, textH4Style]}>
                                Camera
                            </MyText>
                        </View>
                    </View>
                </View>
            </View>
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 10}]}>Things To Keep In Mind</MyText>
            </View>
            <View>
                <MyText style={[textWhite, textH4Style, {marginBottom: 30}]}>Quisque suscipit ipsum est, eu venenatis leo ornare eget. 
                        Ut porta facilisis elementum. Sed condimentum sed massa quis ullamcorper. 
                        Donec at scelerisque neque. Pellentesque sagittis, 
                        massa sodales sodales finibus, felis ligula tempus lorem, 
                        eu porttitor ex lacus vel felis.
                </MyText>
            </View>
            <View style={divider}></View>
            <View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 10}]}>Reviews</MyText>
            </View>
            <View style={[flexRow, subContainer, {marginBottom: 30}]}>
                    <MyText style={[textH5Style, textWhite]}>384 reviews </MyText>
                    <MyText style={[textLightGrey, { marginHorizontal: 6 }]}>|</MyText> 
                    <StarComponent grey starContainer={{marginBottom: 0}} />
                </View>
            </View>
            <View>
                <CommentRow name='Joshua Nwabogor'/>
                <View style={divider}></View>
                <CommentRow name='Ashley Cole'/>
                <View style={divider}></View>
                <CommentRow name='Banabas Kaviar'/>
            </View>
            <View style={buttonContainer}>
                <CustomButton buttonText="Show All Reviews" buttonStyle={buttonStyle} textStyle={{color: colors.orange}} />
            </View>
            <View style={divider}></View>
            <TouchableOpacity style={[flexRow, reportContainer]}>
                    <Icon type="MaterialIcons" name="flag" style={iconStyle} />
                    <MyText style={[textH4Style, textSuccess, textUnderline]}>Report This Listing</MyText>
                </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: colors.black,
        paddingTop: 20,
        paddingBottom: 40,
    },
    headerStyle: {
        marginBottom: 15, marginTop: 20
    },
    mapContainer: {
        width: '100%', height: 230, borderRadius: 8, overflow: 'hidden', marginTop: 15, marginBottom: 20
    },
    contentContainer: {
        
    },
    buttonStyle: {
        borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.black, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: '#3B3B3B',
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
    shieldContainer: {
        width: 25, height:25, borderRadius: 25, backgroundColor: colors.orange, padding: 5, 
    },
    textStyle: {
        paddingLeft: 20, paddingRight: 20
    },
    lowerContainer: {
        marginBottom: 30
    },
    image: {
        width: '47.5%',
        height: 190,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20,
    },
    ImgContainer: {
        justifyContent: 'space-between',
    },
    subContainer: {
        alignItems: 'center', marginBottom: 25
    },
    reportContainer: {
        marginTop:30
    },
    iconStyle: {
        fontSize: 25, marginRight: 10, color: colors.success,
    },
    iconStyleOne: {
        fontSize: 25,
        color: colors.white,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 35,
        height: 35,
        width: 35,
    },
});

export default HostComponent;
