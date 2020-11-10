import React, { Component } from "react";
import { TouchableOpacity } from 'react-native'
import { Container, Content, View, Separator, Text, Icon, Footer } from "native-base";
import { Styles } from "./profile.style";
import ProfileComponent from "./../../components/profile_item/profileItem.component";
import { Image } from "react-native";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { AppContext } from "../../../AppProvider";
import { clearData } from '../../helpers';
import colors from "../../colors";
import { GLOBAL_PADDING, setContext, debug, consoleLog } from "../../utils";
import LoginModal from "../../components/auth/LoginModal";
import SignUpModal from "../../components/auth/SignUpModal";
import { getNotificationSettingsApi } from "../../api/notifications.api";
import { useNavigation } from "@react-navigation/native";

class ProfileScreenClass extends Component {
    static contextType = AppContext;
    constructor() {
        super();
        this.state = {
            showLoginModal: false,
            showRegisterModal: false,
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

    onSignOut = async () => {
        
        await clearData()
        this.context.set({ userData: null, isLoggedIn: false})
        this.props.navigation.navigate('Tabs', {screen: 'Dashboard'})
    }

    render() {
        const {textH2Style, 
            textCenter, textBold, textH3Style, 
            textH6Style, textOrange, textH1Style,
            textWhite, textH4Style
        } = GStyles;
        consoleLog("user", this.context.state.userData)
        return (
            <Container>
                <Content style={{flexGrow: 1}} scrollEnabled>
                    {
                        !this.context.state.isLoggedIn &&
                        <View style={[{paddingBottom: 30, paddingTop: 15, borderBottomColor: colors.lightGrey, borderBottomWidth: 1, paddingLeft: GLOBAL_PADDING, paddingRight: GLOBAL_PADDING}]}>
                            <MyText style={[textH1Style, textBold]}>Profile</MyText>
                        </View>
                    }
                    {
                        this.context.state.isLoggedIn &&
                    
                        <>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('AddProfilePicture')}
                                style={[Styles.imageView, {paddingTop: 30,}]}
                            >
                                {/* image section */}
                                <Image source={this.context.state.userData.profilePicture ? {uri: this.context.state.userData.profilePicture} :require("./../../assets/images/photo/photo1.png")} style={[Styles.userImageStyle]} />
                                <MyText style={[textH2Style, textCenter, textBold]}>{`${this.context.state.userData.firstName} ${this.context.state.userData.lastName}`}</MyText>
                                <MyText style={[textH6Style, textCenter, textOrange]}>Tap to Change</MyText>
                            </TouchableOpacity>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText]}>Account settings</MyText>
                            </Separator>
                            <View>
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
                                <ProfileComponent 
                                    title={"Account Verifications"} 
                                    description={"How we confirm your identity"} 
                                    iconImage={require("./../../assets/images/profile/document/document.png")}
                                    onPress={() => this.props.navigation.navigate("AccountVerification")}
                                />
                            </View>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText]}>Hosting</MyText>
                            </Separator>
                        </>
                    }
                    <View>
                        {/* Hosting */}
                        <ProfileComponent 
                            title={"Learn about Hosting"} 
                            description={"Credit Cards, Coupons and more"} 
                            iconImage={require("./../../assets/images/profile/education/education.png")}
                        />
                        {
                            this.context.state.isLoggedIn &&
                                <>
                                <ProfileComponent 
                                    title={"Host your Home/Hotel"} 
                                    description={"Credit Cards, Coupons and more"} 
                                    iconImage={require("./../../assets/images/profile/location_hotel/location-hotel.png")}
                                    onPress={() => this.props.navigation.navigate("HostPropertyStack")}
                                />
                                <ProfileComponent 
                                    title={"Host your Resturant"} 
                                    description={"Credit Cards, Coupons and more"} 
                                    iconImage={require("./../../assets/images/profile/location_food/location-food.png")}
                                />
                                <ProfileComponent 
                                    title={"Become a Photographer"} 
                                    description={"Credit Cards, Coupons and more"} 
                                    iconImage={require("./../../assets/images/profile/camera/camera.png")}
                                />
                                </> 
                        }
                    </View>
                    {
                            this.context.state.isLoggedIn &&
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText]}>Support</MyText>
                            </Separator>
                    }
                    
                    <View>
                        {/* Hosting */}
                        <ProfileComponent 
                            title={"Get Help"} 
                            description={"Get 24/7 support, tools and information you need"} 
                            iconImage={require("./../../assets/images/profile/question/question.png")}
                        />
                        {
                            this.context.state.isLoggedIn &&
                            <ProfileComponent 
                                title={"Give us Feedback"} 
                                description={"Drop suggestions on how we can serve you better"} 
                                iconImage={require("./../../assets/images/profile/thumbs_up/thumbs-up.png")}
                            />
                        }
                    </View>
                    {
                            this.context.state.isLoggedIn &&
                            <>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText]}>Legal</MyText>
                            </Separator>
                            <View>
                                {/* Hosting */}
                                <ProfileComponent 
                                    title={"Privacy and Security"} 
                                    description={"Connected apps and Password change settings"} 
                                    iconImage={require("./../../assets/images/profile/lock_closed/lock-closed.png")}
                                />
                                <ProfileComponent 
                                    title={"Terms of Service"} 
                                    description={"Credit cards, coupons and more"} 
                                    iconImage={require("./../../assets/images/profile/new_paper/news-paper.png")}
                                />
                            </View>
                            <Separator style={[Styles.separator]}></Separator>
                            <View style={[Styles.parentView]}>
                                <Image style={[Styles.image]} source={require("./../../assets/images/profile/stand_by/stand-by.png")} resizeMode="center" />
                                <View style={[Styles.contentView]}>
                                    <TouchableOpacity onPress={this.onSignOut}>
                                        <MyText style={[textH3Style, textOrange]}>Log Out</MyText>
                                    </TouchableOpacity>
                                    
                                    <MyText style={[textH6Style]}>Tap to sign out of account</MyText>
                                </View>
                                
                            </View>
                            </>
                    }
                </Content>
                {
                        !this.context.state.isLoggedIn &&
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
                    openSignUp={this.openSignUpModal}
                    onSuccess={() => this.setState({showLoginModal: false})}
                />
                <SignUpModal 
                    visible={this.state.showRegisterModal} 
                    onDecline={this.closeSignUpModal} 
                    {...this.props} 
                    openLogin={this.openLoginModal} 
                />
            </Container>
        );
    }
}

const ProfileScreen = (props) => {
    return (<ProfileScreenClass navigation={useNavigation()} {...props} />)
}

export default ProfileScreen;