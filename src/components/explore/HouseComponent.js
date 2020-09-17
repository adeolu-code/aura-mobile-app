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
    this.props.navigation.navigate('Other')
  }

  render() {
    const {
      imgContainer,
      contentContainer,
      scrollItemContainer,
    } = styles;
    const {
      imgStyle,
      flexRow,
      textSuccess,
      textExtraBold,
      textH3Style,
      textDarkGrey,
      marginBottomSmall,
      textGrey,
      textH4Style,
    } = GStyles;
    const {title, img, location, price} = this.props;
    return (
      <View>
        <TouchableOpacity style={scrollItemContainer} onPress={this.linkToHouse}>
          <View style={imgContainer}>
            <Image source={img} resizeMode="cover" style={imgStyle} />
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
            <StarComponent grey />
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
        width: '100%', 
    },
    imgContainer: {
        width: '100%', height: 190, borderRadius: 8, overflow: 'hidden', marginBottom: 10
    },
});

export default HouseComponent;
