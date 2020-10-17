/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, PermissionsAndroid, Platform, Image } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import Geolocation from 'react-native-geolocation-service';

import { setContext, Request, urls, GetRequest, errorMessage } from '../../utils';


class Location extends Component {
  constructor(props) {
      super(props);
      this.state = {
        };
  }
  requestLocationPermission = async () => {
    if(Platform.OS === 'android') {
      this.requestPermissionAndroid()
    } else {
      this.requestPermissionIos()
    }
  };
  requestPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Aura App Location Permission",
          message: "Aura App needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
        this.getCurrentPos()
      } else {
        console.log("Location permission denied");
        // this.resources()
      }
    } catch (err) {
      console.warn("Warn error ",err);
      // this.resources();
    }
  }

  requestPermissionIos = async () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
    .then((result) => {
      console.log('Request permissions ios ', result)
      switch (result) {
        case 'granted':
          this.getCurrentPos();
          break;
        default:
          // this.resources()
          break;
      }
    })
    .catch((error) => {
      console.log('Permissions catched error ', error)
    });
  }
  getCurrentPos = async () => {
    Geolocation.getCurrentPosition(
        async (position) => {
          const cord = position.coords;
          console.log('Cord ', cord)
          // http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${cord.latitude},${cord.longitude}&key=${Dev.API_KEY}`
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  AmenitiesScreen = () => {
    this.props.navigation.navigate('Amenities');
  }

  componentDidMount = () => {
    // this.requestLocationPermission()
  }

  render() {
    const { container, picker, button, imageView, iconStyle, input, imgContainer } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, imgStyle, textH4Style, textH5Style, textH6Style} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title={"Did We Get Your Location Right?"} />
          <View style={container}>
              <View style={{flex: 1, height: '100%'}}>
                
                    <View style={{marginTop: 18, flex: 4 }}>
                        <MyText style={[textGrey, textH5Style]}>
                            Guests will only get your exact address once they’ve booked a reservation
                        </MyText>
                        <View style={imgContainer}>
                          <Image source={require('../../assets/images/globe/globe.png')} resizeMode="contain" style={imgStyle} />
                        </View>
                    </View>
                    <View style={[button]}>
                        <CustomButton buttonText="Next" onPress={this.AmenitiesScreen} buttonStyle={{ elevation: 2}} />
                    </View>
                
              </View>
          </View> 
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    marginTop: 140,
    flex: 1, 
    // borderWidth: 1, borderColor: 'red',
  },
  button: {
    // marginTop: 150,
    // marginBottom: 86, 
    flex: 1,
    // borderWidth: 1
  },
  imgContainer: {
    width: '100%', height: 250, borderWidth: 1, borderRadius: 10, marginTop: 20, borderColor: colors.lightGrey,
    paddingHorizontal: 10
  }
});

export default Location;
