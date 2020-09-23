import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MyText } from '../../utils/Index';
import ProfileScreen from '../profile/profile.screen';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <ProfileScreen {...this.props} />
    );
  }
}

export default Index;
