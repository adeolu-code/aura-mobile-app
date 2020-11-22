/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity, Keyboard,
} from "react-native";
import colors from "../../colors";
import { CustomInput, MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
// import { setUser, setToken } from '../../helpers';
import { setContext, Request, urls } from '../../utils';
import { AppContext } from '../../../AppProvider';
// import Dashboard from "../dashboard_stack/Dashboard";

class ForgotPassword extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { 
      email: " ",
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
    const { formErrors } = this.state;
    if (formErrors.length !== 0) {
      return (<Error errors={formErrors} />)
    }
  }
  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }
  loginPage = ()=> {
    // const { navigation } = this.props;
    this.props.navigation.navigate('DashboardStack', {screen: 'DashboardView'})
  }
  submit = async () => {
    Keyboard.dismiss()
    const { email} = this.state;
    this.setState({ loading: true, formErrors: [] })
    const obj = { username: email }
    try {
      const res = await Request(urls.identityBase, `${urls.v}user/resetpassword`, obj);
      console.log('Res ',res);
      if (!res.isError) {
        // this.getUserDetails(res.data.access_token);
        // this.context.set({ token: res.data })
        // await setToken(res.data);
      } else {
        const message = res.message;
        const error = [message]
        this.setState({ formErrors: error, loading: false});
        this.loginPage;
      }
    } catch (error) {
      console.log('Catched error ', error)
      this.setState({ formErrors: error, loading: false})
    }
  }
  disabled = () => {
    const { email} = this.state;
    if (email === '') {
      return true;
    }
    return false;
  }

  componentWillUnmount = () => {
    this.setState({ loading: false })
  }

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, 
      textGreen, textBold } = GStyles;
    const { modalHeader, closeContainer, logoContainer, container, modalContainer, inputContainer, 
      buttonContainer, modalBodyStyle, dashStyles, dashContainer, socialContainer, buttonStyle, accountStyle } = styles
    return (
          <View style={modalContainer}>
            {this.renderLoading()}
            <View style={modalHeader} >
              <View style={logoContainer}>
                <Image resizeMode="contain" style={imgStyle} source={require("../../assets/images/icons/aura/aura.png")} />
              </View>

              {/* <TouchableOpacity onPress={this.onDecline} style={closeContainer}>
                <Icon type="Feather" name="x" />
              </TouchableOpacity> */}
            </View>
            <ScrollView keyboardShouldPersistTaps="always">
              <View style={modalBodyStyle}>
                <View style={inputContainer}>
                  <CustomInput placeholder=" " label="Email Address" onChangeText={this.onChangeValue} value={this.state.email}
                attrName="email" />
                </View>
                {/* <View style={inputContainer}>
                  <CustomInput password secureTextEntry placeholder="Password" label="Password" onChangeText={this.onChangeValue} 
                  value={this.state.password} attrName="password" />
                </View> */}
                <View style={buttonContainer} >
                  {this.renderError()}
                  <CustomButton buttonText="Recover Password" onPress={this.submit} disabled={this.disabled()} />
                </View>
                {/* <View>
                  <TouchableOpacity onPress={{}}> 
                    <MyText style={[textH5Style, textCenter, textDarkGrey]}>Forgot password?</MyText>
                  </TouchableOpacity>
                </View>
                <View style={dashContainer}>
                  <View style={dashStyles}></View>
                  <MyText style={[textH4Style, textDarkGrey, { paddingHorizontal: 20}]}>OR</MyText>
                  <View style={dashStyles}></View>
                </View> */}
                {/* <View style={socialContainer}>
                  <CustomButton buttonText="Log In With Facebook" buttonStyle={buttonStyle} onPress={this.loginWithFacebook}
                  socialImg={require('../../assets/images/icons/facebook/Facebook.png')}
                    textStyle={{ color: colors.darkGrey }}  />
                  <CustomButton buttonText="Log In With Google" buttonStyle={buttonStyle} onPress={this.loginWithGoogle}
                  socialImg={require('../../assets/images/icons/google/google.png')}
                    textStyle={{ color: colors.darkGrey }}
                  />
                </View> */}
    
                {/* <View>
                  <TouchableOpacity style={accountStyle} onPress={this.linkToRegister}>
                    <MyText style={[textH4Style]}>
                      Don't have an account? {""}
                      <MyText style={[textUnderline, textGreen, textBold]}>Sign Up </MyText>
                    </MyText>
                  </TouchableOpacity>
                </View> */}
              </View>
            </ScrollView>
          </View>      
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, width: '100%', backgroundColor: colors.white,
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
    flex: 1, justifyContent: "center", paddingTop: 120,
  },
  inputContainer: {
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 30, marginBottom: 20,
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

export default ForgotPassword;
