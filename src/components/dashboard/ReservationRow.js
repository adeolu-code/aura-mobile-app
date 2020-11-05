import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base';

class ReservationRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { container, starContainer, imgContainer, rightContainer, iconStyle, orangeIcon, dateStyle } = styles
    const { flexRow, imgStyle, textBold, textH4Style, textH5Style, textGrey, textExtraBold, textFadedBlack } = GStyles;
    const { title, location, reserve, calendar, img } = this.props
    return (
      <View style={[flexRow, container]}>
        <View style={imgContainer}>
            <Image source={img} resizeMode="cover" style={imgStyle} />
        </View>
        <View style={rightContainer}>
            <MyText style={[textExtraBold, textH4Style, textFadedBlack]}>{title}</MyText>

            <View style={[flexRow, starContainer]}>
                <Icon name="star" style={[iconStyle, orangeIcon]} />
                <Icon name="star" style={[iconStyle, orangeIcon]} />
                <Icon name="star" style={[iconStyle, orangeIcon]} />
                <Icon name="star-outline" style={[iconStyle]} />
                <Icon name="star-outline" style={[iconStyle]} />
            </View>
            <MyText style={[textH5Style, textGrey, { marginBottom: 18}]}>{location}</MyText>
            <MyText style={[textH5Style, textGrey]}>{reserve}</MyText>
        </View>
        {calendar ? <View style={dateStyle}>
            <Image source={require('../../assets/images/icons/date_add/date-add.png')} resizeMode="contain" style={{ width: 15, height: 15 }} />
        </View>: <View></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8, marginBottom: 10,
    },
    imgContainer: {
        width: 130, height: 110, borderRadius: 6, overflow: 'hidden', marginRight: 20,
        borderWidth: 1,
    },
    starContainer: {
        marginVertical: 8,
    },
    iconStyle: {
        fontSize: 12, marginRight: 6, color: colors.grey,
    },
    orangeIcon: {
        color: colors.orange,
    },
    dateStyle: {
        position: 'absolute', top: 10, right: 10,
    },
});

export default ReservationRow;
