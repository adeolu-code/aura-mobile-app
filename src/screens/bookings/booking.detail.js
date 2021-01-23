import React, { Component } from "react";
import { Styles } from "./bookingsScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { ScrollView, Image, Pressable, PermissionsAndroid, Platform } from "react-native";
import { View, Icon } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import colors from "../../colors";

import { formatAmount } from '../../helpers'
import { successMessage, SCREEN_WIDTH } from '../../utils';



import RNFetchBlob from 'rn-fetch-blob';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class BookingsDetail extends Component {
    constructor() {
        super();

        this.state = {

        }
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
            <Header {...this.props} title={this.props.route.params.title} wrapperStyles={{ paddingBottom: 5}} sub="Transcorp Hilton Abuja" />
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
                                <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>NGN </MyText>{this.props.route.params.amount}</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, rowContainer]}>
                            <Pressable style={[Styles.pressable]} onPress={this.downloadInvoice}>
                                <View style={[Styles.invoiceView]}>
                                    <Icon name={"ios-menu-sharp"} style={[Styles.icon, { fontSize: 20, marginRight: 10}]} />
                                    <MyText style={[textH5Style, textRight, textGreen, textUnderline, textBold ,Styles.invoiceText]}>Tap Here to Download Invoice</MyText>
                                </View>
                                
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
          </SafeAreaView>
        );
    }
}