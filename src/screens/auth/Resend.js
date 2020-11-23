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
import Header from '../../components/Header';

// import { setUser, setToken } from '../../helpers';
import { setContext, Request, urls, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';
// import Dashboard from "../dashboard_stack/Dashboard";

class Resend extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { 
      email: props.route.params.email,
      loading: false, message: '',
      formErrors: [] 
    };
  }
  
  componentDidMount() {

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
  
  loginPage = ()=> {
    // const { navigation } = this.props;
    this.props.navigation.navigate('Dashboard', {screen: 'DashboardView'})
  }
  renderSuccessMessage = () => {
      const { message } = this.state;
      const { textOrange, textH4Style, textCenter, textSuccess } = GStyles
      if(message) {
          return (
              <View>
                  <MyText style={[textH4Style, textSuccess, textCenter]}>{message}</MyText>
              </View>
          )
      }
  }
  resendMail = async () => {
      const { email } = this.state
      this.setState({ loading: true, formErrors: [] })
      const res = await GetRequest(urls.identityBase, `${urls.v}user/forgotpassword/?email=${email}`);
      console.log(res)
      if(res.isError) {
          const message = res.message;
          const error = [message]
          this.setState({ formErrors: error})
      } else {
          this.setState({ message: 'Email resent successfully!!'})
          setTimeout(() => {
              this.setState({ message: ''})
          }, 5000);
      }
      this.setState({ loading: false })
  }

  componentWillUnmount = () => {
    this.setState({ loading: false })
  }

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, textOrange, 
      textGreen, textBold } = GStyles;
    const { modalContainer, inputContainer, 
      buttonContainer, modalBodyStyle, buttonStyle } = styles
    return (
          <View style={modalContainer}>
            <Header title="Recovery Link Sent Successfully" {...this.props} />
            {this.renderLoading()}
            
            <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1}}>
              <View style={modalBodyStyle}>
                <View>
                  <MyText style={[textOrange, textH4Style ]}>A recovery link has been sent to your email 
                    <MyText style={[textBold]}> {this.state.email}</MyText>
                  </MyText>
                </View>
                
                <View>
                    {this.renderError()}
                    <View style={inputContainer}>
                        <CustomButton buttonText="Resend Mail" buttonStyle={buttonStyle} 
                        textStyle={{ color: colors.orange}} onPress={this.resendMail} />
                    </View>
                    {this.renderSuccessMessage()}
                </View>
                <View style={{paddingTop: 20, width: '100%'}}>
                    
                    <CustomButton buttonText="Log in" onPress={this.loginPage} />
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
    flex: 1, justifyContent: "center", paddingTop: 260,
  },
  inputContainer: {
    marginBottom: 20, marginTop: 80
  },
  buttonContainer: {
    marginTop: 30, marginBottom: 20,
  },
  
  buttonStyle: {
    elevation: 1, borderWidth: 1, borderColor: colors.orange, backgroundColor: colors.white
  }
});

export default Resend;
