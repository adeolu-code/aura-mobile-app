/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base';

import StarComponent from '../StarComponent';

class PhotoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  linkToPhoto = () => {
    const { photo } = this.props
    this.props.navigation.push('Other', { screen: 'PhotoSingle', params: { photo } })
  }

  render() {
    const { imgContainer, contentContainer, scrollItemContainer } = styles;
    const { imgStyle, flexRow, textSuccess, textExtraBold, textH3Style, textDarkGrey, marginBottomSmall, textGrey,
      textH4Style } = GStyles;
    const { title, img, location, price, title1, title2 } = this.props;
    return (
      <View>
        <TouchableOpacity style={scrollItemContainer} onPress={this.linkToPhoto}>
            <View style={imgContainer}>
                <Image source={img} resizeMode="cover" style={[imgStyle, { borderRadius: 8}]} />
            </View>
            <View style={contentContainer}>
                <MyText style={[textDarkGrey, textExtraBold, textH3Style, marginBottomSmall]}>{title1}</MyText>
                <MyText style={[textDarkGrey, textH3Style, marginBottomSmall]}>{title2}</MyText>
                {/* <StarComponent grey /> */}
                
                {/* <MyText style={[textGrey, textH4Style]}>{location}</MyText> */}
            </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    scrollItemContainer: {
        // borderWidth: 1, 
        // marginRight: '1.8%', 
        width: '100%', paddingLeft: 2
    },
    imgContainer: {
        width: '100%', height: 200, borderRadius: 8, marginBottom: 10,
        elevation: 2, backgroundColor: colors.lightGrey, ...GStyles.shadow
    },
});

export default PhotoComponent;
