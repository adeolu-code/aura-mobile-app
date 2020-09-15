import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText, CustomButton } from '../../utils/Index';
import colors from '../../colors';

import { Icon } from 'native-base'

import GuestHeader from '../../components/dashboard/GuestHeader';
import GStyles from '../../assets/styles/GeneralStyles';

class GuestProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { contentContainer, titleStyle, rowContainer, detailsContainer, downloadContainer, lowerContainer, buttonContainer } = styles;
    const { flexRow, upperCase, textH5Style, textH4Style, textBold, textGrey, textRight, textH6Style, 
        textSuccess, textUnderline } = GStyles
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <GuestHeader {...this.props} />
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
                                <MyText  style={[textH4Style, textBold]}>24/06/2020</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Check-out</MyText>
                                <MyText style={[textH4Style, textBold]}>24/06/2020</MyText>
                            </View>
                        </View>

                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Check-In Time</MyText>
                                <MyText  style={[textH4Style, textBold]}>3:00am</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Check-Out Time</MyText>
                                <MyText style={[textH4Style, textBold, textRight]}>3:00am</MyText>
                            </View>
                        </View>

                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>No. of Rooms</MyText>
                                <MyText  style={[textH4Style, textBold]}>3 Rooms</MyText>
                            </View>
                            <View>
                                <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Paid</MyText>
                                <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>$</MyText>300/night</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, rowContainer]}>
                            <View>
                                <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Date Blocked</MyText>
                                <MyText style={[textH4Style, textBold]}>13/05/2020</MyText>
                            </View>
                        </View>
                    </View>

                    <View style={[flexRow, downloadContainer]}>
                        <Image source={require('../../assets/images/icons/receipt/ic_receipt_24px.png')} />
                        <MyText style={[textH4Style, textSuccess, textUnderline, { marginLeft: 5}]}>Tap here to Download Invoice</MyText>
                    </View>
                </View>
                <View style={lowerContainer}>
                    <View style={buttonContainer}>
                        <CustomButton buttonText="View Booking Information" buttonStyle={{elevation: 2}} />
                    </View>
                    <View style={buttonContainer}>
                        <CustomButton buttonText="Decline Booking" buttonStyle={{backgroundColor: colors.darkGrey, elevation: 2}} />
                    </View>
                </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 330, paddingHorizontal: 20, borderBottomColor: colors.lightGrey, borderBottomWidth: 3
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
