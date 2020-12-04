/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';
import ImageAndDetails from '../../components/explore/food_single/ImageAndDetails';
import LocationComponent from '../../components/explore/LocationComponent';
import HostComponent from '../../components/explore/HostComponent';
import CommentComponent from '../../components/explore/CommentComponent';
import ReviewsComponent from '../../components/explore/ReviewsComponent';
import AmenitiesComponent from '../../components/explore/AmenitiesComponent';
import RulesComponent from '../../components/explore/RulesComponent';

import DetailsComponent from '../../components/explore/DetailsComponent';

import MenuSectionComponent from '../../components/explore/food_single/MenuSectionComponent'

import { setContext, Request, urls, GetRequest, successMessage, errorMessage } from '../../utils';


import BackHeader from '../../components/BackHeader'

class FoodSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {

        restaurant: '', id: '', gettingRestaurant: false, images: []
    };
    this.state.id = props.route.params?.restaurantId
  }
  renderLoading = () => {
      const { gettingRestaurant, loading, gettingImages } = this.state;
      if (gettingRestaurant || gettingImages || loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
  }

  getRestaurant = async () => {
    const { id } = this.state
    this.setState({ gettingRestaurant: true })
    const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/${id}`);
    console.log('Restaurants Details ', res)
    this.setState({ gettingRestaurant: false })
    if(res.isError) {
        const message = res.Message;
        errorMessage(message)
    } else {
        const data = res.data;
        if(data !== null) {
          this.setState({ restaurant: data })
        }
    }
  }
  getImages = async () => {
    const { id } = this.state
    this.setState({ gettingImages: true })
    const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/photo/menu/${id}`);
    console.log('Restaurants images ', res)
    this.setState({ gettingImages: false })
    if(res.isError) {
        const message = res.Message;
        errorMessage(message)
    } else {
        const data = res.data;
        if(data !== null) {
          this.setState({ images: data })
        }
    }
  }

  componentDidMount = () => {
    this.getRestaurant()
    this.getImages()
  }

  render() {
    const { restaurant } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <BackHeader {...this.props} />
        <ScrollView>
            <View>
                <ImageAndDetails title="Ocean Basket" 
                photos={this.state.images} restaurant={restaurant} />
                <MenuSectionComponent restaurant={restaurant} />
                {/* <AmenitiesComponent />
                <RulesComponent title="Restaurant Rules" />
                <LocationComponent />
                <HostComponent />
                <DetailsComponent />
                <ReviewsComponent />
                <CommentComponent /> */}
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default FoodSingle;
