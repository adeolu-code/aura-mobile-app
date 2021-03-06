/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext, AppConsumer } from '../../../AppProvider';
import { ReservationsContext, ReservationsConsumer } from '../../../ReservationsProvider';



import Reservations from './Reservations';


class ReservationsContainer extends Component {
  static contextType = ReservationsContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }

  

  
  render() {
    return (
      <AppConsumer>
        {(appContext) => (
          <ReservationsConsumer>
            {(values) => (
              <Reservations appContext={appContext} reservationsContext={values} {...this.props} />
            )}
          </ReservationsConsumer>
        )}
      </AppConsumer>
    );
  }
}

export default ReservationsContainer;
