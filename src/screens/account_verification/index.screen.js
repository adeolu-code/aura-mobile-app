import React, { Component } from "react";
import { StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Container, Content, View, Footer, Button, Text, Icon } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class AccountVerification extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const {
            textWhite,
            textBold,
            textH5Style,
            textExtraBold,
            textDarkBlue,
            textGrey,
            textH4Style,
            imgStyle,
            textUnderline,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Account Verification" />
                    <Container style={[Styles.container]}>
                        <Content>
                            <MyText>
                                This helps us know you are really who you say you are. Identity verification is one of the many ways we ensure Aura is safe and secure.
                            </MyText>
                            <View style={Styles.imgContainer}>
                                <Image source={require("./../../assets/images/account_verification/Group_4614_2x.png")} resizeMode="contain" style={Styles.imgStyle} />
                            </View>
                            <View style={[Styles.lowerView]}>
                                {/* <Image  
                                    source={require("./../../assets/images/account_verification/shield_2x.png")} 
                                    style={[Styles.imageShield]}
                                /> */}
                                <Icon name={"shield"} style={[Styles.shieldIcon]} />
                                <MyText style={[textBold]}>
                                    Your Information Is Safe & Secure
                                </MyText>
                            </View>
                            <MyText style={[textH5Style, Styles.lowerText]}>
                                This info won’t be shared with other people who use Aura
                            </MyText>
                            <Button transparent style={[Styles.nextButton]}>
                                <MyText style={[textWhite, textH4Style, textBold]}>Next</MyText>
                            </Button>
                        </Content>
                        {/* <Footer style={[Styles.footer]}>
                            
                        </Footer> */}
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}