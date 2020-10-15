/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Alert, PermissionsAndroid, Platform, ToastAndroid, Switch } from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import { MyText, CustomButton } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';

class HostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forceLocation: true,
      highAccuracy: true,
      showLocationDialog: true,
      significantChanges: false,
      updatesEnabled: false,
      // foregroundService: false,
      location: {},
    };
  }

  // componentWillUnmount() {
  //   this.removeLocationUpdates();
  // }

  hasLocationPermission = async () => {
    // if (Platform.OS === 'ios') {
    //   const hasPermission = await this.hasLocationPermissionIOS();
    //   return hasPermission;
    // }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };  

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState( () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position });
          console.log(position);
        },
        (error) => {
          // this.setState({ loading: false });
          console.log(error);
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };

  HostProperty = () => {
    this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSlider'});
  }

  HostSteps = () => {
    this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSteps'});
  }

  render() {
    const { contentContainer, middleStyle, buttonContainer } = styles;
    const {  textH5Style, textH4Style, textBold, textGrey, textH6Style, textUnderline, textH1Style, textExtraBold, textDarkBlue, textCenter, textGreen } = GStyles;
    const {
      forceLocation,
      highAccuracy,
      // loading,
      location,
      showLocationDialog,
      significantChanges,
      // updatesEnabled,
      // foregroundService,
    } = this.state;
    return (
      <SafeAreaView style={contentContainer}>
        <ScrollView style={{flex: 1}}>
                    <View style={{flex: 2}}>
                        <MyText style={[textExtraBold, textH1Style, textDarkBlue]}>Dashboard</MyText>
                    </View>
                    <View style={middleStyle}>
                        <MyText style={[textGrey, textH6Style, textCenter]}>
                            You have no property listed on Aura yet. Become a host to get started.
                        </MyText>
                    </View>
                    <View style={buttonContainer}>
                    {/* <Switch
                    onValueChange={this.setLocationDialog}
                    value={showLocationDialog}
                  />
                  <Switch
                    onValueChange={this.setForceLocation}
                    value={forceLocation}
                  />
                  <CustomButton
              buttonText="Get Location"
              onPress={this.getLocation}
              // disabled={loading || updatesEnabled}
            /> */}
                        <CustomButton buttonText='Become A Host' onPress={this.HostSteps} buttonStyle={{backgroundColor: colors.black}} textStyle={[textH4Style,{color: colors.white}]}/>
                        <TouchableOpacity onPress={this.HostProperty}>
                            <MyText style={[textUnderline, textGreen, textH5Style, {marginTop: 20}]}>Learn about Hosting</MyText>
                        </TouchableOpacity>
                    </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
         paddingHorizontal: 24,
         paddingVertical: 20,
         flex: 1,
         backgroundColor: colors.white,
    },
    middleStyle: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
        marginBottom: 170,
    },
    buttonContainer: {
        alignItems: 'center',
         flex: 2,
         justifyContent: 'center',
    },
});

export default HostScreen;
