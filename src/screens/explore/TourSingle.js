/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../utils/Index';

import colors from '../../colors';

import BackHeader from '../../components/BackHeader';

import Header from '../../components/explore/tour_single/Header';
import BottomMenuComponent from '../../components/explore/tour_single/BottomMenuComponent';
import HostComponent from '../../components/explore/tour_single/HostComponent';
import ScrollContent from '../../components/explore/tour_single/ScrollContent';

import TourModal from '../../components/explore/tour_single/TourModal';
import CheckInModal from '../../components/explore/home_single/CheckInModal';
import CheckOutModal from '../../components/explore/home_single/CheckOutModal';

import ConfirmAndPayModal from '../../components/explore/tour_single/ConfirmAndPayModal';


import { setContext, Request, urls, GetRequest, successMessage, errorMessage, GOOGLE_API_KEY, SCREEN_HEIGHT } from '../../utils';
import { formatAmount } from '../../helpers'
import { AppContext } from '../../../AppProvider';

import LoginModal from '../../components/auth/LoginModal';
import SignUpModal from '../../components/auth/SignUpModal';

class TourSingle extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = {showCheckInModal: false, showCheckOutModal: false, showModal: false, tour: '', photos: [], gettingTour: false, loadingImages: false, id: '', showLoginModal: false, gettingCalendar: false,
    showRegisterModal: false, mountPayModal: false, orderDetails: '', bookedDays: [],
    formData: {
      check_In_Date: '',
      check_Out_Date: '',
      no_Of_Guest: 0,
    }, };
    this.state.id = props.route.params?.tourId
  }
  openPayModal = (value) => {
    this.setState({ payModal: true, orderDetails: value, mountPayModal: true })
  }
  onClosePayModal = () => {
    this.setState({ payModal: false })
  }
  openLoginModal = () => {
    this.setState({ showLoginModal: true })
  }
  closeLoginModal = (bool) => {
    this.setState(() => ({ showLoginModal: false }), () => {
      if(bool) {
        this.openModal();
      }
    })
  }
  openSignUpModal = () => {
    this.setState({ showRegisterModal: true })
  }
  closeSignUpModal = () => {
    this.setState({ showRegisterModal: false })
  }
  // openModal = () => {
  //   const { isLoggedIn } = this.context.state
  //   if(isLoggedIn) {
  //     this.setState({ showModal: true })
  //   } else {
  //     this.openLoginModal()
  //   }
  // }
  openModal= (value) => {
    const { formData } = this.state;
    if (value) {
      const obj = { ...formData, check_Out_Date: value }
      this.setState({ formData: obj })
    }
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }
  openCheckInModal = () => {
    const { state } = this.context
    if (state.isLoggedIn) {
      this.setState({ showCheckInModal: true })
    } else {
      this.openLoginModal()
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
  
  
  renderLoading = () => {
    const { gettingTour, loading, loadingImages } = this.state;
    if (gettingTour || loadingImages || loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 1000 }} />); }
  }
  getTour = async () => {
    const { id } = this.state
    this.setState({ gettingTour: true })
    const res = await GetRequest(urls.experienceBase, `${urls.v}experience/${id}`);
    console.log('tours Details ', res)
    this.setState({ gettingTour: false })
    if(res.isError) {
        const message = res.Message;
        errorMessage(message)
    } else {
        const data = res.data;
        
        if(data !== null) {
          this.setState({ tour: data })
        }
    }
  }

  getCalendar = async () => {
    const { id } = this.state;
    this.setState({ gettingCalendar: true })
    const res = await GetRequest(urls.experienceBase, `${urls.v}experience/calendar?ExperienceId=${id}`);
    console.log('Experience calendar ', res)
    this.setState({ gettingCalendar: false })
    if(res.isError || res.IsError) {
      const message = res.Message || res.message;
    } else {
        const data = res.data;
        this.setState({ bookedDays: data.bookedDays })
    }
  }
  getPhotos = async () => {
    const { id } = this.state
    this.setState({ loadingImages: true })
    const res = await GetRequest(urls.experienceBase, `${urls.v}experience/photo/experience?experienceid=${id}`);
    console.log('Photos tour ', res)
    this.setState({ loadingImages: false })
    if(res.isError) {
        const message = res.Message || res.message;
        errorMessage(message)
    } else {
        const imgData = res.data;
        this.setState({ photos: imgData })
    }
  }
  renderBottomMenu = () => {
    const { userData } = this.context.state
    const { tour } = this.state
    if(tour) {
      if((userData && userData.id !== tour.userId) || !userData) {
        const price = tour ? `₦ ${formatAmount(tour.pricePerGuest)} /person` : '₦ 0'
        return (
          <BottomMenuComponent onPress={this.openCheckInModal} title='Reserve Space' price={price} />
          // <BottomMenuComponent onPress={this.openCheckInModal} house={this.state.house} />
        )
      }
    }
  }
  componentDidMount = () => {
    this.getTour();
    this.getPhotos();
    this.getCalendar();
  }

  render() {
    const { buttonContainer, placeAroundContainer, headerStyle, scrollContainer } = styles;
    const {  textExtraBold, textH2Style } = GStyles;
    const { photos, tour, mountPayModal } = this.state
    const price = tour ? `₦ ${formatAmount(tour.pricePerGuest)} /person` : '₦ 0'
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            {this.renderLoading()}
            <BackHeader {...this.props} />
            <ScrollView>
                <View>
                    {tour ? <Header title={tour.title} tour={tour} photos={photos} /> : <></>}
                    {tour ? <HostComponent tour={tour} photos={photos} /> : <></>}
                </View>
                <View style={placeAroundContainer}>
                    <View style={headerStyle}>
                        <MyText style={[textH2Style, textExtraBold]}>More Tours Around You</MyText>
                    </View>
                    <View style={scrollContainer}>
                        <ScrollContent {...this.props} tourId={this.state.id} />
                    </View>
                </View>
            </ScrollView>
            <View style={buttonContainer}>
                {this.renderBottomMenu()}
                {/* <BottomMenuComponent onPress={this.openCheckInModal} title='Reserve Space' price={price} /> */}
            </View>
            <CheckInModal visible={this.state.showCheckInModal} onDecline={this.closeCheckInModal} next={this.openCheckOutModal} 
            bookedDays={this.state.bookedDays} />

            <CheckOutModal visible={this.state.showCheckOutModal} onDecline={this.closeCheckOutModal} next={this.openModal} 
            back={this.openCheckInModal} checkInDate={this.state.formData.check_In_Date} bookedDays={this.state.bookedDays} />

            {tour ? <View>
                <TourModal visible={this.state.showModal} onDecline={this.closeModal} tour={tour} next={this.openPayModal} back={this.openCheckOutModal} 
                formData={this.state.formData} />
            </View> : <></>}

            <LoginModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} openSignUp={this.openSignUpModal} close />

            <SignUpModal visible={this.state.showRegisterModal} onDecline={this.closeSignUpModal} {...this.props} openLogin={this.openLoginModal} />
            {mountPayModal ? <ConfirmAndPayModal visible={this.state.payModal} onDecline={this.onClosePayModal} {...this.props} goBack={this.openModal}
            tour={this.state.tour} orderDetails={this.state.orderDetails} /> : <></>}
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
    buttonContainer: {
        position: 'absolute', bottom: 0, width: '100%',
    }, 
});


export default TourSingle;
