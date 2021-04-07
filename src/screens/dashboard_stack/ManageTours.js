/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList, 
  RefreshControl, Platform, Dimensions } from 'react-native';
import { MyText, Loading, Spinner } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import { ManagePropertyContext } from '../../../ManagePropertyProvider';

import { AppContext } from '../../../AppProvider'

import { GetRequest, urls, Request, errorMessage, EXPERIENCE } from '../../utils';


import AllTours from '../../components/dashboard/AllTours';
import ManageTourRow from '../../components/dashboard/ManageTourRow';

import TourActionModal from '../../components/dashboard/TourActionModal';
import TermsModal from '../../components/dashboard/TermsModal';

import OtpModal from '../../components/dashboard/OtpModal';
import EmailVerificationModal from '../../components/dashboard/EmailVerificationModal';
import ChangeNumberModal from '../../components/dashboard/ChangeNumberModal';

import { shortenXterLength, formatAmount } from '../../helpers'

const SCREEN_HEIGHT = Dimensions.get('screen').height

class ManageTours extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true, showModal: false, loading: false, tours: [], page: 1, size: 5, totalItems: 0, active: true,
      pageCount: 0, loadMore: false, tour: null, modalImg: require('../../assets/images/no_experience.png'), refreshing: false, tour:'', 
      showTermsModal: false, type: '', showOtpModal: false, showEmailModal: false, showPhoneModal: false, close: true, };
    this.state.tour = props.route.params?.tour
  }

  linkTo = (tour) => {
    this.props.navigation.navigate('Other', { screen: 'TourSingle', params: { tourId: tour.id } })
  }
  addTour = () => {
    this.context.set({ editTour: false })
    this.checkVerification()
    // this.setState({ showTermsModal: true, type: EXPERIENCE })
    // this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: EXPERIENCE } })
  }
  renderLoading = () => {
      const { loading, refreshing } = this.state;
      if (loading && !refreshing) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 100 }} />); }
  }

  componentDidMount = () => {
    this.getTours();

  }
  openTermsModal = () => {
    this.setState({ showTermsModal: true, type: EXPERIENCE })
  }
  closeTermsModal = () => {
    this.setState({ showTermsModal: false })
  }

  getTours = async (more=false, refresh=false) => {
    try {
      const { page, size, tours } = this.state
      more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
      if(refresh) { this.setState({ refreshing: true })}
      const res = await GetRequest(urls.experienceBase, `${urls.v}experience/me?Page=${page}&Size=${size}`)
      console.log('Tours ', res)
      more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
      this.setState({ refreshing: false })
      if(res.isError || res.IsError) {
        errorMessage(res.message || res.Message)
      } else {
        let data = []
        const dataResult = res.data.data
        if(more) {
          data = [...tours, ...dataResult]
        } else {
          data = dataResult
        }
        const pageCount =  Math.ceil(res.data.totalItems / size)
        this.setState({ tours: data, page: res.data.page, totalItems: res.data.totalItems, pageCount })
      }
    } catch (error) {
      
    }
  }

  deleteTour = (id) => {
    const { tours } = this.state;
    const index = tours.findIndex(item => item.id === id)
    tours.splice(index, 1)
  }

  selectTabOne = () => {
    this.setState({ tabOneSelected: true, tabTwoSelected: false, tabThreeSelected: false });
  }

  openModal = (item) => {
    const modalImg = item.mainImage ? {uri: item.mainImage.assetPath} : require('../../assets/images/no_experience.png')
    this.setState({ modalImg, tour: item, showModal: true  });
  }
  closeModal = () => {
    this.setState({ showModal: false });
  }
  openPhoneModal = () => {
    this.setState({ loadModals: true, showPhoneModal: true });
  }
  closePhoneModal = () => {
    this.setState({ showPhoneModal: false });
  }
  openOtpModal = () => {
      this.setState({ showOtpModal: true });
  }
  closeOtpModal = (value) => {
    this.setState({ showOtpModal: false });
    if(value === 'success') {
      this.openTermsModal()
    }
  }
  openEmailModal = () => {
      this.setState({ showEmailModal: true });
  }
  closeEmailModal = (value) => {
      this.setState({ showEmailModal: false });
      if(value === 'success') {
        this.openTermsModal()
      }
  }
  generateOtp = async () => {
      this.setState({ loading: true, errors: [] });
      try {
        const res = await Request(urls.identityBase, `${urls.v}user/otp/generate`);
        this.setState({ loading: false });
        if (res.IsError) {
            const message = res.Message;
            errorMessage(message)
        } else {
            this.openOtpModal()
        }
      } catch (error) {
        this.setState({ loading: false })
      }
      
  }
  sendMail = async () => {
      const { userData } = this.context.state;
      try {
        this.setState({ loading: true, errors: [] });
        const res = await GetRequest(urls.identityBase, `${urls.v}user/email/verification/resend/${userData.username}`);
        this.setState({ loading: false });
        if (res.isError) {
            const message = res.message;
            errorMessage(message)
        } else {
            this.openEmailModal();
        }
      } catch (error) {
        this.setState({ loading: false })
      }
  }
  checkVerification = () => {
    const { userData } = this.context.state;
    // this.generateOtp();
    if (userData.isPhoneVerified) {
        if (userData.isEmailVerified) {
            this.openTermsModal()
        } else {
            this.sendMail();
        }
    } else {
        // Got to OTP modal to verify phone

        // If the person has phone number
        if (userData.phoneNumber) {
            this.generateOtp();
        } else {
            if (userData.isEmailVerified) {
              this.openTermsModal()
            } else {
                this.sendMail();
            }
        }
    }
  }
  onEndReached = () => {
      const { page, size, pageCount, loadMore } = this.state
      if(page < pageCount && !loadMore) {
          this.setState(() => ({ page: page + 1 }), () => {
            this.getTours(true)
          })
      }
      // console.log('End reached')
  }
  renderLoadMore = () => {
      const { loadMore } = this.state
      const {textH4Style, textCenter, textOrange, textBold,flexRow } = GStyles
      if(loadMore) {
          return (
          <View style={[flexRow, { justifyContent: 'center', alignItems: 'center', flex: 1}]}>
              <Spinner size={20} color={colors.orange} />
              <MyText style={[textH4Style, textCenter, textOrange, textBold, { marginLeft: 10}]}>Loading....</MyText>
          </View>
          )
      }
  }

  renderEmptyContainer = () => {
      const { emptyContainerStyle } = styles;
      const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
      const { tours, loading } = this.state
      if(tours.length === 0 && !loading) {
          return (
              <View style={{ flex: 1, paddingVertical: 60}}>
                  <View style={emptyContainerStyle}>
                      <Image source={require('../../assets/images/no_tour.png')} style={imgStyle} resizeMode="contain" />
                  </View>
                  <MyText style={[textBold, textCenter, textH4Style, textOrange]}>You have not added Experience/Tour</MyText>
              </View>
          )
      }
  }

  renderItem = ({item}) => {
      const { rowContainer } = styles
      let title = item.title ? item.title : 'No title'
      title = shortenXterLength(title, 18)
      const imgUrl = item.mainImage ? {uri: item.mainImage.assetPath} : require('../../assets/images/no_experience.png')
      const price = `₦ ${formatAmount(item.pricePerGuest)}`
      return (
          <View style={rowContainer}>
              <ManageTourRow title={title} img={imgUrl} openModal={this.openModal.bind(this, item)} 
              location={item.meetUpAddress} 
              status={item.statusName} {...this.props} price={price} item={item}
              onPress={this.linkTo.bind(this, item)} />
              {/* <ManageTourRow title={title} img={imgUrl} openModal={this.openModal.bind(this, item)} location={location} 
              status={item.status} {...this.props} propertyType={item.propertyType.name} roomType={item.roomType.name} item={item}
              onPress={this.linkToSingleHome.bind(this, item)} /> */}
          </View>
      )
  }
  onRefresh = () => {
    this.setState(() => ({ page: 1}), () => {
      this.getTours(false, true)
    })
  }

  renderTours = () => {
      const { tours } = this.state
      return (
        <View style={styles.contentContainer}>
          <FlatList
              refreshControl={
                  <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing}
                  colors={[colors.orange, colors.success]} progressBackgroundColor={colors.white} />
              }
          //   onRefresh={this.onRefresh}
          //   refreshing={this.state.refreshing}
            ListFooterComponent={
              <>
                {this.renderLoadMore()}
              </>
            }
            ListEmptyComponent={this.renderEmptyContainer()}
            data={tours}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.8}
            // extraData={selectedId}
          />
        </View>
      )
  }
  render() {
    const { textSuccess, textWhite, textH5Style, textBold, } = GStyles;
    const { manageHeader, tabsContainer, tabStyle, activeTab } = styles;
    const { tabOneSelected, tour } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <Header {...this.props} title="Manage Tours" wrapperStyles={{ paddingBottom: 5}} />
        <View style={manageHeader}>
            <View style={tabsContainer}>
                <TouchableWithoutFeedback onPress={this.selectTabOne}>
                  <View style={[tabStyle, tabOneSelected ? activeTab : '']} >
                      <MyText style={[textH5Style,textBold, tabOneSelected ? textWhite : textSuccess]}>All Tours</MyText>
                  </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
        {this.renderTours()}
        {/* <AllTours {...this.props}  /> */}
        <View style={{ borderWidth: 1 }}>
          
          <TourActionModal visible={this.state.showModal} onDecline={this.closeModal} tour={tour} refresh={this.onRefresh} 
          deleteTour={this.deleteTour} img={this.state.modalImg} 
          title={tour && tour.title ? tour.title : 'No title'} {...this.props} />
        </View>
        <Fab active={this.state.active} direction="up" 
          style={{ backgroundColor: colors.orange }} 
            position="bottomRight" onPress={this.addTour}>
            <Icon name="add-circle" style={{ fontSize: 26 }} />
        </Fab>
        <TermsModal visible={this.state.showTermsModal} onDecline={this.closeTermsModal} {...this.props} type={this.state.type} />
        <View>
            <EmailVerificationModal visible={this.state.showEmailModal} onDecline={this.closeEmailModal} { ...this.props } close={this.state.close} />
            <OtpModal visible={this.state.showOtpModal} onDecline={this.closeOtpModal} { ...this.props } close={this.state.close}
            openEmail={this.openEmailModal} />
            <ChangeNumberModal visible={this.state.showPhoneModal} onDecline={this.closePhoneModal} { ...this.props } />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    manageHeader: {
        position: 'absolute', backgroundColor: colors.white, 
        paddingTop: Platform.OS === 'ios' ? 120 : 110, width: '100%', paddingHorizontal: 20, zIndex: 1,
    }, 
    tabsContainer: {
        display: 'flex', flexDirection: 'row', backgroundColor: colors.lighterGreen, borderRadius: 6, padding: 4,
        marginTop: 20
    },
    tabStyle: {
        flex: 1, paddingVertical: 12, justifyContent: 'center', alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.green, borderRadius: 6,
    },
    contentContainer: {
        paddingTop:Platform.OS === 'ios' ? 180 : 210, paddingHorizontal: 20, paddingBottom:30,
    },
    rowContainer: {
        marginBottom: 20,
    },
  
  icon: {
    flex: 0.1,
    color: colors.grey,
  },
  container: {
    width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8
  },
  imgContainer: {
    width: 120, height: 110, borderRadius: 6, overflow: 'hidden', marginRight: 20,
    borderWidth: 1
  },
  
  iconStyle: {
    fontSize: 6, marginHorizontal: 6
  },
  
  rowContainer: {
      marginBottom: 20, borderRadius: 6, 
      // borderWidth: 1, 
      paddingHorizontal: 1, paddingVertical: 1
  },
  emptyContainerStyle: {
      height: 260, width: '100%', marginBottom: 20
  }

});

export default ManageTours;
