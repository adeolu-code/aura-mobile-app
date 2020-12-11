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
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';

import AutoCompleteComponent from '../../components/explore/AutoCompleteComponent';
import ProgressBar from '../../components/ProgressBar'



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
        const city = data.terms[data.terms.length - 2].value
        console.log('Value ', value, city)
        // console.log(longitude: geometry.location.lng, latitude: geometry.location.lat)
    
        this.setState(()=>({ address: data.description, city }), ()=>{
          
        })
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
        
        const { state } = this.context
        const countries = await getAllCountries()
        const country = countries.find(item => item.name.toLowerCase() === 'nigeria')
        this.setState({ defaultCountry: country, country })
        // const ppty = state.propertyFormData;
        // if(ppty && state.edit) {
        //     if(ppty.longitude || ppty.latitude) {
        //         this.setState({ st: ppty.state, city: ppty.district, address: ppty.address, zipCode: ppty.zipCode})
        //     }
        //     const countries = await getAllCountries()
        //     const country = countries.find(item => item.name.toLowerCase() === ppty.country.toLowerCase())
        //     if(country) {
        //         this.setState({ defaultCountry: country, country })
        //     }
        // } else {
        //     const countries = await getAllCountries()
        //     const country = countries.find(item => item.name.toLowerCase() === 'nigeria')
        //     this.setState({ defaultCountry: country, country })
        // }
        
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
        <Header { ...this.props } title={"Where should guests meet you ?"} />
        <View style={container}>
            <View style={{ marginTop: 70}}>
                <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                <ProgressBar width={16.7 * 5} />
                <ProgressBar width={14.2 * 1} />
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
                                    <CustomInput label="State" placeholder=" " attrName="st"
                                    value={this.state.st} onChangeText={this.onChangeValue} />
                                </View>
                            </View>
                            <View style={[{ marginBottom: 30, paddingHorizontal: 1}]}>
                                <MyText style={[textH4Style, textGrey, { marginBottom: 10}]}>Address</MyText>
                                <AutoCompleteComponent locationDetails={this.getSelectedLocation} type={true} autofocus={false} 
                                countrySymbol={countrySymbol} key={this.state.toggleAutoComplete} />
                                {/* <CustomInput label="Property Location" placeholder=" " attrName="address"
                                value={this.state.address} onChangeText={this.onChangeValue} /> */}
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
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2}} onPress={this.updateExperience} />
                    </View>
                    <View style={styles.skipStyle}>
                        <CustomButton buttonText="Skip To Step 6" 
                        buttonStyle={{ elevation: 2, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
                        textStyle={{ color: colors.orange }}
                        onPress={()=> { this.props.navigation.navigate('TourStack', { screen: 'TourSafetyOverview' }) }} />
                    </View>
                </View>
            </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: 100,
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
