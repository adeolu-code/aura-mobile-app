/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Image, ScrollView } from 'react-native';
import colors from '../../colors';
import { CustomInput, MyText, CustomButton, PhoneNumberInput } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import Header from '../../components/Header';
import PasswordError from '../../components/auth/PasswordError';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls } from '../../utils';
import { Icon } from 'native-base'

class signUp extends Component {
  //import AppContext
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, firstName: '', lastName: '', email: '', phoneNumber:'', password: '', country: '', passwordFocused: false};
  }
  getCountry = (country) => {
    this.setState({ country })
  }
  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }

  submit = async () => {
    const { firstName, lastName, email, phoneNumber, password } = this.state
    const obj = { firstName, lastName, email, phoneNumber, password}
    const res = await Request(urls.identityBase, 'api/v1/user/signup', obj)
    console.log(res)
  }

  componentDidMount() {
    setContext(this.context);
    /**
     * can access global context using this.context.state[value] || can set using this.context.set({v:v})
     * any value set in this page can be accessed globally.. even functions :D
     * e.g
     * **/
    // console.log(this.context)
    console.log(this.context.state.name)
    /**
     * using the setContext function cos, sometimes i need to access data in the context or change stuff in 
     * the context  e.g onLogout reset context to default value
     * so i save the current context object locally in the utils.js file as the file is not a react component
     */
  }

  OtpScreen = () => {
    //temporary, afer this check my pages booking inbox... content rendered should be different
    this.context.set({isLoggedIn: true});
    //
    this.props.navigation.navigate('Otp');
  }
  renderPasswordError = () => {
    const { passwordFocused } = this.state;
    if(passwordFocused) {
      return (
        <PasswordError inputValue={this.state.password} />
      )
    }
  }
  render() {
    // eslint-disable-next-line prettier/prettier
    const { textWhite, textBold, textExtraBold, textH1Style, flexRow, textH5Style, textSuccess, textGrey } = GStyles;
    const {inputContainer, iconStyle, errorRow, errorContainer } = styles
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <Header title="Sign Up With Email" {...this.props} />
          <ScrollView>
            <View style={styles.container}>
              
              <View style={inputContainer}>
                <CustomInput placeholder='First Name' label="First Name" onChangeText={this.onChangeValue} value={this.state.firstName}
                attrName="firstName" />
              </View>
              <View style={inputContainer}>
                <CustomInput placeholder='Last Name' label="Last Name" onChangeText={this.onChangeValue} value={this.state.lastName}
                attrName="lastName" />
              </View>
              <View style={inputContainer}>
                <CustomInput placeholder='Email' label="Email" onChangeText={this.onChangeValue} value={this.state.email}
                attrName="email" />
              </View>
              <View style={inputContainer}>
                <PhoneNumberInput getCountry={this.getCountry} label="Phone Number" placeholder="Phone number" 
                value={this.state.phoneNumber} onChangeText={this.onChangeValue} attrName="phoneNumber"  />
              </View>
              <View style={inputContainer}>
                <CustomInput password secureTextEntry placeholder='Password' label="Password" onChangeText={this.onChangeValue} 
                value={this.state.password} attrName="password" onFocus={() => { this.setState({ passwordFocused: true})}} />
                {this.renderPasswordError()}
              </View>
              <View style={{ paddingTop: 50 }}>
                <CustomButton onPress={this.submit} buttonText="Sign Up With Email"/>
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
  }

});

export default signUp;
