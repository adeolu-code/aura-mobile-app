import React,{ Component } from "react";
import { StatusBar, SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "../payment/payment.style";
import { MyText, CustomButton, Loading, Error } from "../../utils/Index";
import { View, Icon } from "native-base";
import GStyles from "../../assets/styles/GeneralStyles";
import StarComponent from '../../components/StarComponent';
import { LabelInput } from "../../components/label_input/labelInput.component";

import { setContext, Request, urls, GetRequest, errorMessage } from '../../utils';

import moment from 'moment';
import { formatAmount } from '../../helpers'


class ConfirmAndPay extends Component {
  constructor(props) {
    super(props);
    this.state = { paymentTypes: [], selectedId: '', loading: false, booked: '', bookedId: '', gettingPayments: false, 
    gettingDeductions: false, deductions: '', house: '', formErrors: [] };
    this.state.bookedId = props.route.params?.bookedId;
    this.state.house = props.route.params?.house
  }

  renderLoading = () => {
    const { loading, gettingPayments, gettingDeductions } = this.state;
    if(loading || gettingDeductions ) { return (<Loading />) }
  }
  renderError = () => {
    const { formErrors } = this.state
    if(formErrors.length !== 0) {
      return (<Error errors={formErrors} />)
    }
  }
  componentDidMount = () => {
    this.getBooked();
    this.getDeductions();
    this.getPaymentMethods();
  }
  makePayment = async () => {
    this.setState({ loading: true })
    const { booked, selectedId, house } = this.state
    const amount = booked.cost_Per_Night * booked.no_Of_Days
    const obj = {
      reference: booked.id, amount,
      currency: 'NGN',
      paymentMethod: selectedId,
      transactionType: "BOOKING",
      payee: booked.user_Id
    }
    const res = await Request(urls.paymentBase,  `${urls.v}pay`, obj);
    console.log('confirm pay ', res)
    this.setState({ loading: false })
    if(res.isError || res.IsError) {
      this.setState({ formErrors: [res.message] })
    } else {
      this.props.navigation.navigate('HostPropertyStack', { screen: 'PaymentWebView', params: { house, booked, url: res.data }})
    }
  }
  getBooked = async () => {
    const { bookedId } = this.state
    this.setState({ loading: true })
    const res = await GetRequest(urls.bookingBase,  `${urls.v}bookings/property/${bookedId}`);
    console.log('Booked details ', res)
    this.setState({ loading: false })
    if(res.isError) {
        const message = res.Message;
        errorMessage(message)
    } else {
        const data = res.data;
        this.setState({ booked: data })
    }
  }

  getPaymentMethods = async () => {
    this.setState({ gettingPayments: true })
    const res = await GetRequest(urls.paymentBase,  `${urls.v}pay/methods`);
    console.log('Payments ', res)
    this.setState({ gettingPayments: false })
    if(res.isError) {
        const message = res.Message;
        errorMessage(message)
    } else {
        const data = res.data;
        this.setState({ paymentTypes: data })
    }
  }
  getDeductions = async () => {
    this.setState({ gettingDeductions: true })
    const res = await GetRequest(urls.paymentBase,  `${urls.v}deduction/commissioning/retrieve?partner=host&country=Nigeria`);
    console.log('Deductions ', res)
    this.setState({ gettingDeductions: false })
    if(res.isError) {
        const message = res.Message;
        errorMessage(message)
    } else {
        const data = res.data;
        this.setState({ deductions: data })
    }
  }

  renderVerified = () => {
      const { house } = this.state
      const { iconContainer, iconStyle } = styles
      if(house && house.isVerified) {
          return (
            <View style={iconContainer}>
                <Icon type="FontAwesome5" name="check" style={iconStyle} />
            </View>
          )
      } 
  }

  render() {
    const { textWhite, textBold, flexRow, textH4Style, textCenter, imgStyle, textH6Style,
      textExtraBold, textH5Style, textGrey, textGreen, textDarkGrey, textOrange, textSuccess
    } = GStyles;
  const { propertyTypeContainer, bgOrange, bgLightOrange, safeViewContainer, container, checkRow, amountRow, amountContainer } = styles
  const { set, state } = this.context

  const { house, booked, deductions } = this.state
  const imgUrl = house && house.mainImage ? { uri: house.mainImage.assetPath } : require('../../assets/images/no_house1.png')

    return (
      <SafeAreaView style={safeViewContainer}>
        {this.renderLoading()}
        <Header  {...this.props} title="Confirm and Pay" />
        <ScrollView>
        <View style={container}>
            <View style={{ width: '100%', marginBottom: 40 }}>
                <View style={[flexRow, styles.propertyContainer]} >
                    <View style={styles.imgContainer}>
                        <Image source={imgUrl} resizeMode="cover" style={imgStyle} />
                        {this.renderVerified()}
                    </View>
                    <View style={styles.rightContainer}>
                        <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>{house ? house.title : '****'}</MyText>
                        <View style={{marginTop: 6}}>
                            <StarComponent grey rating={house.rating} />
                        </View>
                        <MyText style={[textH5Style, textGrey, { marginBottom: 15}]}>{house ? house.state : ''}</MyText>

                        <MyText style={[textH5Style]}>{house ? house.description : ''}</MyText>
                    </View>
                </View>
            </View>

            {booked ? <View>
              <View style={[flexRow, checkRow]}>
                <View style={{ alignItems: 'center'}}>
                  <MyText style={[textH5Style, textGrey, { marginBottom: 15}]}>CHECK-IN</MyText>
                  <MyText style={[textH4Style, textBold, { marginBottom: 10}]}>{moment(booked.arrival_Time_From, 'hh:mm:ss').format('hh:mm a')}</MyText>
                  <MyText style={[textBold, textH4Style]}>{moment(booked.check_In_Date).format('DD MMM, YYYY')}</MyText>
                  
                </View>
                <View style={{ alignItems: 'center'}}>
                  <MyText style={[textH5Style,textGrey, { marginBottom: 15}]}>CHECK-OUT</MyText>
                  <MyText style={[textH4Style,textBold, { marginBottom: 10}]}>{moment(booked.arrival_Time_To, 'hh:mm:ss').format('hh:mm a')}</MyText>
                  <MyText style={[textBold, textH4Style]}>{moment(booked.check_Out_Date).format('DD MMM, YYYY')}</MyText>
                </View>
                
              </View>

              <View style={[flexRow, checkRow, { borderTopWidth: 0}]}>
                <View style={{ alignItems: 'center'}}>
                  <MyText style={[textH5Style,textGrey, { marginBottom: 30}]}>STAY-DURATION</MyText>
                  <MyText style={[textBold, textH4Style]}>{booked.no_Of_Days} days</MyText>
                </View>
                <View style={{ alignItems: 'center'}}>
                  <MyText style={[textH5Style,textGrey, { marginBottom: 30}]}>GUEST(S)</MyText>
                  <MyText style={[textBold, textH4Style]}>{booked.no_Of_Guest} Guest(s)</MyText>
                </View>
                <View style={{ alignItems: 'center'}}>
                  <MyText style={[textH5Style,textGrey, { marginBottom: 30}]}>ROOM(S)</MyText>
                  <MyText style={[textBold, textH4Style]}>{booked.no_Of_Rooms} Room(s)</MyText>
                </View>
              </View>

              <View style={[flexRow, checkRow, { borderTopWidth: 0}]}>
                <View>
                  <MyText style={[textH5Style,textGrey, { marginBottom: 10}]}>BOOKING REFERENCE</MyText>
                  <MyText style={[textBold, textH4Style]}>{booked.propertyInfo.id}</MyText>
                </View>
              </View>

            </View> : <></>}

            <View style={[ amountContainer]}>
              {booked ? <View style={[flexRow,amountRow]}>
                  <MyText style={[textGrey, textH4Style]}>Amount</MyText>
                  <MyText style={[textH4Style, textSuccess, textH4Style, textBold]}>₦ {formatAmount(booked.cost_Per_Night)} / night</MyText>
              </View> : <></>}
              <View style={[flexRow, amountRow]}>
                <View>
                  <MyText style={[textGrey, textH4Style]}>Amount ( * {booked.no_Of_Days} nights)</MyText>
                </View>
                {booked ? <View>
                  <MyText style={[textH4Style, textSuccess, textH4Style, textBold]}>₦ {formatAmount(booked.cost_Per_Night * booked.no_Of_Days)}</MyText>
                </View> : <></>}
              </View>
              <View style={[flexRow, amountRow]}>
                <View>
                  <MyText style={[textGrey, textH4Style]}>VAT and Other Charges</MyText>
                </View>
                {booked && deductions ?<View>
                  <MyText style={[textH4Style, textSuccess, textH4Style, textBold]}>₦ {formatAmount((booked.cost_Per_Night * booked.no_Of_Days)/((deductions.total)/100 + 1))}</MyText>
                </View> : <></>}
              </View>
            </View>
            <View>
              <View style={[flexRow,amountRow]}>
                  <MyText style={[textGrey, textH4Style, textBold]}>Total Amount</MyText>
                  <MyText style={[textH4Style, textSuccess, textH4Style, textBold]}>₦ {formatAmount(booked.cost_Per_Night * booked.no_Of_Days)}</MyText>
              </View>
            </View>

            <View style={{ marginBottom: 30, marginTop: 30}}>
              <LabelInput label={"Select A Payment Method"} picker labelStyle={[textGrey]} placeholder="Choose a payment Option"
                      pickerOptions={this.state.paymentTypes.map(type => {
                          return {
                              label: type.name,
                              value: type.name,
                          }
                      })}
                      selectedOption={this.state.selectedId || (this.state.paymentTypes.length > 0 ? this.state.paymentTypes[0] : "")}
                      onPickerChange={(e) => this.setState({selectedId: e})}
                  />
            </View>

            <View style={{ marginBottom: 40}}>
              {this.renderError()}
              <CustomButton buttonText="Make Payment" disabled={!this.state.selectedId} buttonStyle={{ elevation: 1, ...GStyles.shadow}} onPress={this.makePayment} />
            </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1, backgroundColor: colors.white,
  },
  container: {
    flex: 1, paddingTop: Platform.OS === 'ios' ? 110 : 140, paddingHorizontal: 20
  },
  propertyContainer: {
    width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8, 
    ...GStyles.shadow
  },
  imgContainer: {
      width: 140, height: 130, borderRadius: 6, overflow: 'hidden', marginRight: 20,
      backgroundColor: colors.lightGrey
      // borderWidth: 1
  },
  rightContainer: {
    flex: 1, 
  },
  checkRow: {
    paddingVertical: 15, borderBottomWidth: 1, borderTopWidth: 1, justifyContent: 'space-between',
    borderColor: colors.lightGrey, paddingHorizontal: 5
  },
  amountContainer: {
    borderBottomWidth: 1, borderColor: colors.lightGrey, paddingVertical: 15,
  },
  amountRow: {
    justifyContent: 'space-between', paddingVertical: 15
  },
  iconContainer: {
      backgroundColor: colors.orange, width: 18, height: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
      position: 'absolute', right: 10, top: 10
  },
  iconStyle: {
      color: colors.white, fontSize: 10
  }
  
});

export default ConfirmAndPay;
