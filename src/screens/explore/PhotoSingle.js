import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText } from '../../utils/Index';

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


class PhotoSingle extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }
  openModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { contentStyles, contentWhiteStyles, buttomContainer } = styles
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <BackHeader {...this.props} />
            <ScrollView>
                <View>
                    <Header title="Soulful Travel Memories Photos" />
                    <ImagesComponent />
                    <PhotographerDetails />

                    <View style={contentStyles}>
                        <HostComponent />
                        <MorePhotosComponent />
                        <EquipmentComponent />
                        <CommentComponent />
                    </View>
                    <View style={contentWhiteStyles}>
                        <MoreComponent />
                    </View>
                </View>
            </ScrollView>
            <View style={buttomContainer}>
                <BottomMenuComponent onPress={this.openModal} />        
            </View>
            <ContactModal visible={this.state.showModal} onDecline={this.closeModal} />
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
