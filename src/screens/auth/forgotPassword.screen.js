/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "./../edit_profile/editProfile.style";
import { Container, Content, Footer } from "native-base";
import { MyText, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import {LabelInput as EditInput} from "../../components/label_input/labelInput.component";
import { AppContext } from "../../../AppProvider";
import { forgotPasswordApi } from "../../api/users.api";
import { VALUE_EMPTY } from "../../strings";
import { errorMessage, consoleLog } from "../../utils";

// import DateTimePicker from '@react-native-community/datetimepicker';
// import  from "@react-native-community/picker";

export default class ForgotPassword extends Component {
    static contextType = AppContext;
    constructor() {
        super();

        this.state = {
            email: "",
            loading: false,
        }
    }

    onUpdateUser = async () => {
        if (this.state.email == "") {
            errorMessage(VALUE_EMPTY("Email address"));
            return;
        }


        let data = {
            "email": this.state.email,
          }
          this.setState({loading: true});
          
          await forgotPasswordApi(data).then(result => {
              if (result != undefined && result.isError != true) {
                this.props.navigation.goBack();
              }
          });
          this.setState({loading: false});
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold} = GStyles;
        consoleLog("user", this.context.state.userData);
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Change Password" />
                    {this.renderLoading()}
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled={true}>
                            <EditInput 
                                label={"Email"} 
                                placeholder={"johndoe@yahoo.com"} 
                                onChangeText={(e) => this.setState({email: e})}
                                value={this.state.email}
                                keyboardType={'email-address'}
                            />
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {height: 40, borderRadius: 5}]}
                                onPress={() => this.onUpdateUser()}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Submit</MyText>
                            </TouchableOpacity>
                            
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}