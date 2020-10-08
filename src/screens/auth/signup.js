/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Image, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import colors from '../../colors';
import { CustomInput, MyText, CustomButton, PhoneNumberInput, Loading, Error } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import Header from '../../components/Header';
import PasswordError from '../../components/auth/PasswordError';
import FormError from '../../components/auth/FormError';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls } from '../../utils';
import { Icon } from 'native-base';
import { setUser } from '../../helpers';

class signUp extends Component {
  //import AppContext
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, firstName: '', lastName: '', email: '', phoneNumber:'', password: '', country: '', passwordFocused: false,
    firstNameErrors: [], lastNameErrors: [], emailErrors: [], phoneErrors: [], passwordError: false, formErrors: [], acceptTerms: false };
  }
  checkTerms = () => {
    this.setState({ acceptTerms: !this.state.acceptTerms })
  }
  linkToTerms = async () => {
    // try {
    //   await Linking.openURL('')
    // } catch (error) {
    //     showMessage({ message: error.message, type: 'danger', floating: true})
    // }
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
    const { email, emailErrors } = this.state;
    this.setState({ emailErrors: []})
    const errors = [{name: 'required', description: 'Email required' }, { name: 'valid', description: 'Input a valid email' }]
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
    phoneNumber === '' ? this.setState({ phoneErrors: ['Phone number is required'] }) : this.setState({ phoneErrors: [] })
  }
  formatNumber = () => {
    const { country, phoneNumber } = this.state;
    const number = `+${country.callingCode[0]}${phoneNumber}`;
    return number;
  }
  disabled = () => {
    const { firstNameErrors, lastNameErrors, passwordError, phoneErrors, emailErrors,
      firstName, lastName, email, phoneNumber, password } = this.state;
    // if(firstNameErrors.length !== 0  || lastNameErrors !== 0 || phoneErrors !== 0 || emailErrors.length !== 0 || passwordError) {
    //   return true
    // }
    if (firstNameErrors.length > 0 || lastNameErrors > 0 || phoneErrors > 0 || emailErrors.length > 0 || passwordError) {
      return true;
    }
    if (firstName === '' || lastName === '' || phoneNumber === '' || password === '' || email === '' || !email.includes('@')) {
      return true;
    }
    return false;
  }

  submit = async () => {
    Keyboard.dismiss();
    const { firstName, lastName, email, phoneNumber, password, acceptTerms } = this.state;
    this.setState({ loading: true, formErrors: [] });
    const number = this.formatNumber();
    const obj = { firstName, lastName, email, phoneNumber: number, password, acceptTerms }
    const res = await Request(urls.identityBase, 'api/v1/user/signup', obj)
    console.log(res)
    if(res.isError) {
      this.setState({ formErrors: res.data })
    } else {
      await setUser(res.data)
      this.props.navigation.navigate('Otp');
    }
    this.setState({ loading: false })
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
    const { textWhite, textBold, flexRow, textH5Style, textGrey } = GStyles;
    const {inputContainer, iconStyle, errorRow, errorContainer } = styles;
    const { firstNameErrors, lastNameErrors, emailErrors, phoneErrors } = this.state
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <Header title="Sign Up With Email" {...this.props} />
          {this.renderLoading()}
          <ScrollView keyboardShouldPersistTaps="always" >
            <View style={styles.container}>
              
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
              <View style={inputContainer}>
                <PhoneNumberInput getCountry={this.getCountry} label="Phone Number" placeholder="Phone number" 
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
              <View style={{ paddingTop: 50 }}>
                {this.renderError()}
                <CustomButton onPress={this.submit} disabled={this.disabled()} buttonText="Sign Up With Email"/>
              </View>
            </View>
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

});

export default signUp;
