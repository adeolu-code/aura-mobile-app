/* eslint-disable prettier/prettier */
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
import {LabelInput as EditInput} from "./../../components/label_input/labelInput.component";

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
                            <EditInput 
                                phone 
                                label={"Phone Number"} 
                                placeholder={"812345678"} 
                                itemStyle={Styles.phoneItem} 
                            />
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