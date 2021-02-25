import React, { Component } from 'react'
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity, Alert,
    Modal, TouchableWithoutFeedback, ScrollView, Platform
} from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import GStyles from '../../assets/styles/GeneralStyles';
import { MyText, CustomButton } from '../../utils/Index';
import { AppContext } from '../../../AppProvider';

import { EXPERIENCE, PHOTOGRAPH, RESTAURANT, HOST } from '../../utils'


export default class TermsModal extends Component {
    static contextType = AppContext
    onAccept = () => {
        this.context.set({ edit: false })
        const { type, onDecline } = this.props
        onDecline()
        switch (type) {
            case PHOTOGRAPH:
                this.props.navigation.navigate('PhotographStack', { screen: 'TitleDescription'})
                return;
            case RESTAURANT:
                this.props.navigation.navigate('RestaurantStack', { screen: 'RestaurantDashboardComponent'})
                break;
            case EXPERIENCE:
                // this.props.navigation.navigate('TourStack', { screen: 'TourIdentityCard'})
                // this.props.navigation.navigate('TourStack', { screen: 'TourGuestRequirement'})
                this.props.navigation.navigate('TourStack', { screen: 'TourLocation'})
                break;
            case HOST:
                this.context.set({ propertyFormData: null, step: 1 })
                this.props.navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
                break;
            default:
                break;
        }
    }
    onDecline = () => {
        this.props.onDecline()
    }
    render() {
        const { textBold, textH4Style, textGrey, textH3Style, textOrange, flexRow, textUnderline } = GStyles
        const { container } = styles
        const { visible, onDecline } = this.props;
        return (
            <Modal visible={visible} onRequestClose={() => { }} transparent animationType="slide" statusBarTranslucent={true} >
                <View style={{ backgroundColor: colors.white }}>
                    <Header {...this.props} title="Terms of Service" onPress={onDecline} />
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
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Accomodation</MyText>
                                    :-{' '}A short-let houses or rooms in houses or parts of a house owned or occupied by a Host.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Aura Content</MyText>
                                    :-{' '}any content that Aura itself makes available on or through the Aura Platform, including proprietary Aura content and any content licensed or authorized for use by or through Aura from a third party.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText  style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Booking Modifications</MyText>
                                    :-{' '}any modifications to a booking that a Members make via the Aura Platform or direct communication with Aura customer service.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Damage Claim</MyText>
                                    :-{' '}Damage to an Accommodation or any personal or other property at an Accommodation by a Guest.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Guest Fees</MyText>
                                    :-{' '}Any fees charged by Aura from the Guests.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Host Fees</MyText>
                                    :-{' '}Any fees charged by Aura from the Hosts.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                <MyText style={[textH3Style, textGrey,textBold, { marginVertical: 10}]}>Just Cause(s){'\n'}</MyText>
                                        (i) to comply with applicable law, or the order or request of a court, law enforcement or other administrative agency or
                                        governmental body, or {'\n'}
                                        (ii) Where a Member has breached these Terms, applicable laws, regulations, or third-party rights,{'\n'}
                                        (iii) you have provided inaccurate, fraudulent, outdated or incomplete information during the Aura Account registration, Listing process or thereafter,{'\n'}
                                        (iv) you and/or your Listings or Host Services at any time fail to meet any applicable quality or eligibility criteria,{'\n'}
                                        (v) you have repeatedly received poor Ratings or Reviews, or Aura otherwise becomes aware of or has received complaints about your performance or conduct,{'\n'}
                                        (vi) you have repeatedly cancelled confirmed bookings or failed to respond to booking requests without a valid reason, or{'\n'}
                                        (vii) Aura believes in good faith that such action is reasonably necessary to protect the personal safety or property of Aura, its Members, or third parties, or to prevent fraud or other illegal activity:
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Listing(s)</MyText>
                                    :-{' '}An Accommodation together with their description, amenities and other appurtenances which are published by Hosts on the Aura Platform.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Listing Fee</MyText>
                                    :-{' '}a price (including any Taxes if applicable, or charges such as cleaning fees) for a Listing.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Member Content</MyText>
                                    :-{' '}Listing descriptions, ratings, reviews text, photos, audio, video, or other materials and information published by a Member.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>NGN</MyText>
                                    :-{' '}Nigerian Naira
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Overstay</MyText>
                                    :-{' '}Where a Guest remains in an Accommodation beyond the agreed checkout time without the Host's consent.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Overstay Fees</MyText>
                                    :-{' '}an additional nightly fee up to the average nightly Listing Fee originally paid by you to cover the inconvenience suffered by the Host, plus all applicable Guest Fees, Taxes, and any legal expenses incurred by a Host to make an Overstaying Guest leave.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Rating</MyText>
                                    :-{' '}A 5-star based rating made by a Member for another Member.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Review</MyText>
                                    :-{' '}A publicly available review left by a Member.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Security Deposit</MyText>
                                    :-{' '}Means a fee which may be charged by a Host against damages to the Accommodation; to be paid upon confirmation of a booking and before the Guest arrives at the Accommodation.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Service Fees</MyText>
                                    :-{' '}Both Host Fees and Guest Fees.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>SNS Account</MyText>
                                    :-{' '}third-party social networking services.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Taxes</MyText>
                                    :-{' '}Any applicable VAT or other indirect sales taxes, occupancy tax, tourist or other visitor taxes or income taxes.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Tax Authority</MyText>
                                    :-{' '}any appropriate and relevant governmental agency, department and/or authority requiring taxes from a Member where an Accommodation is located.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Third Party Services</MyText>
                                    :-{' '}third-party websites or resources.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Total Fees</MyText>
                                    :-{' '}This including the Listing Fee, Guest Fee, Security Deposit (if applicable) any applicable Taxes and other applicable fees chargeable against a Guest.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH4Style, textGrey,textBold, textUnderline, { marginVertical: 10}]}>Travel Issue</MyText>
                                    :-{' '}means any one of the following:{'\n'}
                                    (a) the Host of the Accommodation{'\n'}
                                    (i) cancels a booking shortly before the scheduled start of the booking, or{'\n'}
                                    (ii) fails to provide the Guest with the reasonable ability to access the Accommodation (e.g. does not provide the keys and/or a security code).{'\n'}
                                    (b) the Listing’s description or depiction of the Accommodation is materially inaccurate with respect to: the size of the Accommodation; whether the booking for the Accommodation is for an entire home, private room or shared room, and whether another party, including the Host, is staying at the Accommodation during the booking, special amenities or features represented in the Listing are not provided or do not function, or the physical location of the Accommodation (proximity).{'\n'}
                                    (c) at the start of the Guest’s booking, the Accommodation:{'\n'}
                                    (i) is not generally clean and sanitary (including unclean bedding and/or bathroom towels);{'\n'}
                                    (ii) contains safety or health hazards that would be reasonably expected to adversely affect the Guest’s stay at the Accommodation in Aura’s judgment, or{'\n'}
                                    (iii) has vermin or contains pets not disclosed in the Listing.{'\n'}
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Scope of Aura Services{'\n'}</MyText>
                                        <MyText style={{marginVertical: 10}}>The Aura Platform is a digital accommodation booking service that enables registered users seeking temporary accommodation (“Guests”) and house owners (“Hosts”); who have short let houses or rooms in their houses (“Listings”) and other services to offer to publish Host Services on the Aura Platform and to communicate and transact directly. Hosts and Guests are collectively known as (“Members”).{'\n'}
                                        As the provider of the Aura Platform, Aura does not own, create, sell, resell, provide, control, manage, offer, deliver, or supply any Listings or Host Services. Hosts alone are responsible for their Listings and Host Services. When Members make or accept a booking, they are entering into a contract directly with each other.{'\n'}
                                        Aura is not and does not become a party to such contractual relationship between Members. Aura a real estate broker or insurer. Aura is not acting as an agent in any capacity for any Member, except as specified in the Payments Terms. Aura has no control over and does not guarantee: the existence, quality, safety, suitability, or legality of any Listings or Host Services, (the truth or accuracy of any Listing descriptions, ratings, reviews, or other Member Content or the performance or conduct of any Member or third party. Aura does not endorse any Member, Listing or Host Services. Any references to a Member being "verified" (or similar language) only indicate that the Member has completed a routine identification process with Aura and nothing else.{'\n'}
                                        Any such description is not an endorsement, certification or guarantee by Aura about any Member's identity or background or whether the Member is trustworthy, safe or suitable. Guests must always exercise due diligence and care when deciding whether to use any Host Services, accept a booking request from a Guest, or communicate and interact with other Members, whether online or in person. As a Host on Aura your relationship with us is limited to being an independent, third-party contractor, and not an employee, agent, joint-venture or partner of Aura for any reason, and you act exclusively on your own behalf and for your own benefit, and not on behalf, or for the benefit, of Aura.{'\n'}
                                        To promote the Aura Platform and to increase the exposure of Listings to potential Guests, Listings and other Member Content may be displayed on other websites, in applications, within emails, and in online and offline advertisements. To assist Members who speak different languages, Listings and other Member Content may be translated, in whole or in part, into other languages. Aura cannot guarantee the accuracy or quality of such translations and Members are responsible for reviewing and verifying the accuracy of such translations. The Aura Platform may contain links to Third-Party Services. Such Third-Party Services may be subject to different terms and conditions and privacy practices.{'\n'}
                                        Aura is not responsible or liable for the availability or accuracy of such Third-Party Services, or the content, products, or services available from such Third-Party Services. Links to such Third-Party Services are not an endorsement by Aura of such Third-Party Services.{'\n'}
                                        Due to the nature of the Internet, Aura cannot guarantee the continuous and uninterrupted availability and accessibility of the Aura Platform. Aura may restrict the availability of the Aura Platform or certain areas or features thereof, if this is necessary in view of capacity limits, the security or integrity of our servers, or to carry out maintenance measures that ensure the proper or improved functioning of the Aura Platform. Aura may improve, enhance and modify the Aura Platform and introduce new Aura Services from time to time.</MyText>
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Eligibility, Using the Aura Platform, Member Verification{'\n'}</MyText>
                                    In order to be a Member, you must be an individual at least 18 years old or a duly organized, validly existing business, organization or other legal entity in good standing under the laws of the country you are established and able to enter into legally binding contracts. Minors may only participate in a Host Service if accompanied by an adult who is responsible for them.{'\n'}
                                    You will comply with any applicable export control laws in your local jurisdiction.{'\n'}
                                    Aura may make access to and use of the Aura Platform, or certain areas or features of the Aura Platform, subject to certain conditions or requirements, such as completing a verification process, meeting specific quality or eligibility criteria, meeting Ratings or Reviews thresholds, or a Member’s booking and cancellation history.{'\n'}
                                    User verification on the Internet is difficult and we do not assume any responsibility for the confirmation of any Member’s identity. Notwithstanding the above, for transparency and fraud prevention purposes, and as permitted by applicable laws, we may, but have no obligation to{'\n'}
                                    (i) ask Members to provide a form of government identification or other information or undertake additional checks designed to help verify the identities or backgrounds of Members,{'\n'}
                                    (ii) screen Members against third party databases or other sources and request reports from service providers, and{'\n'}
                                    (iii) where we have sufficient information to identify a Member, obtain reports from public records of criminal convictions or sex offender registrations or an equivalent version of background or registered sex offender checks in your local jurisdiction (if available).{'\n'}
                                    The access to or use of certain areas and features of the Aura Platform may be subject to separate policies, standards or guidelines, or may require that you accept additional terms and conditions, before you can access the relevant areas or features of the Aura Platform. If there is a conflict between these Terms and terms and conditions applicable to a specific area or feature of the Aura Platform, the latter terms and conditions will take precedence with respect to your access to or use of that area or feature, unless specified otherwise in the latter terms and conditions.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Modification of these Terms{'\n'}</MyText>
                                    Aura reserves the right to modify these Terms at any time in accordance with this provision. If we make changes to these Terms, we will post the revised Terms on the Aura Platform and update the “Last Updated” date at the top of these Terms. We will also provide you with notice of the modifications by email at least thirty (30) days before the date they become effective. If you disagree with the revised Terms, you may terminate this Agreement with immediate effect. We will inform you about your right to terminate the Agreement in the notification email.
                                    If you do not terminate your Agreement before the date the revised Terms become effective, your continued access to or use of the Aura Platform will constitute acceptance of the revised Terms.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Account Registration{'\n'}</MyText>
                                        You can register an Aura Account using an email address and creating a password, or through certain social media accounts and Google accounts. You must provide accurate, current and complete information during the registration process and keep your Aura Account and public Aura Account profile page information up to date at all times.{'\n'}
                                        You may not register more than one (1) Aura Account unless Aura authorizes you to do so. You may not assign or otherwise transfer your Aura Account to another party. You are responsible for maintaining the confidentiality and security of your Aura Account credentials and may not disclose your credentials to any third party.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Content{'\n'}</MyText>
                                    Aura may, at its sole discretion, enable Members to{'\n'}
                                    (i) create, upload, post, send, receive and store Member Content; and{'\n'}
                                    (ii) access and view both Member Content and Aura Content. Aura Content and Member Content are together called "Collective Content".{'\n'}
                                        The Aura Platform, and Collective Content may in its entirety or in part be protected by copyright, trademark, and/or other laws of the Federal Republic of Nigeria and other countries. You acknowledge and agree that the Aura Platform and Aura Content, including all associated intellectual property rights, are the exclusive property of Aura and/or its licensors or authorizing third parties. You will not remove, alter or obscure any copyright, trademark, service mark or other proprietary rights notices incorporated in or accompanying the Aura Platform, Aura Content or Member Content. All trademarks, service marks, logos, trade names, and any other source identifiers of Aura used on or in connection with the Aura Platform and Aura Content are trademarks or registered trademarks of Aura in Nigeria. Trademarks, logos, copyrights, and any other proprietary designations of third parties used on or in connection with the Aura Platform, Aura Content, and/or Collective Content are used for identification purposes only and may be the property of their respective owners.{'\n'}
                                        You will not use, copy, adapt, modify, prepare derivative works of, distribute, license, sell, transfer, publicly display, publicly perform, transmit, broadcast or otherwise exploit the Aura Platform or Collective Content, except to the extent you are the legal owner of certain Member Content or as expressly permitted in these Terms. No licenses or rights are granted to you by implication or otherwise under any intellectual property rights owned or controlled by Aura or its licensors, except for the licenses and rights expressly granted in these Terms.{'\n'}
                                        Subject to your compliance with these Terms, Aura grants you a limited, non-exclusive, non-sublicensable, revocable, non-transferable license to{'\n'}
                                    (i) download and use the Application on your personal device(s); and{'\n'}
                                    (ii) access and view any Collective Content made available on or through the Aura Platform and accessible to you, solely for your personal and non-commercial use.
                                    By creating, uploading, posting, sending, receiving, storing, or otherwise making available any Member Content on or through the Aura Platform, you grant to Aura a non-exclusive, worldwide, royalty-free, irrevocable, perpetual (or for the term of the protection), sub-licensable and transferable license to such Member Content to access, use, store, copy, modify, prepare derivative works of, distribute, publish, transmit, stream, broadcast, and otherwise exploit in any manner such Member Content to provide and/or promote the Aura Platform, in any media or platform. Insofar as Member Content includes personal information, such Member Content will only be used for these purposes if such use complies with applicable data protection laws in accordance with our Privacy Policy. Unless you provide specific consent, Aura does not claim any ownership rights in any Member Content and nothing in these Terms will be deemed to restrict any rights that you may have to use or exploit your Member Content.
                                    You are solely responsible for all Member Content that you make available on or through the Aura Platform. Accordingly, you represent and warrant that:{'\n'}
                                    (i) you either are the sole and exclusive owner of all Member Content that you make available on or through the Aura Platform or you have all rights, licenses, consents and releases that are necessary to grant to Aura the rights in and to such Member Content, as contemplated under these Terms; and{'\n'}
                                    (ii) neither the Member Content nor your posting, uploading, publication, submission or transmittal of the Member Content or Aura's use of the Member Content (or any portion thereof) as contemplated under these Terms will infringe, misappropriate or violate a third party's patent, copyright, trademark, trade secret, moral rights or other proprietary or intellectual property rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation.{'\n'}
                                    You will not post, upload, publish, submit or transmit any Member Content that:{'\n'}
                                    (i) is fraudulent, false, misleading (directly or by omission or failure to update information) or deceptive;{'\n'}
                                    (ii) is defamatory, libellous, obscene, pornographic, vulgar or offensive;{'\n'}
                                    (iii) promotes discrimination, bigotry, hatred, harassment or harm against any individual or group;{'\n'}
                                    (iv) is violent or threatening or promotes violence or actions that are threatening to any other person or animal;{'\n'}
                                    (v) promotes illegal or harmful activities or substances; or{'\n'}
                                    (vi) violates these Terms or any other Aura policy. Aura may, without prior notice, remove or disable access to any Member Content that Aura finds to be in violation of applicable law or these Terms, or otherwise may be harmful or objectionable to Aura, its Members, third parties, or property.{'\n'}
                                    Aura respects copyright law and expects its Members to do the same. If you believe that any content on the Aura Platform infringes copyrights you own, please notify us.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Service Fees{'\n'}</MyText>
                                    Aura may charge fees to Hosts ("Host Fees") and/or Guests ("Guest Fees") (collectively, "Service Fees") in consideration for the use of the Aura Platform.
                                    Any applicable Service Fees (including any applicable Taxes) will be displayed to a Host or Guest prior to publishing or booking a Listing. Aura reserves the right to change the Service Fees at any time and will provide Members adequate notice of any fee changes before they become effective. Such fee changes will not affect any bookings made prior to the effective date of the fee change.
                                    You are responsible for paying any Service Fees that you owe to Aura. The applicable Service Fees (including any applicable Taxes) are collected by Aura Payments. Aura Payments will deduct any Host Fees from the Listing Fee before remitting the pay out to the Host. Any Guest Fees are included in the Total Fees collected by Aura Payments. Except as otherwise provided on the Aura Platform, Service Fees are non-refundable.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Terms specific for Hosts{'\n'}</MyText>
                                    Terms applicable to all Listings When creating a Listing through the Aura Platform you must{'\n'}
                                    (i) provide complete and accurate information about your Host Service (such as listing description, location, and calendar availability),{'\n'}
                                    (ii) disclose any deficiencies, restrictions (such as house rules) and requirements that apply (such as any minimum age, proficiency or fitness requirements for any part of the Host Service) and{'\n'}
                                    (iii) provide any other pertinent information requested by Aura. You are responsible for keeping your Listing information (including calendar availability) up to date at all times.{'\n'}
                                    You are solely responsible for setting a Listing Fee. Once a Guest requests a booking of your Listing, you may not request that the Guest pays a higher price than is stated in the booking request.
                                    Any terms and conditions included in your Listing, in particular in relation to cancellations, must not conflict with these Terms or the relevant cancellation policy for your Listing.
                                    Pictures, animations or videos (collectively, "Images") used in your Listings must accurately reflect the quality and condition of your Host Services. Aura reserves the right to require that Listings have a minimum number of Images of a certain format, size and resolution.
                                    When you accept or have pre-approved a booking request by a Guest, you are entering into a legally binding agreement with the Guest and are required to provide your Host Service(s) to the Guest as described in your Listing when the booking request is made. You also agree to pay the applicable Host Fee and any applicable Taxes.
                                    Aura recommends that Hosts obtain appropriate insurance for their Host Services.{'\n'}
                                    As a Host, you are responsible for your own acts and omissions and are also responsible for the acts and omissions of any individuals who reside at or are otherwise present at the Accommodation at your request or invitation, excluding the Guest and any individuals the Guest invites to the Accommodation.
                                    Listing Accommodations If you choose to require a Security Deposit for your Accommodation, you must specify this in your Listing Hosts are not allowed to ask for a Security Deposit{'\n'}
                                    (i) after a booking has been confirmed or{'\n'}
                                    (ii) outside of the Aura Platform.{'\n'}
                                    You represent and warrant that any Listing you post and the booking of, or a Guest's stay at, an Accommodation will{'\n'}
                                    (i) not breach any agreements you have entered into with any third parties, such as homeowners association, or other agreements, and{'\n'}
                                    (ii) comply with all applicable laws (such as zoning laws), Tax requirements, and other rules and regulations (including having all required permits, licenses and registrations).
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Terms specific for Guests{'\n'}</MyText>
                                    Terms applicable to all bookings Subject to meeting any requirements (such as completing any verification processes) set by Aura and/or the Host, you can book a Listing available on the Aura Platform by following the respective booking process. Your Total Fees will be presented to you prior to booking a Listing. You agree to pay the Total Fees for any booking requested in connection with your Aura Account.{'\n'}
                                    Upon receipt of a booking confirmation from Aura, a legally binding agreement is formed between you and your Host, subject to any additional terms and conditions of the Host that apply, including in particular the applicable cancellation policy and any rules and restrictions specified in the Listing. Aura Payments will collect the Total Fees at the time of the booking request or upon the Host’s confirmation.
                                    If you are booking for an additional guest who is a minor, you represent and warrant that you are legally authorized to act on behalf of the minor. {'\n'}Booking Accommodations{'\n'}
                                    You understand that Accommodation Booking is a limited license granted to you by the Host to enter, occupy and use the Accommodation for the duration of your stay, during which time the Host (only where and to the extent permitted by applicable law) retains the right to re-enter the Accommodation, in accordance with your agreement with the Host.
                                    You agree to leave the Accommodation no later than the checkout time that the Host specifies in the Listing or such other time as mutually agreed upon between you and the Host. If you Overstay, you no longer have a license to stay in the Accommodation and the Host is entitled to make you leave in a manner consistent with applicable law. In addition, you agree to pay Overstay Fees if requested by the Host, for each twenty-four (24) hour period (or any portion thereof) that you Overstay.
                                    Overstay Fees for late checkouts on the checkout date that do not impact upcoming bookings may be limited to the additional costs incurred by the Host as a result of such Overstay.{'\n'} If you Overstay at an Accommodation, you authorize Aura (via Aura Payments) to charge you to collect Overstay Fees. A Security Deposit, if required by a Host, may be applied to any Overstay Fees due for a Guest’s Overstay.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Booking Host Services{'\n'}</MyText>
                                        You should carefully review the description of any Host Service you intend to book to ensure you (and any additional guests you are booking for) meet any minimum age, proficiency, fitness or other requirements which the Host has specified in their Listing. The additional guests you are booking for must also be made aware of and agree to these Terms and any terms and conditions, rules and restrictions set by the Host.{'\n'}
                                        At your sole discretion you may want to inform the Host of any medical or physical conditions, or other circumstances that may impact your and any additional guest’s ability to participate in any Host Service. In addition, certain laws, like the minimum legal drinking age in the location of the Host Service, may also apply. You are responsible for identifying, understanding, and complying with all laws, rules and regulations that apply to your participation in a Host Service.{'\n'}
                                        Before and during a Host Service you must at all times adhere to the Hosts’ instructions.{'\n'}
                                        You may not bring any additional individuals to a Host Service unless such an individual was added by you as an additional guest during the booking process on the Aura Platform.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Booking Modifications, Cancellations and Refunds{'\n'}</MyText>
                                        Hosts and Guests are responsible for any Booking Modifications, and agree to pay any additional Listing Fees, Host Fees or Guest Fees and/or Taxes associated with such Booking Modifications.{'\n'}
                                        Guests can cancel a confirmed booking at any time pursuant to the Listing’s cancellation policies set by the Host, and Aura Payments will refund the amount of the Total Fees due to the Guest in accordance with such cancellation policy. Unless extenuating circumstances exist, any portion of the Total Fees due to the Host under the applicable cancellation policy will be remitted to the Host by Aura Payments.{'\n'}
                                        If a Host cancels a confirmed booking, the Guest will receive a full refund of the Total Fees for such booking. In some instances, Aura may allow the Guest to apply the refund to a new booking, in which case Aura Payments will credit the amount against the Guest’s subsequent booking at the Guest’s direction. Further, Aura may publish an automated review on the Listing cancelled by the Host indicating that a booking was cancelled. In addition, Aura may{'\n'}
                                        (i) keep the calendar for the Listing unavailable or blocked for the dates of the cancelled booking, and/or{'\n'}
                                        (ii) impose a penalty unless the Host has a valid reason for cancelling the booking or has legitimate concerns about the Guest’s behaviour.{'\n'}
                                        If weather poses a safety risk to Guests, or if it prevents a Host from carrying out a Host Service that takes place primarily outdoors, Hosts may cancel the Host Service. Hosts may also cancel the Host Service if other conditions exist that would prevent the Host from offering the Host Service safely.{'\n'}
                                        In certain circumstances, Aura may decide, in its sole discretion, that it is necessary to cancel a pending or confirmed booking and initiate corresponding refunds and pay-outs, where Aura believes in good faith, while taking the legitimate interests of both parties into account, this is necessary to avoid significant harm to Aura, other Members, third parties or property, or (ii) for any of the reasons set out in these Terms.{'\n'}
                                        If a Guest who books an Accommodation suffers a Travel Issue as defined in the Guest Refund Policy in Clause 10.8, Aura may determine, in its sole discretion, to refund the Guest part or all of the Total Fees in accordance with the Guest Refund Policy. If a Guest who books a Host Service suffers a Travel Issue as defined in the Guest Refund Policy, Aura may determine, in its sole discretion, to refund the Guest part or all of the Total Fees in accordance with the Guest Refund Policy.{'\n'}
                                        If a Guest or Aura cancels a confirmed booking, and the Guest receives a refund in accordance with clause 10.8 or the applicable cancellation policy set by the Host and mentioned in the Listing, after the Host has already been paid, Aura Payments will be entitled to recover the amount of any such refund from the Host, including by subtracting such refund amount out from any future pay-outs due to the Host.{'\n'}
                                        Guest Refund Policy: If you are a Guest and suffer a Travel Issue, you are covered by this clause as follows:{'\n'}
                                        Up to 24 hours after check-in. If you report a Travel Issue up to 24 hours after check-in, we agree, at our discretion, to either{'\n'}
                                        (i) reimburse you the Total Fees, or{'\n'}
                                        (ii) use our reasonable efforts to help you find and book for any unused nights left in your booking another Accommodation which is reasonably comparable to or better than the Accommodation described in your original booking in terms of size, rooms, features and quality. Aura shall decide whether an issue reported by a Guest qualifies as a Travel Issue, whether to reimburse or rebook a Guest who suffers a Travel Issue, and whether an alternate Accommodation is comparable or better.{'\n'}
                                        More than 24 hours after check-in. If you report a Travel Issue more than 24 hours after check-in, we agree, at our discretion, to either{'\n'}
                                        (i) reimburse you up to the Total Fees depending on the nature of the Travel Issue suffered, or{'\n'}
                                        (ii) use our reasonable efforts to help you find and book another Accommodation for any unused nights left in your booking which is reasonably comparable to the Accommodation described in your original booking in terms of size, rooms, features and quality.{'\n'}
                                        Aura’s decisions under this clause are final and binding on Guests and Hosts but do not affect other contractual or statutory rights you may have. Any right that you may have to initiate legal action remains unaffected.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Ratings and Reviews{'\n'}</MyText>
                                        Within a certain timeframe after completing a booking, Guests and Hosts can leave a Review and Rating about each other. Ratings or Reviews reflect the opinions of individual Members and do not reflect the opinion of Aura. Ratings and Reviews are not verified by Aura for accuracy and may be incorrect or misleading.{'\n'}
                                        Ratings and Reviews by Guests and Hosts must be accurate and may not contain any offensive or defamatory language. Ratings and Reviews.{'\n'}
                                        Members are prohibited from manipulating the Ratings and Reviews system in any manner, such as instructing a third party to write a positive or negative Review about another Member.{'\n'}
                                        Ratings and Reviews are part of a Member’s public profile and may also be surfaced elsewhere on the Aura Platform together with other relevant information such as number of bookings, number of cancellations, average response time and other information.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Damage to Accommodations, Disputes between Members{'\n'}</MyText>
                                        As a Guest, you are responsible for leaving the Accommodation (including any personal or other property located at the Accommodation) in the condition it was in when you arrived. You are responsible for your own acts and omissions and are also responsible for the acts and omissions of any individuals whom you invite to, or otherwise provide access to, the Accommodation, excluding the Host (and the individuals the Host invites to the Accommodation, if applicable).{'\n'}
                                        Where a Host makes a Damage Claim against a Guest, it shall be settled in accordance with the Dispute Resolution Procedure under these Term.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Taxes{'\n'}</MyText>
                                        As a Host you are solely responsible for determining your obligations to report, collect, remit or include in your Listing Fees any Taxes.{'\n'}
                                        Tax regulations may require us to collect appropriate Tax information from Hosts, or to withhold Taxes from pay-outs to Hosts, or both. If a Host fails to provide us with the required documentation under applicable law (e.g., tax identification number) that we determine to be sufficient to alleviate our obligation (if any) to withhold Taxes from pay-outs to you, we reserve the right to withhold pay-outs up to the tax-relevant amount as required by law, until resolution. -{'\n'}
                                        You understand that a Tax Authority may require Taxes to be collected from Guests or Hosts on Listing Fees, and to be remitted to the respective Tax Authority. The laws in jurisdictions may vary, but these Taxes may be required to be collected and remitted as a percentage of the Listing Fees set by Hosts, a set amount per day, or other variations, by whatever name such taxes are called ("Occupancy Taxes").{'\n'}
                                        In certain jurisdictions, Aura may decide in its sole discretion to facilitate collection and remittance of Occupancy Taxes from or on behalf of Guests or Hosts, in accordance with these Terms ("Collection and Remittance") if such jurisdiction asserts that Aura or Hosts have an Occupancy Tax collection and remittance obligation. In any jurisdiction in which we decide to facilitate direct Collection and Remittance, you hereby instruct and authorize Aura (via Aura Payments) to collect Occupancy Taxes from Guests on the Host's behalf at the time Listing Fees are collected, and to remit such Occupancy Taxes to the Tax Authority.{'\n'}
                                        The amount of Occupancy Taxes, if any, collected and remitted by Aura will be visible to and separately stated to both Guests and Hosts on their respective transaction documents. Where Aura is facilitating Collection and Remittance, Hosts are not permitted to collect any Occupancy Taxes being collected by Aura relating to their Accommodations in that jurisdiction.{'\n'}
                                        Guests and Hosts agree that we may seek additional amounts from you in the event that the Taxes collected and/or remitted are insufficient to fully discharge your obligations to the Tax Authority, and agree that your sole remedy for Occupancy Taxes collected is a refund of Occupancy Taxes collected by Aura from the applicable Tax Authority in accordance with applicable procedures set by that Tax Authority.{'\n'}
                                        Aura reserves the right, with prior notice to Hosts, to cease the Collection and Remittance in any jurisdiction for any reason at which point Hosts and Guests are once again solely responsible and liable for the collection and/or remittance of any and all Occupancy Taxes that may apply to Accommodations in that jurisdiction.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Prohibited Activities{'\n'}</MyText>
                                        You are solely responsible for compliance with any and all laws, rules, regulations, and Tax obligations that may apply to your use of the Aura Platform. In connection with your use of the Aura Platform, you will not and will not assist or enable others to:{'\n'}
                                        breach or circumvent any applicable laws or regulations, agreements with third-parties, third-party rights, or our Terms; use the Aura Platform or Collective Content for any commercial or other purposes that are not expressly permitted by these Terms or in a manner that falsely implies Aura endorsement, partnership or otherwise misleads others as to your affiliation with Aura; copy, store or otherwise access or use any information, including personally identifiable information about any other Member, contained on the Aura Platform in any way that is inconsistent with Privacy Policy or these Terms or that otherwise violates the privacy rights of Members or third parties; use the Aura Platform in connection with the distribution of unsolicited commercial messages ("spam"); offer, as a Host, any Accommodation that you do not yourself own or have permission to make available as a residential or other property through the Aura Platform; unless Aura explicitly permits otherwise, book any Listing if you will not actually be using the Host Services yourself; contact another Member for any purpose other than asking a question related to your own booking, Listing, or the Member's use of the Aura Platform, including, but not limited to, recruiting or otherwise soliciting any Member to join third-party services, applications or websites, without our prior written approval; use the Aura Platform to request, make or accept a booking independent of the Aura Platform, to circumvent any Service Fees or for any other reason; request, accept or make any payment for Listing Fees outside of the Aura Platform or Aura Payments. If you do so, you acknowledge and agree that you:{'\n'}
                                        (i) would be in breach of these Terms;{'\n'}
                                        (ii) accept all risks and responsibility for such payment, and{'\n'}
                                        (iii) hold Aura harmless from any liability for such payment; discriminate against or harass anyone on the basis of race, national origin, religion, gender identity, physical or mental disability, medical condition, marital status, age or sexual orientation, or otherwise engage in any violent, harmful, abusive or disruptive behaviour; use, display, mirror or frame the Aura Platform or Collective Content, or any individual element within the Aura Platform, Aura's name, any Aura trademark, logo or other proprietary information, or the layout and design of any page or form contained on a page in the Aura Platform, without Aura's express written consent; dilute, tarnish or otherwise harm the Aura brand in any way, including through unauthorized use of Collective Content, registering and/or using Aura or derivative terms in domain names, trade names, trademarks or other source identifiers, or registering and/or using domains names, trade names, trademarks or other source identifiers that closely imitate or are confusingly similar to Aura domains, trademarks, taglines, promotional campaigns or Collective Content; use any robots, spider, crawler, scraper or other automated means or processes to access, collect data or other content from or otherwise interact with the Aura Platform for any purpose; avoid, bypass, remove, deactivate, impair, descramble, or otherwise attempt to circumvent any technological measure implemented by Aura or any of Aura's providers or any other third party to protect the Aura Platform; attempt to decipher, decompile, disassemble or reverse engineer any of the software used to provide the Aura Platform; take any action that damages or adversely affects, or could damage or adversely affect the performance or proper functioning of the Aura Platform; export, re-export, import, or transfer the Application except as authorized by Nigeria law, the export control laws of your jurisdiction, and any other applicable laws; or violate or infringe anyone else’s rights or otherwise cause harm to anyone.
                                        You acknowledge that Aura has no obligation to monitor the access to or use of the Aura Platform by any Member or to review, disable access to, or edit any Member Content, but has the right to do so to{'\n'}
                                        (i) operate, secure and improve the Aura Platform (including without limitation for fraud prevention, risk assessment, investigation and customer support purposes);{'\n'}
                                        (ii) ensure Members’ compliance with these Terms;{'\n'}
                                        (iii) comply with applicable law or the order or requirement of a court, law enforcement or other administrative agency or governmental body;{'\n'}
                                        (iv) respond to Member Content that it determines is harmful or objectionable; or{'\n'}
                                        (v) as otherwise set forth in these Terms. Members agree to cooperate with and assist Aura in good faith, and to provide Aura with such information and take such actions as may be reasonably requested by Aura with respect to any investigation undertaken by Aura or a representative of Aura regarding the use or abuse of the Aura Platform.{'\n'}
                                        If you feel that any Member you interact with, whether online or in person, is acting or has acted inappropriately, including but not limited to anyone who{'\n'}
                                        (i) engages in offensive, violent or sexually inappropriate behaviour,{'\n'}
                                        (ii) you suspect of stealing from you, or{'\n'}
                                        (iii) engages in any other disturbing conduct, you should immediately report such person to the appropriate authorities and then to Aura by contacting us with your police station and report number (if available). You agree that any report you make will not obligate us to take any action (beyond that required by law, if any).
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Term and Termination, Suspension and other Measures{'\n'}</MyText>
                                        This Agreement shall be effective for a 30-day term, at the end of which it will automatically and continuously renew for subsequent 30-day terms until such time when you or Aura terminate the Agreement in accordance with this provision.{'\n'}
                                        You may terminate this Agreement at any time by sending us an email. Without limiting our rights specified below, Aura may terminate this Agreement for convenience at any time by giving you thirty (30) days' notice via email to your registered email address.{'\n'}
                                        Aura may immediately, without notice, terminate this Agreement and/or stop providing access to the Aura Platform if{'\n'}
                                        (i) you have materially breached your obligations under these Terms,{'\n'}
                                        (ii) you have violated applicable laws, regulations or third party rights, or{'\n'}
                                        (iii) Aura believes in good faith that such action is reasonably necessary to protect the personal safety or property of Aura, its Members, or third parties (for example in the case of fraudulent behaviour of a Member).{'\n'}
                                        In addition, Aura may take any of the following measures for a Just Cause:
                                        refuse to surface, delete or delay any Listings, Ratings, Reviews, or other Member Content; cancel any pending or confirmed bookings; limit your access to or use of the Aura Platform; temporarily or permanently revoke any special status associated with your Aura Account; temporarily or in case of severe or repeated offenses permanently suspend your Aura Account and stop providing access to the Aura Platform.{'\n'}
                                        If we take any of the measures described above{'\n'}
                                        (i) we may refund your Guests in full for any and all confirmed bookings that have been cancelled, irrespective of pre-existing cancellation policies, and{'\n'}
                                        (ii) you will not be entitled to any compensation for pending or confirmed bookings that were cancelled.{'\n'}
                                        In case of non-material breaches and where appropriate, you will be given notice of any intended measure by Aura and an opportunity to resolve the issue to Aura's reasonable satisfaction.{'\n'}
                                        When this Agreement has been terminated, you are not entitled to a restoration of your Aura Account or any of your Member Content. If your access to or use of the Aura Platform has been limited or your Aura Account has been suspended or this Agreement has been terminated by us, you may not register a new Aura Account or access and use the Aura Platform through an Aura Account of another Member.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Disclaimers{'\n'}</MyText>
                                        If you choose to use the Aura Platform or Collective Content, you do so voluntarily and at your sole risk. The Aura Platform and Collective Content is provided “as is”, without warranty of any kind, either express or implied.{'\n'}
                                        You agree that you have had whatever opportunity you deem necessary to investigate the Aura Services, laws, rules, or regulations that may be applicable to your Listings and/or Host Services you are receiving and that you are not relying upon any statement of law or fact made by Aura relating to a Listing.{'\n'}
                                        If we choose to conduct identity verification or background checks on any Member, to the extent permitted by applicable law, we disclaim warranties of any kind, either express or implied, that such checks will identify prior misconduct by a Member or guarantee that a Member will not engage in misconduct in the future.{'\n'}
                                        The foregoing disclaimers apply to the maximum extent permitted by law. You may have other statutory rights. However, the duration of statutorily required warranties, if any, shall be limited to the maximum extent permitted by law.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Liability{'\n'}</MyText>
                                        You acknowledge and agree that, to the maximum extent permitted by law, the entire risk arising out of your access to and use of the Aura Platform and Collective Content, your publishing or booking of any Listing via the Aura Platform, your stay at any Accommodation, participation in any Host Service, participation in the Group Payment Service, or any other interaction you have with other Members whether in person or online remains with you.{'\n'}
                                        Neither Aura nor any other party involved in creating, producing, or delivering the Aura Platform or Collective Content will be liable for any incidental, special, exemplary or consequential damages, including lost profits, loss of data or loss of goodwill, service interruption, computer damage or system failure or the cost of substitute products or services, or for any damages for personal or bodily injury or emotional distress arising out of or in connection with{'\n'}
                                        (i) these Terms,{'\n'}
                                        (ii) from the use of or inability to use the Aura Platform or Collective Content,{'\n'}
                                        (iii) from any communications, interactions or meetings with other Members or other persons with whom you communicate, interact or meet with as a result of your use of the Aura Platform, or{'\n'}
                                        (iv) from your publishing or booking of a Listing, including the provision or use of a Listing’s Host Services, whether based on warranty, contract, tort (including negligence), product liability or any other legal theory, and whether or not Aura has been informed of the possibility of such damage, even if a limited remedy set forth herein is found to have failed of its essential purpose.{'\n'}
                                        Except for our obligations to pay amounts to applicable Hosts pursuant to these Terms, in no event will Aura’s aggregate liability arising out of or in connection with these Terms and your use of the Aura Platform including, but not limited to, from your publishing or booking of any Listings via the Aura Platform, or from the use of or inability to use the Aura Platform or Collective Content and in connection with any Host Service, or interactions with any other Members, exceed the amounts you have paid or owe for bookings via the Aura Platform as a Guest in the twelve (12) month period prior to the event giving rise to the liability, or if you are a Host, the amounts paid by Aura to you in the twelve (12) month period prior to the event giving rise to the liability, or NGN 35,000, if no such payments have been made, as applicable. The limitations of damages set forth above are fundamental elements of the basis of the bargain between Aura and you.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Indemnification{'\n'}</MyText>
                                        To the maximum extent permitted by applicable law, you agree to release, defend (at Aura’s option), indemnify, and hold Aura and its affiliates and subsidiaries, including but not limited to, Aura Payments, and their officers, directors, employees and agents, harmless from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with{'\n'}
                                        (i) your breach of these Terms,{'\n'}
                                        (ii) your improper use of the Aura Platform or any Aura Services,{'\n'}
                                        (iii) your interaction with any Member, stay at an Accommodation, participation in a Host Service, , including without limitation any injuries, losses or damages (whether compensatory, direct, incidental, consequential or otherwise) of any kind arising in connection with or as a result of such interaction, stay, participation or use,{'\n'}
                                        (iv) Aura’s Collection and Remittance of Occupancy Taxes, or{'\n'}
                                        (v) your breach of any laws, regulations or third party rights.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Dispute Resolution{'\n'}</MyText>
                                        Overview of Dispute Resolution Process. Aura is committed to participating in a consumer-friendly dispute resolution process. To that end, these Terms provide for a two-part process for Members:{'\n'}
                                        (1) an informal negotiation directly with Aura’s customer service team, and{'\n'}
                                        (2) a binding arbitration administered by a sole arbitrator appointed in accordance with the Arbitration and Conciliation Act, CAP A18, LFN 2004.{'\n'}
                                        Pre-Arbitration Dispute Resolution and Notification. Prior to initiating an arbitration, you and Aura each agree to notify the other party of the dispute and attempt to negotiate an informal resolution to it first. We will contact you at the email address you have provided to us; you can contact Aura’s customer service team by emailing us. If after a good faith effort to negotiate one of us feels the dispute has not and cannot be resolved informally, the party intending to pursue arbitration agrees to notify the other party via email prior to initiating the arbitration. In order to initiate arbitration, a notice must be given to the other party and to Aura.{'\n'}
                                        Agreement to Arbitrate. You and Aura mutually agree that any dispute, claim or controversy arising out of or relating to these Terms or the applicability, breach, termination, validity, enforcement or interpretation thereof, or to the use of the Aura Platform, the Host Services, or the Collective Content (collectively, “Disputes”) will be settled by binding arbitration (the “Arbitration Agreement”). If there is a dispute about whether this Arbitration Agreement can be enforced or applies to our Dispute, you and Aura agree that the arbitrator will decide that issue.{'\n'}
                                        Exceptions to Arbitration Agreement. You and Aura each agree that the following claims are exceptions to the Arbitration Agreement and will be brought in a judicial proceeding in a court of competent jurisdiction:{'\n'}
                                        (i) Any claim related to actual or threatened infringement, misappropriation or violation of a party’s copyrights, trademarks, trade secrets, patents, or other intellectual property rights;{'\n'}
                                        (ii) Any claim seeking emergency injunctive relief based on exigent circumstances (e.g., imminent danger or commission of a crime, hacking, cyber-attack).{'\n'}
                                        Arbitrator’s Decision. The arbitrator’s decision will include the essential findings and conclusions upon which the arbitrator based the award. Judgment on the arbitration award may be entered in any high court in Nigeria. The arbitrator may award declaratory or injunctive relief only on an individual basis and only to the extent necessary to provide relief warranted by the claimant’s individual claim.{'\n'}
                                        No Class Actions or Representative Proceedings. You and Aura acknowledge and agree that, to the fullest extent permitted by law, we are each waiving the right to participate as a plaintiff or class member in any purported class action lawsuit, class-wide arbitration, private attorney general action, or any other representative proceeding as to all Disputes. Further, unless you and Aura both otherwise agree in writing, the arbitrator may not consolidate more than one party’s claims and may not otherwise preside over any form of any class or representative proceeding.{'\n'}
                                        Severability. In the event that any portion of this Arbitration Agreement is deemed illegal or unenforceable, such provision shall be severed and the remainder of the Arbitration Agreement shall be given full force and effect.{'\n'}
                                        Changes. Notwithstanding the provisions of Clause 4 (“Modification of these Terms”), if Aura changes this Clause 19 (“Dispute Resolution”) after the date you last accepted these Terms (or accepted any subsequent changes to these Terms), you may reject any such change by sending us written notice (including by email) within thirty (30) days of the date such change became effective, as indicated in the “Last Updated” date above or in the date of Aura’s email to you notifying you of such change. Rejecting a new change, however, does not revoke or alter your prior consent to any earlier agreements to arbitrate any Dispute between you and Aura (or your prior consent to any subsequent changes thereto), which will remain in effect and enforceable as to any Dispute between you and Aura.{'\n'}
                                        Survival. This Clause 19 will survive any termination of these Terms and will continue to apply even if you stop using the Aura Platform or terminate your Aura Account.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>Applicable Law and Jurisdiction{'\n'}</MyText>
                                        These Terms will be interpreted in accordance with the laws of the Federal Republic of Nigeria, without regard to conflict-of-law provisions and the courts of Nigeria shall have jurisdiction over disputes arising from these Terms.
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginVertical: 10}]}>
                                    <MyText style={[textH3Style, textBold, { marginVertical: 10}]}>General Provisions{'\n'}</MyText>
                                        Except as they may be supplemented by additional terms and conditions, policies, guidelines or standards, these Terms constitute the entire Agreement between Aura and you pertaining to the subject matter hereof, and supersede any and all prior oral or written understandings or agreements between Aura and you in relation to the access to and use of the Aura Platform.{'\n'}
                                        These Terms do not and are not intended to confer any rights or remedies upon any person other than the parties. If any provision of these Terms is held to be invalid or unenforceable, such provision will be struck and will not affect the validity and enforceability of the remaining provisions.{'\n'}
                                        Aura’s failure to enforce any right or provision in these Terms will not constitute a waiver of such right or provision unless acknowledged and agreed to by us in writing. Except as expressly set forth in these Terms, the exercise by either party of any of its remedies under these Terms will be without prejudice to its other remedies under these Terms or otherwise permitted under law.{'\n'}
                                        You may not assign, transfer or delegate this Agreement and your rights and obligations hereunder without Aura's prior written consent. Aura may without restriction assign, transfer or delegate this Agreement and any rights and obligations hereunder, at its sole discretion, with 30 days prior notice. Your right to terminate this Agreement at any time remains unaffected.
                                </MyText>
                            </View>

                            
                        </View>
                    </ScrollView>
                    <View style={{ position: 'absolute', zIndex: 1000, bottom: 0, width: '100%', backgroundColor: colors.white, paddingBottom: 15}}>
                        <View style={[flexRow, { justifyContent: 'space-between', marginVertical: 10, paddingHorizontal: 20}]}>
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
                 
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 150 : 140, marginBottom: 80
    },

});
