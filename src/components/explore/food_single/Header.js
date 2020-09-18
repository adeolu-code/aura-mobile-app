import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { textH2Style, textExtraBold, textBold, textLgStyle, textH5Style, textGrey, textH4Style, 
        textH3Style, textDarkGrey } = GStyles
    const { title } = this.props;
    const { container } = styles
    return (
      <View style={container}>
        <MyText style={[textH2Style, textExtraBold]}>{title}</MyText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 2, borderTopColor: colors.lightGrey, backgroundColor: colors.white,
        borderBottomWidth: 1, borderBottomColor: colors.lightGrey, elevation: 3, paddingTop: 10
    }
});

export default Header;
