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
import { urls, Request, successMessage } from '../../utils';



class CashRefundModal extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, formErrors: [], cancel: '', error: '' };
    }
    
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    onCancelBooking = async () => {
        try {
            const { reservation } = this.props
            this.setState({ loading: true, error: '' })
            const obj = {
                booking_Id: reservation.id, cancellationReason: this.state.cancel
            }
            const res = await Request(urls.bookingBase, `${urls.v}bookings/cancellation/host/declinebooking`, obj)
            if(res.isError) {
                this.setState({ error: res.message })
            } else {
                setTimeout(() => {
                    successMessage(res.message)
                }, 50);
                this.props.onDecline()
            }
            console.log('cash refund ', res)
            this.setState({ loading: false })
        } catch (error) {
            console.log('refund error ', error)
            this.setState({ loading: false })
        }
    }

    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    renderError = () => {
        const { textCenter, textDanger, textH4Style } = GStyles
        if(this.state.error) {
            return (
                <View style={{ marginBottom:10}}>
                    <MyText style={[textCenter, textDanger, textH4Style]}>{this.state.error}</MyText>
                </View>
            )
        }
    }
    

    render() {
        const { visible, onDecline, reservation } = this.props;
        const { modalContainer, modalHeader, lineStyle, closeStyle, 
            headerStyle, container, } = styles;
        const { textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, textH6Style, textRight, textSuccess,
        textH4Style, textBold, flexRow, imgStyle, textH3Style, textGrey, textWhite, textGreen, textUnderline, textOrange } = GStyles;

        return (

            <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
               
                <View style={modalContainer}>
                    {this.renderLoading()}
                    <View style={container} >
                        <View style={[flexRow, modalHeader]}>
                            <View style={{ flex: 6, alignItems: 'center'}}>
                                <View style={lineStyle}></View>
                            </View>
                            <TouchableOpacity style={closeStyle} onPress={onDecline}>
                                <Icon type="Feather" name="x" />
                            </TouchableOpacity>
                        </View>
                        <View style={headerStyle}>
                            <MyText style={[textH3Style, textExtraBold, textOrange, textCenter]}>Cash Refund Summary</MyText>
                        </View>
                        
                        <View style={{ marginBottom: 20}}>
                            <CustomInput placeholder="Cancellation Reason" label="Cancellation Reason" onChangeText={this.onChangeValue} value={this.state.cancel}
                            attrName="cancel" />
                        </View>

                        <View style={[flexRow, styles.rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Amount Per Night</MyText>
                                <MyText style={[textH4Style, textBold]}><MyText style={[textH6Style]}>₦</MyText> {formatAmount(reservation.cost_Per_Night)} / night</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>No. of Days</MyText>
                                <MyText  style={[textH4Style, textBold, textRight]}>{reservation.no_Of_Days} Day(s)</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, styles.rowContainer]}>
                            
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Total Stay</MyText>
                                <MyText style={[textH4Style, textBold]}><MyText style={[textH6Style]}>₦</MyText> {formatAmount(reservation.total_Cost)}</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Deduction</MyText>
                                <MyText  style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>₦</MyText> / night</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, styles.rowContainer]}>
                            
                            <View>
                                <MyText style={[textH5Style, textGrey, textGreen, textBold, { marginBottom: 4}]}>Total Refund</MyText>
                                <MyText style={[textH4Style, textBold]}><MyText style={[textH6Style]}> ₦</MyText> {formatAmount(reservation.total_Cost)}</MyText>
                            </View>
                            
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 60}}>
                            {this.renderError()}
                            <CustomButton buttonText="Decline Booking" onPress={this.onCancelBooking} />
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
        // height: Dimensions.get('window').height - 20
        // paddingHorizontal: 20,
        justifyContent: 'flex-end',
        // alignItems: 'flex-end'
    },
    modalHeader: {
        marginTop: 30, marginBottom: 30, alignItems: 'center',
        // paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 20, paddingHorizontal: 20
    },
    lineStyle: {
        width: '20%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
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
        // paddingTop: 130,
        // flex: 1, 
        justifyContent: 'flex-end'
      },
});

export default CashRefundModal;
