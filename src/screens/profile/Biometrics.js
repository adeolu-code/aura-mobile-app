import React, { Component } from "react";
import { SafeAreaView, ScrollView, Pressable, Image, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import ProfileComponent from "../../components/profile_item/profileItem.component";
import Header from "../../components/Header";
import { View, Icon, Separator } from "native-base";
// import { Styles } from "./profile.style";
import { Styles } from "../host/host.style";
import colors from "../../colors";
import { MyText, CustomInput, Error, CustomButton, Loading, Switch } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { setContext, urls, Request, uploadMultipleFile, successMessage, errorMessage } from '../../utils';
import ReactNativeBiometrics from 'react-native-biometrics';

import SelectImageModal from '../../components/SelectImageModal';
import { AppContext } from "../../../AppProvider";
import AuthModal from "../../components/AuthModal";

import moment from 'moment';
import { connect } from "react-redux";

class Biometrics extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { value: false, loading: false, showLoginModal: false, formErrors: [], uploading: false,
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
    toggleBiometrics = async (value) => {
        if(value) {
            this.checkBiometrics()
        } else {
            this.context.set({ biometricEnabled: false })
        }
    }
    checkBiometrics = async () => {
        try {
            const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable()
            // const biometryType = await FingerprintScanner.isSensorAvailable()

            if (available && biometryType === ReactNativeBiometrics.TouchID) {
            // if (biometryType === 'Touch ID') {
                console.log('TouchID is supported')
                this.authenticateFingerPrint()
            } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
            // } else if (biometryType === 'Face ID') {
                console.log('FaceID is supported')
                this.authenticateFingerPrint()
            } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
                // console.log('Biometrics is supported')
                this.authenticateFingerPrint()
            } else {
                errorMessage('Biometrics not supported')
            }
        } catch (error) {
            console.log('Error ', error.message)
            errorMessage(error.message)
            // toggleBiometrics(false)
        }
        
    }
    authenticateFingerPrint = () => {
        this.openLoginModal()
    }
    openLoginModal = () => {
        this.setState({ showLoginModal: true })
    }

    onPress = (value) => {
        console.log('Value ', value)
    }

    closeLoginModal = () => {
        this.setState({ showLoginModal: false })
    }


  
  render() {
    const { textOrange, textH4Style, textBold, textUnderline, flexRow, textBlackClose, textH5Style } = GStyles
    const { toggleFile, uploading } = this.state
    const { isLoggedIn, userData, biometricEnabled } = this.context.state
    return (
        <>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
            <Header {...this.props} title={"Use Biometrics to:"} wrapperStyles={{ position: 'relative'}} />
            {this.renderLoading()}
            <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1}}>
                <View style={{ marginTop: 20}}>
                    
                    <View style={{ paddingHorizontal: 25 }}>
                        <MyText style={[textBold, textH4Style, textBlackClose]}>Unlock the app</MyText>
                        <View style={[flexRow, { width: '100%', marginTop: 10}]}>
                            <View style={{ flex: 4.2}}>
                                <MyText style={[textH5Style]} >Increase the security by using Biometrics when you open the app</MyText>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Switch onPress={this.toggleBiometrics} value={biometricEnabled} />
                            </View>
                        </View>
                        
                    </View>
                    
                </View>
            </ScrollView>
            <AuthModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} 
            userData={userData} {...this.props} set={this.context.set} />
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


export default Biometrics
