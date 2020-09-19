import React, { Component } from "react";
import { StatusBar, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "./editProfile.style";
import { Form, Item, Label, Input, Container, Content, Footer, View, Picker, DatePicker, Left, Right, Text, Icon } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import IntlPhoneInput from 'react-native-intl-phone-input';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import  from "@react-native-community/picker";

export default class EditProfile extends Component {
    constructor(props) {
        super();

        this.state = {}
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold,textGreen} = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Edit Personal Info" />
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled={true}>
                            <EditInput label={"First Name"} placeholder={"Joshua"} />
                            <EditInput label={"Last Name"} placeholder={"Nwagbo"} />
                            <EditInput label={"Email"} placeholder={"ode@g.com"} />
                            <EditInput phone label={"Phone Number"} placeholder={"812345678"} itemStyle={Styles.phoneItem} />
                            <View style={[Styles.personalInfo]}>
                                <EditInput dateTime label={"Date of Birth"} placeholder={"812345678"} itemStyle={{flex: 0.5, marginLeft: 5}} />
                                <EditInput picker label={"Gender"} itemStyle={{flex: 0.5}} />
                            </View>
                            <Pressable style={[Styles.nextOfKinView]}>
                                <Left>
                                    <MyText style={[textGreen]}>Add next of Kin</MyText>
                                </Left>
                                <Right>
                                    <Icon name={"ios-add-circle-sharp"} style={[Styles.icon]} />
                                </Right>
                            </Pressable>
                        </Content>
                        <Footer style={[Styles.footer]}>
                            <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Save Changes</MyText>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const EditInput = (props) => {
    const dateTime = (props.dateTime == undefined) ? false : ((props.dateTime) ? true : false);
    const picker = (props.picker == undefined) ? false : ((props.picker) ? true : false);
    const phone = (props.phone == undefined) ? false : ((props.phone) ? true : false);
    if (dateTime) {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label]}>{props.label}</Label>
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
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <Picker
                        selectedValue={"Male"}
                        onValueChange={() => console.log('')}
                    >
                        <Picker.Item value={"Male"} label={"Male"} />
                        <Picker.Item value={"Female"} label={"Female"} />
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
                <Label style={[Styles.label]}>{props.label}</Label>
                <View style={[Styles.personalContentView]}>
                    <IntlPhoneInput 
                        onChangeText={props.onChangeText} 
                        defaultCountry="NG" 
                        containerStyle={{height: 45}}
                        phoneInputStyle={{color: "black"}}
                    />
                </View>
                
            </Item>
            // 
        );
    }
    else 
    {
        return (
            <Item stackedLabel style={[Styles.item, props.itemStyle]}>
                <Label style={[Styles.label]}>{props.label}</Label>
                <Input placeholder={props.placeholder} style={[Styles.input]} />
            </Item>
        );
    }
}