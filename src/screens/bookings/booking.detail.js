import React, { Component } from "react";
import { Styles } from "./bookingsScreen.style";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { ScrollView, Image, Pressable } from "react-native";
import { View, Icon } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import colors from "../../colors";

export default class BookingsDetail extends Component {
    constructor() {
        super();

        this.state = {

        }
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
                                <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>$</MyText>{this.props.route.params.amount}</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, rowContainer]}>
                            <Pressable style={[Styles.pressable]}>
                                <View style={[Styles.invoiceView]}>
                                    <Icon name={"ios-menu-sharp"} style={[Styles.icon]} />
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