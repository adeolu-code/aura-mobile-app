import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import colors from '../../../colors';
class ReviewRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {  container, reviewRow,
        progressContainer, progressStyle } = styles;
    const { flexRow, textDarkGrey, textH5Style, textLightGrey } = GStyles
    const { title } = this.props
    return (
        <View style={[flexRow, reviewRow]}>
            <MyText style={[textH5Style, textDarkGrey, { flex: 1}]}>{title}</MyText>
            <View style={[flexRow, { alignItems: 'center',justifyContent: 'flex-end', flex: 1.5}]}>
                <View style={progressContainer}>
                    <View style={progressStyle}></View>
                </View>
                <MyText style={[textH5Style, textDarkGrey]}>4.8</MyText>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    reviewRow: {
        marginVertical: 10, alignItems: 'center', 
    },
    progressContainer: {
        backgroundColor: colors.lightGrey, height: 4, borderRadius: 10, width: '70%', marginHorizontal: 10, 
        overflow: 'hidden'
    },
    progressStyle: {
        width: '80%', height: '100%', backgroundColor: colors.darkGrey, position: 'absolute', borderRadius: 10
    }
});

export default ReviewRow;
