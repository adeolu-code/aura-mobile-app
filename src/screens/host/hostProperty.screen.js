import React, { Component } from "react";
import Header from "../../components/Header";
import { Container, Content, Footer } from "native-base";
import { SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { LabelInput } from "../../components/label_input/labelInput.component";
import IncrementingInput from "../../components/incrementing_input/incrementingInput.component";

export default class HostProperty extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        const {
            textWhite,
            textBold,
            textH6Style,
            textH4Style,
            textCenter
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="List A Property In Minutes" />
                    <Container style={[Styles.container]}>
                        <Content>
                            <LabelInput 
                                label={"Choose A Type Of Property"}
                                picker
                                pickerOptions={[
                                    {
                                        label: "Hotel",
                                        value: "Hotel"
                                    },
                                ]}
                            />
                            <LabelInput 
                                label={"Room Type"}
                                picker
                                pickerOptions={[
                                    {
                                        label: "Selfcon",
                                        value: "Selfcon"
                                    },
                                ]}
                            />
                            <MyText style={[textH6Style, Styles.propertyInfoText]}>
                                Check That Your Have Enough Beds To Accomodate All Your Guests Comfortably
                            </MyText>
                            <IncrementingInput 
                             label={"Guest"}
                            />
                            <IncrementingInput 
                             label={"Beds"}
                            />
                            <IncrementingInput 
                             label={"Bedroom"}
                            />
                            <IncrementingInput 
                             label={"Bathroom"}
                            />
                            <LabelInput 
                                label={"Are You Listing As Part Of A Company?"}
                                picker
                                pickerOptions={[
                                    {
                                        label: "Yes",
                                        value: "Yes"
                                    },
                                ]}
                                itemStyle={Styles.partOfCompanyInput}
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