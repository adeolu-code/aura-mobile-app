/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import Swiper from 'react-native-swiper'

import { MyText, Loading } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import StarComponent from '../../components/StarComponent';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


class ImageAndDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: 1, photos: [], loadingPhotos: false, showModal: false };
  }
  openHostDetailsModal = () => {
    this.setState({ showModal: true })
  }
    indexChange = (index) => {
        this.setState({ currentIndex: index + 1})
    }
    renderPhotoLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', elevation:4 }} />); }
    }
    renderImages = () => {
        const { imgContainer, overlayStyles } = styles
        const { imgStyle } = GStyles
        const { photos } = this.state
        return photos.map((item, index) => {
            return (
                <View style={imgContainer} key={index}>
                    <Image source={item} style={imgStyle} resizeMode="cover" />
                    <View style={overlayStyles}></View>
                </View>
            )
        })
    }
    renderVerified = () => {
        const { house } = this.props;
        const { flexRow, textWhite, textH3Style } = GStyles;
        const { verifyContainer, verifiedStyle, iconVerifiedContainer } = styles
        if(house.isVerified) {
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
    renderType = () => {
        const { house } = this.props;
        const {typeStyles, bgOrange, bgLightOrange } = styles
        const { textH5Style, textWhite, textOrange } = GStyles
        if(house) {
            return (
                <View style={[typeStyles, house.propertyType.name === 'Hotel' ? bgOrange : bgLightOrange]}>
                    <MyText style={[textH5Style, house.propertyType.name === 'Hotel' ? textWhite : textOrange]}>{house.propertyType.name}</MyText>
                </View>
            )
        }
        
    }
    renderProfileVerified = () => {
        const { house } = this.props;
        const { iconVerifiedContainer, verifiedStyle } = styles
        if (house.isVerified) {
            return (
                <View style={{ position: 'absolute', right: 0, top: -5}}>
                    <View style={iconVerifiedContainer}>
                        <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                    </View>
                </View>
            )
        }
      }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.imgArr.length !== this.props.imgArr.length) {
            this.setState({ photos: this.props.imgArr })
        }
        if(prevProps.loading !== this.props.loading) {
            this.setState({ loadingPhotos: this.props.loading})
        }
    }

    

  render() {
    const { headerStyle, shareStyle, shareContainer, iconStyle, starContainer, imgContainer, contentContainer,
        overlayStyles, iconVerifiedContainer, verifiedStyle, countContainer, divider, thumbContainer, thumbTxtContainer, 
        thumbStyle, cContainer, verifyContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textLgStyle, textH5Style, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textSuccess, textH6Style, textDarkGrey } = GStyles
    const { currentIndex, photos } = this.state
    const { time, house, title, loading, openHostModal } = this.props;
    // console.log(house)

    const imgUrl = house.hostPicture ? { uri: house.hostPicture } : require('../../assets/images/profile.png')
    return (
        <View>
            <View style={[flexRow, headerStyle]}>
                <View style={{flex: 6 }}>
                    <MyText style={[textExtraBold, textLgStyle]}>{title}</MyText>
                    <View style={starContainer}>
                        <StarComponent style={iconStyle} grey rating={house.rating} />
                    </View>
                    <MyText style={[textH4Style, textGrey]}>{house ? house.state : '**'}</MyText>
                    {time ? <MyText style={[textGrey, { paddingVertical: 8}]}>
                        <MyText style={[textSuccess, textExtraBold, textH5Style]}>Open</MyText> · <MyText style={[textH6Style]}>12:00pm - 9:00pm</MyText>
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
                
                    {!loading ?<Swiper style={{height: '100%'}} showsButtons={false} index={0} activeDotColor={colors.lightGrey} 
                    showsPagination={false} onIndexChanged={this.indexChange} >
                        {this.renderImages()}
                    </Swiper> : <Loading wrapperStyles={{ height: '100%', width: '100%', elevation:4 }} />}

                    {this.renderVerified()}
                    {this.renderType()}
                    {/* <View style={[flexRow, verifyContainer]}>
                        <MyText style={[textWhite, textH3Style, { marginRight: 5}]}>Verified</MyText>
                        <View style={iconVerifiedContainer}>
                            <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                        </View>
                    </View> */}
                    <View style={cContainer}>
                        <View style={countContainer}>
                            <MyText style={[textH4Style, textWhite, textBold]}>{currentIndex}/{photos.length}</MyText>
                        </View>
                    </View>
                </View>
                {house ? <Fragment>
                    <View style={divider}></View>
                    <View style={{marginVertical: 25}}>
                        <MyText style={[textH2Style, { marginBottom: 8}]}>
                            {house.roomType && house.roomType.name ? house.roomType.name : ''}
                        </MyText>
                        <MyText style={[textH5Style, textGrey]}>{house.noofAvailableRooms} guests · {house.noofRooms} bedroom · {house.noofBeds} beds · {house.noofBathrooms} private bath</MyText>

                        <View style={[flexRow, thumbTxtContainer]}>
                            <View style={thumbContainer}>
                                <TouchableOpacity onPress={openHostModal}>
                                <Image source={imgUrl} resizeMode="cover" style={thumbStyle} />
                                </TouchableOpacity>
                                {this.renderProfileVerified()}
                                {/* <View style={{ position: 'absolute', right: 0, top: -5}}>
                                    <View style={iconVerifiedContainer}>
                                        <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                                    </View>
                                </View> */}
                            </View>
                            <MyText style={[textH3Style]}>Posted by {house.hostName}</MyText>
                        </View>
                    </View>
                    <View style={divider} />
                </Fragment> : <Fragment></Fragment>}
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        paddingTop: 70, paddingBottom: 15,
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
    typeStyles: {
        position: 'absolute', top: 0, left:0, justifyContent: 'center', alignItems: 'center',
        paddingVertical: 10, paddingHorizontal: 20, borderTopLeftRadius: 10, borderBottomRightRadius: 10
    },
    bgOrange: {
        backgroundColor: colors.orange
    },
    bgLightOrange: {
        backgroundColor: colors.lightOrange
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
