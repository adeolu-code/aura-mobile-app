/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
    const {  propertyContext } = this.props;
    console.log('Property context ', propertyContext)
    // propertyContext.getReservations();
    propertyContext.getRecentReservations();
    propertyContext.getConcludedReservations();
  }
  renderTabs = () => {
    const { tabOneSelected } = this.state;
    if (tabOneSelected) {
        return <RecentReservationsTab {...this.props} {...this.props} />
    } else {
        return <ConcludedReservationsTab {...this.props} {...this.props} />
    }
  }
  selectTabOne = () => {
    this.setState({ tabOneSelected: true })
  }

  selectTabTwo = () => {
    this.setState({ tabOneSelected: false })
  }


//   getRecentReservations = async () => {
//     // const { userData, propertyTypes } = this.context.state;
//     // const { activeRecentReservationsPage, perPage } = this.state;
//     //  const type = propertyTypes.find(item => item.name.toLowerCase() === 'recent');

//     return new Promise( async (resolve, reject) => {
//      // this.set({ loadingRecentReservations: true });
//       const res = await GetRequest(urls.bookingBase,
//       `${urls.v}bookings/property`);
//       console.log(res.data)
//      // /?UserId=${userData.id}&PropertyTypeId=${type.id}&Page=${activeRecentReservationsPage}&Size=${perPage}
//       //this.set({ loadingRecentReservations: false });
//       if (res.isError) {
//         reject(res.message);
//       } else {
//         const data = res.data;
//         resolve(data);
//         this.set({ recentReservations: data.data, activeRecentReservationsPage: data.page, totalRecentReservations: data.totalItems });
//       }
//     });
//   }

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
              <ScrollView>
                  <View style={contentContainer}>
                        {this.renderTabs()}
                      {/* {this.getRecentReservations()} */}
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
        marginTop: 30
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
