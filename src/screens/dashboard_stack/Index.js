import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MyText } from '../../utils/Index';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <MyText> Dashboard </MyText>
      </View>
    );
  }
}

export default Index;
