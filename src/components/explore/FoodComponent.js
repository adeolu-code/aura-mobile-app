import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';

import { Icon } from 'native-base';

import StarComponent from '../StarComponent';


class FoodComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // linkToFood = () => {
  //   this.props.navigation.navigate('Other', { screen: 'FoodSingle'})
  // }

  render() {
    const { imgContainer, contentContainer, scrollItemContainer } = styles;
    const { imgStyle, flexRow, textExtraBold, textH3Style, marginBottomSmall, textH4Style, textWhite } = GStyles;
    const { title, img, location, onPress } = this.props;
    return (
        <View>
            <TouchableOpacity style={scrollItemContainer} onPress={onPress}>
                <View style={imgContainer}>
                    <Image source={img} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={contentContainer}>
                    <MyText style={[textWhite, textExtraBold, textH3Style, marginBottomSmall]}>{title}</MyText>
                    {/* <StarComponent /> */}
                    <MyText style={[textWhite, textH4Style]}>{location}</MyText>
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
        // borderColor: 'red'
    },
    imgContainer: {
        width: '100%', height: 190, borderRadius: 8, elevation:3, overflow: 'hidden', marginBottom: 10, backgroundColor: colors.lightGrey
    },
});

export default FoodComponent;
