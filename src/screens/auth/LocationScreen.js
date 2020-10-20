/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput, PermissionsAndroid, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, CustomInput, CountryPickerComponent, Loading } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Geolocation from 'react-native-geolocation-service';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage } from '../../utils';

import { AppContext } from '../../../AppProvider';

class LocationScreen extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { country: null, st: '', city: '', zipCode:'', address: '', loading: false };
    }
    
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
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
            errorMessage('Please grant access to your location to continue')
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn("Warn error ",err);
          errorMessage('Something went wrong, please try again')
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
                errorMessage('Please grant access to your location to continue')
                break;
            }
        })
        .catch((error) => {
            console.log('Permissions catched error ', error)
            errorMessage('Something went wrong, please try again')
        });
    }
    getCurrentPos = async () => {
        this.setState({ loading: true })
        Geolocation.getCurrentPosition(
            async (position) => {
                const cord = position.coords;
                this.getGeolocation(cord)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    getGeolocation = async (cord) => {
        const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?latlng=${cord.latitude},${cord.longitude}&key=${GOOGLE_API_KEY}`)
        this.setState({ loading: false })
        this.getAddressDetails(res.results[0])
    }
    getCountry = (country) => {
        this.setState({ country })
    }
    getPresentLocation = () => {
        this.requestLocationPermission()
    }
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    validate = () => {
        const { country, st, city, address } = this.state
        if(country === null || st === '' || city === '' || address === '' ) {
            return true
        }
        return false
    }
    next = async () => {
        Keyboard.dismiss()
        if(this.validate()) {
            errorMessage('Please fill all fields')
        } else {
            const { address, country, st, city } = this.state;
            this.setState({ loading: true })
            const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?address=${address},${city},${country.name}&key=${GOOGLE_API_KEY}`)
            this.setState({ loading: false })
            this.getAddressDetails(res.results[0])
        }
    }

    getAddressDetails = (res) => {
        const geometryloc = res.geometry.location
        const addressComponents = res.address_components
        const addressArr = addressComponents.map(item => item.long_name)
        const arr = addressArr.splice(addressArr.length - 2, 2)
        // console.log('Address component ',addressComponents, addressArr, arr)
        const { set, state } = this.context
        const { zipCode, city } = this.state
        if(state.propertyFormData) {
            const locationObj = { longitude: geometryloc.lng, latitude: geometryloc.lat, state: arr[0], country: arr[1], district: city, zipCode }
            const obj = { ...state.propertyFormData, ...locationObj }
            set({ propertyFormData: obj })
            this.props.navigation.navigate('LocationMap');
        } else {
            errorMessage('Please go back and fill out List property section')
        }
    }

  render() {
    const { container, picker, button, imageView, iconStyle, input } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH5Style, textH6Style} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        {this.renderLoading()}
        <Header { ...this.props } title={"Where Is Your Place Located"} />
          <ScrollView style={container} keyboardShouldPersistTaps="always">
            <View style={{ flex: 1}}>
                <View style={{marginTop: 18}}>
                    <MyText style={[textGrey, textH4Style]}>
                        Guests will only get your exact address once they’ve booked a reservation
                    </MyText>
                    <TouchableOpacity style={{marginTop: 44}} onPress={this.getPresentLocation}>
                        <View style={[flexRow]}>
                            <View style={[imageView]}>
                                <Icon type="FontAwesome" name="location-arrow" style={iconStyle} />
                            </View>
                            <View style={{marginLeft: 20, justifyContent: 'center'}}>
                                <MyText style={[textOrange, textH4Style, textBold, textUnderline]}>
                                    Use Present Location
                                </MyText>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={{marginTop: 45}}>
                        <MyText style={[textGrey, textH5Style]}>
                            Are You Listing As A Part Of A Company?
                        </MyText>
                        <TextInput style={input}/>
                    </View> */}
                    <View style={{marginTop: 50}}>
                        <View style={[{ marginBottom: 30}]}>
                            <CustomInput label="Property Location" placeholder=" " attrName="address"
                            value={this.state.address} onChangeText={this.onChangeValue} />
                        </View>
                        <View style={[flexRow, {flex: 1, marginBottom: 30}]}>
                            <View style={{flex: 1, marginRight: 10}}>
                                <CountryPickerComponent getCountry={this.getCountry} />
                            </View>
                            <View style={{flex: 1, marginLeft: 10}}>
                                <CustomInput label="State" placeholder=" " attrName="st"
                                value={this.state.st} onChangeText={this.onChangeValue} />
                            </View>
                        </View>
                        <View style={[flexRow, {flex: 1}]}>
                            <View style={{flex: 1, marginRight: 10}}>
                                <CustomInput label="City" placeholder=" " attrName="city"
                                value={this.state.city} onChangeText={this.onChangeValue} />
                            </View>
                            <View style={{flex: 1, marginLeft: 10}}>
                                <CustomInput label="Zip Code" placeholder=" " attrName="zipCode"
                                value={this.state.zipCode} onChangeText={this.onChangeValue} />
                            </View>
                        </View>
                    </View>
                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.next} />
                </View>
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 24, marginTop: 120,
    flex: 1, flexGrow: 1
  },
  picker: {
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      borderColor: colors.lightGreyOne,
      marginTop: 10,
  },
  button: {
      marginTop: 140, flex: 1,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.orange,
        borderRadius: 25,
        height: 25,
        width: 25,
    },
    iconStyle: {
        fontSize: 15,
        color: colors.orange,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 80,
        borderColor: colors.lightGreyOne,
        marginTop: 10,
    },
});

export default LocationScreen;
