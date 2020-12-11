import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar'
import { formatAmount } from '../../helpers';



class GuestPricing extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, value: '', gettingDeductions: false, pricePerGuest: '', estimatedEarning: '', deductions: '',
        commission: 0  };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    
    onValueChange = (attrName, value) => {
        const { deductions } = this.state
        this.setState({ [attrName]: value });
        const estimated = value * (deductions.auraCommission/100)
        this.setState({ estimatedEarning: (value - estimated).toString(), commission: estimated })
    }
    
    validate = () => {
        const { pricePerGuest } = this.state
        if(pricePerGuest === '') {
            return true
        }
        return false
    }

    updateExperience = async () => {
        this.props.navigation.navigate('TourStack', { screen: 'TourBookingSettings' })

        // const { tourOnboard } = this.context.state;
        // const { pricePerGuest, estimatedEarning } = this.state
        // this.setState({ loading: true, errors: [] });
        // const obj = {
        //     pricePerGuest: Number(pricePerGuest),
        //     estimatedEarning: Number(estimatedEarning),
        //     id: tourOnboard.id
        // }
        // const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        // console.log('update experience ', res)
        // this.setState({ loading: false });
        // if (res.isError || res.IsError) {
        //     errorMessage(res.message || res.Message)
        // } else {
        //     this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
        //     this.props.navigation.navigate('TourStack', { screen: 'TourBookingSettings' })
        // }  
    }

    getDeductions = async () => {
        this.setState({ gettingDeductions: true })
        const res = await GetRequest(urls.paymentBase,  `${urls.v}deduction/commissioning/retrieve?partner=host&country=Nigeria`);
        console.log('Deductions ', res)
        this.setState({ gettingDeductions: false })
        if(res.isError || res.IsError) {
            errorMessage(res.Message || res.message)
        } else {
            const data = res.data;
            this.setState({ deductions: data })
        }
    }
    

    componentDidMount = () => {
        this.getDeductions()
    }


  render() {
    const { container, button, currencyContainer } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Guest Pricing" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 6 / 7</MyText>
                    <ProgressBar width={80} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View>
                            <MyText style={[textH4Style, textGrey, { marginBottom: 40, marginTop: 15}]}>
                            How much you charge is entirely up to you. Enter the price you 
                            want each guest to pay and discover what you can earn.
                            </MyText>

                            <MyText style={[textH4Style, textGrey, textBold ]}>Each Guest Pays</MyText>

                            <View>
                                <View style={[flexRow, { alignItems: 'flex-end'}]}>
                                    <View style={currencyContainer}>
                                        <MyText style={[textWhite, textH3Style, textBold]}>₦</MyText>
                                    </View>
                                    <View style={{ flex: 1}}>
                                        <CustomInput placeholder="0" attrName="pricePerGuest" value={this.state.pricePerGuest} onChangeText={this.onValueChange}
                                        textInputStyle={{ borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6}} />
                                    </View>
                                </View>
                            </View>

                            <MyText style={[textH4Style, textGrey, textBold, { marginTop: 40} ]}>Your Estimated Earnings</MyText>

                            <View>
                                <View style={[flexRow, { alignItems: 'flex-end', marginBottom: 6}]}>
                                    <View style={currencyContainer}>
                                        <MyText style={[textWhite, textH3Style, textBold]}>₦</MyText>
                                    </View>
                                    <View style={{ flex: 1}}>
                                        <CustomInput placeholder="0" attrName="estimatedEarning" value={this.state.estimatedEarning}
                                        disabled={true} textInputStyle={{ borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6}} />
                                    </View>
                                </View>
                                <MyText style={[textH5Style]}>Aura Commission + VAT : ₦ {formatAmount(this.state.commission)}</MyText>
                            </View>
                            
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2}} disabled={this.validate()} 
                        onPress={this.updateExperience} />
                    </View>
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, marginTop: 50, justifyContent: 'flex-end'
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    },
    
    currencyContainer: { 
        height: 55, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.orange,
        borderTopLeftRadius: 6, borderBottomLeftRadius: 6
    }
});

export default GuestPricing;
