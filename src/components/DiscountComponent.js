import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Pressable, KeyboardAvoidingView } from 'react-native';
import { Input, Picker, Icon } from "native-base";
import { MyText, DatePickerTwo, CustomButton } from '../utils/Index';
import DateTimePickerComponent from './date_time_picker/dateTimePicker.component';
import GStyles from '../assets/styles/GeneralStyles';
import { Styles } from "../screens/host/host.style";

import colors from '../colors';
import { formatAmount, formatDecimal } from '../helpers';
import moment from 'moment';
import { errorMessage, GetRequest, Request, urls, successMessage } from '../utils';

export default function DiscountComponent(props) {
    const [state, setState] = useState({ discountPercent: '', discountTitle: '', dateValueOne: '', 
    dateValueTwo: '', fromValue: new Date(), toValue: new Date(), earning: '', vat: '', defaultFirstDate: '', defaultTwoDate: '' })

    const { estEarning, commissionAndVAT, commissions, price, edit, property, loading, setContext, setFormData } = props
    const {
        textBold, textGrey, textGreen, textOrange, flexRow, textUnderline, textBlack, textSuccess, textLightBlack,
        textH4Style, textCenter, textWhite, textH3Style,
        textH5Style,
        textlightGreyTwo,
    } = GStyles;
    

    useEffect(() => {
        setState((prevState) => ({ ...prevState, earning: estEarning, vat: commissionAndVAT }))
        checkPrice()
        return () => {
            
        }
    }, [commissions, price])

    const checkPrice = () => {
        
        if(price) {
            const fromValue = moment(`${price.discountStartDate} ${price.discountStartTime}`, 'YYYY-MM-DD HH:mm:ss').format();
            // console.log('from Value',fromValue, new Date(fromValue), moment(new Date(fromValue), "hh:mm:ss").format("HH:mm:ss"),)
            const toValue = moment(`${price.discountEndDate} ${price.discountEndTime}`, 'YYYY-MM-DD HH:mm:ss').format();
            onChangePercent(price.discountValue.toString())
            setState((prevState) => ({ ...prevState, discountPercent: price.discountValue.toString(), 
                discountTitle: price.discountTitle, fromValue, toValue, dateValueOne: new Date(price.discountStartDate), dateValueTwo: new Date(price.discountEndDate),
                defaultFirstDate: new Date(price.discountStartDate), defaultTwoDate: new Date(price.discountEndDate) }))
            
        } else {
            // setState((prevState) => ({ ...prevState, discountPercent: '', 
            //     discountTitle: '', fromValue: new Date(), toValue: new Date()  }))
        }
    }
    const onDatePickOne = (value) => {
        const newDate = new Date(value);
        setState({ ...state, dateValueOne: newDate })
        setFormData({ ...state, dateValueOne: newDate })
    }

    const onDatePickTwo = (value) => {
        const newDate = new Date(value);
        setState({ ...state, dateValueTwo: newDate })
        setFormData({ ...state, dateValueTwo: newDate })
    }
    const onChangeFromValue = (date) => {
        const fromValue = moment(date, "hh:mm:ss").format("HH:mm:ss")
        console.log('fromValue ', date)
        setState({ ...state, fromValue: date })
        setFormData({ ...state, fromValue: date })
    }
    const onChangeToValue = (date) => {
        const toValue = moment(date, "hh:mm:ss").format("HH:mm:ss")
        // console.log(date, toValue)
        setState({ ...state, toValue: date })
        setFormData({ ...state, toValue: date })
    }
    const onChangeName = (value) => {
        setState({ ...state, discountTitle: value })
        setFormData({ ...state, discountTitle: value })
    }
    const getHouse = async () => {
        try {
            const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/${property.id}`);
            loading(false)
            // console.log('Get house ', res)
            successMessage('Updated successfully !!')
            props.cancel()
            if(res.isError) {
                const message = res.Message;
            } else {
                const data = res.data;
                if(data !== null) {
                    // this.setState({ bookingReqValues })
                    setContext({ propertyFormData: { ...property, pricings: data.pricings, currentDiscount: data.currentDiscount,
                        currentAmount: data.currentAmount, isDiscountApplied: data.isDiscountApplied } })
                }
            }
        } catch (error) {
            loading(false)
        }
    }

    const updateAccount = async () => {
        try {
            const obj = {
                discountEndDate: state.dateValueTwo.toISOString(),
                discountEndTime: moment(new Date(state.toValue), "hh:mm").format("HH:mm"),
                discountStartDate: state.dateValueOne.toISOString(),
                discountStartTime: moment(new Date(state.fromValue), "hh:mm").format("HH:mm"),
                discountTitle: state.discountTitle,
                discountValue: state.discountPercent,
                id: price.id
            }
            console.log('Got her ', obj)
            loading(true)
            
            const res = await Request(urls.listingBase, `${urls.v}listing/property/dynamicpricing`, obj, false, "PATCH");
            
            // console.log('Update account ', res)
            if(res.isError) {
                const message = res.message;
                errorMessage(message)
                loading(false)
            } else {
                getHouse()
            }
        } catch (error) {
            loading(false)
        }
    }

    const onCancel = () => {
        props.cancel()
    }

    const onChangePercent = (value) => {
        // const { commissions, getPercentValue } = props;
        // getPercentValue(value)
        const price = property.pricePerNight
        const getP = price - (+value/100 * price)

        const auraCommissionAmount = getP * (commissions.auraCommission / 100);
        const taxAmount = auraCommissionAmount * (commissions.tax / 100);
        const deductionInTotal = auraCommissionAmount + taxAmount;

        setState({ ...state, discountPercent: value, vat: deductionInTotal, earning: formatDecimal(+getP - deductionInTotal).toString() })
        setFormData({ ...state, discountPercent: value, vat: deductionInTotal, earning: formatDecimal(+getP - deductionInTotal).toString() })
    }
    return (
        <KeyboardAvoidingView style={{ paddingHorizontal: 20}} behavior={Platform.OS === 'ios' ? "padding" : null}>
            <View style={{ marginBottom: 20}}>
                <FormField name="Deals" title="Enter Discount Name" onChangeText={onChangeName} keyboardType="default"
                value={state.discountTitle} placeholder="Enter name of discount" />
            </View>
            <View>
                <FormField name="%" title="Enter Percentage Discount" onChangeText={onChangePercent}
                value={state.discountPercent} placeholder="Enter percentage" />
            </View>

            <View style={{marginBottom: 10}}>
                <MyText style={[textOrange, textH4Style, textBold, { marginBottom: 5}]}>Aura Commission + VAT : ₦ {formatAmount(state.vat)}</MyText>
                <MyText style={[textOrange, textH4Style, textBold]}>Your Estimated Earning : ₦ {formatAmount(state.earning)}</MyText>
            </View>

            <View style={{ marginTop: 20 }}>
                <MyText style={[textH5Style, textBold, textBlack]}>Select Days for your Discount</MyText>

                <View style={[flexRow, { marginBottom: 10, marginTop: 10, alignItems: 'center'}]}>
                    <RadioButton title="Monday to Friday" />
                    <View style={internalStyles.soonContainer}>
                        <MyText style={[textH5Style, textSuccess]}>Coming soon</MyText>
                    </View>
                </View>
                <View style={[flexRow, { marginBottom: 10}]}>
                    <RadioButton title="Friday to Sunday " />
                    <View style={internalStyles.soonContainer}>
                        <MyText style={[textH5Style, textSuccess]}>Coming soon</MyText>
                    </View>
                </View>
                
                <RadioButton title="Custom Date" value="friday" />

                <View style={{ marginTop: 20, marginBottom: 10}}>
                    <MyText style={[textBlack, textBold, textH5Style, { marginBottom:10}]}>Pick Date</MyText>
                    <View style={[flexRow, { justifyContent: 'space-between'}]}>
                        <View style={{ width: '48%' }}>
                            <MyText style={[textLightBlack, textH5Style, { marginBottom:5} ]}>From</MyText>
                            
                            <DatePickerTwo receiveData={onDatePickOne} defaultValue={state.defaultFirstDate} />
                        </View>
                        <View style={{ width: '48%'}}>
                            <MyText style={[textLightBlack, textH5Style, { marginBottom:5} ]}>To</MyText>
                            <DatePickerTwo receiveData={onDatePickTwo} defaultValue={state.defaultTwoDate} />
                        </View>
                    </View>
                </View>

                <View style={[Styles.rowView]}>
                    <MyText style={[textLightBlack, textH5Style, {marginTop: 5, flex: 1}]}>From</MyText>
                    <MyText style={[textLightBlack, textH5Style, {marginTop: 5, paddingLeft: 12, flex: 1}]}>To</MyText>
                </View>
                <View style={[Styles.rowView, { justifyContent: 'space-between'} ]}>  
                    <View style={{ width: '48%' }}>  
                                                
                        <DateTimePickerComponent 
                            mode={"time"}
                            onChange={onChangeFromValue}
                            value={state.fromValue}
                            display={Platform.OS ? "spinner" : "clock"}
                            format="hh:mm a"
                            style={{flex: 1 }}
                            minuteInterval={30}
                        />
                    </View>

                    <View style={{ width: '48%'}}>
                        <DateTimePickerComponent mode={"time"}
                            onChange={onChangeToValue}
                            value={state.toValue}
                            // value={this.extractDateTime(this.state.toValue)}
                            display={Platform.OS ? "spinner" : "clock"}
                            format="hh:mm a"
                            style={{flex: 1}}
                            minuteInterval={30}
                        />
                    </View>
                </View>
                {edit && <View style={{ ...GStyles.flexRow, marginTop: 20, flex: 1, justifyContent: 'space-between'}}>
                    <View style={{ width: '48%'}}>
                        <CustomButton buttonText="Cancel" onPress={onCancel} textStyle={{ color: colors.orange }}
                        buttonStyle={{ elevation: 2, backgroundColor: colors.white}} />
                    </View>
                    <View style={{ width: '48%'}}>
                        <CustomButton buttonText="Update" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={updateAccount} />
                    </View>
                </View>}
            </View>
        </KeyboardAvoidingView>
    )
}

const FormField = (props) => {

    const { textH5Style, textBold, textBlack } = GStyles
    return (
        <View>
            <MyText style={[textH5Style, textBold, textBlack]}>{props.title}</MyText>
            <View style={[Styles.rowView, Styles.pricingInputParent, ]}>
                <Input style={[Styles.pricingInput]} value={props.value} onChangeText={props.onChangeText} placeholderTextColor={colors.lightGrey}
                keyboardType={props.keyboardType || "numeric"} disabled={props.disabled} placeholder={props.placeholder} />
                <View style={[Styles.pricingPicker, {backgroundColor: colors.lightGrey, justifyContent: 'center', alignItems: 'center', width: '25%'}]}>
                    <MyText style={[textBold, textH5Style, textBlack]}>{props.name}</MyText>
                </View>
            </View>
        </View>
    )
}

const RadioButton = (props) => {
    const { textH4Style, textBold, flexRow } = GStyles
    return (
        <Pressable style={[flexRow, { marginBottom: 5, marginTop: 10, alignItems: 'center'}]} onPress={props.onPress}>
            <View style={{ marginRight: 10}}>
                {!props.value ? <View style={internalStyles.circleStyle} /> :
                <View style={internalStyles.activeContainer}>
                    <View style={internalStyles.activeStyle} />
                </View>}
            </View>
            <MyText style={[textH4Style]}>{props.title}</MyText>
        </Pressable>
    )
}

const internalStyles = StyleSheet.create({
    
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
        backgroundColor: colors.lighterGreen, marginLeft: 30, marginTop: 8
    },
    itemContainer: {
        paddingVertical: 15, backgroundColor: colors.lightGreyOne, borderRadius: 6, paddingHorizontal: 15,
        flex: 1.7, marginRight: 30, borderWidth: 1, borderColor: colors.lightGrey
    }
})
