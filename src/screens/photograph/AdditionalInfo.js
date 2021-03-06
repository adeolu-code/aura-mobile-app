import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, Image, Keyboard  } from "react-native";
import { Styles } from "../host/host.style";
import { Container, Content, View, Icon } from "native-base";
import colors from "../../colors";
import Header from "../../components/Header";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "../../assets/styles/GeneralStyles";
import { MyText, CustomButton, Loading } from "../../utils/Index";

import { urls, Request, errorMessage, successMessage } from '../../utils'
import {  AppContext } from '../../../AppProvider'

class AdditionalInfo extends Component {
    static contextType = AppContext;
    state = { additionalInformation: '', errors: []}

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 2000 }} />); }
    }
    renderError = () => {
        const { errors } = this.state
        if(errors.length !== 0) {
            return (<Error errors={errors} />)
        }
    }
    
    submit = async () => {
        Keyboard.dismiss()
        const { additionalInformation } = this.state
        const { state, set } = this.context
        set({ photographOnboard: { additionalInformation } })

        const obj = { ...state.photographOnboard, additionalInformation }
        delete obj.longitude; delete obj.latitude
        console.log('Obj ', state.photographOnboard)
        try {
            this.setState({ loading: true })
            let res;
            if(state.editPhotograph) {
                delete obj.equipment
                res = await Request(urls.photographyBase, `${urls.v}photographer/${obj.id}`, obj, false, 'PUT')
            } else {
                res = await Request(urls.photographyBase, `${urls.v}photographer`, obj)
            }
            
            this.setState({ loading: false })
            if(res.isError || res.IsError) {
                errorMessage(res.message)
            } else {
                if(state.editPhotograph) {
                    successMessage('Photographer details updated successfully !!')
                    this.props.navigation.navigate('Tabs', { screen: 'Dashboard' })
                } else {
                    this.props.navigation.navigate('PhotographStack', { screen: 'PhotographUploadImages', params: { photographer: res.data }})
                }
                
            } 
        } catch (error) {
            console.log('Error ', error)
            this.setState({ loading: false })
        }
        
        
    }
    componentDidMount = () => {
        const { editPhotograph, photographOnboard } = this.context.state
        if(editPhotograph && photographOnboard) {
            this.setState({ additionalInformation: photographOnboard.additionalInformation })
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
            <Header {...this.props}  title="Things You Want People To Keep In Mind" wrapperStyles={{ position: 'relative'}} />
            <Content>
                <Container style={[Styles.container, {marginTop: 0, flex: 1}]}>
                    

                    <View style={{ flex: 0.7 }}>
                        <Content>
                            <LabelInput onChangeText={(text)=>{ this.setState({ additionalInformation: text })}}
                                label={"You can tell people things of information you think that they might need to know before booking your services"}
                                labelStyle={[textGrey, {marginBottom: 20}]}
                                textarea icon 
                                value={this.state.additionalInformation}
                                textInputStyles={{ height: 200}}
                            />
                        </Content>
                    </View>

                    <View style={{ flex: 0.3  }}>
                        <CustomButton onPress={this.submit} buttonText="Next" buttonStyle={{ elevation: 2}} />
                    </View>
                
                </Container>
            </Content>
        </SafeAreaView>
      </>
    );
  }
}

export default AdditionalInfo;
