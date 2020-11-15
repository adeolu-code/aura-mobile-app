import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, Loading } from '../../../utils/Index';
import colors from '../../../colors';

import ReviewRowComponent from './ReviewRowComponent';

import { shortenXterLength } from '../../../helpers'

class ReviewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderLoading = () => {
    const { state } = this.props.reviewsContext
    if (state.loadingReviews) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100, elevation: 5 }} />); }
  }
  renderItem = ({item, index}) => {
      const { rowContainer, bgOrange } = styles
      let propertyName = item.propertyName ? item.propertyName : 'No title'
      propertyName = shortenXterLength(propertyName, 18)
      const address = `${item.address} ${item.district}`
      const propertyUrl = item.propertyMainImage ? {uri: item.propertyMainImage} : require('../../../assets/images/no_house1.png')
      const profilePicture = item.profilePicture ? {uri: item.profilePicture} : require('../../../assets/images/profile.png')
      const bgColor = index % 2 === 0 ? bgOrange : ''
      return (
        <ReviewRowComponent 
        wrapperStyle={[bgColor]}
        propertyName={item.propertyName} propertyUrl={propertyUrl} address={address}
        review={item.review} profilePicture={profilePicture} reviewedOn={item.reviewedOn}
        guestName={item.guestName}
         />
      )
  }

  renderEmptyContainer = () => {
      const { emptyContainerStyle } = styles;
      const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
      const { state } = this.props.reviewsContext
      if(state.reviews.length === 0 && !state.loadingReviews) {
          return (
              <View style={{ flex: 1, paddingVertical: 60}}>
                  <View style={emptyContainerStyle}>
                      <Image source={require('../../../assets/images/photo/ratings.png')} style={imgStyle} resizeMode="contain" />
                  </View>
                  <MyText style={[textBold, textCenter, textOrange, textH4Style]}>You have no reviews</MyText>
              </View>
          )
      }
  }
  renderReviews = () => {
    const { reviews } = this.props.reviewsContext.state
    return (
        <FlatList
          
          ListEmptyComponent={this.renderEmptyContainer()}
          data={reviews}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => `RE_${i}`}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.8}
          // extraData={selectedId}
        />
    )
  }

  render() {
    const { container, contentContainer } = styles
    const { textH6Style } = GStyles
    return (
      <>
        {this.renderLoading()}
        <View style={contentContainer}>
          {this.renderReviews()}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, paddingVertical: 15, width: '100%'
    // borderWidth: 1
  },
  bgOrange: {
    backgroundColor: colors.lightOrange
  },
  contentContainer: {
      paddingTop: 210, paddingBottom:30
  },
  emptyContainerStyle: {
      height: 200, width: '100%', marginBottom: 20
  }
});

export default ReviewsComponent;
