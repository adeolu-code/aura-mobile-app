import React, { Component } from "react";
import { StatusBar, SafeAreaView, ScrollView, Image, TouchableOpacity,   } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import { View, Icon } from "native-base";
import { Styles } from "./referral.style";
import GeneralStyles from "./../../assets/styles/GeneralStyles";
import Clipboard from "@react-native-community/clipboard";
import { successMessage, urls } from "../../utils";
import Share from 'react-native-share';

export default class Referrals extends Component {
    constructor() {
        super();

        this.state = {
            referralCode: "ahdjw02",
        };
        
        this.shareOptions = {
            title: 'Share via',
            message: 'send refferal code',
            social: Share.Social.WHATSAPP,
            message: 'Sign up on Aura using my refferral code ' + this.state.referralCode.toUpperCase(),
            url: urls.identityBase,
        };
    }

    shareToFB = () => {
        this.shareOptions.social = Share.Social.FACEBOOK;
        this.share();
    }

    shareToIG = () => {
        this.shareOptions.social = Share.Social.INSTAGRAM;
        this.share();
    }

    shareToBirdApp = () => {
        this.shareOptions.social = Share.Social.TWITTER;
        this.share();
    }

    share = async () => {
        const shareResponse = await Share.shareSingle(this.shareOptions);
    }

    render() {
        const { textOrange, textH5Style, textBold, textCenter, textH1Style} = GeneralStyles;
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Referrals" />
                    <ScrollView style={[Styles.container]} horizontal={false}>
                        <View style={[Styles.upperTextView]}>
                            <MyText style={[textH5Style]}>Share your referral code with friends to get up to </MyText>
                            <MyText style={[textH5Style, textOrange]}>30% discount</MyText>
                        </View>
                        <View style={[Styles.referalView]}>
                            <TouchableOpacity 
                                style={[Styles.copyView]}
                                onPress={() => {
                                    Clipboard.setString(this.state.referralCode.toUpperCase());
                                    successMessage("Referral Code copied successfully");
                                }}
                            >
                                <MyText style={[textOrange, textH5Style]}>Copy</MyText>
                                <Icon name={"copy-outline"} style={[Styles.copyIcon]} />
                            </TouchableOpacity>
                            <MyText style={[textBold, textCenter,textH1Style]}>{this.state.referralCode.toUpperCase()}</MyText>
                        </View>
                        <View>
                            <MyText>Share on:</MyText>
                            <View style={[Styles.socialView]}>
                            <TouchableOpacity onPress={() => this.shareToBirdApp()}>
                                    <Image source={require("./../../assets/images/profile/twitter/twitter.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[Styles.facebookImageView]}
                                    onPress={() => this.shareToFB()}
                                >
                                    <Image source={require("./../../assets/images/profile/facebook/facebook.png")} />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[Styles.instagramImageView]}
                                    onPress={() => this.shareToIG()}
                                >
                                    <Image 
                                        style={[Styles.instagramImage]} 
                                        source={require("./../../assets/images/profile/instagram/instagram.png")} 
                                    />
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}