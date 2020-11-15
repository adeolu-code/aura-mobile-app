/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { ReviewsProvider } from '../../../ReviewsProvider';

import ReviewsHOC from './ReviewsHOC';


class ReviewsProviderContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ReviewsProvider>
        <ReviewsHOC {...this.props} />
      </ReviewsProvider>
    );
  }
}

export default ReviewsProviderContainer;
