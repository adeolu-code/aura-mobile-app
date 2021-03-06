/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback,
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, CustomInputNumber, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider';
import { setContext, urls, GetRequest } from '../../utils';
import TermsModal from '../../components/dashboard/TermsModal';


class EmailVerificationModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, formErrors: [], message: '' };
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
        const { textOrange, textH4Style, textCenter, textSuccess } = GStyles
        if(message) {
            return (
                <View>
                    <MyText style={[textH4Style, textSuccess, textCenter]}>{message}</MyText>
                </View>
            )
        }
    }
    
    skip = async () => {
        if(this.props.next) {
            this.props.onDecline('next');
        } else {
            this.props.onDecline();
            this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSteps'})
        }
    }
    checkVerified = () => {
        this.setState({ loading: true, formErrors: [] })
        this.context.getUserProfile(this.context.state.token.access_token)
        .then((res) => {
            this.setState({ loading: false })
            if(res.isEmailVerified) {
                if(this.props.next) {
                    this.props.onDecline('next');
                } else {
                    this.props.onDecline('success');
                    if(!this.props.close) {
                        this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSteps'})
                    }
                }
                
            } else {
                this.setState({ formErrors: ['Email verification failed']})
            }
        })
        .catch((error) => {
            this.setState({ formErrors: ['Something went wrong please try again'], loading: false })
        })
    }
    resendMail = async () => {
        const { userData } = this.context.state
        try {
            this.setState({ loading: true, formErrors: [] })
            const res = await GetRequest(urls.identityBase, `api/v1/user/email/verification/resend/${userData.username}`);
            if(res.isError) {
                const message = res.message;
                const error = [message]
                this.setState({ formErrors: error})
            } else {
                this.setState({ message: 'Email verification link resent successfully!!'})
                setTimeout(() => {
                    this.setState({ message: ''})
                }, 5000);
            }
            this.setState({ loading: false })  
        } catch (error) {
            
        }
        
    }
    

    render() {
        const { visible, onDecline, close } = this.props;
        const { modalContainer, modalHeader, lineStyle, closeStyle, 
            headerStyle, container, middleRow, bottomRow, inputContainer, topRow, buttonStyle } = styles;
        const { textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textBold, flexRow, imgStyle, textH3Style, textGrey, textWhite, textGreen, textUnderline, textOrange } = GStyles;

        const { userData } = this.context.state
        return (

            <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
                <View style={{ flex: 1 }}>
                    {this.renderLoading()}
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
                                To proceed, kindly verify your email
                            </MyText>
                        </View>
                        <View style={container}>
                            
                            <View style={topRow}>
                                <MyText style={[textH4Style, textGrey, textCenter, { lineHeight: 25}]}>
                                    A verification link has been sent to your email <MyText style={[textBold]}>{userData ? userData.email : ''} </MyText>
                                </MyText>
                            
                            </View>
                            
                            <View style={middleRow}>
                                <View>
                                    <View style={inputContainer}>
                                        <CustomButton buttonText="Resend Mail" buttonStyle={buttonStyle} 
                                        textStyle={{ color: colors.orange}} onPress={this.resendMail} />
                                    </View>
                                    {this.renderSuccessMessage()}
                                </View>

                            </View>
                            <View style={bottomRow}>
                                {!close ? <MyText style={[textH4Style, textGrey]}>Don't have access to your mail? {" "}<TouchableOpacity onPress={this.skip}>
                                    <MyText style={[textUnderline, textOrange, textBold, { marginBottom: -4}]}>Skip this</MyText>
                                </TouchableOpacity></MyText> : <></>}
                                <View style={{paddingHorizontal: 20, paddingTop: 20, width: '100%'}}>
                                    {this.renderError()}
                                    <CustomButton buttonText="I have verified my account" onPress={this.checkVerified} />
                                </View>
                            </View>
                        </View>
                        
                        
                    </View>
                    
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    
    modalContainer: {
        backgroundColor: colors.white, flex: 1
        // paddingHorizontal: 20
    },
    modalHeader: {
        marginTop: 30, marginBottom: 40, alignItems: 'center',
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
        flex: 3, paddingHorizontal: 20,
    //   borderWidth: 1
    },
    bottomRow: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50,
        flex: 2.5,
    //   borderWidth: 1
    },
      inputContainer: {
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
          width: '100%', marginBottom: 60, 
      },
      buttonStyle: {
        elevation: 1, borderWidth: 1, borderColor: colors.orange, backgroundColor: colors.white
      }
});

export default EmailVerificationModal;
