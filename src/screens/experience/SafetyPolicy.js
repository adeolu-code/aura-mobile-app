import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { errorMessage } from '../../utils';

import { AppContext } from '../../../AppProvider';
import ProgressBar from '../../components/ProgressBar'




class SafetyPolicy extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, experience: null, ansOne: false, ansTwo: false, ansThree: false, value: null };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  
  
  next = () => {
    this.props.navigation.navigate('TourStack', { screen: 'TourIdentityCard' })
  }
  

  

  render() {
    const { container, button, imageContainer, textContainer, policyContainer, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <Header { ...this.props } title="Policy" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 6 / 6</MyText>
                    <ProgressBar width={100} />
                    <ProgressBar width={12.5 * 7} />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        <MyText style={[textH3Style, textBold, { marginBottom: 15 }]}>
                        Cancellation Policy
                        </MyText>
                        

                        <View style={textContainer}>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 15, }]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Free cancellation for bookings at least 10 days before check-in (time shown in the confirmation email). If booking is made less than 10 days before check-in, 
                                then free cancellation shall apply for 48 hours after booking but must be 24 hours before check-in.</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 15}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Guests can cancel up to 7 days before check-in and get a 50% refund of the nightly rate, 
                                but not the service fee.</MyText>
                            </View>

                            <View style={policyContainer}>
                                <MyText style={[textH3Style, textBold, textGrey, { marginBottom: 15, paddingHorizontal: 15}]}>14 Days prior</MyText>
                                <View style={styles.divider}></View>
                                <MyText style={[textH4Style, textBold, textGrey, { paddingVertical: 10, paddingHorizontal: 15}]}>48 hours after booking</MyText>
                                <View style={styles.divider}></View>
                                <MyText style={[textH4Style, textGrey, { marginTop: 5, paddingHorizontal: 15}]}>For a full refund of the nightly rate, the guest must cancel within 
                                    48 hours of booking and at least 14 full days prior to listing’s 
                                    local check-in time (shown in the confirmation email)</MyText>
                            </View>

                            <View style={policyContainer}>
                                <MyText style={[textH3Style, textBold, textGrey, { marginBottom: 15, paddingHorizontal: 15}]}>7 Days prior</MyText>
                                <View style={styles.divider}></View>
                                
                                <MyText style={[textH4Style, textGrey, { marginTop: 5, paddingHorizontal: 15}]}>For a 50% refund of the nightly rate, 
                                Guest must cancel 7 full days before the listing's local check in time (shown in the confirmation email), otherwise no refund.</MyText>
                            </View>

                            <View style={policyContainer}>
                                <MyText style={[textH3Style, textBold, textGrey, { marginBottom: 15, paddingHorizontal: 15}]}>7
                                 Check in</MyText>
                                <View style={styles.divider}></View>
                                
                                <MyText style={[textH4Style, textGrey, { marginTop: 5, paddingHorizontal: 15}]}>If the guest cancels less than 7 days in advance or decides to leave early after check-in,
                                 the nights not spent will not refunded.</MyText>
                                 <MyText style={[textH4Style, textGrey, { marginTop: 5, paddingHorizontal: 15}]}>We reserve the right to cancel or
                                  modify bookings where it appears that a customer has engaged in fraudulent or inappropriate activity or 
                                  under other circumstances where it appears that the bookings contain or resulted from a mistake or error.</MyText>
                            </View>
                            
                            
                        </View>

                    </View>


                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.next}  />
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
        paddingHorizontal: 20, marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, marginTop: 20, justifyContent: 'flex-end', paddingHorizontal: 10, marginTop: 40
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    },
    
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey, alignSelf: 'flex-start', marginTop: 8
    },
    policyContainer: {
        paddingVertical: 15, backgroundColor: colors.white, borderRadius: 6, elevation: 2, marginTop: 20
    }

});

export default SafetyPolicy;
