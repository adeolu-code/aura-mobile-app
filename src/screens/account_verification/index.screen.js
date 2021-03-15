import React, { Component } from "react";
import { StatusBar, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Container, Content, View, Button } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { MyText, CustomButton } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { AppContext } from "../../../AppProvider";

export default class AccountVerification extends Component {
    static contextType = AppContext;
    constructor() {
        super();

        this.state = {};
    }

    selectVerification = () => {
        // if (this.context.state.userData && this.context.state.userData.identificationDocument) {
        //     // id doc approved
        //     this.props.navigation.navigate('UploadVerification', {force:true}) 

        // }
        // else {
            
        // }
        this.props.navigation.navigate('SelectVerification')
        
    }

    render() {
        const {
            textWhite, textGrey,
            textBold,
            textH5Style,
            textH4Style,
          } = GStyles;
        return (
            <>
                <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Account Verification" />
                    <Container style={[Styles.container]}>
                        <ScrollView style={{flexGrow: 1}}>
                            <View>
                                <MyText style={[textH4Style, textGrey]}>
                                    This helps us know you are really who you say you are. Identity verification is one of the many ways we ensure Aura is safe and secure.
                                </MyText>
                                <View style={Styles.imgContainer}>
                                    <Image source={require("./../../assets/images/account_verification/verification.png")} 
                                    resizeMode="contain" style={Styles.imgStyle} />
                                </View>
                                <View style={[Styles.lowerView]}>
                                    <View style={[Styles.shiedlView]}>
                                        <Image  
                                        source={require("./../../assets/images/account_verification/shield_2x.png")} 
                                        style={[Styles.imageShield]}
                                        resizeMode={"contain"}
                                    />
                                    </View>
                                    
                                    {/* <Icon name={"shield"} style={[Styles.shieldIcon]} /> */}
                                    <MyText style={[textBold, textH5Style]}>
                                        Your Information Is Safe & Secure
                                    </MyText>
                                </View>
                                <MyText style={[textH4Style,textGrey, Styles.lowerText]}>
                                    This info won’t be shared with other people who use Aura
                                </MyText>

                                <View style={{marginTop: 60}}>
                                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.selectVerification} />
                                </View>
                            </View>
                        </ScrollView>
                        {/* <Footer style={[Styles.footer]}>
                            
                        </Footer> */}
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}