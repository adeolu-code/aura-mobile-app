/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext, AppConsumer } from '../../../AppProvider';
import { ManagePropertyContext, ManagePropertyConsumer } from '../../../ManagePropertyProvider';



import ManageProperties from './ManageProperties';


class ManagePropertiesContainer extends Component {
  static contextType = ManagePropertyContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }
  
  render() {
    return (
      <AppConsumer>
        {(appContext) => (
          <ManagePropertyConsumer>
            {(values) => (
              <ManageProperties appContext={appContext} propertyContext={values} {...this.props} />
            )}
          </ManagePropertyConsumer>
        )}
      </AppConsumer>
    );
  }
}

export default ManagePropertiesContainer;
