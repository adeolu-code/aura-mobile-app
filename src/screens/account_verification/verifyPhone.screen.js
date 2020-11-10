import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer, Toast } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { MyText, Loading } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import RadioButton from "../../components/explore/tour_single/RadioButton";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { AppContext } from "../../../AppProvider";
import { generateOTPApi } from "../../api/users.api";
import { errorMessage } from "../../utils";

export default class VerifyPhoneNumber extends Component {
    static contextType = AppContext;
    constructor() {
        super();

        this.state = {
            newNumber: 0,
            phone: undefined,
            loading: false,
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
        this.setState({loading: true});
        generateOTPApi().then(result => {
            if (result.isError == false) {
                this.props.navigation.navigate('Auth', {
                    screen: "Otp", 
                    params: { 
                        parentScreen: "HostPropertyStack",
                        finalScreen: "HostSteps"
                    }
                });
            }
            else {
                errorMessage(res.Message)
                
            }
        }).finally(() => {
            this.setState({loading: false});
        })
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    render() {
        const {
            textWhite,
            textBold,
            textCenter,
            textH4Style,
            textUnderline,
          } = GStyles;
          
        const phone = this.state.phone;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header
                        {...this.props} 
                        title="Verify Phone Number" 
                        sub={"Can your guests reach you on the number below?"}
                    />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 160}]}>
                        <Content>
                            <MyText style={[textBold, textUnderline]}>{phone || this.context.state.userData.phoneNumber}</MyText>
                            {/* {key: "no", text: "No, I want to add another number for my guests"}, */}
                            <RadioButton 
                                style={[{marginTop: 30}]}
                                options={[
                                    {key: "yes", text: "Yes, my guests can contact me on this number"},
                                    
                                ]} 
                                selectedOption={"yes"}
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