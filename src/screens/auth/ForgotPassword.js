/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import colors from "../../colors";
import { CustomInput, MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import Header from '../../components/Header';

// import { setUser, setToken } from '../../helpers';
import { setContext, urls, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';
// import Dashboard from "../dashboard_stack/Dashboard";

class ForgotPassword extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { 
      email: "",
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
  submit = async () => {
    Keyboard.dismiss()
    const { email} = this.state;
    this.setState({ loading: true, formErrors: [] })
    try {
      const res = await GetRequest(urls.identityBase, `${urls.v}user/forgotpassword/?email=${email}`);
      console.log('Res ',res);
      if (!res.isError) {
        this.props.navigation.navigate('Resend', { email })
        // this.getUserDetails(res.data.access_token);
        // this.context.set({ token: res.data })
        // await setToken(res.data);
      } else {
        const message = res.message;
        const error = [message]
        this.setState({ formErrors: error, loading: false});
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
    const { textH4Style, textOrange } = GStyles;
    const { modalContainer, inputContainer, 
      buttonContainer, modalBodyStyle } = styles
    return (
          <View style={modalContainer}>
            <Header title="Forgot Password" {...this.props} />
            {this.renderLoading()}
            {/* <View style={modalHeader} >
              <View style={logoContainer}>
                <Image resizeMode="contain" style={imgStyle} source={require("../../assets/images/icons/aura/aura.png")} />
              </View>

              <TouchableOpacity onPress={this.onDecline} style={closeContainer}>
                <Icon type="Feather" name="x" />
              </TouchableOpacity>
            </View> */}
            <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1}}>
              <View style={modalBodyStyle}>
                <View>
                  <MyText style={[textOrange, textH4Style ]}>A verification Link would be sent to your email address</MyText>
                </View>
                <View style={inputContainer}>
                  <CustomInput placeholder="Enter email" label="Email Address" onChangeText={this.onChangeValue} value={this.state.email}
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
    paddingVertical: 40, position: 'absolute', top: 0,zIndex: 4, width: '100%', backgroundColor: colors.white,
    // borderWidth: 1
  },
  logoContainer: { width: 70, height: 25 },
  closeContainer: {
    // width: 50, height: 50
  },
  modalBodyStyle: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 160,
  },
  inputContainer: {
    marginBottom: 20, marginTop: 80
  },
  buttonContainer: {
    marginTop: 30, marginBottom: 20,
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
