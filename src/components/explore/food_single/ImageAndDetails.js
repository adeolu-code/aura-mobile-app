/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import Swiper from 'react-native-swiper'

import { MyText, Loading } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';
import CustomSwiper from '../../CustomSwiper';


import StarComponent from '../../StarComponent';
import moment from 'moment';
import { SCREEN_HEIGHT } from '../../../utils'


class ImageAndDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { currentIndex: 1, loadingPhotos: false };
    }
    componentDidUpdate = (prevProps, prevState) => {
            
        if(prevProps.loading !== this.props.loading) {
            this.setState({ loadingPhotos: this.props.loading})
        }
    }
    indexChange = (index) => {
        // console.log('Index ', index)
        this.setState({ currentIndex: index + 1})
    }
    renderPhotoLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', elevation:4 }} />); }
    }
    renderImages = () => {
        const { imgContainer, overlayStyles } = styles
        const { imgStyle } = GStyles
        const { photos } = this.props
        return photos.map((item, index) => {
            const url = item.assetPath ? { uri: item.assetPath } : require('../../../assets/images/no_food.png')
            return (
                <View style={{flex: 1, borderRadius: 10, overflow: 'hidden' }} key={index}>
                    <Image source={url} style={imgStyle} resizeMode="cover" />
                    <View style={overlayStyles}></View>
                </View>
            )
        })
    }
    renderVerified = () => {
        const { restaurant } = this.props;
        const { flexRow, textWhite, textH3Style } = GStyles;
        const { verifyContainer, verifiedStyle, iconVerifiedContainer } = styles
        if(restaurant && restaurant.isVerified) {
            return (
                <View style={[flexRow, verifyContainer]}>
                    <MyText style={[textWhite, textH3Style, { marginRight: 5}]}>Verified</MyText>
                    <View style={iconVerifiedContainer}>
                        <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                    </View>
                </View>
            )
        }
    }
    renderProfileVerified = () => {
        const { house } = this.props
        const { iconVerifiedContainer, verifiedStyle } = styles
        if(house.isVerified) {
            return (
                <View style={{ position: 'absolute', right: 0, top: -5}}>
                    <View style={iconVerifiedContainer}>
                        <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                    </View>
                </View>
            )
        }
    }

  render() {
    const { headerStyle, shareStyle, shareContainer, iconStyle, starContainer, imgContainer, contentContainer,
        overlayStyles, iconVerifiedContainer, verifiedStyle, countContainer, divider, thumbContainer, thumbTxtContainer, 
        thumbStyle, cContainer, verifyContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textLgStyle, textH5Style, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textSuccess, textH6Style, textDarkGrey, textBlackClose } = GStyles
    const { currentIndex } = this.state
    const { time, restaurant, title, loading, photos } = this.props;
    let rating
    if(restaurant.rating > 5) {
        rating = restaurant.rating/10 * 5
    } else {
        rating = restaurant.rating
    }
    const restaurantPhotos = photos.map(item => {
        return item.assetPath ? { uri: item.assetPath } : require('../../../assets/images/no_food.png')
        // if(item.assetPath) {
        //     return 
        // } 
    })

    // const imgUrl = restaurant.hostPicture ? { uri: restaurant.hostPicture } : require('../../../assets/images/profile.png')
    return (
        <View>
            <View style={[flexRow, headerStyle]}>
                <View style={{flex: 6 }}>
                    <MyText style={[textExtraBold, textLgStyle, textBlackClose]}>{restaurant ? restaurant.name : ''}</MyText>
                    <View style={starContainer}>
                        <StarComponent style={iconStyle} grey rating={restaurant ? rating : 0} />
                    </View>
                    <MyText style={[textH4Style, textGrey]}>
                        {restaurant && restaurant.locations ? `${restaurant.locations[0].city}, ${restaurant.locations[0].state}` : '**'}
                    </MyText>
                    {restaurant ? <MyText style={[textGrey, { paddingVertical: 8}]}>
                        <MyText style={[textSuccess, textExtraBold, textH5Style]}>Open</MyText> · <MyText style={[textH6Style]}>{moment(restaurant.openTime, "hh:mm:ss").format('hh:mm a')} - {moment(restaurant.closeTime, "hh:mm:ss").format('hh:mm a')}</MyText>
                    </MyText>:<Fragment></Fragment>}
                </View>
                <View style={{flex: 1,alignItems: 'flex-end' }}>
                    {/* <TouchableOpacity style={shareContainer}>
                        <Icon name="share-social" style={shareStyle} />
                    </TouchableOpacity> */}
                </View>
            </View>

            <View style={contentContainer}>
                
                <View style={imgContainer}>
                    {!loading && photos.length !== 0 ?<CustomSwiper slides={restaurantPhotos} /> : <Loading wrapperStyles={{ height: '100%', width: '100%', elevation:4 }} />}
                    {/* {!loading && photos.length !== 0 ?<Swiper autoplay={true} style={{height: '100%'}} showsButtons={false} index={0} activeDotColor={colors.lightGrey} 
                    showsPagination={false} onIndexChanged={(index) => {this.indexChange(index)}} pagingEnabled={true} >
                        {this.renderImages()}
                    </Swiper> : <Loading wrapperStyles={{ height: '100%', width: '100%', elevation:4 }} />} */}

                    {this.renderVerified()}
                    
                    {/* <View style={cContainer}>
                        <View style={countContainer}>
                            <MyText style={[textH4Style, textWhite, textBold]}>{currentIndex}/{photos.length}</MyText>
                        </View>
                    </View> */}
                </View>
                
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        // paddingTop: SCREEN_HEIGHT <= 667 ? 50 : 30, 
        paddingBottom: 15,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
    },
    shareContainer: {
        width: 40, height: 40, borderRadius: 40, backgroundColor: colors.white, elevation: 3, justifyContent: 'center',
        alignItems: 'center', 
    },
    starContainer: {
        paddingTop: 8, paddingBottom: 0
    },
    shareStyle: {
        color: colors.success, fontSize: 25, marginLeft: -2
    },
    iconStyle: {
        fontSize: 16
    },
    imgContainer: {
        width: '100%', height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 35
    },
    contentContainer: {
        paddingHorizontal: 20
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between', alignItems: 'flex-end', padding: 20
    },
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifyContainer: {
        position: 'absolute', top: 20, right:20,
    },
    cContainer: {
        position: 'absolute', bottom: 20, right: 20
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white
    },
    countContainer: {
        borderRadius: 30, paddingHorizontal: 20, paddingTop:10, paddingBottom: 12, backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
    thumbContainer: {
        width: 60, height: 60, borderRadius: 60, marginRight: 20, borderWidth: 2,borderColor: colors.orange
    },
    thumbStyle: {
        width: 56, height: 56, borderRadius: 56,
    },
    thumbTxtContainer: {
        paddingVertical: 15, alignItems:'center'
    }
});

export default ImageAndDetails;
