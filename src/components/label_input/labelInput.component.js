/* eslint-disable prettier/prettier */
import React from "react";
import { Styles } from "./labelInput.style";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { Item, Label, Input, View, Picker, DatePicker, Icon, Textarea } from "native-base";
import { consoleLog } from "../../utils";
import { Platform } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
/**
 * 
 * @param {*} props
 * 
 *  default input else | dateTime | picker | phone | icon | textarea [bool]
 * 
 * label [string]
 * 
 * onChange | onPickerChange | onChangeText | onIconClick [function] 
 * 
 * pickerOptions [array {label,value} |picker only]
 * 
 */
export const LabelInput = (props) => {
    const { textGrey, textDarkGrey } = GStyles
    const dateTime = (props.dateTime == undefined) ? false : ((props.dateTime) ? true : false);
    const picker = (props.picker == undefined) ? false : ((props.picker) ? true : false);
    const phone = (props.phone == undefined) ? false : ((props.phone) ? true : false);
    const icon = (props.icon == undefined) ? false : ((props.icon) ? props.icon : false);
    const textarea = (props.textarea == undefined) ? false : ((props.textarea) ? true : false);
    const secureText = (props.secureText == undefined) ? false : ((props.secureText) ? true : false);
    const disabled = (props.disabled == undefined) ? false : ((props.disabled) ? true : false);
    if (dateTime) {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle ]} disabled={disabled}>
                <Label style={[Styles.label, props.labelStyle, textDarkGrey]}>{props.label}</Label>
                <View style={[Styles.personalContentView, disabled ? { backgroundColor: 'rgba(0,0,0,0.1)'} : '']}>
                    <DatePicker
                        defaultDate={props.defaultDate || new Date()}
                        maximumDate={props.maximumDate || new Date()}
                        style={[Styles.input, Styles.datePicker]}
                        
                        onDateChange={(selectedDate) => {
                            // consoleLog("e", selectedDate);
                            if (selectedDate != undefined) {
                                props.onChange(selectedDate);
                            }
                        }}
                    />
                </View>
                
            </Item>
        );
    }
    else if (picker) {
        let defaultPickerOptions = [
            <Picker.Item key={0} value={""} label={"Select Gender"} />,
            <Picker.Item key={1} value={"male"} label={"Male"} />,
            <Picker.Item key={2} value={"female"} label={"Female"} />,
            
        ];
        // console.log(props.pickerOptions, props.selectedOption)
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]} disabled={props.disabled || false}>
                <Label style={[Styles.label, props.labelStyle]}>{props.label}</Label>
                <View style={[Styles.personalContentView, { height: 52, padding: 0}]}>
                    <Picker style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                        selectedValue={props.selectedOption ? props.selectedOption : ""}
                        onValueChange={(e) => props.onPickerChange && props.onPickerChange(e)}
                        placeholder={props.placeholder?.toString()}
                        // enabled={disabled}
                        // focusable={disabled}
                        enabled={props.disabled || true}
                        focusable={props.disabled || true}>
                        {
                            props.pickerOptions != undefined ?
                            props.pickerOptions.map((option, index) => {
                                return <Picker.Item key={index} value={option.value} label={option.label} />
                            })
                            :
                            defaultPickerOptions
                        }
                    </Picker>
                </View>
                
            </Item>
        );
    }
    else if (phone) {
        /***
         * 
         * onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
                console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
            };
         */
        return (
            <Item stackedLabel style={[Styles.phoneItem, props.itemStyle]} disabled={disabled}>
                <Label style={[Styles.label, props.labelStyle, textDarkGrey]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <IntlPhoneInput
                        onChangeText={({dialCode, unmaskedPhoneNumber}) => {
                            console.log('Working')
                            if (unmaskedPhoneNumber.startsWith("0")) unmaskedPhoneNumber = unmaskedPhoneNumber.substring(1)
                            props.onChangeText && props.onChangeText(`${dialCode}${unmaskedPhoneNumber}`);
                        }} 
                        defaultCountry="NG" 
                        containerStyle={{height: 45}}
                        phoneInputStyle={{color: "black"}}
                        placeholder={props.placeholder?.toString()}
                        
                    />
                </View>
                
            </Item>
            // 
        );
    }
    else if (textarea) {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]} disabled={disabled}>
                <Label style={[Styles.label, props.labelStyle, textDarkGrey]}>{props.label}</Label>
                <View style={[Styles.personalContentView, props.contentViewStyle]}>
                    <Textarea
                        rowSpan={props.rowSpan || 3}
                        placeholder={props.placeholder?.toString()} 
                        style={[Styles.textarea, props.textInputStyles]}
                        value={props.value && props.value.toString()}
                        onChangeText={(e) => props.onChangeText && props.onChangeText(e)}
                    />
                    
                    {/* <Input 
                        placeholder={props.placeholder?.toString()} 
                        style={[Styles.input, {height: 150}, props.textInputStyles]} 
                        maxLength={props.maxLength} 
                        multiline={true}
                        value={props.value && props.value.toString()}
                        textAlignVertical="top"
                        onChangeText={props.onChangeText}
                    /> */}
                </View>
                
            </Item>
        );
    }
    else 
    {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle, {marginBottom: 20}]} disabled={disabled}>
                <Label style={[Styles.label, props.labelStyle, textGrey]}>{props.label}</Label>
                <View style={[Styles.inputView, disabled ? { backgroundColor: 'rgba(0,0,0,0.1)'} : '']}>
                    <View style={[Styles.left, {width: (icon ? "90%": "100%" ), height: 55, paddingHorizontal: 10},]}>
                        <Input 
                            placeholder={props.placeholder?.toString()} 
                            style={[Styles.input]} 
                            maxLength={props.maxLength} 
                            value={props.value && props.value.toString()}
                            onChangeText={(e) => { props.onChangeText && props.onChangeText(e);}}
                            keyboardType={props.keyboardType || "default"}
                            disabled={props.disabled || false}
                            secureTextEntry={secureText}
                        />
                    </View>
                    {
                        icon &&
                        <View style={[Styles.right]}>
                            <Icon name={props.icon} style={[props.iconStyle]} onPress={() => props.onIconClick && props.onIconClick()} />
                        </View>
                    }
                    
                    
                </View>
                
            </Item>
        );
    }
}