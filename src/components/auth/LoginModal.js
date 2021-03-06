/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity, Keyboard,
  Modal, Platform
} from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import colors from "../../colors";
import { CustomInput, MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { setUser, setToken } from '../../helpers';
import { setContext, Request, urls, HOST } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import { GOOGLE_WEB_CLIENTID } from '../../strings'
import ForgotPassword from "../../screens/auth/ForgotPassword";

import ReactNativeBiometrics from 'react-native-biometrics'

import * as Keychain from 'react-native-keychain';

class LoginModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { 
      // email: "ferume@tapi.re", 
      // password: "123999_@ABCabc", 
      email: '',
      password: '',
      loading: false, 
      formErrors: [] 
    };
  }
  
  componentDidMount() {
    setContext(this.context);
  }

  renderLoading = () => {
    const { loading } = this.state;
    if (loading) { return (<Loading />); }
  }
  renderError = () => {
    const { formErrors } = this.state
    if(formErrors.length !== 0) {
      return (<Error errors={formErrors} />)
    }
  }
  linkToRegister = () => {
    this.props.onDecline();
    setTimeout(() => {
      this.props.openSignUp();
    }, 300);
  }
  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }
  forgotPassword = () => {
    const {navigation} = this.props;
    this.props.onDecline();
    navigation.navigate('Auth', {screen: 'Password'});
  }
  submit = async () => {
    Keyboard.dismiss()
    const { email, password } = this.state;
    this.setState({ loading: true, formErrors: [] })
    const obj = { username: email, password }
    try {
      const res = await Request(urls.identityBase, `${urls.v}auth/user/login`, obj)
      // console.log('Res ',res)
      if(!res.isError) {
        this.setState({ email: '', password: '' })
        this.getUserDetails(res.data.access_token);
        this.context.set({ token: res.data })
        await setToken(res.data);
        // login succesfull close modal
        // this.props.onSuccess && this.props.onSuccess();
      } else {
        const message = res.message;
        const error = [message]
        this.setState({ formErrors: error, loading: false})
        
      }
    } catch (error) {
      console.log('Catched error ', error)
      this.setState({ formErrors: [error.message], loading: false})
    }
    // finally{
    //   this.setState({loading: false})
    // }
  }
  disabled = () => {
    const { email, password } = this.state
    if(email === '' || password === '') {
      return true
    }
    return false
  }

  getUserDetails = (token) => {
    const { set } = this.context
    this.context.getUserProfile(token)
    .then((res) => {
      const roleHost = res.roles.find(item => item === HOST)
      if(roleHost) {
        set({ currentDashboard: 1})
      }

      const { close } = this.props
      if(close) {
        this.setState({ loading: false })
        this.props.onDecline(true)
      }
      
    })
    .catch((error) => {
      this.setState({ formErrors: ['Something went wrong please try again'], loading: false })
    })
  }

  socialApiCall = async (type, token) => {
    const obj = { userType: 0, token }
    try {
      const res = await Request(urls.identityBase, `api/v1/auth/user/login/${type}`, obj);
      console.log(res)
      if(res.isError) {
        const message = res.message;
        const error = [message]
        this.setState({ formErrors: error, loading: false })
      } else {
        this.getUserDetails(res.data.access_token);
        this.context.set({ token: res.data })
        await setToken(res.data)
      }
      // this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  loginWithGoogle = async () => {
      this.setState({ loading: true, formErrors: [] })
      GoogleSignin.configure({
        webClientId: '411688971660-sk7na5gu3pq2uqntmko314v4voant162.apps.googleusercontent.com',
        // webClientId: '745362274321-sptpssq375evl7b4s7q46hk8dgc7aao6.apps.googleusercontent.com',
      });
      try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('USer info ', userInfo)
          // await GoogleSignin.signOut();
          const token = await GoogleSignin.getTokens();
          // console.log('USer token ', token)
          // this.socialApiCall('google', token.accessToken)
          this.socialApiCall('google', token.idToken)
          
      } catch (error) {
          console.log('Error ', error, error.code, error.message)
          // this.setState({ loading: false, formErrors: [error.message] })
          this.setState({ loading: false })
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            this.setState({ formErrors: ['Authentication cancelled']})
              // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            this.setState({ formErrors: ['Something went error, Please try again, if it persists please contact support.']})
              // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            this.setState({ formErrors: ['Google services not available on gadget']})
              // play services not available or outdated
          } else {
            this.setState({ formErrors: ['Something went error, Please try again, if it persists please contact support.']})
              // some other error happened
          }
      }
  }
  loginWithFacebook = () => {
    this.setState({ loading: true, formErrors: [] })
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        if (result.isCancelled) {
          this.setState({ loading: false, formErrors: ['Login cancelled'] })
        } else {
          AccessToken.getCurrentAccessToken()
          .then((data) => {
            console.log('facebook ',data)
            this.socialApiCall('facebook', data.accessToken)
          })
        }
      }.bind(this),
      function(error) {
        console.log('Facebook Error ', "" + error)
        // this.setState({ loading: false, formErrors: ["Login fail with error:" + error] })
        this.setState({ loading: false, formErrors: ["Your account has not been configured for facebook login, please contact support"] })
      }.bind(this)
    );
  }
  loginWithBiometrics = async () => {
    this.pullUpScanner()
  }
  pullUpScanner = () => {
    // FingerprintScanner.authenticate({ description: 'Login with Biometrics' })
    ReactNativeBiometrics.simplePrompt({promptMessage: 'Login with Biometrics'})
    .then((res) => {
        console.log('Finger print response ', res)
        const { success } = res
        if (success) {
            this.getUserInfo()
        } else {
            errorMessage('user cancelled biometric prompt')
        }
      })
      .catch((error) => {
          console.log('fingerprint error ', error.message)
          errorMessage('biometrics failed')
          // Alert.alert('Fingerprint Authentication', error.message);
      });
  }
  getUserInfo = async () => {
    try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        console.log('Credentials ', credentials)
        if (credentials) {
            console.log('Credentials successfully loaded for user ');
            this.setState({ password: credentials.password, email: credentials.username }, () => {
              this.submit()
            })
            // submit()
        } else {
            errorMessage('Login failed, please try again, or contact support if error persists')
            console.log('No credentials stored');
        }
    } catch (error) {
        errorMessage('Something went wrong, please try again, or contact support if error persists')
        console.log("Keychain couldn't be accessed!", error);
    }
}

  onAppleButtonPress = async () => {
    this.setState({ loading: true, formErrors: [] })
    try {
      
      const appleAuthRequestResponse = await appleAuth.performRequest({
        // requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        // requestedScopes: [
        //   AppleAuthRequestScope.EMAIL,
        //   AppleAuthRequestScope.FULL_NAME
        // ],
      });
      const { identityToken } = appleAuthRequestResponse;
      console.log('Apple response ',appleAuthRequestResponse)
      this.socialApiCall('apple',identityToken)
      // console.log('Apple token ',appleAuthRequestResponse)
    } catch (error) {
      // console.log('Error ', error)
      this.setState({ loading: false })
      if (error.code === appleAuth.Error.CANCELED) {
        this.setState({ formErrors: ['User canceled Apple Sign in.']})
        console.warn('User canceled Apple Sign in.');
      } else {
        this.setState({ formErrors: ['Something went error, Please try again, if it persists please contact support.']})
        console.error(error);
      }
    }
  }

  // componentDidMount() {
  //   // setContext(this.context);
  // }
  componentWillUnmount = () => {
    this.setState({ loading: false })
  }

  onDecline = () => {
    this.props.onDecline(false)
  }
  

  renderAppleLogin = () => {
    if(Platform.OS === 'ios') {
      return (
        <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10, alignItems: 'center', overflow: 'hidden'}}>
          <AppleButton
            buttonStyle={AppleButton.Style.DEFAULT}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              width: '100%', // You must specify a width
              height: 45, // You must specify a height
              fontFamily: 'Nunito-Bold'
            }}
            onPress={() => this.onAppleButtonPress()}
          />
        </View>
      )
    }
  }

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, 
      textGreen, textBold } = GStyles;
    const { modalHeader, closeContainer, logoContainer, container, modalContainer, inputContainer, 
      buttonContainer, modalBodyStyle, dashStyles, dashContainer, socialContainer, buttonStyle, accountStyle } = styles
    const { state } = this.context
    return (
      
        <Modal visible={visible} transparent onRequestClose={() => {}} animationType="slide">
          <View style={modalContainer}>
            {this.renderLoading()}
            
            <View style={modalHeader} >
              <View style={logoContainer}>
                <Image resizeMode="contain" style={imgStyle} source={require("../../assets/images/icons/aura/aura.png")} />
              </View>

              <TouchableOpacity onPress={this.onDecline} style={closeContainer}>
                <Icon type="Feather" name="x" />
              </TouchableOpacity>
            </View>
            
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={modalBodyStyle}>
                <View style={inputContainer}>
                  <CustomInput placeholder="Email" label="Email" onChangeText={this.onChangeValue} value={this.state.email}
                attrName="email" />
                </View>
                <View style={inputContainer}>
                  <CustomInput password secureTextEntry placeholder="Password" label="Password" onChangeText={this.onChangeValue} 
                  value={this.state.password} attrName="password" />
                </View>
                <View style={buttonContainer} >
                  {state.biometricEnabled && <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                    <TouchableOpacity onPress={this.loginWithBiometrics} style={{ borderWidth: 1, borderColor: colors.orange, borderRadius: 10}}>
                      <Icon type="MaterialIcons" name="fingerprint" style={{ fontSize: 40, color: colors.orange}} />
                    </TouchableOpacity>
                  </View>}
                  {this.renderError()}
                  <CustomButton buttonText="Log In" onPress={this.submit} disabled={this.disabled()} />
                </View>
                <View>
                  <TouchableOpacity onPress={this.forgotPassword}>
                    <MyText style={[textH5Style, textCenter, textDarkGrey]}>Forgot password?</MyText>
                  </TouchableOpacity>
                </View>
                <View style={dashContainer}>
                  <View style={dashStyles}></View>
                  <MyText style={[textH4Style, textDarkGrey, { paddingHorizontal: 20}]}>OR</MyText>
                  <View style={dashStyles}></View>
                </View>
                <View style={socialContainer}>
                  {/* <CustomButton buttonText="Log In With Facebook" buttonStyle={buttonStyle} onPress={this.loginWithFacebook}
                  socialImg={require('../../assets/images/icons/facebook/facebook.png')}
                    textStyle={{ color: colors.darkGrey }}  /> */}
                  <CustomButton buttonText="Log In With Google" buttonStyle={buttonStyle} onPress={this.loginWithGoogle}
                  socialImg={require('../../assets/images/icons/google/google.png')}
                    textStyle={{ color: colors.darkGrey }}
                  />
                  {this.renderAppleLogin()}
                </View>

                <View>
                  <TouchableOpacity style={accountStyle} onPress={this.linkToRegister}>
                    <MyText style={[textH4Style]}>
                      Don't have an account? {""}
                      <MyText style={[textUnderline, textGreen, textBold]}>Sign Up </MyText>
                    </MyText>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, width: '100%', backgroundColor: colors.white
  },
  modalHeader: {
    flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20,
    paddingVertical: 30, position: 'absolute', top: Platform.OS === 'ios' ? 30 : 0,zIndex: 4, width: '100%', backgroundColor: colors.white,
    // borderWidth: 1
  },
  logoContainer: { width: 70, height: 25 },
  closeContainer: {
    // width: 50, height: 50
  },
  modalBodyStyle: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 120
  },
  inputContainer: {
    marginBottom: 30
  },
  buttonContainer: {
    marginTop: 30, marginBottom: 20
  },
  dashContainer: {
    flexDirection: "row", flex: 1,marginTop: 40, marginBottom: 20, alignItems: "center",justifyContent: "center",
  },
  dashStyles: {
    height: 1, backgroundColor: colors.lightGrey, flex: 1
  },
  socialContainer: {

  },
  accountStyle: {
    marginBottom: 90, marginTop: 70, alignSelf: 'center',
  },
  
  
  buttonStyle: {
    borderWidth: 1, borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    elevation: 2,
    marginTop: 20,
  },
});

export default LoginModal;
