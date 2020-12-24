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
import { setContext, Request, urls } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { GOOGLE_WEB_CLIENTID } from '../../strings'
import ForgotPassword from "../../screens/auth/ForgotPassword";

class LoginModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { 
      email: "ferume@tapi.re", 
      password: "123999_@ABCabc", 
      // email: '',
      // password: '',
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
    navigation.navigate('Auth', {screen: 'Password'});
  }
  submit = async () => {
    Keyboard.dismiss()
    const { email, password } = this.state;
    this.setState({ loading: true, formErrors: [] })
    const obj = { username: email, password }
    try {
      const res = await Request(urls.identityBase, `${urls.v}auth/user/login`, obj)
      console.log('Res ',res)
      if(!res.isError) {
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
      this.setState({ formErrors: error, loading: false})
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
    this.context.getUserProfile(token)
    .then(() => {
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
    const res = await Request(urls.identityBase, `api/v1/auth/user/login/${type}`, obj);
    // console.log(res)
    if(res.isError) {
      const message = res.message;
      const error = [message]
      this.setState({ formErrors: error})
    } else {
      this.getUserDetails(res.data.access_token);
      this.context.set({ token: res.data })
      await setToken(res.data)
    }
    // this.setState({ loading: false })
  }

  loginWithGoogle = async () => {
      this.setState({ loading: true, formErrors: [] })
      GoogleSignin.configure({
        webClientId: '745362274321-sptpssq375evl7b4s7q46hk8dgc7aao6.apps.googleusercontent.com',
      });
      try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('USer info ', userInfo)
          // await GoogleSignin.signOut();
          const token = await GoogleSignin.getTokens();
          console.log('USer token ', token)
          this.socialApiCall('google', token.accessToken)
          
      } catch (error) {
          console.log('Error ', error, error.code)
          this.setState({ loading: false, formErrors: ['Something went error, Please try again, if it persists please contact support.'] })
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
          } else {
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
            console.log(data)
            this.socialApiCall('facebook', data.accessToken)
          })
        }
      }.bind(this),
      function(error) {
        console.log('Facebook Error ', "" + error)
        this.setState({ loading: false, formErrors: ["" + error] })
      }.bind(this)
    );
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

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, 
      textGreen, textBold } = GStyles;
    const { modalHeader, closeContainer, logoContainer, container, modalContainer, inputContainer, 
      buttonContainer, modalBodyStyle, dashStyles, dashContainer, socialContainer, buttonStyle, accountStyle } = styles
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
                  <CustomButton buttonText="Log In With Facebook" buttonStyle={buttonStyle} onPress={this.loginWithFacebook}
                  socialImg={require('../../assets/images/icons/facebook/facebook.png')}
                    textStyle={{ color: colors.darkGrey }}  />
                  <CustomButton buttonText="Log In With Google" buttonStyle={buttonStyle} onPress={this.loginWithGoogle}
                  socialImg={require('../../assets/images/icons/google/google.png')}
                    textStyle={{ color: colors.darkGrey }}
                  />
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
