import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, Loading } from '../../../utils/Index';
import colors from '../../../colors';

import RatingsRowComponent from './RatingsRowComponent';
import { shortenXterLength } from '../../../helpers'


class RatingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderLoading = () => {
      const { state } = this.props.reviewsContext
      if (state.loadingRatings) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100, elevation: 5 }} />); }
  }
  renderItem = ({item}) => {
      const { rowContainer } = styles
      let propertyName = item.propertyName ? item.propertyName : 'No title'
      propertyName = shortenXterLength(propertyName, 18)
      const address = `${item.address} ${item.district}`
      const propertyUrl = item.propertyMainImage ? {uri: item.propertyMainImage} : require('../../../assets/images/no_house1.png')
      const profilePicture = item.profilePicture ? {uri: item.profilePicture} : require('../../../assets/images/profile.png')
      return (
        <RatingsRowComponent
        propertyName={propertyName} propertyUrl={propertyUrl} address={address}
        review={item.review} profilePicture={profilePicture} reviewedOn={item.reviewedOn}
        guestName={item.guestName} rating={item.rating} />
      )
  }
  renderEmptyContainer = () => {
      const { emptyContainerStyle } = styles;
      const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
      const { state } = this.props.reviewsContext
      if(state.ratings.length === 0 && !state.loadingRatings) {
          return (
              <View style={{ flex: 1, paddingVertical: 60}}>
                  <View style={emptyContainerStyle}>
                      <Image source={require('../../../assets/images/photo/ratings.png')} style={imgStyle} resizeMode="contain" />
                  </View>
                  <MyText style={[textBold, textCenter, textOrange, textH4Style]}>You have no ratings</MyText>
              </View>
          )
      }
  }
  renderReviews = () => {
    const { ratings } = this.props.reviewsContext.state
    return (
        <FlatList
          
          ListEmptyComponent={this.renderEmptyContainer()}
          data={ratings}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => `RA_${i}`}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.8}
          // extraData={selectedId}
        />
    )
  }

  render() {
    const { container, contentContainer } = styles
    return (
      <>
        {this.renderLoading()}
        <View style={contentContainer}>
          {this.renderReviews()}
          {/* <RatingsRowComponent />
          <RatingsRowComponent /> */}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
      paddingTop: 210, paddingBottom:30
  },
  emptyContainerStyle: {
      height: 200, width: '100%', marginBottom: 20
  }
});

export default RatingsComponent;
