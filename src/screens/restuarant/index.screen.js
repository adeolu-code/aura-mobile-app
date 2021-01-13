import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import DashboardCardComponent from './../../components/dashboard/DashboardCardComponent';
import Header from './../../components/dashboard/DashboardHeader';
import colors from '../../colors';
import { Icon, Fab, Button } from 'native-base';

import MenuItems from './../../components/dashboard/MenuItems';
import { Styles as styles } from "./restuarant.style";
import { AppContext } from '../../../AppProvider';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class RestaurantDashboardComponent extends Component {
  static contextType = AppContext;
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
    this.props.navigation.navigate('RestaurantStack', {screen: 'RestaurantDashboard'})
  }
  onPressReservations = () => {
    this.props.navigation.navigate('RestaurantStack', {screen: 'RestaurantOrders'})
  }
  onPressProperties = () => {
    this.props.navigation.navigate('RestaurantStack', {screen: 'AddRestaurant'})
    // this.props.navigation.navigate('AddRestaurant')
  }
  onPressRR = () => {
    this.props.navigation.navigate('RestaurantReviews')
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
            <MenuItems {...this.props}                 
                onPress={this.closeMenu} 
            />
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
    console.log("current Dashboard", this.context.state.currentDashboard)
    return (
      <>
      {this.renderMenuItems()}
      <View style={[container, {backgroundColor: 'white'}]}>
        <Header {...this.props} title="Resturant Dashboard" onPress={this.openMenu}  />
        <ScrollView style={{marginTop: 0, height: '80%'}} >
            <View style={[contentStyle, {paddingBottom: 20}]}>
                
                {/* <View style={sectionStyle}>
                    <DashboardCardComponent title="Dashboard" description={dasboardDescription} iconX iconName="grid-outline" type="Ionicons"
                     onPress={this.onPressDashboard} />
                </View> */}

                <View style={sectionStyle}>
                    <DashboardCardComponent title="Orders" 
                        description={reservations} 
                        onPress={this.onPressReservations} 
                        img={require('../../assets/images/dashboard_icons/reservation.png')}
                    />
                </View>

                <View style={sectionStyle}>
                    <DashboardCardComponent title="Manage Restaurants" description={properties}
                    img={require('../../assets/images/dashboard_icons/reservation.png')} onPress={this.onPressProperties} />
                </View>
                <View style={sectionStyle}>
                    <DashboardCardComponent title="Reviews and Ratings" description={reviews}
                    img={require('../../assets/images/dashboard_icons/review.png')} onPress={this.onPressRR} />
                </View>
                {/* <View style={sectionStyle}>
                    <DashboardCardComponent title="My Earnings" description={earning} iconX onPress={this.onPressEarning}
                    img={require('../../assets/images/dashboard_icons/pay.png')} />
                </View> */}
                
                
            </View>
        </ScrollView>
        
      </View>
      </>
    );
  }
}