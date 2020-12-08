import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FoodRow from './FoodRow';

class BreakfastComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onAdd = (item) => {
    this.props.onAdd(item)
  }

  renderRow = () => {
    const { values } = this.props;
    return values.map((item, i) => {
      const key = `fd_${i}`
      return (
        <FoodRow border={false} key={key} item={item} onAdd={this.onAdd.bind(this, item)} />
      )
    })
  }

  render() {
    return (
      <View>
        {this.renderRow()}
        {/* <FoodRow border />
        <FoodRow border />
        <FoodRow /> */}
      </View>
    );
  }
}

export default BreakfastComponent;
