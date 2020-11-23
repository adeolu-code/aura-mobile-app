/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component, Fragment } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback, ScrollView, Dimensions, Keyboard
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, CustomInputNumber, PhoneNumberInput, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider';
import { setContext, Request, GetRequest, urls } from '../../utils';
import { setUser } from '../../helpers';


class ChangeNumberModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { country: '', loading: false, formErrors: [], message: '', changeNumber: false, phoneNumber: '' };
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
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    update = async () => {
        const number = this.formatNumber();
        const obj = { phoneNumber: number }
        this.setState({ loading: true })
        let res = await Request(urls.identityBase + urls.v , 'user/update', obj);
        this.setState({ loading: false })
        console.log('Res update ', res)
        if (res.isError || res.IsError) {
            const message = res.Message;
            const error = [message]
            this.setState({ formErrors: error})
        }
        else {
            this.setState({ message: 'Phone number updated successfully!!'})
            setTimeout(() => {
                this.setState({ message: ''})
            }, 5000);
            /** update context **/
            let userData = this.context.state.userData;
            this.context.set({userData: {...userData, ...res.data}});
        }
    }
    formatNumber = () => {
        const { country, phoneNumber } = this.state;
        const number = `+${country.callingCode[0]}${phoneNumber}`;
        return number;
    }
    
    
    getCountry = (country) => {
        this.setState({ country })
    }
    onBlurPhone = () => {
        // const { phoneNumber } = this.state;
        // phoneNumber === '' ? this.setState({ phoneErrors: ['Phone number is required'] }) : this.setState({ phoneErrors: [] })
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
                                    Update Phone Number
                                </MyText>
                            </View>
                            <View style={container} >
                                
                                
                                <View style={middleRow}>
                                    <View>
                                        <View style={inputContainer}>
                                            <PhoneNumberInput getCountry={this.getCountry} label="Phone Number (81XXXXXXXX)" placeholder="Phone number" 
                                            value={this.state.phoneNumber} onChangeText={this.onChangeValue} attrName="phoneNumber" onBlur={this.onBlurPhone} />
                                        </View>
                                        {this.renderSuccessMessage()}
                                    </View>
                                    
                                </View>
                                <View style={bottomRow}>
                                    {this.renderError()}
                                    <CustomButton onPress={this.SuccessScreen} buttonText="Continue" buttonStyle={buttonStyle} 
                                    onPress={this.update} disabled={this.state.phoneNumber === ''} />
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
        width: '100%', marginBottom: 60, 
      },
      buttonStyle: {
        elevation: 1
      }
});

export default ChangeNumberModal;
