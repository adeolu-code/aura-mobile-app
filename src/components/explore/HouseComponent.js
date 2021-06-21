/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Pressable} from 'react-native';
import {MyText} from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import { Icon } from 'native-base';
import colors from '../../colors';

import StarComponent from '../StarComponent';
import FastImage from 'react-native-fast-image'


class HouseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  linkToHouse = () => {
    this.props.navigation.navigate('Other', { screen: 'HouseSingle'})
  }
  renderDiscount = () => {
    const { textWhite, textH5Style, textH6Style, textH7Style, textH8Style } = GStyles
    const { percentOff } = this.props
    if(percentOff) {
      return (
        <View style={styles.discountContainer}>
          <MyText style={[textWhite, textH8Style]}>{percentOff}% OFF</MyText>
        </View>
      )
    }
  }
  renderVerified = () => {
    const { verified } = this.props;
    const { iconContainer, iconStyle } = styles
    if(verified) {
      return (
        <View style={iconContainer}>
          <Icon type="FontAwesome5" name="check" style={iconStyle} />
        </View>
      )
    } 
  }

  render() {
    const {
      imgContainer,
      contentContainer,
      scrollItemContainer,
    } = styles;
    const {
      imgStyle, flexRow, textSuccess, textExtraBold, textH3Style, textDarkGrey, marginBottomSmall, textGrey,
      textH4Style, textH5Style, textGreyWhite, textStrikeThrough
    } = GStyles;
    const {title, img, location, price, onPress, rating, propertyId, originalAmount } = this.props;
    return (
      <View>
        <Pressable style={scrollItemContainer} onPress={onPress}>
          <View style={imgContainer}>
            <FastImage source={img} resizeMode="cover" style={[imgStyle, { borderRadius: 8}]} />
            {this.renderDiscount()}
            {this.renderVerified()}
          </View>
          <View style={contentContainer}>
              <View>
                {originalAmount ? <MyText style={[textGreyWhite, textStrikeThrough, textH4Style, { marginBottom: 5}]}>{originalAmount}</MyText> : <></>}
              </View>  
              <MyText style={[ textSuccess, textExtraBold, textH4Style, marginBottomSmall,]}>
                {price}
              </MyText>
            
            <MyText style={[textDarkGrey, textH4Style, marginBottomSmall]}>
              {title}
            </MyText>
            <StarComponent grey rating={rating} />
            <MyText style={[textGrey, textH4Style]}>{location}</MyText>
            {propertyId ? <MyText style={[textGrey, textH5Style, { marginTop: 5}]}>Unique Id: <MyText style={[textExtraBold]}>{propertyId}</MyText></MyText> : <></>}
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
        width: '100%', paddingLeft: 2
    },
    imgContainer: {
        width: '100%', height: 170, borderRadius: 8, marginBottom: 10, backgroundColor: colors.white,
        elevation: 2, ...GStyles.shadow
    },
    iconContainer: {
      backgroundColor: colors.orange, width: 18, height: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
      position: 'absolute', right: 10, top: 10
    },
    iconStyle: {
      color: colors.white, fontSize: 10
    },
    discountContainer: {
      paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, backgroundColor: colors.green, position: 'absolute',
      left: 10, top: 10
    }
});

export default HouseComponent;
