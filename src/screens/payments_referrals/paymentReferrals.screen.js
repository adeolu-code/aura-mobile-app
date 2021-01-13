import React, { Component } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { View } from "native-base";
import { Styles } from "./paymentReferrals.style";
import DashboardCardComponent from "../../components/dashboard/DashboardCardComponent";

export default class PaymentReferral extends Component {
    constructor() {
        super();

        this.state = {};
    }

    onPressPayment = () => {
        this.props.navigation.navigate("PaymentInitial");
    }

    onPressReferral = () => {
        this.props.navigation.navigate("Referrals");
    }

    render() {
        const { container, headerStyle, sectionStyle,contentStyle } = Styles;
        const description = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.`
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Payments & Referrals" />
                    <ScrollView>
                        <View style={contentStyle}>
                            <View style={sectionStyle}>
                                <DashboardCardComponent 
                                    title="Payment Settings" 
                                    description={"Set up and edit your bank details"}
                                    img={require('../../assets/images/profile/credit_card/Component64–1_2x.png')} 
                                    onPress={this.onPressPayment} 
                                />
                            </View>
                            <View style={sectionStyle}>
                                <DashboardCardComponent 
                                    title="Referrals" 
                                    description={"Get referral code which you can use to invite your friends to Aura and get discount on Aura services"}
                                    img={require('../../assets/images/profile/component_64_1/Component_64_1_2x.png')} 
                                    onPress={this.onPressReferral} 
                                />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}