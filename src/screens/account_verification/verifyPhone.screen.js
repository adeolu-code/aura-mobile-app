import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer, Button, Toast } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import RadioButton from "../../components/explore/tour_single/RadioButton";
import { LabelInput } from "../../components/label_input/labelInput.component";

export default class VerifyPhoneNumber extends Component {
    constructor() {
        super();

        this.state = {
            newNumber: -1,
        };
    }

    onSelectionChanged = (index) => {
        if (index == 0) {
            this.setState({newNumber: 0});
        }
        else {
            this.setState({newNumber: 1});
        }
    }

    onSave = () => {
        if (this.state.newNumber == -1) {
            Toast.show({
                text: "Please make a selection",
                type: "warning",
            });
            return;
        }

        this.props.navigation.navigate('HostSteps');
    }

    render() {
        const {
            textWhite,
            textBold,
            textH5Style,
            textCenter,
            textDarkBlue,
            textOrange,
            textH4Style,
            imgStyle,
            textUnderline,
          } = GStyles;
          
        const phone = "+234812345678";
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header
                        {...this.props} 
                        title="Verify Phone Number" 
                        sub={"Can your guests reach you on the number below?"}
                    />
                    <Container style={[Styles.container, {marginTop: 145}]}>
                        <Content>
                            <MyText style={[textBold, textUnderline]}>{phone}</MyText>
                            <RadioButton 
                                style={[{marginTop: 30}]}
                                options={[
                                    {key: "yes", text: "Yes, my guests can contact me on this number"},
                                    {key: "no", text: "No, I want to add another number for my guests"},
                                ]} 
                                onPress={(e) => this.onSelectionChanged(e)}
                            />
                            {
                                this.state.newNumber == 1 &&
                                <LabelInput 
                                    label={"Phone Number"}
                                    phone
                                />
                            }
                        </Content>
                        <Footer style={[Styles.footer, {backgroundColor: "transparent", paddingBottom: 20,}]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {height: 45, backgroundColor: (this.state.newNumber == -1 ? colors.lightOrange: colors.orange)}]}
                                onPress={() => this.onSave()}
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