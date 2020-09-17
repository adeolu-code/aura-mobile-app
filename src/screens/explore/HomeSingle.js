import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import Swiper from 'react-native-swiper'

import { MyText } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import BackHeader from '../../components/BackHeader'
import StarComponent from '../../components/StarComponent';

import ImageAndDetails from '../../components/explore/home_single/ImageAndDetails';
import AmenitiesComponent from '../../components/explore/home_single/AmenitiesComponent';


class HomeSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { headerStyle, shareStyle, shareContainer, iconStyle, starContainer, imgContainer, contentContainer,
    overlayStyles, iconVerifiedContainer, verifiedStyle, countContainer, divider, thumbContainer, thumbTxtContainer, thumbStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textH1Style, textLgStyle, textH5Style, textGrey, textH4Style, 
        imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <BackHeader {...this.props} />
        <ScrollView>
            <View>
                <ImageAndDetails />
                <AmenitiesComponent />
            </View>
            

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: 70, paddingBottom: 15,
        backgroundColor: colors.white,
        justifyContent: 'space-between', paddingHorizontal: 20,
    },
    
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    
});

export default HomeSingle;
