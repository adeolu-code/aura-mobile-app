import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';

class FoodComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { imgContainer, contentContainer, scrollItemContainer, starStyle, starContainer } = styles;
    const { imgStyle, flexRow, textExtraBold, textH3Style, marginBottomSmall, textH4Style, textWhite } = GStyles;
    const { title, img, location } = this.props;
    return (
        <View style={scrollItemContainer}>
            <View style={imgContainer}>
                <Image source={img} resizeMode="cover" style={imgStyle} />
            </View>
            <View style={contentContainer}>
                <MyText style={[textWhite, textExtraBold, textH3Style, marginBottomSmall]}>{title}</MyText>
                <View style={[flexRow, marginBottomSmall, starContainer]}>
                    <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                    <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                    <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                    <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                    <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                </View>
                <MyText style={[textWhite, textH4Style]}>{location}</MyText>
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
        // borderColor: 'red'
    },
    imgContainer: {
        width: '100%', height: 190, borderRadius: 10, overflow: 'hidden', marginBottom: 10
    },
    starStyle: {
        height: 14, width: 14, marginRight: 10
    },
    starContainer: {
        marginTop: 8, marginBottom: 15
    }
});

export default FoodComponent;
