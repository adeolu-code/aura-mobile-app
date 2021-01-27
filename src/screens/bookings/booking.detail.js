import React, { Component } from "react";
import { Styles } from "./bookingsScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { ScrollView, Image, Pressable, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import { View, Icon } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import colors from "../../colors";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import moment from "moment";
import { successMessage, SCREEN_WIDTH } from "../../utils";
import { formatAmount } from '../../helpers'

import RNFetchBlob from 'rn-fetch-blob';


export default class BookingsDetail extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentDidMount() {
        // this.requestPermissionAndroid();
    }

    requestPermission = () => {
        this.requestPermissionAndroid();
        // this.requestPermissionIos();
    }

    requestPermissionAndroid = async () => {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Aura App Write Permission",
              message: "Aura App needs access to write to your storage.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the Write");
            // this.getCurrentPos()
          } else {
            errorMessage('Please grant access to your Write Storage to continue')
            console.log("write permission denied");
          }
        } catch (err) {
          console.warn("Warn error ",err);
          errorMessage('Something went wrong, please try again')
        }
    }

    async generatePDF(property, reference, paymentMethod, amount, checkIn, checkOut) {
        if (paymentMethod === null || paymentMethod === undefined) paymentMethod = "";
        let options = {
            html: invoiceHTML(property, reference, paymentMethod, amount, checkIn, checkOut),
            fileName: property + '-' + moment(new Date()).format("YYYY-MM-DD-hhmmss"),
            directory: 'Documents',
          };
    
        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        // alert(file.filePath);
        successMessage("Invoice saved to Documents Directory. " + file.filePath);
      }
    downloadPdf = async (pdf) => {
        const { params } = this.props.route;
        const name = params.guestName.split(' ')[0]
        const resId = params.id
        const dirs = RNFetchBlob.fs.dirs
        const filePath = `${dirs.DownloadDir}/invoice_booking_${name}_${resId}.pdf`
        RNFetchBlob.fs
        .mv(pdf, filePath)
        .then((res) => {
            // the temp file path
            successMessage('Download complete !! file saved in Downloads')
        })
        .catch((error) => {
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
        const { params } = this.props.route
        const checkInDate = params.checkIn
        const checkOutDate = params.checkOut
        const time = params.time
        const title = params.title
        const type = params.propertyType || params.propertyCategory
        const amount = formatAmount(params.amount)
        const html = `<div><h2>${type} Booking Invoice</h2>
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
            <p>Time</p>
            <h4>${time}</h4>
          </div>
        </div>
        <div style="display: flex; flex-direction: row; flex: 1">
          <div style="flex: 1">
            <p>check in</p>
            <h4>${checkInDate}</h4>
          </div>
          <div style="flex: 1">
            <p>check out</p>
            <h4>${checkOutDate}</h4>
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
          fileName: 'bookings',
          directory: 'Documents',
        };
    
        let file = await RNHTMLtoPDF.convert(options)
        this.downloadPdf(file.filePath)
    }

    render() {
        const { contentContainer, imgContainer, titleStyle, detailsContainer,rowContainer } = Styles;
        const { imgStyle, flexRow,upperCase, textH5Style, textGrey, textH4Style, textBold, textRight, textH6Style, textGreen, textUnderline,  } = GStyles
        return(
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <Header {...this.props} title={this.props.route.params.title} wrapperStyles={{ paddingBottom: 5}} sub="" />
            <ScrollView>
                <View style={contentContainer}>
                    <View style={imgContainer}>
                        <Image source={this.props.route.params.image} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={[flexRow, titleStyle]}>
                        <Icon name="information-circle" style={{ marginRight: 5, color: colors.grey, fontSize: 20}} />
                        <MyText style={[upperCase, textH5Style]}>Reservation Details</MyText>
                    </View>
    
                    <View style={detailsContainer}>
                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Property Category</MyText>
                                <MyText  style={[textH4Style, textBold]}>{this.props.route.params.propertyCategory}</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Check-out</MyText>
                                <MyText style={[textH4Style, textBold]}>{this.props.route.params.checkOut}</MyText>
                            </View>
                        </View>
    
                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Property Type</MyText>
                                <MyText  style={[textH4Style, textBold]}>{this.props.route.params.propertyType}</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Time</MyText>
                                <MyText style={[textH4Style, textBold]}>{this.props.route.params.time}</MyText>
                            </View>
                        </View>
    
                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Check-in</MyText>
                                <MyText  style={[textH4Style, textBold]}>{this.props.route.params.checkIn}</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Paid</MyText>
                                <MyText style={[textH4Style, textBold, textRight]}>
                                    <MyText style={[textH6Style]}>NGN </MyText>
                                    {this.props.route.params.amount}
                                </MyText>
                            </View>
                        </View>
                        <View style={[flexRow, rowContainer]}>
                            <TouchableOpacity style={[Styles.pressable]} onPress={() => this.downloadInvoice()}>
          {/* onPress={() => this.generatePDF(this.props.route.params.title, this.props.route.params.id, this.props.route.params.payment_Method, this.props.route.params.amount, this.props.route.params.checkIn, this.props.route.params.checkOut)} */}
                            {/* <Pressable style={[Styles.pressable]}> */}
                                <View style={[Styles.invoiceView]}>
                                    <Icon name={"ios-menu-sharp"} style={[Styles.icon, { fontSize: 20, marginRight: 10}]} />
                                    <MyText style={[textH5Style, textRight, textGreen, textUnderline, textBold ,Styles.invoiceText]}>Tap Here to Download Invoice</MyText>
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
          </SafeAreaView>
        );
    }
}

const invoiceHTML = (property, reference, paymentMethod, amount, checkIn, checkOut) => `
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>A simple, clean, and responsive HTML invoice template</title>
    
    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">            
            <tr class="heading">
                <td>
                    Property Name
                </td>
                
                <td>
                    Booking Reference
                </td>
            </tr>
            
            <tr class="details">
                <td>
                    ${property}
                </td>
                
                <td>
                    ${reference}
                </td>
            </tr>    

            <tr class="heading">
                <td>
                    Payment Method
                </td>
                
                <td>
                    Amount
                </td>
            </tr>
            
            <tr class="details">
                <td>
                    ${paymentMethod}
                </td>
                
                <td>
                    ${amount}
                </td>
            </tr>
            
            <tr class="heading">
                <td>
                    Check In
                </td>
                
                <td>
                    Check Out
                </td>
            </tr>
            
            <tr class="details">
                <td>
                    ${checkIn}
                </td>
                
                <td>
                    ${checkOut}
                </td>
            </tr>
        </table>
    </div>
</body>
</html>

`;