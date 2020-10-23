/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationMainRow from '../../components/dashboard/ReservationMainRow';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, GetRequest } from '../../utils';

class Reservations extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true, error : false };
  }
  componentDidMount () {
  }
  selectTabOne = () => {
    this.setState({ tabOneSelected: true })
  }

  selectTabTwo = () => {
    this.setState({ tabOneSelected: false })
  }


  render() {
    const { textGrey, textH3Style, textH4Style, textSuccess, textWhite, textH5Style, textBold, } = GStyles;
    const { reservationHeader, tabsContainer, tabStyle, rightTabStyle, activeTab, contentContainer, rowContainer } = styles;
    const { tabOneSelected } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <Header {...this.props} title="Reservations" wrapperStyles={{ paddingBottom: 5}} 
        sub="Bookings Made By Clients For Apartments And Hotels" />
        <View style={reservationHeader}>
            <View style={tabsContainer}>
                <TouchableOpacity style={[tabStyle, tabOneSelected ? activeTab : '']} onPress={this.selectTabOne}>
                    <MyText style={[textH5Style,textBold, tabOneSelected ? textWhite : textSuccess]}>Reservations</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={[tabStyle, !tabOneSelected ? activeTab : '']} onPress={this.selectTabTwo}>
                    <MyText style={[textH5Style, textBold, !tabOneSelected ? textWhite : textSuccess]}>Concluded Reservations</MyText>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
            <View style={contentContainer}>
                <View style={rowContainer}>
                    <ReservationMainRow title="Paradise Havens Suites" img={require('../../assets/images/places/bed2.png')}
                    location="Transcorp Hilton Abuja" reserve="5 Active Reservations" {...this.props} />
                </View>
                <View style={rowContainer}>
                    <ReservationMainRow title="Umbaka Homes" img={require('../../assets/images/places/bed1.png')}
                    location="Transcorp Hilton Abuja" reserve="5 Active Reservations" {...this.props} />
                </View>
                <View style={rowContainer}>
                    <ReservationMainRow title="Masaka Homes" img={require('../../assets/images/places/bed3.png')}
                    location="Transcorp Hilton Abuja" reserve="5 Active Reservations" {...this.props} />
                </View>
                <View style={rowContainer}>
                    <ReservationMainRow title="Westgate Suites" img={require('../../assets/images/places/bed.png')}
                    location="Transcorp Hilton Abuja" reserve="1 Active Reservations" {...this.props} />
                </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    reservationHeader: {
        position: 'absolute', backgroundColor: colors.white, paddingTop: 130, width: '100%', paddingHorizontal: 20, zIndex: 1
    }, 
    tabsContainer: {
        display: 'flex', flexDirection: 'row', backgroundColor: colors.lighterGreen, borderRadius: 6, padding: 4,
        marginTop: 20
    },
    tabStyle: {
        flex: 1, paddingVertical: 12, justifyContent: 'center', alignItems: 'center'
    },
    activeTab: {
        backgroundColor: colors.green, borderRadius: 6
    },
    contentContainer: {
        paddingTop: 250, paddingHorizontal: 20, paddingBottom:30
    },
    rowContainer: {
        marginBottom: 20
    }
});

export default Reservations;
