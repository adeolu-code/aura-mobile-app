import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import RatingsComponent from '../../components/dashboard/ratings_reviews/RatingsComponent';
import ReviewsComponent from '../../components/dashboard/ratings_reviews/ReviewsComponent';
import ReportsComponent from '../../components/dashboard/ratings_reviews/ReportsComponent';

class RatingsAndReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOne: true, tabTwo: false, tabThree: false };
  }

  selectTabTwo = () => {
    this.setState({ tabTwo: true, tabOne: false, tabThree: false })
  }
  selectTabOne = () => {
    this.setState({ tabOne: true, tabThree: false, tabTwo: false })
  }
  selectTabThree = () => {
      this.setState({ tabOne: false, tabThree: true, tabTwo: false })
  }

  renderTabs = () => {
    const { tabOne, tabTwo, tabThree } = this.state
    if(tabOne) {
        return <ReviewsComponent />
    }
    if(tabTwo) {
        return <RatingsComponent />
    }
    if(tabThree) {
        return <ReportsComponent />
    }
  }


  render() {
    const { textGrey, textH3Style, textH4Style, textSuccess, textWhite, textH5Style, textBold, } = GStyles;
    const { rrHeader, tabsContainer, tabStyle, rightTabStyle, activeTab, contentContainer, rowContainer } = styles;
    const { tabOne, tabTwo, tabThree } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <Header {...this.props} title="Reviews & Ratings" wrapperStyles={{ paddingBottom: 5}} />
        <View style={rrHeader}>
            <View style={tabsContainer}>
                <TouchableOpacity style={[tabStyle, tabOne ? activeTab : '']} onPress={this.selectTabOne}>
                    <MyText style={[textH5Style,textBold, tabOne ? textWhite : textSuccess]}>Reviews</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={[tabStyle, tabTwo ? activeTab : '']} onPress={this.selectTabTwo}>
                    <MyText style={[textH5Style, textBold, tabTwo ? textWhite : textSuccess]}>Ratings</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={[tabStyle, tabThree ? activeTab : '']} onPress={this.selectTabThree}>
                    <MyText style={[textH5Style, textBold, tabThree ? textWhite : textSuccess]}>Reports</MyText>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
            <View style={contentContainer}>
                {this.renderTabs()}
                {/* <View style={rowContainer}>
                    <ReservationMainRow title="Paradise Havens Suites" img={require('../../assets/images/places/bed2.png')}
                    location="Transcorp Hilton Abuja" reserve="5 Active Reservations" {...this.props} />
                </View>
                <View style={rowContainer}>
                    <ReservationMainRow title="Umbaka Homes" img={require('../../assets/images/places/bed1.png')}
                    location="Transcorp Hilton Abuja" reserve="5 Active Reservations" {...this.props} />
                </View> */}
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    rrHeader: {
        position: 'absolute', backgroundColor: colors.white, paddingTop: 100, width: '100%', paddingHorizontal: 20, zIndex: 1
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
        paddingTop: 210, paddingBottom:30
    },
});

export default RatingsAndReviews;
