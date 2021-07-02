import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, Pressable } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText } from '../../utils/Index';
import colors from '../../colors';

import { Icon } from 'native-base';


class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  

  render() {
    const { imgStyle, textDarkGrey, textSuccess, textExtraBold, textH4Style,marginBottomSmall, textGrey, 
        textH3Style, textH5Style, textOrange, textWhite } = GStyles;
    const { imgContainer, scrollItemContainer, contentContainer, typeContainer, bgLightOrange, bgOrange } = styles;
    const { onPress, img, location, title, price, type, rating } = this.props
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.grey, height: '100%'
    },
    scrollItemContainer: {
        // borderWidth: 1, 
        // marginRight: '1.8%', 
        width: '100%', marginBottom: 40
    },
    imgContainer: {
        width: '100%', height: 300, borderRadius: 8, marginBottom: 10, elevation: 2,
        backgroundColor: colors.lightGrey, ...GStyles.shadow
    },
    
});

export default ItemComponent;
