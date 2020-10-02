/* eslint-disable prettier/prettier */
import React from "react";
import { Styles } from "./labelInput.style";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { Item, Label, Input, View, Picker, DatePicker, Right, Left, Icon, Textarea } from "native-base";

export const LabelInput = (props) => {
    const dateTime = (props.dateTime == undefined) ? false : ((props.dateTime) ? true : false);
    const picker = (props.picker == undefined) ? false : ((props.picker) ? true : false);
    const phone = (props.phone == undefined) ? false : ((props.phone) ? true : false);
    const icon = (props.icon == undefined) ? false : ((props.icon) ? props.icon : false);
    const textarea = (props.textarea == undefined) ? false : ((props.icon) ? true : false);
    if (dateTime) {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label, props.labelStyle]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <DatePicker
                        defaultDate={new Date()}
                        maximumDate={new Date()}
                        style={[Styles.input, Styles.datePicker]}
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
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label, props.labelStyle]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <Picker
                        selectedValue={props.selectedOption ? props.selectedOption : "Male"}
                        onValueChange={(e) => props.onPickerChange && props.onPickerChange(e)}
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
                <Label style={[Styles.label, props.labelStyle]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <IntlPhoneInput
                        onChangeText={props.onChangeText} 
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
                <Label style={[Styles.label, props.labelStyle]}>{props.label}</Label>
                <View style={[Styles.personalContentView, props.contentViewStyle]}>
                    {/* <Textarea 
                        style={[Styles.textarea, ]}
                    /> */}
                    <Input 
                        placeholder={props.placeholder} 
                        style={[Styles.input, {height: 150, backgroundColor: "red"}]} 
                        maxLength={props.maxLength} 
                        multiline={true}
                    />
                </View>
                
            </Item>
        );
    }
    else 
    {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label, props.labelStyle]}>{props.label}</Label>
                <View style={[Styles.inputView]}>
                    <View style={[Styles.left, {width: (icon ? "90%": "100%" )}]}>
                        <Input 
                            placeholder={props.placeholder} 
                            style={[Styles.input]} 
                            maxLength={props.maxLength} 
                        />
                    </View>
                    {
                        icon &&
                        <View style={[Styles.right]}>
                            <Icon name={props.icon} style={[props.iconStyle]} />
                        </View>
                    }
                    
                    
                </View>
                
            </Item>
        );
    }
}