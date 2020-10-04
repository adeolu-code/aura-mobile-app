import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import GeneralStyles from '../assets/styles/GeneralStyles';
import {MyText} from './MyText';

class Error extends Component {
  renderErrors = () => {
    const { errors } = this.props;
    const {textBrandColor, textCenter, textH4Style, textDanger} = GeneralStyles;
    return errors.map((item,i) => {
      return (
        <MyText style={[textDanger, textCenter, textH4Style]} key={i}>
          {item}
        </MyText>
      )
    })
  }
  render() {
    const {errorText, errors } = this.props;
    const {textBrandColor, textCenter, textH4Style, textDanger} = GeneralStyles;
    const {textContainerStyle} = style;
    
    return (
      <View style={textContainerStyle}>
        {this.renderErrors()}
      </View>
    );
  }
}

const style = StyleSheet.create({
  textContainerStyle: {
    marginVertical: 10,
  },
});

export {Error};
