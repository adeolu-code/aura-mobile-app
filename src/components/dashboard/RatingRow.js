/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base';
import StarComponent from '../StarComponent'

import moment from 'moment'


class RatingRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { container, rightContainer, imgContainer, leftContainer, dateContainer, iconStyle, orangeIcon,
        starContainer } = styles;
    const { flexRow, textGrey, textH4Style, imgStyle, textBold, textH5Style, textDarkGrey } = GStyles;
    const { name, location, img, reviewAction, commentAction, date, rating } = this.props;
    const formattedDate = moment(date).format('MMM DD, YYYY')
    return (
      <View style={[flexRow, container]}>
        <View style={leftContainer}>
            <View style={imgContainer}>
                <Image source={img} resizeMode="cover" style={imgStyle} />
            </View>
        </View>
        <View style={rightContainer}>
            <View style={[flexRow, dateContainer]}>
                <MyText style={[textBold, textH4Style, textDarkGrey]}>{name}</MyText>
                <MyText style={[textGrey, textH5Style]}>{formattedDate}</MyText>
            </View>
            <StarComponent rating={rating} />
            {/* <View style={[flexRow, starContainer]}>
                <Icon name="star" style={[iconStyle, orangeIcon]} />
                <Icon name="star" style={[iconStyle, orangeIcon]} />
                <Icon name="star" style={[iconStyle, orangeIcon]} />
                <Icon name="star-outline" style={[iconStyle]} />
                <Icon name="star-outline" style={[iconStyle]} />
            </View> */}
            {/* <MyText style={[textH5Style, textGrey, { marginBottom: 18}]}>{location}</MyText> */}
            <View style={[flexRow, { marginTop: 18}]}>
                <MyText style={[textGrey, textH5Style, { marginRight: 20}]}>{reviewAction}</MyText>
                <MyText style={[textGrey, textH5Style]}>{commentAction}</MyText>
            </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', paddingVertical: 20
    },
    dateContainer: {
        marginBottom: 5, justifyContent: 'space-between', alignItems: 'flex-end'
    },
    imgContainer: {
        width: 50, height: 50, borderRadius: 50, overflow: 'hidden'
    },
    leftContainer: {
        flex: 1.2
    },
    rightContainer: {
        flex: 5
    },
    starContainer: {
        marginVertical: 7
    },
    iconStyle: {
        fontSize: 12, marginRight: 6, color: colors.grey
    },
    orangeIcon: {
        color: colors.orange
    },
});

export default RatingRow;
