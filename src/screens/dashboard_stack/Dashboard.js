/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationRow from './../../components/dashboard/ReservationRow';
import CommentRow from '../../components/CommentRow';
import RatingRow from '../../components/dashboard/RatingRow';

import { AppContext } from '../../../AppProvider';
import { setContext, Request, urls, GetRequest } from '../../utils';

class Dashboard extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      weeklyEarnings: 0,
      totalEarnings: 0,
      error: false,
      reservation:  null,
      reservations: [],
      name: null,
      image: null,
    };
  }

  componentDidMount() {
    this.renderWeeklyEarnings();
    this.renderTotalEarnings();
    this.getReservations();
  }

  renderWeeklyEarnings = async () => {
    try {
      const response = await GetRequest(urls.bookingBase, 'api/v1/bookings/property/host/earnings');
      if (response) {
          const data = await response.data;
          const earning = data.weeklyEarnings;
          this.setState({ weeklyEarnings: earning});
      } else { this.setState({ error: true }) }
  } catch (e) {
this.setState({ error: true });
}
  }

renderTotalEarnings = async () => {
    try {
      const response = await GetRequest(urls.bookingBase, 'api/v1/bookings/property/host/earnings');
      if (response) {
          const data = await response.data;
          const earnings = data.totalEarnings;
          this.setState({ totalEarnings: earnings});
      } else { this.setState({ error: true }) }
  } catch (e) {
this.setState({ error: true });
}
  }

  linkToReservations = () => {
    this.props.navigation.navigate('Reservations');
  }

  renderName = () => {
    if (this.context.state.isLoggedIn) {
      const {userData} = this.context.state;
      const name = userData.firstName;
      const { textBold, textH4Style } = GStyles;
      if (name) {
        return (
          <View style={{ flex: 1 }}>
            <MyText style={[textH4Style, textBold]}>Hi {name},</MyText>
          </View>
        );
      }
    }
  }

  renderProfilePhoto = () => {
    if (this.context.state.isLoggedIn) {
      const {userData} = this.context.state;
      const photo = userData.profilePicture;
      const { imgStyle } = GStyles;
      const { imgContainer, profileImg} = styles;
      if (photo === null) {
        return (
            <View style={profileImg}>
              <View style={imgContainer}>
                <Image source={require('../../assets/images/photo/profile.png')} resizeMode="cover" style={imgStyle} />
              </View>
            </View>
        );
      }
    } else {
      const {userData} = this.context.state;
      const photo = userData.profilePicture;
      const { imgStyle } = GStyles;
      const {profileImg, imgContainer} = styles;
      return (
          <View style={profileImg}>
            <View style={imgContainer}>
              <Image source={{uri:photo}} style={imgStyle} />
            </View>
          </View>
      );
    }
  }

  getReservations = async () => {
    try {
      const response = await GetRequest(urls.bookingBase, 'api/v1/bookings/property/host/reservation/overview');
      if (!response.isError) {
          const data = response.data;
          this.setState({ reservations: data });
          console.log(data);
      } else { this.setState({ error: true }); }
  } catch (e) {
    console.log(e);
this.setState({ error: true });
}
  }

  renderReservations = () => {
    const { reservations } = this.state;
    if (reservations.length !== 0) {
      const {rowContainer} = styles;
      if (this.state.reservations.data.propertyTitle !== undefined) {
        const name = this.state.reservations.data.propertyTitle;
        const image = this.state.reservations.data.propertyMainImage;
        const reserve = this.state.reservations.data.total + ' ' + 'Reservation';
        this.setState({name: name, image: image, reservation: reserve });
        if (reserve > 1 ) {
          this.setState({reservation: reserve + 's'});
        }
      }
      return (
        <View style={rowContainer}>
            <ReservationRow title={this.state.name} img={{uri: this.state.image}}
                location="Lagos" reserve={this.state.reservation} calendar />
        </View>
      )
    } else {
      const { reservation} = styles;
        const {imgStyle, textCenter, textH5Style, textBold, textOrange} = GStyles;
      return (
        <View style={{alignContent: 'center'}}>
          <View style={reservation}>
            <Image source={require('../../assets/images/photo/undraw.png')} style={imgStyle}/>
          </View>
          <MyText style={[ textH5Style, textCenter, textBold, textOrange]}>No Reservations Yet</MyText>
        </View>
      )
    }
  }


  render() {
    const { subHeaderContainer, profileContainer, walletContainer, imgContainer, profileImg, profileText, firstRow, 
      secondRow, viewContainer, walletImgContainer, contentContainer, contentHeader,
      contentBody, rowContainer, divider, noBorderBottom } = styles;
    const { textBold, textH4Style, flexRow, imgStyle, textH3Style, textGrey, textWhite, 
      textH5Style, textFadedGreen, textDarkGreen, textH2Style, textExtraBold, textGreen, 
      textUnderline, textDarkGrey } = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Dashboard" />
        <ScrollView>
          <View style={subHeaderContainer}>
            <View style={[flexRow, profileContainer]}>
                {this.renderProfilePhoto()}
              <View style={profileText}>
                {this.renderName()}
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
                  <MyText style={[textH2Style, textWhite, textExtraBold]}>$ {this.state.weeklyEarnings}</MyText>
                </View>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Total Earnings</MyText>
                <MyText style={[textH2Style, textWhite, textExtraBold]}>$ {this.state.totalEarnings}</MyText>
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
              {this.renderReservations()}
              {/* <View style={rowContainer}>
                <ReservationRow title="Paradise Havens Suites" img={require('../../assets/images/places/bed1.png')}
                location="Lagos" reserve="5 Reservations" />
              </View>
              <View style={rowContainer}>
                <ReservationRow title="Paradise Havens Suites" img={require('../../assets/images/places/bed2.png')}
                location="Lagos" reserve="5 Reservations" />
              </View> */}
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
    paddingHorizontal: 20, paddingVertical: 25, backgroundColor: colors.white, borderBottomWidth: 4, borderBottomColor: colors.lightGrey

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
  },
  reservation: {
    width: '100%',
    paddingHorizontal: 20,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  },
});

export default Dashboard;
