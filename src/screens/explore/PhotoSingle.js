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

import { setContext, Request, urls, GetRequest, successMessage, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider';


class PhotoSingle extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, photo: '', portofilo: [], gettingPhotographer: false, gettingPortofolio: false, loading: false };
    const { photo } = props.route.params;
    this.state.photo = photo
  }
  openModal = () => {
    this.setState({ showModal: true })
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

  getPhotographer = async () => {
    const { photo } = this.state
    this.setState({ gettingPhotographer: true })
    const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/${photo.id}`);
    console.log('Photographer ', res)
    this.setState({ gettingPhotographer: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        if(data !== null) {
          this.setState({ photo: data })
        }
    }
  }
  getPortolio = async () => {
    const { photo } = this.state
    this.setState({ gettingPortofolio: true })
    const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/photo/portfolio/${photo.id}`);
    console.log('Photographer portofilo', res)
    this.setState({ gettingPortofolio: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        if(data !== null) {
          this.setState({ portofilo: data })
        }
    }
  }

  componentDidMount = () => {
    this.getPhotographer()
    this.getPortolio()
  }

  render() {
    const { contentStyles, contentWhiteStyles, buttomContainer } = styles
    const { photo, portofilo } = this.state
    const title = photo && photo.title ? photo.title : '****';
    const location = photo && photo.address ? `${photo.address.state} photoshot` : ''
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            {this.renderLoading()}
            <BackHeader {...this.props} />
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
