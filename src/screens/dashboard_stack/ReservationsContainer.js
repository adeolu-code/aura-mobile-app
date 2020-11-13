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
    const { tabOneSelected, tabTwoSelected, tabThreeSelected, showFilterModal } = this.state;
    return (
      <AppConsumer>
        {(appContext) => (
          <ReservationsConsumer>
            {(values) => (
              <Reservations appContext={appContext} propertyContext={values} {...this.props} />
            )}
          </ReservationsConsumer>
        )}
      </AppConsumer>
    );
  }
}

const styles = StyleSheet.create({
  manageHeader: {
    position: 'absolute', backgroundColor: colors.white, paddingTop: 100, width: '100%', paddingHorizontal: 20, zIndex: 1,
  }, 

});

export default ReservationsContainer;
