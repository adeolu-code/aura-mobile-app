import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {MyText} from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';

class HouseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      imgContainer,
      contentContainer,
      scrollItemContainer,
      starStyle,
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
        <View style={scrollItemContainer}>
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
            <MyText style={[textDarkGrey, textH3Style, marginBottomSmall]}>
              {title}
            </MyText>
            <View style={[flexRow, marginBottomSmall]}>
              <Image
                source={require('../../assets/images/icons/star/star.png')}
                style={starStyle}
              />
              <Image
                source={require('../../assets/images/icons/star/star.png')}
                style={starStyle}
              />
              <Image
                source={require('../../assets/images/icons/star/star.png')}
                style={starStyle}
              />
              <Image
                source={require('../../assets/images/icons/star/star_empty.png')}
                style={starStyle}
              />
              <Image
                source={require('../../assets/images/icons/star/star_empty.png')}
                style={starStyle}
              />
            </View>
            <MyText style={[textGrey, textH4Style]}>{location}</MyText>
          </View>
        </View>
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
    starStyle: {
        height: 14, width: 14, marginRight: 10
    }
});

export default HouseComponent;
