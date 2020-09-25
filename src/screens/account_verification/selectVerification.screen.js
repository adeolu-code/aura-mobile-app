import React, { Component } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import { Container, View, Content, Footer, Button } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";

export default class SelectVerification extends Component {
    constructor() {
        super();

        this.state = {

        };
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
                    <Header {...this.props} title="Choose Your Means Of Identification" />
                    <Container style={[Styles.selectVerificationContainer]}>
                        <Content>
                            <LabelInput
                                label={"Choose ID Type To Add"}
                                picker
                                pickerOptions={[{
                                    label: "International Passport",
                                    value: "International-Passport"
                                }]}
                                selectedOption={"International-Passport"}
                            />
                        </Content>
                        <Footer style={[Styles.footer]}>
                            <Button
                                transparent 
                                style={[Styles.nextButton]}
                                onPress={() => this.props.navigation.navigate('UploadVerification')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold]}>Next</MyText>
                            </Button>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}