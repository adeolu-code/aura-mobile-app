import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Spinner = ({size, style, color}) => {
  const {spinnerStyle} = styles;
  const spinnerColor = color ? color : 'rgb(248,106,39)';
  return (
    <View style={[spinnerStyle, style]}>
      <ActivityIndicator size={size || 'large'} color={spinnerColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Spinner};
