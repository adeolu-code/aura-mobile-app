import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";

export default class BookingPreview extends Component {
    constructor() {
        super();

        this.state = {};
    }

    rules = [
        "Suitable for children (2-12 years)",
        "Suitable for children",
        "Suitable for pets",
        "Events or parties allowed"
    ];

    render() {
        const {
            textBold,
            textH4Style,
            textCenter,
            textWhite,
          } = GStyles;
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Here’s How Guests Will Book With You" 
                    />
                    <Container style={[Styles.container, {marginTop: 140}]}>
                        <Content scrollEnabled>
                            <Item 
                                title={"Qualified Guests Find Your Listing"}
                                content={"Anyone who wants to book with you would need to confirm their contact information, provide payment details and tell you about their trip."}
                            />
                            <Item 
                                title={"You Set Controls For Who Can Book"}
                                content={"To book available dates without having to send a request, guests must agree to your rules and meet all the requirements you set."}
                            />
                            <Item 
                                title={"You Set Controls For Who Can Book"}
                                content={"To book available dates without having to send a request, guests must agree to your rules and meet all the requirements you set."}
                            />
                            <Item 
                                title={"You’re Protected Throughout"}
                                content={"In the rare case there are issues, Aura has you covered with 24/7 customer support, a $1,000,000 Host Guarantee, and completely penalty-free cancellations if you’re uncomfortable with a reservation."}
                                image
                            />
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5,}]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('NotifyHost')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const Item = (props) => {
    const {
        textBold,
      } = GStyles;

    const image = (props.image == undefined) ? false : ((props.image) ? true : false);
    return (
        <View
            style={[Styles.previewParentView]}
        >
            <View style={[Styles.previewIconParent ]}>
                {
                    image ?
                    <View style={[Styles.shieldView]}>
                        <Image  
                        source={require("./../../assets/images/account_verification/shield_2x.png")} 
                        style={[Styles.imageShield]}
                        resizeMode={"contain"}
                    />
                    </View>
                    :
                        <Icon name={'ios-checkmark-circle-sharp'} style={[Styles.alertIcon]} />
                }
            </View>
            
            <View style={[Styles.middleSection]}>
                <MyText style={[textBold, Styles.previewTitle]}>{props.title}</MyText>
                <MyText style={[Styles.content]}>
                    {props.content}
                </MyText>
            </View>
            
        </View>
    );
}