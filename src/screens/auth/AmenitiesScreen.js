/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput, checkBox } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, Error, CheckBox } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { AppContext } from '../../../AppProvider';

import { GetRequest, Request, errorMessage, urls, SCREEN_HEIGHT } from '../../utils';


class AmenitiesScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      amenities: [], safetyAmenities: [], loadingAmenities: false, loadingSafetyAmenities: false,
      amenitiesValues: [], safetyAmenitiesValues: [], saving: false, errors: [], gettingHouse: false
    };
  }

  renderLoading = () => {
      const { loadingAmenities, loadingSafetyAmenities, saving, gettingHouse } = this.state;
      if(loadingAmenities || loadingSafetyAmenities || saving || gettingHouse) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT }} />) }
  }
  renderError = () => {
    const { errors } = this.state
    if(errors.length !== 0) {
        return (<Error errors={errors} />)
    }
  }
  getHouse = async () => {
    const { state, set } = this.context
    const ppty = state.propertyFormData;
    try {
      this.setState({ gettingHouse: true })
      const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/${ppty.id}`);
      this.setState({ gettingHouse: false })
      if(res.isError) {
          const message = res.Message;
      } else {
          const data = res.data;
          if(data !== null) {
            let amenitiesValues = [];
            let safetyAmenitiesValues = [];
            if(data.amenity) {
              amenitiesValues = data.amenity.map(item => item.id)
            }
            if(data.safetyAmenity) {
              safetyAmenitiesValues = data.safetyAmenity.map(item => item.id)
            }
            this.setState({ amenitiesValues, safetyAmenitiesValues })
            set({ propertyFormData: { ...ppty, amenity: amenitiesValues, safetyAmenity: safetyAmenitiesValues } })
          }
      }
    } catch (error) {
      
    }
  }
  
  getAmmenities = async () => {
    this.setState({ loadingAmenities: true })
    try {
      const res = await GetRequest(urls.listingBase, `${urls.v}listing/ammenity`);
      if(res.isError) {
          const message = res.message;
          const error = [message]
          this.setState({ errors: error, loadingAmenities: false })
      } else {
        this.setState({ amenities: res.data, loadingAmenities: false })
      }
    } catch (error) {
      this.setState({ loadingAmenities: false })
    }
  }
  getSafetyAmmenities = async () => {
    this.setState({ loadingSafetyAmenities: true })
    try {
      const res = await GetRequest(urls.listingBase, `${urls.v}listing/safetyamenity`);
      // console.log(res)
      if(res.isError) {
          const message = res.message;
          const error = [message]
          this.setState({ errors: error, loadingSafetyAmenities: false })
      } else {
        this.setState({ safetyAmenities: res.data, loadingSafetyAmenities: false })
      }
    } catch (error) {
      this.setState({ loadingSafetyAmenities: false })
    }
  }
  SavedScreen = () => {
    const { set, state } = this.context
    const { amenitiesValues, safetyAmenitiesValues} = this.state
    if(state.propertyFormData) {
      const amenityObj = { amenity:amenitiesValues, safetyAmenity: safetyAmenitiesValues}
      const obj = { ...state.propertyFormData, ...amenityObj }
      this.saveProperty(obj)
    } 
  }
  updateObj = (ppty) => {
    const {noofBathrooms, noofBeds, noofGuest, noofRooms, latitude, longitude, address, district, state, propertyTypeId, roomTypeId,
      isCompanyListing, companyName, dedicatedGuestSpace, zipCode, country, amenity, safetyAmenity } = ppty
    const obj = { 
      id: ppty.id,
      noofBathrooms, noofBeds,
      noofGuest,
      noofRooms,
      longitude,
      latitude, 
      address,
      district,
      propertyTypeId, state, zipCode, country,
      roomTypeId, isCompanyListing, companyName, dedicatedGuestSpace, amenity, safetyAmenity
    }
    return obj
  }
  saveProperty = async (propertyFormData) => {
    const { set, state, getUserProfile } = this.context
    this.setState({ saving: true })
    const url = state.edit ? `${urls.v}listing/property/update` : `${urls.v}listing/property`
    const payload = state.edit ? this.updateObj(propertyFormData) : propertyFormData;
    try {
      const res = await Request(urls.listingBase, url, payload);
      if(res.isError) {
          const message = res.message;
          const error = [message]
          this.setState({ errors: error, saving: false })
      } else {
        const data = res.data
        
        if(state.isInApp) {
          set({ propertyFormData: {...data, mainImage: propertyFormData.mainImage} })
          const { propertyContext, appContext } = this.props
          // If you are editing a property
          if(state.edit) {
            const properties = [ ...propertyContext.state.properties ]
            const pptyArr = this.filterSetProperty(properties, data, propertyFormData)
            propertyContext.set({ properties: pptyArr })
            if(data.propertyType.name === 'Apartment') {
                const apartments = [ ...propertyContext.state.apartments ]
                const apsArr = this.filterSetProperty(apartments, data, propertyFormData)
                // console.log('App ',apsArr)
                propertyContext.set({ apartments: apsArr })
            } else {
                const hotels = [ ...propertyContext.state.hotels ]
                const hotelsArr = this.filterSetProperty(hotels, data, propertyFormData)
                propertyContext.set({ hotels: hotelsArr })
            }
            
          } else {
            propertyContext.getAllProperties();
            propertyContext.getHotels();
            propertyContext.getApartments();
          }
        }
        // if you are adding property from sign up
        if(!state.isInApp) {
          set({ propertyFormData: null })
        } 
        await getUserProfile()
        this.setState({ saving: false })
        this.checkStep()
        this.props.navigation.navigate('Saved');
      }
    } catch (error) {
      this.setState({ saving: false })
    }
    
  }
  filterSetProperty = (properties, data, propertyData) => {

      const elementsIndex = properties.findIndex(element => element.id == propertyData.id )
      let newArray = [...properties]
      // newArray[elementsIndex] = {...newArray[elementsIndex], completed: !newArray[elementsIndex].completed}
      newArray[elementsIndex] = {...data, mainImage: propertyData.mainImage }
      // console.log('Filter ', newArray)
      return newArray
  }

  checkStep = () => {
    const { propertyFormData } = this.context.state;
    if(propertyFormData) {
      if(propertyFormData.pricePerNight && propertyFormData.mainImage) {
        this.context.set({ step: 3})
      } else if(propertyFormData.mainImage) {
        this.context.set({ step: 2 })
      } else {
        this.context.set({ step: 1 })
      }
    }
  }
  componentDidMount = () => {
    this.getAmmenities()
    this.getSafetyAmmenities()
    const { state } = this.context
    const ppty = state.propertyFormData;
    if(ppty && state.edit) {
      this.getHouse()
    }
  }

  renderAmmenities = () => {
    const { amenities } = this.state;
    if(amenities.length !== 0) {
      return amenities.map((item, i) => {
        return (
          <CheckBox title={item.name} key={i} item={item} onPress={this.onCheckAmmenity} value={this.getAmmenityValue(item.id)}  />
        )
      })
    }
  }
  onCheckPress = (arg) => {
    const { safetyAmenitiesValues } = this.state
    const item = arg.item;
    const value = arg.value;
    let arr = [...safetyAmenitiesValues]
    if(value) {
      arr.push(item.id)
      this.setState({ safetyAmenitiesValues: arr })
    } else {
      const index = arr.findIndex(x => x === item.id )
      if(index !== -1) {
        arr.splice(index, 1)
        this.setState({ safetyAmenitiesValues: arr})
      }
    }
  }
  getSafetyValue = (id) => {
    const { safetyAmenitiesValues } = this.state;
    const found = safetyAmenitiesValues.find(item => item === id)
    return found ? true : false
  }
  onCheckAmmenity = (arg) => {
    const { amenitiesValues } = this.state
    const item = arg.item;
    const value = arg.value;
    let arr = [...amenitiesValues]
    if(value) {
      arr.push(item.id)
      this.setState({ amenitiesValues: arr })
    } else {
      const index = arr.findIndex(x => x === item.id )
      if(index !== -1) {
        arr.splice(index, 1)
        this.setState({ amenitiesValues: arr})
      }
    }
  }
  getAmmenityValue = (id) => {
    const { amenitiesValues } = this.state;
    const found = amenitiesValues.find(item => item === id)
    return found ? true : false
  }
  renderSafetyAmmenities = () => {
    const { safetyAmenities } = this.state;
    const { tiles } = styles
    if(safetyAmenities.length !== 0) {
      return safetyAmenities.map((item, i) => {
        return (
          <View style={tiles} key={item.id}>
            <CheckBox title={item.name} item={item} subtitle={item.description} onPress={this.onCheckPress} value={this.getSafetyValue(item.id)} />
          </View>
        )
      })
    }
  }

  render() {
    const { container, picker, button, imageView, iconStyle, input, header, tiles } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH5Style, textH6Style, textExtraBold, textH2Style, textH3Style, textDarkBlue} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
        {this.renderLoading()}
        <Header {...this.props} title="Amenities Available At Your Place" wrapperStyles={{ position: 'relative'}} />
          <ScrollView style={container}>
            <View>
                <View style={{marginTop: 10}}>
                  {this.renderAmmenities()}
                    {/* <MyText style={[textOrange, textH5Style, textBold,textUnderline]}>
                        Add Additional Amenities
                    </MyText> */}
                </View>
                <View>
                    <View style={header}>
                        <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Safety Amenities</MyText>
                    </View>
                    {this.renderSafetyAmmenities()}
                </View>
                
                <View style={button}>
                    {this.renderError()}
                    <CustomButton buttonText="Next" onPress={this.SavedScreen}/>
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
    // marginTop: 145,
    flex: 1,
  },
//   picker: {
//       borderWidth: 1,
//       borderRadius: 5,
//       height: 50,
//       borderColor: colors.lightGreyOne,
//       marginTop: 10,
//   },
//   rowContainer: {
//       borderBottomWidth: 1,
//       borderBottomColor: colors.lightGreyOne,
//       height: 50,
//       paddingTop: 20,
//   },
    header:{
        marginTop: 40,
        marginBottom: 31,
    },
    tiles: {
        marginBottom: 20,
    },
  button: {
      marginTop: 50,
       marginBottom: 86,
    },
    // imageView: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: colors.orange,
    //     borderRadius: 25,
    //     height: 25,
    //     width: 25,
    // },
    // iconStyle: {
    //     fontSize: 20,
    //     color: colors.orange,
    // },
    // input: {
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     height: 80,
    //     borderColor: colors.lightGreyOne,
    //     marginTop: 10,
    // },
});

export default AmenitiesScreen;
