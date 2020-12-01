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

class DashboardComponent extends Component {
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
    this.props.navigation.navigate('Dashboard')
  }
  onPressReservations = () => {
    this.props.navigation.navigate('Reservations')
  }
  onPressProperties = () => {
    this.props.navigation.navigate('ManageProperties')
  }
  onPressRR = () => {
    this.props.navigation.navigate('RatingsReviews')
  }
  onPressEarning = () => {
    this.props.navigation.navigate('Earnings')
  }
  onPressPhotographer = () => {
    this.props.navigation.navigate('Other', { screen: 'TermsOfService' })
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
    const reservations = `All your reservations and their details`;
    const properties = `Create property, edit your properties and view your properties`;
    const reviews = `See all your ratings and reviews`;
    const earning = `View your details of your transactions and how much you have made in the app`
    const photograph = `Become a photographer to display your photos`
    return (
      <>
      {this.renderMenuItems()}
      <View style={container}>
        <Header {...this.props} title="Host Dashboard" onPress={this.openMenu}  />
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
                    <DashboardCardComponent title="Manage Properties" description={properties}
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
                {/* <View style={sectionStyle}>
                    <DashboardCardComponent title="Become a photographer" description={photograph} iconX onPress={this.onPressPhotographer}
                    img={require('../../assets/images/icons/camera.png')} iconName="camera-alt" />
                </View> */}
                
                
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
        zIndex: 1, paddingVertical: 20, paddingHorizontal: 20, marginTop:100
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

export default DashboardComponent;
