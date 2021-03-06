import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, LayoutAnimation, UIManager, Platform, Dimensions } from 'react-native';
import { Card, MyText, Loading } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import DashboardCardComponent from './DashboardCardComponent';
import Header from './DashboardHeader';
import colors from '../../colors';
import { Icon, Fab, Button } from 'native-base';
import SelectImageModal from '../SelectImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import { AppContext } from '../../../AppProvider'

import OtpModal from './OtpModal';
import EmailVerificationModal from './EmailVerificationModal';
import ChangeNumberModal from './ChangeNumberModal';


import MenuItems from './MenuItems';
import { GetRequest, Request, urls, errorMessage, successMessage } from '../../utils';

const { width, height } = Dimensions.get('window');

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class DashboardPhotographer extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = { menuActive: false, loading: false, profile: '', selectModal: false, 
    showOtpModal: false, showEmailModal: false, showPhoneModal: false, close: true, };
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
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({ menuActive: false })
  }

  openSelectModal = () => {
    this.setState({ selectModal: true })
  }
  closeSelectModal = () => {
    this.setState({ selectModal: false })
  }
  cameraSelected = () => {
      const { images } = this.state
      ImagePicker.openCamera({
          // width: 300,
          // height: 400,
          freeStyleCropEnabled: true,
          compressImageQuality: 0.8,
          cropping: true
      }).then((image) => {
          const arr = [...images, image]
          this.setState({ images: arr })
          console.log(arr)
      }).catch(error => {
          console.log("Error from camera ", error);
      }).finally(() => {
          this.closeSelectModal()
      })
  }
  gallerySelected = () => {
      const { images } = this.state
      ImagePicker.openPicker({
          freeStyleCropEnabled: true,
          compressImageQuality: 0.8,
          cropping: true,
          multiple: true
      }).then((imgs) => {
          const arr = [...images, ...imgs]
          this.setState({ images: arr })
          console.log(arr)
      }).catch(error => {
          console.log("Error from camera ", error);
      }).finally(() => {
          this.closeSelectModal()
      })
  }
  
  onPressPhotographer = () => {
    this.props.navigation.navigate('Other', { screen: 'TermsOfService' })
  }

  renderLoading = () => {
      const { loading } = this.state;
      if(loading) { return (<Loading />) }
  }

  renderMenuItems = () => {
    const { menuStyles } = styles
    if(this.state.menuActive) {
      return (
        <View style={menuStyles}>
          <MenuItems {...this.props} onPress={this.closeMenu} />
        </View>
      )
    }
  }

  openPhoneModal = () => {
    this.setState({ loadModals: true, showPhoneModal: true });
  }
  closePhoneModal = () => {
    this.setState({ showPhoneModal: false });
  }
  openOtpModal = () => {
      this.setState({ showOtpModal: true });
  }
  closeOtpModal = (value) => {
    this.setState({ showOtpModal: false });
    if(value === 'success') {
      this.publishProfile()
    }
  }
  openEmailModal = () => {
      this.setState({ showEmailModal: true });
  }
  closeEmailModal = (value) => {
      this.setState({ showEmailModal: false });
      if(value === 'success') {
        this.publishProfile()
      }
  }
  generateOtp = async () => {
      this.setState({ loading: true, errors: [] });
      try {
        const res = await Request(urls.identityBase, `${urls.v}user/otp/generate`);
        this.setState({ loading: false });
        if (res.IsError) {
            const message = res.Message;
            errorMessage(message)
        } else {
            this.openOtpModal()
        }
      } catch (error) {
        this.setState({ loading: false })
      }
      
  }
  sendMail = async () => {
      const { userData } = this.context.state;
      try {
        this.setState({ loading: true, errors: [] });
        const res = await GetRequest(urls.identityBase, `${urls.v}user/email/verification/resend/${userData.username}`);
        this.setState({ loading: false });
        if (res.isError) {
            const message = res.message;
            errorMessage(message)
        } else {
            this.openEmailModal();
        }
      } catch (error) {
        this.setState({ loading: false })
      }
  }
  checkVerification = () => {
    const { userData } = this.context.state;
    if (!userData.isPhoneVerified) {
        if (userData.isEmailVerified) {
            this.publishProfile()
        } else {
            this.sendMail();
        }
    } else {
        // Got to OTP modal to verify phone

        // If the person has phone number
        if (userData.phoneNumber) {
            this.generateOtp();
        } else {
            if (userData.isEmailVerified) {
              this.publishProfile()
            } else {
                this.sendMail();
            }
        }
    }
  }

  publishProfile = async () => {
    const { profile } = this.state
    try {
      this.setState({ loading: true })
      const res = await Request(urls.photographyBase, `${urls.v}photographer/hostpublish?profileId=${profile.id}`)
      // console.log('Res ',res)
      this.setState({ loading: false })
      if(res.isError || res.IsError) {
        errorMessage(res.message)
      } else {
        this.getProfile()
        successMessage('Profile pushed successfully !')
        // this.setState({ profile: res.data })
      }
    } catch (error) {
      this.setState({ loading: false })
    }
    
  }

  getProfile = async () => {
    this.setState({ loading: true })
    try {
      const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/profile`)
      console.log('res ', res)
      this.setState({ loading: false })
      if(res.isError || res.IsError) {
        errorMessage(res.message)
      } else {
        this.setState({ profile: res.data })
      }
    } catch (error) {
      this.setState({ loading: false })
    }
    
  }
  profilePage = () => {
    const { profile } = this.state
    // this.props.navigation.navigate('MyPage', { profile })
    this.props.navigation.push('Other', { screen: 'PhotoSingle', params: { photo: profile } })
  }
  onPressPortolios = () => {
    const {profile } = this.state
    this.props.navigation.navigate('Portfolio', { profile })
  }
  profileEdit = () => {
    const { set } = this.context
    set({ editPhotograph: true, photographOnboard: this.state.profile })
    this.props.navigation.navigate('PhotographStack', { screen: 'TitleDescription'})
  }
  changeProfilePic = () => {
    const { profile } = this.state
    this.props.navigation.navigate('PhotographChangeProfile', { profile })
  }

  componentDidMount = () => {
    this.getProfile()
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      if(this.context.state.editPhotograph) {
        this.getProfile()
        this.context.set({ editPhotograph: false })
      }
      // console.log('Focused ',this.props)
      // The screen is focused
      // Call any action
    });
  }
  renderStatus = () => {
    const { profile, loading } = this.state
    const { textBold, textSuccess, textOrange } = GStyles

    if(profile && !loading) {
      if(profile.isVerified) {
        return (
          <MyText style={[textSuccess]}>Verified</MyText>
        )
      }
      return (
        <MyText style={[textOrange]}>Pending</MyText>
      )
    }
  }

  renderPublishButton = () => {
    const { bankButtonStyle } = styles;
    const {textOrange, textH4Style } = GStyles
    const { profile } = this.state
    if(profile && (profile.status === null || profile.status === "0")) {
      return (
        <TouchableOpacity style={bankButtonStyle} onPress={this.checkVerification}>
          <MyText style={[textOrange, textH4Style]}>Publish Profile</MyText>
        </TouchableOpacity>
      )
    }
  }
  

  render() {
    const { textDarkGrey, textH4Style, textH1Style, textBold, textExtraBold, textH2Style, textSuccess, textGrey, textUnderline,
      textLgStyle, textHStyle, imgStyle, textOrange, flexRow, textH3Style } = GStyles;
    const { container, imageContainer, sectionStyle, contentStyle, bankButtonStyle, profileText, imgContainer, iconContainer,
      profileImg, profileContainer } = styles;
    const reviews = `Setup Page`;
    const earning = `View all the photos in your portfolio`
    const { profile } = this.state
    const { userData } = this.context.state
    const fullName = profile ? `${profile.firstName} ${profile.lastName}` : ''
    const imgUrl = userData && userData.profilePicture ? { uri: userData.profilePicture } : require('../../assets/images/profile.png')

    return (
      <>
      {this.renderLoading()}
      {this.renderMenuItems()}
      <View style={container}>
        <View style={{ zIndex: 1}}>
          <Header {...this.props} title="Photographer Dashboard" onPress={this.openMenu} />
        </View>
        <ScrollView>
            <View style={contentStyle}>

                <View>
                  
                  <View style={[flexRow, profileContainer]}>
                    <View style={profileImg}>
                      <TouchableOpacity style={imgContainer} onPress={this.changeProfilePic}>
                        <Image source={imgUrl} resizeMode="cover" style={[imgStyle, {borderRadius: 70}]} /> 
                        <View style={iconContainer}>
                          <Icon name="edit" type="MaterialIcons" style={{ fontSize: width <= 360 || height <= 667 ? 14 : 16, color: colors.grey }} />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={profileText}>
                      <View style={{ flex: 1 }}>
                        <MyText style={[textH2Style, textBold]}>Hi {fullName},</MyText>
                      </View>
                      <MyText style={[textGrey, textH4Style]}>You are now a Photographer on Aura</MyText>

                    </View>
                  </View>

                  <View style={{ marginTop: 15}}>
                    <MyText style={[textOrange, textH4Style, textBold]}>Verification Status: {this.renderStatus()}</MyText>
                    <TouchableOpacity style={{ marginTop: 8}} onPress={this.profilePage}>
                      <MyText style={[textBold, textSuccess, textH4Style, textUnderline]}>View My Page</MyText>
                    </TouchableOpacity>
                  </View>

                  <View style={[flexRow, { justifyContent: 'space-between'}]}>
                    <TouchableOpacity style={bankButtonStyle} onPress={this.profileEdit}>
                      <MyText style={[textOrange, textH4Style]}>Edit Profile</MyText>
                    </TouchableOpacity>
                    {this.renderPublishButton()}
                  </View>
                </View>
                

                <View style={sectionStyle}>
                    <DashboardCardComponent title="Photograph Page Setup" description={reviews} iconName="menu" type="Ionicons"
                     onPress={this.profileEdit} />
                </View>
                <View style={sectionStyle}>
                    <DashboardCardComponent title="Portofolio" description={earning} iconX onPress={this.onPressPortolios} iconName="photo" />
                </View>
                
                
                
            </View>
        </ScrollView>
        <SelectImageModal visible={this.state.selectModal} onDecline={this.closeSelectModal} onPressCamera={this.cameraSelected} onPressGallery={this.gallerySelected} />
        
        <EmailVerificationModal visible={this.state.showEmailModal} onDecline={this.closeEmailModal} { ...this.props } close={this.state.close} />
        <OtpModal visible={this.state.showOtpModal} onDecline={this.closeOtpModal} { ...this.props } close={this.state.close}
        openEmail={this.openEmailModal} />
        <ChangeNumberModal visible={this.state.showPhoneModal} onDecline={this.closePhoneModal} { ...this.props } />
      </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    
    sectionStyle: {
      marginBottom: 25
    },
    contentStyle: {
      zIndex: 1, paddingVertical: 20, paddingHorizontal: 20, 
      paddingBottom: 150,
      // borderWidth: 1 
      // marginTop:140
    },
    menuStyles: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000,
    },
    imageContainer: {
      borderColor: colors.orange, borderWidth: 2, width: 80, height: 80, borderRadius: 80, overflow: 'hidden'
    },
    bankButtonStyle: {
      borderWidth: 1, borderColor: colors.orange, paddingVertical: 10, paddingHorizontal: 10, borderRadius: 6,
      marginVertical: 25, 
      width: '45%', alignItems: 'center'
    },
    profileText: {
      flex: 2.8, flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 5,
    },
    imgContainer: {
      width: width <= 360 || height <= 667 ? 65 : 70, height: width <= 360 || height <= 667 ? 65 : 70,  borderColor: colors.orange, borderWidth: 2,borderRadius: 70,
    },
    profileImg: {
      flex: 1,
    },
    iconContainer: {
      width: width <= 360 || height <= 667 ? 20 : 30, height: width <= 360 || height <= 667 ? 20 : 30, borderRadius: 30, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center',
      position: 'absolute', bottom: 5, right: width <= 360 || height <= 667 ? -5 : -15, zIndex: 2, elevation: 3
    }
});

export default DashboardPhotographer;
