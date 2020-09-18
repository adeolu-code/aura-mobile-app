import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';




class LocationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container, mapContainer, headerStyle } = styles;
    const { textH2Style, textExtraBold,  textH4Style, imgStyle  } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>Location</MyText>
            </View>
            <View style={contentContainer}>
                <MyText style={[textH4Style]}>13A, Hebert Macaulay, Yaba, Lagos</MyText>
                <View style={mapContainer}>
                    <Image source={require('../../assets/images/map/map.png')} resizeMode="cover" style={imgStyle} />
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
        width: '100%', height: 230, borderRadius: 8, overflow: 'hidden', marginTop: 15, marginBottom: 30
    },
    contentContainer: {
        
    },
    
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
});

export default LocationComponent;
