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

import { urls, Request, GetRequest, successMessage } from '../../utils'

class FilterModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    reportProperty = (propertyId) => {
        this.props.navigation.navigate('Profile', {screen: 'Complaint',params: {propertyId: propertyId}});
        this.props.onDecline();
    }

    linkToHouseSingle = () => {
        this.props.linkToSingleHouse();
        this.props.onDecline();
    }

    render() {
        const { visible, onDecline, property, img, type } = this.props;
        const { textDarkGrey, textBold, textDanger, textDarkBlue } = GStyles;
        const { container, dash, tabOne, tabTwo, tabThree, tabFour,  imgStyle, container2, inActiveTab } = styles;
        return (

            <Modal visible={visible} onRequestClose={() => { }} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={() => onDecline()}>
                    <>
                    <View style={container2}>
                        <View style={container}>
                        <TouchableOpacity 
                            style={[tabTwo, (property.approval_Info.name == "Approved") ? tabTwo: inActiveTab]} 
                            onPress={() => (property.approval_Info.name == "Approved") && this.onEdit}
                        >
                                <MyText style={[textDarkGrey, textBold]}>
                                        Cancel Booking
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            <TouchableOpacity style={tabTwo} onPress={() => this.linkToHouseSingle(property.id)}>
                                <MyText style={[textDarkBlue, textBold]}>
                                        View {property.propertyInfo.type}
                                </MyText>
                            </TouchableOpacity>
                            <View style={dash}></View>
                            <TouchableOpacity style={tabTwo} onPress={() => this.reportProperty(property.propertyInfo.id)}>
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
