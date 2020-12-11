import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../../../utils/Index';
import colors from '../../../../colors';

import { Icon } from 'native-base';
import ItemComponent from '../ItemComponent';

import { urls, GetRequest, errorMessage } from '../../../../utils';
import { AppContext } from '../../../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../../../helpers';

const SCREEN_HEIGHT = Dimensions.get('screen').height

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurants: [], loading: false, loadMore: false, activePage: 1, perPage: 10, pageCount: 0, totalItems: 0};
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
      more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
      const { activePage, perPage, restaurants } = this.state
      
      const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/?Size=${perPage}&Page=${activePage}`);
      console.log('Res restaurants', res)
      more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
      if(res.isError) {
        const message = res.Message;
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
        this.setState({ restaurants: data, activePage: res.data.page, totalItems: res.data.totalItems, perPage: res.data.pageSize, pageCount })
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

  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey } = GStyles
    const { restaurants } = this.state
    return (
      <>
        {this.renderLoading()}
        <View style={contentMainContainer}>
          <FlatList
              ListHeaderComponent={
                <>
                  <View style={container}>
                    <TouchableOpacity style={filterContainer} onPress={this.openModal}>
                      <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
                    </TouchableOpacity>
                    <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Food & Restaurants On Aura</MyText>
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
              keyExtractor={(item) => item.id}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
            />
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
