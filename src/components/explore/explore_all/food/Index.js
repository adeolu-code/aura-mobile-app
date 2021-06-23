import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, Loading, CustomInput, CustomButton, Spinner } from '../../../../utils/Index';
import colors from '../../../../colors';

import { Icon } from 'native-base';
import ItemComponent from '../ItemComponent';

import { urls, GetRequest, errorMessage } from '../../../../utils';
import { AppContext } from '../../../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../../../helpers';

import FilterModal from './FilterModal';

const SCREEN_HEIGHT = Dimensions.get('screen').height

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [], loading: false, loadMore: false, activePage: 1, perPage: 10, pageCount: 0, totalItems: 0, 
      showModal: false, filter: '', filterUrl: '', refreshing: false};
  }
  openModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }
  componentDidMount = () => {
    this.getRestaurants()
  }
  linkToFood = (restaurant) => {
    this.props.navigation.navigate('Other', { screen: 'FoodSingle', params: { restaurantId: restaurant.profileId } })
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 100 }} />); }
  }
  onEndReached = () => {
    const { pageCount, activePage, loadMore } = this.state
    if(activePage < pageCount && !loadMore) {
      this.setState(()=>({ activePage: this.state.activePage + 1}), 
      () => {
        this.getRestaurants(true)
      })
    }
    console.log('End reached')
  }
  getRestaurants = async (more=false) => {
    try {
      more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
      const { activePage, perPage, restaurants, filterUrl } = this.state
      let queryUrl = ''
      if(filterUrl) {
        queryUrl = `${filterUrl}&`
      }
      const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/?${queryUrl}Size=${perPage}&Page=${activePage}`);
      console.log('Res restaurants', res)
      more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
      if(res.isError || res.IsError) {
        const message = res.Message || res.message;
        errorMessage(message)
      } else {
        const dataResult = res.data.items
        let data = []
        if(more) {
          data = [...restaurants, ...dataResult]
        } else {
          data = dataResult
        }
        const pageCount =  Math.ceil(res.data.totalItems / perPage)
        this.setState({ restaurants: data, activePage: res.data.page, totalItems: res.data.totalItems, perPage: res.data.size, pageCount })
      }
    } catch (error) {
      
    }
  }
  renderItem = ({item}) => {
    let mealName = item.mealName ? item.mealName : ''
    mealName = shortenXterLength(mealName, 18)
    const imgUrl = item.assetPath ? {uri: item.assetPath} : require('../../../../assets/images/no_food.png')
    const price = `₦ ${formatAmount(item.price)}`
    const location = `${item.city}, ${item.state}`
    return (
      <View style={{paddingHorizontal: 20}}>
        <ItemComponent title={mealName} price={price} location={location} rating={item.rating} onPress={this.linkToFood.bind(this, item)}
          img={imgUrl} />
      </View>
    )
    
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
  renderEmptyContainer = () => {
    const { emptyContainerStyle } = styles;
    const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
    const { loading, restaurants } = this.state
    if(restaurants.length === 0 && !loading) {
      return (
        <View>
          <View style={emptyContainerStyle}>
            <Image source={require('../../../../assets/images/no_food.png')} style={imgStyle} resizeMode="contain" />
          </View>
          <MyText style={[textBold, textCenter, textH4Style, textOrange]}>No Restaurants found</MyText>
        </View>
      )
    }
  }
  onRefresh = () => {
    this.setState({ filterUrl: ''})
    this.getRestaurants();
  }
  applyFilter = (value) => {
    this.setFilterValues(value)
  }
  clearFilter = () => {
    const { filterUrl } = this.state
    if(filterUrl) {
      this.setState(() => ({ filterUrl: '', filter: '', activePage: 1 }), () => {
        this.getRestaurants()
      })
    }
  }
  setFilterValues = (value) => {
    const { cuisinesValues, location } = value
    const filter = {
      filters: cuisinesValues.join(), 
      state: location
    }
    this.setState(() => ({ filter }), () => {
      const url = this.createUrl()
      this.setState(() => ({ filterUrl: url }), () => {
        this.getRestaurants()
      })
    })
  }

  createUrl = () => {
    const { filter } = this.state
    let url = ''
    const keys = Object.keys(filter)
    keys.filter((item) => {
      
      const values = filter[item].toString()
      if(values.length !== 0 && values !== "0") {
        const string = `${item}=${values}`;
        url += `${string}&`
      }
    })
    if(url.endsWith('&')) {
      url = url.slice(0, -1)
    }
    return url
  }

  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey, flexRow, textBlackClose } = GStyles
    const { restaurants } = this.state
    return (
      <>
        {this.renderLoading()}
        <View style={contentMainContainer}>
          <FlatList
              refreshControl={
                <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.loading}
                colors={[colors.orange, colors.success]} progressBackgroundColor={colors.white} />
              }
              ListHeaderComponent={
                <>
                  <View style={container}>
                    <TouchableOpacity style={filterContainer} onPress={this.openModal}>
                      <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
                    </TouchableOpacity>
                    <MyText style={[textH3Style, textExtraBold, textBlackClose, { marginTop:30}]}>Explore Restaurants</MyText>
                  </View>
                </>
              }
              ListFooterComponent={
                <>
                  {this.renderLoadMore()}
                </>
              }
              ListEmptyComponent={this.renderEmptyContainer()}
              ListFooterComponentStyle={{ marginBottom: 40}}
              ListHeaderComponentStyle={{ marginBottom: 20}}
              data={restaurants}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `FOOD_${index}`}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
            />
            <FilterModal visible={this.state.showModal} onDecline={this.closeModal} filter={this.applyFilter} clearFilter={this.clearFilter} />
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, 
    // borderWidth: 1
  },
  contentContainer: {
    paddingVertical: 30
  },
  filterContainer: {
    borderRadius: 30, borderWidth:1, borderColor: colors.darkGrey, paddingHorizontal: 20, paddingTop: 4, paddingBottom:6, 
    flexDirection: 'row', alignSelf: 'flex-start', marginTop: 20
  },
  contentMainContainer: {
      marginTop:180,
  },
  
  emptyContainerStyle: {
    height: 250, width: '100%', marginBottom: 20
  }
});

export default Index;
