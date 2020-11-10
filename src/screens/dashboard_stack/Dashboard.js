/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationRow from './../../components/dashboard/ReservationRow';
import CommentRow from '../../components/CommentRow';
import RatingRow from '../../components/dashboard/RatingRow';

import { AppContext } from '../../../AppProvider';
import { urls, GetRequest } from '../../utils';

class Dashboard extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      weeklyEarnings: 0,
      totalEarnings: 0,
      error: false,
      reservations: [],
      name: null,
      image: null,
      comment: null,
      comments: [],
      guestName: null,
      ratings: [],
    };
  }

  componentDidMount() {
    this.renderWeeklyEarnings();
    this.renderTotalEarnings();
    this.getReservations();
    this.getComments();
    this.getRatings();
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
          this.setState({ reservations: data});
          console.log(data, 'reservation');
      } else { this.setState({ error: true }); }
  } catch (e) {
    console.log(e);
this.setState({ error: true });
}
  }

  renderReservations = () => {
    const { reservations } = this.state;
    if (reservations.length !== 0) {
      const {flexRow, textExtraBold, textBold, textH2Style, textDarkGrey, textH4Style, textUnderline, textGreen} = GStyles;
      const {rowContainer, contentHeader, contentBody} = styles;
      const reservation = reservations.map((reservation, i) => {
        return (
          <ReservationRow title={reservations[i].propertyTitle} img={{uri: reservations[i].propertyMainImage }}
          location="Lagos" reserve={reservations[i].total + ' Reservations'} calendar />
        )
      })
      return (
        <View>
            <View style={[flexRow, contentHeader]}>
              <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Reservations</MyText>
              <TouchableOpacity onPress={this.linkToReservations}>
                <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
              </TouchableOpacity>
            </View>
            <View style={contentBody}>
            <View style={rowContainer}>
            {reservation}
          </View>
          </View>
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

  getComments = async () => {
    try {
      const response = await GetRequest(urls.listingBase, 'api/v1/listing/review/comment/host');
      if (!response.isError) {
          const data = response.data;
          this.setState({ comments: data });
           console.log(data);
      } else { this.setState({ error: true }); }
  } catch (e) {
    console.log(e);
this.setState({ error: true });
}
  }

  renderComments = () => {
    const { comments } = this.state;
    if (comments.length !== 0) {
      const {textDarkGrey, flexRow, textExtraBold, textH2Style, textH4Style, textBold, textUnderline, textGreen} = GStyles;
      const {divider, contentHeader, contentBody} = styles;
      const comment = comments.map((comment, i) => {
        return (
            <View>
                <CommentRow name={comments[i].guestName} />
                <View style={divider} />
            </View>
        )
      })
      return (
        <View>
          <View style={[flexRow, contentHeader]}>
            <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Comments</MyText>
            <TouchableOpacity>
              <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
            </TouchableOpacity>
          </View>

          <View style={contentBody}>
            {comment}
          </View>
        </View>
         );
    } else {
      const { reservation} = styles;
        const {imgStyle, textCenter, textH5Style, textBold, textOrange} = GStyles;
      return (
        <View style={{alignContent: 'center'}}>
          <View style={reservation}>
            <Image source={require('../../assets/images/photo/comment.png')} style={imgStyle}/>
          </View>
          <MyText style={[ textH5Style, textCenter, textBold, textOrange]}>No Comments Yet</MyText>
        </View>
      );
    }
  }

  getRatings = async () => {
    try {
      const response = await GetRequest(urls.listingBase, 'api/v1/listing/review/rating/host/overview');
      if (!response.isError) {
          const data = response.data;
          this.setState({ ratings: data });
           console.log(data);
      } else { this.setState({ error: true }); }
  } catch (e) {
    console.log(e);
this.setState({ error: true });
}
  }

  renderRatings = () => {
    const { ratings } = this.state;
    if (ratings.length !== 0) {
      const {textDarkGrey, flexRow, textExtraBold, textH2Style, textH4Style, textBold, textUnderline, textGreen} = GStyles;
      const {divider, contentHeader, contentBody} = styles;

        const rating = ratings.map((rating, i) => {
          return (
              <View>
              <RatingRow
                  name={ratings[i].guestName}
                  img={{uri: ratings[i].profilePicture}}
                  location="Lagos"
              />
              <View style={divider} />
              </View>
          );
        });
      return (
        <View>
            <View style={[flexRow, contentHeader]}>
              <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Ratings</MyText>
              <TouchableOpacity>
                <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
              </TouchableOpacity>
            </View>

            <View style={contentBody}>
              <View>
                {rating}
              </View>
            </View>
        </View>
      );
    } else {
      const { reservation} = styles;
        const {imgStyle, textCenter, textH5Style, textBold, textOrange} = GStyles;
      return (
        <View style={{alignContent: 'center'}}>
          <View style={reservation}>
            <Image source={require('../../assets/images/photo/ratings.png')} style={imgStyle}/>
          </View>
          <MyText style={[ textH5Style, textCenter, textBold, textOrange]}>No Ratings Yet</MyText>
        </View>
      );
    }
  }


  render() {
    const { subHeaderContainer, profileContainer, walletContainer, profileText, firstRow, 
      secondRow, viewContainer, walletImgContainer, contentContainer, noBorderBottom } = styles;
    const { textBold, textH4Style, flexRow, imgStyle, textGrey, textWhite,
      textH5Style, textDarkGreen, textH2Style, textExtraBold } = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Dashboard" />
        <ScrollView>
          <View style={subHeaderContainer}>
            <View style={[flexRow, profileContainer]}>
                {this.renderProfilePhoto()}
              <View style={profileText}>
                {this.renderName()}
                <MyText style={[textGrey, textH4Style]}>You are now a host on Aura</MyText>
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
                  <MyText style={[textH2Style, textWhite, textExtraBold]}>₦ {this.state.weeklyEarnings}</MyText>
                </View>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Total Earnings</MyText>
                <MyText style={[textH2Style, textWhite, textExtraBold]}>₦ {this.state.totalEarnings}</MyText>
                </View>
              </View>
            </View>   
          </View>

          <View style={contentContainer}>
            {this.renderReservations()}
          </View>

          <View style={contentContainer}>
              {this.renderComments()}
          </View>


          <View style={[contentContainer, noBorderBottom]}>
            {this.renderRatings()}
            {/* <View style={[flexRow, contentHeader]}>
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
            </View> */}
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
    marginBottom: 20,
  },
  divider: {
    height: 1, width: '100%', backgroundColor: colors.lightGrey,
  },
  noBorderBottom: {
    borderBottomWidth: 0,
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
