/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, SafeAreaView, StatusBar, View} from 'react-native';
import colors from '../../colors';
import GStyles from '../../assets/styles/GeneralStyles';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';
import DashboardComponent from './../../components/dashboard/DashboardComponent';
import DashboardPhotographer from '../../components/dashboard/DashboardPhotographer';
import DashboardTour from '../../components/dashboard/DashboardTour';
import HostScreen from './HostScreen';
import { AppContext } from '../../../AppProvider';
import { MyText } from '../../utils/Index';

import { RESTAURANT, HOST, PHOTOGRAPH, EXPERIENCE } from '../../utils'


class Index extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderLoginOrDashboard = () => {
    const description = `Keep track and manage all your listings and guests’ bookings here when you become a host.`;
    const { userData, isLoggedIn, currentDashboard } = this.context.state;
    if (isLoggedIn && userData) {
        const roleHost = userData.roles.find(item => item === HOST)
        const rolePhotograph = userData.roles.find(item => item === PHOTOGRAPH)
        const roleTour = userData.roles.find(item => item === EXPERIENCE)
        const roleRestaurant = userData.roles.find(item => item === RESTAURANT)
        if(!roleHost && !rolePhotograph && !roleTour && !roleRestaurant) {
          return (
            <View style={{ flex: 1 }}>
              <HostScreen {...this.props} />
            </View>
          );
        } else {
          switch (currentDashboard) {
            case 1:
              return (
                <View style={{ flex: 1 }}>
                  <DashboardComponent {...this.props} />
                </View>
              );
            case 2:
              return (
                <View style={{ flex: 1 }}>
                  <DashboardPhotographer {...this.props} />
                </View>
              );
            case 3:
              break;
            case 4:
              return (
                <View style={{ flex: 1 }}>
                  <DashboardTour {...this.props} />
                </View>
              );
            default:
              return (
                <View style={{ flex: 1 }}>
                  <DashboardComponent {...this.props} />
                </View>
              );
          }
        }
    }
    return (
      <View style={{ flex: 1 }}>
        <PlaceHolderComponent {...this.props} title="Dashboard" description={description} {...this.props} 
        img={require('../../assets/images/dash/dash.png')} />
      </View>
    )
  }

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>

          {this.renderLoginOrDashboard()}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default Index;
