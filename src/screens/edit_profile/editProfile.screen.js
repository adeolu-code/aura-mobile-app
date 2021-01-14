/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StatusBar, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "./editProfile.style";
import { Container, Content, Footer, View, Left, Right, Icon } from "native-base";
import { MyText, Loading } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import {LabelInput as EditInput} from "./../../components/label_input/labelInput.component";
import { AppContext } from "../../../AppProvider";
import { editProfileApi } from "../../api/profile.api";
import { consoleLog } from "../../utils";

// import DateTimePicker from '@react-native-community/datetimepicker';
// import  from "@react-native-community/picker";

export default class EditProfile extends Component {
    static contextType = AppContext;
    constructor() {
        super();

        this.state = {
            email: "",
            dob: new Date("2002-10-31"),
            firstName: "",
            lastName: "",
            phoneNumber: "",
            loading: false,
            emergencyContact: "",
        }
    }

    onUpdateUser = async () => {
        let data = {
            "firstName": this.state.firstName || this.context.state.userData.firstName,
            "lastName": this.state.lastName || this.context.state.userData.lastName,
            "phoneNumber": this.state.phoneNumber || this.context.state.userData.phoneNumber,
            "dateofBirth": this.state.dob || this.context.state.userData.dateofBirth,
            "country": this.state.country || this.context.state.userData.country,
            "gender": this.state.gender || this.context.state.userData.gender,
            "address": this.state.address || this.context.state.userData.address,
            "emergencyContact": this.state.emergencyContact || this.context.state.userData.emergencyContact,
            "otherVerifiedPhoneNumbers": this.state.otherVerifiedPhoneNumbers || this.context.state.userData.otherVerifiedPhoneNumbers,
            "city": this.state.city || this.context.state.userData.city,
            "state": this.state.state || this.context.state.userData.state,
            "zipCode": this.state.zipCode || this.context.state.userData.zipCode,
          }
          this.setState({loading: true});
          data.otherVerifiedPhoneNumbers = JSON.stringify(data.otherVerifiedPhoneNumbers);
        //   if (data.otherVerifiedPhoneNumbers.length == 0) delete data.otherVerifiedPhoneNumbers;
          await editProfileApi(data, this.context);
          this.setState({loading: false});
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold,textGreen} = GStyles;
        consoleLog("emergencyContact", this.context.state.userData);
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Edit Personal Info" />
                    {this.renderLoading()}
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled={true}>
                            <EditInput 
                                label={"First Name"} 
                                placeholder={"Joshua"} 
                                onChangeText={(e) => this.setState({firstName: e})}
                                value={this.state.firstName || this.context.state.userData.firstName}
                            />
                            <EditInput 
                                label={"Last Name"} 
                                placeholder={"Nwagbo"} 
                                onChangeText={(e) => this.setState({lastName: e})}
                                value={this.state.lastName || this.context.state.userData.lastName}
                            />
                            <EditInput 
                                label={"Email"} 
                                placeholder={"ode@g.com"} 
                                onChangeText={(e) => this.setState({email: e})}
                                value={this.state.email || this.context.state.userData.email}
                            />
                            <EditInput 
                                phone 
                                label={"Phone Number"} 
                                placeholder={this.state.phoneNumber || this.context.state.userData.phoneNumber.replace("+234","")} 
                                itemStyle={Styles.phoneItem} 
                                onChangeText={(e) => this.setState({phoneNumber: e})}
                            />
                            <View style={[Styles.personalInfo]}>
                                <EditInput 
                                    dateTime 
                                    label={"Date of Birth"} 
                                    defaultDate={new Date(this.context.state.userData.dateofBirth) || new Date()}
                                    maximumDate={new Date()}
                                    itemStyle={{flex: 0.5, marginLeft: 5}} 
                                    onChange={(e) => {
                                        this.setState({dob: new Date(e)});
                                    }}
                                />
                                <EditInput 
                                    picker 
                                    label={"Gender"} 
                                    itemStyle={{flex: 0.5}} 
                                    onPickerChange={(e) => this.setState({gender: e})}
                                    selectedOption={this.state.gender}
                                />
                            </View>
                            <EditInput 
                                phone 
                                label={"Emergency Contact"} 
                                placeholder={this.state.emergencyContact || (this.context.state.userData.emergencyContact && this.context.state.userData.emergencyContact.replace("+234",""))} 
                                itemStyle={Styles.phoneItem} 
                                onChangeText={(e) => this.setState({emergencyContact: e})}
                            />
                            {/* <TouchableOpacity style={[Styles.nextOfKinView]}>
                                <Left>
                                    <MyText style={[textGreen]}>Add next of Kin</MyText>
                                </Left>
                                <Right>
                                    <Icon name={"ios-add-circle-sharp"} style={[Styles.icon]} />
                                </Right>
                            </TouchableOpacity> */}
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {height: 40, borderRadius: 5}]}
                                onPress={() => this.onUpdateUser()}
                            >
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Save Changes</MyText>
                            </TouchableOpacity>
                            
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}