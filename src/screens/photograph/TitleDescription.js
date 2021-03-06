import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, Image, Keyboard, ScrollView, KeyboardAvoidingView, Platform  } from "react-native";
import { Styles } from "../host/host.style";
import { Container, Content, View, Icon } from "native-base";
import colors from "../../colors";
import Header from "../../components/Header";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText, CustomButton, Loading } from "../../utils/Index";

import { urls, Request, errorMessage } from '../../utils'
import {  AppContext } from '../../../AppProvider'

class TitleDescription extends Component {
    static contextType = AppContext;
    state = { title: '', description: ''}

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
    }
    validate = () => {
        const { title } = this.state
        if(title === '') {
            return true
        }
        return false
    }
    submit = () => {
        Keyboard.dismiss()
        const { title, description } = this.state
        const { edit, photographOnboard, editPhotograph } = this.context.state
        const { state, set } = this.context
        const obj = { title, description }
        if(editPhotograph) {
            set({ photographOnboard: { ...photographOnboard, ...obj} })
        } else {
            set({ photographOnboard: obj })
        }
        this.props.navigation.navigate('PhotographStack', { screen: 'PhotographLocation'})
    }

    componentDidMount = () => {
        const { edit, photographOnboard, editPhotograph } = this.context.state
        if(editPhotograph && photographOnboard) {
            this.setState({ title: photographOnboard.title, description: photographOnboard.description})
        }
    }

  render() {
    const {
        textBlack, textBold, textH4Style, textGrey,
        textH2Style,
        textWhite,
        textCenter
      } = GStyles;
    return (
      <>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
            {this.renderLoading()}
            <Header {...this.props}  title="Give Your Craft A Title" wrapperStyles={{ position: 'relative'}} />
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "padding"}>
                <View style={[Styles.container, {marginTop: 0, flex: 1}]}>
                    
                    <View style={{ flex: 1, marginBottom: 30 }}>
                        <Content>
                            <LabelInput onChangeText={(text)=>{ this.setState({ title: text })}}
                                label={"Catch guests’ attention with a listing title that highlights what makes your place special."}
                                labelStyle={[textGrey, {marginBottom: 20}]} 
                                textarea icon 
                                value={this.state.title}
                                textInputStyles={{ height: 80}}
                            />
                        </Content>
                    </View>
                    

                    <View style={{ flex: 1 }}>
                        <MyText style={[textBold,textH2Style]}>Describes Your Craft</MyText>
                        <Content>
                            <LabelInput onChangeText={(text)=>{ this.setState({ description: text })}}
                                label={"Describe yourself in a catchy way that you think guest would love to know about you as a photographer on aura."}
                                labelStyle={[textGrey, {marginBottom: 20}]}
                                textarea icon 
                                value={this.state.description}
                                textInputStyles={{ height: 120}}
                            />
                        </Content>
                    </View>

                    <View style={{ marginTop: 60, flex: 1 }}>
                        <CustomButton onPress={this.submit} buttonText="Next" buttonStyle={{ elevation: 2}} disabled={this.validate()}  />
                    </View>
                
                </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default TitleDescription;
