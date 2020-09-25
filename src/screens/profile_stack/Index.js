import React, { Component } from 'react';
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
