import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GStyles from '../assets/styles/GeneralStyles';

const Card = props => {
  return (
    <View style={[styles.containerStyles, props.style]}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 15,
    // borderWidth: 0.8,
    // borderColor: 'rgba(211,211,211,0.9)',
    backgroundColor: 'white', elevation: 3,
    ...GStyles.shadow
  },
});

export {Card};
