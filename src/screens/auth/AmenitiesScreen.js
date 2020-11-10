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

import { GetRequest, Request, errorMessage, urls } from '../../utils';


class AmenitiesScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      amenities: [], safetyAmenities: [], loadingAmenities: false, loadingSafetyAmenities: false,
      amenitiesValues: [], safetyAmenitiesValues: [], saving: false, errors: []
    };
  }

  renderLoading = () => {
      const { loadingAmenities, loadingSafetyAmenities, saving } = this.state;
      if(loadingAmenities || loadingSafetyAmenities || saving) { return (<Loading />) }
  }
  renderError = () => {
    const { errors } = this.state
    if(errors.length !== 0) {
        return (<Error errors={errors} />)
    }
  }
  
  getAmmenities = async () => {
    this.setState({ loadingAmenities: true })
    const res = await GetRequest(urls.listingBase, `${urls.v}listing/ammenity`);
    // console.log(res)
    if(res.isError) {
        const message = res.message;
        const error = [message]
        this.setState({ errors: error, loadingAmenities: false })
    } else {
      this.setState({ amenities: res.data, loadingAmenities: false })
    }
  }
  getSafetyAmmenities = async () => {
    this.setState({ loadingSafetyAmenities: true })
    const res = await GetRequest(urls.listingBase, `${urls.v}listing/safetyamenity`);
    // console.log(res)
    if(res.isError) {
        const message = res.message;
        const error = [message]
        this.setState({ errors: error, loadingSafetyAmenities: false })
    } else {
      this.setState({ safetyAmenities: res.data, loadingSafetyAmenities: false })
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
  saveProperty = async (propertyFormData) => {
    // console.log(propertyFormData)
    const { set, state, getUserProfile } = this.context
    this.setState({ saving: true })
    const res = await Request(urls.listingBase, `${urls.v}listing/property`, propertyFormData);
    console.log(res)
    if(res.isError) {
        const message = res.message;
        const error = [message]
        this.setState({ errors: error, saving: false })
    } else {
      if(state.isInApp) {
        set({ propertyFormData: res.data })
      } else {
        set({ propertyFormData: null })
      }
      await getUserProfile()
      this.setState({ saving: false })
      this.props.navigation.navigate('Saved');
    }
  }
  componentDidMount = () => {
    this.getAmmenities()
    this.getSafetyAmmenities()
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
    console.log(safetyAmenities)
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
        <Header {...this.props} title="Amenities Available At Your Place" />
          <ScrollView style={container}>
            <View>
                <View style={{marginTop: 20}}>
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
    marginTop: 150,
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
