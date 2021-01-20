import React, { Component } from "react";
import { TouchableOpacity, SafeAreaView } from 'react-native'
import { Container, Content, View, Separator, Text, Icon, Footer } from "native-base";
import { Styles } from "./profile.style";
import ProfileComponent from "./../../components/profile_item/profileItem.component";
import { Image, Linking } from "react-native";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { AppContext } from "../../../AppProvider";
import { clearData } from '../../helpers';
import colors from "../../colors";
import { GLOBAL_PADDING, setContext, debug, consoleLog, WHATSAPP_NUMBER, errorMessage, HOST, PHOTOGRAPH, RESTAURANT, EXPERIENCE } from "../../utils";
import LoginModal from "../../components/auth/LoginModal";
import SignUpModal from "../../components/auth/SignUpModal";
import { getNotificationSettingsApi } from "../../api/notifications.api";
import { useNavigation } from "@react-navigation/native";

import TermsModal from '../../components/dashboard/TermsModal';


class ProfileScreenClass extends Component {
    static contextType = AppContext;
    constructor() {
        super();
        this.state = {
            showLoginModal: false,
            showRegisterModal: false, showTermsModal: false, type: ''
        };
    }

    componentDidMount() {
        setContext(this.context);
        this._focus = this.props.navigation.addListener('focus', () => {
            // focused
            this.init();
          });
        
    }

    componentWillUnmount() {
        this._focus = this.props.navigation.addListener('focus', () => {
            // do nothing
          });
    }


    init = () => {
        if (Object.keys(this.context.state.notificationSettings.messages).length == 0 && this.context.state.isLoggedIn) {
            // get notification settings, default length of notificationsettings.messages = 0
            //if (debug) console.log("focused")
            getNotificationSettingsApi(this.context);
        }
        
    }

    openLoginModal = () => {
        this.setState({ showLoginModal: true })
    }

    closeLoginModal = () => {
        this.setState({ showLoginModal: false })
    }

    openSignUpModal = () => {
        this.setState({ showRegisterModal: true })
    }

    closeSignUpModal = () => {
        this.setState({ showRegisterModal: false })
    }
    closeTermsModal = () => {
        this.setState({ showTermsModal: false })
    }

    onSignOut = async () => {
        await clearData()
        this.context.set({ userData: null, isLoggedIn: false, currentDashboard: 1})
        this.props.navigation.navigate('Tabs', {screen: 'Dashboard', params: { screen: 'DashboardView'} })
    }
    linkToWhatsapp = () => {
        let url = `whatsapp://send?phone=${WHATSAPP_NUMBER}`
        Linking.openURL(url)
        .then(data => {
            console.log("WhatsApp Opened successfully " + data);
        })
        .catch(() => {
            errorMessage('Make sure WhatsApp installed on your device')
        });
    }
    becomeHost = () => {
        this.context.set({ propertyFormData: null, edit: false, step: 1 })
        // this.setState({ showTermsModal: true, type: HOST })
        this.props.navigation.navigate("HostPropertyStack", {screen: "HostSlider"})
    }

    hostExperience = () => {
        this.setState({ showTermsModal: true, type: EXPERIENCE })
        // this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: EXPERIENCE } })
    }

    hostRestaurant = () => {
        this.props.navigation.navigate('RestaurantStack', {screen: 'AddRestaurant'})
    }

    // hostExperience = () => {
    //     this.props.navigation.navigate("HostPropertyStack", {screen: "HostSlider", params: {
    //         currentIndex: 2,
    //     }})
    // }

    // becomePhotographer = () => {
    //     this.props.navigation.navigate("HostPropertyStack", {screen: "HostSlider", params: {
    //         currentIndex: 3,
    //     }})
    // }

    render() {
        const {textH2Style, 
            textCenter, textBold, textH3Style, 
            textH6Style, textOrange, textH1Style,
            textWhite, textH4Style, textExtraBold, textFont13, textGrey
        } = GStyles;
        const {userData} = this.context.state;
        // consoleLog("user", this.context.state.userData,this.context.state.isLoggedIn, this.context.state.token)
        const userIsLoggedIn = this.context.state.isLoggedIn && this.context.state.userData;
        const userIsNotLoggedIn = !this.context.state.isLoggedIn || !this.context.state.userData;
        const rolePhotograph = userData && userData.roles.find(item => item === PHOTOGRAPH)
        const roleHost = userData && userData.roles.find(item => item === HOST)
        const roleRestaurant = userData && userData.roles.find(item => item === RESTAURANT)
        const roleExperience = userData && userData.roles.find(item => item === EXPERIENCE)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <Container>
                    <Content style={{flexGrow: 1}} scrollEnabled>
                    {
                        userIsNotLoggedIn &&
                        <View style={[{paddingBottom: 30, paddingTop: 15, borderBottomColor: colors.lightGrey, borderBottomWidth: 1, paddingLeft: GLOBAL_PADDING, paddingRight: GLOBAL_PADDING}]}>
                            <MyText style={[textH1Style, textBold]}>Profile</MyText>
                        </View>
                    }
                    {
                        userIsLoggedIn &&
                    
                        <>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('AddProfilePicture')}
                                style={[Styles.imageView, {paddingTop: 50,}]}
                            >
                                {/* image section */}
                                <Image source={this.context.state.userData && this.context.state.userData.profilePicture ? {uri: this.context.state.userData.profilePicture} :require("./../../assets/images/profile.png")} style={[Styles.userImageStyle]} />
                                <MyText style={[textH2Style, textCenter, textExtraBold, { marginTop: 10}]}>{`${this.context.state.userData.firstName} ${this.context.state.userData.lastName}`}</MyText>
                                <MyText style={[textH6Style, textCenter, textOrange, { marginBottom: 10, marginTop: 6}]}>Tap to Change</MyText>
                            </TouchableOpacity>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText, textBold, textH4Style]}>Account Settings</MyText>
                            </Separator>
                            <View style={{ paddingHorizontal: 20 }}>
                                {/* Account settings */}
                                <ProfileComponent 
                                    title={"Personal Information"} 
                                    description={"Biodata and information about you"} 
                                    iconImage={require("./../../assets/images/profile/user_solid/user-solid-square.png")}
                                    onPress={() => this.props.navigation.navigate("EditProfile")}
                                    // onPress={() => this.props.navigation.navigate("VerifyPhoneNumber")}
                                />
                                <ProfileComponent 
                                    title={"Payments and Referrals"} 
                                    description={"Credit Cards, debit cards, referrals and more"} 
                                    iconImage={require("./../../assets/images/profile/credit_card/credit-card.png")}
                                    onPress={() => this.props.navigation.navigate("PaymentReferral")}
                                />
                                <ProfileComponent 
                                    title={"Device Sharing"} 
                                    description={"Credit Cards, Coupons and more"} 
                                    iconImage={require("./../../assets/images/profile/mobile_devices/mobile-devices.png")}
                                    onPress={() => this.props.navigation.navigate("DeviceSharing")}
                                />
                                <ProfileComponent 
                                    title={"Notifications"} 
                                    description={"How we contact you"} 
                                    iconImage={require("./../../assets/images/profile/notification/notificatio.png")}
                                    onPress={() => this.props.navigation.navigate("NotificationSettings")}
                                />
                                <ProfileComponent wrapperStyles={{ borderBottomWidth: 0, marginBottom: 30}}
                                    title={"Account Verifications"} 
                                    description={"How we confirm your identity"} 
                                    iconImage={require("./../../assets/images/profile/document/document.png")}
                                    onPress={() => this.props.navigation.navigate("AccountVerification")}
                                />
                            </View>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText, textBold, textH4Style]}>Hosting</MyText>
                            </Separator>
                        </>
                    }
                    <View>
                        {/* Hosting */}
                        {/* <ProfileComponent 
                            title={"Learn about Hosting"} 
                            description={"Credit Cards, Coupons and more"} 
                            iconImage={require("./../../assets/images/profile/education/education.png")}
                        /> */}
                        <View style={{ paddingHorizontal: 20 }}>
                            {/* Hosting */}
                            {/* <ProfileComponent 
                                title={"Learn about Hosting"} 
                                description={"Credit Cards, Coupons and more"} 
                                iconImage={require("./../../assets/images/profile/education/education.png")}
                            /> */}
                            
                            {
                                userIsLoggedIn &&
                                    <>
                                    <ProfileComponent title={"Learn about Hosting"} 
                                        description={"Features on Aura"} 
                                        iconImage={require("./../../assets/images/profile/location_hotel/location-hotel.png")}
                                        onPress={this.becomeHost}
                                    />
                                    <ProfileComponent title={"Host an Experience"} 
                                        description={"Features on Aura"} 
                                        iconImage={require("./../../assets/images/profile/location_marina/location-marina.png")}
                                        onPress={this.hostExperience}
                                    />
                                    {
                                        userIsLoggedIn && !roleRestaurant &&
                                    
                                        <ProfileComponent 
                                            title={"Host your Restaurant"} 
                                            description={"Click to host your restaurant"} 
                                            iconImage={require("./../../assets/images/profile/location_food/location-food.png")}
                                            onPress={this.hostRestaurant}
                                        />
                                    }
                                    {
                                        userIsLoggedIn && !rolePhotograph
                                        && <ProfileComponent wrapperStyles={{ borderBottomWidth: 0, marginBottom: 30}}
                                        title={"Become a Photographer"} 
                                        description={"click to become a photographer on Aura"} 
                                        iconImage={require("./../../assets/images/profile/camera/camera.png")}
                                    />
                                    }
                                    
                                    </> 
                            }
                        </View>
                        {
                                userIsLoggedIn &&
                                <Separator style={[Styles.separator]}>
                                    <MyText style={[Styles.separatorText, textBold, textH4Style]}>Support</MyText>
                                </Separator>
                        }
                        
                        <View style={{ paddingHorizontal: 20 }}>
                            <ProfileComponent 
                                title={"Get Help"} 
                                description={"Get 24/7 support, tools and information you need"} 
                                iconImage={require("./../../assets/images/profile/question/question.png")}
                                onPress={this.linkToWhatsapp}
                            />
                            {/* {
                                userIsLoggedIn &&
                                <ProfileComponent wrapperStyles={{ borderBottomWidth: 0, marginBottom: 30}}
                                    title={"Give us Feedback"} 
                                    description={"Drop suggestions on how we can serve you better"} 
                                    iconImage={require("./../../assets/images/profile/thumbs_up/thumbs-up.png")}
                                    onPress={() => this.props.navigation.navigate('Complaint')}
                                />
                            } */}
                        </View>
                        {
                                userIsLoggedIn &&
                                <>
                                <Separator style={[Styles.separator]}>
                                    <MyText style={[Styles.separatorText]}>Legal</MyText>
                                </Separator>
                                <View style={{ paddingHorizontal: 20 }}>
                                    {/* Hosting */}
                                    <ProfileComponent 
                                        title={"Privacy and Security"} 
                                        description={"Connected apps and Password change settings"} 
                                        iconImage={require("./../../assets/images/profile/lock_closed/lock-closed.png")}
                                        onPress={() => this.props.navigation.navigate('ChangePassword')}
                                    />
                                    <ProfileComponent wrapperStyles={{ borderBottomWidth: 0, marginBottom: 30}}
                                        title={"Terms of Service"} 
                                        description={"Terms of using App"} 
                                        iconImage={require("./../../assets/images/profile/new_paper/news-paper.png")}
                                        onPress={() => this.props.navigation.navigate('Other', { screen: 'TermsOfService' }) }
                                    />
                                </View>
                                <Separator style={[Styles.separator]}></Separator>
                                <View style={[Styles.parentView]}>
                                    <Image style={[Styles.image]} source={require("./../../assets/images/profile/stand_by/stand-by.png")} resizeMode="center" />
                                    <View style={[Styles.contentView]}>
                                        <TouchableOpacity onPress={this.onSignOut}>
                                            <MyText style={[textH3Style, textOrange]}>Log Out</MyText>
                                        </TouchableOpacity>
                                        
                                        <MyText style={[textFont13, textGrey, { marginTop: 8}]}>Tap to sign out of account</MyText>
                                    </View>
                                    
                                </View>
                            </>
                        }
                    </View>
                    </Content>
                    {
                            userIsNotLoggedIn &&
                            <Footer style={[Styles.transparentFooter, Styles.footer]}>
                                <View style={{flex: 1, padding: GLOBAL_PADDING}}>
                                    <TouchableOpacity
                                        style={[Styles.loginSignupBtn, {marginTop: 10,backgroundColor: colors.orange}]}
                                        onPress={() => this.setState({showRegisterModal: true})}
                                    >
                                        <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Sign Up</MyText>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[Styles.loginSignupBtn, {marginTop: 10, backgroundColor: colors.black}]}
                                        onPress={() => this.setState({showLoginModal: true})}
                                    >
                                        <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Login</MyText>
                                    </TouchableOpacity>
                                </View>
                            </Footer>
                    }
                    <LoginModal 
                        visible={this.state.showLoginModal} 
                        onDecline={this.closeLoginModal} 
                        openSignUp={this.openSignUpModal} close
                        // onSuccess={() => this.setState({showLoginModal: false})}
                        {...this.props}
                    />
                    <SignUpModal 
                        visible={this.state.showRegisterModal} 
                        onDecline={this.closeSignUpModal} 
                        {...this.props} 
                        openLogin={this.openLoginModal} 
                    />
                    <TermsModal visible={this.state.showTermsModal} onDecline={this.closeTermsModal} {...this.props} type={this.state.type} />
                </Container>
            </SafeAreaView>
        );
    }
}

const ProfileScreen = (props) => {
    return (<ProfileScreenClass navigation={useNavigation()} {...props} />)
}

export default ProfileScreen;