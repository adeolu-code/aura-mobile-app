import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import FoodComponent from './FoodComponent';

class TourImgComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { imgContainer2, imgContainer1, container, bottomImgContainer } = styles;
    const { imgStyle, flexRow } = GStyles
    return (
      <View style={container}>
        <View style={imgContainer1}>
            <Image source={require('../../assets/images/photo/photo2.png')} resizeMode="cover" style={imgStyle} />
        </View>
        <View style={[flexRow, bottomImgContainer]}>
            <View style={imgContainer2}>
                <Image source={require('../../assets/images/photo/photo4.png')} resizeMode="cover" style={imgStyle} />
            </View>
            <View style={imgContainer2}>
                <Image source={require('../../assets/images/photo/photo3.png')} resizeMode="cover" style={imgStyle} />
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    imgContainer1: {
        width: '100%', height: 170, marginTop: 30, marginBottom: 20, borderRadius: 5, overflow: 'hidden',
    },
    bottomImgContainer: {
        justifyContent: 'space-between'
    },
    imgContainer2: {
        width: '47.5%', height: 190, borderRadius: 5, overflow: 'hidden'
    }
});

export default TourImgComponent;
