import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "../host/host.style";
import { MyText, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";

export default class Policy extends Component {
    constructor() {
        super();
    }

    submit = () => {
        this.props.navigation.navigate('Success')
    }

    render() {
        const {
            textBold, textGrey,
            textH4Style,
            textCenter,
            textWhite,
          } = GStyles;
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Aura Photographer Policy" 
                    />
                    <Container style={[Styles.container, {marginTop: 120}]}>
                        <Content scrollEnabled>
                            <MyText style={[textH4Style, textGrey]}>
                                Guests are entitled to free cancellation if they cancel their booking not more than 48 hours after booking, 
                                and at least 14 days before check-in (time shown in the confirmation email) Where guests cancel their booking 
                                within 48 hours after booking and at least 14 full days prior to Listing’s local check-in time (shown in the confirmation email), 
                                they are entitled to a full refund of the nightly rate, but not the service fee & VAT.
                            </MyText>

                            <MyText style={[textH4Style, textBold, textCenter, { marginVertical: 20}]}>14 days prior</MyText>

                            <MyText style={[textH4Style, textGrey]}>
                                50% REFUND Where guests cancel their booking less than 14 days but at least 7 days before the Listing's local check 
                                in time (shown in the confirmation email), they are entitled to a 50% refund of the nightly rate, 
                                but not the service fee.
                            </MyText>

                            <MyText style={[textH4Style, textBold, textCenter, { marginVertical: 20}]}>7 days prior</MyText>

                            <MyText style={[textH4Style, textGrey]}>
                                Where guests cancel their booking less than 7 days before the Listing's local 
                                check in time (shown in the confirmation email), they are entitled to no refund. 
                                Where guests choose to check-out early after check-in, the unspent nights are not refunded.
                            </MyText>
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5,}]}>
                            <CustomButton buttonText="I Understand" buttonStyle={{ elevation: 2}} onPress={this.submit} />
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}