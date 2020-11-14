/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';


import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class ImagesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    renderImages = () => {
        const { portofilo } = this.props
        const { imgStyle, flexRow } = GStyles
        if(portofilo && portofilo.length === 1) {
            return (
                <View style={styles.imageOneContainer}>
                    <Image source={{uri: portofilo[0].assetPath}} resizeMode="cover" style={imgStyle} />
                </View>
            )
        } else if(portofilo && portofilo.length > 1) {
            <View style={[flexRow, styles.otherContainer]}>
                {portofilo.map((item, index) => {
                    const key = `P_${index}`
                    return (
                        <View style={styles.imageTwoContainer} key={key}>
                            <Image source={{uri: item.assetPath}} resizeMode="cover" style={imgStyle} />
                        </View>
                    )
                })}
            </View>
        }
    }

    renderLeftImgs = () => {
        const { leftImgContainer } = styles
        const { imgStyle } = GStyles
        const { portofilo } = this.props;
        if(portofilo && portofilo.length !== 0) {
            const twoItems = portofilo.slice(0, 2)
            return twoItems.map((item, i) => {
                const key = `LEFT_${i}`
                return (
                    <View style={leftImgContainer} key={key}>
                        <Image source={{uri: item.assetPath}} resizeMode="cover" style={imgStyle} />
                    </View>
                )
            })
        }
    }
    renderMiddleImgs = () => {
        const { middleImgContainer } = styles
        const { imgStyle } = GStyles
        const { portofilo } = this.props;
        if(portofilo && portofilo.length > 2) {
            const item = portofilo[2]
            return (
                <View style={middleImgContainer}>
                    <Image source={{uri: item.assetPath}} resizeMode="cover" style={imgStyle} />
                </View>
            )
        }
    }
    renderRightImgs = () => {
        const { leftImgContainer } = styles
        const { imgStyle } = GStyles
        const { portofilo } = this.props;
        if(portofilo && portofilo.length > 3) {
            const twoItems = portofilo.slice(2, 5)
            return twoItems.map((item, i) => {
                const key = `RIGHT_${i}`
                return (
                    <View style={leftImgContainer} key={key}>
                        <Image source={{uri: item.assetPath}} resizeMode="cover" style={imgStyle} />
                    </View>
                )
            })
        }
    }

  render() {
    const { photosContainer, container, leftImgContainer, middleImgContainer, leftContainer, middleContainer, 
        rightContainer, portfolioStyle, divider } = styles;
    const { flexRow, imgStyle, textExtraBold, textH3Style, textH4Style } = GStyles
    const { portofilo } = this.props
    return (
      <View style={container}>
        {portofilo && portofilo.length > 4 ? <View style={[flexRow, photosContainer]}>
            <View style={leftContainer}>
                {this.renderLeftImgs()}
            </View>
            <View style={middleContainer}>
                {this.renderMiddleImgs()}
            </View>
            <View style={rightContainer}>
                {this.renderRightImgs()}
            </View>
        </View> : 
        <View>
            {this.renderImages()}
        </View>}
        <TouchableOpacity style={portfolioStyle}>
            <MyText style={[textExtraBold, textH3Style]}>Portfolio</MyText>
        </TouchableOpacity>
        <View style={divider}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
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
        width: '100%', height: 290
    },
    portfolioStyle: {
        marginTop: 20, marginBottom: 30
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    },
    otherContainer: {
        justifyContent: 'space-between'
    },
    imageTwoContainer: {
        width: '45%', height: 200, borderRadius: 10, overflow: 'hidden',
    },
    imageOneContainer: {
        width: '100%', height: 250, borderRadius: 10, overflow: 'hidden',
    }
});

export default ImagesComponent;
