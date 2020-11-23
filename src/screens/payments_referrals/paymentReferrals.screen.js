import React, { Component } from "react";
import { StatusBar, ScrollView } from "react-native";
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
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Payments & Referrals" />
                    <ScrollView>
                        <View style={contentStyle}>
                            <View style={sectionStyle}>
                                <DashboardCardComponent 
                                    title="Payment Settings" 
                                    description={description}
                                    img={require('../../assets/images/profile/credit_card/Component64–1_2x.png')} 
                                    onPress={this.onPressPayment} 
                                />
                            </View>
                            <View style={sectionStyle}>
                                <DashboardCardComponent 
                                    title="Referrals" 
                                    description={description}
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