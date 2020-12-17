import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList, RefreshControl } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../../../utils/Index';
import colors from '../../../../colors';

import { urls, GetRequest, errorMessage } from '../../../../utils';
import { AppContext } from '../../../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../../../helpers';
import FilterModal from './FilterModal';


import { Icon } from 'native-base';
import ItemComponent from '../ItemComponent';
const SCREEN_HEIGHT = Dimensions.get('screen').height

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { tours: [], loading: false, loadMore: false, activePage: 1, perPage: 10, pageCount: 0, totalItems: 0, 
      showModal: false, filterUrl: '', filter: '', refreshing: false };
  }
  openModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 100 }} />); }
  }
  linkToTour = (tour) => {
    this.props.navigation.navigate('Other', { screen: 'TourSingle', params: { tourId: tour.id } })
  }
  
  getTours = async (more=false) => {
      more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
      const { activePage, perPage, tours } = this.state
      const { filterUrl } = this.state
      let queryUrl = ''
      if(filterUrl) {
        queryUrl = `${filterUrl}&`
      }
      const res = await GetRequest(urls.experienceBase, 
        `${urls.v}experience/get/list/?${queryUrl}Page=${activePage}&Size=${perPage}`);
      console.log('Res tours', res)
      more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
      if(res.isError) {
        const message = res.Message;
        errorMessage(message)
      } else {
        const dataResult = res.data.data
        let data = []
        if(more) {
          data = [...tours, ...dataResult]
        } else {
          data = dataResult
        }
        const pageCount =  Math.ceil(res.data.totalItems / perPage)
        this.setState({ tours: data, activePage: res.data.page, totalItems: res.data.totalItems, perPage: res.data.pageSize, pageCount })
      }
  }
  renderItem = ({item}) => {
    let title = item.title ? item.title : ''
    title = shortenXterLength(title, 35)
    const imgUrl = item.mainImage ? {uri: item.mainImage.assetPath} : require('../../../../assets/images/no_tour.png')
    const price = `₦ ${formatAmount(item.pricePerGuest)}`
    const location = `${item.meetUpCity}, ${item.meetUpState}`
    return (
      <View style={{paddingHorizontal: 20}}>
        <ItemComponent title={title} price={price} location={location} rating={item.rating} onPress={this.linkToTour.bind(this, item)}
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
  onEndReached = () => {
    const { pageCount, activePage, loadMore } = this.state
    if(activePage < pageCount && !loadMore) {
      this.setState(()=>({ activePage: this.state.activePage + 1}), 
      () => {
        this.getTours(true)
      })
    }
    console.log('End reached')
  }

  renderEmptyContainer = () => {
    const { emptyContainerStyle } = styles;
    const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
    const { loading, tours } = this.state
    if(tours.length === 0 && !loading) {
      return (
        <View>
          <View style={emptyContainerStyle}>
            <Image source={require('../../../../assets/images/no_tour.png')} style={imgStyle} resizeMode="contain" />
          </View>
          <MyText style={[textBold, textCenter, textH4Style, textOrange]}>No Tours/Experience found</MyText>
        </View>
      )
    }
  }
  applyFilter = (value) => {
    this.setFilterValues(value)
  }
  setFilterValues = (value) => {
    const { pricePerGuest, location } = value
    const filter = {
      pricePerGuest, state: location
    }
    this.setState(() => ({ filter }), () => {
      const url = this.createUrl()
      this.setState(() => ({ filterUrl: url }), () => {
        this.getTours()
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
  clearFilter = () => {
    const { filterUrl } = this.state
    if(filterUrl) {
      this.setState(() => ({ filterUrl: '', filter: '', activePage: 1 }), () => {
        this.getTours()
      })
    }
  }
  onRefresh = () => {
    this.setState({ filterUrl: ''})
    this.getTours();
  }

  componentDidMount = () => {
    this.getTours()
  }

  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey } = GStyles
    const { tours } = this.state
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
                    <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Tour Guides & Experiences On Aura</MyText>
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
              data={tours}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
          />
        </View>
        <FilterModal visible={this.state.showModal} onDecline={this.closeModal} filter={this.applyFilter} clearFilter={this.clearFilter} />
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
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
