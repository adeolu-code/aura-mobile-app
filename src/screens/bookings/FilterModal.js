/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity, Alert,
    Modal, TouchableWithoutFeedback,Text
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider'
import moment from "moment";

import { urls, Request, successMessage } from '../../utils'

class FilterModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false };
        console.log("filter prop", props);
    }

    reportitem = (itemId) => {
        this.props.navigation.navigate('Profile', {screen: 'Complaint',params: {propertyId: itemId}});
        this.props.onDecline();
    }

    onPress = () => {
        this.props.onPress && this.props.onPress("viewProperty");
        this.props.onDecline();
    }

    cancelBooking = (item) => {
        this.props.navigation.navigate('CancelBookings', {booking: item});
        this.props.onDecline();   
    }

    extendStay = (item) => {
        this.props.onPress && this.props.onPress("extendStay");
        this.props.onDecline();
    }

    render() {
        const { visible, onDecline, property, img, type } = this.props;
        const { textDarkGrey, textBold, textDanger, textDarkBlue } = GStyles;
        const { container, dash, tabOne, tabTwo, tabThree, tabFour,  imgStyle, container2, inActiveTab } = styles;
        const item = property;
        return (

            <Modal visible={visible} onRequestClose={() => { }} animationType="slide">
                <TouchableWithoutFeedback onPress={() => onDecline()} style={{backgroundColor: 'white'}}>
                    <>
                    <View style={container2}>
                        <View style={container}>
                            <TouchableOpacity 
                                style={[tabTwo, (item.approval_Info.name == "Approved") ? tabTwo: inActiveTab]} 
                                onPress={() => (item.approval_Info.name == "Approved") && this.cancelBooking(item)}
                            >
                                <MyText style={[textDarkGrey, textBold]}>
                                        Cancel Booking
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            <TouchableOpacity 
                                style={[tabTwo, (item.approval_Info.name == "Approved") ? tabTwo: inActiveTab]} 
                                onPress={() => (item.approval_Info.name == "Approved") && this.extendStay(item)}
                            >
                                <MyText style={[textDarkGrey, textBold]}>
                                        Extend Stay
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            <TouchableOpacity style={tabTwo} onPress={() => this.onPress(item.id)}>
                                <MyText style={[textDarkBlue, textBold]}>
                                        View {item.propertyInfo.type}
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            <TouchableOpacity style={tabTwo} onPress={() => this.reportitem(item.propertyInfo.id)}>
                                <MyText style={[textDarkBlue, textBold]}>
                                        Report Host
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            <TouchableOpacity style={tabTwo} onPress={onDecline}>
                                <MyText style={[textDarkBlue, textBold]}>
                                        Cancel
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                        </View>
                    </View>
                        
                    </>
                </TouchableWithoutFeedback>
            </Modal>

        );
    }
}

export class ExperienceFilterModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    reportitem = (itemId) => {
        this.props.navigation.navigate('Profile', {screen: 'Complaint',params: {itemId: itemId}});
        this.props.onDecline();
    }

    onPress = () => {
        this.props.onPress() && this.props.onPress();
        this.props.onDecline();
    }

    render() {
        const { visible, onDecline, experience, img, type } = this.props;
        const { textDarkGrey, textBold, textDanger, textDarkBlue, textGrey } = GStyles;
        const { container, dash, tabOne, tabTwo, tabThree, tabFour,  imgStyle, container2, inActiveTab } = styles;
        
        const item = experience;
        const now = moment(new Date());
        const timeDiff  = moment.duration(moment(item.start_Date).diff(now)).asDays()
        return (
            //ExperienceFilterModal
            

            <Modal visible={visible} onRequestClose={() => { }} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={() => onDecline()}>
                    <>
                    <View style={container2}>
                        <View style={container}>
                            <TouchableOpacity 
                                style={[tabTwo, (item.approval_Status == "EXP") ? inActiveTab : tabTwo]} 
                                onPress={() => (item.approval_Status != "EXP") && this.onEdit}
                            >
                                <MyText style={[textDarkGrey, textBold, ((item.approval_Status == "EXP") && textGrey)]}>
                                        Cancel Booking
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            <TouchableOpacity 
                                style={[tabTwo, (timeDiff < 1 && inActiveTab)]} 
                                onPress={() => this.onPress(item.id)}>
                                <MyText style={[textDarkBlue, textBold, (timeDiff < 1 && inActiveTab) && textGrey]}>
                                        Edit Schedules
                                </MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={tabTwo} onPress={() => this.onPress(item.id)}>
                                <MyText style={[textDarkBlue, textBold]}>
                                        View Tour
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            {
                                !item.is_Paid && 
                            
                                <TouchableOpacity style={tabTwo} onPress={() => this.onPress(item.id)}>
                                    <MyText style={[textDarkBlue, textBold]}>
                                            Make Payment
                                    </MyText>
                                </TouchableOpacity>
                            }
                            <View style={dash}></View>
                            <TouchableOpacity style={tabTwo} onPress={onDecline}>
                                <MyText style={[textDarkBlue, textBold]}>
                                        Cancel
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                        </View>
                    </View>
                        
                    </>
                </TouchableWithoutFeedback>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 5, overflow: 'hidden',
        width: '95%',
    },
    container2: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        width: '100%', 
        height: '100%', 
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        borderRadius: 60,
        height: 60,
        width: 60,
        alignContent: 'center',
        overflow: "hidden",
    },
    dash: {
        height: 1,
        backgroundColor: colors.lightGrey,
    },
    tabOne: {
        backgroundColor: '#EEF1F8',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabTwo: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 74,
    },
    tabThree: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 74,
    },
    tabFour: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 74,
    },
    activeStyle: {
        height: 16, width: 16, marginRight: 10,
        borderRadius: 14, 
    },
    inActiveTab: {
        backgroundColor: '#EEF1F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 74,
    },
    bgGreen: {
        backgroundColor: colors.success,
    },
    bgDanger: {
        backgroundColor: colors.secondary
    }
});

export default FilterModal;
