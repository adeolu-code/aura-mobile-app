import React,{ Component } from "react";
import { SafeAreaView, ScrollView, Image, Pressable, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { BOOKINGS_NO_BOOKINGS, BOOKINGS_SCREEN_DESCRIPTION } from "../../strings";
import { Styles } from "./payment.style";
import { MyText, CustomButton } from "../../utils/Index";
import { View } from "native-base";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class PayWith extends Component {
    constructor() {
        super();

        this.state = {
        };
    }
    onAddPaymentClick = () => {

    }

    render() {
        const { textGrey, textH2Style, textH1Style, textExtraBold, textDarkBlue, textH6Style, imgContainer, imgStyle, textCenter } = GStyles;
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Pay With"} />
                    <View style={[Styles.container]}>                    
                        <MyText style={[textH6Style]}>Choose which method you want to make payments with</MyText>
                        
                        <View style={[Styles.cardRow]}>
                            <>
                                <Card 
                                    imgStyle={{width: 40, height: 40}} 
                                    // 
                                    imgSource={require("./../../assets/images/profile/credit_card/credit-card_2x_orange.png")}
                                    text={"Use Credit/Debit Card"}
                                    resizeMode={"center"}
                                    onPress={() => this.props.navigation.navigate("AddPayment")}
                                />
                                <Card 
                                    imgStyle={{width: 120, height: 60}} 
                                    imgSource={require("./../../assets/images/profile/aura_paypal-Copy.png")}
                                    text={"Use Paypal"}
                                    resizeMode={"cover"}
                                    onPress={() => alert("")}
                                />
                            </>
                            
                        </View>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const Card = (props) => {
    const { textGrey, textH2Style, textH6Style, textExtraBold, textDarkBlue, textH4Style, imgContainer, imgStyle, textCenter } = GStyles;
    return (
        <TouchableOpacity style={[Styles.cardView]} onPress={props.onPress}>
            <Image 
                source={props.imgSource} 
                style={[Styles.cardImage, props.imgStyle]} 
                resizeMode={props.resizeMode}
            />
            <MyText style={[textH6Style, textCenter, Styles.cardText]}>{props.text}</MyText>
        </TouchableOpacity>
    );
}