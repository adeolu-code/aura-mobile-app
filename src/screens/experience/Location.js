/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput, PermissionsAndroid, 
    Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
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
import ProgressBar from '../../components/ProgressBar'



class Location extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { country: null, city: '', zipCode:'', address: '', loading: false, defaultCountry: '', toggleAutoComplete:false };
    }
    
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    
    
    getSelectedLocation = (value) => {
        const { geometry } = value.details
        const data = value.data
        const city = data.terms[data.terms.length - 2].value
        console.log('Value ', value, city)
        // console.log(longitude: geometry.location.lng, latitude: geometry.location.lat)
    
        this.setState(()=>({ address: data.description, city }), ()=>{
          
        })
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
    
    
    validate = () => {
        const { country, city, address } = this.state
        if(country === null || city === '' || address === '' ) {
            return true
        }
        return false
    }
    next = async () => {
        const { tourOnboard, editTour } = this.context.state
        Keyboard.dismiss()
        if(this.validate() && !editTour) {
            errorMessage('Please fill all fields')
        } else {
            const { address } = this.state;
            const obj = { location: address }
            if(editTour) {
                this.context.set({ tourOnboard: {...tourOnboard, ...obj} })
            } else {
                this.context.set({ tourOnboard: obj })
            }
            this.props.navigation.navigate('TourStack', { screen: 'TourTheme'})
        }
    }

    getAddressDetails = (res) => {
        const geometryloc = res.geometry.location
        const addressComponents = res.address_components
        
        let countryObj = null;
        let stateObj = null
        addressComponents.filter(item => {
            const types = item.types
            const foundCountry = types.find(item => item === 'country')
            const foundState = types.find(item => item === 'administrative_area_level_1')
            if(foundCountry) {
                countryObj = item
            }
            if(foundState) {
                stateObj = item
            }
        })
        const { set, state } = this.context
        const { zipCode, city, address } = this.state
        // if(state.photographOnboard) {
        //     const locationObj = { longitude: geometryloc.lng, latitude: geometryloc.lat, state: stateObj.long_name, 
        //         country: countryObj.long_name, city, zipCode, address }
        //     const obj = { ...state.photographOnboard, ...locationObj }
        //     set({ photographOnboard: obj })
        //     this.props.navigation.navigate('PhotographStack', { screen: 'PhotographLocationMap'})
        // } else {
        //     errorMessage('Please go back and fill out the photograph title section')
        // }
    }

    componentDidMount = async () => {
        const { editTour, tourOnboard } = this.context.state
        const countries = await getAllCountries()
        const country = countries.find(item => item.name.toLowerCase() === 'nigeria')
        this.setState({ defaultCountry: country, country })
        console.log(tourOnboard)
        if(tourOnboard && editTour) {
            this.setState({  address: tourOnboard.location })
        } 
    }

  render() {
    const { container, button } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH5Style, textH6Style, textH3Style} = GStyles;
    const { country } = this.state
    const countrySymbol = country ? country.cca2.toLowerCase() : null
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        {this.renderLoading()}
        <Header { ...this.props } title={"Location"} />

        <KeyboardAvoidingView style={container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ marginTop: 40, zIndex: 1, backgroundColor: colors.white}}>
                <MyText style={[textOrange, textBold, textH3Style]}>Step 1 / 6</MyText>
                <ProgressBar width={16.7} />
                <ProgressBar width={50} />

            </View>
            
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <View style={{ height: 85, width: '100%', marginBottom: 30, flexDirection: 'row', zIndex: 0}}>
                    <CountryPickerComponent getCountry={this.getCountry} defaultCountry={this.state.defaultCountry} />
                </View>
                <View style={[{ paddingHorizontal: 1, elevation: 3}]}>
                    <MyText style={[textH4Style, textGrey, { marginBottom: 15}]}>Which city will you host your experience in ?</MyText>
                    <AutoCompleteComponent locationDetails={this.getSelectedLocation} type={false} autofocus={false} 
                    countrySymbol={countrySymbol} key={this.state.toggleAutoComplete} 
                    placeholder={this.state.address} />
                </View>
                
            </View>
            
            <View style={button}>
                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.next} disabled={!this.state.address} />
            </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, justifyContent: 'flex-end'
    },
});

export default Location;
