import React, { Component } from 'react';
import { Card, MyText, Spinner, Loading } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import FilterModal from './FilterModal';
import ManagePropertyRow from './ManagePropertyRow';

import { formatAmount, shortenXterLength } from '../../helpers';


import colors from '../../colors';
import { Icon } from 'native-base';

class HotelsTab extends Component {
  constructor(props) {
    super(props);
    this.state = { showFilterModal: false, loadMore: false, property: null, modalImg: require('../../assets/images/no_house1.png') };
  }
  openFilterModal = (item) => {
    const modalImg = item.mainImage ? item.modalImg.assetPath : require('../../assets/images/no_house1.png')
    this.setState({ modalImg, property: item, showFilterModal: true });
  }
  closeFilterModal = () => {
    this.setState({ showFilterModal: false });
  }
  renderLoading = () => {
      const { loading } = this.state;
      const { state } = this.props.propertyContext
      if (loading || state.loadingHotels) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100, elevation: 5 }} />); }
  }
  renderLoadMore = () => {
      const { loadMore } = this.state;
      const {textH4Style, textCenter, textOrange, textBold,flexRow } = GStyles
      if(loadMore) {
          return (
          <View style={[flexRow, { justifyContent: 'center', alignItems: 'center', flex: 1}]}>
              <Spinner size={20} color={colors.orange} />
              <MyText style={[textH4Style, textCenter, textOrange, textBold, { marginLeft: 10}]}>Loading....</MyText>
          </View>
          )
      }
  }
  renderItem = ({item}) => {
    const { rowContainer } = styles
    let title = item.title ? item.title : 'No title'
    title = shortenXterLength(title, 18)
    const location = `${item.address} ${item.state}`
    const imgUrl = item.mainImage ? {uri: mainImage.assetPath} : require('../../assets/images/no_house.png')
    const type = item.propertyType?.name;
    return (
        <View style={rowContainer}>
            <ManagePropertyRow title={title} img={imgUrl} openModal={this.openFilterModal.bind(this, item)} location={location} 
            status={item.status} {...this.props} propertyType={item.propertyType.name} roomType={item.roomType.name} />
        </View>
    )
    
  }
  renderHotels = () => {
      const { hotels } = this.props.propertyContext.state
      return (
          <FlatList
            ListFooterComponent={
              <>
                {this.renderLoadMore()}
              </>
            }
            ListEmptyComponent={this.renderEmptyContainer()}
            data={hotels}
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
      const { state } = this.props.propertyContext
      if(state.hotels.length === 0 && !state.loadingHotels) {
          return (
          <View style={{ flex: 1, paddingVertical: 60}}>
              <View style={emptyContainerStyle}>
                  <Image source={require('../../assets/images/house_searching.png')} style={imgStyle} resizeMode="contain" />
              </View>
              <MyText style={[textBold, textCenter, textOrange]}>You have not added any hotels</MyText>
          </View>
          )
      }
  }

  render() {
    const { contentContainer, rowContainer } = styles;
    const { property } = this.state
    return (
      <>
        {this.renderLoading()}
        <View style={contentContainer}>
            {this.renderHotels()}
            <FilterModal visible={this.state.showFilterModal} onDecline={this.closeFilterModal} img={this.state.modalImg}  
            title={property && property.title ? property.title : 'No title'} {...this.props} />
        </View>
      </>
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

export default HotelsTab;
