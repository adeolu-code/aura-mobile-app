/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MyText, Loading, CustomButton, Spinner } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import HouseComponent from './HouseComponent';
import ScrollHeader from './ScrollHeader';
import { setContext, Request, urls, GetRequest, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../helpers';

import colors from '../../colors';

class MorePlaces extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, places: [], noDot: true, first: true, currentPage: 1, pageSize: 10, pageCount: 0, totalItems: 0, loadmore: false };
    }
    linkToHouses = () => {
        this.props.navigation.navigate('ExploreAll', { tab: 'two' })
    }
    linkToHouse = (house) => {
        this.props.navigation.push('Other', { screen: 'HouseSingle', params: { house } })
    }
    
    getPlaces = async (more=false) => {
        more ? this.setState({ loadMore: true }) : this.setState({ loading: true })
        const { currentPage, pageSize, places } = this.state
        const { house } = this.props
        const res = await GetRequest(urls.listingBase, 
        `${urls.v}listing/property/closeby/?id=${house.id}&pageSize=${pageSize}&Page=${currentPage}`);
        console.log(res)
        more ? this.setState({ loadMore: false }) : this.setState({ loading: false })
        if(res.isError || res.IsError) {
            const message = res.Message;
            errorMessage(message)
        } else {
            const dataResult = res.data.data
            let data = []
            if(more) {
                data = [...places, ...dataResult]
            } else {
                data = dataResult
            }
            const pageCount =  Math.ceil(res.data.totalItems / pageSize)
            this.setState({ places: data, currentPage: res.data.page, totalItems: res.data.totalItems, pageSize: res.data.pageSize, pageCount })
            if(dataResult !== 0) {
                this.setState({ noDot: false })
            }
        }
        
    }
    onEndReached = () => {
        
        const { pageCount, currentPage, loadMore } = this.state
        // console.log('End reached ', pageCount, currentPage)
        // if(currentPage < pageCount && !loadMore) {
        //   this.setState(()=>({ currentPage: this.state.currentPage + 1}), 
        //   () => {
        //     this.getPlaces(true)
        //   })
        // }
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', paddingTop: 50 }} />); }
    }

    componentDidMount = () => {
        this.getPlaces()
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.refresh !== this.props.refresh) {
            const { location } = this.context.state;
            if(location) {
                this.getPlaces(location.longitude, location.latitude)
            }
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
        const { scrollItemContainer } = styles
        const formattedAmount = formatAmount(item.pricePerNight)
        const title = item.title ? shortenXterLength(item.title, 18) : 'No title';
        const imgUrl = item.mainImage ? { uri: item.mainImage.assetPath } : require('../../assets/images/no_house1.png')
        return (
            <View style={scrollItemContainer}>
                <HouseComponent img={imgUrl} verified={item.isVerified} title={title} location={item.state} 
                onPress={this.linkToHouse.bind(this, item)}
                price={`₦ ${formattedAmount} / night`} {...this.props} rating={item.rating} />
            </View>
        )
    }


  renderPlaces = () => {
    const { location } = this.context.state;
    const { places, loading } = this.state
    
    if(places && places.length !== 0) {
        return (
            <FlatList
                horizontal={true}
                ListFooterComponent={
                    <>
                        {this.renderLoadMore()}
                    </>
                }
                // ListEmptyComponent={this.renderEmptyContainer()}
                ListFooterComponentStyle={{ marginBottom: 60, marginRight: 80}}
                ListHeaderComponentStyle={{ marginBottom: 20, marginRight: 20}}
                data={places}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.8}
                // extraData={selectedId}
            />
        )
    }
    
  }
  renderEmptyLocation = () => {
    const { location } = this.context.state;
    const { loading } = this.state
    const { onPhoneLocation } = this.props
    const { emptyStyles, locationStyle, locationContainer } = styles;
    const { imgStyle, textOrange, textH4Style } = GStyles
    if(!location && !loading) {
        return (
            <View>
                <View style={emptyStyles}>
                    <Image source={require('../../assets/images/no_location.png')} resizeMode="contain" style={imgStyle} />
                </View>
                <View style={locationContainer}>
                    <MyText style={[textH4Style]}>Please turn on your location to get places around you</MyText>
                    <TouchableOpacity style={locationStyle} onPress={onPhoneLocation}>
                        <MyText style={[textH4Style, textOrange]}>Turn on Location</MyText>
                    </TouchableOpacity>
                </View>
            </View>
        ) 
    }
  }
  renderEmptyProperty = () => {
    const { location } = this.context.state;
    const { places, loading } = this.state
    const { emptyStyles, locationContainer } = styles;
    const { imgStyle, textOrange, textH3Style, textBold, textCenter } = GStyles
    if(places.length === 0 && !loading && location) {
        
        return (
            <View>
                <View style={[emptyStyles]}>
                    <Image source={require('../../assets/images/house_searching.png')} resizeMode="contain" style={imgStyle} />
                </View>
                <View style={[locationContainer, { marginBottom: 20}]}>
                    <MyText style={[textH3Style, textOrange, textBold, textCenter]}>No Property Found</MyText>
                </View>
            </View>
        )
    }
  }

  renderButton = () => {
    const { places, loading } = this.state;
    const { buttonStyle, buttonContainer } = styles
    if(places.length !== 0 && !loading) {
        return (
            <View style={buttonContainer}>
                <CustomButton onPress={this.linkToHouses} buttonText="View More Places" iconName="arrow-right" buttonStyle={buttonStyle} />
            </View>
        )
    }
  }
  render() {
    const { scrollContainer, scrollMainContainer, placeAroundContainer, headerStyle } = styles
    const { width } = Dimensions.get('window')

    const { textH2Style, textExtraBold} = GStyles

    const { photo } = this.props

    // const actualWidth = (20/width) * 100
    return (
        <Fragment>
            <View style={placeAroundContainer}>
                {this.renderLoading()}
                <View style={headerStyle}>
                    <MyText style={[textH2Style, textExtraBold]}>More Places To Stay</MyText>
                </View>
                <View style={scrollMainContainer}>
                    <View style={[scrollContainer ]}>
                        {this.renderPlaces()}
                    </View>
                </View>
                {this.renderEmptyLocation()}
                {this.renderEmptyProperty()}
            </View>
        </Fragment>
    );
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        // marginRight: '1.8%', 
        marginRight: 20, 
        width: 0.40 * `${width}`
    },
    // placeAroundContainer: {
    //     paddingVertical: 20,
    //     backgroundColor: colors.white, minHeight: 250
    // },
    placeAroundContainer: {
        paddingTop: 20, paddingBottom:100,
        backgroundColor: colors.white,
        borderTopWidth: 2, borderTopColor: colors.lightGrey
    },
    headerStyle: {
        marginBottom: 10, marginTop: 10, paddingHorizontal: 20
    },
    headerContainer: {
        paddingHorizontal: 20,
    },
    scrollMainContainer: {
        marginLeft: 20,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginVertical: 40,
    },
    buttonStyle: {
        backgroundColor: colors.black,
    },
    emptyStyles: {
        width: '100%', height: 200,
        marginTop: -40, marginBottom: 20
    },
    locationStyle: {
        borderWidth: 1, borderColor: colors.orange, borderRadius: 8, justifyContent: 'center', alignItems: 'center',
        padding: 12, marginTop: 20, marginBottom:30
    },
    locationContainer: {
        paddingHorizontal: 30
    }
});

export default MorePlaces;
