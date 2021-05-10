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

import { GetRequest, errorMessage, GOOGLE_API_KEY, SCREEN_HEIGHT } from '../../utils';

const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
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
    this.state = { region: null, markers: [], loading: false };
  }
  
  renderLoading = () => {
      const { loading } = this.state;
      if(loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT }} />) }
  }
  
  AmenitiesScreen = () => {
    this.props.navigation.navigate('Amenities');
  }
  onMapPress = (e) => {
    const coordinate = e.nativeEvent.coordinate
    const region = { ...this.state.region, ...coordinate }
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
      region
    });
  }
  componentDidMount = () => {
    const { location, propertyFormData } = this.context.state;
    if(propertyFormData && propertyFormData.latitude) {
      const obj =  {
        latitude: propertyFormData.latitude,
        longitude: propertyFormData.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      const defaultMarker = {
        coordinate: { longitude: propertyFormData.longitude, latitude: propertyFormData.latitude },
        key: id++,
        color: randomColor()
      }
      const markers = [defaultMarker]
      this.setState({ region: obj, markers })
    } 
  }
  onRegionChange = (region) => {
    // this.setState({ region })
    // console.log('Region ', region)
  }
  getGeolocation = async () => {
    const { region } = this.state
    try {
      this.setState({ loading: true })
      const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?latlng=${region.latitude},${region.longitude}&key=${GOOGLE_API_KEY}`)
      this.setState({ loading: false })
      this.getAddressDetails(res.results[0])
    } catch (error) {
      this.setState({ loading: false })
    }
    // console.log('Res ', res)
  }
  getAddressDetails = (res) => {
    const geometryloc = res.geometry.location
    const addressComponents = res.address_components
    const formatted_address = res.formatted_address
    // const addressArr = addressComponents.map(item => item.long_name)
    // const arr = addressArr.splice(addressArr.length - 2, 2)

    let countryObj = {};
    let stateObj = {};
    let localityObj = {};
    addressComponents.filter(item => {
        const types = item.types
        const foundCountry = types.find(item => item === 'country')
        const foundState = types.find(item => item === 'administrative_area_level_1')
        const foundLocality = types.find(item => item === 'locality')
        if(foundCountry) {
            countryObj = item
        }
        if(foundState) {
            stateObj = item
        }
        if(foundLocality) {
          localityObj = item
        }
    })

    const { set, state } = this.context
    if(state.propertyFormData) {
      const locationObj = { longitude: geometryloc.lng, latitude: geometryloc.lat, state: stateObj.long_name, 
        country: countryObj.long_name, 
        address: state.propertyFormData.address ? state.propertyFormData.address : formatted_address, 
        district: localityObj.long_name}

      const obj = { ...state.propertyFormData, ...locationObj }
      set({ propertyFormData: obj })
      this.props.navigation.navigate('Amenities');
    } 
  }
  renderMapView = () => {
    const { region } = this.state;
    const { imgContainer } = styles;
    const { imgStyle } = GStyles
    if(region) {
      return (
        <View style={[imgContainer, { paddingHorizontal: 0, height: 350, overflow: 'hidden' }]}>
          <MapView region={this.state.region} onRegionChange={this.onRegionChange} minZoomLevel={Platform.OS === 'ios' ? 0 : 15}
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
        <Header {...this.props} title={"Did We Get Your Location Right?"} wrapperStyles={{ position: 'relative'}} />
          <View style={container}>
              <View style={{flex: 1, height: '100%'}}>
                
                    <View style={{marginTop: 14, flex: 4 }}>
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
    // marginTop: Platform.OS === 'ios' ? 140 : 155,
    flex: 1, 
    // borderWidth: 1, borderColor: 'red',
  },
  button: {
    // marginTop: 150,
    // marginBottom: 86, 
    flex: 1.5, justifyContent: 'flex-end', paddingBottom: 20
    // borderWidth: 1
  },
  imgContainer: {
    width: '100%', height: 350, borderWidth: 1, borderRadius: 10, marginTop: 20, borderColor: colors.lightGrey,
    paddingHorizontal: 10
  }
});

export default Location;
