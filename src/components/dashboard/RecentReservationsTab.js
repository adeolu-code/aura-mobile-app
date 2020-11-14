/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Card, MyText, Spinner, Loading } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { formatAmount, shortenXterLength } from '../../helpers';

import ReservationMainRow from './ReservationMainRow';

import colors from '../../colors';
import { Icon } from 'native-base';

class RecentReservationsTab extends Component {
    constructor(props) {
      super(props);
      this.state = {  loadMore: false };
    }
    renderLoading = () => {
        const { loading } = this.state;
        const { state } = this.props.propertyContext;
        if (loading || state.loadingRecentReservations) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100, elevation: 5 }} />); }
    }
    renderLoadMore = () => {
        const { state } = this.props.propertyContext;
        console.log(state)
        const {textH4Style, textCenter, textOrange, textBold,flexRow } = GStyles;
        if (state.loadMoreRecent) {
            return (
            <View style={[flexRow, { justifyContent: 'center', alignItems: 'center', flex: 1}]}>
                <Spinner size={20} color={colors.orange} />
                <MyText style={[textH4Style, textCenter, textOrange, textBold, { marginLeft: 10}]}>Loading....</MyText>
            </View>
            )
        }
    }
    onEndReached = () => {
        const { set, state, getRecentReservations } = this.props.propertyContext;
        if (state.activeRecentReservationsPage < state.pageRecentCount && !state.loadMoreRecent) {
          set({ activeRecentReservationsPage: state.activeRecentReservationsPage + 1 });
          getRecentReservations(true);
        }
        // console.log('End reached')
      }
    renderItem = ({item}) => {
      const { rowContainer } = styles;
      let title = item.title ? item.title : 'No title';
      title = shortenXterLength(title, 18)
      const location = `${item.address} ${item.state}`;
      const imgUrl = item.mainImage ? {uri: item.mainImage.assetPath} : require('../../assets/images/no_house.png')
    //   const type = item.propertyType?.name;
      return (
          <View style={rowContainer}>
              <ReservationMainRow title={title} img={imgUrl}  location={location} 
               {...this.props} propertyType={item.propertyType.name} roomType={item.roomType.name} />
          </View>
      )
       }

    renderRecentReservations = () => {
        const { recentReservations } = this.props.propertyContext.state;
        return (
            <FlatList
              ListFooterComponent={
                <>
                  {this.renderLoadMore()}
                </>
              }
              ListEmptyComponent={this.renderEmptyContainer()}
              data={recentReservations}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
            />
        )
    }
  
    renderEmptyContainer = () => {
        const { emptyContainerStyle } = styles;
        const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
        const { state } = this.props.propertyContext;
        if(state.recentReservations.length === 0 && !state.loadingRecentReservations) {
            return (
            <View style={{ flex: 1, paddingVertical: 60}}>
                <View style={emptyContainerStyle}>
                    <Image source={require('../../assets/images/house_searching.png')} style={imgStyle} resizeMode="contain" />
                </View>
                <MyText style={[textBold, textCenter, textOrange]}>No Recent Reservations Yet</MyText>
            </View>
            )
        }
    }
  
    render() {
      const { contentContainer, rowContainer } = styles;
      return (
        <>
          {this.renderLoading()}
          <View style={contentContainer}>
              {this.renderRecentReservations()}
          </View>
        </>
        // <View style={rowContainer}>
        //     <ReservationMainRow title="Paradise Havens Suites" img={require('../../assets/images/places/bed2.png')}
        //     location="Transcorp Hilton Abuja" reserve="5 Active Reservations" {...this.props} />
        // </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
      contentContainer: {
          paddingTop: 210, paddingHorizontal: 20, paddingBottom:30,
      },
      rowContainer: {
          marginBottom: 20,
      },
      emptyContainerStyle: {
          height: 200, width: '100%', marginBottom: 20
      }
  });
  
  export default RecentReservationsTab;
  