import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FoodRow from './FoodRow';


class LunchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <FoodRow border />
        <FoodRow border />
        <FoodRow />
      </View>
    );
  }
}

export default LunchComponent;
