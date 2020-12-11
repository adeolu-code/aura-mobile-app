import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions, FlatList } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, Loading } from '../../../../utils/Index';
import colors from '../../../../colors';

import { urls, GetRequest, errorMessage } from '../../../../utils';
import { AppContext } from '../../../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../../../helpers';

import { Icon } from 'native-base';
import ItemComponent from '../ItemComponent';
const SCREEN_HEIGHT = Dimensions.get('screen').height

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { tours: [], loading: false, loadMore: false, activePage: 1, perPage: 10, pageCount: 0, totalItems: 0 };
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
      
      const res = await GetRequest(urls.experienceBase, 
        `${urls.v}experience/get/list/?status=Adminpublished&Page=${activePage}&Size=${perPage}`);
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
        {/* <TouchableOpacity style={filterContainer}>
          <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
        </TouchableOpacity>
        <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Tour Guides & Experiences On Aura</MyText>
        <View style={contentContainer}>
          <ItemComponent title="LaCampagne Tropicana" price="₦ 5,000 / person" location="Lagos" 
          img={require('../../../../assets/images/photo/pic3.png')} />
        </View> */}
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
