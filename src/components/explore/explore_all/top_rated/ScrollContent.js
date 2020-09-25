import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../../utils/Index';

import { Icon } from 'native-base';
import colors from '../../../../colors'
import HouseComponent from '../../../../components/explore/HouseComponent'
import { color } from 'react-native-reanimated';

class ScrollContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { heading, noDivider, onPress } = this.props
    const { textH3Style, textExtraBold } = GStyles;
    const { scrollItemContainer, scrollContainer, headerContainer, buttonStyle, buttonContainer, dividerContainer, divider } = styles;
    const { width } = Dimensions.get('window')

    return (
      <View>
        <View style={headerContainer}>
            <MyText style={[textH3Style, textExtraBold]}>{heading}</MyText>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
            <View style={[scrollContainer, { width: '100%' }]}>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../../assets/images/places/bed.png')} verified
                    title="Umbaka Home Park" location="Lagos" price="N 200,341/ night" {...this.props} />
                </View>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../../assets/images/places/bed1.png')} verified
                    title="Umbaka Home Park" location="Lagos" price="N 200,341/ night" {...this.props} />
                </View>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../../assets/images/places/bed2.png')} 
                        title="Umbaka Home Park" location="Lagos" price="N 200,341/ night" {...this.props} />
                </View>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../../assets/images/places/bed3.png')} 
                        title="Umbaka Home Park" location="Lagos" price="N 200,341/ night" {...this.props} />
                </View>
            </View>
        </ScrollView>
        <View style={buttonContainer}>
            <CustomButton buttonText="View more place" iconName="arrow-right"
                buttonStyle={buttonStyle} onPress={onPress} />
        </View>
        {!noDivider ? <View style={dividerContainer}>
            <View style={divider}></View>
        </View> : <View></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
        paddingHorizontal: 20
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '21.5%'
    },
    headerContainer: {
        paddingHorizontal: 20, marginTop: 30
    },
    buttonContainer: {
        paddingHorizontal: 20, marginTop: 20, marginBottom: 40
    },
    buttonStyle: {
        backgroundColor: colors.black,
      },
    dividerContainer: {
        paddingHorizontal: 20
    },
    divider: {
        height: 1, backgroundColor: colors.lightGrey, width: '100%'
    }
});

export default ScrollContent;
