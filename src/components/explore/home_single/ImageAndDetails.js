import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import Swiper from 'react-native-swiper'

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import StarComponent from '../../../components/StarComponent';


class ImageAndDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { headerStyle, shareStyle, shareContainer, iconStyle, starContainer, imgContainer, contentContainer,
        overlayStyles, iconVerifiedContainer, verifiedStyle, countContainer, divider, thumbContainer, thumbTxtContainer, thumbStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textLgStyle, textH5Style, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
        <View>
            <View style={[flexRow, headerStyle]}>
                <View>
                    <MyText style={[textExtraBold, textLgStyle]}>Umbaka Home Park</MyText>
                    <View style={starContainer}>
                        <StarComponent style={iconStyle} grey />
                    </View>
                    <MyText style={[textH4Style, textGrey]}>Lagos</MyText>
                </View>
                <TouchableOpacity style={shareContainer}>
                    <Icon name="share-social" style={shareStyle} />
                </TouchableOpacity>
            </View>

            <View style={contentContainer}>
                <View style={imgContainer}>
                    <Image source={require('../../../assets/images/places/house.png')} resizeMode="cover" style={imgStyle} />
                    <View style={overlayStyles}>
                        <View style={[flexRow]}>
                            <MyText style={[textWhite, textH3Style, { marginRight: 5}]}>Verified</MyText>
                            <View style={iconVerifiedContainer}>
                                <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                            </View>
                        </View>
                        <View style={countContainer}>
                            <MyText style={[textH4Style, textWhite, textBold]}>1/10</MyText>
                        </View>
                    </View>
                </View>
                <View style={divider}></View>
                <View style={{marginVertical: 25}}>
                    <MyText style={[textH2Style, { marginBottom: 8}]}>Private room in bed and breakfast</MyText>
                    <MyText style={[textH5Style, textGrey]}>3 guests · 1 bedroom · 3 beds · 1 private bath</MyText>

                    <View style={[flexRow, thumbTxtContainer]}>
                        <View style={thumbContainer}>
                            <Image source={require('../../../assets/images/photo/photo3.png')} resizeMode="cover" style={thumbStyle} />
                            <View style={{ position: 'absolute', right: 0, top: -5}}>
                                <View style={iconVerifiedContainer}>
                                    <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                                </View>
                            </View>
                        </View>
                        <MyText style={[textH3Style]}>Posted by Yuko Ono</MyText>
                    </View>
                </View>
                <View style={divider}></View>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: 70, paddingBottom: 15,
        backgroundColor: colors.white,
        justifyContent: 'space-between', paddingHorizontal: 20,
    },
    shareContainer: {
        width: 40, height: 40, borderRadius: 40, backgroundColor: colors.white, elevation: 3, justifyContent: 'center',
        alignItems: 'center'
    },
    starContainer: {
        paddingTop: 8, paddingBottom: 2
    },
    shareStyle: {
        color: colors.success, fontSize: 25, marginLeft: -2
    },
    iconStyle: {
        fontSize: 16
    },
    imgContainer: {
        width: '100%', height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 35
    },
    contentContainer: {
        paddingHorizontal: 20
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between', alignItems: 'flex-end', padding: 20
    },
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white
    },
    countContainer: {
        borderRadius: 30, paddingHorizontal: 20, paddingTop:10, paddingBottom: 12, backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    thumbContainer: {
        width: 60, height: 60, borderRadius: 60, marginRight: 20
    },
    thumbStyle: {
        width: 60, height: 60, borderRadius: 60,
    },
    thumbTxtContainer: {
        paddingVertical: 15, alignItems:'center'
    }
});

export default ImageAndDetails;
