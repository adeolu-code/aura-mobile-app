/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal, Platform
} from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from '@react-native-community/google-signin';
import colors from "../../colors";
import { MyText, CustomButton, Loading, Error, } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { setUser, setToken } from '../../helpers';
import { setContext, Request, urls, HOST } from '../../utils';
import { AppContext } from '../../../AppProvider';


class SignUpModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { formErrors: [], loading: false };
  }
  linkToLogin = () => {
    this.props.onDecline();
    setTimeout(() => {
      this.props.openLogin();
    }, 300);
  }
  linkToSignUp = () => {
    this.props.onDecline();
    this.props.navigation.navigate('Auth');
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
  // getUserDetails = (token) => {
  //   this.context.getUserProfile(token)
  //   .then(() => {})
  //   .catch((error) => {
  //     this.setState({ formErrors: ['Something went wrong please try again'], loading: false })
  //   })
  // }
  socialApiCall = async (type, token) => {
    const obj = { userType: 0, token }
    try {
      const res = await Request(urls.identityBase, `api/v1/auth/user/login/${type}`, obj);
      // console.log(res)
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
  // socialApiCall = async (type, token) => {
  //   const obj = { userType: 0, token }
  //   try {
  //     const res = await Request(urls.identityBase, `api/v1/auth/user/login/${type}`, obj);
  //     console.log(res)
  //     if(res.isError) {
  //       const message = res.message;
  //       const error = [message]
  //       this.setState({ formErrors: error})
  //     } else {
  //       this.getUserDetails(res.data.access_token);
  //     }
  //     this.setState({ loading: false })
  //   } catch (error) {
  //     this.setState({ loading: false })
  //   }
  // }
  loginWithGoogle = async () => {
      this.setState({ loading: true, formErrors: [] })
      GoogleSignin.configure({
        webClientId: '411688971660-sk7na5gu3pq2uqntmko314v4voant162.apps.googleusercontent.com',
      });
      try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          // console.log('USer info ', userInfo)
          // await GoogleSignin.signOut();
          const token = await GoogleSignin.getTokens();
          // console.log('USer token ', token)
          this.socialApiCall('google', token.idToken)
          
      } catch (error) {
          console.log('Error ', error)
          this.setState({ loading: false, formErrors: ['Something went error, Please try again, if it persists please contact support.'] })
          // this.setState({ loading: false, formErrors: [error.message] })
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
        // this.setState({ loading: false, formErrors: ["Login fail with error:" + error] })
        this.setState({ loading: false, formErrors: ["Your account has not been configured for facebook login, please contact support"] })
      }.bind(this)
    );
  }

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, 
      textGreen, textBold } = GStyles;
    const { modalHeader, closeContainer, logoContainer, modalContainer, inputContainer, 
      buttonContainer, modalBodyStyle, dashStyles, dashContainer, socialContainer, buttonStyle, accountStyle } = styles
    return (
          
      <Modal visible={visible} onRequestClose={() => {}} animationType="slide">
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
          <ScrollView>
            
            <View style={styles.container2}>
              <View>
                <CustomButton buttonText="Sign Up With Email" onPress={this.linkToSignUp} />
              </View>
              <View style={dashContainer}>
                <View style={dashStyles}></View>
                <MyText style={[textH4Style, textDarkGrey, { paddingHorizontal: 20}]}>OR</MyText>
                <View style={dashStyles}></View>
              </View>
              <View>
                {/* <CustomButton
                  buttonText="Sign Up With Facebook" buttonStyle={buttonStyle} onPress={this.loginWithFacebook}
                  socialImg={require('../../assets/images/icons/facebook/facebook.png')}
                  textStyle={{ color: colors.darkGrey }}
                /> */}
                <CustomButton
                  buttonText="Sign Up With Google" buttonStyle={buttonStyle} onPress={this.loginWithGoogle}
                  socialImg={require('../../assets/images/icons/google/google.png')}
                  textStyle={{ color: colors.darkGrey }}
                />
              </View>
              <View>
                {this.renderError()}
                  <TouchableOpacity style={accountStyle} onPress={this.linkToLogin}>
                    <MyText style={[textH4Style]}>
                      Already have an account? {""}
                      <MyText style={[textUnderline, textGreen, textBold]}>Log In </MyText>
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
    paddingVertical: 30, position: 'absolute', top: Platform.OS === 'ios' ? 40 : 0,zIndex: 4, 
    width: '100%', backgroundColor: colors.white,
    // borderWidth: 1
  },
  logoContainer: { width: 70, height: 25 },
  dashContainer: {
    flexDirection: "row", flex: 1,marginTop: 40, marginBottom: 20, alignItems: "center",justifyContent: "center",
  },
  dashStyles: {
    height: 1, backgroundColor: colors.lightGrey, flex: 1
  },
  
  container2: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 40,
    flex: 1,
    justifyContent: "center",
    marginTop: 220,
  },
  accountStyle: {
    marginBottom: 90, marginTop: 70, alignSelf: 'center'
  },
  buttonStyle: {
    borderWidth: 1, borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    elevation: 2,
    marginTop: 30,
  },
});

export default SignUpModal;
