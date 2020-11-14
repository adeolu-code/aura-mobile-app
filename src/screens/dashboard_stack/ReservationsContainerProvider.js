/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext, AppConsumer } from '../../../AppProvider';
import { ReservationsContext, ReservationsConsumer } from '../../../ReservationsProvider';
import { ReservationsProvider } from '../../../ReservationsProvider'



import ReservationsHOC from './ReservationsContainer';


class ReservationsContainer extends Component {
  static contextType = ReservationsContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }

  
  render() {
    return (
      <ReservationsProvider>
        <ReservationsHOC {...this.props} />
      </ReservationsProvider>
    );
  }
}

export default ReservationsContainer;
