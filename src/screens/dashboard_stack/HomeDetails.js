import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import { Icon } from 'native-base'

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import GuestRow from '../../components/dashboard/GuestsRow';

class HomeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { contentContainer, imgContainer, titleStyle, detailsContainer,rowContainer, lowerContainer, divider } = styles;
    const { imgStyle, flexRow,upperCase, textH5Style, textLightGrey, textGrey, textH4Style, textBold, textDarkGrey,
        textRight, textH6Style, textExtraBold, textH3Style, textH2Style } = GStyles
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <Header {...this.props} title="Umbaka Homes" wrapperStyles={{ paddingBottom: 5}} sub="Transcorp Hilton Abuja" />
        <ScrollView>
            <View style={contentContainer}>
                <View style={imgContainer}>
                    <Image source={require('../../assets/images/places/bed2.png')} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={[flexRow, titleStyle]}>
                    <Icon name="information-circle" style={{ marginRight: 5, color: colors.grey, fontSize: 20}} />
                    <MyText style={[upperCase, textH5Style]}>Reservation Details</MyText>
                </View>

                <View style={detailsContainer}>
                    <View style={[flexRow, rowContainer]}>
                        <View>
                            <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Property Category</MyText>
                            <MyText  style={[textH4Style, textBold]}>Hotel</MyText>
                        </View>
                        <View>
                            <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Start Date</MyText>
                            <MyText style={[textH4Style, textBold]}>2/04/2020</MyText>
                        </View>
                    </View>

                    <View style={[flexRow, rowContainer]}>
                        <View>
                            <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Property Type</MyText>
                            <MyText  style={[textH4Style, textBold]}>Platinum Room</MyText>
                        </View>
                        <View>
                            <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Time</MyText>
                            <MyText style={[textH4Style, textBold]}>8:00am - 10:00am</MyText>
                        </View>
                    </View>

                    <View style={[flexRow, rowContainer]}>
                        <View>
                            <MyText style={[textH5Style, textGrey, { marginBottom: 4}]}>Reservation</MyText>
                            <MyText  style={[textH4Style, textBold]}>3 Reservations</MyText>
                        </View>
                        <View>
                            <MyText style={[textH5Style, textGrey, textRight, { marginBottom: 4}]}>Amount Paid</MyText>
                            <MyText style={[textH4Style, textBold, textRight]}><MyText style={[textH6Style]}>$</MyText>300</MyText>
                        </View>
                    </View>
                </View>
            </View>

            <View style={lowerContainer}>
                <MyText style={[textH2Style, textExtraBold, textDarkGrey, { marginBottom: 30}]}>Guests</MyText>
                <View>
                    <GuestRow name="Nwabogor Joshua" img={require('../../assets/images/photo/photo.png')} />
                    <View style={divider}></View>
                </View>
                <View>
                    <GuestRow name="Cypril Hill" img={require('../../assets/images/photo/photo1.png')} />
                    <View style={divider}></View>
                </View>
                <View>
                    <GuestRow name="Cypril Hill" img={require('../../assets/images/photo/photo4.png')} />
                </View>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20, paddingTop: 150, borderBottomColor: colors.lightGrey, borderBottomWidth: 4, paddingBottom: 20
    },
    imgContainer: {
        width: '100%', height: 220, borderRadius: 8, overflow: 'hidden',
    },
    titleStyle: {
        marginTop: 20, marginBottom: 30, paddingVertical:8, borderBottomColor: colors.lightGrey, borderBottomWidth: 1
    },
    rowContainer: {
        paddingBottom: 25, justifyContent: 'space-between'
    },
    lowerContainer: {
        paddingHorizontal: 20, paddingVertical: 20
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    }
});

export default HomeDetails;
