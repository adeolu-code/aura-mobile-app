/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MyText, Loading, CustomButton } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import HouseComponent from './HouseComponent';
import ScrollHeader from './ScrollHeader';
import { setContext, Request, urls, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { formatAmount, shortenXterLength } from '../../helpers';

import colors from '../../colors';

class MoreListings extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, places: [], noDot: true, first: true, showModal: false };
    }
    linkToHouses = () => {
        this.props.navigation.navigate('ExploreAll', { tab: 'two' });
    }
    linkToHouse = (house) => {
        this.props.navigateToHouse.closeHostDetailsModal();
        this.props.navigation.push('Other', { screen: 'HouseSingle', params: { house } })
    }

    getPlaces = async () => {
        this.setState({ loading: true })
        const { house } = this.props;
        const res = await GetRequest(urls.listingBase,
        `${urls.v}listing/property/search/available/?userid=${house.hostId}`);
        console.log('More Listings ', res)
        this.setState({ loading: false })
        if(res.isError) {
            const message = res.Message;
        } else {
            this.setState({ places: res.data.data })
            if (res.data.data.length !== 0) {
                this.setState({ noDot: false })
            }
        }
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


  renderPlaces = () => {
    const { location } = this.context.state;
    const { places, loading } = this.state
    const { scrollItemContainer, emptyStyles, locationContainer } = styles;
     const {navigateToHouse} = this.props;
    
    
    if (places.length !== 0) {
        return (
            places.map((item, i) => {
                const formattedAmount = formatAmount(item.pricePerNight)
                const title = shortenXterLength(item.title, 18)
                return (
                    <View style={scrollItemContainer} key={item.id}>
                        <HouseComponent img={{uri: item.mainImage.assetPath}} onPress={ this.linkToHouse.bind(this, item)}
                        title={title} location={item.state} price={`₦ ${formattedAmount}/ night`} {...this.props} />
                    </View>
                )
            })
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
                    <MyText style={[textH4Style]}>Please turn on your location to get more listings</MyText>
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
                <CustomButton onPress={this.linkToHouses} buttonText="View More Listings" iconName="arrow-right" buttonStyle={buttonStyle} />
            </View>
        )
    }
  }
  render() {
    const { scrollContainer, scrollMainContainer, placeAroundContainer, headerStyle } = styles;
    const { width } = Dimensions.get('window')

    const { textH2Style, textExtraBold, textDarkBlue} = GStyles;

    const { photo } = this.props;

    // const actualWidth = (20/width) * 100
    return (
        <Fragment>
            <View style={placeAroundContainer}>
                {this.renderLoading()}
                <View style={headerStyle}>
                    <MyText style={[textExtraBold, textH2Style, textDarkBlue, {marginTop: 23}]}>More Listings By Host</MyText>
                </View>
                <View style={scrollMainContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
                        <View style={[scrollContainer, { width: '100%' }]}>
                            {this.renderPlaces()}
                        </View>
                    </ScrollView>
                </View>
                {this.renderEmptyLocation()}
                {this.renderEmptyProperty()}
            </View>
        </Fragment>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '21.5%'
    },
    placeAroundContainer: {
        paddingTop: 20, paddingBottom:50,
        backgroundColor: colors.white,
        borderTopWidth: 2, borderTopColor: colors.lightGrey
    },
    headerStyle: {
        marginBottom: 10, paddingHorizontal: 20
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

export default MoreListings;
