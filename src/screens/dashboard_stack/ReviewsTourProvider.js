/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { ReviewsTourProvider } from '../../../ReviewsTourProvider';

import ReviewsTourHOC from './ReviewsTourHOC';


class ReviewsTourProviderContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReviewsTourProvider>
        <ReviewsTourHOC {...this.props} />
      </ReviewsTourProvider>
    );
  }
}

export default ReviewsTourProviderContainer;
