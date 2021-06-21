import React, { Component } from "react";
import { SafeAreaView, ScrollView, Pressable, Image, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import ProfileComponent from "./../../components/profile_item/profileItem.component";
import Header from "../../components/Header";
import { View, Icon, Separator } from "native-base";
// import { Styles } from "./profile.style";
import { Styles } from "../host/host.style";
import colors from "../../colors";
import { MyText, CustomInput, Error, CustomButton, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { setContext, urls, Request, uploadMultipleFile, successMessage, errorMessage } from '../../utils';
import SelectImageModal from '../../components/SelectImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import { AppContext } from "../../../AppProvider";

import moment from 'moment';

export default class PrivacyAndSettings extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { subject: '', information: '', email: '', name: '', phoneNumber: '', media: [], loading: false, 
        formErrors: [], toggleFile: false, uploading: false,
        selectModal: false, images: [] };
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }
    renderError = () => {
        const { formErrors } = this.state;
        if (formErrors.length !== 0) {
        return (<Error errors={formErrors} />)
        }
    }


  
  render() {
    const { textOrange, textH4Style, textBold, textUnderline, flexRow } = GStyles
    const { toggleFile, uploading } = this.state
    const { isLoggedIn } = this.context.state
    return (
        <>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
            <Header {...this.props} title={ "Privacy and Settings"} wrapperStyles={{ position: 'relative'}} />
            {this.renderLoading()}
            <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1}}>
                <View style={{ marginTop: 20}}>
                    <Separator style={[Styles.separator]}>
                        <MyText style={[Styles.separatorText, textH4Style]}>Signing into Aura</MyText>
                    </Separator>
                    <View style={{ paddingHorizontal: 25 }}>
                        <ProfileComponent 
                            title={"Two-Factor Authentication"} 
                            description={"Disabled"} 
                            iconImage={require("./../../assets/images/profile/2fa.png")}
                            // onPress={() => this.props.navigation.navigate("EditProfile")}
                        />
                        <ProfileComponent 
                            title={"Password"} 
                            description={"Change password"} 
                            iconImage={require("./../../assets/images/profile/password.png")}
                            onPress={() => this.props.navigation.navigate("ChangePassword")}
                        />
                        <ProfileComponent 
                            title={"Biometrics"} 
                            description={"disabled"} 
                            iconImage={require("./../../assets/images/profile/fingerprint.png")}
                            onPress={() => this.props.navigation.navigate("Biometrics")}
                        />
                    </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    </>
    );
  }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 0, marginTop: 20
    },
    buttonContainer: {
        marginTop: 30, marginBottom: 20,
    },
});
