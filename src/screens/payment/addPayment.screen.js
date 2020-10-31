import React,{ Component } from "react";
import { StatusBar, SafeAreaView, ScrollView, Image } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import { BOOKINGS_NO_BOOKINGS, BOOKINGS_SCREEN_DESCRIPTION } from "../../strings";
import { Styles } from "./payment.style";
import { MyText, CustomButton } from "../../utils/Index";
import { View } from "native-base";
import GStyles from "./../../assets/styles/GeneralStyles";
import { LabelInput } from "../../components/label_input/labelInput.component";

export default class AddPayment extends Component {
    constructor() {
        super();

        this.state = {
            preLoaded: false,
        };
    }
    onAddPaymentClick = () => {

    }

    render() {
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={ "Add Card Details"} />
                    <View style={[Styles.container]}>                    
                        <ScrollView>
                            <>
                                <LabelInput 
                                    label={"First Name"} 
                                    placeholder={"XXXX XXXX XXXX XXXX"}
                                    maxLength={16}
                                    icon={"camera"}
                                    iconStyle={Styles.cameraIcon}
                                />
                                <View style={[Styles.rowView]}>
                                    <LabelInput 
                                        label={"Expiry"} 
                                        placeholder={"MM"}
                                        maxLength={2}
                                        itemStyle={{width: "25%", marginLeft: 5}}
                                    />  
                                    <LabelInput 
                                        placeholder={"YY"}
                                        maxLength={2}
                                        itemStyle={{width: "25%", marginLeft: 5}}
                                    />  
                                    <LabelInput 
                                        label={"CVV"} 
                                        placeholder={""}
                                        maxLength={3}
                                        itemStyle={{width: "45%", marginLeft: 5}}
                                    />  
                                </View>
                                <LabelInput 
                                        label={"Residential Address"} 
                                        placeholder={""}
                                        textarea
                                        
                                /> 
                                <View style={[Styles.rowView]}>
                                    <LabelInput 
                                        label={"Country"} 
                                        placeholder={""}
                                        itemStyle={{width: "50%", marginLeft: 5}}
                                    />  
                                    <LabelInput 
                                        label={"State"} 
                                        placeholder={""}
                                        itemStyle={{width: "45%", marginLeft: 5}}
                                    />  
                                </View>
                                <View style={[Styles.rowView]}>
                                    <LabelInput 
                                        label={"City"} 
                                        placeholder={""}
                                        itemStyle={{width: "50%", marginLeft: 5}}
                                    />  
                                    <LabelInput 
                                        label={"Zip Code"} 
                                        placeholder={""}
                                        itemStyle={{width: "45%", marginLeft: 5}}
                                    />  
                                </View>
                                
                                <CustomButton
                                    buttonText={"Add Card"} 
                                    buttonStyle={[Styles.buttonStyle]} textStyle={[Styles.customTextStyle]} 
                                    onPress={() => this.onAddPaymentClick()}
                                />
                            </>
                            
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}