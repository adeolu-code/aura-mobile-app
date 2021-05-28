/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';
import ImageAndDetails from '../../components/explore/food_single/ImageAndDetails';
import LocationComponent from '../../components/explore/food_single/LocationComponent';
import HostComponent from '../../components/explore/food_single/HostComponent';
import CommentComponent from '../../components/explore/CommentComponent';
import ReviewsComponent from '../../components/explore/ReviewsComponent';
import AmenitiesComponent from '../../components/explore/food_single/AmenitiesComponent';
import ServicesComponent from '../../components/explore/food_single/ServicesComponent';
import RulesComponent from '../../components/explore/RulesComponent';

import DetailsComponent from '../../components/explore/DetailsComponent';

import MenuSectionComponent from '../../components/explore/food_single/MenuSectionComponent';
import BottomMenuComponent from '../../components/explore/food_single/BottomMenuComponent';

import OrderFoodModal from '../../components/explore/food_single/OrderFoodModal';
import ConfirmAndPayModal from '../../components/explore/food_single/ConfirmAndPayModal';
import LoginModal from '../../components/auth/LoginModal';
import SignUpModal from '../../components/auth/SignUpModal';

import { setContext, Request, urls, GetRequest, successMessage, SCREEN_HEIGHT, errorMessage, GOOGLE_API_KEY } from '../../utils';
import { AppContext } from '../../../AppProvider';



import BackHeader from '../../components/BackHeader'

class FoodSingle extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = {

        restaurant: '', id: '', gettingRestaurant: false, menus: [], categories: [], locations: [], gettingReviews: false, 
        comments: [], reviews: [], selectedFoods: [], showModal: false, showLoginModal: false, showRegisterModal: false,
        payModal: false, orderDetails: '', mountPayModal: false,
        contact: false,
    };
    this.state.id = props.route.params?.restaurantId
  }
  openPayModal = (value) => {
    this.setState({ payModal: true, orderDetails: value, mountPayModal: true })
  }
  onClosePayModal = () => {
    this.setState({ payModal: false })
  }
  openModal = () => {
    // this.setState({ showModal: true })
    // this.openPayModal()
    const { state } = this.context
    this.setState({ contact: false })
    if(state.isLoggedIn) {
      this.setState({ showModal: true })
    } else {
      this.setState({ showLoginModal: true})
    }
  }
  onCloseModal = () => {
    this.setState({ showModal:false })
  }
  contactHost = () => {
    const { state } = this.context
    this.setState({ contact: true })
    if(state.isLoggedIn) {
      this.linkToChat()
    } else {
      this.setState({ showLoginModal: true})
    }
  }
  linkToChat = () => {
    const { house, restaurant } = this.state
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
  openLoginModal = () => {
    this.setState({ showLoginModal: true })
  }
  closeLoginModal = (bool) => {
    this.setState(() => ({ showLoginModal: false }), () => {
      if(bool) {
        if(this.state.contact) {
          this.linkToChat()
        } else {
          this.openModal();
        }
      }
    })
  }
  openSignUpModal = () => {
    this.setState({ showRegisterModal: true })
  }
  closeSignUpModal = () => {
    this.setState({ showRegisterModal: false })
  }
  renderLoading = () => {
      const { gettingRestaurant, loading, gettingImages } = this.state;
      if (gettingRestaurant || gettingImages || loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
  }
  getReviews = async () => {
    const { id } = this.state
    try {
      this.setState({ gettingReviews: true })
      const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/review/${id}`);
      // console.log('Restaurant Reviews ', res)
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
    } catch (error) {
      this.setState({ gettingReviews: false })
    }
  }

  getRestaurant = async () => {
    const { id } = this.state
    try {
      this.setState({ gettingRestaurant: true })
      const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/${id}`);
      // console.log('Restaurants Details ', res)
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
    } catch (error) {
      this.setState({ gettingRestaurant: false })
    }
  }
  getMenus = async () => {
    const { id } = this.state
    this.setState({ gettingMenus: true })
    try {
      const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/photo/menu/${id}`);
      // console.log('Restaurants menus ', res)
      this.setState({ gettingMenus: false })
      if(res.isError) {
          const message = res.Message;
          errorMessage(message)
      } else {
          const data = res.data;
          const arr = []
          data.filter((item, i) => {
            const lookforItem = arr.find(menu => menu === item.category)
            if(lookforItem === undefined) {
              arr.push(item.category)
            }
          })
          if(data !== null) {
            this.setState({ menus: data })
          }
          this.setState({ categories: arr })
      }
    } catch (error) {
      this.setState({ gettingMenus: false })
    }
    
  }
  

  componentDidMount = () => {
    this.getRestaurant()
    this.getMenus()
    this.getReviews()
    
  }

  renderLocations = () => {
    const { restaurant } = this.state;
    if(restaurant) {
      return restaurant.locations.map((item, i) => {

        const key = `loc_${i}`
        const address = `${item.street}, ${item.city}, ${item.state}, ${item.country}`
        return (
          <LocationComponent location={item} key={key} address={address} />
        )
      })
    }
  }

  onAdd = (item) => {
    // // console.log('Item added ', item)
    const { selectedFoods } = this.state;
    const arr = [ ...selectedFoods ];
    arr.push(item)
    this.setState({ selectedFoods: arr })

    // if(arr.length > 0) {
    //   const getFirstId = arr[0].id
    //   if(item.id === getFirstId) {
    //     arr.push(item)
    //     this.setState({ selectedFoods: arr })
    //   } else {
    //     this.setState({ selectedFoods: [item]})
    //   }
    // } else {
    //   this.setState({ selectedFoods: [item]})
    // }
    // this.setState({ selectedFoods: arr })

    // const { selectedFoods } = this.state;
    // const arr = [ ...selectedFoods ];
    // if(arr.length > 0) {
    //   const getFirstId = arr[0].id
    //   if(item.id === getFirstId) {
    //     arr.push(item)
    //     this.setState({ selectedFoods: arr })
    //   } else {
    //     this.setState({ selectedFoods: [item]})
    //   }
    // } else {
    //   this.setState({ selectedFoods: [item]})
    // }
  }

  onRemove = (value) => {
    // console.log('Value ', value)
    const { selectedFoods } = this.state;
    const arr = [ ...selectedFoods ];
    if(arr.length > 0) {
      const foodIndex = arr.findIndex(item => item.id === value.id)
      // console.log('index ', foodIndex)
      arr.splice(foodIndex, 1)
      this.setState({ selectedFoods: arr })
    }
  }

  setCount = (obj) => {
    // console.log('Obj ', obj)
    const { selectedFoods } = this.state;
    const filteredFoods = selectedFoods.filter((item) => item.id === obj.item.id)

    if(obj.count > filteredFoods.length) {
      this.onAdd(obj.item)
    } else {
      this.onRemove(obj.item)
    }
    // if(obj.count > selectedFoods.length) {
    //   this.onAdd(obj.item)
    // } else {
    //   this.onRemove(obj.item)
    // }
  }

  render() {
    const { restaurant, mountPayModal } = this.state
    const { textH2Style, textExtraBold } = GStyles
    return (
      <View style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <BackHeader {...this.props} wrapperStyles={{ position: 'relative'}} />
        <ScrollView>
            <View style={{marginBottom: 80}}>
                <ImageAndDetails title="Ocean Basket" photos={this.state.menus} restaurant={restaurant} />
                <MenuSectionComponent restaurant={restaurant} menus={this.state.menus} categories={this.state.categories} onAdd={this.onAdd} />
                {restaurant ? <AmenitiesComponent operations={restaurant.operations} title="Operations" /> : <></>}
                {restaurant ? <ServicesComponent services={restaurant.services} title="Services" /> : <></>}
                {/* <RulesComponent title="Restaurant Rules" /> */}
                <View style={styles.headerStyle}>
                    <MyText style={[textH2Style, textExtraBold]}>Location</MyText>
                </View>
                {this.renderLocations()}
                {restaurant ? <HostComponent restaurant={restaurant} {...this.props} onPress={this.contactHost} /> : <></>}
                {/* <DetailsComponent /> */}
                {/* <ReviewsComponent /> */}
                {/*<CommentComponent /> */}
            </View>
        </ScrollView>
        <View style={styles.buttomContainer}>
            <BottomMenuComponent onPress={this.openModal} disabled={this.state.selectedFoods.length === 0} 
            foods={this.state.selectedFoods} onRemove={this.onRemove} />
        </View>
        <OrderFoodModal visible={this.state.showModal} onDecline={this.onCloseModal} {...this.props} next={this.openPayModal}
        foods={this.state.selectedFoods} restaurant={this.state.restaurant} setCount={this.setCount} />

        <LoginModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} openSignUp={this.openSignUpModal} close />

        <SignUpModal visible={this.state.showRegisterModal} onDecline={this.closeSignUpModal} {...this.props} openLogin={this.openLoginModal} />
        
        {mountPayModal ? <ConfirmAndPayModal visible={this.state.payModal} onDecline={this.onClosePayModal} {...this.props} goBack={this.openModal}
        foods={this.state.selectedFoods} restaurant={this.state.restaurant} orderDetails={this.state.orderDetails} /> : <></>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
      marginBottom: 15, marginTop: 10,
      paddingHorizontal: 20
  },
  buttomContainer: {
      position: 'absolute', bottom: 0, width: '100%', zIndex: 50, ...GStyles.shadow
      // paddingBottom: 10,
  }
});

export default FoodSingle;
