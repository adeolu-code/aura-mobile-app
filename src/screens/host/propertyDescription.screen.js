import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image  } from "react-native";
import { Styles } from "./host.style";
import { Container, Content, View, Icon } from "native-base";
import colors from "../../colors";
import Header from "../../components/Header";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";

export default class PropertyDescription extends Component {
    constructor() {
        super();

        this.state = {};
    }

    render () {
        const {
            textBlack,
            textBold,
            textH4Style,
            textH2Style,
            textWhite,
            textCenter
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header
                        {...this.props} 
                        title="Create A List Title" 
                    />
                    <Container style={[Styles.container, {marginTop: 120}]}>
                        <Content>
                            <LabelInput 
                                label={"Catch guests' attention with a listing title that highlights what makes your place special"}
                                labelStyle={[textBlack, {marginBottom: 20}]}
                                textarea
                            />
                            <MyText style={[textBold,textH2Style, {marginTop: 40}]}>
                                Describe Your Properties
                            </MyText>
                            <LabelInput 
                                label={"Let guests know how available you'll be during their stay. For your safety , don't share your phone number or email until you have confirmed reservation."}
                                labelStyle={[textBlack, {marginBottom: 20}]}
                                textarea
                            />
                            <TouchableOpacity style={[Styles.nextButton]}
                              onPress={() => this.props.navigation.navigate("PropertyLocation")}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                            </TouchableOpacity>
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}