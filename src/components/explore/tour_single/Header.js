/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import StarComponent from '../../StarComponent';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    renderImages = () => {
        const { photos } = this.props
        const { imgStyle, flexRow } = GStyles
        if(photos && photos.length === 1) {
            return (
                <View style={styles.imageOneContainer}>
                    <Image source={{uri: photos[0].assetPath}} resizeMode="cover" style={imgStyle} />
                </View>
            )
        } else if(photos && photos.length > 1) {
            return (<View style={[flexRow, styles.otherContainer]}>
                {photos.map((item, index) => {
                    const key = `P_${index}`
                    return (
                        <View style={styles.imageTwoContainer} key={key}>
                            <Image source={{uri: item.assetPath }} resizeMode="cover" style={imgStyle} />
                        </View>
                    )
                })}
            </View>)
        }
    }

    renderLeftImgs = () => {
        const { leftImgContainer } = styles
        const { imgStyle } = GStyles
        const { photos } = this.props;
        if(photos && photos.length !== 0) {
            const twoItems = photos.slice(0, 2)
            return twoItems.map((item, i) => {
                const key = `LEFT_${i}`
                return (
                    <View style={leftImgContainer} key={key}>
                        <Image source={{uri: item.assetPath}} resizeMode="cover" style={imgStyle} />
                    </View>
                )
            })
        }
    }
    renderMiddleImgs = () => {
        const { middleImgContainer } = styles
        const { imgStyle } = GStyles
        const { photos } = this.props;
        if(photos && photos.length > 2) {
            const item = photos[2]
            return (
                <View style={middleImgContainer}>
                    <Image source={{uri: item.assetPath}} resizeMode="cover" style={imgStyle} />
                </View>
            )
        }
    }

    renderRightImgs = () => {
        const { leftImgContainer } = styles
        const { imgStyle } = GStyles
        const { photos } = this.props;
        if(photos && photos.length > 3) {
            const twoItems = photos.slice(3, 5)
            return twoItems.map((item, i) => {
                const key = `RIGHT_${i}`
                return (
                    <View style={leftImgContainer} key={key}>
                        <Image source={{uri: item.assetPath}} resizeMode="cover" style={imgStyle} />
                    </View>
                )
            })
        }
    }

    

  render() {
    const { headerStyle, shareStyle, shareContainer, iconStyle, starContainer, contentContainer, iconVerifiedContainer, verifiedStyle, divider, thumbContainer, thumbTxtContainer, 
        thumbStyle, containerOne, photosContainer, header, iconStyleOne, leftImgContainer, leftContainer, middleContainer, middleImgContainer, rightContainer } = styles;
    const { flexRow, textExtraBold, textLgStyle, textH5Style, textGrey, textH4Style, textH3Style, textH6Style, imgStyle } = GStyles
    const { title, tour, photos } = this.props;

    const picture = tour.picture ? { uri: tour.picture } : require('../../../assets/images/profile.png')
    return (
        <View style={{marginBottom: 40}}>
            <View style={[flexRow, headerStyle]}>
                <View style={{flex: 6 }}>
                    <MyText style={[textExtraBold, textLgStyle]}>{title}</MyText>
                    <MyText style={[textH4Style, textGrey, {marginTop: 10}]}>{tour ? tour.location : '***'}</MyText>
                    <View style={starContainer}>
                        <StarComponent style={iconStyle} grey />
                    </View>
                </View>
                {/* <View style={{flex: 1,alignItems: 'flex-end' }}>
                    <TouchableOpacity style={shareContainer}>
                        <Icon name="share-social" style={shareStyle} />
                    </TouchableOpacity>
                </View> */}
            </View>
            <View style={containerOne}>
                <View style={[flexRow, photosContainer]}>
                    {photos && photos.length > 4 ? <View style={[flexRow, photosContainer]}>
                        <View style={leftContainer}>
                            {this.renderLeftImgs()}
                        </View>
                        <View style={middleContainer}>
                            {this.renderMiddleImgs()}
                        </View>
                        <View style={rightContainer}>
                            {this.renderRightImgs()}
                        </View>
                    </View> : 
                    <View>
                        {this.renderImages()}
                    </View>}
                    
                </View>
            </View>
            <View style={divider}></View>
                <View style={contentContainer}>
                    {/* <View style={[flexRow, thumbTxtContainer]}>
                        <View style={thumbContainer}>
                            <Image source={picture} resizeMode="cover" style={thumbStyle} />
                            <View style={{ position: 'absolute', right: 0, top: -5}}>
                                <View style={iconVerifiedContainer}>
                                    <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                                </View>
                            </View>
                        </View>
                        <MyText style={[textH3Style]}>Hosted By {tour.name}</MyText>
                    </View> */}
                    {/* <MyText style={[textH5Style, textGrey]}>Quisque suscipit ipsum est, eu venenatis leo ornare eget. Ut porta facilisis elementum.</MyText> */}
                    <View style={[flexRow, header, {flex: 1}]}>
                        <View style={{flex: 1}}>
                            <Icon type="Feather" name="clock" style={iconStyleOne} />
                            <MyText style={[textGrey, textH6Style]}>Duration Of Tour</MyText>
                            <MyText style={[textH4Style]}>{tour.duration} Hour(s)</MyText>
                        </View>
                        <View style={{flex: 1}}>
                            <Icon type="MaterialIcons" name="people-alt" style={iconStyleOne} />
                            <MyText style={[textGrey, textH6Style]}>People Size</MyText>
                            <MyText style={[textH4Style]}>Up To {tour.maximumGroupSize} People</MyText>
                        </View>
                        {/* <View style={{flex: 1, marginLeft: 10}}>
                            <Icon type="MaterialIcons" name="assignment" style={iconStyleOne} />
                            <MyText style={[textGrey, textH6Style]}>Equipment</MyText>
                            <MyText style={[textH4Style]}>Camera</MyText>
                        </View> */}
                        <View style={{flex: 1, marginLeft: 10}}>
                            <Icon name="people-circle" style={iconStyleOne} />
                            <MyText style={[textGrey, textH6Style]}>Minimum Age</MyText>
                            <MyText style={[textH4Style]}>{tour.minimumAge} year(s)</MyText>
                        </View>
                    </View>
                </View>
                <View style={divider}></View>
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
        paddingTop: 8, paddingBottom: 0,
    },
    shareStyle: {
        color: colors.success, fontSize: 25, marginLeft: -2,
    },
    iconStyle: {
        fontSize: 16,
    },
    imgContainer: {
        width: '100%', height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 35,
        backgroundColor: colors.lightGrey
    },
    contentContainer: {
        paddingLeft: 20,
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between', alignItems: 'flex-end', padding: 20,
    },
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifyContainer: {
        position: 'absolute', top: 20, right:20,
    },
    cContainer: {
        position: 'absolute', bottom: 20, right: 20,
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white,
    },
    countContainer: {
        borderRadius: 30, paddingHorizontal: 20, paddingTop:10, paddingBottom: 12, backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    divider: {
    height: 1, backgroundColor: colors.lightGrey,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    thumbContainer: {
        width: 60, height: 60, borderRadius: 60, marginRight: 20,
    },
    thumbStyle: {
        width: 60, height: 60, borderRadius: 60,
    },
    thumbTxtContainer: {
        paddingVertical: 15, alignItems:'center',
    },
    containerOne: {
        paddingHorizontal: 20,
    },
    photosContainer: {
        justifyContent: 'space-between', 
        width: '100%', borderRadius: 10, overflow: 'hidden',
        // borderWidth: 1
    },
    leftContainer: {
        width: '32.3%', height: 288, justifyContent: 'space-between'
    },
    middleContainer:{
        width: '32.3%', height: 288
    },
    rightContainer: {
        width: '32.3%', height: 288, justifyContent: 'space-between'
    },
    
    leftImgContainer: {
        width: '100%', height: 140, backgroundColor: colors.lightGrey
    },
    middleImgContainer: {
        width: '100%', height: 290, backgroundColor: colors.lightGrey
    },
    header: {
        marginTop: 50,
        justifyContent: 'center',
        // alignContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
    },
    iconStyleOne: {
        fontSize: 25,
        color: colors.black,
        marginBottom: 10,
    },
    otherContainer: {
        justifyContent: 'space-between', flexWrap: 'wrap'
    },
    imageTwoContainer: {
        width: '48%', height: 200, borderRadius: 10, overflow: 'hidden',marginBottom: 15, backgroundColor: colors.lightGrey, 
        elevation: 2
    },
    imageOneContainer: {
        width: '100%', height: 250, borderRadius: 10, overflow: 'hidden', backgroundColor: colors.lightGrey, elevation: 2
    }

});

export default Header;
