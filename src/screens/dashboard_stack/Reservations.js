/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, 
  TouchableWithoutFeedback, Platform } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationMainRow from '../../components/dashboard/ReservationMainRow';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, GetRequest } from '../../utils';


import { ReservationsContext, ReservationsConsumer } from '../../../ReservationsProvider';

import ConcludedReservationsTab from '../../components/dashboard/ConcludedReservationsTab';
import RecentReservationsTab from '../../components/dashboard/RecentReservationsTab';

class Reservations extends Component {
  static contextType = ReservationsContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true, error : false };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
}
  componentDidMount () {
    const { reservationsContext } = this.props;
    
    reservationsContext.getRecentReservations();
    reservationsContext.getConcludedReservations();
  }
  renderTabs = () => {
    const { tabOneSelected } = this.state;
    if (tabOneSelected) {
        return <RecentReservationsTab {...this.props} />
    } else {
        return <ConcludedReservationsTab {...this.props} />
    }
  }
  selectTabOne = () => {
    this.setState({ tabOneSelected: true })
  }

  selectTabTwo = () => {
    this.setState({ tabOneSelected: false })
  }


  render() {
    const { textGrey, textH3Style, textH4Style, textSuccess, textWhite, textH5Style, textH6Style, textBold, } = GStyles;
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
                          <MyText style={[textH6Style, textBold, !tabOneSelected ? textWhite : textSuccess]}>Concluded Reservations</MyText>
                      </TouchableOpacity>
                  </View>
              </View>
              
              {this.renderTabs()}
            </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    reservationHeader: {
        position: 'absolute', backgroundColor: colors.white, paddingTop: Platform.OS === 'ios' ? 120 : 130,
         width: '100%', paddingHorizontal: 20, zIndex: 1
    }, 
    tabsContainer: {
        display: 'flex', flexDirection: 'row', backgroundColor: colors.lighterGreen, borderRadius: 6, padding: 4,
        marginTop: 30
    },
    tabStyle: {
        flex: 1, paddingVertical: 12, justifyContent: 'center', alignItems: 'center'
    },
    activeTab: {
        backgroundColor: colors.green, borderRadius: 6
    },
    contentContainer: {
        paddingTop: 250,
    },
    rowContainer: {
        marginBottom: 20
    }
});

export default Reservations;
