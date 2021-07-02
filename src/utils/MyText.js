import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export class MyText extends Component {
  render() {
    const {textStyles} = styles;
    const {style, onPress} = this.props;
    return <Text style={[textStyles, style]} onPress={onPress}>{this.props.children}</Text>;
  }
}

const styles = StyleSheet.create({
  textStyles: {
    fontFamily: 'Nunito-Regular',
  },
});

export default MyText;
