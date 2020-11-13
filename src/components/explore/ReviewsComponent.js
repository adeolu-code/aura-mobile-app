/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, Loading } from '../../utils/Index';
import StarComponent from '../StarComponent';

import ReviewRow from './ReviewRow';

import colors from '../../colors';




class ReviewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    renderLoading = () => {
        const { loading } = this.props;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', paddingTop: 50 }} />); }
    }
    renderEmpty = () => {
        const { loading, reviews } = this.props
        const { emptyContainerStyle } = styles;
        const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
        if(!loading && reviews.length === 0) {
            return (
                <View>
                  <View style={emptyContainerStyle}>
                    <Image source={require('../../assets/images/photo/ratings.png')} style={imgStyle} resizeMode="cover" />
                  </View>
                  <MyText style={[textBold, textCenter, textOrange, textH4Style]}>No reviews</MyText>
                </View>
            )
        }
    }

    reviewCount = () => {
        const { reviews } = this.props
        if(reviews) {
            return reviews.length
        }
        return 0
    }
    calculateAttrs = (name) => {
        const { reviews } = this.props
        return reviews.reduce((sum, current) => sum + current[name], 0)
    }
    starRating = () => {
        return this.calculateAttrs('totalRating')
    }

    renderRatings = () => {
        const { reviews } = this.props
        if(reviews.length !== 0) {
            const keys = Object.keys(reviews[0])
            return keys.map((item, index) => {
                const key = `RE_${index}`
                if(item !== "totalRating" ) {
                    const value = this.calculateAttrs(item)
                    return (
                        <ReviewRow title={item} value={value} key={key} />
                    )
                }
            })  
        }
        
    }

  render() {
    const {  contentContainer, divider, container, subContainer, headerStyle, reviewContainer, reviewRow,
    progressContainer, progressStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textH5Style, textLightGrey } = GStyles
    return (
        <View style={container}>
            {this.renderLoading()}
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>Reviews</MyText>
            </View>
            <View style={contentContainer}>
                <View style={[flexRow, subContainer]}>
                    <MyText style={[textH5Style]}>{this.reviewCount()} review(s)</MyText>
                    <MyText style={[textLightGrey, { marginHorizontal: 6 }]}>|</MyText> 
                    <StarComponent grey starContainer={{marginBottom: 0}} rating={this.starRating()} />
                </View>
                
                <View style={reviewContainer}>
                    {this.renderEmpty()}
                    {this.renderRatings()}
                    {/* <ReviewRow title="Cleanliness" />
                    <ReviewRow title="Communication" />
                    <ReviewRow title="Location" />
                    <ReviewRow title="Check-in" />
                    <ReviewRow title="Accuracy" />
                    <ReviewRow title="Value" />


                    <View style={[flexRow, reviewRow]}>
                        <MyText style={[textH5Style, textDarkGrey]}>Cleanliness</MyText>
                        <View style={[flexRow, { alignItems: 'center',justifyContent: 'flex-end',}]}>
                            <View style={progressContainer}>
                                <View style={progressStyle}></View>
                            </View>
                            <MyText style={[textH5Style, textDarkGrey]}>4.8</MyText>
                        </View>
                    </View> */}

                </View>
            </View>
            <View style={divider}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    headerStyle: {
        marginBottom: 10, marginTop: 20
    },
    subContainer: {
        alignItems: 'center', marginBottom: 25
    },
    contentContainer: {
        marginBottom: 30
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
    },
    reviewContainer: {
        borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 6, padding: 20, 
    },
    reviewRow: {
        marginVertical: 10, alignItems: 'center', justifyContent: 'space-between'
    },
    progressContainer: {
        backgroundColor: colors.lightGrey, height: 4, borderRadius: 10, width: '60%', marginHorizontal: 10, 
        overflow: 'hidden'
    },
    progressStyle: {
        width: '80%', height: '100%', backgroundColor: colors.darkGrey, position: 'absolute', borderRadius: 10
    },
    emptyContainerStyle: {
        height: 200, width: '100%', marginBottom: 20
    }
});

export default ReviewsComponent;
