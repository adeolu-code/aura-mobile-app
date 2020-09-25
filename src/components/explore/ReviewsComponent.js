/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';
import StarComponent from '../StarComponent';

import ReviewRow from './ReviewRow';

import colors from '../../colors';




class ReviewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  contentContainer, divider, container, subContainer, headerStyle, reviewContainer, reviewRow,
    progressContainer, progressStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textH5Style, textLightGrey } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>Reviews</MyText>
            </View>
            <View style={contentContainer}>
                <View style={[flexRow, subContainer]}>
                    <MyText style={[textH5Style]}>384 reviews </MyText>
                    <MyText style={[textLightGrey, { marginHorizontal: 6 }]}>|</MyText> 
                    <StarComponent grey starContainer={{marginBottom: 0}} />
                </View>
                
                <View style={reviewContainer}>
                    <ReviewRow title="Cleanliness" />
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
                    </View>

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
    }
});

export default ReviewsComponent;
