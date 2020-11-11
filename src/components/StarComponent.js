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
  stars = () => {
    const { rating } = this.props
    if(rating && rating !== null) {
      return Math.floor(rating);
    } else {
      return 0
    }
    
  }

  decimal = () => {
    const { rating } = this.props
    if(rating && rating !== null) {
      return rating % 1
    } else {
      return 0
    }
  }

  remainingStars = () => {
      const { rating } = this.props
      if(rating && rating !== null) {
        let count = 0;
        if (this.stars() !== 0) {
            count = this.stars();
        }
        if (this.decimal() !== 0 && this.decimal() >= 0.5 ) {
            count++;
        }
        return 5 - count;
      } else {
        return 5
      }
      
  }

  renderFullStars = () => {
      const stars = new Array(this.stars()).fill(0);
      const { iconStyle, orangeIcon, colorGrey, colorGreyWhite } = styles;
      const { grey, style } = this.props;
      return stars.map((item, index) => {
          return  (
            <Icon name="star" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} key={index} />
          )
      })
  }
  renderHalfStar = () => {
      const { iconStyle, orangeIcon, colorGrey, colorGreyWhite } = styles;
      const { grey, style } = this.props;
      if(this.decimal() !== 0 && this.decimal() >= 0.5) {
          return (
            <Icon name="star-half-outline" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} key={index} />
          )
      }
  }
  renderEmptyStars = () => {
      const stars = new Array(this.remainingStars()).fill(0);
      const { iconStyle, colorGrey, colorGreyWhite } = styles;
      const { grey, style } = this.props;
      return stars.map((item, index) => {
          return  (
            <Icon name="star-outline" style={[iconStyle, style, grey ? colorGrey : colorGreyWhite,]} key={index+10} />
          )
      })
  }
  renderRating = () => {
      const { rating, review, user, textStyle } = this.props
      const { textWhite, textH4Style } = GStyles
      if(rating) {
          if(review) {
              return <MyText style={[textWhite, textH4Style]}> ({ user ? formatAmount(user.stars) : '**'})</MyText>
          }
          return <MyText style={[textWhite, textH4Style, textStyle]}> ({ user ? formatAmount(user.averageStar) : '**'})</MyText>
      }
  }

  render() {
    const { sContainer, iconStyle, orangeIcon, colorGrey, colorGreyWhite } = styles;
    const { flexRow } = GStyles;
    const { grey, style, starContainer } = this.props;
    return (
        <View style={[flexRow, sContainer, starContainer ]}>
            {this.renderFullStars()}
            {this.renderHalfStar()}
            {this.renderEmptyStars()}
            {/* <Icon name="star" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} />
            <Icon name="star" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} />
            <Icon name="star" style={[iconStyle, grey ? colorGrey : colorGreyWhite, style, orangeIcon]} />
            <Icon name="star-outline" style={[iconStyle, style, grey ? colorGrey : colorGreyWhite,]} />
            <Icon name="star-outline" style={[iconStyle, style, grey ? colorGrey : colorGreyWhite]} /> */}
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
