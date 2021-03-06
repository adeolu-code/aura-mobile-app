/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StatusBar, TouchableOpacity, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "./editProfile.style";
import { Container, Content, Footer } from "native-base";
import { MyText, Loading } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import {LabelInput as EditInput} from "./../../components/label_input/labelInput.component";
import { AppContext } from "../../../AppProvider";
import { changePasswordApi } from "../../api/profile.api";
import { PASSWORD_DONT_MATCH, PASSWORD_EMPTY } from "../../strings";
import { errorMessage, consoleLog } from "../../utils";

// import DateTimePicker from '@react-native-community/datetimepicker';
// import  from "@react-native-community/picker";

export default class ChangePassword extends Component {
    static contextType = AppContext;
    constructor() {
        super();

        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            loading: false,
            secureNewPassword: true,
            secureConfPassword: true,
            secureOldPassword: true,
        }
    }

    onUpdateUser = async () => {
        Keyboard.dismiss()
        if (this.state.newPassword == "" || this.state.confirmNewPassword == "") {
            errorMessage(PASSWORD_EMPTY);
            return;
        }

        if (this.state.newPassword != this.state.confirmNewPassword) {
            errorMessage(PASSWORD_DONT_MATCH);
            return;
        }

        let data = {
            "username": this.context.state.userData.username,
            "oldPassword": this.state.oldPassword,
            "newPassword": this.state.newPassword,
          }
          this.setState({loading: true});
          await changePasswordApi(data);
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
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Change Password" />
                    {this.renderLoading()}
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled={true}>
                            <EditInput 
                                secureText={this.state.secureOldPassword}
                                label={"Current Password"} 
                                placeholder={"Current Password"} 
                                onChangeText={(e) => this.setState({oldPassword: e})}
                                value={this.state.oldPassword}
                                icon={'ios-eye'}
                                onIconClick={() => this.setState({secureOldPassword: !this.state.secureOldPassword})}
                            />
                            <EditInput 
                                secureText={this.state.secureNewPassword}
                                label={"New Password"} 
                                placeholder={"New Password"} 
                                onChangeText={(e) => this.setState({newPassword: e})}
                                value={this.state.newPassword}
                                icon={'ios-eye'}
                                onIconClick={() => this.setState({secureNewPassword: !this.state.secureNewPassword})}
                            />
                            <EditInput 
                                secureText={this.state.secureConfPassword}
                                label={"Confirm New Password"} 
                                placeholder={"Confirm New Password"} 
                                onChangeText={(e) => this.setState({confirmNewPassword: e})}
                                value={this.state.confirmNewPassword}
                                icon={'ios-eye'}
                                onIconClick={() => this.setState({secureConfPassword: !this.state.secureConfPassword})}
                            />
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {height: 40, borderRadius: 5}]}
                                onPress={() => this.onUpdateUser()}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Save Changes</MyText>
                            </TouchableOpacity>
                            
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}