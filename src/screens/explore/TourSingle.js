/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText } from '../../utils/Index';

import colors from '../../colors';

import BackHeader from '../../components/BackHeader';

import Header from '../../components/explore/tour_single/Header';
import BottomMenuComponent from '../../components/explore/tour_single/BottomMenuComponent';
import HostComponent from '../../components/explore/tour_single/HostComponent';
import ScrollContent from '../../components/explore/tour_single/ScrollContent';

import TourModal from '../../components/explore/tour_single/TourModal';

class TourSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false,
    };
  }
  openModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { buttonContainer, placeAroundContainer, headerStyle, scrollContainer } = styles;
    const {  textExtraBold, textH2Style } = GStyles;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <BackHeader {...this.props} />
            <ScrollView>
                <View>
                    <Header title={'Rakuna Desert\n And Springs'} />
                    <HostComponent />
                </View>
                <View style={placeAroundContainer}>
                    <View style={headerStyle}>
                        <MyText style={[textH2Style, textExtraBold]}>More Photographers Around You</MyText>
                    </View>
                    <View style={scrollContainer}>
                        <ScrollContent {...this.props} />
                    </View>
                </View>
            </ScrollView>
            <View style={buttonContainer}>
                <BottomMenuComponent onPress={this.openModal} title='Show Available Dates' price='₦ 200,341/person' />
            </View>
            <View>
                <TourModal visible={this.state.showModal} onDecline={this.closeModal} />
            </View>
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
    scrollContainer: {
        marginLeft: 20,
    },
    placeAroundContainer: {
        paddingTop: 20, paddingBottom:100,
        backgroundColor: colors.white,
        borderTopWidth: 2, borderTopColor: colors.lightGrey,
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    buttonContainer: {
        position: 'absolute', bottom: 0, width: '100%',
    }, 
});


export default TourSingle;
