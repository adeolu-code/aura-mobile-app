import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';
import colors from '../../../colors';

import { Icon } from 'native-base';
import StarComponent from '../../StarComponent';


class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  renderVerified = () => {
    const { verified } = this.props;
    const { iconContainer, iconStyle, verifiedContainer } = styles;
    const { textH4Style, flexRow, textWhite, textBold, textH5Style } = GStyles
    if(verified) {
      return (
        <View style={[flexRow, verifiedContainer]}>
            <MyText style={[textH5Style, textWhite, textBold]}>Verified</MyText>
            <View style={iconContainer}>
                <Icon type="FontAwesome5" name="check" style={iconStyle} />
            </View>
        </View>
      )
    } 
  }

  renderType = () => {
    const { bgLightOrange, bgOrange, typeContainer } = styles;
    const {textOrange, textWhite, textH4Style } = GStyles
    const { type } = this.props;
    if(type) {
      return (
        <View style={[typeContainer, type.toLowerCase() === 'apartment' ? bgLightOrange : bgOrange]}>
            <MyText style={[textH4Style, type.toLowerCase() === 'apartment' ? textOrange : textWhite]}>{type}</MyText>
        </View>
      )
    }
  }
  renderPrice = () => {
    const { price } = this.props;
    const { textSuccess, textExtraBold, textH4Style } = GStyles;
    if(price) {
      return (
        <MyText style={[textSuccess,textExtraBold,textH4Style,{marginBottom: 5}]}>
          {price}
        </MyText>
      )
    }
  }
  renderLocation = () => {
    const { location } = this.props;
    const { textSuccess, textExtraBold, textH4Style, textGrey, textH5Style } = GStyles;
    if(location) {
      return (
        <MyText style={[textGrey, textH5Style]}>{location}</MyText>
      )
    }
  }

  render() {
    const { imgStyle, textDarkGrey, textSuccess, textExtraBold, textH4Style,marginBottomSmall, textGrey, 
        textH3Style, textH5Style, textOrange, textWhite } = GStyles;
    const { imgContainer, scrollItemContainer, contentContainer, typeContainer, bgLightOrange, bgOrange } = styles;
    const { onPress, img, location, title, price, type, rating } = this.props
    return (
      <View>
        <TouchableOpacity style={scrollItemContainer} onPress={onPress}>
          <View style={imgContainer}>
            <Image source={img} resizeMode="cover" style={imgStyle} />
            {this.renderVerified()}
            {this.renderType()}
          </View>
          <View style={contentContainer}>
            {this.renderPrice()}
            <MyText style={[textDarkGrey, textH4Style, marginBottomSmall]}>
              {title}
            </MyText>
            <StarComponent grey rating={rating} />
            {this.renderLocation()}
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
        width: '100%', marginBottom: 40
    },
    imgContainer: {
        width: '100%', height: 300, borderRadius: 8, overflow: 'hidden', marginBottom: 10, elevation: 2,
        backgroundColor: colors.lightGrey
    },
    verifiedContainer: {
        position: 'absolute', right: 15, top: 15, justifyContent: 'center', alignItems: 'center'
    },
    iconContainer: {
      backgroundColor: colors.orange, width: 18, height: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
      marginLeft: 8
    },
    iconStyle: {
      color: colors.white, fontSize: 10
    },
    typeContainer: {
        paddingHorizontal: 30, paddingTop: 10, paddingBottom: 13, position: 'absolute',zIndex:20, right: 0, bottom: 0,
        borderTopLeftRadius: 8
    },
    bgOrange: {
        backgroundColor: colors.orange
    },
    bgLightOrange: {
        backgroundColor: colors.lightOrange
    }
});

export default ItemComponent;
