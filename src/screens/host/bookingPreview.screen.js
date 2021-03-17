import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image, Platform } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText, CustomButton } from "../../utils/Index";
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
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Here’s How Guests Will Book With You" 
                    />
                    <Container style={[Styles.container, {marginTop: Platform.OS === 'ios' ? 140 : 160 }]}>
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
                            <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} 
                                onPress={() => this.props.navigation.navigate('NotifyHost')} />
                            
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const Item = (props) => {
    const {
        textBold, textH4Style, textExtraBold, textH5Style, textGrey
      } = GStyles;

    const image = (props.image == undefined) ? false : ((props.image) ? true : false);
    return (
        <View style={[Styles.previewParentView, { paddingHorizontal: 0}]}>
            <View style={[Styles.previewIconParent ]}>
                {
                    image ?
                    <View style={[Styles.shieldView]}>
                        <Image source={require("./../../assets/images/account_verification/shield_2x.png")} 
                        style={[Styles.imageShield]} resizeMode={"contain"} />
                    </View>
                    :
                    <View style={[Styles.checkContainer]}>
                        {/* <Icon name={'check'} type="Feather" style={[Styles.alertIcon]} /> */}
                        <Icon name={'check'} type="Feather" style={{ color: colors.white, fontSize: 16}} />
                    </View>
                }
            </View>
            
            <View style={[Styles.middleSection]}>
                <MyText style={[textBold, textH4Style, Styles.previewTitle]}>{props.title}</MyText>
                <MyText style={[textH5Style, textGrey, Styles.content]}>
                    {props.content}
                </MyText>
            </View>
            
        </View>
    );
}