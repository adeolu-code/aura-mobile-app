/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';
import StarComponent from '../../StarComponent';
import CommentRow from './CommentRow';

import { Icon } from 'native-base';

import colors from '../../../colors';



class HostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderMoreImages = () => {
    const { photos } = this.props;
    const { headerStyle, ImgContainer, image } = styles
    const { flexRow, textH2Style, textExtraBold, textWhite, imgStyle } = GStyles
    if(photos && photos.length > 5) {
        const images = photos.splice(0, 4)
        return (
            <>
                <View style={headerStyle}>
                    <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 30}]}>
                        More Photos
                    </MyText>
                </View>
                <View style={{width: '100%', marginBottom: 10}}>
                    <View style={[flexRow, ImgContainer]}>
                        {images.map((item, i) => {
                            const key = `KE_${i}`
                            return (
                                <View style={image} key={key}>
                                    <Image source={{uri: item.assetPath }} resizeMode="cover" style={imgStyle} />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </>
        )
    }
  }

  renderItems = () => {
      const { tour } = this.props
      const { flexRow, textWhite, textH4Style } = GStyles
      const { iconStyleOne, imageView } = styles
      if(tour.guestShouldBring && tour.guestShouldBring.length !== 0) {
        return tour.guestShouldBring.map((item, i) => {
            const key = `Items_${i}`
            return (
              <View style={[flexRow, { marginBottom: 15, width: '48%'}]} key={key}>
                  <View style={[imageView]}>
                      <Icon type="Ionicons" name="checkmark-done-outline" style={iconStyleOne} />
                  </View>
                  <View style={{marginLeft: 20, justifyContent: 'center'}}>
                      <MyText style={[textWhite, textH4Style]}>
                          {item}
                      </MyText>
                  </View>
              </View>
            )
        })
      }
      
  }

  render() {
    const {  contentContainer, divider, container, headerStyle, thumbTxtContainer, thumbContainer, verifiedStyle, 
        iconVerifiedContainer, thumbStyle, buttonContainer, buttonStyle, shieldContainer, textStyle, iconStyle, imageView, iconStyleOne, lowerContainer, reportContainer, image, ImgContainer, subContainer} = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, textH5Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey, textLightGrey, textSuccess, textUnderline } = GStyles
    const { tour } = this.props
    const picture = tour.picture ? { uri: tour.picture } : require('../../../assets/images/profile.png')
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>
                    Activities You’ll Experience
                </MyText>
            </View>
            <View>
            <MyText style={[textWhite, textH4Style, {marginBottom: 30}]}>
                    {/* {tour.guestPreExperienceInfomration}  */}
                    {tour.experienceDescription}
                </MyText>
            </View>
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite]}>Meet Your Host</MyText>
            </View>
            <View style={contentContainer}>
                <View style={[flexRow, thumbTxtContainer]}>
                    <View style={thumbContainer}>
                        <Image source={picture} resizeMode="cover" style={thumbStyle} />
                        <View style={{ position: 'absolute', right: 0, top: -5}}>
                            <View style={iconVerifiedContainer}>
                                <Icon name="check" type="FontAwesome5" style={verifiedStyle} />
                            </View>
                        </View>
                    </View>
                    <MyText style={[textH3Style, textWhite]}>{tour.name}</MyText>
                </View>
                <View>
                    <MyText style={[textWhite, textH4Style]}>{tour.story}</MyText>
                </View>
                <View style={buttonContainer}>
                    {/* <CustomButton buttonText="Ask Question" buttonStyle={buttonStyle} textStyle={{color: colors.orange}} /> */}
                </View>
                <View style={[flexRow, lowerContainer]}>
                    <View style={shieldContainer}>
                        <Image source={require('../../../assets/images/icons/shield/shield.png')} resizeMode="contain" style={imgStyle} />
                    </View>
                    <View style={textStyle}>
                        <MyText style={[textH5Style, textWhite]}>
                        Do not make any payment to tour guides outside of the Aura app or website to protect against scam.</MyText>
                    </View>
                </View>
            </View>
            <View style={divider}></View>
            {this.renderMoreImages()}
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 10}]}>What to bring</MyText>
            </View>
            <View>
                <View style={[flexRow, {marginBottom: 30, marginTop: 10, flexWrap: 'wrap'}]}>
                    {this.renderItems()}
                    {/* <View style={[flexRow]}>
                        <View style={[imageView]}>
                            <Icon type="Ionicons" name="map-sharp" style={iconStyleOne} />
                        </View>
                        <View style={{marginLeft: 20, justifyContent: 'center'}}>
                            <MyText style={[textWhite, textH4Style]}>
                                Map
                            </MyText>
                        </View>
                    </View>
                    <View style={[flexRow, {marginTop: 30}]}>
                        <View style={[imageView]}>
                            <Icon type="Ionicons" name="camera" style={iconStyleOne} />
                        </View>
                        <View style={{marginLeft: 20, justifyContent: 'center'}}>
                            <MyText style={[textWhite, textH4Style]}>
                                Camera
                            </MyText>
                        </View>
                    </View> */}
                </View>
            </View>
            <View style={divider}></View>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 10}]}>Things To Keep In Mind</MyText>
            </View>
            <View>
                <MyText style={[textWhite, textH4Style, {marginBottom: 30}]}>{tour.notes}</MyText>
            </View>
            <View style={divider}></View>
            
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 10}]}>Please Read Before Booking</MyText>
            </View>
            <View>
                <MyText style={[textWhite, textH4Style, {marginBottom: 30}]}>{tour.guestPreExperienceInfomration}</MyText>
            </View>
            <View style={divider}></View>

            {/* <View>
                <View style={headerStyle}>
                    <MyText style={[textH2Style, textExtraBold, textWhite, {marginTop: 10}]}>Reviews</MyText>
                </View>
                <View style={[flexRow, subContainer, {marginBottom: 30}]}>
                    <MyText style={[textH5Style, textWhite]}>384 reviews </MyText>
                    <MyText style={[textLightGrey, { marginHorizontal: 6 }]}>|</MyText> 
                    <StarComponent grey starContainer={{marginBottom: 0}} />
                </View>
            </View>
            <View>
                <CommentRow name='Joshua Nwabogor'/>
                <View style={divider}></View>
                <CommentRow name='Ashley Cole'/>
                <View style={divider}></View>
                <CommentRow name='Banabas Kaviar'/>
            </View>
            <View style={buttonContainer}>
                <CustomButton buttonText="Show All Reviews" buttonStyle={buttonStyle} textStyle={{color: colors.orange}} />
            </View>
            <View style={divider}></View>
            <TouchableOpacity style={[flexRow, reportContainer]}>
                <Icon type="MaterialIcons" name="flag" style={iconStyle} />
                <MyText style={[textH4Style, textSuccess, textUnderline]}>Report This Listing</MyText>
            </TouchableOpacity> */}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: colors.black,
        paddingTop: 20,
        paddingBottom: 40,
    },
    headerStyle: {
        marginBottom: 15, marginTop: 20
    },
    mapContainer: {
        width: '100%', height: 230, borderRadius: 8, overflow: 'hidden', marginTop: 15, marginBottom: 20
    },
    contentContainer: {
        
    },
    buttonStyle: {
        borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.black, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: '#3B3B3B',
    },
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white
    },
    thumbContainer: {
        width: 60, height: 60, borderRadius: 60, marginRight: 20
    },
    thumbStyle: {
        width: 60, height: 60, borderRadius: 60,
    },
    thumbTxtContainer: {
        paddingVertical: 15, alignItems:'center'
    },
    shieldContainer: {
        width: 25, height:25, borderRadius: 25, backgroundColor: colors.orange, padding: 5, 
    },
    textStyle: {
        paddingLeft: 20, paddingRight: 20
    },
    lowerContainer: {
        marginBottom: 30
    },
    image: {
        width: '47.5%',
        height: 190,
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 20, backgroundColor: colors.darkGrey, elevation: 2
    },
    ImgContainer: {
        justifyContent: 'space-between', flexWrap: 'wrap'
    },
    subContainer: {
        alignItems: 'center', marginBottom: 25
    },
    reportContainer: {
        marginTop:30
    },
    iconStyle: {
        fontSize: 25, marginRight: 10, color: colors.success,
    },
    iconStyleOne: {
        fontSize: 20,
        color: colors.success,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.success,
        borderRadius: 30,
        height: 30,
        width: 30,
    },
});

export default HostComponent;
