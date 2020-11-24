import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image, Keyboard  } from "react-native";
import { Styles } from "./host.style";
import { Container, Content, View, Icon } from "native-base";
import colors from "../../colors";
import Header from "../../components/Header";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText, CustomButton, Loading } from "../../utils/Index";

import { urls, Request, errorMessage } from '../../utils'
import {  AppContext } from '../../../AppProvider'

export default class PropertyDescription extends Component {
    static contextType = AppContext
    constructor() {
        super();
        this.state = { title: '', description: '', loading: false };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
    }
    submit = () => {
        Keyboard.dismiss()
        // this.props.navigation.navigate("PropertyLocation")
        this.setState({ loading: true })
        const { title, description } = this.state
        const { propertyContext, appContext } = this.props
        const propertyData = appContext.state.propertyFormData

        const obj = { title, description, id: propertyData.id }
        Request(urls.listingBase, `${urls.v}listing/property/update`, obj)
        .then((res) => {
            console.log('res from property ', res)
            if(res.IsError || res.isError) {
                errorMessage('Something went wrong, please try again')
            } else {
                const data = res.data
                appContext.set({ propertyFormData: { ...propertyData, title: data.title, description: data.description }})
                appContext.set({ step: appContext.state.step + 1 })

                const properties = [ ...propertyContext.state.properties ]
                const pptyArr = this.filterSetProperty(properties, data, propertyData)
                
                console.log('Other ', properties)
                propertyContext.set({ properties: pptyArr })
                if(data.propertyType.name === 'Apartment') {
                    const apartments = [ ...propertyContext.state.apartments ]
                    const apsArr = this.filterSetProperty(apartments, data, propertyData)
                    propertyContext.set({ apartments: apsArr })
                } else {
                    const hotels = [ ...propertyContext.state.hotels ]
                    const hotelsArr = this.filterSetProperty(hotels, data, propertyData)
                    propertyContext.set({ hotels: hotelsArr })
                }
                if(!appContext.state.edit) {
                    propertyContext.getAllProperties();
                    propertyContext.getHotels();
                    propertyContext.getApartments();
                }
                
                this.props.navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
            }
            
        })
        .finally(() => {
            this.setState({ loading: false })
        })
    }
    filterSetProperty = (properties, data, propertyData) => {
        const elementsIndex = properties.findIndex(element => element.id == propertyData.id )
        let newArray = [...properties]
        newArray[elementsIndex] = { ...newArray[elementsIndex], title: data.title, description: data.description, mainImage: propertyData.mainImage}
        return newArray
    }

    componentDidMount = () => {
        const { state } = this.context
        const ppty = state.propertyFormData;
        console.log('Title ',ppty)
        if(ppty) {
            this.setState({ title: ppty.title, description: ppty.description })
        }
    }


    render () {
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
                    <Header {...this.props}  title="Create A List Title" />
                    <Content>
                        <Container style={[Styles.container, {marginTop: 120, flex: 1}]}>
                            
                            <View style={{ flex: 0.7 }}>
                                <Content>
                                    <LabelInput onChangeText={(text)=>{ this.setState({ title: text })}}
                                        label={"Catch guests' attention with a listing title that highlights what makes your place special"}
                                        labelStyle={[textGrey, {marginBottom: 20}]} 
                                        textarea icon 
                                        value={this.state.title}
                                        textInputStyles={{ height: 100}}
                                    />
                                </Content>
                            </View>
                            

                            <View style={{ flex: 0.8 }}>
                                <MyText style={[textBold,textH2Style]}>
                                    Describe Your Properties
                                </MyText>
                                <Content>
                                    <LabelInput onChangeText={(text)=>{ this.setState({ description: text })}}
                                        label={"Let guests know how available you'll be during their stay. For your safety , don't share your phone number or email until you have confirmed reservation."}
                                        labelStyle={[textGrey, {marginBottom: 20}]}
                                        textarea icon 
                                        value={this.state.description}
                                        textInputStyles={{ height: 100}}
                                    />
                                </Content>
                            </View>

                            <View style={{ flex: 0.8, justifyContent: 'center' }}>
                                <CustomButton onPress={this.submit} buttonText="Next" buttonStyle={{ elevation: 2}}  />
                            </View>
                        
                        </Container>
                    </Content>
                </SafeAreaView>
            </>
        );
    }
}