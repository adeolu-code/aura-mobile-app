import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList, RefreshControl } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, Loading, Spinner } from '../../../../utils/Index';
import colors from '../../../../colors';

import { Icon } from 'native-base';
import ItemComponent from '../ItemComponent';
import FilterModal from './FilterModal';
import { urls, GetRequest } from '../../../../utils';
import { AppContext } from '../../../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../../../helpers';
import moment from 'moment';

import ExploreLocation from '../ExploreLocation';



class Index extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showModal: false, places: [], totalItems: 0, activePage: 1, perPage: 10, pageCount: 0, loading: false, loadMore: false,
      selectedLocation: '', filter: {
        ammenities: '', 
        PropertyTypeId: '', 
        NoofBathrooms: '', 
        NoofBedroom: '', 
        NoofAvailableRooms: '', 
        minPrice: '', 
        maxPrice: '', 
        isVerified: ''
      },
      filterUrl: '', refreshing: false
    };
  }
  openModal = () => {
    this.setState({ showModal: true })
  }
  closeModal = () => {
    this.setState({ showModal: false })
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
  }

  getPlaces = async (more=false) => {
    try {
      more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
      const { activePage, perPage, places, selectedLocation, filterUrl } = this.state
      console.log('active page ', activePage)
      let queryUrl = ''
      if(filterUrl) {
        queryUrl = `${filterUrl}&`
        if(selectedLocation) {
          queryUrl = `${filterUrl}&State=${this.state.selectedLocation}&`
        }
      } else {
        if(selectedLocation) {
          queryUrl = `state=${selectedLocation}&`
        }
      }
      console.log('FilterUrl ', filterUrl, 'queryUrl ', queryUrl)
      const res = await GetRequest(urls.listingBase, 
      `${urls.v}listing/property/search/available/?${queryUrl}Size=${perPage}&Page=${activePage}`);
      console.log('Res places', res)
      more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
      if(res.isError) {
        const message = res.Message;
      } else {
        const dataResult = res.data.data
        let data = []
        if(more) {
          data = [...places, ...dataResult]
        } else {
          data = dataResult
        }
        const pageCount =  Math.ceil(res.data.totalItems / perPage)
        this.setState({ places: data, activePage: res.data.page, totalItems: res.data.totalItems, perPage: res.data.pageSize, pageCount })
      }
    } catch (error) {
      
    }
  }
  linkHouse = (house) => {
    this.props.navigation.navigate('Other', { screen: 'HouseSingle', params: { house } })
  }
  onEndReached = () => {
    const { pageCount, activePage, loadMore } = this.state
    if(activePage < pageCount && !loadMore) {
      this.setState(()=>({ activePage: this.state.activePage + 1}), 
      () => {
        this.getPlaces(true)
      })
    }
    console.log('End reached')
  }

  componentDidMount = () => {
    this.getPlaces()
  }
  renderItem = ({item}) => {
    // console.log('Item ', item)
    const discount = this.getDiscountPercent(item)
    const formattedAmount = discount ? formatAmount(item.pricePerNight * ((100 - discount.discountValue)/100)) : formatAmount(item.pricePerNight)
    const originalAmount = discount ? `₦ ${formatAmount(item.pricePerNight)}` : ''
    const percentOff = discount ? discount.discountValue : ''
    let title = item.title ? item.title : 'no title'
    title = shortenXterLength(title, 18)
    const type = item.propertyType?.name;
    const imgUrl = item.mainImage ? {uri:item.mainImage.assetPath} : require('../../../../assets/images/no_house1.png')
    
    return (
      <View style={{paddingHorizontal: 20}}>
        <ItemComponent title={item.title} price={`₦ ${formattedAmount} / night`} location={item.state} verified={item.isVerified}
            img={imgUrl} type={type} onPress={this.linkHouse.bind(this, item)} rating={item.rating} propertyId={item.propertyId}
            originalAmount={originalAmount} percentOff={percentOff} />
      </View>
    )
  }
  getDiscountPercent = (item) => {
    if(item.pricings) {
      const discount = item.pricings.find(x => {
        const endDate = moment(`${x.discountEndDate} ${x.discountEndTime}`, 'YYYY-MM-DD HH:mm:ss');
        const startDate = moment(`${x.discountStartDate} ${x.discountStartTime}`, 'YYYY-MM-DD HH:mm:ss');
        if(moment().isBetween(startDate, endDate)){
          return x
        }
      })
      if(discount) {
        return discount
      }
      // console.log('Discount ', discount)
    }
    return ''
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
  
  selectState = (value) => {
    this.setState(() => ({ selectedLocation: value, activePage: 1 }), () => {
      this.getPlaces()
    })
  }
  removeState = () => {
    this.setState(() => ({ selectedLocation: '', activePage: 1}), () => {
      this.getPlaces()
    } )
  }

  renderEmptyContainer = () => {
    const { emptyContainerStyle } = styles;
    const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
    const { loading, places } = this.state
    if(places.length === 0 && !loading) {
      return (
        <View>
          <View style={emptyContainerStyle}>
            <Image source={require('../../../../assets/images/house_searching.png')} style={imgStyle} resizeMode="contain" />
          </View>
          <MyText style={[textBold, textCenter, textOrange]}>No Property Found</MyText>
        </View>
      )
    }
  }

  applyFilter = (value) => {
    this.setState(() => ({ activePage: 1}), () => {
      this.setFilterValues(value)
    })
  }
  setFilterValues = (value) => {
    const { amenitiesValues, houseTypeValues, NoofBathrooms, NoofBedroom, NoofAvailableRooms, minPrice, maxPrice, isVerified } = value
    const filter = {
      ammenities: amenitiesValues.join(), 
      PropertyTypeId: houseTypeValues.join(), 
      NoofBathrooms, NoofBedroom, NoofAvailableRooms, minPrice, maxPrice,isVerified
    }
    this.setState(() => ({ filter }), () => {
      const url = this.createUrl()
      this.setState(() => ({ filterUrl: url }), () => {
        this.getPlaces()
      })
    })
  }
  createUrl = () => {
    const { filter, selectedLocation } = this.state
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
    const obj = {
      ammenities: '', 
      PropertyTypeId: '', 
      NoofBathrooms: '', 
      NoofBedroom: '', 
      NoofAvailableRooms: '', 
      minPrice: '', 
      maxPrice: '', 
      isVerified: ''
    }
    if(filterUrl) {
      this.setState(() => ({ filterUrl: '', filter: obj, activePage: 1 }), () => {
        this.getPlaces()
      })
    }
  }
  onRefresh = () => {
    this.setState(() => ({ filterUrl: '', activePage: 1}), ()=>{
      this.getPlaces();
    })
    
  }

  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey, textCenter, textOrange } = GStyles;
    const { places } = this.state
    return (
      <Fragment>
        <View style={contentMainContainer}>
          {this.renderLoading()}
          
            <FlatList
              refreshControl={
                <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing}
                colors={[colors.orange, colors.success]} progressBackgroundColor={colors.white} />
              }
              ListHeaderComponent={
                <>
                  <ExploreLocation onSelectState={this.selectState} onRemoveState={this.removeState} {...this.props} />
                  <View style={container}>
                    <TouchableOpacity style={filterContainer} onPress={this.openModal}>
                      <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
                    </TouchableOpacity>
                    <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Homes & Hotels On Aura</MyText>
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
              data={places}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={0.8}
              // extraData={selectedId}
            />
            <FilterModal visible={this.state.showModal} onDecline={this.closeModal} filter={this.applyFilter} clearFilter={this.clearFilter} />
        </View>
        {/* <View style={contentMainContainer}>
          <ExploreLocation />
          <View style={container}>
            
            <TouchableOpacity style={filterContainer} onPress={this.openModal}>
              <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
            </TouchableOpacity>
            <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Homes & Hotels On Aura</MyText>
            <View style={contentContainer}>
              <FlatList
                LisHeaderComponent={
                  <>
                    <ExploreLocation />
                    <TouchableOpacity style={filterContainer} onPress={this.openModal}>
                      <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
                    </TouchableOpacity>
                    <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Homes & Hotels On Aura</MyText>
                  </>
                }
                data={places}
                renderItem={this.renderItem}
                // keyExtractor={(item) => item.id}
                // extraData={selectedId}
              />
            </View>
            <FilterModal visible={this.state.showModal} onDecline={this.closeModal} />
          </View>
        </View> */}
      </Fragment>
    );
  }
}


const styles = StyleSheet.create({
  contentMainContainer: {
      marginTop:180,
  },
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
  emptyContainerStyle: {
    height: 200, width: '100%', marginBottom: 20
  }
});

export default Index;
