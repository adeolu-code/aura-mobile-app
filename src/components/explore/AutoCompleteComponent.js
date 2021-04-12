import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Icon } from 'native-base'


import { MyText, CustomButton } from '../../utils/Index';

import colors from '../../colors';

import { GOOGLE_API_KEY, GOOGLE_SEARCH_KEY } from '../../utils'


class AutoCompleteComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', isFieldActive: true };
  }

   locationDetails = (data, details = null) => {
        const obj = { data, details }
        // console.log('Data ', data, details)
        this.setState({ value: data.description })
        this.props.locationDetails(obj)
    }
    onChangeText = (text) => {
        this.setState({ value: text })
    }

  render() {
    const { flexRow, textH6Style, textAccent, textWhite, textH4Style } = GStyles;
    const { countryContainer, searchContainer, iconStyle } = styles
    const { autoCompleteStyles, autoCompleteActiveStyles } = autoStyles;
    // const activeStyles = this.props.active ? autoCompleteActiveStyles : autoCompleteStyles
    const activeStyles = autoCompleteActiveStyles


    const { title, countrySymbol, location, placeholder, type, autofocus, wrapper } = this.props

    const homePlace = {
        description: location ? location.city : '',
        geometry: { location: { lat: location ? location.latitude : 0, lng: location ? location.longitude : 0 } },
    };
    return (
        <View style={[flexRow, wrapper]}>
            
            <GooglePlacesAutocomplete
                autoFocus={true}
                ref={ref => this.googleAutoComplete = ref }
                placeholder={placeholder}
                minLength={2}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} 
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true} renderDescription={row => row.description} // custom description render
                onPress={this.locationDetails}
                onSubmitEditing={this.submit}
                getDefaultValue={() => ''}
                textInputProps={{
                    onBlur:this.handleBlur,
                    onChangeText: this.onChangeText,
                    value: this.state.value,
                    // autoFocus: true,
                    autoFocus: autofocus ? true : false
                }}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_SEARCH_KEY,
                    language: 'en', // language of the results
                    types: type ? '' : '(regions)',
                    // types: '(regions)',
                    // types: '(cities)', // default: 'geocode'
                    components: `country:${countrySymbol ? countrySymbol : 'ng'}`,
                    
                }}
                styles={activeStyles}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                // currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}
                
                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'geometry',
                }}

                // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                // predefinedPlaces={[location ? homePlace : '']}
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                // renderRightButton={() => <Text>Custom text after the input</Text>}
            />
            {/* <TouchableOpacity style={searchContainer}>
                <Icon type="Ionicons" name="search" style={iconStyle} />
            </TouchableOpacity> */}
        </View>
      
    );
  }
}

const autoStyles = {
    
    autoCompleteActiveStyles: {
        textInputContainer: {
            // backgroundColor: 'white',
            // backgroundColor: 'green',
            // borderTopWidth: 0,
            // borderColor: 'rgb(248,106,39)', borderWidth: .8, borderTopColor: 'rgb(248,106,39)',
            // height: 50, 
            justifyContent: 'center', alignItems: 'center',
            paddingBottom: 0, paddingHorizontal: 0, ...GStyles.shadow
            // elevation: 4
        },

        textInput: {
            // color: 'rgb(248,106,39)',
            // borderColor: 'rgb(232,232,232)',
            fontSize: 16,
            elevation: 4
        },
        row: {
            backgroundColor: 'white', marginVertical: 5, borderRadius: 5, elevation: 2, ...GStyles.shadow,
            paddingHorizontal: 10
        },
        separator: {
            backgroundColor: 'white', borderWidth: 0
        },
        predefinedPlacesDescription: {
            color: 'rgba(0,0,0,1)'
        },
    }
  }

const styles = StyleSheet.create({
    container: {
        // borderBottomWidth: 2, borderBottomColor: colors.accent, 
        marginBottom: 10,
        // borderWidth: 1,
        width: '100%',
        // backgroundColor: 'white',
        // zIndex: 3, 
    },
    countryContainer: {
        // borderWidth: 1, 
        height: 45, width: '100%', 
    },
    titleStyles: {
        position: 'absolute',left: 0,  
        zIndex: 2, 
        // borderWidth: 1,
        width: '100%',
        paddingBottom: 10
    },
    searchContainer: {
        backgroundColor: colors.orange, flex: 1, justifyContent: 'center', alignItems: 'center',
        borderTopRightRadius: 5, borderBottomRightRadius: 5
    },
    iconStyle: {
        fontSize: 16, color: colors.white
    }
});

export default AutoCompleteComponent;
