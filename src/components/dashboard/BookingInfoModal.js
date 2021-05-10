/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback, ScrollView, Dimensions, Keyboard,
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, CustomInputNumber, Loading, Error, CustomInput } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { formatAmount } from '../../helpers';
import { urls, Request, successMessage, SCREEN_HEIGHT } from '../../utils';
import StarComponent from '../StarComponent';

import moment from 'moment';



class BookingInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, formErrors: [], cancel: '', error: '' };
    }
    
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }

    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    statusColor = () => {
        const { reservation } = this.props;
        const { textSuccess, textOrange, textDanger, textGrey } = GStyles
        switch (reservation.approval_Info.name.toLowerCase()) {
            case 'approved':
              return textSuccess
            case 'expired':
              return textOrange 
            case 'cancelled':
                return textDanger
            default:
                return textGrey
        }
    }
    

    render() {
        const { visible, onDecline, reservation, house } = this.props;
        const { modalContainer, modalHeader, lineStyle, closeStyle, 
            headerStyle, container, } = styles;
        const { textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, textH6Style, textRight, textSuccess,
        textH4Style, textBold, flexRow, imgStyle, textH3Style, textGrey, textWhite, textGreen, textUnderline, 
        textOrange, textLgStyle } = GStyles;

        const imgUrl = reservation.userIdentityUrl ? {uri: reservation.userIdentityUrl} : require('../../assets/images/profile.png')

        return (

            <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
               
                <View style={modalContainer}>
                    {this.renderLoading()}
                    <View style={container} >
                        <View style={[flexRow, modalHeader]}>
                            <View style={{ flex: 6 }}>
                                <MyText style={[textH2Style, textExtraBold, textOrange ]}>Booking Information</MyText>
                            </View>
                            <TouchableOpacity style={closeStyle} onPress={onDecline}>
                                <Icon type="Feather" name="x" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: SCREEN_HEIGHT - 160}}>
                        <ScrollView>
                            <View>
                                <View>
                                    <MyText style={[textH3Style, textExtraBold, textDarkGrey, { marginBottom: 10}]}>{reservation.propertyInfo.title}</MyText>
                                    <StarComponent style={styles.iconStyle} grey rating={house.rating} />
                                    <MyText style={[textH4Style, textGrey]}>{house.address}, {house.district} {house.state}</MyText>
                                    
                                </View>
                                <View style={styles.imageContainer}>
                                    <Image source={imgUrl} resizeMode="cover" 
                                    style={{ width: '100%', height: '100%'}} />
                                </View>
                            </View>
                            
                            <View style={[flexRow, styles.rowContainer]}>
                                <View>
                                    <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Check-In</MyText>
                                    <MyText  style={[textH4Style, textBold]}>{moment(reservation.check_In_Date).format('DD/MM/YYYY')}</MyText>
                                </View>
                                <View>
                                    <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Check-out</MyText>
                                    <MyText style={[textH4Style, textBold]}>{moment(reservation.check_Out_Date).format('DD/MM/YYYY')}</MyText>
                                </View>
                            </View>

                            <View style={[flexRow, styles.rowContainer]}>
                                <View>
                                    <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Check-In Time</MyText>
                                    <MyText  style={[textH4Style, textBold]}>
                                        {moment(reservation.arrival_Time_From, "hh:mm:ss").format('hh:mm a')}</MyText>
                                </View>
                                <View>
                                    <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Check-Out Time</MyText>
                                    <MyText style={[textH4Style, textBold, textRight]}>
                                        {moment(reservation.arrival_Time_To, "hh:mm:ss").format('hh:mm a')}</MyText>
                                </View>
                            </View>
                            
                            <View style={[flexRow, styles.rowContainer]}>
                                <View>
                                    <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>No. of Room(s)</MyText>
                                    <MyText  style={[textH4Style, textBold]}>{reservation.no_Of_Rooms} Room(s)</MyText>
                                </View>
                                <View>
                                    <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>No of Guest(s)</MyText>
                                    <MyText style={[textH4Style, textBold, textRight]}>{reservation.no_Of_Guest} Guest(s)</MyText>
                                </View>
                            </View>

                            <View style={[flexRow, styles.rowContainer]}>
                                <View>
                                    <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>No. of Days</MyText>
                                    <MyText  style={[textH4Style, textBold]}>{reservation.no_Of_Days} Day(s)</MyText>
                                </View>
                                <View>
                                    <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Per Night</MyText>
                                    <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>₦</MyText> {formatAmount(reservation.cost_Per_Night)} / night</MyText>
                                </View>
                            </View>
                            <View style={[flexRow, styles.rowContainer]}>
                                <View>
                                    <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Payment Method</MyText>
                                    <MyText  style={[textH4Style, textBold]}>{reservation.payment_Method}</MyText>
                                </View>
                                <View>
                                    <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Paid</MyText>
                                    <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>₦</MyText> {formatAmount(reservation.total_Cost)}</MyText>
                                </View>
                                
                                
                            </View>
                            <View style={[flexRow, styles.rowContainer]}>
                                <View>
                                    <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Date Booked</MyText>
                                    <MyText style={[textH4Style, textBold]}>{moment(reservation.date_Booked).format('DD/MM/YYYY')}</MyText>
                                </View>
                                <View>
                                    <MyText style={[textH5Style, textGrey,textRight, { marginBottom: 4}]}>Status</MyText>
                                    <MyText style={[textH4Style, textBold, this.statusColor()]}>{reservation.approval_Info.name}</MyText>
                                </View>
                            </View>
                        </ScrollView>
                        </View>

                    </View>
                        
                </View>
                    
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)', flex: 1, 
        justifyContent: 'flex-end',
    },
    modalHeader: {
        marginTop: 20, marginBottom: 20, alignItems: 'center',
        // paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 20, paddingHorizontal: 20
    },
    
    closeStyle: {
        height: 30, flex: 1, justifyContent:'flex-end',alignItems: 'flex-end', 
    },
    rowContainer: {
        paddingBottom: 25, justifyContent: 'space-between'
    },
    container: {
        backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15,
        paddingHorizontal: 24,
        justifyContent: 'flex-end'
    },
    imageContainer: {
        width: '100%', height: 250, overflow: 'hidden', borderRadius: 10, marginTop: 15, marginBottom: 15
    },
    iconStyle: {
        fontSize: 16
    },
});

export default BookingInfoModal;
