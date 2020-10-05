import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import {Spinner} from './Spinner';
import GeneralStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';

class Loading extends Component {
  render() {
    const {height} = Dimensions.get('window');
    const {containerStyles, imgStyle, container, imgContainerStyle} = styles;
    const {textBrandColor, textH3Style, textBold} = GeneralStyles;
    const {wrapperStyles} = this.props;
    return (
      <View style={[containerStyles, {height: height}, wrapperStyles]}>
        
        <View style={container}>
          <Spinner size={40} color={colors.orange} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerStyles: {
    position: 'absolute',
    // height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.9)',
    zIndex: 1000, top: 0,
    // elevation: 2
  },
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  imgStyle: {
    width: 40,
    height: 40,
  },
  imgContainerStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Loading};
