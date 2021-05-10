/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StatusBar, Pressable, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "./editProfile.style";
import { Container, Content, Footer, View, Left, Right, Icon } from "native-base";
import { MyText, Loading, DatePicker } from "../../utils/Index";
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
            dob: '',
            // dob: new Date("2002-10-31"),
            firstName: "",
            lastName: "",
            phoneNumber: "",
            loading: false,
            emergencyContact: "",
        }
    }

    getDob = (value) => {
        const newDate = new Date(value);
        this.setState({ dob: `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}` })
    }

    pickGender = (e) => {
        this.setState({ gender: e})
    }

    onUpdateUser = async () => {
        let data = {
            "firstName": this.state.firstName || this.context.state.userData.firstName,
            "lastName": this.state.lastName || this.context.state.userData.lastName,
            "phoneNumber": this.state.phoneNumber || this.context.state.userData.phoneNumber,
            "dateofBirth": this.state.dob || this.context.state.userData.dateofBirth,
            // "country": this.state.country || this.context.state.userData.country,
            "gender": this.state.gender ? this.stateGender() : '' || this.context.state.userData.gender,
            // "address": this.state.address || this.context.state.userData.address,
            "emergencyContact": this.state.emergencyContact || this.context.state.userData.emergencyContact,
            // "otherVerifiedPhoneNumbers": this.state.otherVerifiedPhoneNumbers || this.context.state.userData.otherVerifiedPhoneNumbers,
            
            // "city": this.state.city || this.context.state.userData.city,
            // "state": this.state.state || this.context.state.userData.state,
            // "zipCode": this.state.zipCode || this.context.state.userData.zipCode,
          }
          this.setState({loading: true});
          data.otherVerifiedPhoneNumbers = data.otherVerifiedPhoneNumbers;
          await editProfileApi(data, this.context);
          this.setState({loading: false});
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    stateGender = () => {
        const { gender } = this.state;
        if(gender === 'male') {
            return "0"
        } else if(gender === 'female') {
            return "1"
        } else {
            return ''
        }
    }
    userDataGender = () => {
        const { userData } = this.context.state;
        if(userData.gender === 0) {
            return 'male'
        } else if(userData.gender === 1) {
            return 'female'
        } else {
            return ''
        }
    }

    render() {
        const {textCenter, textH3Style, textWhite, textBold,textGreen, textGrey, textH4Style} = GStyles;
        // console.log("emergencyContact", this.context.state.userData);
        const { userData } = this.context.state
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Edit Personal Info" wrapperStyles={{ position:'relative'}} />
                    {this.renderLoading()}
                    
                    <Container style={[Styles.container, { marginTop: 0}]}>
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
                                placeholder={"ode@g.com"} disabled
                                onChangeText={(e) => this.setState({email: e})}
                                value={this.state.email || this.context.state.userData.email}
                            />
                            <EditInput 
                                phone 
                                label={"Phone Number"} 
                                placeholder={this.state.phoneNumber || (userData.phoneNumber ? userData.phoneNumber.replace("+234","") : '')} 
                                itemStyle={Styles.phoneItem} 
                                onChangeText={(e) => this.setState({phoneNumber: e})}
                            />
                            <View style={[Styles.personalInfo]}>
                                <View style={{ flex: 2}}>
                                    <MyText style={[textGrey, textH4Style, { marginBottom: 8}]}>Date of Birth</MyText>
                                    <DatePicker placeholder="DD/MM/YYYY" receiveData={this.getDob} 
                                    defaultValue={new Date(this.context.state.userData.dateofBirth) || new Date()} />
                                </View>
                                {/* <EditInput 
                                    dateTime 
                                    label={"Date of Birth"} 
                                    defaultDate={new Date(this.context.state.userData.dateofBirth) || new Date()}
                                    maximumDate={new Date()}
                                    itemStyle={{flex: 0.5, marginLeft: 5}} 
                                    onChange={(e) => {
                                        this.setState({dob: new Date(e)});
                                    }}
                                /> */}
                                <View style={{ flex: 1}}>
                                    <EditInput 
                                        picker 
                                        label={"Gender"} 
                                        itemStyle={{flex: 0.5, height: 50}} 
                                        // onPickerChange={(e) => this.setState({gender: e})}
                                        onPickerChange={this.pickGender}
                                        selectedOption={this.state.gender || this.userDataGender()}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, marginBottom: 120}}>
                                <EditInput 
                                    phone 
                                    label={"Emergency Contact"} 
                                    placeholder={this.state.emergencyContact || (this.context.state.userData.emergencyContact && this.context.state.userData.emergencyContact.replace("+234",""))} 
                                    itemStyle={Styles.phoneItem} 
                                    onChangeText={(e) => this.setState({emergencyContact: e})}
                                />
                            </View>
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
                                style={[Styles.nextButton, {height: 50, borderRadius: 5}]}
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