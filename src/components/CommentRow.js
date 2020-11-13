/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Card, MyText } from '../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../assets/styles/GeneralStyles';

class CommentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { container, rightContainer, imgContainer, leftContainer, dateContainer } = styles;
    const { flexRow, textGrey, textH4Style, imgStyle, textBold, textH5Style, textWhite } = GStyles;
    const { name, white, text, image, review } = this.props;
    return (
      <View style={[flexRow, container]}>
        <View style={leftContainer}>
            <View style={imgContainer}>
                <Image source={image} resizeMode="cover" style={imgStyle} />
            </View>
        </View>
        <View style={rightContainer}>
            <View style={[flexRow, dateContainer]}>
                <MyText style={[textBold, textH4Style, white ? textWhite : '']}>{name}</MyText>
    <MyText style={[ textH5Style, white ? textWhite : textGrey]}>{review}</MyText>
            </View>
            <View>
                <MyText style={[textH4Style, white ? textWhite : textGrey]}>
                {text}
                </MyText>
            </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', paddingVertical: 20
    },
    dateContainer: {
        marginBottom: 15, justifyContent: 'space-between', alignItems: 'flex-end'
    },
    imgContainer: {
        width: 50, height: 50, borderRadius: 50, overflow: 'hidden'
    },
    leftContainer: {
        flex: 1.2
    },
    rightContainer: {
        flex: 5
    }
});

export default CommentRow;
