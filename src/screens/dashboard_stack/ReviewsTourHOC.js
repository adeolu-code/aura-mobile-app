/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext, AppConsumer } from '../../../AppProvider';
import { ReservationsContext, ReviewsTourConsumer } from '../../../ReviewsTourProvider';



import Ratings from './RatingsAndReviewsTour';


class ReviewsTourHOC extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }

  render() {
    return (
      <AppConsumer>
        {(appContext) => (
          <ReviewsTourConsumer>
            {(values) => (
              <Ratings appContext={appContext} reviewsContext={values} {...this.props} />
            )}
          </ReviewsTourConsumer>
        )}
      </AppConsumer>
    );
  }
}

export default ReviewsTourHOC;
