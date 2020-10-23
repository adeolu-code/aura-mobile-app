/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, CustomInput } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import ListProperty from '../../components/auth/ListProperty';

import { Toast } from "native-base";

import { AppContext } from '../../../AppProvider';
import { setContext, errorMessage, } from '../../utils';



class ListPropertyScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { propertyTypeId: '', roomTypeId: '', isCompanyListing: null, companyName: '', dedicatedGuestSpace: null,
    noOfBathrooms: 0, noOfRooms: 0, noOfBeds: 0, noOfAvailableRooms: 0 };
    this.categories = [
      { name: 'Yes, I am listing as a company', value: true },
      { name: 'No, I am a private individual', value: false }
    ]
    this.dedicatedGuests = [
      { name: 'Yes its set-up for guests alone', value: true },
      { name: 'No, I keep some of my personal belongs here', value: false }
    ]
  }

  componentDidMount = () => {
    const { propertyTypes } = this.context.state
    if(propertyTypes.length > 0) {
      const ppty = propertyTypes[0];
      this.setState({ propertyTypeId: ppty.id })
    }
  }
  
  renderPropertyLists = () => {
    const { gettingPropertyTypes, propertyTypes } = this.context.state
    const { textOrange, textH4Style, textBold } = GStyles;
    const { picker, loadingContainer } = styles
    if(gettingPropertyTypes) {
      return (
        <View style={[loadingContainer]}>
          <MyText style={[textOrange, textH4Style, textBold]}>Loading...</MyText>
        </View>
      )
    }
    return (
      <View style={picker}>
        <Picker mode="dropdown" iosHeader="Choose A Type of Property" Icon={<Icon type="Feather" name="chevron-down" />}
          style={{ width: undefined }} selectedValue={this.state.propertyTypeId} onValueChange={this.onChangePropertyValue} >
          {propertyTypes.map((item, i) => {
            return ( <Picker.Item label={item.name} value={item.id} key={item.id} /> )
          })}
        </Picker>
      </View>
    )
  }
  renderRoomTypes = () => {
    const { gettingRoomTypes, roomTypes } = this.context.state
    const { textOrange, textH4Style, textBold } = GStyles
    const { picker, loadingContainer } = styles
    if(gettingRoomTypes) {
      return (
        <View style={[loadingContainer]}>
          <MyText style={[textOrange, textH4Style, textBold]}>Loading...</MyText>
        </View>
      )
    }
    return (
      <View style={picker}>
        <Picker mode="dropdown" iosHeader="Room Type" Icon={<Icon type="Feather" name="chevron-down" />}
          style={{ width: undefined }} selectedValue={this.state.roomTypeId}
          onValueChange={this.onChangeRoomType} >
          <Picker.Item label="Choose Room Type" value="" />
          {roomTypes.map((item, i) => {
            return ( <Picker.Item label={item.name} value={item.id} key={item.id} /> )
          })}
        </Picker>
      </View>
    )
  }
  renderCompanyInput = () => {
    const { isCompanyListing } = this.state;
    const { textGrey, textH4Style } = GStyles
    if(isCompanyListing) {
      return (
        <View style={{marginTop: 45}}>
          <MyText style={[textGrey, textH4Style]}> Is this set up as a dedicated guest space? </MyText>
          <CustomInput placeholder="Enter Company Name" value={this.state.companyName} 
          onChangeText={(text)=>{this.setState({ companyName: text})}} />
        </View>
      )
    }
  }
  
  onChangePropertyValue = (value) => {
    const { getRoomTypes, state } = this.context
    this.setState({ propertyTypeId: value });
    const ppty = state.propertyTypes.find(item => item.id === value )
    getRoomTypes(ppty.name.toLowerCase())
  }
  onCompanyChange = (value) => {
    this.setState({ isCompanyListing: value })
  }
  onGuestOnlyChange = (value) => {
    this.setState({ dedicatedGuestSpace: value })
  }
  onChangeRoomType = (value) => {
    this.setState({ roomTypeId: value });
  }
  setNoOfBathroom = (value) => {
    this.setState({ noOfBathrooms: value })
  }
  setNoOfBedroom = (value) => {
    this.setState({ noOfRooms: value })
  }
  setNoOfGuests = (value) => {
    this.setState({ noOfAvailableRooms: value })
  }
  setNoOfBeds = (value) => {
    this.setState({ noOfBeds: value })
  }
  LocationScreen = () => {
    this.props.navigation.navigate('Location');
  }

  validate = () => {
    const { propertyTypeId, roomTypeId, noOfBathrooms, noOfRooms, noOfBeds, noOfAvailableRooms, isCompanyListing, 
      companyName, dedicatedGuestSpace } = this.state
    if(propertyTypeId === '' || roomTypeId === '' || noOfAvailableRooms === 0 || noOfRooms === 0 || noOfBathrooms === 0 
    || noOfBeds === 0 || dedicatedGuestSpace === null) {
      return true
    }
    if(isCompanyListing && companyName === '') {
      return true
    }
    return false
  }
  next = () => {
    if(this.validate()) {
      errorMessage("Please enter all fields")
    } else {
      this.storeFormValues()
    }
  }
  storeFormValues = () => {
    const { set, state } = this.context
    // console.log('Context State ', state)
    if(state.propertyFormData) {
      const obj = { ...state.propertyFormData, ...this.state }
      set({ propertyFormData: obj })
    } else {
      set({ propertyFormData: this.state })
    }
    this.props.navigation.navigate('Location');
  }

  render() {
    const { container, picker, button } = styles;
    const { textGrey, textH5Style, textH4Style, lineHeightText} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title={"List A Property In Minutes"} />
          <ScrollView style={container}>
            <View>
                <View style={{marginTop: 42}}>
                    <MyText style={textGrey}>Choose A Type Of Property</MyText>
                    {this.renderPropertyLists()}
                </View>
                <View style={{marginTop: 40}}>
                    <MyText style={textGrey}>Room Type</MyText>
                    {this.renderRoomTypes()}
                    
                </View>
                <View>
                <MyText style={[textGrey, textH5Style, lineHeightText, {marginTop: 30, marginBottom: 20}]}>
                    Check That You Have Enough Beds To Accommodate All Your Guests Comfortably
                </MyText>
                </View>
                <View>
                    <ListProperty title="Guest" countValue={this.setNoOfGuests} />
                    <ListProperty title="Beds" countValue={this.setNoOfBeds} />
                    <ListProperty title="Bedroom" countValue={this.setNoOfBedroom} />
                    <ListProperty title="Bathroom" countValue={this.setNoOfBathroom} />
                </View>

                <View style={{marginTop: 45}}>
                    <MyText style={[textGrey, textH4Style]}> Are You Listing As A Part Of A Company? </MyText>
                    <View style={picker}>
                        <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                          style={{ width: undefined }} selectedValue={this.state.isCompanyListing} onValueChange={this.onCompanyChange}>
                          <Picker.Item label="Choose Category" value=""/>
                          {this.categories.map((item, i) => {
                            return (
                              <Picker.Item label={item.name} value={item.value} key={i} />
                            )
                          })}
                        </Picker>
                    </View>
                </View>
                {this.renderCompanyInput()}
                <View style={{marginTop: 45}}>
                    <MyText style={[textGrey, textH4Style]}> Is this set up as a dedicated guest space? </MyText>
                    <View style={picker}>
                        <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                          style={{ width: undefined }} selectedValue={this.state.dedicatedGuestSpace} onValueChange={this.onGuestOnlyChange}>
                          <Picker.Item label="Choose Category" value=""/>
                          {this.dedicatedGuests.map((item, i) => {
                            return (
                              <Picker.Item label={item.name} value={item.value} key={i+20} />
                            )
                          })}
                        </Picker>
                    </View>
                </View>
                <View style={button}>
                  <CustomButton buttonText="Next" onPress={this.LocationScreen} buttonStyle={{ elevation: 2}} onPress={this.next} />
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
    marginTop: 110,
    flex: 1,
  },
  picker: {
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      borderColor: colors.lightGreyOne,
      marginTop: 10,
  },
  rowContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGreyOne,
      height: 50,
      paddingTop: 20,
  },
  loadingContainer: {
    marginVertical: 15
  },
  button: {
      marginTop: 50,
       marginBottom: 86,
    },
});

export default ListPropertyScreen;
