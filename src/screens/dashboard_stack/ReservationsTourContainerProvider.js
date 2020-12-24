/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext, AppConsumer } from '../../../AppProvider';
import { ReservationsTourContext, ReservationsTourProvider, ReservationsTourConsumer } from '../../../ReservationsTourProvider';



import ReservationsTourHOC from './ReservationsTourContainer';


class ReservationsContainer extends Component {
  static contextType = ReservationsTourContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }

  
  render() {
    return (
      <ReservationsTourProvider>
        <ReservationsTourHOC {...this.props} />
      </ReservationsTourProvider>
    );
  }
}

export default ReservationsContainer;
