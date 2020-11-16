import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import DashboardCardComponent from './DashboardCardComponent';
import colors from '../../colors';

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
  

  render() {
    const { textDarkGrey, textH4Style, textH1Style, textBold, textExtraBold } = GStyles;
    const { container, headerStyle, sectionStyle,contentStyle } = styles;
    const dasboardDescription = `View summary of your reservations, comments, properties and ratings`
    const reservations = `All your reservations and their details`;
    const properties = `Create property, edit your properties and view your properties`;
    const reviews = `See all your ratings and reviews`;
    const earning = `View your details of your transactions and how much you have made in the app`
    return (
      <View style={container}>
        <View style={headerStyle}>
            <MyText style={[textDarkGrey, textH1Style, textExtraBold ]}>Dashboard </MyText>
        </View>
        <ScrollView>
            <View style={contentStyle}>
                
                <View style={sectionStyle}>
                    <DashboardCardComponent title="Dashboard" description={dasboardDescription} iconX
                    img={require('../../assets/images/dashboard_icons/dashboard.png')} onPress={this.onPressDashboard} />
                </View>

                <View style={sectionStyle}>
                    <DashboardCardComponent title="Reservations" description={reservations}
                    img={require('../../assets/images/dashboard_icons/reservation.png')} onPress={this.onPressReservations} />
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
                
            </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    headerStyle: {
        marginBottom: 30, backgroundColor: colors.white, position: 'absolute', top: 0,zIndex: 10,
        width: '100%', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30
    },
    sectionStyle: {
        marginBottom: 25
    },
    contentStyle: {
        zIndex: 1, paddingVertical: 20, paddingHorizontal: 20, marginTop:100
    }
});

export default DashboardComponent;
