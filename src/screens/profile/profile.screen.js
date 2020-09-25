import React, { Component } from "react";
import { Container, Content, View, Separator, Text, Icon } from "native-base";
import { Styles } from "./profile.style";
import ProfileComponent from "./../../components/profile_item/profileItem.component";
import { Image } from "react-native";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class ProfileScreen extends Component {
    constructor(props) {
        super();

        this.state = {};
    }

    render() {
        const {textH2Style, textCenter, textBold, textH3Style, textH6Style, textOrange} = GStyles;
        return (
            <Container>
                <Content style={{flexGrow: 1}} scrollEnabled>
                    <View style={[Styles.imageView]}>
                        {/* image section */}
                        <Image source={require("./../../assets/images/photo/photo1.png")} style={[Styles.userImageStyle]} />
                        <MyText style={[textH2Style, textCenter, textBold]}>Joshua Nwagbo</MyText>
                    </View>
                    <Separator style={[Styles.separator]}>
                        <MyText style={[Styles.separatorText]}>Account settings</MyText>
                    </Separator>
                    <View>
                        {/* Account settings */}
                        <ProfileComponent 
                            title={"Personal Information"} 
                            description={"Biodata and information about you"} 
                            iconImage={require("./../../assets/images/profile/user_solid/user-solid-square.png")}
                            // onPress={() => this.props.navigation.navigate("EditProfile")}
                            onPress={() => this.props.navigation.navigate("AddProfilePicture")}
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
                    <View>
                        {/* Hosting */}
                        <ProfileComponent 
                            title={"Learn about Hosting"} 
                            description={"Credit Cards, Coupons and more"} 
                            iconImage={require("./../../assets/images/profile/education/education.png")}
                        />
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
                    </View>
                    <Separator style={[Styles.separator]}>
                        <MyText style={[Styles.separatorText]}>Support</MyText>
                    </Separator>
                    <View>
                        {/* Hosting */}
                        <ProfileComponent 
                            title={"Get Help"} 
                            description={"Get 24/7 support, tools and information you need"} 
                            iconImage={require("./../../assets/images/profile/question/question.png")}
                        />
                        <ProfileComponent 
                            title={"Give us Feedback"} 
                            description={"Drop suggestions on how we can serve you better"} 
                            iconImage={require("./../../assets/images/profile/thumbs_up/thumbs-up.png")}
                        />
                    </View>
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
                            <MyText style={[textH3Style, textOrange]}>Log Out</MyText>
                            <MyText style={[textH6Style]}>Tap to sign out of account</MyText>
                        </View>
                        
                    </View>
                </Content>
            </Container>
        );
    }
}