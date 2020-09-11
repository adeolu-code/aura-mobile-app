import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
;
class ScrollContentFood extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { imgContainer, contentContainer, scrollItemContainer, scrollContainer, starStyle, starContainer } = styles
    const { imgStyle, flexRow, textSuccess, textExtraBold, textH3Style, textDarkGrey, marginBottomSmall, textGrey, textH4Style, textWhite } = GStyles;
    const { width } = Dimensions.get('window')

    const actualWidth = (20/width) * 100
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ width: 2 * width }}>
            <View style={[scrollContainer, { width: '100%' }]}>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../assets/images/food/food.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={contentContainer}>
                        <MyText style={[textWhite, textExtraBold, textH3Style, marginBottomSmall]}>Breakfast Hub</MyText>
                        <View style={[flexRow, marginBottomSmall, starContainer]}>
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                        </View>
                        <MyText style={[textWhite, textH4Style]}>Lagos</MyText>
                    </View>
                </View>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../assets/images/places/bed1.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={contentContainer}>
                        <MyText style={[textWhite, textExtraBold, textH3Style, marginBottomSmall]}>Breakfast Hub</MyText>
                        <View style={[flexRow, marginBottomSmall, starContainer]}>
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                        </View>
                        <MyText style={[textWhite, textH4Style]}>Lagos</MyText>
                    </View>
                </View>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../assets/images/places/bed2.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={contentContainer}>
                        <MyText style={[textWhite, textExtraBold, textH3Style, marginBottomSmall]}>Breakfast Hub</MyText>
                        <View style={[flexRow, marginBottomSmall, starContainer]}>
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                        </View>
                        <MyText style={[textWhite, textH4Style]}>Lagos</MyText>
                    </View>
                </View>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../assets/images/places/bed3.png')} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={contentContainer}>
                        <MyText style={[textWhite, textExtraBold, textH3Style, marginBottomSmall]}>Breakfast Hub</MyText>
                        <View style={[flexRow, marginBottomSmall, starContainer]}>
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                            <Image source={require('../../assets/images/icons/star/star_white.png')} style={starStyle} />
                        </View>
                        <MyText style={[textWhite, textH4Style]}>Lagos</MyText>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30
        // borderWidth: 1
    }, 
    scrollItemContainer: {
        // borderWidth: 1, 
        marginRight: '1.8%', width: '21.5%', 
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

export default ScrollContentFood;
