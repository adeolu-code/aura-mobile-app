/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Card, MyText, Spinner, Loading } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
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
        const { state } = this.props.reservationsContext;
        if (loading || state.loadingReservations) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
    }
    renderLoadMore = () => {
        const { state } = this.props.reservationsContext;
        const {textH4Style, textCenter, textOrange, textBold,flexRow } = GStyles;
        if (state.loadMoreReservations) {
            return (
              <View style={[flexRow, { justifyContent: 'center', alignItems: 'center', flex: 1}]}>
                  <Spinner size={20} color={colors.orange} />
                  <MyText style={[textH4Style, textCenter, textOrange, textBold, { marginLeft: 10}]}>Loading....</MyText>
              </View>
            )
        }
    }
    linkToReserve = (reservation) => {
      this.props.navigation.navigate('HomeDetails', { propertyId: reservation.propertyId } )
    }
    onEndReached = () => {
        // const { set, state, getRecentReservations } = this.props.reservationsContext;
        // if (state.reservationsPage < state.pageRecentCount && !state.loadMoreReservations) {
        //   set({ reservationsPage: state.reservationsPage + 1 });
        //   getRecentReservations(true);
        // }
        // console.log('End reached')
      }
    renderItem = ({item}) => {
      const { rowContainer } = styles;
      let title = item.title ? item.title : 'No title';
      title = shortenXterLength(title, 18)
      const imgUrl = item.propertyImage ? {uri: item.propertyImage} : require('../../assets/images/no_house1.png')
      const reserve = `${item.reservations} reservation(s)`
      const payment = item.payment ? formatAmount(item.payment) : 0.00
        return (
            <View style={rowContainer}>
                <ReservationMainRow title={title} img={imgUrl} {...this.props} propertyType={item.propertyType} reserve={reserve} 
                payment={payment} onPress={this.linkToReserve.bind(this, item)} />
            </View>
        )
       }

    renderRecentReservations = () => {
        const { reservations } = this.props.reservationsContext.state;
        return (
            <FlatList
              // ListFooterComponent={
              //   <>
              //     {this.renderLoadMore()}
              //   </>
              // }
              ListEmptyComponent={this.renderEmptyContainer()}
              data={reservations}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.propertyId}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
            />
        )
    }
  
    renderEmptyContainer = () => {
        const { emptyContainerStyle } = styles;
        const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
        const { state } = this.props.reservationsContext;
        if(state.reservations.length === 0 && !state.loadingReservations) {
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
      );
    }
  }
  
  const styles = StyleSheet.create({
      contentContainer: {
        paddingTop: Platform.OS === 'ios' ? 220 : 250, paddingHorizontal: 20, paddingBottom:30,
      },
      rowContainer: {
          marginBottom: 20, paddingHorizontal:2, paddingVertical: 2
      },
      emptyContainerStyle: {
          height: 200, width: '100%', marginBottom: 20
      }
  });
  
  export default RecentReservationsTab;
  