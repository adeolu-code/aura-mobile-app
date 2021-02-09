/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {Icon} from 'native-base';
import { CustomButton, MyText, Loading, Error } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, GetRequest } from '../../utils';


class SuccessScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { 
      loading: false, 
      formErrors: [], 
      parentScreen: props.route.params.parentScreen,
      finalScreen: props.route.params.finalScreen,
    };
  }
  listScreen = () => {
    this.props.navigation.navigate('List');
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
  renderSuccessMessage = () => {
      const { message } = this.state;
      const { textOrange, textH4Style, textCenter, textSuccess } = GStyles
      if(message) {
          return (
              <View style={{ marginBottom: 20 }}>
                  <MyText style={[textH4Style, textSuccess, textCenter]}>{message}</MyText>
              </View>
          )
      }
  }
  skip = async () => {
    if (this.state.finalScreen) {
      this.props.navigation.navigate(this.state.parentScreen, {
        screen: this.state.finalScreen,
        params: { force:true },
      });
    }
    else {
      this.props.navigation.navigate('Tabs', { screen: 'Dashboard'})
      // this.props.navigation.navigate('List');
    }
    
  }
  checkVerified = () => {
    if (this.state.finalScreen) {
      this.props.navigation.navigate(this.state.parentScreen, {
        screen: this.state.finalScreen,
        params: { force:true },
      });
    }
    else {
      this.setState({ loading: true, formErrors: [] })
      this.context.getUserProfile(this.context.state.token.access_token)
      .then((res) => {
          this.setState({ loading: false })
          if(res.isEmailVerified) {
              // this.props.navigation.navigate('List');
              this.props.navigation.navigate('Tabs', { screen: 'Dashboard'})
          } else {
              this.setState({ formErrors: ['Email verification failed']})
          }
      })
      .catch((error) => {
          this.setState({ formErrors: ['Something went wrong please try again'], loading: false })
      })
    }
  }
  resendMail = async () => {
      const { userData } = this.context.state
      this.setState({ loading: true, formErrors: [] })
      const res = await GetRequest(urls.identityBase, `${urls.v}user/email/verification/resend/${userData.username}`);
      console.log(res)
      if(res.isError) {
          const message = res.message;
          const error = [message]
          this.setState({ formErrors: error})
      } else {
          this.setState({ message: 'Email verification link resent successfully!!'})
          setTimeout(() => {
              this.setState({ message: ''})
          }, 5000);
      }
      this.setState({ loading: false })
  }

  render() {
    const {container, middleRow, bottomRow, header, iconContainer  } = styles
    const { textBold, textSuccess, textUnderline, textCenter, textExtraBold, textLgStyle, textH4Style, textGrey, textH5Style} = GStyles
    const { userData } = this.context.state
    return (
      <SafeAreaView style={{ flex: 1}}>
        {this.renderLoading()}
        <View style={header}>
            <MyText style={[textLgStyle, textExtraBold]}>
              {
                this.state.finalScreen ?
                "OTP verified":"Account Successfully Created"
              }  
              
            </MyText>
        </View>
          <View style={container}>
            <View>
              {
                !this.state.finalScreen &&
                <MyText style={[textH5Style, textGrey, { lineHeight: 25}]}>
                  A verification link has been sent to <MyText style={[textBold]}>{userData ? userData.email : ''} </MyText>
                </MyText>
              }
            </View>
            <View style={middleRow}>
                <View style={iconContainer}>
                  <Icon type="Feather" name="check" style={{color:colors.white, fontSize: 40}} />
                </View>
            </View>
            <View>
                <View style={{paddingTop: 20, marginBottom: 20}}>
                    {this.renderSuccessMessage()}
                    {this.renderError()}
                    <CustomButton onPress={this.SuccessScreen} buttonText="I have Verified my account" buttonStyle={{ elevation: 2}}
                      onPress={this.checkVerified} />
                </View>
                {
                  !this.state.finalScreen &&
                  <CustomButton onPress={this.resendMail} buttonText='Resend Mail' 
                  buttonStyle={{borderColor: '#000', borderWidth: 1,borderRadius: 8, backgroundColor: '#fff', elevation: 1}} textStyle={{color: '#222222'}}/>
                }
            </View>
            <View style={bottomRow}>
                {
                  !this.state.finalScreen &&
                  <TouchableOpacity onPress={this.skip}><MyText style={[textGrey, textH5Style]} >Don’t have access to your mail?{' '}
                    <MyText style={[textSuccess, textBold, textUnderline]}>Skip This</MyText></MyText>
                  </TouchableOpacity>
                }
            </View>
            
          </View>
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
  }, middleRow:{
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
  },
  bottomRow: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 40,
  },
  header: {
    width: '100%', paddingTop: Platform.OS === 'ios' ? 60 : 40, backgroundColor: colors.white, paddingHorizontal: 20,
        position: 'absolute', top: 0, zIndex: 100,
  },
  iconContainer: {
    width: 70, height: 70, borderRadius: 50, backgroundColor: colors.orange, justifyContent: 'center', alignItems:'center'
  }
    
});

export default SuccessScreen;
