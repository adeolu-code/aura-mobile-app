/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity, Keyboard,
  Modal,
} from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from '@react-native-community/google-signin';
import colors from "../../colors";
import { CustomInput, MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { setUser } from '../../helpers';
import { setContext, Request, urls } from '../../utils';


class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', loading: false, formErrors: [] };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  renderError = () => {
    const { formErrors } = this.state
    if(formErrors.length !== 0) {
      return (<Error errors={formErrors} />)
    }
  }
  linkToRegister = () => {
    this.props.openSignUp();
    setTimeout(() => {
      this.props.onDecline();
    }, 300);
  }
  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }
  submit = async () => {
    Keyboard.dismiss()
    const { email, password } = this.state;
    this.setState({ loading: true, formErrors: [] })
    const obj = { username: email, password }
    const res = await Request(urls.identityBase, 'api/v1/auth/user/login', obj)
    console.log(res)
    if(res.isError) {
      const message = res.message;
      const error = [message]
      this.setState({ formErrors: error})
    } else {
      // await setUser(res.data)
    }
    this.setState({ loading: false })
  }
  disabled = () => {
    const { email, password } = this.state
    if(email === '' || password === '') {
      return true
    }
    return false
  }

  socialApiCall = async (type, token) => {
    const obj = { userType: 0, token }
    const res = await Request(urls.identityBase, `api/v1/auth/user/login/${type}`, obj);
    console.log(res)
    if(res.isError) {
      const message = res.message;
      const error = [message]
      this.setState({ formErrors: error})
    } else {
      // await setUser(res.data)
    }
    this.setState({ loading: false })
  }

  loginWithGoogle = async () => {
      this.setState({ loading: true, formErrors: [] })
      GoogleSignin.configure();
      try {
          await GoogleSignin.hasPlayServices();
          // const userInfo = await GoogleSignin.signIn();
          // console.log('USer info ', userInfo)
          // await GoogleSignin.signOut();
          const token = await GoogleSignin.getTokens();
          console.log('USer token ', token)
          this.socialApiCall('google', token.accessToken)
          
      } catch (error) {
          console.log('Error ', error)
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
          this.setState({ loading: false, error: ['Login cancelled'] })
        } else {
          AccessToken.getCurrentAccessToken()
          .then((data) => {
            this.socialApiCall('facebook', data.accessToken)
          })
        }
      }.bind(this),
      function(error) {
        console.log('Error ', error)
        this.setState({ loading: false, error: [error] })
      }.bind(this)
    );
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

              <TouchableOpacity onPress={onDecline} style={closeContainer}>
                <Icon type="Feather" name="x" />
              </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
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
                  <TouchableOpacity>
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
                  socialImg={require('../../assets/images/icons/facebook/Facebook.png')}
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
    paddingVertical: 30, position: 'absolute', top: 0,zIndex: 4, width: '100%', backgroundColor: colors.white,
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
    marginBottom: 90, marginTop: 70, alignSelf: 'center'
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
