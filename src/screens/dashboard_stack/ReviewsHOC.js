/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext, AppConsumer } from '../../../AppProvider';
import { ReservationsContext, ReviewsConsumer } from '../../../ReviewsProvider';



import Ratings from './RatingsAndReviews';


class ReviewsHOC extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }

  render() {
    return (
      <AppConsumer>
        {(appContext) => (
          <ReviewsConsumer>
            {(values) => (
              <Ratings appContext={appContext} reviewsContext={values} {...this.props} />
            )}
          </ReviewsConsumer>
        )}
      </AppConsumer>
    );
  }
}

export default ReviewsHOC;
