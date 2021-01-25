import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, Image, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer, View, Icon } from "native-base";
import { Styles } from "./host.style";
import colors from "../../colors";
import { MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { GLOBAL_PADDING, GetRequest, Request, urls, SCREEN_HEIGHT } from "../../utils";
import { RenderStars } from "../../components/render_stars/renderStars";

import OtpModal from '../../components/dashboard/OtpModal';
import EmailVerificationModal from '../../components/dashboard/EmailVerificationModal';
import ChangeNumberModal from '../../components/dashboard/ChangeNumberModal';

import { AppContext } from '../../../AppProvider';
import { ManagePropertyContext } from '../../../ManagePropertyProvider';
import { formatAmount, shortenXterLength } from '../../helpers'
import StarComponent from '../../components/StarComponent';

export default class HostSteps extends Component {
    static contextType = AppContext;
    constructor() {
        super();
        this.state = { step: 1, isComplete: false, showOtpModal: false, showEmailModal: false, loading: false, errors: [], close: true, message: '',
        showPhoneModal: false }
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT}} />); }
    }

    renderError = () => {
        const { errors } = this.state;
        if (errors.length !== 0) {
            return (<Error errors={errors} />);
        }
    }
    renderSuccessMessage = () => {
        const { message } = this.state;
        const { textH4Style, textCenter, textSuccess } = GStyles
        if(message) {
            return (
                <View>
                    <MyText style={[textH4Style, textSuccess, textCenter]}>{message}</MyText>
                </View>
            )
        }
    }

    set = (v) => {
        this.setState(v);
    }

    publishProperty = async () => {
        const { propertyFormData } = this.context.state;
        this.setState({ loading: true, errors: [] })
        try {
            let res = await Request(urls.listingBase + urls.v, `listing/property/hostpublish?id=${propertyFormData.id}`);
            this.setState({ loading: false })
            console.log('publish  ', res)
            if (res.isError || res.IsError) {
                const message = res.message;
                const error = [message]
                console.log('Error ', error)
                this.setState({ errors: error})
            } else {
                this.setState({ message: 'Property submitted for review successfully!!'})
                setTimeout(() => {
                    this.setState({ message: ''})
                }, 5000);
                this.context.set({ propertyFormData: { ...propertyFormData, status: 'Pending' } })
                /** update context **/
                // let userData = this.context.state.userData;
                // this.context.set({userData: {...userData, ...res.data}});
            }
        } catch (error) {
            this.setState({ loading: false })
        }
        
    }
    
    publish = () => {
        const { userData } = this.context.state;
        // this.openOtpModal()
        // this.generateOtp()
        if (userData.isPhoneVerified) {
            if (userData.isEmailVerified) {
                this.publishProperty()
            } else {
                this.sendMail();
            }
        } else {
            // Got to OTP modal to verify phone

            // If the person has phone number
            if (userData.phoneNumber) {
                this.openPhoneModal();
            } else {
                if (userData.isEmailVerified) {
                    this.publishProperty()
                } else {
                    this.sendMail();
                }
            }
        }
    }
    openPhoneModal = () => {
        this.setState({ showPhoneModal: true });
    }
    closePhoneModal = () => {
        this.setState({ showPhoneModal: false });
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
        try {
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
        } catch (error) {
            this.setState({ loading: false })
        }
        
    }

    getStarted = () => {
        // this.props.navigation.navigate("UploadPropertyImage");
        const { set, state } = this.context
        set({ isInApp: true, edit: false })
        if (state.step === 1) {
            // this.props.navigation.navigate("HostProperty");
            this.props.navigation.navigate('Auth', {screen: "List"});
        }
        else if (state.step === 2) {
            this.props.navigation.navigate("UploadPropertyImage");
        }
        else if (state.step === 3) {
            this.props.navigation.navigate("BookingInformationRequirements");   
        }

        // if (this.state.step == 1) {
        //     // this.props.navigation.navigate("HostProperty");
        //     this.props.navigation.navigate('Auth', {screen: "List"});
        // }
        // else if (this.state.step == 2) {
        //     this.props.navigation.navigate("UploadPropertyImage");
        // }
        // else if (this.state.step == 3) {
        //     this.props.navigation.navigate("BookingInformationRequirements");   
        // }
    }
    editLocation = () => {
        const { set } = this.context
        set({ isInApp: true, edit: true })
        this.props.navigation.navigate('Auth', {screen: "List"});
    }
    editUpload = () => {
        const { set } = this.context
        set({ isInApp: true, edit: true })
        this.props.navigation.navigate("UploadPropertyImage");
    }
    editOther = () => {
        const { set } = this.context
        set({ isInApp: true, edit: true })
        this.props.navigation.navigate("BookingInformationRequirements");
    }
    renderVerified = () => {
        const { state } = this.context
        const verified = state.propertyFormData.status === 'verified' ? true : false
        const { iconContainer, iconStyle } = styles
        if(verified) {
            return (
            <View style={iconContainer}>
                <Icon type="FontAwesome5" name="check" style={iconStyle} />
            </View>
            )
        } 
    }

    renderPublish = () => {
        const { propertyFormData, step } = this.context.state;
        if(propertyFormData.status && propertyFormData.status.toLowerCase() === 'saved' && step > 3) {
            return (
                <View style={{ marginBottom: 40}}>
                    {this.renderError()}
                    <CustomButton buttonText="Publish For Review" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.publish} />
                </View>
            )
        }
    }
    

    renderProperty = () => {
        const { textWhite, textBold, flexRow, textH4Style, textCenter, imgStyle, textH6Style,
            textExtraBold, textH5Style, textGrey, textGreen, textDarkGrey, textOrange
          } = GStyles;
        const { propertyTypeContainer, bgOrange, bgLightOrange } = styles
        const { set, state } = this.context
        if(state.propertyFormData && state.propertyFormData.propertyType) {
            const imgUrl = state.propertyFormData.mainImage ? 
            {uri: state.propertyFormData.mainImage.assetPath} : require('../../assets/images/no_house1.png')

            const title = state.propertyFormData.title ? shortenXterLength(state.propertyFormData.title, 22) : 'No title';
            const price = state.propertyFormData.pricePerNight ? formatAmount(state.propertyFormData.pricePerNight) : '***'
            const bgColor = state.propertyFormData.propertyType.name !== 'Apartment' ? bgOrange : bgLightOrange
            const txtColor = state.propertyFormData.propertyType.name !== 'Apartment' ? textWhite : textOrange
            const pptyType = state.propertyFormData.propertyType.name 
            const rating = state.propertyFormData.rating
            return (
                <View style={[Styles.reviewView, { paddingTop: 1, paddingBottom: 10}]}>

                    <View style={{ width: '100%', marginBottom: 40}}>
                        <TouchableOpacity style={[flexRow, Styles.propertyContainer]} >
                            <View style={Styles.imgContainer}>
                                <Image source={imgUrl} resizeMode="cover" style={imgStyle} />
                                {this.renderVerified()}
                            </View>
                            <View style={Styles.rightContainer}>
                                <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>{title}</MyText>
                                <View style={{marginTop: 10}}>
                                    <StarComponent grey rating={rating} />
                                </View>
                                <MyText style={[textH5Style, textGrey, { marginVertical: 6}]}>{state.propertyFormData.state}</MyText>
                                <MyText style={[textH5Style, textGreen, textBold]}>NGN {price} / night</MyText>
                            </View>
                            <View style={[propertyTypeContainer, bgColor]}> 
                                <View style={[flexRow]}>
                                    <View style={{ position: 'absolute' }}>
                                        <Icon name="caret-forward-sharp" 
                                        style={{ padding: 0, color: colors.white, fontSize: 55, marginLeft: -19, marginTop: -11.8}} />
                                    </View>
                                    <View style={[{paddingTop: 8, paddingBottom: 11, paddingRight: 10, paddingLeft: 25}]}>
                                        <MyText style={[textH6Style, textBold, txtColor]}>{pptyType}</MyText>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.renderSuccessMessage()}
                    {this.renderPublish()}
                </View>
            )
        }
    }

    render() {
        const { step, edit } = this.context.state;

        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header 
                        {...this.props} 
                        title="Host A Home Or Hotel" 
                        goBackTo={(this.props.route.params && this.props.route.params.force) ? "Profile" : undefined} 
                    />
                    <Container style={[Styles.container, {padding: 0 }]}>
                        <Content>
                            {this.renderProperty()}
                            
                            <Card title={"Facilities And Location"} cardStyles={{ paddingTop: 0, marginTop: -15}}
                                description={"Basic property facilities and location details of property"}
                                completed={step > 1 ? true : false} edit={step > 1 ? true : false} step={1} 
                                getStarted={step === 1 ? true : false}
                                onEditPress={this.editLocation} 
                                onGetStartedPress={this.getStarted}
                            />
                            <Card title={"Upload Picture And Short Description Of Your Place"}
                                description={"Upload beautiful pictures of property, write/update property title and also get to describe the property "}
                                completed={step > 2 ? true : false} 
                                edit={step > 2 ? true : false}
                                getStarted={step === 2 ? true : false}
                                step={2} onEditPress={this.editUpload} 
                                onGetStartedPress={this.getStarted}
                            />
                            <Card title={"Welcome Your First Guest"}
                                description={"Write/Update property price, schedule the availability the property, give more details about property booking"}
                                step={3}
                                completed={step > 3 ? true : false} 
                                edit={step > 3 ? true : false}
                                getStarted={step === 3 ? true : false}
                                onEditPress={this.editOther} 
                                onGetStartedPress={this.getStarted}
                            />
                        </Content>
                        
                        <EmailVerificationModal visible={this.state.showEmailModal} onDecline={this.closeEmailModal} { ...this.props } close={this.state.close} />
                        <OtpModal visible={this.state.showOtpModal} onDecline={this.closeOtpModal} { ...this.props } close={this.state.close}
                        openEmail={this.openEmailModal} />
                        <ChangeNumberModal visible={this.state.showPhoneModal} onDecline={this.closePhoneModal} { ...this.props } />
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const Card = (props) => {
    const {
        textUnderline, textOrange, textH6Style, textGrey, textH5Style,
        textH4Style, textCenter, textPureGreen, 
        textGreen,
        textBold,
      } = GStyles;
    const renderEdit = () => {
        if(props.edit) {
            return (
                <TouchableOpacity onPress={props.onEditPress}>
                    <MyText style={[textH4Style, textUnderline, textOrange, {marginTop: 20}]}>Edit Changes</MyText>
                </TouchableOpacity>
            )
        }
    }
    const renderGetStarted = () => {
        if(props.getStarted) {
            return (
                <View style={{ marginTop: 20}}>
                    <CustomButton buttonText="Get Started" buttonStyle={Styles.buttonStyle} onPress={props.onGetStartedPress} />
                </View>
            )
        }
    }
    return (
        <View style={[Styles.cardView, props.cardStyles]}>
            <View style={[Styles.topView]}>
                <MyText style={[textH5Style, textGrey, {flex: 0.6}]}>Step {props.step}</MyText>
                {
                    props.completed &&
                    <View style={[Styles.completedView]}>
                        <Icon type="FontAwesome" name={"check-circle"} style={[Styles.completedIcon]} />
                        <MyText style={[textH5Style, textPureGreen, textBold]}>Completed</MyText>
                    </View>
                }
            </View>
            <View>
                <MyText style={[textBold, textH4Style, {marginTop: 5, marginBottom: 5}]}>
                    {props.title}
                </MyText>
                <MyText style={[textH4Style, textGrey]}>
                    {props.description}
                </MyText>
            </View>
            {renderEdit()}
            {renderGetStarted()}
            {/* <TouchableOpacity onPress={props.onEditPress}>
                <MyText style={[textH4Style, textUnderline, textOrange, {marginTop: 20, marginBottom: 30}]}>Edit Changes</MyText>
            </TouchableOpacity> */}
        </View>
    );
}
const styles = StyleSheet.create({
    propertyTypeContainer: {
        position: 'absolute', right: 0, top: '42%',
        // paddingHorizontal: 10, paddingVertical: 10
    },
    bgOrange: {
        backgroundColor: colors.orange
    },
    bgLightOrange: {
        backgroundColor: colors.lightOrange
    },
    iconContainer: {
        backgroundColor: colors.orange, width: 18, height: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
        position: 'absolute', right: 10, top: 10
    },
    iconStyle: {
        color: colors.white, fontSize: 10
    }
});