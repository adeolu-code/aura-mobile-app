/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext, AppConsumer } from '../../../AppProvider';
import { ReservationsTourContext, ReservationsTourConsumer } from '../../../ReservationsTourProvider';



import ReservationsTour from './ReservationsTour';


class ReservationsContainer extends Component {
  static contextType = ReservationsTourContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }

  render() {
    return (
      <AppConsumer>
        {(appContext) => (
          <ReservationsTourConsumer>
            {(values) => (
              <ReservationsTour appContext={appContext} reservationsContext={values} {...this.props} />
            )}
          </ReservationsTourConsumer>
        )}
      </AppConsumer>
    );
  }
}

export default ReservationsContainer;
