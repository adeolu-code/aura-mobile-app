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
    const { textGrey } = GStyles
    const dateTime = (props.dateTime == undefined) ? false : ((props.dateTime) ? true : false);
    const picker = (props.picker == undefined) ? false : ((props.picker) ? true : false);
    const phone = (props.phone == undefined) ? false : ((props.phone) ? true : false);
    const icon = (props.icon == undefined) ? false : ((props.icon) ? props.icon : false);
    const textarea = (props.textarea == undefined) ? false : ((props.textarea) ? true : false);
    const secureText = (props.secureText == undefined) ? false : ((props.secureText) ? true : false);
    if (dateTime) {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label, props.labelStyle, textGrey]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <DatePicker
                        defaultDate={props.defaultDate || new Date()}
                        maximumDate={props.maximumDate || new Date()}
                        style={[Styles.input, Styles.datePicker]}
                        
                        onDateChange={(selectedDate) => {
                            consoleLog("e", selectedDate);
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
            <Picker.Item key={0} value={"Male"} label={"Male"} />,
            <Picker.Item key={1} value={"Female"} label={"Female"} />
        ];
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]} disabled={props.disabled || false}>
                <Label style={[Styles.label, props.labelStyle]}>{props.label}</Label>
                <View style={[Styles.personalContentView, { padding: 0}]}>
                    <Picker style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                        selectedValue={props.selectedOption ? props.selectedOption : "Male"}
                        onValueChange={(e) => props.onPickerChange && props.onPickerChange(e)}
                        placeholder={props.placeholder}

                    >
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
            <Item stackedLabel style={[Styles.phoneItem, props.itemStyle]}>
                <Label style={[Styles.label, props.labelStyle, textGrey]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <IntlPhoneInput
                        onChangeText={({dialCode, unmaskedPhoneNumber}) => {
                            if (unmaskedPhoneNumber.startsWith("0")) unmaskedPhoneNumber = unmaskedPhoneNumber.substring(1)
                            props.onChangeText && props.onChangeText(`${dialCode}${unmaskedPhoneNumber}`);
                        }} 
                        defaultCountry="NG" 
                        containerStyle={{height: 45}}
                        phoneInputStyle={{color: "black"}}
                        placeholder={props.placeholder}
                        
                    />
                </View>
                
            </Item>
            // 
        );
    }
    else if (textarea) {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label, props.labelStyle, textGrey]}>{props.label}</Label>
                <View style={[Styles.personalContentView, props.contentViewStyle]}>
                    <Textarea
                        rowSpan={props.rowSpan || 3}
                        placeholder={props.placeholder} 
                        style={[Styles.textarea, props.textInputStyles]}
                        value={props.value}
                        onChangeText={(e) => props.onChangeText && props.onChangeText(e)}
                    />
                    
                    {/* <Input 
                        placeholder={props.placeholder} 
                        style={[Styles.input, {height: 150}, props.textInputStyles]} 
                        maxLength={props.maxLength} 
                        multiline={true}
                        value={props.value}
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
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label, props.labelStyle, textGrey]}>{props.label}</Label>
                <View style={[Styles.inputView]}>
                    <View style={[Styles.left, {width: (icon ? "90%": "100%" )}]}>
                        <Input 
                            placeholder={props.placeholder} 
                            style={[Styles.input]} 
                            maxLength={props.maxLength} 
                            value={props.value}
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