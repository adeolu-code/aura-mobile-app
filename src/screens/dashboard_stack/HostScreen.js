/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { MyText, CustomButton, Loading, Error } from '../../utils/Index';
import colors from '../../colors';
import OtpModal from '../../components/dashboard/OtpModal';
import EmailVerificationModal from '../../components/dashboard/EmailVerificationModal';
import GStyles from '../../assets/styles/GeneralStyles';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, GetRequest, PHOTOGRAPH, RESTAURANT, EXPERIENCE, HOST } from '../../utils';
import Header from '../../components/dashboard/DashboardHeader';

import MenuItems from '../../components/dashboard/MenuItems';
import TermsModal from '../../components/dashboard/TermsModal';


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class HostScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showOtpModal: false, showEmailModal: false, errors: [], loading: false, menuActive: false, showTermsModal: false, type: '' };
  }
  HostProperty = () => {
    this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSlider'});
    // this.props.navigation.navigate('Auth', { screen: 'List'})
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
  check = (link) => {
    const { userData } = this.context.state;
    this.context.set({ isInApp: true, edit: false })
    if (userData.isPhoneVerified) {
      if (userData.isEmailVerified) {
        link()
      } else {
        this.sendMail();
      }
    } else {
      // Got to OTP modal to verify phone
      if (userData.phoneNumber) {
        this.generateOtp();
      } else {
        if (userData.isEmailVerified) {
          link()
        } else {
          this.sendMail();
        }
      }
    }
  }
  becomeAPhotographer = () => {
    const link = () => this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: PHOTOGRAPH } })
    this.check(link)
  }
  hostAnExperience = () => {
    const link = () => this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: EXPERIENCE } })
    this.check(link)
  }
  hostARestaurant = () => {
    const link = () => this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: RESTAURANT } })
    this.check(link)
  }
  becomeAHost = () => {
    const { userData } = this.context.state;
    const { navigation } = this.props;
    // this.openOtpModal()
    // this.generateOtp()
    this.context.set({ isInApp: true, edit: false, propertyFormData: null })
    if (userData.isPhoneVerified) {
      if (userData.isEmailVerified) {
        this.openTermsModal()
        // navigation.navigate('HostPropertyStack', {screen: 'HostSteps'});
      } else {
        this.sendMail();
      }
    } else {
      // Got to OTP modal to verify phone
      if (userData.phoneNumber) {
        this.generateOtp();
      } else {
        if (userData.isEmailVerified) {
          this.openTermsModal()
          // navigation.navigate('HostPropertyStack', {screen: 'HostSteps'});
        } else {
          this.sendMail();
        }
      }
    }
  }
  openTermsModal = () => {
    this.setState({ showTermsModal: true, type: HOST })
  }
  closeTermsModal = () => {
    this.setState({ showTermsModal: false, type: '' })
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
  closeEmailModal = (value) => {
    this.setState({ showEmailModal: false });
    if(value === 'next') {
      this.openTermsModal()
    }
  }
  generateOtp = async () => {
    this.setState({ loading: true, errors: [] });
    const res = await Request(urls.identityBase, `${urls.v}user/otp/generate`);
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
      const res = await GetRequest(urls.identityBase, `${urls.v}user/email/verification/resend/${userData.username}`);
      this.setState({ loading: false });
      if (res.isError) {
          const message = res.message;
          const error = [message];
          this.setState({ errors: error});
      } else {
        this.openEmailModal();
      }
  }

  openMenu = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleXY
      )
    );
    this.setState({ menuActive: true })
  }
  closeMenu = () => {
    this.setState({ menuActive: false })
  }
  renderMenuItems = () => {
    const { menuStyles } = styles
    if(this.state.menuActive) {
      return (
        <View style={menuStyles}>
          <MenuItems {...this.props} onPress={this.closeMenu} 
            onPressPhoto={this.becomeAPhotographer}
            onPressExperience={this.hostAnExperience} 
            onPressRestaurant={this.hostARestaurant} 
          />
        </View>
      )
    }
  }

  render() {
    const { contentContainer, middleStyle, buttonContainer } = styles;
    const {  textH5Style, textH4Style, textBold, textGrey, textH6Style, textUnderline, textH1Style, textExtraBold, textDarkBlue, textCenter, textGreen } = GStyles;

    return (
      <>
      {this.renderMenuItems()}
        <SafeAreaView style={{flex: 1}}>
          <Header {...this.props} title="Dashboard" onPress={this.openMenu} />
          {this.renderLoading()}
          <View style={contentContainer}>  
            <ScrollView style={{flex: 1, backgroundColor: colors.white }}>
                {/* <View style={{flex: 2}}>
                    <MyText style={[textExtraBold, textH1Style, textDarkBlue]}>Dashboard</MyText>
                </View> */}
                
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

                    {/* <CustomButton buttonText='Become A Photographer' onPress={this.becomeAHost} 
                    buttonStyle={{backgroundColor: colors.black}} textStyle={[textH4Style,{color: colors.white}]}/> */}
                </View>
                <EmailVerificationModal visible={this.state.showEmailModal} onDecline={this.closeEmailModal} { ...this.props } next />
                <OtpModal visible={this.state.showOtpModal} onDecline={this.closeOtpModal} { ...this.props } 
                openEmail={this.openEmailModal} />
                
            </ScrollView>
          </View>
        <TermsModal visible={this.state.showTermsModal} onDecline={this.closeTermsModal} {...this.props} type={this.state.type} />
          
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
         paddingHorizontal: 24,
         paddingVertical: 20, paddingTop: 40,
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
    menuStyles: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000,
    },
});

export default HostScreen;
