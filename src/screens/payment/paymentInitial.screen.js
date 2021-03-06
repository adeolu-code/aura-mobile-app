import React,{ Component } from "react";
import { SafeAreaView, ScrollView, Image } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { BOOKINGS_NO_BOOKINGS, BOOKINGS_SCREEN_DESCRIPTION } from "../../strings";
import { Styles } from "./payment.style";
import { MyText, CustomButton } from "../../utils/Index";
import { View } from "native-base";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class PaymentInitial extends Component {
    constructor() {
        super();

        this.state = {
            preLoaded: false,
        };
    }
    
    onPress = () => {
        this.props.navigation.navigate("Bank");
    }

    render() {
        const { textGrey, textH2Style, textH1Style, textExtraBold, textDarkBlue, textH4Style, imgContainer, imgStyle, textCenter } = GStyles;
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={"Payments Settings"} />
                    <View style={[Styles.container, {marginTop: 120}]}>                    
                        <MyText>Easily make purchases on Aura</MyText>
                        
                        <ScrollView>
                            <>
                                <View style={[Styles.imgContainer]}>
                                    <Image style={imgStyle} source={require("./../../assets/images/profile/payment/add_payment.png")} resizeMode="contain" />
                                </View>
                                <CustomButton
                                    buttonText={"Next"} 
                                    buttonStyle={[Styles.buttonStyle]} textStyle={[Styles.customTextStyle]} 
                                    onPress={() => this.onPress()}
                                />
                            </>
                            
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}