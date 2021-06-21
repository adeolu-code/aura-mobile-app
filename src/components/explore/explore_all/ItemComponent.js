import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, Pressable } from 'react-native';
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

  renderDiscount = () => {
    const { textWhite, textH5Style } = GStyles
    const { percentOff } = this.props
    if(percentOff) {
      return (
        <View style={styles.discountContainer}>
          <MyText style={[textWhite, textH5Style]}>{percentOff}% OFF</MyText>
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
    const { price, originalAmount } = this.props;
    const { textSuccess, textExtraBold, textH4Style, textStrikeThrough, flexRow, textGreyWhite } = GStyles;
    
    if(price) {
      // console.log('original price 3', originalAmount)
      return (
        <View style={[flexRow]}>
          
          {originalAmount ? <MyText style={[textGreyWhite, textStrikeThrough, textH4Style, { marginRight: 15}]}>{originalAmount}</MyText> : <></>}
          
          <MyText style={[textSuccess,textExtraBold,textH4Style,{marginBottom: 5 }]}>
            {price}
          </MyText>
        </View>
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
  renderPropertyId = () => {
    const { propertyId } = this.props;
    const { textSuccess, textExtraBold, textH4Style, textGrey, textH5Style } = GStyles;
    if(propertyId) {
      return (
        <MyText style={[textGrey, textH5Style, { marginTop: 5}]}>Unique Id: <MyText style={[textExtraBold]}>{propertyId}</MyText></MyText>
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
        <Pressable style={scrollItemContainer} onPress={onPress}>
          <View style={imgContainer}>
            <Image source={img} resizeMode="cover" style={[imgStyle, { borderRadius: 8 }]} />
            {this.renderDiscount()}
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
            {this.renderPropertyId()}
          </View>
        </Pressable>
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
        width: '100%', height: 300, borderRadius: 8, marginBottom: 10, elevation: 2,
        backgroundColor: colors.lightGrey, ...GStyles.shadow
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
        borderTopLeftRadius: 8, borderBottomRightRadius: 8
    },
    bgOrange: {
        backgroundColor: colors.orange
    },
    bgLightOrange: {
        backgroundColor: colors.lightOrange
    },
    discountContainer: {
      paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8, backgroundColor: colors.green, position: 'absolute',
      left: 20, top: 20
    }
});

export default ItemComponent;
