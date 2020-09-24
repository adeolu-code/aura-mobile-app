/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText } from '../../utils/Index';

import colors from '../../colors';

import BackHeader from '../../components/BackHeader'

import ImageAndDetails from '../../components/explore/ImageAndDetails';
import AmenitiesComponent from '../../components/explore/AmenitiesComponent';
import RulesComponent from '../../components/explore/RulesComponent';
import LocationComponent from '../../components/explore/LocationComponent';
import HostComponent from '../../components/explore/HostComponent';
import DetailsComponent from '../../components/explore/DetailsComponent';
import ReviewsComponent from '../../components/explore/ReviewsComponent';
import CommentComponent from '../../components/explore/CommentComponent';
import BottomMenuComponent from '../../components/explore/home_single/BottomMenuComponent';

import CalendarModal from '../../components/explore/home_single/CalendarModal';
import ScrollContent from '../../components/explore/ScrollContent';

class HomeSingle extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false,
        imgArr: [require('../../assets/images/places/house.png'), 
        require('../../assets/images/places/bed3.png'), require('../../assets/images/places/bed.png'),
        require('../../assets/images/places/bed2.png'), require('../../assets/images/places/bed1.png')] };
  }

  openModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { buttomContainer, placeAroundContainer, headerStyle, scrollContainer } = styles;
    const { imgStyle, textWhite, textH3Style, textDarkGrey, textExtraBold, textH2Style } = GStyles
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <BackHeader {...this.props} />
        <ScrollView>
            <View>
                <ImageAndDetails imgArr={this.state.imgArr} house title="Umbaka Home Park" />
                <AmenitiesComponent btn />
                <RulesComponent title="House Rules" />
                <LocationComponent />
                <HostComponent />
                <DetailsComponent />
                <ReviewsComponent />
                <CommentComponent />

                <View style={placeAroundContainer}>
                    <View style={headerStyle}>
                        <MyText style={[textH2Style, textExtraBold]}>More Places To Stay</MyText>
                    </View>
                    <View style={scrollContainer}>
                        <ScrollContent {...this.props} />
                    </View>
                </View>
            </View>
        </ScrollView>
        <View style={buttomContainer}>
            <BottomMenuComponent onPress={this.openModal} />
        </View>
        <CalendarModal visible={this.state.showModal} onDecline={this.closeModal} />
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
    headerStyle: {
        marginBottom: 10, marginTop: 10, paddingHorizontal: 20
    },
    scrollContainer: {
        marginLeft: 20,
    },
    placeAroundContainer: {
        paddingTop: 20, paddingBottom:100,
        backgroundColor: colors.white,
        borderTopWidth: 2, borderTopColor: colors.lightGrey
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    buttomContainer: {
        position: 'absolute', bottom: 0, width: '100%'
    }
    
});

export default HomeSingle;
