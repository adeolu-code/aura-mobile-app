import React, { Component } from "react";
import { Styles } from "./host.style";
import { Input, Picker } from "native-base";
import { MyText, CustomButton, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { SafeAreaView, StyleSheet, Keyboard, Platform, View, ScrollView } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors"; 
import TipViewComponent from "../../components/tip_view/tipView.component";
import { GLOBAL_PADDING } from "../../utils";

import { AppContext } from '../../../AppProvider';
import { urls, Request, GetRequest, errorMessage, SCREEN_HEIGHT } from '../../utils';
import { formatAmount, formatDecimal } from '../../helpers'

export default class SetPricing extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { gettingCommissions: false, commissions: '', gettingAveragePrice: false, averagePrice: '', price: '', 
        estEarning: 0, commissionAndVAT: 0, submitting: false, loading: false, currency: 'Naira' }
    }

    renderLoading = () => {
        const { loading, submitting, gettingCommissions } = this.state;
        if (loading || submitting || gettingCommissions) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 1000 }} />); }
    }

    getCommissions = async () => {
        const { state } = this.context
        const propertyFormData = state.propertyFormData
        try {
            this.setState({ gettingCommissions: true })
            const res = await GetRequest(urls.paymentBase, `${urls.v}deduction/commissioning/retrieve?partner=host&country=${propertyFormData.country}`);
            this.setState({ gettingCommissions: false })
            if(res.IsError || res.isError) {
                errorMessage('something is not right')
            } else {
                this.setState({ commissions: res.data })
                const { state } = this.context
                const ppty = state.propertyFormData;
                if(ppty && state.edit) {
                    this.onPriceChange(""+ppty.pricePerNight)
                }
            }
        } catch (error) {
            this.setState({ gettingCommissions: false })
        }
        
    }
    getAveragePrice = async () => {
        const { state } = this.context
        const propertyFormData = state.propertyFormData
        try {
            this.setState({ gettingAveragePrice: true })
            const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/averagePrice/?propertyId=${propertyFormData.id}`);
            this.setState({ gettingAveragePrice: false })
            console.log(res)
            if(res.IsError || res.isError) {
                errorMessage('something is not right')
            } else {
                this.setState({ averagePrice: res.data })
            }
        } catch (error) {
            this.setState({ gettingAveragePrice: false })
        }
        
    }

    onPriceChange = (text) => {
        const { commissions } = this.state;
        const auraCommissionAmount = +text * (commissions.auraCommission / 100);
        const taxAmount = auraCommissionAmount * (commissions.tax / 100);
        const deductionInTotal = auraCommissionAmount + taxAmount;

        const estEarning = +text - deductionInTotal
        // console.log(formatAmount('20.3940'))

        // this.setState({ price: text, commissionAndVAT: deductionInTotal, estEarning: (Math.floor(+text - deductionInTotal)).toString() })
        this.setState({ price: text, commissionAndVAT: deductionInTotal, estEarning: formatDecimal(+text - deductionInTotal).toString() })
        // const vat = +text * (commissions.total/100)
        // const estEarning = +text - vat
        // this.setState({ price: text, commissionAndVAT: vat, estEarning })

        // const auraCommissionAmount = value * (deductions.auraCommission / 100);
        // const taxAmount = auraCommissionAmount * (deductions.tax / 100);
        // const tourDeductionInTotal = auraCommissionAmount + taxAmount;
        // this.setState({ estimatedEarning: (Math.floor(value - tourDeductionInTotal)).toString(), commission: tourDeductionInTotal })
    }
    

    componentDidMount = () => {
        this.getAveragePrice();
        this.getCommissions()
        
    }

    renderAveragePrice = () => {
        const { gettingAveragePrice, averagePrice } = this.state
        const { textH4Style, textBold, textOrange } = GStyles
        if(gettingAveragePrice) {
            return (
                <View style={{paddingHorizontal: 21}}>
                    <MyText style={[textBold, textOrange, textH4Style]}>Loading...</MyText>
                </View>
            )
        }
        return (
            <View style={[Styles.averageItemParent, {marginTop: 20}]}>
                <View>
                    <AverageItem title={"Apartments"} average={averagePrice ? `₦ ${formatAmount(averagePrice)} / night` : `₦ 0 / night` } />
                </View>
                <View>
                    <AverageItem title={"Hotels"} average={averagePrice ? `₦ ${formatAmount(averagePrice)} / night` : `₦ 0 / night` } />    
                </View>
            </View>
        )
    }

    submitOtherInformation = async () => {
        const { price, currency  } = this.state
        const { propertyContext, appContext } = this.props
        const propertyFormData = appContext.state.propertyFormData

        const obj = {
            pricePerNight: price,
            currency,
            // checkInTimeFrom: propertyFormData.checkInTimeFrom,
            // checkInTimeTo: propertyFormData.checkInTimeTo,
            daysToNotifyHost: propertyFormData.daysToNotifyHost,
            bookingRequirements: propertyFormData.bookingRequirements,
            minimumDaysUsable: propertyFormData.minimumDaysUsable,
            maximumDaysUsable: propertyFormData.maximumDaysUsable,
            houseRules: propertyFormData.houseRules,
            maxPreBokingDays: propertyFormData.maxPreBokingDays,
            id: propertyFormData.id
        }
        this.setState({ submitting: true })
        const res = await Request(urls.listingBase, `${urls.v}listing/property/update`, obj);
        this.setState({ submitting: false })
        console.log('Res ',res)
        if(res.isError || res.IsError) {
            errorMessage(res.message)
        } else {
            const data = res.data
            const newObj = { ...propertyFormData, ...data, mainImage: propertyFormData.mainImage }
            appContext.set({ propertyFormData: newObj, step: appContext.state.step + 1 })

            const properties = [ ...propertyContext.state.properties ]
            const pptyArr = this.filterSetProperty(properties, data, propertyFormData)
            
            propertyContext.set({ properties: pptyArr })
            if(data.propertyType.name === 'Apartment') {
                const apartments = [ ...propertyContext.state.apartments ]
                const apsArr = this.filterSetProperty(apartments, data, propertyFormData)
                propertyContext.set({ apartments: apsArr })
            } else {
                const hotels = [ ...propertyContext.state.hotels ]
                const hotelsArr = this.filterSetProperty(hotels, data, propertyFormData)
                propertyContext.set({ hotels: hotelsArr })
            }
            if(!appContext.state.edit) {
                propertyContext.getAllProperties();
                propertyContext.getHotels();
                propertyContext.getApartments();
            }
            this.props.navigation.navigate('GuestPolicy')
        }
    }

    submit = () => {
        Keyboard.dismiss()
        this.submitOtherInformation()
        // this.props.navigation.navigate('GuestPolicy')
    }
    onCurrencyValueChange = (value) => {
        this.setState({ currency: value })
    }

    filterSetProperty = (properties, data, propertyData) => {
        const elementsIndex = properties.findIndex(element => element.id == propertyData.id )
        let newArray = [...properties]
        newArray[elementsIndex] = { ...newArray[elementsIndex], title: data.title, description: data.description, mainImage: propertyData.mainImage}
        return newArray
    }


    render() {
        const {
            textBold, textGrey, textGreen, textOrange,
            textH4Style,
            textCenter,
            textWhite,
            textH3Style,
            textH5Style,
            textlightGreyTwo,
          } = GStyles;
        const markedDates = Object.assign({}, this.state.selectedDays)
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header {...this.props}  title="Set Your Pricing" wrapperStyles={{ position: 'relative'}}  />
                    <View style={[Styles.container, {marginTop: 0, padding: 0, paddingBottom: 10}]}>
                        <ScrollView>
                            <View style={[Styles.rowView, {flexWrap: "wrap", alignItems: "flex-start", paddingHorizontal: 20, paddingTop: 20}]}>
                                <MyText style={[textH4Style]}><MyText style={[textGreen, textBold]}>Tips: </MyText>
                                    <MyText style={[textGrey]}>
                                        Based on your location the average price here is:
                                    </MyText>
                                </MyText>
                            </View>
                            
                            {this.renderAveragePrice()}
                            <View style={[InternalStyles.pad, {marginTop: 10, paddingTop: 30}]}>
                                <MyText style={[textBold, textH3Style, { marginBottom: 5} ]}>
                                    Set Your Base Price
                                </MyText>
                                <MyText style={[textH4Style, textlightGreyTwo, { marginBottom: 10}]}>
                                    This is the default price you will charge guests for your property
                                </MyText>
                                <View style={[Styles.rowView, Styles.pricingInputParent]}>
                                    <Input style={[Styles.pricingInput]} value={this.state.price} onChangeText={this.onPriceChange} 
                                    keyboardType="numeric" disabled={this.state.gettingCommissions} />
                                    <View style={[Styles.pricingPicker, {backgroundColor: colors.lightGrey}]}>
                                        <Picker
                                            mode="dropdown"
                                            textStyle={{color: colors.black }}
                                            selectedValue={"night"}
                                            onValueChange={() => this.onValueChange()}
                                        >
                                            <Picker.Item label="/Night" value="night" />
                                        </Picker>
                                    </View>
                                </View>
                                    
                                <View style={{marginBottom: 40}}>
                                    <MyText style={[textOrange, textH4Style, textBold, { marginBottom: 5}]}>Aura Commission + VAT : ₦ {formatAmount(this.state.commissionAndVAT)}</MyText>
                                    <MyText style={[textOrange, textH4Style, textBold]}>Your Estimated Earning : ₦ {formatAmount(this.state.estEarning)}</MyText>
                                </View>
                                <MyText style={[textH4Style, textlightGreyTwo, {marginTop: 10, marginBottom: 8}]}>Based Currency</MyText>
                                <View style={[Styles.currencyPicker]}>
                                    <Picker
                                        mode="dropdown"
                                        textStyle={{color: colors.black }}
                                        selectedValue={this.state.currency}
                                        onValueChange={this.onCurrencyValueChange}
                                    >
                                        <Picker.Item label="Nigerian Naira" value="Naira" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={{marginBottom: 160, marginTop: 40, paddingHorizontal: 21}}>
                                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.submit} disabled={this.state.price === ''} />
                            </View>
                        </ScrollView>
                        
                    </View>
                </SafeAreaView>
            </>
        )
    }
}

const InternalStyles = StyleSheet.create({
    pad: {
        paddingLeft: GLOBAL_PADDING, 
        paddingRight: GLOBAL_PADDING
    },
})

const AverageItem = (props) => {
    const { textH4Style, textBold } = GStyles
    return (
        <View style={[Styles.rowView, Styles.averageItem, props.style]}>
            <View style={{flex: 1}}>
                <MyText style={[textH4Style, textBold]}>{props.title}</MyText>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <MyText style={[textH4Style, textBold]}>{props.average}</MyText>
            </View>
        </View>
    );
}