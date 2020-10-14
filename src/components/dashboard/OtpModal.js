/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback, ScrollView, Dimensions, Keyboard
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, CustomInputNumber, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, GetRequest, urls } from '../../utils';
import { setUser } from '../../helpers';


class OtpModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { numbers: [], loading: false, formErrors: [], message: '' };
        this.num1 = React.createRef();
        this.num2 = React.createRef();
        this.num3 = React.createRef();
        this.num4 = React.createRef();
        this.num5 = React.createRef();
        this.num6 = React.createRef();
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    renderError = () => {
        const { formErrors } = this.state
        if(formErrors.length !== 0) {
            return (<Error errors={formErrors} />)
        }
    }
    renderSuccessMessage = () => {
        const { message } = this.state;
        const { textH4Style, textSuccess } = GStyles
        if(message) {
            return (
                <View style={{ marginBottom: 20}}>
                    <MyText style={[textH4Style, textSuccess ]}>{message}</MyText>
                </View>
            )
        }
    }
    changeNumValue = (item, index, value) => {
        const { numbers } = this.state
        const values = [ ...numbers ]
        const numberRefs = [this.num1, this.num2, this.num3, this.num4, this.num5, this.num6]
        if(value) {
            values.push(value)
            this.setState({ numbers: values })
            // this.setState({ numbers: values })
            if(numberRefs[index+1] !== undefined) {
                numberRefs[index+1].current.focus()
            }
        } else {
            values.splice(index, 1)
            this.setState({ numbers: values })
            if(numberRefs[index-1] !== undefined) {
                numberRefs[index-1].current.focus()
            }
        }
    }
    renderNumberInput = () => {
        const { inputStyle } = styles
        const numberRefs = [this.num1, this.num2, this.num3, this.num4, this.num5, this.num6]
        return numberRefs.map((item, index) => {
            return (
                <CustomInputNumber refs={item} key={index} style={inputStyle}
                onChangeText={this.changeNumValue.bind(this, item, index)} />
            )
        })
    }
    sendMail = async () => {
        const { userData } = this.context.state
        // this.setState({ loading: true, formErrors: [] })
        const res = await GetRequest(urls.identityBase, `api/v1/user/email/verification/resend/${userData.username}`);
        // this.setState({ loading: false })
        // if(res.isError) {
        //     const message = res.message;
        //     const error = [message]
        //     this.setState({ formErrors: error})
        // } else {
        //   this.openEmailModal()
        // }
    }
    resendCode = async () => {
        this.setState({ loading: true, formErrors: [] })
        const res = await Request(urls.identityBase, 'api/v1/user/otp/generate', null, this.context.state.token);
        console.log(res)
        if(res.IsError) {
            const message = res.Message;
            const error = [message]
            this.setState({ formErrors: error})
        } else {
            this.setState({ message: 'OTP resent successfully!!'})
            setTimeout(() => {
                this.setState({ message: ''})
            }, 5000);
        }
        this.setState({ loading: false })
    }
    verifyOtp = async () => {
        Keyboard.dismiss()
        const { numbers } = this.state;
        const { state, set } = this.context
        if(numbers < 6) {
            this.setState({ formErrors: ['Please fill out the code']})
        } else {
            this.setState({ loading: true, formErrors: [] })
            let numberString = ''
            numbers.map((item, i) => {
                numberString = numberString+item
            })
            const obj = { Otp: numberString }
            const res = await GetRequest(urls.identityBase, `api/v1/user/otp/verify?Otp=${numberString}`, this.context.state.token);
            console.log(res)
            if(res.isError) {
                const message = res.message;
                const error = [message]
                this.setState({ formErrors: error, loading: false })
            } else {
                const obj = { ...state.userData, isPhoneVerified: true }
                set({ userData: obj })
                this.checkEmailVerification()
                await setUser(obj)
            }
        }
    }
    checkEmailVerification = () => {
        const { userData } = this.context.state;
        const { navigation, onDecline, openEmail } = this.props
        if(userData.isEmailVerified) {
            this.setState({ loading: false })
            navigation.navigate('HostPropertyStack', {screen: 'HostSteps'})
        } else {
            this.sendMail()
            openEmail()
            setTimeout(() => {
                this.setState({ loading: false})
                onDecline();
            }, 300);
        }
    }

    render() {
        const { visible, onDecline } = this.props;
        const { modalContainer, modalHeader, lineStyle, closeStyle, 
            headerStyle, container, middleRow, bottomRow, inputContainer, topRow, buttonStyle } = styles;
        const { textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textBold, flexRow, imgStyle, textH3Style, textGrey, textWhite, textGreen, textUnderline, textOrange } = GStyles;

        const { userData } = this.context.state
        return (

            <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
               
                <View style={{ flex: 1 }}>
                    {this.renderLoading()}
                    <ScrollView keyboardShouldPersistTaps="always">
                        <View style={modalContainer}>
                        
                            <View style={[flexRow, modalHeader]}>
                                <View style={{ flex: 6, alignItems: 'center'}}>
                                    <View style={lineStyle}></View>
                                </View>
                                <TouchableOpacity style={closeStyle} onPress={onDecline}>
                                    <Icon type="Feather" name="x" />
                                </TouchableOpacity>
                            </View>
                            <View style={headerStyle}>
                                <MyText style={[textH3Style, textExtraBold, textOrange, textCenter]}>
                                    To proceed, kindly verify your phone number
                                </MyText>
                            </View>
                            <View style={container} >
                                
                                <View style={topRow}>
                                    <MyText style={[textH4Style, textGrey, textCenter, { lineHeight: 25}]}>
                                        An OTP code has been sent to {userData.phoneNumber} Kindly enter below the 6 digit code 
                                        {/* or {' '}
                                        <TouchableOpacity >
                                        <MyText style={[textOrange, textUnderline, textBold, { marginBottom: -4}]}>Change Phone Number</MyText>
                                        </TouchableOpacity> */}
                                    </MyText>
                                
                                </View>
                                
                                <View style={middleRow}>
                                    <View>
                                        <View style={inputContainer}>
                                            {this.renderNumberInput()}
                                        </View>
                                        {this.renderSuccessMessage()}
                                    </View>
                                    <View>
                                        <MyText style={[textH4Style, textGrey]}>Didn’t receive a code? {' '}<TouchableOpacity onPress={this.resendCode}>
                                            <MyText style={[textUnderline, textOrange, textBold, { marginBottom: -4}]}>Resend Code</MyText>
                                        </TouchableOpacity></MyText>
                                    </View>

                                    <View style={{paddingTop: 40}}>
                                        <MyText style={[textUnderline, textGreen, textBold, textH5Style]}>Request Call</MyText>
                                    </View>
                                </View>
                                <View style={bottomRow}>
                                    {this.renderError()}
                                    <CustomButton onPress={this.SuccessScreen} buttonText="Next" buttonStyle={buttonStyle} onPress={this.verifyOtp} />
                                </View>
                            </View>
                            
                        
                        </View>
                    
                    </ScrollView>
                </View>
                
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    
    modalContainer: {
        backgroundColor: colors.white, 
        height: Dimensions.get('window').height - 20
        // paddingHorizontal: 20
    },
    modalHeader: {
        marginTop: 30, marginBottom: 30, alignItems: 'center',
        paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 20, paddingHorizontal: 20
    },
    lineStyle: {
        width: '20%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
    },
    closeStyle: {
        height: 30, flex: 1, justifyContent:'flex-end',alignItems: 'flex-end'
    },
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24,
        // paddingTop: 130,
        flex: 1,
      },
      topRow: {
        flex: 1,
        // borderWidth: 1
      },
      middleRow: {
          justifyContent: 'center',
          alignContent: 'space-between',
          flex: 3,
        //   borderWidth: 1
      },
      bottomRow: {
          justifyContent: 'flex-end',
          paddingBottom: 30,
          flex: 2.5,
        //   borderWidth: 1
      },
      inputContainer: {
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
          width: '100%', marginBottom: 60, 
      },
      buttonStyle: {
        elevation: 1
      }
});

export default OtpModal;
