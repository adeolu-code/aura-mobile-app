import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText, CustomButton } from '../../utils/Index';
import colors from '../../colors';
import moment from 'moment';
import { Icon } from 'native-base'

import GuestHeader from '../../components/dashboard/GuestHeader';
import GStyles from '../../assets/styles/GeneralStyles';

import { formatAmount } from '../../helpers'

class GuestProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { reservation: '' };
    const { reservation } = props.route.params;
    this.state.reservation = reservation
  }

  statusColor = () => {
      const { reservation } = this.state;
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
    const { contentContainer, titleStyle, rowContainer, detailsContainer, downloadContainer, lowerContainer, buttonContainer } = styles;
    const { flexRow, upperCase, textH5Style, textH4Style, textBold, textGrey, textRight, textH6Style, 
        textSuccess, textUnderline } = GStyles
    const { reservation } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <GuestHeader {...this.props} reservation={reservation} />
        <ScrollView>
            <View>
                <View style={contentContainer}>
                    <View style={[flexRow, titleStyle]}>
                        <Icon name="information-circle" style={{ marginRight: 5, color: colors.grey, fontSize: 20}} />
                        <MyText style={[upperCase, textH5Style]}>GUEST’S RESERVATION DETAILS</MyText>
                    </View>

                    <View style={detailsContainer}>
                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Check-In</MyText>
                                <MyText  style={[textH4Style, textBold]}>{moment(reservation.check_In_Date).format('DD/MM/YYYY')}</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Check-out</MyText>
                                <MyText style={[textH4Style, textBold]}>{moment(reservation.check_Out_Date).format('DD/MM/YYYY')}</MyText>
                            </View>
                        </View>

                        <View style={[flexRow, rowContainer]}>
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

                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>No. of Rooms</MyText>
                                <MyText  style={[textH4Style, textBold]}>{reservation.no_Of_Rooms} Rooms</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Paid</MyText>
                                <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>₦</MyText> {formatAmount(reservation.total_Cost)} / night</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Date Booked</MyText>
                                <MyText style={[textH4Style, textBold]}>{moment(reservation.date_Booked).format('DD/MM/YYYY')}</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey,textRight,   { marginBottom: 4}]}>Status</MyText>
                                <MyText style={[textH4Style, textBold, this.statusColor()]}>{reservation.approval_Info.name}</MyText>
                            </View>
                        </View>
                    </View>

                    <View style={[flexRow, downloadContainer]}>
                        <Image source={require('../../assets/images/icons/receipt/ic_receipt_24px.png')} />
                        <MyText style={[textH4Style, textSuccess, textUnderline, { marginLeft: 5}]}>Tap here to Download Invoice</MyText>
                    </View>
                </View>
                {/* <View style={lowerContainer}>
                    <View style={buttonContainer}>
                        <CustomButton buttonText="View Booking Information" buttonStyle={{elevation: 2}} />
                    </View>
                    <View style={buttonContainer}>
                        <CustomButton buttonText="Decline Booking" buttonStyle={{backgroundColor: colors.darkGrey, elevation: 2}} />
                    </View>
                </View> */}
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 240, paddingHorizontal: 20, borderBottomColor: colors.lightGrey, borderBottomWidth: 3
    },
    titleStyle: {
        marginTop: 20, marginBottom: 30, paddingVertical:8, borderBottomColor: colors.lightGrey, borderBottomWidth: 1
    },
    rowContainer: {
        paddingBottom: 25, justifyContent: 'space-between'
    },
    downloadContainer: {
        paddingBottom: 40, paddingTop: 20, justifyContent: 'center', alignItems: 'center'
    },
    lowerContainer: {
        width: '100%', paddingHorizontal: 20, paddingVertical: 40
    },
    buttonContainer: {
        marginVertical: 10
    }
});

export default GuestProfile;
