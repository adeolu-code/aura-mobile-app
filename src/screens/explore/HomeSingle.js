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
import HouseRulesComponent from '../../components/explore/home_single/HouseRulesComponent';
import LocationComponent from '../../components/explore/home_single/LocationComponent';
import HostComponent from '../../components/explore/home_single/HostComponent';
import DetailsComponent from '../../components/explore/home_single/DetailsComponent';
import ReviewsComponent from '../../components/explore/home_single/ReviewsComponent';
import CommentComponent from '../../components/explore/home_single/CommentComponent';
import BottomMenuComponent from '../../components/explore/home_single/BottomMenuComponent';

import CalendarModal from '../../components/explore/home_single/CalendarModal';
import ScrollContent from '../../components/explore/ScrollContent';

class HomeSingle extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
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
                <ImageAndDetails />
                <AmenitiesComponent />
                <HouseRulesComponent />
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
