import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { MyText, CustomButton } from '../../utils/Index';
import colors from '../../colors';
import moment from 'moment';
import { Icon } from 'native-base';
import RNFetchBlob from 'rn-fetch-blob';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

import GuestHeader from '../../components/dashboard/GuestHeader';
import GStyles from '../../assets/styles/GeneralStyles';

import { formatAmount } from '../../helpers'
import { successMessage, SCREEN_WIDTH, GetRequest, urls } from '../../utils';

import CancellationPolicyModal from '../../components/CancellationPolicyModal';
import CashRefundModal from '../../components/dashboard/CashRefundModal';

import Pdf from 'react-native-pdf';

class GuestProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { reservation: '', source: '', showPolicyModal: false, showFormModal: false };
    const { reservation } = props.route.params;
    console.log('Res ',reservation)
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
  getInvoice = async () => {
    const { reservation } = this.state
    try {
      this.setState({ gettingInvoice: true })
      const res = await GetRequest(urls.bookingBase, `${urls.v}bookings/property/invoice/?id=${reservation.id}`);
      console.log('Booking details ', res)
      this.setState({ gettingInvoice: false })
      if(res.isError) {
          const message = res.Message;
      } else {
          const data = res.data;
          console.log(data)
      }
    } catch (error) {
      this.setState({ gettingInvoice: false })
    }
    
  }
//   requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: "Adsbarter Storage Permission",
//           message:
//             "Adsbarter App needs access to your storage " +
//             "to store images",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("You can use the storage");
//         this.downloadImage()
//       } else {
//         console.log("storage permission denied");
//         showMessage({ message: 'Storage permission denied', type: "danger", floating: true, duration: 4000 })
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };
  downloadPdf = async (pdf) => {
    const { reservation } = this.state;
    const name = reservation.guest_Name.split(' ')[0]
    const resId = reservation.id
    const dirs = RNFetchBlob.fs.dirs
    const directory = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir
    const filePath = `${directory}/${Date.now()}_invoice_${name}_${resId}.pdf`
    RNFetchBlob.fs
    .mv(pdf, filePath)
    .then((res) => {
      // the temp file path
      successMessage(`Download complete !! file saved in ${Platform.OS === 'ios' ? 'Documents' : 'Downloads'}`)
    })
    .catch((error) => {
        errorMessage(error.message)
        console.log(error)
    })
  }
  requestPermissionAndroid = async () => {
    const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: "Aura Storage Permission",
            message:
            "Aura App needs access to your storage " +
            "to store images",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.createPDF()
    } else {
        console.log("storage permission denied");
    }
        
  }
  openPolicyModal = () => {
    this.setState({ showPolicyModal: true })
  }
  closePolicyModal = () => {
    this.setState({ showPolicyModal: false })
  }
  openFormModal = () => {
    this.setState({ showFormModal: true, showPolicyModal: false })
  }
  closeFormModal = () => {
    this.setState({ showFormModal: false })
  }

  requestPermissionIOS = async () => {
    this.createPDF()
  }

  downloadInvoice = async () => {
    if(Platform.OS === 'ios'){
        this.requestPermissionIOS()
    } else {
        this.requestPermissionAndroid()
    }
  }
  
  createPDF = async () => {
    const { reservation } = this.state
    const checkInDate = moment(reservation.check_In_Date).format('ll')
    const checkOutDate = moment(reservation.check_Out_Date).format('ll')
    const dateBooked = moment(reservation.date_Booked).format('lll')
    const checkInTime = moment(reservation.arrival_Time_From, "hh:mm:ss").format('hh:mm a')
    const checkOutTime = moment(reservation.arrival_Time_To, "hh:mm:ss").format('hh:mm a')
    const noOfRooms = reservation.no_Of_Rooms
    const title = reservation.propertyInfo ? reservation.propertyInfo.title : ''
    const type = reservation.propertyInfo.type
    const cat = reservation.roomTypeInfo ? reservation.roomTypeInfo.name : ''
    const amount = formatAmount(reservation.total_Cost)
    const paymentMethod = reservation.payment_Method ? reservation.payment_Method : '-'
    const html = `<div><h2>${type} Reservation Invoice</h2>
    <hr />
    <div style="display: flex; flex-direction: row; flex: 1">
      <div><h3>${title}</h3></div>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1">
      <div style="flex: 1">
        <p>Property Category</p>
        <h4>${type}</h4>
      </div>
      <div style="flex: 1">
        <p>Property Type</p>
        <h4>${cat}</h4>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1">
      <div style="flex: 1">
        <p>check in Date</p>
        <h4>${checkInDate}</h4>
      </div>
      <div style="flex: 1">
        <p>check out Date</p>
        <h4>${checkOutDate}</h4>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1">
      <div style="flex: 1">
        <p>check in</p>
        <h4>${checkInTime}</h4>
      </div>
      <div style="flex: 1">
        <p>check Out</p>
        <h4>${checkOutTime}</h4>
      </div>
    </div>
    
    <div style="display: flex; flex-direction: row; flex: 1">
      <div style="flex: 1">
        <p> No of rooms </p>
        <h4>${noOfRooms}</h4>
      </div>
      <div style="flex: 1">
        <p>Date Booked</p>
        <h4>${dateBooked}</h4>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1; justify-content: center; align-items: center">
      <div style="flex: 1">
        <p>Payment method</p>
      </div>
      <div style="flex: 1">
        <h4>${paymentMethod}</h4>
      </div>
    </div>
    <div style="display: flex; flex-direction: row; flex: 1; justify-content: center; align-items: center">
      <div style="flex: 1">
        <p>Amount Paid</p>
      </div>
      <div style="flex: 1">
        <h3 style="color: green">NGN ${amount}</h3>
      </div>
    </div>
  </div>`
    let options = {
      html,
      fileName: 'reservation',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options)
    this.downloadPdf(file.filePath)
    // console.log(file.filePath);
    // alert(file.filePath);
  }
  componentDidMount = () => {
    //   this.getInvoice()
  }
  renderDeclineBooking = () => {
    const { reservation } = this.state
    if(reservation.approval_Info.name.toLowerCase() !== 'expired' && 
    reservation.approval_Info.name.toLowerCase() !== 'cancelled' && reservation.approval_Info.name.toLowerCase() !== 'pending') {
      return (
        <View style={styles.buttonContainer}>
            <CustomButton buttonText="Decline Booking" onPress={this.openPolicyModal} buttonStyle={{backgroundColor: colors.darkGrey, elevation: 2}} />
        </View>
      )
    }
  }
  render() {
    const { contentContainer, titleStyle, rowContainer, detailsContainer, downloadContainer, lowerContainer, buttonContainer } = styles;
    const { flexRow, upperCase, textH5Style, textH4Style, textBold, textGrey, textRight, textH6Style, 
        textSuccess, textUnderline } = GStyles
    const { reservation, source } = this.state
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
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Per Night</MyText>
                                <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>₦</MyText> {formatAmount(reservation.cost_Per_Night)} / night</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>No. of Days</MyText>
                                <MyText  style={[textH4Style, textBold]}>{reservation.no_Of_Days} Day(s)</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Paid</MyText>
                                <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>₦</MyText> {formatAmount(reservation.total_Cost)}</MyText>
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
                    
                    <TouchableOpacity style={[flexRow, downloadContainer]} onPress={this.downloadInvoice}>
                        <Image source={require('../../assets/images/icons/receipt/ic_receipt_24px.png')} />
                        <MyText style={[textH4Style, textSuccess, textUnderline, { marginLeft: 10}]}>Tap here to Download Invoice</MyText>
                    </TouchableOpacity>
                </View>

                <View style={lowerContainer}>
                    {/* <View style={buttonContainer}>
                        <CustomButton buttonText="View Booking Information" buttonStyle={{elevation: 2}} />
                    </View> */}
                    {this.renderDeclineBooking()}
                    {/* <View style={buttonContainer}>
                        <CustomButton buttonText="Decline Booking" onPress={this.openPolicyModal} buttonStyle={{backgroundColor: colors.darkGrey, elevation: 2}} />
                    </View> */}
                </View>
            </View>
        </ScrollView>
        <CancellationPolicyModal visible={this.state.showPolicyModal} onDecline={this.closePolicyModal} next={this.openFormModal} />
        <CashRefundModal visible={this.state.showFormModal} onDecline={this.closeFormModal} reservation={this.state.reservation} />
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
