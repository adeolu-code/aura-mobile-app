import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import DashboardCardComponent from './DashboardCardComponent';
import Header from './DashboardHeader';
import colors from '../../colors';
import { Icon, Fab, Button } from 'native-base';

import MenuItems from './MenuItems';
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class DashboardTour extends Component {
  constructor(props) {
    super(props);
    this.state = { menuActive: false };
  }

  openMenu = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // LayoutAnimation.configureNext({ duration: 400, create: {}});
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleXY
      )
    );
    this.setState({ menuActive: true })
  }
  closeMenu = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({ menuActive: false })
  }

  onPressDashboard = () => {
    this.props.navigation.navigate('DashboardTour')
  }
  onPressReservations = () => {
    this.props.navigation.navigate('TourReservations')
  }
  onPressProperties = () => {
    this.props.navigation.navigate('ManageTour')
  }
  onPressRR = () => {
    this.props.navigation.navigate('TourRatingsReviews')
  }
  onPressEarning = () => {
    this.props.navigation.navigate('TourEarnings')
  }

  renderMenuItems = () => {
    const { menuStyles } = styles
    if(this.state.menuActive) {
      return (
        <View style={menuStyles}>
          <MenuItems {...this.props} onPress={this.closeMenu} />
        </View>
      )
    }
  }
  

  render() {
    const { textDarkGrey, textH4Style, textH1Style, textBold, textExtraBold } = GStyles;
    const { container, headerStyle, sectionStyle,contentStyle, iconContainer } = styles;
    const dasboardDescription = `View summary of your reservations, comments, properties and ratings`
    const reservations = `Bookings Made By Clients For Experience And Tour`;
    const properties = `Create property, edit your properties and view your properties`;
    const reviews = `See all your ratings and reviews`;
    const earning = `View your details of your transactions and how much you have made in the app`
    return (
      <>
      {this.renderMenuItems()}
      <View style={container}>
        <View style={{ zIndex: 1}}>
          <Header {...this.props} title="Experience/Tour Dashboard" onPress={this.openMenu}  />
        </View>
        <ScrollView>
            <View style={contentStyle}>
                
                <View style={sectionStyle}>
                    <DashboardCardComponent title="Dashboard" description={dasboardDescription} iconX iconName="grid-outline" type="Ionicons"
                     onPress={this.onPressDashboard} />
                </View>

                <View style={sectionStyle}>
                    <DashboardCardComponent title="Reservations" description={reservations} iconName="toys"
                    onPress={this.onPressReservations} />
                </View>

                <View style={sectionStyle}>
                    <DashboardCardComponent title="Manage Tours" description={properties}
                    img={require('../../assets/images/dashboard_icons/reservation.png')} onPress={this.onPressProperties} />
                </View>
                <View style={sectionStyle}>
                    <DashboardCardComponent title="Reviews and Ratings" description={reviews}
                    img={require('../../assets/images/dashboard_icons/review.png')} onPress={this.onPressRR} />
                </View>
                <View style={sectionStyle}>
                    <DashboardCardComponent title="My Earnings" description={earning} iconX onPress={this.onPressEarning}
                    img={require('../../assets/images/dashboard_icons/pay.png')} />
                </View>
                
                
            </View>
        </ScrollView>
        
      </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    headerStyle: {
        marginBottom: 30, backgroundColor: colors.white, position: 'absolute', top: 0,zIndex: 10,
        width: '100%', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sectionStyle: {
        marginBottom: 25
    },
    contentStyle: {
        zIndex: 1, paddingVertical: 20, paddingHorizontal: 20, marginTop:140
    },
    iconContainer: {
      height: 40, width: 40, backgroundColor: colors.white, borderRadius: 5, justifyContent: 'center',
      alignItems: 'center', 
      borderWidth: 1, borderColor: colors.lightGrey
      // borderColor: colors.orange
    },
    menuStyles: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000,
    }
});

export default DashboardTour;
