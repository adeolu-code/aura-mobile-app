import React,{ Component } from "react";
import { SafeAreaView, ScrollView, Image } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { BOOKINGS_NO_BOOKINGS, BOOKINGS_SCREEN_DESCRIPTION } from "../../strings";
import { Styles } from "./payment.style";
import { MyText, CustomButton, Loading } from "../../utils/Index";
import { View } from "native-base";
import GStyles from "../../assets/styles/GeneralStyles";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { AppContext } from "../../../AppProvider";
import { getBankApi, getUserBankDetailsApi, updateUserBankDetailsApi } from "./../../api/profile.api";
import { consoleLog } from "../../utils";

export default class Bank extends Component {
    static contextType = AppContext;
    constructor() {
        super();

        this.state = {
            preLoaded: false,
            loading: false,
            banks: [],
            userBank: {accountName: "", accountNumber: ""},
            selectedBank: "",
            accountName: "",
            accountNumber: "",
            isNewBank: false,
        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.getBank();
    }

    getBank = async () => {
        this.setState({loading: true});
        await getBankApi().then(result => {
            if (result != undefined) {
                result.data.map(bank => {
                    this.setState({banks: [
                        ...this.state.banks,
                        ...[{value: bank.id, label: bank.name}]
                    ]});
                });
            }
        });
        
        getUserBankDetailsApi(this.context.state.userData.id).then(result => {
            console.log("result", JSON.stringify(result), this.context.state.userData.id);
            if (result != undefined && result.data) {
                this.setState({
                    userBank: result.data,
                    accountName: result.data.accountName,
                    accountNumber: result.data.accountNumber,
                    bankId: result.data.bank.id,
                });
            }
            else if (!result.data) {
                // no bannk record
                this.setState({isNewBank: true});
            }
        })
        
        this.setState({loading: false});
    }

    onAddPaymentClick = async () => {
        this.setState({loading: true});
        let data = {
            "bankId": this.state.selectedBank,
            "accountName": this.state.accountName,
            "accountNumber": this.state.accountNumber,
        };

        if (!this.state.isNewBank) {
            data["id"]  = this.state.userBank.id;
            // data['userId'] = this.context.state.userData.id;
        }

        await updateUserBankDetailsApi(data);
        this.setState({loading: false});
    }

    renderLoading = () => {
        const {loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
      }

    render() {
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={ "Bank Details"} />
                    {this.renderLoading()}
                    <View style={[Styles.container, {marginTop: 130}]}>                    
                        <ScrollView>
                            <>
                                <LabelInput 
                                    label={"Account Name"} 
                                    placeholder={this.state.userBank.accountName ? this.state.userBank.accountName : "Account Name"}
                                    itemStyle={{marginLeft: 5}}
                                    onChangeText={(val) => this.setState({accountName: val})}
                                />  
                                <LabelInput 
                                        label={"Commercial Bank"} 
                                        picker
                                        placeholder={""}
                                        itemStyle={{marginLeft: 5}}
                                        pickerOptions={this.state.banks.sort(function(a, b) {
                                            var textA = a.label.toUpperCase();
                                            var textB = b.label.toUpperCase();
                                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                                        })}
                                        selectedOption={this.state.userBank.bank != undefined 
                                            ? 
                                                (this.state.selectedBank
                                                    ? this.state.selectedBank
                                                    : this.state.userBank.bank.id
                                                ) 
                                            : 
                                            this.state.selectedBank}
                                        //
                                        onPickerChange={(val) => this.setState({selectedBank: val})}
                                    />  
                                <LabelInput 
                                        label={"Account Number"} 
                                        placeholder={this.state.userBank.accountNumber != undefined ? this.state.userBank.accountNumber : "XXXXXXXXXXXX"}
                                        onChangeText={(val) => this.setState({accountNumber: val})}
                                        
                                /> 
                                {/* <View style={[Styles.rowView]}>
                                    <LabelInput 
                                        label={"Country"} 
                                        placeholder={""}
                                        itemStyle={{width: "50%", marginLeft: 5}}
                                    />  
                                    <LabelInput 
                                        label={"State"} 
                                        placeholder={""}
                                        itemStyle={{width: "45%", marginLeft: 5}}
                                    />  
                                </View>
                                <View style={[Styles.rowView]}>
                                    <LabelInput 
                                        label={"City"} 
                                        placeholder={""}
                                        itemStyle={{width: "50%", marginLeft: 5}}
                                    />  
                                    <LabelInput 
                                        label={"Zip Code"} 
                                        placeholder={""}
                                        itemStyle={{width: "45%", marginLeft: 5}}
                                    />  
                                </View> */}
                                
                                <CustomButton
                                    buttonText={"Save Bank"} 
                                    buttonStyle={[Styles.buttonStyle, {height: 50}]} textStyle={[Styles.customTextStyle]} 
                                    onPress={() => this.onAddPaymentClick()}
                                />
                            </>
                            
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}