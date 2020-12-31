/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback, Platform
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, CustomInputNumber, Loading, Error, CustomInput } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon, Picker } from 'native-base';
import { AppContext } from '../../../AppProvider';
import { setContext, urls, GetRequest, errorMessage, Request, successMessage } from '../../utils';




class EditBankModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, formErrors: [], message: '', accountName: '', accountNumber: '', banks: [], gettingBanks: false, 
        bankId: '', bankDetails: null };
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
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
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

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.bankDetails !== prevProps.bankDetails) {
            const { bankDetails } = this.props
            this.setState({ accountName: bankDetails.accountName, 
                accountNumber: bankDetails.accountNumber, bankId: bankDetails.bank.id, bankDetails })
        }
    }

    getBank = async () => {
        this.setState({ gettingBanks: true })
        const response = await GetRequest(urls.identityBase, `${urls.v}bank`);
        this.setState({ gettingBanks: false })
        console.log('Bank response ', response)
        if (response.isError) {
            errorMessage(response.message)
        } else {  
            const data = response.data;
            this.setState({ banks: data });
        }
    }

    resolveBankDetails = async () => {
        const { accountNumber, bankId } = this.state
        this.setState({ resolving: true, formErrors: [] })
        const response = await GetRequest(urls.identityBase, 
            `${urls.v}bank/resolveaccount?accountNumber=${accountNumber}&bankId=${bankId}`);
        this.setState({ resolving: false })
        console.log('resolve account ', response)
        if(typeof response === 'string') {
            this.setState({ formErrors: [response]})
        } else {
            if (response.isError) {
                this.setState({ formErrors: [response.message]})
            } else {  
                const data = response.data;
                this.setState({ accountName: data.accountName });
            } 
        }
    }

    renderPickerItem = () => {
        const { banks, gettingBanks } = this.state;
        const { textOrange, textH4Style, textBold } = GStyles
        if(banks.length !== 0) {
            return (<Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                selectedValue={this.state.bankId}
                onValueChange={this.onValueChange}>
                {banks.map(item => {
                    return (
                        <Picker.Item label={item.name} value={item.id} key={item.id} />
                    )
                })}
            </Picker>)
        }
        if(gettingBanks) {
            return (
                <View style={{paddingHorizontal: 20}}>
                    <MyText style={[textBold, textOrange, textH4Style]}>Loading...</MyText>
                </View>
            )
        }
    }
    onValueChange = (value) => {
        this.setState(() => ({ bankId: value }), () => {
            this.checkAccountNumber()
        });
        // this.checkAccountNumber()
    }

    checkAccountNumber = () => {
        const { accountNumber } = this.state
        if(accountNumber !== '') {
            this.resolveBankDetails()
        }
    }
    submitForm = () => {
        const { edit} = this.state
        this.setState({ loading: true, formErrors: [] })
        edit ? this.updateAccount() : this.createAccount()
    }
    updateAccount = async () => {
        const { accountName, accountNumber, bankId, bankDetails } = this.state
        const obj = {
            accountName, accountNumber, bankId, id: bankDetails.id
        }
        const response = await Request(urls.identityBase, `${urls.v}user/bankaccount`, obj, false, 'PATCH');
        this.setState({ loading: false })
        console.log('Submit response', response)
        if (response.isError) {
            this.setState({ formErrors: [response.message] })
        } else {  
            const data = response.data;
            this.props.refresh(data)
            this.props.onDecline()
            setTimeout(() => {
                successMessage('Bank Details Updated Successfully')
            }, 20);
        }
    }

    createAccount = async () => {
        const { accountName, accountNumber, bankId } = this.state
        const { userData } = this.context.state
        const obj = {
            accountName, accountNumber, bankId, userId: userData.id
        }
        const response = await Request(urls.identityBase, `${urls.v}user/bankaccount`, obj);
        this.setState({ loading: false })
        console.log('Submit response', response)
        if (response.isError) {
            this.setState({ formErrors: [response.message] })
        } else {  
            const data = response.data;
            this.props.refresh(data)
            this.props.onDecline()
            setTimeout(() => {
                successMessage('Bank Details added Successfully')
            }, 20);
        }
    }
    componentDidMount = () => {
        this.getBank()
    }
    
    

    render() {
        const { visible, onDecline } = this.props;
        const { modalContainer, modalHeader, lineStyle, closeStyle, 
            headerStyle, container, middleRow, bottomRow, inputContainer, topRow, buttonStyle, picker, overlay } = styles;
        const { textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textBold, flexRow, imgStyle, textH3Style, textGrey, textWhite, textGreen, textUnderline, textOrange } = GStyles;

        const { edit } = this.props

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
                                Payment Settings 
                            </MyText>
                        </View>
                        <View style={container} >
                            
                            <View style={topRow}>
                                <View style={inputContainer}>
                                    <CustomInput label="Account Name" attrName="accountName" value={this.state.accountName} 
                                    placeholder=" " onChangeText={this.onChangeValue} disabled />
                                    
                                </View>

                                <View style={inputContainer}>
                                    <MyText style={[textGrey, textH4Style]}>
                                        Commercial Banks
                                    </MyText>
                                    <View style={picker}>
                                        {this.renderPickerItem()}
                                    </View>
                                </View>

                                <View style={inputContainer}>
                                    <CustomInput label="Account Number" value={this.state.accountName} 
                                    placeholder=" " value={this.state.accountNumber} attrName="accountNumber"
                                    onChangeText={this.onChangeValue} onBlur={this.checkAccountNumber} loading={this.state.resolving} />
                                </View>
                                
                            </View>
                            
                            
                            <View style={bottomRow}>
                                {this.renderError()}
                                <CustomButton buttonText={edit ? "Edit Bank Details" : "Add Bank Details"} onPress={this.submitForm} 
                                disabled={this.state.resolving || this.state.accountNumber === '' || this.state.formErrors.length !== 0} />
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
        marginTop: 30, marginBottom: 20, alignItems: 'center',
        paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 20, paddingHorizontal: 20, marginBottom: 30
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
        width: '100%', marginBottom: 30, 
      },
      
      buttonStyle: {
        elevation: 1, borderWidth: 1, borderColor: colors.orange, backgroundColor: colors.white
      },
      picker: {
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        borderColor: colors.lightGreyOne,
        marginTop: 10, justifyContent: 'center'
    },
});

export default EditBankModal;
