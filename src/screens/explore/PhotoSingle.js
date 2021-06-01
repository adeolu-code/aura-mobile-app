/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../utils/Index';

import colors from '../../colors';

import BackHeader from '../../components/BackHeader'

import Header from '../../components/explore/photo_single/Header';
import ImagesComponent from '../../components/explore/photo_single/ImagesComponent';
import PhotographerDetails from '../../components/explore/photo_single/PhotographerDetails';
import HostComponent from '../../components/explore/photo_single/HostComponent';
import MorePhotosComponent from '../../components/explore/photo_single/MorePhotosComponent';
import EquipmentComponent from '../../components/explore/photo_single/EquipmentComponent';
import CommentComponent from '../../components/explore/photo_single/CommentComponent';
import MoreComponent from '../../components/explore/photo_single/MoreComponent';
import BottomMenuComponent from '../../components/explore/photo_single/BottomMenuComponent';
import ContactModal from '../../components/explore/photo_single/ContactModal';

import LoginModal from '../../components/auth/LoginModal';
import SignUpModal from '../../components/auth/SignUpModal';

import { setContext, Request, urls, GetRequest, successMessage, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider';


class PhotoSingle extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showModal: false, photo: '', portofilo: [], gettingPhotographer: false, 
    gettingPortofolio: false, loading: false, showLoginModal: false, showRegisterModal: false };
    const { photo } = props.route.params;
    this.state.photo = photo
  }
  openLoginModal = () => {
    this.setState({ showLoginModal: true })
  }
  openSignUpModal = () => {
    this.setState({ showRegisterModal: true })
  }
  closeSignUpModal = () => {
    this.setState({ showRegisterModal: false })
  }
  closeLoginModal = (bool) => {
    console.log('Bool ', bool)
    this.setState(() => ({ showLoginModal: false }), () => {
      if(bool) {
        this.getPhotographer(true)
      }
    })
  }
  openModal = () => {
    const { state } = this.context
    if (state.isLoggedIn) {
      this.setState({ showModal: true })
    } else {
      this.openLoginModal()
    }
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }
  renderLoading = () => {
      const { gettingPhotographer, gettingPortofolio, loading } = this.state;
      if (gettingPhotographer || gettingPortofolio || loading) { 
          return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); 
      }
  }

  getPhotographer = async (bool=false) => {
    const { photo } = this.state
    this.setState({ gettingPhotographer: true })
    try {
      const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/${photo.id}`);
      console.log('Photographer ', res)
      this.setState({ gettingPhotographer: false })
      if(res.isError) {
          const message = res.Message;
      } else {
          const data = res.data;
          if(data !== null) {
            this.setState({ photo: data })
            if(bool) {
              this.openModal()
            }
          }
      }
    } catch (error) {
      this.setState({ gettingPhotographer: false })
    }
    
  }
  getPortolio = async () => {
    const { photo } = this.state
    this.setState({ gettingPortofolio: true })

    try {
      const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/photo/portfolio/${photo.id}`);
      this.setState({ gettingPortofolio: false })
      if(res.isError) {
          const message = res.Message;
      } else {
          const data = res.data;
          if(data !== null) {
            this.setState({ portofilo: data })
          }
      }
    } catch (error) {
      this.setState({ gettingPortofolio: false })
    }
  }

  componentDidMount = () => {
    const { isLoggedIn } = this.context.state
    if(isLoggedIn) {
      this.getPhotographer()
    }
    this.getPortolio()
    // console.log('Component mounted ', this.props.route)
  }

  render() {
    const { contentStyles, contentWhiteStyles, buttomContainer } = styles
    const { photo, portofilo } = this.state
    const title = photo && photo.title ? photo.title : '****';
    const location = photo && photo.address ? `${photo.address.state} photoshot` : ''
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            {this.renderLoading()}
            <BackHeader {...this.props} wrapperStyles={{ position: 'relative'}} />
            <ScrollView>
                <View>
                    <Header title={title} location={location} />
                    <ImagesComponent portofilo={portofilo} />
                    <PhotographerDetails photo={photo} />

                    <View style={contentStyles}>
                        <HostComponent photo={photo} />
                        {portofilo && portofilo.length > 5 ? <MorePhotosComponent portofilo={portofilo.slice(5)} /> : <></> }
                        {photo ? <EquipmentComponent photo={photo} /> : <></>}
                        {/* <CommentComponent /> */}
                    </View>
                    <View style={contentWhiteStyles}>
                        {photo ? <MoreComponent photo={photo} {...this.props} /> : <></>}
                    </View>
                </View>
            </ScrollView>
            <View style={buttomContainer}>
                <BottomMenuComponent onPress={this.openModal}  />
            </View>
            {photo && photo.address ? <ContactModal visible={this.state.showModal} onDecline={this.closeModal} photo={photo} /> : <></>}
            <LoginModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} openSignUp={this.openSignUpModal} close />
            <SignUpModal visible={this.state.showRegisterModal} onDecline={this.closeSignUpModal} {...this.props} openLogin={this.openLoginModal} />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    contentStyles: {
        backgroundColor: colors.blackClose, paddingVertical: 20, paddingHorizontal: 20
    },
    contentWhiteStyles: {
        backgroundColor: colors.white, paddingBottom: 90, paddingHorizontal: 20
    },
    buttomContainer: {
        position: 'absolute', bottom: 0, width: '100%'
    }
});

export default PhotoSingle;
