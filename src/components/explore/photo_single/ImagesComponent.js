/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import MasonryList from "react-native-masonry-list";

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class ImagesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        images: [{ source: require('../../../assets/images/photo/pic.png'),
            dimensions: { width: 120, height: 150 }
        },  { source: require('../../../assets/images/photo/pic5.png'),
            dimensions: { width: 200, height: 510 }
        }, 
        { source: require('../../../assets/images/photo/pic1.png'),
                dimensions: { width: 120, height: 150 }
            },{ source: require('../../../assets/images/photo/pic2.png'),
            dimensions: { width: 110, height: 150 }
        }, { source: require('../../../assets/images/photo/pic3.png'),
            dimensions: { width: 108, height: 150 }
        }]
    };
  }

  render() {
    const { photosContainer, container, leftImgContainer, middleImgContainer, leftContainer, middleContainer, 
        rightContainer } = styles;
    const { flexRow, imgStyle } = GStyles
    return (
      <View style={container}>
          <View  style={[photosContainer]}>
            <MasonryList columns="3"
                    images={this.state.images} listContainerStyle={{margin: 0}}
                />
            </View>
        {/* <View style={[flexRow, photosContainer]}>
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
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15
    },
    photosContainer: {
        // justifyContent: 'space-between', 
        width: '100%', borderRadius: 30, overflow: 'hidden',
        // borderWidth: 1
    },
    leftContainer: {
        width: '32%'
    },
    middleContainer:{
        width: '32%'
    },
    rightContainer: {
        width: '32%'
    },
    
    leftImgContainer: {
        width: '100%', height: 200
    },
    middleImgContainer: {
        width: '100%', height: 400
    }
});

export default ImagesComponent;
