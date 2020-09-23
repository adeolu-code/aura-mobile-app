import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';


import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class MorePhotosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {  contentContainer, divider, container, headerStyle, photosContainer, imgContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, textH5Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>More Photos</MyText>
            </View>
            <View style={contentContainer}>
                <View style={[flexRow, photosContainer]}>
                    
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/photo/pic8.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/photo/pic6.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/photo/pic3.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/photo/pic2.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/photo/pic4.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/photo/pic5.png')} resizeMode="cover" style={imgStyle} />
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
        // paddingHorizontal: 20
        width: '100%'
    },
    headerStyle: {
        marginBottom: 15, marginTop: 20, marginBottom: 30
    },
    
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGreyTwo,
        // marginVertical: 30
    },
    photosContainer: {
        flexWrap: 'wrap', justifyContent: 'space-between', paddingBottom: 20
    },
    imgContainer: {
        width: '48%', height: 170, borderRadius: 10, overflow: 'hidden', marginBottom: 15
    }
});

export default MorePhotosComponent;
