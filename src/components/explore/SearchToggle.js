/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import {View, TouchableOpacity, SafeAreaView, StyleSheet, Image, FlatList} from 'react-native';

import {
    MyText,
    CustomButton,
    CustomInput,
    SearchInput, Loading, Spinner
  } from '../../utils/Index';
  import GStyles from '../../assets/styles/GeneralStyles';
  import colors from '../../colors';

  import {Icon} from 'native-base';
import AutoCompleteComponent from '../explore/AutoCompleteComponent';
import { formatAmount, shortenXterLength } from '../../helpers';
import { urls, GetRequest, SCREEN_HEIGHT } from '../../utils';
import ItemComponent from './explore_all/ItemComponent';

import { AppContext } from '../../../AppProvider';



  class SearchToggle extends Component {
    constructor(props) {
      super(props);
      this.state = { active: false, places: [], totalItems: 0, activePage: 1, perPage: 10, pageCount: 0, loading: false, 
        loadMore: false, selectedLocation: '', longitude: '', latitude: '', setSearch: false };
    }
    componentDidMount = () => {
      console.log('Mounted')
    }
    // handleSearchToggle = () => {
    // this.setState({
    //     active: !this.state.active,
    // });
    // }
    // openSearch = () => {
    // this.setState({
    //     active: true,
    // });
    // }
    // closeSearch = () => {
    // this.setState({
    //     active: false,
    // });
    // }
    linkHouse = (house) => {
      this.props.navigation.navigate('Other', { screen: 'HouseSingle', params: { house } })
    }
    renderEmptyContainer = () => {
      const { emptyContainerStyle } = styles;
      const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
      const { loading, places } = this.state
      if(places.length === 0 && !loading) {
        return (
          <View>
            <View style={emptyContainerStyle}>
              <Image source={require('../../assets/images/house_searching.png')} style={imgStyle} resizeMode="contain" />
            </View>
            <MyText style={[textBold, textCenter, textOrange]}>No Property Found</MyText>
          </View>
        )
      }
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
      // console.log('Item ', item)
      const formattedAmount = formatAmount(item.pricePerNight)
      let title = item.title ? item.title : 'no title'
      title = shortenXterLength(title, 18)
      const type = item.propertyType?.name;
      return (
        <View style={{paddingHorizontal: 20}}>
          <ItemComponent title={item.title} price={`₦ ${formattedAmount} / night`} location={item.state} verified={item.isVerified}
              img={{uri:item.mainImage?.assetPath}} type={type} onPress={this.linkHouse.bind(this, item)} rating={item.rating} />
        </View>
      )
      
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 200 }} />); }
    }
    getSelectedLocation = (value) => {
      const { geometry } = value.details
      console.log('Value ', value.details)
      this.setState(()=>({ longitude: geometry.location.lng, latitude: geometry.location.lat }), ()=>{
        this.setState({ setSearch: true})
        this.getPlaces()
      })
    }

    getPlaces = async (more=false) => {
        try {
          more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
          const { activePage, perPage, places, longitude, latitude } = this.state
          
          const res = await GetRequest(urls.listingBase, 
          `${urls.v}listing/property/search/available/?longitude=${longitude}&latitude=${latitude}&Size=${perPage}&Page=${activePage}`);
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

    onEndReached = () => {
      const { pageCount, activePage, loadMore } = this.state
      if(activePage < pageCount && !loadMore) {
        this.setState(()=>({ activePage: this.state.activePage + 1}), 
        () => {
          this.getPlaces(true)
        })
      }
    }

    componentDidMount = () => {
      
    }
    render(){
        const { close } = this.props;
        const {
             search, iconStyle, SearchArea, searchGroup,
             icons, iconsArea, container
          } = styles;
          const {
            textDarkBlue,
            flexRow,
            textH5Style,
            textH6Style,
            textBold, textExtraBold, textH3Style
          } = GStyles;
        const { setSearch } = this.state
        return (
            <View style={[search, {zIndex:  200}]}>
              {this.renderLoading()}
              <View style={[flexRow, searchGroup]}>
                <TouchableOpacity onPress={close} style={iconStyle}>
                  <Icon type="MaterialIcons" name="keyboard-arrow-left" style={{fontSize: 40, marginLeft: -10}} />
                </TouchableOpacity>
                <View style={SearchArea}>
                  <AutoCompleteComponent locationDetails={this.getSelectedLocation} placeholder="Search locations" autofocus />
                  {/* <SearchInput placeholder="Where are you going?" /> */}
                </View>
              </View>
              {/* <View style={{marginTop: 20}}>
                <View style={[flexRow, iconsArea]}>
                  <View style={icons}>
                    <TouchableOpacity>
                      <Icon type="FontAwesome" name="location-arrow" style={{fontSize: 20, color: colors.white}} />
                    </TouchableOpacity>
                  </View>
                  <View >
                    <MyText style={[textH5Style, {paddingTop: 9}]}>
                      Nearby Places
                    </MyText>
                  </View>
                </View>
              </View>
              <View>
                <MyText style={textDarkBlue, textH6Style, textBold}>
                  POPULAR SEARCHES BY CITY
                </MyText>
              </View>
              <View style={{marginTop: 20}}>
                <View style={[flexRow, iconsArea]}>
                    <View style={icons}>
                      <TouchableOpacity>
                        <Icon type="Ionicons" name="location-outline" style={{fontSize: 20, color: colors.white}} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <MyText style={[textH5Style, {paddingTop: 9}]}>
                        Lagos
                      </MyText>
                    </TouchableOpacity>
                </View>
                <View style={[flexRow, iconsArea]}>
                    <View style={icons}>
                      <TouchableOpacity>
                        <Icon type="Ionicons" name="location-outline" style={{fontSize: 20, color: colors.white}} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                      <MyText style={[textH5Style, {paddingTop: 9}]}>
                        Abuja
                      </MyText>
                    </TouchableOpacity>
                </View>
                
              </View> */}

              {setSearch ? <View style={{ width: '100%'}}>
                  <FlatList
                    ListHeaderComponent={
                      <>
                        <View style={container}>
                          <MyText style={[textH3Style, textExtraBold ]}>Search Results</MyText>
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
                    data={this.state.places}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.8}
                    // extraData={selectedId}
                />
              </View> : <></>}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    search: {
      paddingTop: 50,
      // paddingHorizontal: 20,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: SCREEN_HEIGHT,
      backgroundColor: colors.white,
      // backgroundColor: colors.orange,
    },
    
    iconStyle: {
      height: 40, flex: 1, justifyContent: 'center', marginRight: 15, 
    },
    SearchArea: {
      flex: 8,
      // elevation: 5,
      // backgroundColor: colors.orange,
      // borderWidth: 0.01,
      // borderColor: colors.orange,
      // height: 43.7,
      justifyContent: 'center',
      paddingHorizontal: 4,
      // borderWidth: 1
     },
     searchGroup: {
      justifyContent: 'center', paddingHorizontal: 20,
      // flex: 1,
      marginBottom: 20,
     },
     container: {
       paddingHorizontal: 25
     },
     icons: {
       height: 36,
       width: 36,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: colors.orange,
       borderRadius: 4,
       borderWidth: 1,
       borderColor: colors.orange,
       marginRight: 10,
       marginBottom: 10,
     },
     iconsArea: {
       marginBottom: 10,
      //  justifyContent: 'center',
     },
     emptyContainerStyle: {
      height: 200, width: '100%', marginBottom: 20
    }
  });
export default SearchToggle;