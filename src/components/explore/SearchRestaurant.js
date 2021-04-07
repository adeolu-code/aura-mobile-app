/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import {View, TouchableOpacity, SafeAreaView, StyleSheet, Image, FlatList, Platform, Dimensions} from 'react-native';

import {
    MyText,
    CustomButton,
    CustomInput,
    SearchInput, Loading, Spinner
  } from '../../utils/Index';
  import GStyles from '../../assets/styles/GeneralStyles';
  import colors from '../../colors';

  import {Icon, Picker} from 'native-base';
import AutoCompleteComponent from './AutoCompleteComponent';
import { formatAmount, shortenXterLength } from '../../helpers';
import { urls, GetRequest, errorMessage } from '../../utils';
import ItemComponent from './explore_all/ItemComponent';

import { AppContext } from '../../../AppProvider';

const SCREEN_HEIGHT = Dimensions.get('screen').height

  class SearchRestaurant extends Component {
    constructor(props) {
      super(props);
      this.state = { active: false, restaurants: [], totalItems: 0, activePage: 1, perPage: 10, pageCount: 0, loading: false, 
        loadMore: false, selectedLocation: '', setSearch: false, sts: [], areas: [], gettingAreas: false,
        gettingStates: false, stateValue: '', areaValue: '' };
    }
    getStates = async () => {
      try {
        this.setState({ gettingStates: true })
        const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/operation/states`);
        console.log('Res states ', res)
        this.setState({ gettingStates: false })
        if(res.isError || res.IsError) {
          errorMessage(res.message || res.Message)
        } else {
          const obj = { name: 'Select your city', id:''}
          this.setState({ sts: [obj, ...res.data] })
        }
      } catch (error) {
        
      }
    }
    getAreas = async (state) => {
      try {
        this.setState({ gettingAreas: true })
        const res = await GetRequest(urls.restaurantBase, `${urls.v}restaurant/operation/areas/${state}`);
        this.setState({ gettingAreas: false })
        if(res.isError || res.IsError) {
          errorMessage(res.message || res.Message)
        } else {
          const obj = { name: 'Select your area', id:'null'}
          this.setState({ areas: [obj, ...res.data] })
        }
      } catch (error) {
        
      }
    }
    onStateChange = (value) => {
      this.setState({ stateValue: value })
      this.getAreas(value)
    }
    onAreaChange = (value) => {
      this.setState({ areaValue: value })
    }
    renderStatePicker = () => {
        const { sts, gettingStates } = this.state;
        const { textOrange, textH4Style, textBold } = GStyles
        if(sts.length !== 0) {
            return (<Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                selectedValue={this.state.stateValue} placeholder="Select your State"
                onValueChange={this.onStateChange}>
                {sts.map(item => {
                    return (
                        <Picker.Item label={item.name} value={item.name} key={item.id} />
                    )
                })}
            </Picker>)
        }
        if(gettingStates) {
            return (
                <View style={{paddingHorizontal: 20}}>
                    <MyText style={[textBold, textOrange, textH4Style]}>Loading...</MyText>
                </View>
            )
        }
    }
    
    renderAreaPicker = () => {
      const { areas, gettingAreas } = this.state;
      const { textOrange, textH4Style, textBold, textGrey } = GStyles
      if(gettingAreas) {
          return (
            <View style={{paddingHorizontal: 20}}>
                <MyText style={[textBold, textOrange, textH4Style]}>Loading...</MyText>
            </View>
          )
      }
      if(areas.length === 0) {
        return (
          <View style={{ width: '100%', height: '100%', opacity: 0.8, paddingHorizontal: 10, backgroundColor: colors.lightGrey, justifyContent: 'center'}}>
            <MyText style={[textH4Style, textGrey]}>Select your Area</MyText>
          </View>
        )
      }
      return (<Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
          style={{ width: Platform.OS === 'ios' ? '100%' : undefined }} placeholder="Select your city"
          selectedValue={this.state.areaValue}
          onValueChange={this.onAreaChange}>
          {areas.map(item => {
              return (
                  <Picker.Item label={item.name} value={item.id} key={item.id} />
              )
          })}
      </Picker>)
      
      
    }
    search = async () => {
      this.setState({ setSearch: true })
      this.getRestaurants()
    }

    componentDidMount = () => {
      this.getStates()
    }
    linkToFood = (restaurant) => {
      this.props.navigation.navigate('Other', { screen: 'FoodSingle', params: { restaurantId: restaurant.profileId } })
    }
    renderEmptyContainer = () => {
      const { emptyContainerStyle } = styles;
      const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
      const { loading, restaurants } = this.state
      if(restaurants.length === 0 && !loading) {
        return (
          <View>
            <View style={emptyContainerStyle}>
              <Image source={require('../../assets/images/no_food.png')} style={imgStyle} resizeMode="contain" />
            </View>
            <MyText style={[textBold, textCenter, textOrange, textH4Style]}>No Restaurants Found</MyText>
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
      let mealName = item.mealName ? item.mealName : ''
      mealName = shortenXterLength(mealName, 18)
      const imgUrl = item.assetPath ? {uri: item.assetPath} : require('../../assets/images/no_food.png')
      const price = `₦ ${formatAmount(item.price)}`
      const location = `${item.city}, ${item.state}`
      return (
        <View style={{paddingHorizontal: 20}}>
          <ItemComponent title={mealName} price={price} location={location} rating={item.rating} onPress={this.linkToFood.bind(this, item)}
            img={imgUrl} />
        </View>
      )
      
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ marginTop: 40, height: '100%', width: '100%', zIndex: 1000 }} />); }
    }

    getRestaurants = async (more=false) => {
      try {
        more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
        const { activePage, perPage, restaurants, areaValue, stateValue } = this.state
        const res = await GetRequest(urls.restaurantBase, 
          `${urls.v}restaurant/?State=${stateValue}&city=${areaValue}&Size=${perPage}&Page=${activePage}`);
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

    onEndReached = () => {
      const { pageCount, activePage, loadMore } = this.state
      if(activePage < pageCount && !loadMore) {
        this.setState(()=>({ activePage: this.state.activePage + 1}), 
        () => {
          this.getRestaurants(true)
        })
      }
    }

    
    render(){
        const { close } = this.props;
        const {
             search, iconStyle, SearchArea, searchGroup,
             icons, iconsArea, container, subStyle, subHeaderContainer
          } = styles;
          const {
            textDarkBlue,
            flexRow,
            textH5Style,
            textH6Style,
            textBold, textExtraBold, textH3Style, textGrey
          } = GStyles;
        const { setSearch, areaValue } = this.state
        return (
            <View style={[search, {zIndex:  200}]}>
              {this.renderLoading()}
              <View style={[flexRow, searchGroup]}>
                <TouchableOpacity onPress={close} style={iconStyle}>
                  <Icon type="MaterialIcons" name="keyboard-arrow-left" style={{fontSize: 40, marginLeft: -10}} />
                </TouchableOpacity>
                <View style={[flexRow, SearchArea]}>
                  <Icon name="navigate" style={{ fontSize: 22, color: colors.orange, marginRight: 15}} />
                  <MyText style={[textH3Style, textBold, textGrey]}>Delivery To</MyText>
                </View>
              </View>

              <View style={subHeaderContainer}>
                <View style={styles.picker}>
                    {this.renderStatePicker()}
                </View>
                <View style={[flexRow, subStyle]}>
                  <View style={[styles.picker, { flex: 3.5}]}>
                    {this.renderAreaPicker()}
                  </View>
                  <View style={{ flex: 1, paddingLeft: 10}}>
                    <CustomButton buttonText="Search" textStyle={{ color: colors.orange }} disabled={areaValue === 'null' || !areaValue}
                    buttonStyle={{ borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
                    onPress={this.search} />
                  </View>
                </View>
              </View>

              {setSearch ? <View style={{ width: '100%', marginTop: 20, marginBottom: 60, paddingBottom: 60 }}>
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
                    data={this.state.restaurants}
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
      paddingTop: Platform.OS === 'ios' ? 60 : 40,
      // paddingHorizontal: 20,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: SCREEN_HEIGHT,
      backgroundColor: colors.white
      // backgroundColor: colors.orange,
    },
    SearchArea: {
      flex: 6, alignItems: 'center', paddingHorizontal: 4,
    },
    searchGroup: {
      justifyContent: 'center', paddingHorizontal: 20, marginBottom: 10,
    },
    container: {
      paddingHorizontal: 25
    },
    
    subHeaderContainer: {
      paddingHorizontal: 20,
    },
    subStyle: {
      marginVertical: 12
    },
    
    iconStyle: {
      height: 40, flex: 1, justifyContent: 'center', marginRight: 15, 
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
      height: 250, width: '100%', marginBottom: 20, marginTop: 20
    },
    picker: {
        borderWidth: 1, borderRadius: 5, height: 48,
        borderColor: colors.lightGreyOne, justifyContent: 'center'
    },
  });
export default SearchRestaurant;