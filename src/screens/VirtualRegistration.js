import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, KeyboardAvoidingView, 
  Dimensions, FlatList, SafeAreaView, Platform } from 'react-native';
import GStyles from '../assets/styles/GeneralStyles';
import { Input, Picker } from "native-base";

import Header from '../components/Header';


import { MyText, Spinner, Loading, CustomButton, CustomInputNew, CustomInput, CountryPickerNew } from '../utils/Index';
import colors from '../colors';

import { Icon } from 'native-base';
import { urls, GetRequest, Request, errorMessage } from '../utils';
import states from '../States';

class VirtualRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, phone: '', email: '', firstName: '', name: '', location: '', country: '' };
    this.state.type = props.route.params?.type
    // console.log(this.state.type)
  }
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack()
    
  }
  disabled = () => {
    const { name, email, location, phone } = this.state
    if(name === '' || email === '' || phone === '' || location === '') {
      return true
    }
    if(location === 'Select State') {
      return true
    }
    return false
  }
  formatNumber = () => {
    const { country, phone } = this.state;
    const firstXter = phone.charAt(0);
    const numberValue = firstXter === '0' ? `${phone}` : `0${phone}`
    const number = country ? `+${country.callingCode[0]}${numberValue}` : `+234${numberValue}`;
    return number;
  }
  submit = async () => {
    // this.props.navigation.navigate('VirtualSuccess')
    const { name, email, location } = this.state
    let newLocation = location
    if(location === 'Outside Nigeria') {
      newLocation = 'outside-nigeria'
    }
    const obj = {
      name, email, location: newLocation, phone: this.formatNumber()
    }
    try {
      this.setState({ loading: true })
      const res = await Request(urls.identityBase, `${urls.v}launchinvitee`, obj)
      this.setState({ loading: false })
      console.log('Res ',res)
      if(!res.isError) {
        this.props.navigation.navigate('VirtualSuccess')
      } else {
        const message = res.message;
        errorMessage(message)
      }
    } catch (error) {
      console.log('Catched error ', error)
      this.setState({ loading: false})
      errorMessage(error.message)
    }
  }
  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }
  onValueChange = (value) => {
    // console.log('Value ', value)
    this.setState({ location: value })
  }
  
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
  }
  getCountry = (country) => {
    this.setState({ country })
  }
  
  componentDidMount = () => {

  }

  renderStatesPicker = () => {
    const arr = [{ name: 'Select State'}, ...states]
    return arr.map((item) => {
      return (
        <Picker.Item label={item.name} value={item.name} key={item.capital} />
      )
    })
  }

  
  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey, flexRow, textWhite, textH1Style, 
      textH2Style, textH5Style, textXlStyle, textCenter, textBold, textUnderline, textOrange } = GStyles
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
        {this.renderLoading()}
        <ImageBackground source={require('../assets/images/bg_virtual.png')} style={container}>
          <ScrollView>
            <KeyboardAvoidingView style={contentContainer} behavior={ Platform.OS === 'ios' ? "padding" : null }>
              <TouchableOpacity style={[flexRow, { alignItems: 'center', marginBottom: 30 }]} onPress={this.goBack}>
                <Icon name="chevron-left" type="Feather" style={{ marginLeft: -5 }} />
                <MyText style={[textH3Style, textDarkGrey ]}>Back</MyText>
              </TouchableOpacity>

              <View>
                <MyText style={[textH2Style, textExtraBold, textDarkGrey]}>Virtual Launch</MyText>
                <MyText style={[textH4Style, { marginTop: 4}]}>Fill the form below to register for virtual launch</MyText>
              </View>
              <View>
                {/* <View style={{ marginTop: 30}}>
                  <CustomInputNew placeholder="firstname" label="Firstname" attrName="firstName" onChangeText={this.onChangeValue} />
                </View> */}
                <View  style={{ marginTop: 30}}>
                  <CustomInputNew placeholder="name" label="Name" imgUrl={require('../assets/images/icons/user/user2.png')} attrName="name" onChangeText={this.onChangeValue} />
                </View>
                <View style={[styles.inputStyles, flexRow]}>
                    <View style={{ flex: 2.8}}>
                        <View style={{ paddingHorizontal: 15, marginBottom: 10, marginTop: 10}}>
                          <MyText style={[textH4Style]}>Phone Number</MyText>
                        </View>
                        <CustomInput placeholder="Phone Number" value={this.state.phone} attrName="phone"
                        onChangeText={this.onChangeValue} keyType="numeric" textInputStyle={{ borderWidth: 0, height: 45, marginTop: 0}} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <CountryPickerNew getCountry={this.getCountry} />
                    </View>
                </View>

                
                <View style={styles.pickerStyles}>
                  <View style={{ paddingHorizontal: 5, marginBottom: 5, marginTop: 10}}>
                    <MyText style={[textH4Style]}>Location</MyText>
                  </View>
                  <Picker mode="dropdown" placeholder="Select State"
                      textStyle={{color: colors.black }}
                      selectedValue={this.state.location}
                      onValueChange={(value) => this.onValueChange(value)}>
                        {this.renderStatesPicker()}
                  </Picker>
                </View>
                
                <View style={{ marginTop: 30}}>
                  <CustomInputNew placeholder="email" label="Email" iconName="globe" onChangeText={this.onChangeValue} attrName="email" />
                </View>
              </View>
              <View style={{ marginBottom: 60, marginTop: 30 }}>
                <CustomButton buttonText="Submit" buttonStyle={{ paddingTop: 20, paddingBottom: 20 }} onPress={this.submit} disabled={this.disabled()} />
              </View>
              
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
        {/* {this.renderLoading()} */}
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20, 
    width: '100%', height: '100%'
  },
  logoContainer: {
    width: 100, height: 50, marginBottom: 30
  },
  contentContainer: {
    paddingHorizontal: 30, paddingTop: 40
  },
  timerStyles: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, marginTop: 30,
    paddingVertical: 20, marginBottom: 30
  },
  inputStyles: {
      marginBottom: 30, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 8, marginTop: 30, overflow: 'hidden',
      backgroundColor: 'rgba(215, 228, 248, 0.05)'
  },
  pickerStyles: {
    borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 8, paddingHorizontal: 15,
    backgroundColor: 'rgba(215, 228, 248, 0.05)'
  }
  
});

export default VirtualRegistration;
