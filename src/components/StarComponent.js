import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

import colors from '../colors';

import GStyles from '../assets/styles/GeneralStyles';

class StarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { sContainer, iconStyle, orangeIcon, colorGrey, colorGreyWhite } = styles;
    const { flexRow } = GStyles;
    const { grey, style, starContainer } = this.props;
    return (
        <View style={[flexRow, sContainer, starContainer ]}>
            <Icon name="star" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} />
            <Icon name="star" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} />
            <Icon name="star" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} />
            <Icon name="star-outline" style={[iconStyle, style, grey ? colorGrey : colorGreyWhite,]} />
            <Icon name="star-outline" style={[iconStyle, style, grey ? colorGrey : colorGreyWhite]} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    sContainer: {
        marginBottom: 10, alignItems: 'center'
    },
    iconStyle: {
      fontSize: 12, marginRight: 7, color: colors.grey
    },
    colorGrey: {
        color: colors.grey
    },
    colorGreyWhite: {
        color: colors.greyWhite
    },
    orangeIcon: {
        color: colors.orange
    },
});

export default StarComponent;
