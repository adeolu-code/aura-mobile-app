/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { CustomButton, MyText, CustomInputNumber, Loading, Error } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, GetRequest } from '../../utils';
import { setUser } from '../../helpers'


class OtpScreen extends Component {
  static contextType = AppContext;
  /** final screen being screen to be navigated if supplied post verification */
  constructor(props) {
    super(props);
    this.state = { 
      numbers: [], 
      errors: [], 
      message: '', 
      parentScreen: props.route.params.parentScreen,
      finalScreen: props.route.params.finalScreen,
    };
    this.num1 = React.createRef();
    this.num2 = React.createRef();
    this.num3 = React.createRef();
    this.num4 = React.createRef();
    this.num5 = React.createRef();
    this.num6 = React.createRef();
  }
  
  componentDidMount() {
    setContext(this.context);
  }

  renderLoading = () => {
      const { loading } = this.state;
      if(loading) { return (<Loading />) }
  }
  renderError = () => {
    const { errors } = this.state
    if(errors.length !== 0) {
        return (<Error errors={errors} />)
    }
  }
  renderSuccessMessage = () => {
      const { message } = this.state;
      const { textH4Style, textSuccess } = GStyles
      if(message) {
          return (
              <View style={{ marginBottom: 20}}>
                  <MyText style={[textH4Style, textSuccess ]}>{message}</MyText>
              </View>
          )
      }
  }
  changeNumValue = (item, index, value) => {
      const { numbers } = this.state
      const values = [ ...numbers ]
      const numberRefs = [this.num1, this.num2, this.num3, this.num4, this.num5, this.num6]
      if(value) {
          values.push(value)
          this.setState({ numbers: values })
          // this.setState({ numbers: values })
          if(numberRefs[index+1] !== undefined) {
              numberRefs[index+1].current.focus()
          }
      } else {
          values.splice(index, 1)
          this.setState({ numbers: values })
          if(numberRefs[index-1] !== undefined) {
              numberRefs[index-1].current.focus()
          }
      }
  }

  renderNumberInput = () => {
      const { inputStyle } = styles
      const numberRefs = [this.num1, this.num2, this.num3, this.num4, this.num5, this.num6]
      return numberRefs.map((item, index) => {
          return (
              <CustomInputNumber refs={item} key={index} style={inputStyle}
              onChangeText={this.changeNumValue.bind(this, item, index)} />
          )
      })
  }
  successScreen = () => {
    this.props.navigation.navigate('Success', {
      parentScreen: this.state.parentScreen, 
      finalScreen: this.state.finalScreen,
    });
  }
  resendCode = async () => {
      this.setState({ loading: true, errors: [] })
      try {
        const res = await Request(urls.identityBase, `${urls.v}user/otp/generate`);
        console.log('Resend ',res)
        this.setState({ loading: false })
        if(res.IsError) {
            const message = res.Message;
            const error = [message]
            this.setState({ errors: error})
        } else {
            this.setState({ message: 'OTP resent successfully!!'})
            setTimeout(() => {
                this.setState({ message: ''})
            }, 5000);
        }
      } catch (error) {
        this.setState({ loading: false })
      }
      
  }
  verifyOtp = async () => {
      Keyboard.dismiss()
      const { numbers } = this.state;
      const { state, set } = this.context
      if(numbers.length < 6) {
          this.setState({ errors: ['Please fill out the code']})
      } else {
        try {
          this.setState({ loading: true, errors: [] })
          let numberString = ''
          numbers.map((item, i) => {
              numberString = numberString+item
          })
          const res = await GetRequest(urls.identityBase, `${urls.v}user/otp/verify?Otp=${numberString}`);
          console.log(res)
          if(res.isError) {
              const message = res.message;
              const error = [message]
              this.setState({ errors: error, loading: false })
              // this.checkEmailVerification()
          } else {
            const obj = { ...state.userData, isPhoneVerified: true }
            set({ userData: obj })
            if (this.state.finalScreen == undefined) {
              /** only do emailc check if next screen is specified */
              this.checkEmailVerification();
            } else {
              this.successScreen();
            }
            await setUser(obj);
          }
        } catch (error) {
          
        }
      }
  }
  sendMail = async () => {
    const { userData } = this.context.state
    try {
      const res = await GetRequest(urls.identityBase, `${urls.v}user/email/verification/resend/${userData.username}`);
    } catch (error) {
      
    }
  }
  checkEmailVerification = () => {
    this.sendMail()
    this.setState({ loading: false })
    this.props.navigation.navigate('Success', { 
      parentScreen: undefined,
      finalScreen: undefined
    });
  }
  render() {
    const { container, middleRow, bottomRow, inputContainer, topRow, buttonStyle } = styles
    const { textBold, textH4Style, flexRow, imgStyle, textH3Style, textGrey, textWhite,
      textH5Style, textGreen, 
      textUnderline, textOrange } = GStyles
    const { userData } = this.context.state
    
    return (
      <SafeAreaView style={{ flex: 1}}>
          <Header {...this.props} title="Authentication Code" />
          {this.renderLoading()}
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={container} >
            
            <View style={topRow}>
              <MyText style={[textH4Style, textGrey, { lineHeight: 25}]}>
                An OTP code has been sent to {userData ? userData.phoneNumber : ''} Kindly enter below the 6 digit code 
                {/* or {' '}
                <TouchableOpacity >
                  <MyText style={[textOrange, textUnderline, textBold, { marginBottom: -4}]}>Change Phone Number</MyText>
                </TouchableOpacity> */}
              </MyText>
              
            </View>
            
            <View style={middleRow}>
              <View>
                <View style={inputContainer}>
                    {this.renderNumberInput()}
                </View>
                {this.renderSuccessMessage()}
              </View>
              <View>
                  <MyText style={[textH4Style, textGrey]}>Didn’t receive a code? {' '}<TouchableOpacity onPress={this.resendCode}>
                    <MyText style={[textUnderline, textOrange, textBold, { marginBottom: -4}]}>Resend Code</MyText>
                  </TouchableOpacity></MyText>
              </View>

              {/* <View style={{paddingTop: 40}}>
                  <MyText style={[textUnderline, textGreen, textBold, textH5Style]}>Request Call</MyText>
              </View> */}
            </View>
            <View style={bottomRow}>
              {this.renderError()}
              <CustomButton onPress={this.SuccessScreen} buttonText="Next" buttonStyle={buttonStyle} onPress={this.verifyOtp} />
            </View>
          </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 130,
    flex: 1,
  },
  topRow: {
    // borderWidth: 1
  },
  middleRow: {
      justifyContent: 'center',
      alignContent: 'space-between',
      flex: 3,
      // borderWidth: 1
  },
  bottomRow: {
      justifyContent: 'flex-end',
      paddingBottom: 30,
      flex: 1,
      // borderWidth: 1
  },
  inputContainer: {
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
      width: '100%', marginBottom: 60, 
  },
  buttonStyle: {
    elevation: 1
  }
});

export default OtpScreen;
