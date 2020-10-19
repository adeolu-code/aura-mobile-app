/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MyText, CustomButton, Loading, Error } from '../../utils/Index';
import colors from '../../colors';
import OtpModal from '../../components/dashboard/OtpModal';
import EmailVerificationModal from '../../components/dashboard/EmailVerificationModal';
import GStyles from '../../assets/styles/GeneralStyles';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, GetRequest } from '../../utils';
import Loader from '../../assets/loader.svg'



class HostScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showOtpModal: false, showEmailModal: false, errors: [], loading: false };
  }
  HostProperty = () => {
    // this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSlider'});
    this.props.navigation.navigate('Auth', { screen: 'List'})
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading />); }
  }
  renderError = () => {
      const { errors } = this.state;
      if (errors.length !== 0) {
          return (<Error errors={errors} />);
      }
  }
  becomeAHost = () => {
    const { userData } = this.context.state;
    const { navigation } = this.props;
    // this.openOtpModal()
    // this.generateOtp()
    if (userData.isPhoneVerified) {
      if (userData.isEmailVerified) {
        navigation.navigate('HostPropertyStack', {screen: 'HostSteps'});
      } else {
        this.sendMail();
      }
    } else {
      // Got to OTP modal to verify phone
      if (userData.phoneNumber) {
        this.generateOtp();
      } else {
        if (userData.isEmailVerified) {
          navigation.navigate('HostPropertyStack', {screen: 'HostSteps'});
        } else {
          this.sendMail();
        }
      }
    }
  }
  openOtpModal = () => {
    this.setState({ showOtpModal: true });
  }
  closeOtpModal = () => {
    this.setState({ showOtpModal: false });
  }
  openEmailModal = () => {
    this.setState({ showEmailModal: true });
  }
  closeEmailModal = () => {
    this.setState({ showEmailModal: false });
  }
  generateOtp = async () => {
    this.setState({ loading: true, errors: [] });
    const res = await Request(urls.identityBase, 'api/v1/user/otp/generate');
    this.setState({ loading: false });
    if (res.IsError) {
        const message = res.Message;
        const error = [message];
        this.setState({ errors: error});
    } else {
      this.openOtpModal()
    }
  }
  sendMail = async () => {
      const { userData } = this.context.state;
      this.setState({ loading: true, errors: [] });
      const res = await GetRequest(urls.identityBase, `api/v1/user/email/verification/resend/${userData.username}`);
      this.setState({ loading: false });
      if (res.isError) {
          const message = res.message;
          const error = [message];
          this.setState({ errors: error});
      } else {
        this.openEmailModal();
      }
  }

  render() {
    const { contentContainer, middleStyle, buttonContainer } = styles;
    const {  textH5Style, textH4Style, textBold, textGrey, textH6Style, textUnderline, textH1Style, textExtraBold, textDarkBlue, textCenter, textGreen } = GStyles;

    return (
      <SafeAreaView style={{flex: 1}}>
        {this.renderLoading()}
        <View style={contentContainer}>  
        <ScrollView style={{flex: 1, backgroundColor: colors.white }}>
            <View style={{flex: 2}}>
                <MyText style={[textExtraBold, textH1Style, textDarkBlue]}>Dashboard</MyText>
            </View>
            <Loader />
            <View style={middleStyle}>
                <MyText style={[textGrey, textH4Style, textCenter]}>
                    You have no property listed on Aura yet. Become a host to get started.
                </MyText>
            </View>
            <View style={buttonContainer}>
                {this.renderError()}
                <CustomButton buttonText='Become A Host' onPress={this.becomeAHost} 
                buttonStyle={{backgroundColor: colors.black}} textStyle={[textH4Style,{color: colors.white}]}/>
                <TouchableOpacity onPress={this.HostProperty}>
                    <MyText style={[textUnderline, textGreen, textH5Style, {marginTop: 20}]}>Learn about Hosting</MyText>
                </TouchableOpacity>
            </View>
            <EmailVerificationModal visible={this.state.showEmailModal} onDecline={this.closeEmailModal} { ...this.props } />
            <OtpModal visible={this.state.showOtpModal} onDecline={this.closeOtpModal} { ...this.props } 
            openEmail={this.openEmailModal} />
            
        </ScrollView>
        </View>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
         paddingHorizontal: 24,
         paddingVertical: 20,
         flex: 1,
         backgroundColor: colors.white,
    },
    middleStyle: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
        marginBottom: 170,
    },
    buttonContainer: {
        alignItems: 'center',
         flex: 2,
         justifyContent: 'center',
    },
});

export default HostScreen;
