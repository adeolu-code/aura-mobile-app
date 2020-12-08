import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Header from "../components/Header";
import colors from "../colors";
import GStyles from '../assets/styles/GeneralStyles';
import { MyText, CustomButton } from '../utils/Index';
import { AppContext } from '../../AppProvider';

import { EXPERIENCE, PHOTOGRAPH, RESTAURANT } from '../utils'

class TermsOfService extends Component {
    static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = { type: ''};
    this.state.type = props.route.params?.type
  }
  onAccept = () => {
    this.context.set({ edit: false })
    const { type } = this.state
    switch (type) {
        case PHOTOGRAPH:
            this.props.navigation.navigate('PhotographStack', { screen: 'TitleDescription'})
            return;
        case RESTAURANT:
        
            break;
        case EXPERIENCE:
            this.props.navigation.navigate('TourStack', { screen: 'TourLocation'})
            break;
        default:
            break;
    }
  }

  onDecline = () => {
    this.props.navigation.goBack()
  }


  render() {
    const { textBold, textH4Style, textGrey, textH3Style, textOrange, flexRow } = GStyles
    const { container } = styles
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
            <Header {...this.props} title="Terms of Service" />
            <ScrollView>
                <View style={container}>
                    <MyText style={[textBold, textH4Style, { marginBottom: 10}]}>Please read these Terms of Service (“Terms”) carefully as they contain 
                        important information about your legal rights, remedies and obligations. By accessing or using the Aura Platform, 
                        you agree to comply with and be bound by these Terms.
                    </MyText>

                    <MyText style={[textH4Style, textGrey]}>
                        These Terms constitute a legally binding agreement ("Agreement") between you and Aura (as defined below) 
                        governing your access to and use of the Aura website, including any subdomains thereof, 
                        and any other websites through which Aura makes its services available (collectively, the "Site"), 
                        our mobile, tablet and other smart device applications, and application program interfaces (collectively, "Application") 
                        and all associated services (collectively, "Aura Services"). The Site, Application and Aura Services together are hereinafter 
                        collectively referred to as the “Aura Platform”. Any other policies which we may declare applicable to your use of the Aura Platform 
                        are incorporated by reference into this Agreement. When these Terms mention “Aura,” “we,” “us,” or “our,” it refers to Transcorp Hotels PLC, 
                        a limited liability company registered under the laws of the Federal Republic of Nigeria with registration number 248514 and principal 
                        place of business at Transnational House, 38 Glover Road, Ikoyi Lagos. Our collection and use of personal information in connection with 
                        your access to and use of the Aura Platform is described in our Privacy Policy. Any and all payment processing services through or 
                        in connection with your use of the Aura Platform ("Payment Services") are provided to you by one or more 
                        [Aura Payments entities] or [third party payment service providers] (individually and collectively, as appropriate, "Aura Payments").
                    </MyText>

                    <View>
                        <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Table of Contents</MyText>

                        <View>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>1. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Definitions</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>2. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Scope of Aura Services</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>3. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Eligibility, Using the Aura Platform, Member Verification</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>4. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Modification of these Terms</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>5. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Account Registration</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>6. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Content</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>7. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Service Fees</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>8. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Terms specific for Hosts</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4}]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>9. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Terms specific for Guests</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>10. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold, { flex: 1}]}>Booking Modifications, Cancellations and Refunds, Resolution Centre</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>11. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Ratings and Reviews</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>12. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Damage to Accommodations, Disputes between Members</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>13. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Taxes</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>14. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Prohibited Activities</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>15. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Term and Termination, Suspension and other Measures</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>16. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Disclaimers</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>17. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Liability</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>18. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Indemnification</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>19. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Dispute Resolution</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>20. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>Applicable Law and Jurisdiction</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, { marginVertical: 4 }]}>
                                <MyText style={[textH4Style, textOrange, textBold]}>21. </MyText>
                                <MyText style={[textH4Style, textOrange, textBold]}>General Provisions</MyText>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <MyText style={[textH3Style, textBold, textGrey, { marginVertical: 10}]}>Definitions</MyText>
                        <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>In these Terms the following words shall have the following definitions unless the context otherwise requires:</MyText>
                    </View>

                    <View >
                        <View style={[flexRow, { justifyContent: 'space-between', marginVertical: 20}]}>
                            <View style={{ width: '48%'}}>
                                <CustomButton onPress={this.onAccept} buttonText="Accept" buttonStyle={{ elevation: 1}} />
                            </View>
                            <View style={{ width: '48%'}}>
                                <CustomButton onPress={this.onDecline} buttonText="Decline" textStyle={{ color: colors.orange}}
                                buttonStyle={{ elevation: 1, borderWidth: 1, borderColor: colors.orange, backgroundColor: colors.white}} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, paddingTop: 140
    }
});

export default TermsOfService;
