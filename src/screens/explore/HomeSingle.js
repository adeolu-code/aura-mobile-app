/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
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
import HostDetails from '../../components/explore/HostDetails';
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

import IdentityCardModal from '../../components/explore/IdentityCardModal';

import SharedIdModal from '../../components/explore/ShareIdModal';

const SCREEN_HEIGHT = Dimensions.get('screen').height


class HomeSingle extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showCheckInModal: false, showCheckOutModal: false, showReserveModal: false, showModal: false, house: null, loadingImages: false, photos: [], gettingHouse: false, gettingHouseRules: false,
        houseId: '', houseRules: [], location: null, gettingReviews: false, reviews: [], hostDetails: false,
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
        loading: false, contact: false, showIdentityModal: false, shareIdModal: false,
        booked: '', bookedDays: [], 
    };
    const { house } = props.route.params;
    this.state.house = house;
    this.state.location = { longitude: house.longitude, latitude: house.latitude }
    console.log('Housess ', house)
    
  }
  
  contactHost = () => {
    const { state } = this.context;
    this.setState({ contact: true })
    if(state.isLoggedIn) {
      this.linkToChat()
    } else {
      this.setState({ showLoginModal: true})
    }
  }
  linkToChat = () => {
    const { house } = this.state
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
  }
  openSharedIdModal = () => {
    this.setState({ shareIdModal: true })
  }
  closeSharedIdModal = () => {
    this.setState({ shareIdModal: false })
  }
  openIdentityModal = () => {
    this.setState({ showIdentityModal: true })
  }
  closeIdentityModal = (bool) => {
    this.setState({ showIdentityModal: false })
    if(bool) {
      this.setState({ shareIdModal: true })
      const { state, getUserProfile } = this.context;
      if (state.token) {
        getUserProfile(state.token)
      }
    }
  }
  openLoginModal = () => {
    this.setState({ showLoginModal: true });
  }
  closeLoginModal = (bool) => {
    this.setState(() => ({ showLoginModal: false }), () => {
      if (bool) {
          if (this.state.contact) {
            this.linkToChat();
          } else if (this.state.hostDetails === true) {
            this.openHostDetailsModal(); () => {
            this.setState({hostDetails: false});
            };
          } else {
            this.openCheckInModal();
          }
        }
    });
  }
  openSignUpModal = () => {
    this.setState({ showRegisterModal: true });
  }
  closeSignUpModal = () => {
    this.setState({ showRegisterModal: false });
  }

  openHostDetailsModal = () => {
    const { state } = this.context;
    if (state.isLoggedIn) {
      this.setState({ showModal: true });
    } else {
      this.setState({ showLoginModal: true, hostDetails: true});
    }
  }
  closeHostDetailsModal = () => {
    this.setState({ showModal: false });
  }
  openCheckInModal = () => {
    // this.openSharedIdModal()
    // this.openReserveModal()
    const { state } = this.context
    this.setState({ contact: false })
    if (state.isLoggedIn) {
      this.setState({ showCheckInModal: true })
    } else {
      this.setState({ showLoginModal: true})
    }
  }
  closeCheckInModal = () => {
    this.setState({ showCheckInModal: false })
  }
  openCheckOutModal = (value) => {
    const { formData } = this.state;
    if (value) {
      const obj = { ...formData, check_In_Date: value }
      this.setState({ formData: obj })
    }
    this.setState({ showCheckOutModal: true})
  }
  closeCheckOutModal = () => {
    this.setState({ showCheckOutModal: false })
  }
  openReserveModal = (value) => {
    const { formData } = this.state;
    if (value) {
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
      const message = res.message;
      errorMessage(message)
    } else {
      this.getCalendar()
      successMessage('Space booked successfully!!')
      this.setState({ booked: res.data })
      setTimeout(() => {
        this.checkVerification()
      }, 50);
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
    // console.log('House Rules ', res)
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

  checkVerification = () => {
    const { userData } = this.context.state
    if(userData.identificationDocument) {
      this.openSharedIdModal()
    } else {
      this.openIdentityModal()
    }
  }

  renderLoading = () => {
      const { gettingHouse, loading } = this.state;
      if (gettingHouse || loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 1000 }} />); }
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
    const { house } = this.state;
    this.setState({ gettingCalendar: true })
    const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/calendar?PropertyId=${house.id}`);
    console.log('House calendar ', res)
    this.setState({ gettingCalendar: false })
    if(res.isError || res.IsError) {
        const message = res.Message || res.message;
    } else {
        const data = res.data;
        this.setState({ bookedDays: data.bookedDays })
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
    const { isLoggedIn } = this.context.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <BackHeader {...this.props} />
        <ScrollView>
            <View>
                <ImageAndDetails imgArr={this.state.photos} house={house} title={house.title} photos={this.state.photos}
                loading={this.state.loadingImages} openHostModal={this.openHostDetailsModal} />
                <AmenitiesComponent house={house} />
                {houseRules.length !== 0 ?<RulesComponent title="House Rules" rules={houseRules} /> : <Fragment />}
                <LocationComponent house={house} address={house.address} location={location} />
                <HostComponent house={house} onPress={this.contactHost} />
                <DetailsComponent house={house} />
                <ReviewsComponent reviews={reviews} loading={gettingReviews} />
                <CommentComponent comments={comments} loading={gettingReviews} />

                {house ? <MorePlaces {...this.props} house={house}  /> : <Fragment />}
                
            </View>
        </ScrollView>
        <View style={buttomContainer}>
            <BottomMenuComponent onPress={this.openCheckInModal} house={this.state.house} />
        </View>
        <CheckInModal visible={this.state.showCheckInModal} onDecline={this.closeCheckInModal} next={this.openCheckOutModal} 
        bookedDays={this.state.bookedDays} />

        <CheckOutModal visible={this.state.showCheckOutModal} onDecline={this.closeCheckOutModal} next={this.openReserveModal} 
        back={this.openCheckInModal} checkInDate={this.state.formData.check_In_Date} bookedDays={this.state.bookedDays} />

        <ReserveModal visible={this.state.showReserveModal} onDecline={this.closeReserveModal} back={this.openCheckOutModal} 
        formData={this.state.formData} submit={this.reserveSpace} house={this.state.house} />

        <LoginModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} openSignUp={this.openSignUpModal} close />

        <SignUpModal visible={this.state.showRegisterModal} onDecline={this.closeSignUpModal} {...this.props} openLogin={this.openLoginModal} />
        <HostDetails {...this.props} visible={this.state.showModal} navigateToHouse={this} onDecline={this.closeHostDetailsModal} />

        {isLoggedIn ? <IdentityCardModal visible={this.state.showIdentityModal} onDecline={this.closeIdentityModal} { ...this.props} />
        :<></>}

        {isLoggedIn ? <SharedIdModal visible={this.state.shareIdModal} onDecline={this.closeSharedIdModal} {...this.props} 
        booked={this.state.booked} house={this.state.house} /> : <></>}
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
    // headerStyle: {
    //     marginBottom: 10, marginTop: 10, paddingHorizontal: 20
    // },
    scrollContainer: {
        marginLeft: 20,
    },
    placeAroundContainer: {
        paddingTop: 20, paddingBottom:100,
        backgroundColor: colors.white,
        borderTopWidth: 2, borderTopColor: colors.lightGrey,
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    buttomContainer: {
        position: 'absolute', bottom: Platform.OS === 'ios' ? 20 : 0, width: '100%', zIndex: 50
    }
    
});

export default HomeSingle;
