/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { StatusBar, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import colors from "../../colors";
import { Styles } from "./editProfile.style";
import { Container, Content, Footer, View, Left, Right, Icon } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import {LabelInput as EditInput} from "./../../components/label_input/labelInput.component";
import { AppContext } from "../../../AppProvider";

// import DateTimePicker from '@react-native-community/datetimepicker';
// import  from "@react-native-community/picker";

export default class EditProfile extends Component {
    static contextType = AppContext;
    constructor() {
        super();

        this.state = {}
    }

    render() {
        console.log("user", this.context.state.userData);
        const {textCenter, textH3Style, textWhite, textBold,textGreen} = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Edit Personal Info" />
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled={true}>
                            <EditInput 
                                label={"First Name"} 
                                placeholder={"Joshua"} 
                                onChangeText={(e) => this.setState({firstName: e})}
                            />
                            <EditInput 
                                label={"Last Name"} 
                                placeholder={"Nwagbo"} 
                                onChangeText={(e) => this.setState({lastName: e})}
                            />
                            <EditInput 
                                label={"Email"} 
                                placeholder={"ode@g.com"} 
                                onChangeText={(e) => this.setState({email: e})}
                            />
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
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity style={[Styles.nextButton, {height: 40}]}>
                                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>Save Changes</MyText>
                            </TouchableOpacity>
                            
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}