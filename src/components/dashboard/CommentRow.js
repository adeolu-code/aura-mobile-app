import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';

class CommentRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { container, rightContainer, imgContainer, leftContainer, dateContainer } = styles;
    const { flexRow, textGrey, textH4Style, imgStyle, textBold, textH5Style } = GStyles;
    const { name } = this.props;
    return (
      <View style={[flexRow, container]}>
        <View style={leftContainer}>
            <View style={imgContainer}>
                <Image source={require('../../assets/images/photo/photo6.png')} resizeMode="cover" style={imgStyle} />
            </View>
        </View>
        <View style={rightContainer}>
            <View style={[flexRow, dateContainer]}>
                <MyText style={[textBold, textH4Style]}>{name}</MyText>
                <MyText style={[textGrey, textH5Style]}>Sept 12, 2019</MyText>
            </View>
            <View>
                <MyText style={[textGrey, textH4Style]}>
                Lorem ipsum dolor sit amet, veullri ma conset sadipscing elitr, sed diam nonumy eirmod tempor invidunt.
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
