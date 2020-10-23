/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
import BottomMenuComponent from '../../components/explore/home_single/BottomMenuComponent';

import CalendarModal from '../../components/explore/home_single/CalendarModal';
import ScrollContent from '../../components/explore/ScrollContent';
import MorePlaces from '../../components/explore/MorePlaces';

import { setContext, Request, urls, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';

class HomeSingle extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, house: null, loadingImages: false, photos: [], gettingHouse: false, gettingHouseRules: false,
         houseId: '', houseRules: [], location: null, gettingReviews: false, reviews: [], 
         gettingComments: false, comments: [] };
    const { house } = props.route.params;
    this.state.house = house;
    this.state.location = { longitude: house.longitude, latitude: house.latitude }
    console.log('House ', house)
  }

  openModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }
  getPhotos = async () => {
    const { house } = this.state
    this.setState({ loadingImages: true })
    const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/', 
    `api/v1/listing/photo/property/?PropertyId=${house.id}&Size=6&Page=1`);
    this.setState({ loadingImages: false })
    if(res.isError) {
        const message = res.Message;
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
    const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/',  `api/v1/listing/houserule`);
    
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
    const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/', `api/v1/listing/property/${house.id}`);
    console.log('House Details ', res)
    this.setState({ gettingHouse: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        this.setState({ house: data })
    }
  }
  getHouseRules = async () => {
    const { house } = this.state
    this.setState({ gettingHouseRules: true })
    const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/', `api/v1/listing/property/houserules/?propertyid=${house.id}`);
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
    const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/', `api/v1/listing/review/property/?PropertyId=${house.id}`);
    console.log('House Reviews ', res)
    this.setState({ gettingReviews: false })
    if(res.isError) {
        const message = res.Message;
    } else {
        const data = res.data;
        this.setState({ reviews: data })
    }
  }

//   getComments = async () => {
//     const { house } = this.state
//     this.setState({ gettingComments: true })
//     const res = await GetRequest('https://aura-listing-prod.transcorphotels.com/', 
//     `api/v1/listing/review/comment/?PropertyId=${house.id}`);
//     console.log('House Reviews ', res)
//     this.setState({ gettingComments: false })
//     if(res.isError) {
//         const message = res.Message;
//     } else {
//         const data = res.data;
//         this.setState({ comments: data })
//     }
//   }
  renderLoading = () => {
        const { gettingHouse } = this.state;
        if (gettingHouse) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
    }

  componentDidMount = () => {
    this.getHouse()
    this.getPhotos()
    this.getHouseRules()
    this.getReviews()
    // this.getAmenity()
  }

  render() {
    const { buttomContainer, placeAroundContainer, headerStyle, scrollContainer } = styles;
    const { imgStyle, textWhite, textH3Style, textDarkGrey, textExtraBold, textH2Style } = GStyles

    const { house, houseRules, location, reviews } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <BackHeader {...this.props} />
        <ScrollView>
            <View>
                <ImageAndDetails imgArr={this.state.photos} house={house} title={house.title} photos={this.state.photos}
                loading={this.state.loadingImages} />
                <AmenitiesComponent house={house} />
                {houseRules.length !== 0 ?<RulesComponent title="House Rules" rules={houseRules} /> : <Fragment />}
                <LocationComponent house={house} address={house.address} location={location} />
                <HostComponent house={house} />
                <DetailsComponent />
                <ReviewsComponent reviews={reviews} />
                <CommentComponent />

                {house ? <MorePlaces {...this.props} house={house}  /> : <Fragment />}
                {/* <View style={placeAroundContainer}>
                    <View style={headerStyle}>
                        <MyText style={[textH2Style, textExtraBold]}>More Places To Stay</MyText>
                    </View>
                    <View style={scrollContainer}>
                        <ScrollContent {...this.props} />
                    </View>
                </View> */}
            </View>
        </ScrollView>
        <View style={buttomContainer}>
            <BottomMenuComponent onPress={this.openModal} house={this.state.house} />
        </View>
        <CalendarModal visible={this.state.showModal} onDecline={this.closeModal} />
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
    headerStyle: {
        marginBottom: 10, marginTop: 10, paddingHorizontal: 20
    },
    scrollContainer: {
        marginLeft: 20,
    },
    placeAroundContainer: {
        paddingTop: 20, paddingBottom:100,
        backgroundColor: colors.white,
        borderTopWidth: 2, borderTopColor: colors.lightGrey
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    buttomContainer: {
        position: 'absolute', bottom: 0, width: '100%', zIndex: 50
    }
    
});

export default HomeSingle;
