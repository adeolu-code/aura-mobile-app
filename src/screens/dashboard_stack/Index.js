/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {ScrollView, StyleSheet, SafeAreaView, StatusBar, View} from 'react-native';
import colors from '../../colors';
import GStyles from '../../assets/styles/GeneralStyles';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';
import DashboardComponent from './../../components/dashboard/DashboardComponent';
import DashboardPhotographer from '../../components/dashboard/DashboardPhotographer';
import HostScreen from './HostScreen';
import { AppContext } from '../../../AppProvider';
import { MyText } from '../../utils/Index';


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
        const roleHost = userData.roles.find(item => item === 'Host')
        const rolePhotograph = userData.roles.find(item => item === 'Photographer')
        const roleTour = userData.roles.find(item => item === 'Tour')
        if(!roleHost && !rolePhotograph) {
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
            default:
              return (
                <View style={{ flex: 1 }}>
                  <DashboardComponent {...this.props} />
                </View>
              );
          }
        }
        // if (roleHost) {
        //   return (
        //     <View style={{ flex: 1 }}>
        //       <DashboardComponent {...this.props} />
        //     </View>
        //   );
        // } else {
        //   return (
        //     <View style={{ flex: 1 }}>
        //       <HostScreen {...this.props} />
        //     </View>
        //   );
        // }
    }
    return (
      <ScrollView>
        <PlaceHolderComponent {...this.props} title="Dashboard" description={description} {...this.props} 
        img={require('../../assets/images/dash/dash.png')} />
      </ScrollView>
    )
  }

  render() {
    const description = `Keep track and manage all your listings and guests’ bookings here when you become a host.`;
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>

          {this.renderLoginOrDashboard()}
          {/* <ScrollView>
            <PlaceHolderComponent title="Dashboard" description={description} {...this.props} 
            img={require('../../assets/images/dash/dash.png')} />
          </ScrollView>
          <View style={{ flex: 1 }}>
            <DashboardComponent {...this.props} />
          </View> */}
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default Index;
