/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import { Styles as styles } from "./restuarant.style";

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationRow from '../../components/dashboard/ReservationRow';
import CommentRow from '../../components/CommentRow';
import RatingRow from '../../components/dashboard/RatingRow';

import { AppContext } from '../../../AppProvider';
import { urls, GetRequest, errorMessage } from '../../utils';

import { formatAmount } from '../../helpers'

export default class RestuarantDashboard extends Component {
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
    // this.getEarnings();
    // this.getReservations();
    // this.getComments();
    // this.getRatings();
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
  // renderRatingsLoading = () => {
  //   const { gettingRatings } = this.state;
  //     if (gettingRatings ) { this.loading() }
  // }


  getEarnings = async () => {
    try {
      this.setState({ gettingEarnings: true })
      const response = await GetRequest(urls.bookingBase, `${urls.v}bookings/property/host/earnings`);
      this.setState({ gettingEarnings: false })
      if (response.isError) {
        errorMessage(response.message)
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

  linkToReservation = (item) => {
    this.props.navigation.navigate('HomeDetails', { propertyId: item.property_Id } )
  }

  linkToReservations = () => {
    this.props.navigation.navigate('Reservations');
  }
  linkToRatings = () => {
    this.props.navigation.navigate('RatingsReviews');
  }
  linkToEarning = () => {
    this.props.navigation.navigate('Earnings')
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
      if (photo) {
        return (
            <Image source={{uri: photo}} style={imgStyle} />
        );
      } else {
        const { imgStyle } = GStyles;
        return (
            <Image source={require('../../assets/images/profile.png')} resizeMode="cover" style={imgStyle} />  
        );
      }
    } 
  }

  getReservations = async () => {
    try {
      this.setState({ gettingReservations: true })
      const response = await GetRequest(urls.bookingBase, `${urls.v}bookings/property/host/reservation/overview`);
      this.setState({ gettingReservations: false })
      if (response.isError) {
        errorMessage(response.message)
      } else { 
        const data = response.data;
        this.setState({ reservations: data});
        console.log(data, 'reservation');
      }
    } catch (error) {
      this.setState({ gettingReservations: false })
    }
    
  }

  renderOrders = () => {
    const { reservations, gettingReservations } = this.state;
    
    if (reservations.length !== 0) {
      const {flexRow, textExtraBold, textBold, textH2Style, textDarkGrey, textH4Style, textUnderline, textGreen} = GStyles;
      const {rowContainer, contentHeader, contentBody} = styles;
      const reservation = reservations.map((reservation, i) => {
        const key = `RE_${i}`
        return (
          <ReservationRow title={reservation.propertyTitle} img={{uri: reservation.propertyMainImage }} key={key} type={reservation.propertyType}
           reserve={reservation.total + ' Reservations'} calendar onPress={this.linkToReservation.bind(this, reservation)} />
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
          <MyText style={[ textH5Style, textCenter, textBold, textOrange]}>No Orders Yet</MyText>
        </View>
      )
    }
  }

  getComments = async () => {
    try {
      this.setState({ gettingComments: true })
      const response = await GetRequest(urls.listingBase, `${urls.v}listing/review/comment/host/overview`);
      this.setState({ gettingComments: false})
      if (response.isError) {
        errorMessage(response.message)
      } else { 
        const data = response.data;
        this.setState({ comments: data });
      }
    } catch (error) {
      this.setState({ gettingComments: false})
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

  getRatings = async () => {
    try {
      this.setState({ gettingRatings: true })
      const response = await GetRequest(urls.listingBase, `${urls.v}listing/review/rating/host/overview`);
      this.setState({ gettingRatings: false })
      if (response.isError || response.IsError) {
        errorMessage(response.message || response.Message) 
      } else { 
        const data = response.data;
        this.setState({ ratings: data });
      }
    } catch (error) {
      this.setState({ gettingRatings: false })
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
      textH5Style, textDarkGreen, textH2Style, textExtraBold, textOrange } = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Dashboard" />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={subHeaderContainer}>
            <View style={[flexRow, profileContainer]}>
              <View style={profileImg}>
                <View style={imgContainer}>
                    {this.renderProfilePhoto()}
                </View>
              </View>
              <View style={profileText}>
                {this.renderName()}
                <MyText style={[textGrey, textH4Style]}>You Now Own A Restaurant On Aura</MyText>
              </View>
            </View>
            <View style={[flexRow]}>
                <MyText style={[textGrey, textH4Style]}>Approval Status: </MyText>
                <MyText style={[textOrange, textH4Style]}>Listed</MyText>
              </View>
            

            <View style={walletContainer}>
              <View style={[flexRow, firstRow]}>
                <View style={walletImgContainer}>
                  <Image source={require('../../assets/images/icons/wallet/wallet.png')} resizeMode="contain" style={imgStyle} />
                </View>
                {/* <TouchableOpacity style={viewContainer} onPress={this.linkToEarning}>
                  <MyText style={[textH5Style, textWhite, textBold]}>View All</MyText>
                </TouchableOpacity> */}
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

          {/* <View style={wrapper}>
            {this.renderReservationsLoading()}
            <View style={contentContainer}> 
              {this.renderOrders()}
            </View>
          </View> */}

          {/* <View style={wrapper}>
            {this.renderCommentsLoading()}
            <View style={contentContainer}>
                {this.renderComments()}
            </View>
          </View> */}

          {/* <View style={wrapper}>
            {this.renderRatingsLoading()}
            <View style={[contentContainer, noBorderBottom]}>
              {this.renderRatings()}
            </View>
          </View> */}

        </ScrollView>
      </SafeAreaView>
    );
  }
}

