import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationRow from '../../components/dashboard/ReservationRow';
import CommentRow from '../../components/dashboard/CommentRow';
import RatingRow from '../../components/dashboard/RatingRow';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  linkToReservations = () => {
    this.props.navigation.navigate('Reservations')
  }

  render() {
    const { subHeaderContainer, profileContainer, walletContainer, imgContainer, profileImg, profileText, firstRow, 
      secondRow, viewContainer, walletImgContainer, contentContainer, contentHeader,
      contentBody, rowContainer, divider, noBorderBottom } = styles
    const { textBold, textH4Style, flexRow, imgStyle, textH3Style, textGrey, textWhite, 
      textH5Style, textFadedGreen, textDarkGreen, textH2Style, textExtraBold, textGreen, 
      textUnderline, textDarkGrey } = GStyles
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Dashboard" />
        <ScrollView>
          <View style={subHeaderContainer}>
            <View style={[flexRow, profileContainer]}>
              <View style={profileImg}>
                <View style={imgContainer}>
                  <Image source={require('../../assets/images/photo/photo.png')} resizeMode="cover" style={imgStyle} />
                </View>
              </View>
              <View style={profileText}>
                <MyText style={[textBold, textH4Style]}>Hi Joshua,</MyText>
                <MyText style={[textGrey, textH4Style]}>You are now A Host on Aura</MyText>
              </View>
            </View>

            <View style={walletContainer}>
              <View style={[flexRow, firstRow]}>
                <View style={walletImgContainer}>
                  <Image source={require('../../assets/images/icons/wallet/wallet.png')} resizeMode="contain" style={imgStyle} />
                </View>
                <TouchableOpacity style={viewContainer}>
                  <MyText style={[textH5Style, textWhite, textBold]}>View All</MyText>
                </TouchableOpacity>
              </View>
              <View style={[flexRow, secondRow]}>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Weekly Earnings</MyText>
                  <MyText style={[textH2Style, textWhite, textExtraBold]}>$ 32,000</MyText>
                </View>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Total Earnings</MyText>
                  <MyText style={[textH2Style, textWhite, textExtraBold]}>$ 32,000</MyText>
                </View>
              </View>
            </View>

            
          </View>

          <View style={contentContainer}>
            <View style={[flexRow, contentHeader]}>
              <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Reservations</MyText>
              <TouchableOpacity onPress={this.linkToReservations}>
                <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
              </TouchableOpacity>
            </View>

            <View style={contentBody}>
              <View style={rowContainer}>
                <ReservationRow title="Umbaka Homes" img={require('../../assets/images/places/bed.png')}
                location="Lagos" reserve="2 Reservations" calendar />
              </View>
              <View style={rowContainer}>
                <ReservationRow title="Paradise Havens Suites" img={require('../../assets/images/places/bed1.png')}
                location="Lagos" reserve="5 Reservations" />
              </View>
              <View style={rowContainer}>
                <ReservationRow title="Paradise Havens Suites" img={require('../../assets/images/places/bed2.png')}
                location="Lagos" reserve="5 Reservations" />
              </View>
            </View>
          </View>

          <View style={contentContainer}>
            <View style={[flexRow, contentHeader]}>
              <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Comments</MyText>
              <TouchableOpacity>
                <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
              </TouchableOpacity>
            </View>

            <View style={contentBody}>
              <View>
                <CommentRow name="Joshua Nwabogor" />
                <View style={divider}></View>
              </View>
              <View>
                <CommentRow name="Ashley Cole" />
                <View style={divider}></View>
              </View>
              <View>
                <CommentRow name="Banabas Kaviar" />
              </View>
            </View>
          </View>


          <View style={[contentContainer, noBorderBottom]}>
            <View style={[flexRow, contentHeader]}>
              <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Ratings</MyText>
              <TouchableOpacity>
                <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
              </TouchableOpacity>
            </View>

            <View style={contentBody}>
              <View>
                <RatingRow name="Joshua Nwabogor" img={require('../../assets/images/photo/photo6.png')} location="Lagos" />
                <View style={divider}></View>
              </View>
              <View>
                <RatingRow name="Ashley Cole" img={require('../../assets/images/photo/photo.png')} location="Lagos" />
                <View style={divider}></View>
              </View>
              <View>
                <RatingRow name="Banabas Kaviar" img={require('../../assets/images/photo/photo3.png')} location="Lagos" />
              </View>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subHeaderContainer: {
    paddingTop: 130, backgroundColor: colors.white, paddingBottom: 30,
    paddingHorizontal: 20, borderBottomWidth: 4, borderBottomColor: colors.lightGrey
  },
  imgContainer: {
    width: 55, height: 55, borderRadius: 60, overflow:'hidden'
  },
  profileImg: {
    flex: 1, 
    // borderWidth: 1
  },
  profileText: {
    flex: 4, flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 2,
    // borderWidth: 1, 
  },
  walletContainer: {
    backgroundColor: colors.lightGreen, borderRadius: 8, marginTop: 30, paddingVertical: 20, paddingHorizontal: 25, elevation: 2
  },
  firstRow: {
    justifyContent: 'space-between', marginBottom: 30
  },
  secondRow: {
    justifyContent: 'space-between'
  },
  walletImgContainer: {
    width: 40, height: 40, borderRadius: 40, backgroundColor: colors.fadedGreen,
    padding: 8
  },
  viewContainer: {
    backgroundColor: colors.green, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 6
  },
  contentContainer: {
    paddingHorizontal: 20, paddingVertical: 25, backgroundColor: colors.white,
    paddingHorizontal: 20, borderBottomWidth: 4, borderBottomColor: colors.lightGrey

  },
  contentHeader: {
    marginBottom: 30, justifyContent: 'space-between', alignItems: 'flex-end'
  },
  rowContainer: {
    marginBottom: 20
  },
  divider: {
    height: 1, width: '100%', backgroundColor: colors.lightGrey
  },
  noBorderBottom: {
    borderBottomWidth: 0, 
    // borderBottomColor: colors.lightGrey
  }
});

export default Dashboard;
