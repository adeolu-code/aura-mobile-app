/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput, PermissionsAndroid, 
    Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, CustomInput, CountryPickerComponent, Loading } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Geolocation from 'react-native-geolocation-service';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

import AutoCompleteComponent from '../../components/explore/AutoCompleteComponent';
import ProgressBar from '../../components/ProgressBar'

import CancelComponent from '../../components/experience/CancelComponent';




class MeetingLocation extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { country: null, st: '', city: '', zipCode:'', address: '', loading: false, defaultCountry: '', toggleAutoComplete:false };
    }
    
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    
    getSelectedLocation = (value) => {
        const { geometry } = value.details
        const data = value.data
        // const city = data.terms[data.terms.length - 2].value
        // console.log('Value ',data, value, city)
        this.geocodeLocation(data.description)
        // console.log(longitude: geometry.location.lng, latitude: geometry.location.lat)
    
        // this.setState(()=>({ address: data.description, city }), ()=>{
          
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
            this.setState(()=>({ address, st, city: city ? city.long_name : '' }))
            console.log(res)
        } catch (error) {
            this.setState({ loading: false })
        }
    }
    
    getCountry = (country) => {
        this.setState({ country, toggleAutoComplete: !this.state.toggleAutoComplete, city: '' })
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
    updateExperience = async () => {
        Keyboard.dismiss()
        // this.props.navigation.navigate('TourNotes')
        const { tourOnboard } = this.context.state
        const { country, city, address, st, zipCode } = this.state
        this.setState({ loading: true })
        const obj = {
            id: tourOnboard.id,
            meetUpAddress: address,
            meetUpCity: city,
            meetUpCountry: country.name,
            meetUpState: st,
            meetUpZipCode: zipCode
        }
        const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
        console.log('update experience ', res)
        this.setState({ loading: false})
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.navigation.navigate('TourNotes')
        }  
    }

    componentDidMount = async () => {
        
        const { tourOnboard, editTour } = this.context.state;
        const countries = await getAllCountries()
        const country = countries.find(item => item.name.toLowerCase() === 'nigeria')
        this.setState({ defaultCountry: country, country })
        if(editTour) {
            this.setState({ address: tourOnboard.meetUpAddress, city: tourOnboard.meetUpCity, 
                st: tourOnboard.meetUpState, zipCode: tourOnboard.meetUpZipCode})
        }
        
    }

  render() {
    const { container, picker, button, imageView, iconStyle, input } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH3Style, 
        textH5Style, textH6Style, lineHeightText} = GStyles;
    const { country } = this.state
    const countrySymbol = country ? country.cca2.toLowerCase() : null
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        {this.renderLoading()}
        <Header { ...this.props } title={"Where should guests meet you ?"} wrapperStyles={{ position: 'relative'}} />
        <KeyboardAvoidingView style={container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{ marginTop: 0}}>
                <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                <ProgressBar width={16.7 * 5} />
                <ProgressBar width={12.5 * 1} />
            </View>
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ flex: 1}}>
                    <View style={{marginTop: 18}}>
                        <MyText style={[textGrey, textH4Style, lineHeightText]}>
                            Tell guests exactly where to meet you at the start of the experience. 
                            Make sure the location is easy to find. 
                            The exact address won’t be shared until the guest’s reservation is confirmed.
                        </MyText>
                        
                        
                        <View style={{marginTop: 30}}>
                            
                            <View style={[flexRow, {flex: 1, marginBottom: 30}]}>
                                <View style={{flex: 1, marginRight: 10}}>
                                    <CountryPickerComponent getCountry={this.getCountry} defaultCountry={this.state.defaultCountry} />
                                </View>
                                <View style={{flex: 1, marginLeft: 10}}>
                                    <CustomInput label="State" placeholder=" " attrName="st" disabled
                                    value={this.state.st} onChangeText={this.onChangeValue} />
                                </View>
                            </View>
                            <View style={[{ marginBottom: 30, paddingHorizontal: 1}]}>
                                <MyText style={[textH4Style, textGrey, { marginBottom: 10}]}>Address</MyText>
                                <AutoCompleteComponent locationDetails={this.getSelectedLocation} type={true} autofocus={false} 
                                countrySymbol={countrySymbol} key={this.state.toggleAutoComplete} placeholder={this.state.address} />
                                {/* <CustomInput label="Property Location" placeholder=" " attrName="address"
                                value={this.state.address} onChangeText={this.onChangeValue} /> */}
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
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2}} onPress={this.updateExperience} />
                    </View>
                    <View style={[flexRow, styles.skipStyle]}>
                        {this.context.state.editTour ? <CancelComponent {...this.props} /> : <></>}
                        <View style={{ flex: 1}}>
                            <CustomButton buttonText="Skip To Step 6" 
                            buttonStyle={{ elevation: 2, ...GStyles.shadow, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
                            textStyle={{ color: colors.orange }}
                            onPress={()=> { this.props.navigation.navigate('TourStack', { screen: 'TourSafetyOverview' }) }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, 
        // marginTop: Platform.OS === 'ios' ? 80 : 100,
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
      marginTop: 60, flex: 1, marginBottom: 20
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
    skipStyle: {
        marginBottom: 20
    }
});

export default MeetingLocation;
