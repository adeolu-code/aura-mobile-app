/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import { MyText, Loading, CustomButton } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import FoodComponent from './FoodComponent';

import { urls, GetRequest } from '../../utils'
import colors from '../../colors';

class TourImgComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, tours: [] };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if (loading) { return (<Loading wrapperStyles={{ height: 100, width: '100%', paddingTop: 50 }} />); }
  }

  linkToTours = () => {
    this.props.navigation.navigate('ExploreAll', { tab: 'five' })
  }
  getTours = async (more=false) => {
      this.setState({ loading: true })

      try {
        const { tourId } = this.props
        const res = await GetRequest(urls.experienceBase, `${urls.v}experience/get/list/?status=Adminpublished&Page=1&Size=3`);
        this.setState({ loading: false })
        if(res.isError || res.IsError) {
            const message = res.Message || res.message;
            errorMessage(message)
        } else {
            const tours = res.data.data
            // const tours = dataResult.filter(item => item.id !== tourId)
            this.setState({ tours })
        }
      } catch (error) {
        this.setState({ loading: false })
      }
  }
  
  linkToTour = (tour) => {
    this.props.navigation.navigate('Other', { screen: 'TourSingle', params: { tourId: tour.id } })
  }

  componentDidMount = () => {
    this.getTours()
  }
  renderFirst = () => {
    const { tours } = this.state
    if(tours.length > 0) {
      const tour = tours[0]
      const imgUrl = tour.mainImage ? { uri: tour.mainImage.assetPath } : require('../../assets/images/no_experience.png')
      return (
        <Pressable style={styles.imgContainer1} onPress={this.linkToTour.bind(this, tour)}>
          <Image source={imgUrl} resizeMode="cover" style={[GStyles.imgStyle, { borderRadius: 5}]} />
        </Pressable>
      )
    }
  }
  renderSecond = () => {
    const { tours } = this.state;
    if(tours.length > 1) {
      const tour = tours[1]
      const imgUrl = tour.mainImage ? { uri: tour.mainImage.assetPath } : require('../../assets/images/no_experience.png')
      return (
        <Pressable style={styles.imgContainer2} onPress={this.linkToTour.bind(this, tour)}>
            <Image source={imgUrl} resizeMode="cover" style={[GStyles.imgStyle, { borderRadius: 5}]} />
        </Pressable>
      )
    }
  }
  renderThird = () => {
    const { tours } = this.state;
    if(tours.length > 2) {
      const tour = tours[2]
      const imgUrl = tour.mainImage ? { uri: tour.mainImage.assetPath } : require('../../assets/images/no_experience.png')
      return (
        <Pressable style={styles.imgContainer2} onPress={this.linkToTour.bind(this, tour)}>
            <Image source={imgUrl} resizeMode="cover" style={[GStyles.imgStyle, { borderRadius: 5}]} />
        </Pressable>
      )
    }
  }

  render() {
    const { container, bottomImgContainer } = styles;
    const { imgStyle, flexRow } = GStyles;
    const { tours } = this.state
    return (
      <View style={container}>
        {this.renderLoading()}
        <View>
          {this.renderFirst()}
          <View style={[flexRow, bottomImgContainer]}>
              {this.renderSecond()}
              {this.renderThird()}
          </View>
        </View>
        {tours && tours.length !== 0 ? <View style={{ marginTop: 20 }}>
          <CustomButton buttonText="Find More Tour" iconName="arrow-right" onPress={this.linkToTours} />
        </View> : <></>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    imgContainer1: {
        width: '100%', height: 170, marginTop: 30, marginBottom: 20, borderRadius: 5, overflow: 'hidden',
        elevation: 1, backgroundColor: colors.lightGrey, ...GStyles.shadow
    },
    bottomImgContainer: {
        justifyContent: 'space-between'
    },
    imgContainer2: {
        width: '47.5%', height: 190, borderRadius: 5, overflow: 'hidden',
        elevation: 1, backgroundColor: colors.lightGrey, ...GStyles.shadow
    }
});

export default TourImgComponent;
