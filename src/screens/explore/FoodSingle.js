/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';
import ImageAndDetails from '../../components/explore/ImageAndDetails';
import LocationComponent from '../../components/explore/LocationComponent';
import HostComponent from '../../components/explore/HostComponent';
import CommentComponent from '../../components/explore/CommentComponent';
import ReviewsComponent from '../../components/explore/ReviewsComponent';
import AmenitiesComponent from '../../components/explore/AmenitiesComponent';
import RulesComponent from '../../components/explore/RulesComponent';

import DetailsComponent from '../../components/explore/DetailsComponent';

import MenuSectionComponent from '../../components/explore/food_single/MenuSectionComponent'

import BackHeader from '../../components/BackHeader'

class FoodSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
        imgArr: [require('../../assets/images/food/food.png'), 
        require('../../assets/images/food/food1.png'), require('../../assets/images/food/food3.png'),
        require('../../assets/images/food/food2.png'), require('../../assets/images/food/food.png')]
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <BackHeader {...this.props} />
        <ScrollView>
            <View>
                <ImageAndDetails imgArr={this.state.imgArr} time title="Ocean Basket" />
                <MenuSectionComponent />
                <AmenitiesComponent />
                <RulesComponent title="Restaurant Rules" />
                <LocationComponent />
                <HostComponent />
                <DetailsComponent />
                <ReviewsComponent />
                <CommentComponent />
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default FoodSingle;
