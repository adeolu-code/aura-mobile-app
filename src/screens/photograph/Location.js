/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput, PermissionsAndroid, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, CustomInput, CountryPickerComponent, Loading } from '../../utils/Index';
import colors from '../../colors';

import Geolocation from 'react-native-geolocation-service';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage } from '../../utils';

import { AppContext } from '../../../AppProvider';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

import AutoCompleteComponent from '../../components/explore/AutoCompleteComponent';


class Location extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { country: null, st: '', city: '', zipCode:'', street: '', loading: false, defaultCountry: '', toggleAutoComplete:false };
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
    getSelectedLocation = (value) => {
        const { geometry } = value.details
        const data = value.data
        this.geocodeLocation(data.description)
        // const city = data.terms[data.terms.length - 2].value
        // console.log('Value ', value, city)
        // console.log(longitude: geometry.location.lng, latitude: geometry.location.lat)
    
        // this.setState(()=>({ street: data.description, city }), ()=>{
          
        // })
    }
    geocodeLocation = async (address) => {
        try {
            this.setState({ loading: true })
            const res = await GetRequest(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`, '')
            this.setState({ loading: false })
            const address_components = res.results[0].address_components
            const st = address_components[address_components.length - 2].long_name
            const city = address_components[address_components.length - 3]
            console.log(city)
            this.setState(()=>({ street: address, st, city: city ? city.long_name : '' }))
        } catch (error) {
            this.setState({ loading: false })
        }
        
    }
    getGeolocation = async (cord) => {
        try {
            const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?latlng=${cord.latitude},${cord.longitude}&key=${GOOGLE_API_KEY}`)
            this.setState({ loading: false })
            this.getAddressDetails(res.results[0])  
        } catch (error) {
            
        }
    }
    getCountry = (country) => {
        this.setState({ country, toggleAutoComplete: !this.state.toggleAutoComplete, city: '' })
    }
    getPresentLocation = () => {
        this.requestLocationPermission()
    }
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    validate = () => {
        const { country, st, city, street } = this.state
        if(country === null || st === '' || city === '' || street === '' ) {
            return true
        }
        return false
    }
    next = async () => {
        Keyboard.dismiss()
        if(this.validate()) {
            errorMessage('Please fill all fields')
        } else {
            const { street, country, st, city } = this.state;
            try {
                this.setState({ loading: true })
                const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?address=${street},${city},${country.name}&key=${GOOGLE_API_KEY}`)
                this.setState({ loading: false })
                this.getAddressDetails(res.results[0])
            } catch (error) {
                this.setState({ loading: false })
            }
        }
    }

    getAddressDetails = (res) => {
        const geometryloc = res.geometry.location
        const addressComponents = res.address_components
        
        let countryObj = null;
        let stateObj = null;
        let cityObj = null;
        let streetObj = null;
        addressComponents.filter(item => {
            const types = item.types
            const foundCountry = types.find(item => item === 'country')
            const foundState = types.find(item => item === 'administrative_area_level_1')
            const foundCity = types.find(x => x === 'locality')
            const foundStr = types.find(x => ( x === 'route' ))
            if(foundCountry) {
                countryObj = item
            }
            if(foundState) {
                stateObj = item
            }
            if(foundCity) {
                cityObj = item
            }
            if(foundStr) {
                streetObj = item
            }
        })
        const { set, state } = this.context
        const { zipCode, city, street } = this.state
        if(state.photographOnboard) {
            const locationObj = { longitude: geometryloc.lng, latitude: geometryloc.lat, state: stateObj?.long_name, 
                country: countryObj?.long_name, city: city ? city : cityObj?.long_name, zipCode, street: street ? street : streetObj?.long_name }
            const obj = { ...state.photographOnboard, ...locationObj }
            console.log(obj)
            set({ photographOnboard: obj })
            this.props.navigation.navigate('PhotographStack', { screen: 'PhotographLocationMap'})
        } else {
            errorMessage('Please go back and fill out the photograph title section')
        }
    }

    componentDidMount = async () => {
        const { edit, photographOnboard, editPhotograph } = this.context.state
        if(photographOnboard && editPhotograph) {
            this.setState({ st: photographOnboard.address.state, city: photographOnboard.address.city, 
                street: photographOnboard.address.street, zipCode: photographOnboard.address.zipCode})

            const countries = await getAllCountries()
            const country = countries.find(item => item.name.toLowerCase() === photographOnboard.address.country.toLowerCase())
            if(country) {
                this.setState({ defaultCountry: country, country })
            }
        } else {
            const countries = await getAllCountries()
            const country = countries.find(item => item.name.toLowerCase() === 'nigeria')
            this.setState({ defaultCountry: country, country })
        }
        
    }

  render() {
    const { container, picker, button, imageView, iconStyle, input } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH5Style, textH6Style} = GStyles;
    const { country } = this.state
    const countrySymbol = country ? country.cca2.toLowerCase() : null
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        {this.renderLoading()}
        <Header { ...this.props } title={"Provide Your Location"} wrapperStyles={{ position: 'relative'}} />
          <ScrollView style={container} keyboardShouldPersistTaps="always">
            <View style={{ flex: 1}}>
                <View style={{marginTop: 0}}>
                    {/* <MyText style={[textGrey, textH4Style]}>
                        Guests will only get your exact street once they’ve booked a reservation
                    </MyText> */}
                    <TouchableOpacity style={{marginTop: 14}} onPress={this.getPresentLocation}>
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
                    <View style={{marginTop: 30}}>
                        <View style={[{ marginBottom: 30, paddingHorizontal: 1}]}>
                            <MyText style={[textH4Style, textGrey, { marginBottom: 10}]}>Location/Address</MyText>
                            <AutoCompleteComponent locationDetails={this.getSelectedLocation} type={true} autofocus={false} 
                            countrySymbol={countrySymbol} key={this.state.toggleAutoComplete} 
                            placeholder={this.state.street} />
                            {/* <CustomInput label="Property Location" placeholder=" " attrName="street"
                            value={this.state.street} onChangeText={this.onChangeValue} /> */}
                        </View>
                        <View style={[flexRow, {flex: 1, marginBottom: 30}]}>
                            <View style={{flex: 1, marginRight: 10}}>
                                <CountryPickerComponent getCountry={this.getCountry} defaultCountry={this.state.defaultCountry} />
                            </View>
                            <View style={{flex: 1, marginLeft: 10}}>
                                <CustomInput label="State" placeholder=" " attrName="st" disabled
                                value={this.state.st} onChangeText={this.onChangeValue} />
                            </View>
                        </View>
                        <View style={[flexRow, {flex: 1}]}>
                            <View style={{flex: 1, marginRight: 10}}>
                                <CustomInput label="City" placeholder=" " attrName="city"
                                value={this.state.city} onChangeText={this.onChangeValue} />
                            </View>
                            <View style={{flex: 1, marginLeft: 10}}>
                                <CustomInput label="Zip Code" placeholder=" " attrName="zipCode" keyType="numeric"
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
    paddingHorizontal: 24, 
    // marginTop: 100,
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
      marginTop: 140, flex: 1, marginBottom: 40
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

export default Location;
