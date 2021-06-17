import React, { Component } from "react";
import { Styles } from "./host.style";
import { Input, Picker, Icon } from "native-base";
import { MyText, CustomButton, Loading, Switch, CustomInput, DatePickerTwo } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { SafeAreaView, StyleSheet, Keyboard, Platform, View, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors"; 
import TipViewComponent from "../../components/tip_view/tipView.component";
import DateTimePickerComponent from "../../components/date_time_picker/dateTimePicker.component";

import { GLOBAL_PADDING, successMessage } from "../../utils";

import { AppContext } from '../../../AppProvider';
import { urls, Request, GetRequest, errorMessage, SCREEN_HEIGHT } from '../../utils';
import { formatAmount, formatDecimal } from '../../helpers';
import moment from "moment";
import DiscountComponent from "../../components/DiscountComponent";

export default class setDiscount extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { gettingCommissions: false, commissions: '', price: '', selectedDiscount: '', dateValueOne: '', dateValueTwo: '', fromValue: new Date(), toValue: new Date(),
        estEarning: 0, commissionAndVAT: 0, submitting: false, loading: false, gettingHouse: false, currency: 'Naira',
        applyDiscount: false, discountTitle: '', discountPercent: '', edit: false, }
    }

    renderLoading = () => {
        const { loading, submitting, gettingCommissions, gettingHouse } = this.state;
        if (loading || submitting || gettingCommissions || gettingHouse) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 1000 }} />); }
    }

    toggleApplyDiscount = () => {
        this.setState({ applyDiscount: !this.state.applyDiscount, price: '' })
    }

    getCommissions = async () => {
        const { appContext } = this.props
        const propertyFormData = appContext.state.propertyFormData
        try {
            this.setState({ gettingCommissions: true })
            const res = await GetRequest(urls.paymentBase, `${urls.v}deduction/commissioning/retrieve?partner=host&country=${propertyFormData.country}`);
            this.setState({ gettingCommissions: false })
            if(res.IsError || res.isError) {
                errorMessage('something is not right')
            } else {
                this.setState({ commissions: res.data })
                const { appContext } = this.props
                const ppty = appContext.state.propertyFormData
                if(ppty && appContext.state.edit) {
                    this.onPriceChange(""+ppty.pricePerNight)
                }
            }
        } catch (error) {
            this.setState({ gettingCommissions: false })
        }
        
    }
    

    onPriceChange = (text) => {
        const { commissions, discountPercent } = this.state;
        const { appContext } = this.props
        const ppty = appContext.state.propertyFormData
        const price = ppty.pricePerNight

        const auraCommissionAmount = +text * (commissions.auraCommission / 100);
        const taxAmount = auraCommissionAmount * (commissions.tax / 100);
        const deductionInTotal = auraCommissionAmount + taxAmount;

        this.setState({ price: text, commissionAndVAT: deductionInTotal, estEarning: formatDecimal(+text - deductionInTotal).toString() })
        
    }

    componentDidMount = () => {
        this.getCommissions()
    }

    submitOtherInformation = async () => {
        const { price, currency  } = this.state
        const { propertyContext, appContext } = this.props
        const propertyFormData = appContext.state.propertyFormData

        const obj = {
            pricePerNight: propertyFormData.pricePerNight,
            currency,
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

    submit = async () => {
        Keyboard.dismiss()
        
        const { discountTitle, discountPercent, dateValueOne, dateValueTwo, toValue, fromValue, applyDiscount, edit  } = this.state
        if(applyDiscount && !edit) {
            const { appContext } = this.props
            const ppty = appContext.state.propertyFormData
            
            const obj = {
                discountEndDate: dateValueTwo.toISOString(),
                discountEndTime: moment(toValue, "hh:mm:ss").format("HH:mm:ss"),
                discountStartDate: dateValueOne.toISOString(),
                discountStartTime: moment(fromValue, "hh:mm:ss").format("HH:mm:ss"),
                discountTitle,
                discountValue: discountPercent,
                propertyId: ppty.id
            }
            this.setState({ submitting: true })
            const res = await Request(urls.listingBase, `${urls.v}listing/property/dynamicpricing`, obj);
            this.setState({ submitting: false })
            console.log('Res ',res)
            if(res.isError || res.IsError) {
                errorMessage(res.message)
            } else {
                this.submitOtherInformation()
            }
        } else {
            this.submitOtherInformation()
        }
        
        // this.submitOtherInformation()
    }
    onCurrencyValueChange = (value) => {
        this.setState({ currency: value })
    }
    disabled = () => {
        const { discountPercent, discountTitle, dateValueOne, dateValueTwo, fromValue, toValue, edit, applyDiscount } = this.state
        const { appContext } = this.props
        const ppty = appContext.state.propertyFormData

        if((!ppty.pricings || edit) && !applyDiscount ) {
            return true
        }
        if(!edit && applyDiscount) {
            if(discountTitle === '' || discountPercent === '' || dateValueOne === '' || dateValueTwo === '' || fromValue === '' || toValue === '') {
                return true
            }
        }
        // if(discountTitle === '' || discountPercent === '' || dateValueOne === '' || dateValueTwo === '' || fromValue === '' || toValue === '') {
        //     return true
        // }
        return false
    }

    filterSetProperty = (properties, data, propertyData) => {
        const elementsIndex = properties.findIndex(element => element.id == propertyData.id )
        let newArray = [...properties]
        newArray[elementsIndex] = { ...newArray[elementsIndex], title: data.title, description: data.description, mainImage: propertyData.mainImage}
        return newArray
    }
    onChangeName = (value) => {
        this.setState({ discountTitle: value })
    }

    onChangePercent = (value) => {
        const { commissions } = this.state;
        const { appContext } = this.props
        const ppty = appContext.state.propertyFormData

        const price = ppty.pricePerNight
        const getP = price - (+value/100 * price)

        const auraCommissionAmount = getP * (commissions.auraCommission / 100);
        const taxAmount = auraCommissionAmount * (commissions.tax / 100);
        const deductionInTotal = auraCommissionAmount + taxAmount;

        this.setState({ discountPercent: value, commissionAndVAT: deductionInTotal, estEarning: formatDecimal(+getP - deductionInTotal).toString() })
    }

    onDatePickOne = (value) => {
        const newDate = new Date(value);
        this.setState({ dateValueOne: newDate })
    }

    onDatePickTwo = (value) => {
        const newDate = new Date(value);
        this.setState({ dateValueTwo: newDate })
    }
    fromValue = (date) => {
        this.setState({ fromValue: date })
    }
    toValue = (date) => {
        this.setState({ toValue: date })
    }
    onChangePrice = () => {
        this.props.navigation.goBack()
    }
    onCancelEdit = () => {
        this.setState({ edit: false, applyDiscount: false, price: '' })
    }
    editPrice = (item) => {
        this.setState({ edit: true, applyDiscount: true, price: item })
    }
    setLoader = (value) => {
        this.setState({ loading: value })
    }
    deletePrice = (item) => {
        const { property, onDecline } = this.props 
        Alert.alert(
            "Delete Discount",
            "Are you sure, you want to delete this discount",
            [
              {
                text: "Cancel",
                onPress: this.cancelDelete,
                style: "cancel"
              },
              { text: "OK", onPress: () => { this.acceptedDelete(item) } }
            ],
            { cancelable: false }
        );    
    }
    setFormData = (obj) => {
        this.setState((prevState) => ({ ...prevState, discountTitle: obj.discountTitle, discountPercent: obj.discountPercent,
        dateValueOne: obj.dateValueOne, dateValueTwo: obj.dateValueTwo, fromValue: obj.fromValue, toValue: obj.toValue }))

    }
    cancelDelete = () => {
        // console.log('Got here 1')
    }
    acceptedDelete = async (item) => {
        const { appContext } = this.props
        const ppty = appContext.state.propertyFormData
        
        this.setState({ loading: true })
        const res = await Request(urls.listingBase, `${urls.v}listing/property/dynamicpricing?id=${item.id}`, null, false, "DELETE");
        this.setState({ loading: false })
        console.log('Res ',res)
        if(res.isError || res.IsError) {
            errorMessage(res.message)
        } else {
            const arr = [...ppty.pricings]
            const priceIndex = arr.findIndex(x => x.id === item.id )
            arr.splice(priceIndex, 1)
            appContext.set({ propertyFormData: { ...ppty, pricings: arr } })
            successMessage('Discount deleted successfully !!')
            // this.props.navigation.navigate('GuestPolicy')
        }
    }

    renderCreatedDiscounts = () => {
        const { flexRow } = GStyles
        const { appContext } = this.props
        const ppty = appContext.state.propertyFormData

        if(ppty.pricings && ppty.pricings.length !== 0) {
            return ppty.pricings.map((item) => {
                return (
                    <View style={[flexRow, { marginTop: 25}]} key={item.id}>
                        <View style={internalStyles.itemContainer}>
                            <MyText>{item.discountTitle}</MyText>
                        </View>
                        <View style={[flexRow, { flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                            <TouchableOpacity onPress={this.editPrice.bind(this, item)}>
                                <Icon type="Feather" name="edit" style={{ fontSize: 22, marginRight: 15, color: colors.grey}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.deletePrice.bind(this, item)}>
                                <Icon type="Feather" name="trash-2" style={{ fontSize: 22, color: colors.grey }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            })
        }
    }

    renderDiscountComponent = () => {
        const { appContext } = this.props
        const ppty = appContext.state.propertyFormData

        if(this.state.applyDiscount) {
            return (
                <DiscountComponent estEarning={this.state.estEarning} commissions={this.state.commissions} price={this.state.price}
                commissionAndVAT={this.state.commissionAndVAT} property={ppty} getPercentValue={this.onChangePercent} 
                edit={this.state.edit} cancel={this.onCancelEdit} loading={this.setLoader} setContext={appContext.set} setFormData={this.setFormData} />
            )
        }
    }


    render() {
        const {
            textBold, textGrey, textGreen, textOrange, flexRow, textUnderline, textBlack, textSuccess, textLightBlack,
            textH4Style, textCenter, textWhite, textH3Style, textH5Style, textlightGreyTwo,
          } = GStyles;
          const { appContext } = this.props
          const ppty = appContext.state.propertyFormData

        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header {...this.props}  title="Set Your Discount" wrapperStyles={{ position: 'relative'}}  />
                    <View style={[Styles.container, {marginTop: 0, padding: 0, paddingBottom: 10}]}>
                        <ScrollView>
                            <View style={{ paddingHorizontal: 20}}>
                                <View style={[flexRow]}>
                                    <View style={{ width: '60%'}}>
                                        <CustomInput disabled label="Based Price" value={`₦${ppty.pricePerNight}`} />
                                    </View>
                                    <Pressable onPress={this.onChangePrice}
                                    style={{ width: '40%', justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 20}}>
                                        <MyText style={[textUnderline, textOrange, textBold ]}>Change Base Price</MyText>
                                    </Pressable>
                                </View>
                                {this.renderCreatedDiscounts()}
                                {!this.state.edit && <TouchableOpacity style={{ marginTop: 15}} onPress={this.toggleApplyDiscount}>
                                    <MyText style={[textUnderline,textOrange, textBold, { marginBottom: 15 }]}>Add Discount Plan</MyText>
                                </TouchableOpacity>}
                            </View>

                            <View style={{ height: 3, backgroundColor: colors.lightGreyOne, width: '100%', marginBottom: 20, marginTop: 10 }} />
                            {this.renderDiscountComponent()}
                            
                            <View style={{marginBottom: 160, marginTop: 40, paddingHorizontal: 21}}>
                                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.submit} disabled={this.disabled()} />
                            </View>
                        </ScrollView>
                        
                    </View>
                </SafeAreaView>
            </>
        )
    }
}

const internalStyles = StyleSheet.create({
    pad: {
        paddingLeft: GLOBAL_PADDING, 
        paddingRight: GLOBAL_PADDING
    },
    activeContainer: {
        height: 24, width: 24, borderRadius: 30, borderWidth: 1, borderColor: colors.success, padding: 5
    },
    circleStyle:{
        height: 24, width: 24, borderRadius: 30, borderWidth: 2, borderColor: colors.lightGreyOne
    },
    activeStyle: {
        width: '100%', height: '100%', backgroundColor: colors.success, borderRadius: 20
    },
    soonContainer: {
        paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6,
        backgroundColor: colors.lighterGreen, marginLeft: 30
    },
    itemContainer: {
        paddingVertical: 15, backgroundColor: colors.lightGreyOne, borderRadius: 6, paddingHorizontal: 15,
        flex: 1.7, marginRight: 30, borderWidth: 1, borderColor: colors.lightGrey
    }
})


