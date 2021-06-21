import React, { Component, useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Keyboard, Pressable, KeyboardAvoidingView, Modal, TouchableWithoutFeedback } from 'react-native';
import { Input, Picker, Icon } from "native-base";
import { MyText, DatePickerTwo, CustomButton, CustomInput, Loading, Error } from '../utils/Index';
import DateTimePickerComponent from './date_time_picker/dateTimePicker.component';
import GStyles from '../assets/styles/GeneralStyles';
import { Styles } from "../screens/host/host.style";

import colors from '../colors';
import { formatAmount, formatDecimal, setBiometric } from '../helpers';
import moment from 'moment';
import { errorMessage, GetRequest, Request, urls, successMessage } from '../utils';

import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics'


const AuthModal = (props) => {
    const { visible, onDecline, userData, set } = props
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({ errors: []})

    const { container, modalContainer, bottomContainer  } = styles
    const { textH5Style, textH4Style, textCenter, textBlack8, textDarkBlue, textBold, textBlackClose,
        textWhite, textH3Style, flexRow, bgWhite } = GStyles

    const biometricAuthentication = () => {
        if(Platform.OS === 'ios') {
            authIOSCurrent()
        } else {
            authAndroidCurrent()
        }
    }
    const authIOSCurrent = () => {
        // FingerprintScanner.authenticate({ description: 'Activate Biometrics' })
        ReactNativeBiometrics.simplePrompt({promptMessage: 'Activate fingerprint'})
        .then((res) => {
            const { success } = res
            if (success) {
                storeDetailsInKeychain()
            } else {
                errorMessage('user cancelled biometric prompt')
            }
            console.log('Finger print response ', res)
            
            // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        })
        .catch((error) => {
            console.log('fingerprint error ', error)
            setPassword('')
            errorMessage('biometrics failed')
            // errorMessage(error.message)
            // Alert.alert('Fingerprint Authentication', error.message);
        });
    }
    const authAndroidCurrent = () => {
        // FingerprintScanner.authenticate({ description: 'Activate Biometrics' })
        ReactNativeBiometrics.simplePrompt({promptMessage: 'Activate fingerprint'})
        .then((res) => {
            console.log('Finger print response ', res)
            const { success } = res
            if (success) {
                storeDetailsInKeychain()
            } else {
                errorMessage('user cancelled biometric prompt')
            }
            // Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        })
        .catch((error) => {
            console.log('fingerprint error ', error)
            setPassword('')
            errorMessage('biometrics failed')
            // Alert.alert('Fingerprint Authentication', error.message);
        });
    }
    const storeDetailsInKeychain = async () => {
        // Store the credentials
        await Keychain.setGenericPassword(userData.email, password );
        try {
            // Retrieve the credentials
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                console.log('Credentials successfully loaded for user ' + credentials);
                set({ biometricEnabled: true })
                setBiometric(true)
                successMessage('Biometrics successfully activated')
                setPassword('')
            } else {
                errorMessage('Biometrics activation failed, please try again')
                console.log('No credentials stored');
            }
        } catch (error) {
            console.log("Keychain couldn't be accessed!", error);
            errorMessage('Biometrics activation failed, please try again')
        }
        // await Keychain.resetGenericPassword();
    }
        
    
    const login = async () => {
        Keyboard.dismiss()
        // console.log('UserData ', userData)
        const obj = { username: userData.email, password }
        setLoading(true)
        setState({ ...state, errors: [] })
        try {
            const res = await Request(urls.identityBase, `${urls.v}auth/user/login`, obj)
            console.log('Res ', res)
            if(!res.isError) {
                setPassword('')
                biometricAuthentication()
                onDecline()
            } else {
                const message = res.message;
                const error = ['Password is incorrect, please check and try again']
                setState({ errors: error})
            }
            //bring up biometric authentication
           
        } catch (error) {
            console.log('Error ', error)
        }
        setLoading(false)
    }
    

    const onPasswordChange = (attr, value) => {
        setPassword(value)
    }
    const renderLoading = () => {
        if(loading) {
            return (<Loading />)
        }
    }
    const renderError = () => {
        if(state.errors.length !== 0) {
          return (<Error errors={state.errors} />)
        }
    }
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
            <TouchableWithoutFeedback onPress={onDecline}>
                <View style={container}>
                    {renderLoading()}
                    <View style={[flexRow, { justifyContent: 'flex-end'}]}>
                        
                        {/* <Pressable style={styles.close} onPress={onDecline}>
                            <MyText style={[textWhite, textH3Style]}>Close</MyText>
                        </Pressable> */}
                    </View>
                    <View style={modalContainer}>
                        <MyText style={[textH3Style, textBold, textBlackClose, textCenter, { marginBottom: 10}]}>Please enter your password</MyText>
                        <MyText style={[textH4Style, textCenter, textBlack8]}>Help us secure your account</MyText>
                        
                        {renderError()}
                        <View style={[bottomContainer]}>
                            <CustomInput placeholder="password" value={password} password secureTextEntry
                            onChangeText={onPasswordChange} />
                            {/* <CustomInput password secureTextEntry placeholder="Password" label="Password" onChangeText={onPasswordChange} 
                           value={password} attrName="password" /> */}
                        </View>
                        
                        <View>
                            <CustomButton buttonText="Submit" onPress={login} disabled={password==''} />
                        </View>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%', backgroundColor: 'rgba(23,23,56,0.6)',
        justifyContent: 'flex-end', 
        // alignItems: 'center', paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: colors.white, paddingHorizontal: 20, width: '100%', paddingVertical: 30,
        borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
    bottomContainer: {
        marginTop: 30, width: '100%', marginBottom: 20
        // borderWidth: 1
    },
    close: {
        marginVertical: 30, alignItems: 'flex-end', paddingHorizontal: 15
    },
    
});


export default AuthModal
