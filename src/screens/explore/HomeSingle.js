/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../utils/Index';

import colors from '../../colors';

import BackHeader from '../../components/BackHeader'

import ImageAndDetails from '../../components/explore/ImageAndDetails';
import AmenitiesComponent from '../../components/explore/AmenitiesComponent';
import RulesComponent from '../../components/explore/RulesComponent';
import LocationComponent from '../../components/explore/LocationComponent';
import HostComponent from '../../components/explore/HostComponent';
import DetailsComponent from '../../components/explore/DetailsComponent';
import ReviewsComponent from '../../components/explore/ReviewsComponent';
import CommentComponent from '../../components/explore/CommentComponent';
import BottomMenuComponent from '../../components/explore/home_single/BottomMenuComponent';

import CheckInModal from '../../components/explore/home_single/CheckInModal';
import CheckOutModal from '../../components/explore/home_single/CheckOutModal';
import ReserveModal from '../../components/explore/home_single/ReserveModal';
import MorePlaces from '../../components/explore/MorePlaces';

import { setContext, Request, urls, GetRequest, successMessage, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { v4 as uuidv4 } from 'uuid';

import LoginModal from '../../components/auth/LoginModal';
import SignUpModal from '../../components/auth/SignUpModal';


class HomeSingle extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showCheckInModal: false, showCheckOutModal: false, showReserveModal: false, house: null, loadingImages: false, photos: [], gettingHouse: false, gettingHouseRules: false,
        houseId: '', houseRules: [], location: null, gettingReviews: false, reviews: [], 
        gettingComments: false, comments: [], gettingCalendar: false, calendar: null, showLoginModal: false, showRegisterModal: false, 
        formData: {
          Arrival_Time_From: '',
          Arrival_Time_To: '',
          check_In_Date: '',
          check_Out_Date: '',
          is_Policy_Accepted: true,
          no_Of_Guest: 0,
          noofAvailableRooms: 1,
          property_Id: '',
          requestId: ''
        },
        loading: false
    };
    const { house } = props.route.params;
    this.state.house = house;
    this.state.location = { longitude: house.longitude, latitude: house.latitude }
    console.log('House ', house)
    
  }
  contactHost = () => {
    const { state } = this.context
    const { house } = this.state
    if(state.isLoggedIn) {
      this.props.navigation.navigate("InboxChat", {
        name: house.hostName,
        status: "Online",
        userImage: house.hostPicture ? {uri: house.hostPicture} : undefined,
        // chatId: '',
        propertyId: house.id,
        userId: house.hostId,
        roleHost: 'Host',
        host: true
      })
    } else {
      this.setState({ showLoginModal: true})
    }
  }

  openLoginModal = () => {
    this.setState({ showLoginModal: true })
  }
  closeLoginModal = (bool) => {
    this.setState(() => ({ showLoginModal: false }), () => {
      if(bool) {
        this.openCheckInModal();
      }
    })
  }
  openSignUpModal = () => {
    this.setState({ showRegisterModal: true })
  }
  closeSignUpModal = () => {
    this.setState({ showRegisterModal: false })
  }
  openCheckInModal = () => {
    // this.openReserveModal()
    const { state } = this.context
    if(state.isLoggedIn) {
      this.setState({ showCheckInModal: true })
    } else {
      this.setState({ showLoginModal: true})
    }
  }
  closeCheckInModal = () => {
    this.setState({ showCheckInModal: false })
  }
  openCheckOutModal = (value) => {
    const { formData } = this.state
    if(value) {
      const obj = { ...formData, check_In_Date: value }
      this.setState({ formData: obj })
    }
    this.setState({ showCheckOutModal: true})
  }
  closeCheckOutModal = () => {
    this.setState({ showCheckOutModal: false })
  }
  openReserveModal = (value) => {
    const { formData } = this.state
    if(value) {
      const obj = { ...formData, check_Out_Date: value }
      this.setState({ formData: obj })
    }
    this.setState({ showReserveModal: true })
  }
  closeReserveModal = () => {
    this.setState({ showReserveModal: false })
  }
  reserveSpace = async (formObj) => {
    this.setState({ loading: true })
    const { formData, house } = this.state;
    const requestId = uuidv4()
    const obj = { ...formData, requestId, property_Id: house.id, noofAvailableRooms: house.noofAvailableRooms, ...formObj }
    
    const res = await Request(urls.bookingBase, `${urls.v}bookings/property`, obj);
    console.log('Reserve space ', res)
    this.setState({ loading: false })
    if(res.isError) {
      const message = res.Message;
      errorMessage(message)
    } else {
      this.getCalendar()
      successMessage('Space booked successfully!!')
    }
  }
  getPhotos = async () => {
    const { house } = this.state
    this.setState({ loadingImages: true })
    const res = await GetRequest(urls.listingBase, 
    `${urls.v}listing/photo/property/?PropertyId=${house.id}&Size=6&Page=1`);
    this.setState({ loadingImages: false })
    if(res.isError) {
        const message = res.Message;
        errorMessage(message)
    } else {
        const imgData = res.data;
        const arr = []
        imgData.filter(item => {
            const obj = {uri: item.assetPath}
            arr.push(obj)
        })
        this.setState({ photos: arr})
    }
  }
  getAmenity = async () => {
    const res = await GetRequest(urls.listingBase,  `${urls.v}listing/houserule`);
    
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        console.log('Data ', res)
    }
  }
  getHouse = async () => {
    const { house } = this.state
    this.setState({ gettingHouse: true })
    const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/${house.id}`);
    // const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/', `api/v1/listing/property/${house.id}`);
    console.log('House Details ', res)
    this.setState({ gettingHouse: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        if(data !== null) {
          this.setState({ house: data })
        }
    }
  }
  getHouseRules = async () => {
    const { house } = this.state
    this.setState({ gettingHouseRules: true })
    const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/houserules/?propertyid=${house.id}`);
    console.log('House Rules ', res)
    this.setState({ gettingHouseRules: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        this.setState({ houseRules: data.rules })
    }
  }

  getReviews = async () => {
    const { house } = this.state
    this.setState({ gettingReviews: true })
    const res = await GetRequest(urls.listingBase, `${urls.v}listing/review/property/?propertyid=${house.id}`);
    console.log('House Reviews ', res)
    this.setState({ gettingReviews: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        if(Array.isArray(data) && data.length !== 0) {
          const reviews = data.map(item => item.rating)
          this.setState({ reviews })
        }
        this.setState({ comments: data })
    }
  }

//   getComments = async () => {
//     const { house } = this.state
//     this.setState({ gettingComments: true })
//     const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/', 
//     `api/v1/listing/review/comment/?PropertyId=${house.id}`);
//     console.log('House Reviews ', res)
//     this.setState({ gettingComments: false })
//     if(res.isError) {
//         const message = res.Message;
//     } else {
//         const data = res.data;
//         this.setState({ comments: data })
//     }
//   }
  renderLoading = () => {
      const { gettingHouse, loading } = this.state;
      if (gettingHouse || loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
  }

  componentDidMount = () => {
    this.getHouse()
    this.getPhotos()
    this.getHouseRules()
    this.getReviews()
    this.getCalendar()
    // this.getAmenity()
  }

  getCalendar = async () => {
    const { house } = this.state
    this.setState({ gettingCalendar: true })
    const res = await GetRequest(urls.listingBase, `api/v1/listing/property/calendar?PropertyId=${house.id}`);
    console.log('House calendar ', res)
    this.setState({ gettingCalendar: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        this.setState({ calendar: data })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    // if(isLoggedIn !== prevState.isLoggedIn) {
    //   this.closeLoginModal()
    // }
  }

  render() {
    const { buttomContainer, placeAroundContainer, headerStyle, scrollContainer } = styles;
    const { imgStyle, textWhite, textH3Style, textDarkGrey, textExtraBold, textH2Style } = GStyles

    const { house, houseRules, location, reviews, gettingReviews, comments } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <BackHeader {...this.props} />
        <ScrollView>
            <View>
                <ImageAndDetails imgArr={this.state.photos} house={house} title={house.title} photos={this.state.photos}
                loading={this.state.loadingImages} />
                <AmenitiesComponent house={house} />
                {houseRules.length !== 0 ?<RulesComponent title="House Rules" rules={houseRules} /> : <Fragment />}
                <LocationComponent house={house} address={house.address} location={location} />
                <HostComponent house={house} onPress={this.contactHost} />
                <DetailsComponent house={house} />
                <ReviewsComponent reviews={reviews} loading={gettingReviews} />
                <CommentComponent comments={comments} loading={gettingReviews} />

                {house ? <MorePlaces {...this.props} house={house}  /> : <Fragment />}
                {/* <View style={placeAroundContainer}>
                    <View style={headerStyle}>
                        <MyText style={[textH2Style, textExtraBold]}>More Places To Stay</MyText>
                    </View>
                    <View style={scrollContainer}>
                        <ScrollContent {...this.props} />
                    </View>
                </View> */}
            </View>
        </ScrollView>
        <View style={buttomContainer}>
            <BottomMenuComponent onPress={this.openCheckInModal} house={this.state.house} />
        </View>
        <CheckInModal visible={this.state.showCheckInModal} onDecline={this.closeCheckInModal} next={this.openCheckOutModal} />

        <CheckOutModal visible={this.state.showCheckOutModal} onDecline={this.closeCheckOutModal} next={this.openReserveModal} 
        back={this.openCheckInModal} checkInDate={this.state.formData.check_In_Date} />

        <ReserveModal visible={this.state.showReserveModal} onDecline={this.closeReserveModal} back={this.openCheckOutModal} 
        formData={this.state.formData} submit={this.reserveSpace} />

        <LoginModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} openSignUp={this.openSignUpModal} close />

        <SignUpModal visible={this.state.showRegisterModal} onDecline={this.closeSignUpModal} {...this.props} openLogin={this.openLoginModal} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: 70, paddingBottom: 15,
        backgroundColor: colors.white,
        justifyContent: 'space-between', paddingHorizontal: 20,
    },
    headerStyle: {
        marginBottom: 10, marginTop: 10, paddingHorizontal: 20
    },
    scrollContainer: {
        marginLeft: 20,
    },
    placeAroundContainer: {
        paddingTop: 20, paddingBottom:100,
        backgroundColor: colors.white,
        borderTopWidth: 2, borderTopColor: colors.lightGrey
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    buttomContainer: {
        position: 'absolute', bottom: 0, width: '100%', zIndex: 50
    }
    
});

export default HomeSingle;
