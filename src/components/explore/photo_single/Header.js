/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';
import { SCREEN_HEIGHT } from '../../../utils'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { headerStyle, shareStyle, shareContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textLgStyle, textH5Style, textGrey, textH4Style, textSuccess, textH6Style, 
        textDarkGrey } = GStyles;
    const { title, location } = this.props
    return (
      <View>
        <View style={[flexRow, headerStyle]}>
            <View style={{ flex: 6}}>
                <MyText style={[textExtraBold, textLgStyle, textDarkGrey]}>{title}</MyText>
                <MyText style={[textH4Style, textGrey]}>{location}</MyText>
                
            </View>
            <View style={{flex: 1,alignItems: 'flex-end' }}>
                {/* <TouchableOpacity style={shareContainer}>
                    <Icon name="share-social" style={shareStyle} />
                </TouchableOpacity> */}
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        // paddingTop: SCREEN_HEIGHT <= 667 ? 50 : 40, 
        paddingBottom: 15,
        backgroundColor: colors.white,
        justifyContent: 'space-between', paddingHorizontal: 20,
    },
    shareContainer: {
        width: 40, height: 40, borderRadius: 40, backgroundColor: colors.white, elevation: 3, justifyContent: 'center',
        alignItems: 'center'
    },
    starContainer: {
        paddingTop: 8, paddingBottom: 0
    },
    shareStyle: {
        color: colors.success, fontSize: 25, marginLeft: -2
    },
});

export default Header;
