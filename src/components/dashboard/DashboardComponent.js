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

  render() {
    const { textDarkGrey, textH4Style, textH1Style, textBold, textExtraBold } = GStyles;
    const { container, headerStyle, sectionStyle,contentStyle } = styles;
    const dasboardDescription = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.`
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
                    <DashboardCardComponent title="Reservations" description={dasboardDescription}
                    img={require('../../assets/images/dashboard_icons/reservation.png')} />
                </View>

                <View style={sectionStyle}>
                    <DashboardCardComponent title="Manage Properties" description={dasboardDescription}
                    img={require('../../assets/images/dashboard_icons/reservation.png')} />
                </View>
                <View style={sectionStyle}>
                    <DashboardCardComponent title="Reviews and Ratings" description={dasboardDescription}
                    img={require('../../assets/images/dashboard_icons/review.png')} />
                </View>
                <View style={sectionStyle}>
                    <DashboardCardComponent title="My Earnings" description={dasboardDescription} iconX
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
