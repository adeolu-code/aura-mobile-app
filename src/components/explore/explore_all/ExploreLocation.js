import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class ExploreLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { width } = Dimensions.get('window')
    const { textContainer, imgContainer, scrollContainer, scrollItemContainer, overlayStyles, locationStyle, locationContainer } = styles;
    const { imgStyle, flexRow, textH3Style, textExtraBold, textWhite, textH4Style,textH5Style, textBold, textH6Style } = GStyles
    return (
      <View>
        <View style={textContainer}>
            <MyText style={[textH3Style, textExtraBold]}>Explore Based On Location </MyText>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
            <View style={[flexRow, scrollContainer]}>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/places/bed1.png')} resizeMode="cover" style={imgStyle} />
                        <View style={overlayStyles}>
                            <View style={[flexRow, locationContainer]}>
                                <Icon name="location-sharp" style={locationStyle} />
                                <MyText style={[textH5Style, textWhite, textBold]}>Ibadan</MyText>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/places/bed2.png')} resizeMode="cover" style={imgStyle} />
                        <View style={overlayStyles}>
                            <View style={[flexRow, locationContainer]}>
                                <Icon name="location-sharp" style={locationStyle} />
                                <MyText style={[textH5Style, textWhite, textBold]}>Abuja</MyText>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/places/bed3.png')} resizeMode="cover" style={imgStyle} />
                        <View style={overlayStyles}>
                            <View style={[flexRow, locationContainer]}>
                                <Icon name="location-sharp" style={locationStyle} />
                                <MyText style={[textH5Style, textWhite, textBold]}>Lagos</MyText>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={scrollItemContainer}>
                    <View style={imgContainer}>
                        <Image source={require('../../../assets/images/places/bed.png')} resizeMode="cover" style={imgStyle} />
                        <View style={overlayStyles}>
                            <View style={[flexRow, locationContainer]}>
                                <Icon name="location-sharp" style={locationStyle} />
                                <MyText style={[textH5Style, textWhite, textBold]}>Ibadan</MyText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 20
    },
    imgContainer: {
        width: '100%', height: 70, borderRadius: 8, overflow: 'hidden',
    },
    scrollContainer: {
        flexDirection: 'row', marginVertical: 20, paddingHorizontal: 20
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '23%'
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', paddingHorizontal: 10, paddingVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    locationStyle: {
        fontSize: 15, color: colors.orange, marginRight: 3
    },
    locationContainer: {
        alignItems: 'center'
    }
});

export default ExploreLocation;
