import { Container, Content, Footer, Item, Left, Right } from 'native-base';
import React, { Component } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
  } from 'react-native';
import { AppContext } from '../../../AppProvider';
import colors from '../../colors';
import Header from '../../components/Header';
import { MyStyle } from '../../myStyle';
import { Loading, MyText } from '../../utils/Index';
import { Styles } from './bookingsScreen.style';
import GStyles from "./../../assets/styles/GeneralStyles";
import {LabelInput as EditInput, LabelInput} from "../../components/label_input/labelInput.component";
import { getBankApi, getUserBankDetailsApi } from '../../api/profile.api';
import { consoleLog } from '../../utils';
import { cancelBookingAPI } from '../../api/booking.api';

export class CancelBookings extends Component {
    static contextType = AppContext;
  
  constructor(props) {
    super(props);

    this.state = {
        loading: false,
        "booking_Id":"",
        "cancellationReason":"",
        "bankId":"",
        "accountNumber":"",
        "accountName":"",
        banks: [],
        userBank: {accountName: "", accountNumber: ""},
        selectedBank: "",
    };
  }

  componentDidMount() {
    this.getBank();
  }

  renderLoading = () => {
    const {loading } = this.state;
    if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
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

  onSubmit = () => {
      let id = 0;
      if (this.props.route && this.props.route.params && this.props.route.params.booking) {
          id = this.props.route.params.booking.id;
      }

      if (this.state.accountName === "") this.state.accountName = this.state.userBank.accountName;
      if (this.state.accountNumber === "") this.state.accountNumber = this.state.userBank.accountNumber;
      if (this.state.bankId === "") this.state.bankId = this.state.userBank.bank != undefined 
      ? 
          (this.state.selectedBank
              ? this.state.selectedBank
              : this.state.userBank.bank.id
          ) 
      : 
      this.state.selectedBank;

    let data = {
        "booking_Id": id,
        "cancellationReason": this.state.cancellationReason,
        "bankId": this.state.bankId,
        "accountNumber": this.state.accountNumber,
        "accountName": this.state.accountName,
    };

    this.setState({loading: true});
    cancelBookingAPI(data).then(result => {
        if (result) {
            this.setState({loading: false});
        }
    });
  }

  render() {
    const {textCenter, textBold, textH3Style, 
        textWhite    } = GStyles;
    const {params} = this.props.route;
    consoleLog("update_res", "property", this.props.route.params.booking);
      return (
      <>
        <SafeAreaView style={[{flex: 1, backgroundColor: colors.white }]}>
            {this.renderLoading()}
            <Header {...this.props} title={"Cancel Booking"} wrapperStyles={{ paddingBottom: 5}} sub="" />
            <Container style={[Styles.contentContainer]}>
                <Content scrollEnabled={true}>
                    <EditInput
                        label={"Message"} 
                        placeholder={"Cancellation Reason"} 
                        onChangeText={(e) => this.setState({cancellationReason: e})}
                        value={this.state.message}
                        textarea
                        rowSpan={3}
                        style={[{marginBottom: 20}]}
                    />
                    <ItemInfo title="Amount" amount={params.booking.cost_Per_Night} />
                    <ItemInfo title="Total Stay" amount={params.booking.total_Cost} />
                    <ItemInfo title="Deduction" amount={0} />
                    <ItemInfo title="Total Refund" amount={params.booking.total_Cost} />
                    <MyText style={[textH3Style, {marginTop: 20}]}>Account Deposit Details </MyText>
                    <TouchableOpacity>
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
                            onPickerChange={(val) => this.setState({bankId: val})}
                        />  
                        <LabelInput 
                            label={"Account Number"} 
                            placeholder={this.state.userBank.accountNumber != undefined ? this.state.userBank.accountNumber : "XXXXXXXXXXXX"}
                            onChangeText={(val) => this.setState({accountNumber: val})}
                                
                        /> 
                    </TouchableOpacity>
                </Content>
                <Footer style={[MyStyle.footer, MyStyle.transparent]}>
                    <TouchableOpacity
                        style={[MyStyle.nextButton, {height: 40, borderRadius: 5}]}
                        onPress={() => this.onSubmit()}
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

const ItemInfo = (props) => {
    const {textCenter, textH3Style    } = GStyles;
    return (
        <Item style={[{padding: 10}]}>
            <Left>
                <MyText style={[textH3Style, textCenter]}>{props.title}</MyText>
            </Left>
            <Right>
                <MyText style={[textH3Style, textCenter]}>NGN {props.amount}/night</MyText>
            </Right>
        </Item>
    );
}