/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationRow from '../../components/dashboard/ReservationRow';
import CommentRow from '../../components/CommentRow';
import RatingRow from '../../components/dashboard/RatingRow';

import { AppContext } from '../../../AppProvider';
import { urls, GetRequest, errorMessage } from '../../utils';

import { formatAmount, shortenXterLength } from '../../helpers'

class DashboardTour extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      weeklyEarnings: 0,
      totalEarnings: 0,
      error: false,
      gettingReservations: false,
      gettingEarnings: false,
      gettingRatings: false,
      reservations: [],
      name: null,
      image: null,
      gettingComments: false,
      comments: [],
      guestName: null,
      ratings: [],
    };
  }

  componentDidMount() {
    this.getEarnings();
    this.getReservations();
    this.getComments();
    this.getRatings();
  }
  loading = () => {
    return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />);
  }
  renderCommentsLoading = () => {
      const { gettingComments } = this.state;
      if (gettingComments ) { this.loading() }
  }
  renderReservationsLoading = () => {
      const { gettingReservations } = this.state;
      if (gettingReservations ) { return this.loading() }
  }
  renderRatingsLoading = () => {
    const { gettingRatings } = this.state;
      if (gettingRatings ) { this.loading() }
  }
  
  getReservations = async () => {
    try {
      this.setState({ gettingReservations: true })
      const response = await GetRequest(urls.bookingBase, `${urls.v}bookings/experience/host/reservation/overview`);
      this.setState({ gettingReservations: false })
      if (response.isError || response.IsError) {
        errorMessage(response.message || response.Message)
      } else { 
        const data = response.data;
        this.setState({ reservations: data});
        console.log(data, 'reservation');
      }
    } catch (error) {
      this.setState({ gettingReservations: false })
    }
  }

  getEarnings = async () => {
    try {
      this.setState({ gettingEarnings: true })
      const response = await GetRequest(urls.bookingBase, `${urls.v}bookings/experience/host/earnings`);
      console.log(response)
      this.setState({ gettingEarnings: false })
      if (response.isError || response.IsError) {
        errorMessage(response.message || response.Message)
      } else {  
        const data = response.data;
        const weekly = data.weeklyEarnings;
        const total = data.totalEarnings;
        this.setState({ weeklyEarnings: weekly, totalEarnings: total});
      }
    } catch (error) {
      this.setState({ gettingEarnings: false })
    }
    
  }

  getRatings = async () => {
    try {
      this.setState({ gettingRatings: true })
      const res = await GetRequest(urls.experienceBase, `${urls.v}experience/review/rating/host/overview`);
      this.setState({ gettingRatings: false })
      if (res.isError || res.IsError) { 
        errorMessage(res.message || res.Message)
      } else { 
        const data = res.data;
        this.setState({ ratings: data });
        console.log(data);
      }
    } catch (error) {
      this.setState({ gettingRatings: false })
    }
  }
  getComments = async () => {
    try {
      this.setState({ gettingComments: true })
      const response = await GetRequest(urls.experienceBase, `${urls.v}experience/review/comment/host/overview`);
      this.setState({ gettingComments: false})
      if (response.isError) {
        errorMessage(response.message)
      } else { 
        const data = response.data;
        this.setState({ comments: data });
      }
    } catch (error) {
      this.setState({ gettingComments: false })
    }
  }

  linkToReservation = (item) => {
    // this.props.navigation.navigate('HomeDetails', { propertyId: item.property_Id } )
  }

  linkToReservations = () => {
    this.props.navigation.navigate('TourReservations');
  }
  linkToRatings = () => {
    this.props.navigation.navigate('TourRatingsReviews');
  }
  linkToEarning = () => {
    this.props.navigation.navigate('TourEarnings')
  }

  

  renderReservations = () => {
    const { reservations, gettingReservations } = this.state;
    
    if (reservations.length !== 0) {
      const {flexRow, textExtraBold, textBold, textH2Style, textDarkGrey, textH4Style, textUnderline, textGreen} = GStyles;
      const {rowContainer, contentHeader, contentBody} = styles;
      const reservation = reservations.map((reservation, i) => {
        const key = `RE_${i}`
        let title = reservation.experienceTitle ? reservation.experienceTitle : 'No title';
        title = shortenXterLength(title, 18)
        const imgUrl = reservation.experienceMainImage ? {uri: reservation.experienceMainImage} : require('../../assets/images/no_experience.png')
        const reserve = `${reservation.total} reservation(s)`
        return (
          <ReservationRow title={title} img={imgUrl} key={key} 
          type={reservation.propertyType}
           reserve={reserve}  onPress={this.linkToReservation.bind(this, reservation)} />
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
    } 
    if(reservations.length === 0 && !gettingReservations) {
      const { reservation } = styles;
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

  

  renderComments = () => {
    const { comments, gettingComments } = this.state;
    
    if (comments.length !== 0) {
      const {textDarkGrey, flexRow, textExtraBold, textH2Style, textH4Style, textBold, textUnderline, textGreen} = GStyles;
      const {divider, contentHeader, contentBody} = styles;
      const comment = comments.map((comment, i) => {
        const key = `CE_${i}`
        const imgUrl = comment.profilePicture ? {uri: comment.profilePicture} : require('../../assets/images/profile.png')
        return (
            <View key={key}>
                <CommentRow name={comment.guestName} comment={comment.comment} 
                review={comment.reviewedOn}  imgUrl={imgUrl} />
                {comments.length !== i+1 ? <View style={divider} />: <></>}
            </View>
        )
      })
      return (
        <View>
          <View style={[flexRow, contentHeader]}>
            <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Comments</MyText>
            <TouchableOpacity onPress={this.linkToRatings}>
              <MyText style={[textH4Style, textBold, textUnderline, textGreen]}>See All</MyText>
            </TouchableOpacity>
          </View>

          <View style={contentBody}>
            {comment}
          </View>
        </View>
         );
    } 
    
    if(!gettingComments && comments.length === 0) {
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

  

  renderRatings = () => {
    const { ratings, gettingRatings } = this.state;
    if (ratings.length !== 0) {
      const {textDarkGrey, flexRow, textExtraBold, textH2Style, textH4Style, textBold, textUnderline, textGreen} = GStyles;
      const {divider, contentHeader, contentBody} = styles;

        const rating = ratings.map((rating, i) => {
          const key = `RA_${i}`
          return (
              <View key={key}>
                <RatingRow
                    name={rating.guestName} rating={rating.rating}
                    img={{uri: rating.profilePicture}}
                    date={rating.reviewedOn}
                    reviewAction={rating.reviewAction + ' Review(s)'}
                    commentAction={rating.commentAction + ' Comment(s)'}
                />
                {ratings.length !== i+1 ? <View style={divider} />: <></>}
              </View>
          );
        });
      return (
        <View>
            <View style={[flexRow, contentHeader]}>
              <MyText style={[textExtraBold, textH2Style, textDarkGrey]}>Ratings</MyText>
              <TouchableOpacity onPress={this.linkToRatings}>
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
    } 
    if(!gettingRatings && ratings.length === 0) {
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
      secondRow, viewContainer, walletImgContainer, contentContainer, noBorderBottom, profileImg, imgContainer, wrapper } = styles;
    const { textBold, textH4Style, flexRow, imgStyle, textGrey, textWhite,
      textH5Style, textDarkGreen, textH2Style, textExtraBold } = GStyles;
    const {userData} = this.context.state;
    const imgUrl = userData && userData.profilePicture ? { uri: userData.profilePicture} : require('../../assets/images/profile.png')
    const firstName = userData && userData.firstName ? userData.firstName : ''
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Experience/Tour Dashboard" />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={subHeaderContainer}>
            <View style={[flexRow, profileContainer]}>
              <View style={profileImg}>
                <View style={imgContainer}>
                  <Image source={imgUrl} style={imgStyle} /> 
                </View>
              </View>
              <View style={profileText}>
                <View style={{ flex: 1 }}>
                  <MyText style={[textH4Style, textBold]}>Hi {firstName},</MyText>
                </View>
                <MyText style={[textGrey, textH4Style]}>You Are Now A Tour Guide On Aura</MyText>
              </View>
            </View>

            <View style={walletContainer}>
              <View style={[flexRow, firstRow]}>
                <View style={walletImgContainer}>
                  <Image source={require('../../assets/images/icons/wallet/wallet.png')} resizeMode="contain" style={imgStyle} />
                </View>
                <TouchableOpacity style={viewContainer} onPress={this.linkToEarning}>
                  <MyText style={[textH5Style, textWhite, textBold]}>View All</MyText>
                </TouchableOpacity>
              </View>
              <View style={[flexRow, secondRow]}>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Weekly Earnings</MyText>
                  <MyText style={[textH2Style, textWhite, textExtraBold]}>₦ {formatAmount(this.state.weeklyEarnings)}</MyText>
                </View>
                <View>
                  <MyText style={[textDarkGreen, textH5Style, { marginBottom: 5}]}>Total Earnings</MyText>
                <MyText style={[textH2Style, textWhite, textExtraBold]}>₦ {formatAmount(this.state.totalEarnings)}</MyText>
                </View>
              </View>
            </View>   
          </View>

          <View style={wrapper}>
            {this.renderReservationsLoading()}
            <View style={contentContainer}> 
              {this.renderReservations()}
            </View>
          </View>

          <View style={wrapper}>
            {this.renderCommentsLoading()}
            <View style={contentContainer}>
                {this.renderComments()}
            </View>
          </View>

          <View style={wrapper}>
            {this.renderRatingsLoading()}
            <View style={[contentContainer, noBorderBottom]}>
              {this.renderRatings()}
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subHeaderContainer: {
    paddingTop: Platform.OS === 'ios' ? 90 : 120, backgroundColor: colors.white, paddingBottom: 30,
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
  wrapper: {
    minHeight: 200
  }
});

export default DashboardTour;
