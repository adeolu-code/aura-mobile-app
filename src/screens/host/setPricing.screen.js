import React, { Component } from "react";
import { Styles } from "./host.style";
import { Footer, Container, Content, View, Switch, Input, Picker } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { TouchableOpacity, StatusBar, SafeAreaView, StyleSheet } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors"; 
import TipViewComponent from "../../components/tip_view/tipView.component";
import { GLOBAL_PADDING } from "../../utils";

export default class SetPricing extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const {
            textBold,
            textH4Style,
            textCenter,
            textWhite,
            textH3Style,
            textH5Style,
            textlightGreyTwo,
          } = GStyles;
        const markedDates = Object.assign({}, this.state.selectedDays)
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Set Your Pricing" 
                    />
                    <Container style={[Styles.container, {marginTop: 130, padding: 0, paddingBottom: 10}]}>
                        <Content scrollEnabled>
                            <View style={[InternalStyles.pad]}>
                                <TipViewComponent 
                                    text={"Based on your location the average price here is:"} 
                                />
                            </View>
                            
                            <View style={[Styles.averageItemParent, {marginTop: 20}]}>
                                <View style={[InternalStyles.pad]}>
                                    <AverageItem
                                        title={"Apartments"}
                                        average={"N 200,341/night"}
                                    />
                                </View>
                                <View style={[InternalStyles.pad]}>
                                    <AverageItem
                                        title={"Hotels"}
                                        average={"N 200,341/night"}
                                    />    
                                </View>
                            </View>
                            <View style={[InternalStyles.pad, {marginTop: 10}]}>
                                <MyText style={[textBold, textH3Style, ]}>
                                    Set Your Base Price
                                </MyText>
                                <MyText style={[textH5Style, textlightGreyTwo]}>
                                    This is the default price you will charge guests for your property
                                </MyText>
                                <View style={[Styles.rowView, Styles.pricingInputParent]}>
                                    <Input style={[Styles.pricingInput]} />
                                    <View style={[Styles.pricingPicker, {backgroundColor: colors.lightGrey}]}>
                                        <Picker
                                            mode="dropdown"
                                            textStyle={{color: colors.black, }}
                                            selectedValue={"night"}
                                            onValueChange={() => this.onValueChange()}
                                        >
                                            <Picker.Item label="/Night" value="night" />
                                        </Picker>
                                    </View>
                                </View>
                                <MyText style={[textH5Style, textlightGreyTwo, {marginTop: 10}]}>Based Currency</MyText>
                                <View style={[Styles.currencyPicker]}>
                                    <Picker
                                        mode="dropdown"
                                        textStyle={{color: colors.black, }}
                                        selectedValue={"usd"}
                                        onValueChange={() => this.onCurrencyValueChange()}
                                    >
                                        <Picker.Item label="American Dollars" value="usd" />
                                    </Picker>
                                </View>
                            </View>
                            
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, InternalStyles.pad]}>
                            <TouchableOpacity
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('GuestPolicy')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        )
    }
}

const InternalStyles = StyleSheet.create({
    pad: {
        paddingLeft: GLOBAL_PADDING, 
        paddingRight: GLOBAL_PADDING
    },
})

const AverageItem = (props) => {
    return (
        <View style={[Styles.rowView, Styles.averageItem, props.style]}>
            <View style={{flex: 1}}>
                <MyText>{props.title}</MyText>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <MyText>{props.average}</MyText>
            </View>
        </View>
    );
}