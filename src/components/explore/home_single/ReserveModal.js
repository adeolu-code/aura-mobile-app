/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import { Icon } from 'native-base';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, CustomButton, ItemCountPicker, Error } from '../../../utils/Index';
import TimePicker from './TimePicker'

import moment from 'moment'
import { formatAmount } from '../../../helpers'
import { errorMessage, SCREEN_HEIGHT } from '../../../utils';



class ReserveModal extends Component {
    constructor(props) {
        super(props);
        this.state = { formData: {
                // Arrival_Time_From: '',
                // Arrival_Time_To: '',
                no_Of_Guest: 1, no_Of_Rooms: 1,
            }, errors: []
        };
    }
    setTimeIn = (value) => {
        const { formData } = this.state;
        this.setState({ errors: []})
        const obj = { ...formData, Arrival_Time_From: moment(value).format('HH:mm:ss') }
        this.checkTimeNotLowerThanCurrentTime(moment(value).format('HH:mm'), true)
        this.setState(() => ({ formData: obj }), () => {
            if(formData.Arrival_Time_To) {
                this.checkTimeNotLowerThanCurrentTime(formData.Arrival_Time_To, false)
            }
            this.checkBookingTime()
        })
    }
    setTimeOut = (value) => {
        const { formData } = this.state;
        this.setState({ errors: []})
        const obj = { ...formData, Arrival_Time_To: moment(value).format('HH:mm:ss') }
        this.checkTimeNotLowerThanCurrentTime(moment(value).format('HH:mm'), false)
        this.setState(() => ({ formData: obj }), () => {
            if(formData.Arrival_Time_From) {
                this.checkTimeNotLowerThanCurrentTime(formData.Arrival_Time_From, true)
            }
            this.checkBookingTime()
        })
    }
    checkTimeNotLowerThanCurrentTime = (time, checkIn) => {
        const { formData } = this.props;
        const { errors } = this.state;
        const newDate = checkIn ? formData.check_In_Date : formData.check_Out_Date
        const newTime = new Date(`${newDate} ${time}`)
        const diff = moment(newTime).diff(new Date())
        // console.log('Time to Lower ', diff, newTime, moment())
        if(diff < 5) {
            const arr = [...errors, 'Please set time that is not less than the current time']
            this.setState({ errors: arr })
        } 
    }
    checkBookingTime = () => {
        const { Arrival_Time_To, Arrival_Time_From } = this.state.formData;
        const { errors } = this.state
        const { formData } = this.props
        if(Arrival_Time_From && Arrival_Time_To) {
            const checkInTime = new Date(`${formData.check_In_Date} ${Arrival_Time_From}`)
            const checkOutTime = new Date(`${formData.check_Out_Date} ${Arrival_Time_To}`)
            const diff = moment(checkOutTime).diff(moment(checkInTime), 'seconds')
            console.log(checkOutTime, checkInTime, diff)
            if(diff < 5) {
                const arr = [...errors, 'Checkout time should not be smaller than checkin time']
                this.setState({ errors: arr})
            } 
        }
        
    }
    setCountValue = (value) => {
        const { formData } = this.state;
        const obj = { ...formData, no_Of_Guest: value }
        this.setState({ formData: obj })
    }
    setRoomsValue = (value) => {
        const { formData } = this.state;
        const obj = { ...formData, no_Of_Rooms: value }
        this.setState({ formData: obj })
    }
    onDecline = () => {
        this.setState({ errors: []})
        this.props.onDecline();
        this.props.back()
        // setTimeout(() => {
        //     this.props.back()
        // }, 10);
    }
    renderError = () => {
        const { errors } = this.state
        if(errors.length !== 0) {
            return (<Error errors={errors} />)
        }
    }
    validate = () => {
        const { Arrival_Time_From, Arrival_Time_To, no_Of_Guest } = this.state.formData
        const { errors } = this.state
        // if(Arrival_Time_From === '' || Arrival_Time_To === '' || errors.length !== 0) {
        //     return true
        // }
        if(errors.length !== 0 || this.checkTotal() === 0) {
            return true
        }
        return false
    }
    
    submit = () => {
        const { formData } = this.state
        const { house } = this.props
        this.setState({ errors: []})
        if(house && house.propertyType.name !== 'Hotel') {
            delete formData.no_Of_Rooms
        }
        if(this.checkTotal() < house.minimumDaysUsable) {
            this.setState({ errors: [`You can't book less than ${house.minimumDaysUsable} day(s)`]})
        } else if(this.checkTotal() > house.maximumDaysUsable) {
            this.setState({ errors: [`You can't book more than ${house.maximumDaysUsable} day(s)`]})
        } else {
            this.props.onDecline();
            this.props.submit(formData)
        }
        // console.log(formData)
        
    }
    checkTotal = () => {
        const { formData } = this.props
        const checkOutDate = moment(new Date(formData.check_Out_Date))
        const checkInDate = moment(new Date(formData.check_In_Date))
        const diff = checkOutDate.diff(checkInDate, 'day')
        return diff
    }

    backAction = () => {
        // this.onDecline()
        // Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //   {
        //     text: "Cancel",
        //     onPress: () => null,
        //     style: "cancel"
        //   },
        //   { text: "YES", onPress: () => BackHandler.exitApp() }
        // ]);
        return true;
    }

    componentDidMount() {
        // this.backHandler = BackHandler.addEventListener(
        //   "hardwareBackPress",
        //   this.backAction
        // );
    }

    componentWillUnmount() {
        // this.backHandler.remove();
    }
    renderDiscountMessage = () => {
        const { discount } = this.props
        const { textH5Style, textSuccess } = GStyles
        if(discount) {
            const endDate = moment(`${discount.discountEndDate} ${discount.discountEndTime}`, 'YYYY-MM-DD HH:mm:ss').format('LLL');
            const startDate = moment(`${discount.discountStartDate} ${discount.discountStartTime}`, 'YYYY-MM-DD HH:mm:ss').format('LLL');
            return (
                <View style={{ paddingHorizontal: 20, marginBottom: 10}}>
                    <View style={styles.discountContainer}>
                        <MyText style={[textH5Style, textSuccess]}>Discount Valid from {startDate} Till {endDate}</MyText>
                    </View>
                </View>
            )
        }
    }
    

  render() {
    const { visible, onDecline } = this.props;
    const { modalContainer, contentContainer, modalHeader, lineStyle, closeStyle, buttomStyle, container, itemCountContainer,
        headerStyle, mainHeader, checkInStyle, checkOutStyle, buttonStyle, buttonContainerStyle, timeContainer, divider } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, textH6Style, textBold, textRight,
        textH4Style, textGrey, textH3Style, textSuccess, upperCase } = GStyles;
    const { formData, house, discount } = this.props

    const formattedAmount = discount ? house.pricePerNight * ((100 - discount.discountValue)/100) : house.pricePerNight
    
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}} statusBarTranslucent>
            <View style={container}>
                <View style={styles.emptyContainer} />
                <View style={modalContainer}>
                    <View style={mainHeader}>
                        <View style={[flexRow, modalHeader]}>
                            <TouchableOpacity style={closeStyle} onPress={this.onDecline}>
                                <Icon type="Feather" name="chevron-left" />
                            </TouchableOpacity>
                            <View style={{ flex: 6, alignItems: 'center', paddingRight: 50 }}>
                                <View style={lineStyle}></View>
                            </View>
                        </View>
                        <View style={headerStyle}>
                            <MyText style={[textH3Style, textExtraBold, textDarkGrey, textCenter]}>
                                How many Guests are Coming ?
                            </MyText>
                        </View>
                    </View>
                    <View style={{ maxHeight: SCREEN_HEIGHT-250}}>
                        <ScrollView>
                            <View style={[flexRow, contentContainer]}>
                                <View style={checkInStyle}>
                                    <MyText style={[textH6Style, textGrey, { marginBottom: 10}]}>CHECK-IN</MyText>
                                    <MyText style={[textH4Style]}>{formData ? moment(new Date(formData.check_In_Date)).format('DD, MMM YYYY') : ''}</MyText>
                                    {/* <MyText style={[textH4Style]}>19, May 2020</MyText> */}
                                </View>
                                <View style={checkOutStyle}>
                                    <MyText style={[textH6Style, textGrey, { marginBottom: 10}]}>CHECK-OUT</MyText>
                                    {/* <MyText style={[textH4Style]}>31, May 2020</MyText> */}
                                    <MyText style={[textH4Style]}>{formData ? moment(new Date(formData.check_Out_Date)).format('DD, MMM YYYY') : ''}</MyText>
                                </View>
                            </View>
                            <View style={[flexRow, { paddingHorizontal: 10, marginTop: 20}]}>
                                <View style={timeContainer}>
                                    <MyText style={[textH6Style, textGrey, { marginBottom: 10}]}>CHECK-IN TIME</MyText>
                                    <MyText style={[textH4Style, textBold]}>{house && house.checkInTimeFrom ? moment(house.checkInTimeFrom, "hh:mm:ss").format('h:mm A') : '12:00 AM'}</MyText>
                                    {/* <TimePicker receiveTime={this.setTimeIn} title="SELECT CHECK-IN TIME" /> */}
                                </View>
                                <View style={[timeContainer]}>
                                    <MyText style={[textH6Style, textGrey, textRight, { marginBottom: 10}]}>CHECK-OUT TIME</MyText>
                                    <MyText style={[textH4Style, textBold, textRight]}>{house && house.checkInTimeTo ? moment(house.checkInTimeTo, "hh:mm:ss").format('h:mm A') : '11:00 PM'}</MyText>
                                    {/* <TimePicker receiveTime={this.setTimeOut} title="SELECT CHECK-OUT TIME" right /> */}
                                </View>
                            </View>
                            <View style={divider}></View>
                            <View style={[flexRow, { paddingHorizontal: 10, marginTop: 20}]}>
                                
                                <View style={timeContainer}>
                                    <MyText style={[textH6Style, textGrey, upperCase, { marginBottom: 10}]}>Minimum Usable Day(s)</MyText>
                                    <MyText style={[textH4Style, textBold]}>{house ? formatAmount(house.minimumDaysUsable) : ''}</MyText>
                                </View>
                                <View style={[timeContainer]}>
                                    <MyText style={[textH6Style, textGrey, textRight, upperCase, { marginBottom: 10}]}>Maximum Usable Day(s)</MyText>
                                    <MyText style={[textH4Style, textBold, textRight]}>{house ? formatAmount(house.maximumDaysUsable) : ''}</MyText>
                                </View>
                            </View>

                            
                            <View style={[{paddingHorizontal: 20}]}>
                                <View style={divider}></View>
                                <View style={[flexRow, {justifyContent: 'space-between', marginTop: 20}]}>
                                    <MyText style={[textH4Style]}>Amount * {this.checkTotal()}</MyText>
                                    <MyText style={[textH3Style, textExtraBold, textSuccess]}>
                                    ₦ {house ? formattedAmount : ''} / Night</MyText>
                                </View>
                                <View style={divider}></View>
                                <View style={[flexRow, {justifyContent: 'space-between', marginTop: 20}]}>
                                    <MyText style={[textH4Style, textBold]}>Total Amount</MyText>
                                    <MyText style={[textH3Style, textExtraBold, textSuccess]}>₦ {house ? formatAmount(formattedAmount * this.checkTotal() * this.state.formData.no_Of_Rooms) : ''}</MyText>
                                </View>
                                <View style={divider}></View>
                            </View>
                            
                            

                            <View style={itemCountContainer}>
                                <View>
                                    <ItemCountPicker title="Guest" value={this.state.formData.no_Of_Guest} countValue={this.setCountValue} />
                                </View>
                                {house && house.propertyType.name === 'Hotel' ? <View>
                                    <ItemCountPicker title="No of rooms" value={this.state.formData.no_Of_Rooms} countValue={this.setRoomsValue} />
                                </View> : <></>}
                            </View>
                            <View style={{ paddingHorizontal: 20 }}>
                                {this.renderError()}
                            </View>
                            {this.renderDiscountMessage()}
                            <View style={buttonContainerStyle}>
                                <CustomButton buttonText="Reserve Space" disabled={this.validate()} buttonStyle={buttonStyle} onPress={this.submit} />
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
    container: {
        flex: 1,
        // backgroundColor: colors.white, 
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        width: '100%', 
        // height: '100%',
        justifyContent: 'flex-end', 
        // backgroundColor: colors.lightGrey
    },
    
    modalContainer: {
        backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15,  elevation: 4,
        ...GStyles.shadow, 
        // overflow: 'hidden',
        flex: 5,
    },
    mainHeader: {
        backgroundColor: colors.white,borderTopLeftRadius: 15, borderTopRightRadius: 15,
        // flex: 1
    },
    modalHeader: {
        marginTop: 20, alignItems: 'center', paddingHorizontal: 20,
    },
    headerStyle: {
        paddingBottom: 10, paddingTop: 10
    },
    
    lineStyle: {
        width: '22%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
    },
    closeStyle: {
        height: 30, flex: 1
    },
    buttonContainerStyle: {
        paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40, backgroundColor: colors.white, elevation: 6, marginBottom: 40
    },
    buttonStyle: {
        elevation: 2, borderRadius: 5
    },
    contentContainer: {
        borderBottomColor: colors.lightGrey, borderBottomWidth: 1, borderTopColor: colors.lightGrey,
        borderTopWidth: 1, 
    },
    checkOutStyle: {
        flex: 1, paddingHorizontal: 20, paddingVertical:8, alignItems: 'flex-end'
    },
    checkInStyle: {
        flex: 1, paddingHorizontal: 20, paddingVertical:8, borderRightColor: colors.lightGrey, borderRightWidth: 1 
    },
    itemCountContainer: {
        paddingHorizontal: 20,marginBottom: 20, width: '100%', marginTop: 10
    },
    timeContainer: {
        // width: '48%'
        flex: 1, paddingHorizontal: 10
    },
    divider: {
        height: 1, backgroundColor: colors.lightGrey, marginTop: 20, width: '100%'
    },
    discountContainer: {
        paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5, backgroundColor: colors.lighterGreen, alignItems: 'center'
    },
    emptyContainer: {
        flex: 1
    }
});

export default ReserveModal;
