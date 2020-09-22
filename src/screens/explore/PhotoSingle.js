import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText } from '../../utils/Index';

import colors from '../../colors';

import BackHeader from '../../components/BackHeader'

import Header from '../../components/explore/photo_single/Header';
import ImagesComponent from '../../components/explore/photo_single/ImagesComponent';

class PhotoSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
            <BackHeader {...this.props} />
            <ScrollView>
                <View>
                    <Header title="Soulful Travel Memories Photos" />
                    <ImagesComponent />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }
}

export default PhotoSingle;
