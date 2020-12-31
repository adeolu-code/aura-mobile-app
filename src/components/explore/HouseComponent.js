/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {MyText} from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import { Icon } from 'native-base';
import colors from '../../colors';

import StarComponent from '../StarComponent';


class HouseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  linkToHouse = () => {
    this.props.navigation.navigate('Other', { screen: 'HouseSingle'})
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
      imgStyle, flexRow, textSuccess, textExtraBold, textH3Style, textDarkGrey, marginBottomSmall, textGrey, textH4Style,
    } = GStyles;
    const {title, img, location, price, onPress, rating } = this.props;
    return (
      <View>
        <TouchableOpacity style={scrollItemContainer} onPress={onPress}>
          <View style={imgContainer}>
            <Image source={img} resizeMode="cover" style={[imgStyle, { borderRadius: 8}]} />
            {this.renderVerified()}
          </View>
          <View style={contentContainer}>
            <MyText
              style={[
                textSuccess,
                textExtraBold,
                textH3Style,
                marginBottomSmall,
              ]}>
              {price}
            </MyText>
            <MyText style={[textDarkGrey, textH4Style, marginBottomSmall]}>
              {title}
            </MyText>
            <StarComponent grey rating={rating} />
            <MyText style={[textGrey, textH4Style]}>{location}</MyText>
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
        width: '100%', height: 170, borderRadius: 8, marginBottom: 10, backgroundColor: colors.white,
        elevation: 2, ...GStyles.shadow
    },
    iconContainer: {
      backgroundColor: colors.orange, width: 18, height: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
      position: 'absolute', right: 10, top: 10
    },
    iconStyle: {
      color: colors.white, fontSize: 10
    }
});

export default HouseComponent;
