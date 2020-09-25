import React, { Component } from "react";
import { StatusBar, SafeAreaView, ScrollView, Image, Pressable } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import { View, Icon } from "native-base";
import { Styles } from "./referral.style";
import GeneralStyles from "./../../assets/styles/GeneralStyles";

export default class Referrals extends Component {
    constructor() {
        super();

        this.state = {
            referralCode: "ahdjw02",
        };
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
                            <Pressable style={[Styles.copyView]}>
                                <MyText style={[textOrange, textH5Style]}>Copy</MyText>
                                <Icon name={"copy-outline"} style={[Styles.copyIcon]} />
                            </Pressable>
                            <MyText style={[textBold, textCenter,textH1Style]}>{this.state.referralCode.toUpperCase()}</MyText>
                        </View>
                        <View>
                            <MyText>Share on:</MyText>
                            <View style={[Styles.socialView]}>
                            <Pressable onPress={() => alert("")}>
                                    <Image source={require("./../../assets/images/profile/twitter/twitter.png")} />
                                </Pressable>
                                <Pressable 
                                    style={[Styles.facebookImageView]}
                                    onPress={() => alert("")}
                                >
                                    <Image source={require("./../../assets/images/profile/facebook/facebook.png")} />
                                </Pressable>
                                <Pressable 
                                    style={[Styles.instagramImageView]}
                                    onPress={() => alert("")}
                                >
                                    <Image 
                                        style={[Styles.instagramImage]} 
                                        source={require("./../../assets/images/profile/instagram/instagram.png")} 
                                    />
                                </Pressable>
                                
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}