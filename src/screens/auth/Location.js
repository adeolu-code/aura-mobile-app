/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Dimensions, ScrollView, PermissionsAndroid, Platform, Image } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext } from '../../../AppProvider';

import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';

import { setContext, Request, urls, GetRequest, errorMessage } from '../../utils';

const { width, height } = Dimensions.get('window');

const KEY = 'AIzaSyDgK05jlCwTbkjvemPgyjWcT8iiLoVG0xs'

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0
function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class Location extends Component {
  static contextType = AppContext;
  constructor(props) {
      super(props);
      this.state = { cord: null, region: null, markers: [], loading: false };
  }
  requestLocationPermission = async () => {
    if(Platform.OS === 'android') {
      this.requestPermissionAndroid()
    } else {
      this.requestPermissionIos()
    }
  };
  renderLoading = () => {
      const { loading } = this.state;
      if(loading) { return (<Loading />) }
  }
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
          console.log('Cord ', cord, position)
          const obj =  {
            latitude: cord.latitude,
            longitude: cord.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          this.setState({ cord, region: obj })
          
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
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }
  componentDidMount = () => {
    const { location } = this.context.state;
    if(location) {
      const obj =  {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.setState({ cord:location, region: obj })
    } else {
      this.requestLocationPermission()
    }
  }
  onRegionChange = (region) => {
    this.setState({ region })
    // console.log('Region ', region)
  }
  getGeolocation = async () => {
    const { region } = this.state
    this.setState({ loading: true })
    const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${KEY}`)
    this.setState({ loading: false })
    this.getAddressDetails(res.results[0])
    console.log('Res ', res)
  }
  getAddressDetails = (res) => {
    const geometryloc = res.geometry.location
    const addressComponents = res.address_components
    const addressArr = addressComponents.map(item => item.long_name)
    const arr = addressArr.splice(addressArr.length - 2, 2)
    console.log('Address component ',addressComponents, addressArr, arr)

    const { set, state } = this.context
    // console.log('Context State ', state)
    if(state.propertyFormData) {
      const locationObj = { longitude: geometryloc.lng, latitude: geometryloc.lat, state: arr[0], country: arr[1]}
      const obj = { ...state.propertyFormData, ...locationObj }
      set({ propertyFormData: obj })
    } else {
      errorMessage('Please go back and fill out List property section')
    }
  }
  renderMapView = () => {
    const { cord } = this.state;
    const { imgContainer } = styles;
    const { imgStyle } = GStyles
    if(cord) {
      return (
        <View style={[imgContainer, { paddingHorizontal: 0, height: 350, overflow: 'hidden' }]}>
          <MapView region={this.state.region} onRegionChange={this.onRegionChange}
            style={{ height: '100%', width: '100%'}} onPress={e => this.onMapPress(e)} >
            {this.state.markers.map(marker => (
              <Marker key={marker.key} coordinate={marker.coordinate} pinColor={marker.color} />
            ))}
          </MapView>
        </View>
      )
    }
    return (
      <View style={imgContainer}>
        <Image source={require('../../assets/images/globe/globe.png')} resizeMode="contain" style={imgStyle} />
      </View>
    )
  }

  

  render() {
    const { container, picker, button, imageView, iconStyle, input, imgContainer } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, imgStyle, textH4Style, textH5Style, textH6Style} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        {this.renderLoading()}
        <Header {...this.props} title={"Did We Get Your Location Right?"} />
          <View style={container}>
              <View style={{flex: 1, height: '100%'}}>
                
                    <View style={{marginTop: 18, flex: 4 }}>
                        <MyText style={[textGrey, textH5Style]}>
                            Guests will only get your exact address once they’ve booked a reservation
                        </MyText>
                        {this.renderMapView()}
                        {/* <View style={imgContainer}>
                          <Image source={require('../../assets/images/globe/globe.png')} resizeMode="contain" style={imgStyle} />
                        </View> */}
                    </View>
                    <View style={[button]}>
                        <CustomButton buttonText="Next" onPress={this.AmenitiesScreen} buttonStyle={{ elevation: 2}} onPress={this.getGeolocation} />
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
    width: '100%', height: 350, borderWidth: 1, borderRadius: 10, marginTop: 20, borderColor: colors.lightGrey,
    paddingHorizontal: 10
  }
});

export default Location;
