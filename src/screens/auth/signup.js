/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, ScrollView, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../../colors';
import { CustomInput, MyText, CustomButton, PhoneNumberInput, Loading, Error, DatePicker } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import Header from '../../components/Header';
import PasswordError from '../../components/auth/PasswordError';
import FormError from '../../components/auth/FormError';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, successMessage } from '../../utils';
import { Icon, Picker } from 'native-base';
import { setToken } from '../../helpers';

class signUp extends Component {
  //import AppContext
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, firstName: '', lastName: '', dateOfBirth: '', email: '', phoneNumber:'', password: '', country: '', passwordFocused: false, gender: '',
    firstNameErrors: [], lastNameErrors: [], emailErrors: [], phoneErrors: [], passwordError: false, formErrors: [], acceptTerms: false,
    dobErrors: [] };
  }
  checkTerms = () => {
    this.setState({ acceptTerms: !this.state.acceptTerms })
  }
  linkToTerms = async () => {
    this.props.navigation.navigate('Other', { screen: 'TermsOfService' })
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) {
        return (<Loading />)
      }
  }
  renderError = () => {
    const { formErrors } = this.state;
      if (formErrors.length !== 0) {
        return (<Error errors={formErrors} />);
    }
  }

  getCountry = (country) => {
    this.setState({ country })
  }
  getDob = (value) => {
    const { dateOfBirth } = this.state
    const newDate = new Date(value);
    // console.log('Dob ', value, newDate)
    value ? this.setState({ dateOfBirth: newDate, dobErrors: [] }) : dateOfBirth ? this.setState({ dateOfBirth, dobErrors: [] }) : this.setState({ dobErrors: ['date of birth required'] })
    
  }
  onGenderChange = (value) => {
    console.log(value)
    this.setState(() => ({ gender: value }));
  }
  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }
  onBlurFirstName = () => {
    const { firstName } = this.state;
    firstName === '' ? this.setState({ firstNameErrors: ['first name required'] }) : this.setState({ firstNameErrors: [] })
  }
  onBlurLastName = () => {
    const { lastName } = this.state;
    lastName === '' ? this.setState({ lastNameErrors: ['last name required'] }) : this.setState({ lastNameErrors: [] })
  }
  onBlurEmail = () => {
    const { email } = this.state;
    this.setState({ emailErrors: []})
    const arr = [ ]
    if (email === '' ) {
      arr.push('Email required')
      this.setState({ emailErrors: arr });
    }
    if (!email.includes('@')) {
      arr.push('Input a valid email')
      this.setState({ emailErrors: arr });
    }
  }
  onBlurPhone = () => {
    const { phoneNumber } = this.state;
    
    phoneNumber === '' ? this.setState({ phoneErrors: ['Phone number is required'] }) : this.checkNumber(phoneNumber)
    
  }
  checkNumber = (value) => {
    const regex = new RegExp(/^[0-9\b]+$/);
    // var regex= /^\d{10}$/;
    if(!regex.test(value)) {
      this.setState({ phoneErrors: ['Please enter only numbers']})
    } else if(value.length < 10 || value.length > 11) {
      this.setState({ phoneErrors: ['Please enter valid phone number'] })
    } else {
      this.setState({ phoneErrors: [] })
    }
  }
  formatNumber = () => {
    const { country, phoneNumber } = this.state;
    const firstXter = phoneNumber.charAt(0);
    const numberValue = firstXter === '0' ? `${phoneNumber}` : `0${phoneNumber}`
    const number = `+${country.callingCode[0]}${numberValue}`;
    return number;
  }
  disabled = () => {
    const { firstNameErrors, lastNameErrors, passwordError, phoneErrors, emailErrors, gender,
      firstName, lastName, email, phoneNumber, password, dateOfBirth } = this.state;
      const regex = new RegExp(/^[0-9\b]+$/);
    // if(firstNameErrors.length !== 0  || lastNameErrors !== 0 || phoneErrors !== 0 || emailErrors.length !== 0 || passwordError) {
    //   return true
    // }
    if (firstNameErrors.length > 0 || lastNameErrors > 0 || phoneErrors > 0 || emailErrors.length > 0 || passwordError) {
      return true;
    }
    if (firstName === '' || lastName === '' || phoneNumber === '' || password === '' || dateOfBirth === '' || email === '' || !email.includes('@')) {
      return true;
    }
    if(!regex.test(phoneNumber) || phoneNumber.length < 10 || phoneNumber.length > 11) { 
      return true
    }
    return false;
  }

  // login = async () => {
  //   const { email, password } = this.state;
  //   const obj = { username: email, password }
  //   try {
  //     const res = await Request(urls.identityBase, `${urls.v}auth/user/login`, obj)
  //     console.log('Res ',res)
  //     if (res.isError) {
  //       this.setState({ formErrors: res.data, loading: false });
  //     } else {
  //       this.getUserDetails(res.data.access_token);
  //       this.context.set({ token: res.data })
  //       setToken(res.data)
  //     }
  //   } catch (error) {
  //     console.log('Catched error ', error)
  //     this.setState({ formErrors: error, loading: false})
  //   }
  // }
  
  submit = async () => {
    Keyboard.dismiss();
    // this.login()
    const { firstName, lastName, email, password, acceptTerms, dateOfBirth } = this.state;
    this.setState({ loading: true, formErrors: [] });
    const number = this.formatNumber();
    const obj = { firstName, lastName, email: email.trim(), phoneNumber: number, password, acceptTerms, dateOfBirth };
    try {
      const res = await Request(urls.identityBase, `${urls.v}user/signup`, obj);
      console.log(res);
      if (res.isError) {
        if(res.code === "-1") {
          this.setState({ formErrors: [res.message], loading: false });
        } else {
          this.setState({ formErrors: res.data, loading: false });
        }
        
      } else {
        this.getUserDetails(res.data.authentication.access_token);
        this.context.set({ token: res.data.authentication })
        setToken(res.data.authentication)
      }
    } catch (error) {
      this.setState({ loading: false, formErrors: [error.message] })
    }
  }

  getUserDetails = (token) => {
    this.context.getUserProfile(token)
    .then(async () => {
      successMessage('Registration was successful!')
      await this.generateOtp(token)
    })
    .catch(() => {
      this.setState({ formErrors: ['Something went wrong please try again, or try signing with your details'], loading: false })
    })
  }
  generateOtp = async (token) => {
    const res = await Request(urls.identityBase, `${urls.v}user/otp/generate`);
    console.log('generate otp ', res)
    this.setState({ loading: false })
    if(res.IsError || res.isError) {
        const message = res.Message || res.message;
        const error = [`${message}. Or Try signing with your details`]
        this.setState({ formErrors: error, loading: false })
    } else {
      this.props.navigation.navigate('Otp', { 
          parentScreen: undefined,
          finalScreen: undefined
        }
      );
    }
  }

  componentDidMount() {
    setContext(this.context);
    /**
     * can access global context using this.context.state[value] || can set using this.context.set({v:v})
     * any value set in this page can be accessed globally.. even functions :D
     * e.g
     * **/
    // console.log(this.context)
    console.log(this.context.state.name);
    /**
     * using the setContext function cos, sometimes i need to access data in the context or change stuff in 
     * the context  e.g onLogout reset context to default value
     * so i save the current context object locally in the utils.js file as the file is not a react component
     */
  }

  OtpScreen = () => {
    //temporary, afer this check my pages booking inbox... content rendered should be different
    this.context.set({isLoggedIn: true});
    this.props.navigation.navigate('Otp');
  }
  renderPasswordError = () => {
    const { passwordFocused } = this.state;
    if (passwordFocused) {
      return (
        <PasswordError inputValue={this.state.password} error={this.getPasswordError} />
      );
    }
  }
  renderAgree = () => {
    const { acceptTerms } = this.state;
    const { boxStyle, checkedStyle } = styles;
    if (acceptTerms) {
      return (
        <TouchableOpacity style={[boxStyle, checkedStyle]} onPress={this.checkTerms}>
          <View>
            <Icon name="md-checkmark" style={{ color: colors.white, fontSize: 20}} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[boxStyle]} onPress={this.checkTerms}></TouchableOpacity>
      );
    }
  }
  getPasswordError = (value) => {
    this.setState({ passwordError: value });
  }
  render() {
    // eslint-disable-next-line prettier/prettier
    const { flexRow, textH5Style, textGrey, textH4Style, textOrange } = GStyles;
    const {inputContainer, pickerStyles } = styles;
    const { firstNameErrors, lastNameErrors, emailErrors, phoneErrors, dobErrors } = this.state;
    return (
      <>
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <Header title="Sign Up With Email" {...this.props} />
          {this.renderLoading()}
          <ScrollView keyboardShouldPersistTaps="always" >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"} style={styles.container}>              
              <View style={inputContainer}>
                <CustomInput placeholder='First Name' label="First Name" onChangeText={this.onChangeValue} value={this.state.firstName}
                attrName="firstName" onBlur={this.onBlurFirstName} />
                {firstNameErrors.length !== 0 ? <FormError errorMessages={firstNameErrors} /> : <Fragment />}
              </View>
              <View style={inputContainer}>
                <CustomInput placeholder='Last Name' label="Last Name" onChangeText={this.onChangeValue} value={this.state.lastName}
                attrName="lastName" onBlur={this.onBlurLastName} />
                {lastNameErrors.length !== 0 ? <FormError errorMessages={lastNameErrors} /> : <Fragment />}
              </View>
              <View style={inputContainer}>
                <CustomInput placeholder='Email' label="Email" onChangeText={this.onChangeValue} value={this.state.email}
                attrName="email" onBlur={this.onBlurEmail} />
                {emailErrors.length !== 0 ? <FormError errorMessages={emailErrors} /> : <Fragment />}
              </View>
              {/* <View style={inputContainer}>
                <MyText style={[textGrey, textH4Style]}>Gender</MyText>
                <View style={pickerStyles}>
                  <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                  style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                  placeholder="Select Gender"
                  selectedValue={this.state.gender}
                  onValueChange={this.onGenderChange}>
                    <Picker.Item label={'Choose gender'} value={''} />
                    <Picker.Item label={'Male'} value={'Male'} />
                    <Picker.Item label={'Female'} value={'Female'} />
                  </Picker>
                </View>
              </View> */}
              <View style={inputContainer}>
                <MyText style={[textGrey, textH4Style, { marginBottom: 8}]}>Date of Birth</MyText>
                <DatePicker placeholder="DD/MM/YYYY" receiveData={this.getDob} />
                {dobErrors.length !== 0 ? <FormError errorMessages={dobErrors} /> : <Fragment />}
              </View>
              <View style={inputContainer}>
                <PhoneNumberInput getCountry={this.getCountry} label="Phone Number" placeholder="Enter phone number" keyType="numeric"
                value={this.state.phoneNumber} onChangeText={this.onChangeValue} attrName="phoneNumber" onBlur={this.onBlurPhone} />
                {phoneErrors.length !== 0 ? <FormError errorMessages={phoneErrors} /> : <Fragment />}
              </View>
              <View style={inputContainer}>
                <CustomInput password secureTextEntry placeholder='Password' label="Password" onChangeText={this.onChangeValue} 
                value={this.state.password} attrName="password" onFocus={() => { this.setState({ passwordFocused: true})}} />
                {this.renderPasswordError()}
              </View>
              
              <View style={[inputContainer, flexRow]}>
                <View>
                  {this.renderAgree()}
                </View>
                <TouchableOpacity onPress={this.linkToTerms}>
                  <MyText style={[textH5Style, textGrey]}>I agree to the terms and conditions</MyText>
                </TouchableOpacity>
              </View>
              <View>
                <MyText style={[textH4Style]}>N/B: <MyText style={[textOrange]}>You must be 18 and above to use app</MyText></MyText>
              </View>
              <View style={{ paddingTop: 20, paddingBottom: 30 }}>
                {this.renderError()}
                <CustomButton onPress={this.submit} disabled={this.disabled()} buttonText="Sign Up With Email"/>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 40, paddingTop: 140,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 30
  },
  iconStyle: {
    fontSize: 14, color: colors.secondary, marginRight: 4, marginBottom: -2
  }, 
  errorRow: {
    alignItems: 'center',marginBottom: 5
  },
  errorContainer: {
    marginTop: 10
  },
  boxStyle: {
    height: 24, width: 24, borderWidth: 1, borderColor: colors.lightGrey, marginRight: 10, borderRadius: 4, display: 'flex',
    justifyContent: 'center', alignItems: 'center'
  },
  checkedStyle: {
    backgroundColor: colors.orange
  },
  pickerStyles: {
    borderWidth: 1, borderRadius: 5, height: 60, borderColor: colors.lightGreyOne, marginTop: 10, 
    justifyContent: 'center'
  }

});

export default signUp;
