/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import Swiper from "react-native-swiper";
import colors from "../../colors";
import { Styles } from "./host.style";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Container, Content, Text, View } from "native-base";
import { Image, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { MyText, Loading } from "../../utils/Index";
import { AppContext } from "../../../AppProvider";

import { EXPERIENCE, HOST, urls, Request, GetRequest, errorMessage, SCREEN_HEIGHT } from '../../utils';
import TermsModal from '../../components/dashboard/TermsModal';

import OtpModal from '../../components/dashboard/OtpModal';
import EmailVerificationModal from '../../components/dashboard/EmailVerificationModal';
import ChangeNumberModal from '../../components/dashboard/ChangeNumberModal';


export default class HostSlider extends Component{
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = {
            imgArr: [
                require('../../assets/images/profile/objects/OBJECTS_2x.png'), 
                require('../../assets/images/profile/restaurant/restaurant_2x.png'), 
                require('../../assets/images/profile/Group4613/Group4613_2x.png'),
            ],
            titleText: [
                "Host your Home Or Hotel Easily",
                "Host Your Resturant",
                "Host An Experience",
            ],
            descriptionText: [
                "As a host, you can host your hotels and apartments on Aura, give detailed information about them, add beautiful pictures of the properties. People get to see your properties and they are able to book them.",
                "Sign up and host your restaurants on Aura, show the delicacies that you offer and People will order from you from this App.",
                "Be a tour guide to people on various locations of the country. Upload images and describe how the tour experience will be. Aura makes it easy for people to see your tours and book for them.",
            ],
            readMoreText: [
                "As a host, you can host your hotels and apartments on Aura, give detailed information about them, add beautiful pictures of the properties. People get to see your properties and they are able to book them.",
                "Sign up and host your restaurants on Aura, show the delicacies that you offer and People will order from you from this App.",
                "Be a tour guide to people on various locations of the country. Upload images and describe how the tour experience will be. Aura makes it easy for people to see your tours and book for them."
            ],
            currentIndex: 0,
            showTermsModal: false, type: '',
            showOtpModal: false, showEmailModal: false, showPhoneModal: false, close: true, loading:false
        };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 100 }} />); }
    }

    indexChange = (index) => {
        this.setState({ currentIndex: index});
    }
    closeTermsModal = () => {
        this.setState({ showTermsModal: false })
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
            this.setState({ showTermsModal: true, type: EXPERIENCE })
        }
    }
    openEmailModal = () => {
        this.setState({ showEmailModal: true });
    }
    closeEmailModal = (value) => {
        this.setState({ showEmailModal: false });
        if(value === 'success') {
            this.setState({ showTermsModal: true, type: EXPERIENCE })
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
    checkVerification = (type) => {
        const { userData } = this.context.state;
        if (userData.isPhoneVerified) {
            if (userData.isEmailVerified) {
                this.setState({ showTermsModal: true, type })
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
                    this.setState({ showTermsModal: true, type })
                } else {
                    this.sendMail();
                }
            }
        }
    }

    handleNavigation = () => {
        switch (this.state.currentIndex) {
            case 0:
                // this.props.navigation.navigate("HostSteps")
                // this.setState({ showTermsModal: true, type: HOST })
                this.checkVerification(HOST)
                break;
            case 1:
                this.props.navigation.navigate('RestaurantStack', {screen: 'AddRestaurant'})
                break;
            case 2:
                this.checkVerification(EXPERIENCE)
                // this.setState({ showTermsModal: true, type: EXPERIENCE })
                // this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: EXPERIENCE } })
                // btnText = "Host Experience";
                break;
        }
    }

    renderImages = () => {
        let { imgArr } = this.state;
        const { sliderImgContainer, overlayStyles } = Styles
        const { 
            textExtraBold, textH4Style, textCenter, textGrey, textH6Style, textH5Style,
            textGreen, textUnderline, textWhite,textBold
            } = GStyles
        let btnText = "";
        switch (this.state.currentIndex) {
            case 0:
                btnText = "Become A Host";
                break;
            case 1:
                btnText = "Host A Resturant";
                break;
            case 2:
                btnText = "Host An Experience";
                break;
        }
        return imgArr.map((item, index) => {
            return (
                <View key={index} style={{ paddingHorizontal: 20 }}>
                    <View style={sliderImgContainer} key={index}>
                        <Image source={item} style={[Styles.sliderImg]} resizeMode="contain" />
                    </View>
                    <View style={[Styles.dotView]}>
                        <View style={[Styles.dot, (this.state.currentIndex == 0 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        <View style={[Styles.dot, (this.state.currentIndex == 1 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        <View style={[Styles.dot, (this.state.currentIndex == 2 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        {/* <View style={[Styles.dot, (this.state.currentIndex == 3 ? Styles.activeDot: Styles.inActiveDot)]}></View> */}
                    </View>
                    <View style={[Styles.textBodyView]}>
                        <MyText style={[textH4Style, textExtraBold, textCenter]}>
                            {this.state.titleText[this.state.currentIndex]}
                        </MyText>
                        <MyText style={[textH5Style, textCenter, textGrey, { marginTop: 20} ]}>
                            {this.state.descriptionText[this.state.currentIndex]}
                        </MyText>
                        {/* <MyText style={[textH6Style, textCenter, textGreen, textUnderline, {marginTop: 10}]}>
                            {this.state.readMoreText[this.state.currentIndex]}
                        </MyText> */}
                        {
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 30, backgroundColor: colors.black }]}
                                onPress={() => this.handleNavigation()}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>
                                    {
                                        btnText
                                    }
                                </MyText>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity>

                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

    render() {
        return (
            <>
            <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                {this.renderLoading()}
                <Header {...this.props} title="" />
                <Container style={[Styles.sliderContainer]}>
                    <Content scrollEnabled>
                        <Swiper 
                            style={{height: '100%' }} 
                            showsButtons={false} 
                            index={0} 
                            activeDotColor={colors.green} 
                            showsPagination={false} 
                            onIndexChanged={this.indexChange} 
                            loop={false}    
                        >
                            {this.renderImages()}
                        </Swiper>
                    </Content>
                </Container>
                <TermsModal visible={this.state.showTermsModal} onDecline={this.closeTermsModal} {...this.props} type={this.state.type} />
                <View>
                    <EmailVerificationModal visible={this.state.showEmailModal} onDecline={this.closeEmailModal} { ...this.props } close={this.state.close} />
                    <OtpModal visible={this.state.showOtpModal} onDecline={this.closeOtpModal} { ...this.props } close={this.state.close}
                    openEmail={this.openEmailModal} />
                    <ChangeNumberModal visible={this.state.showPhoneModal} onDecline={this.closePhoneModal} { ...this.props } />
                </View>
            </SafeAreaView>
            </>
            
        );
    }
}