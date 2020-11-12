/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput, checkBox } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, Error, CheckBox } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { AppContext, AppConsumer } from '../../../AppProvider';
import { ManagePropertyContext, ManagePropertyConsumer } from '../../../ManagePropertyProvider';

import AmenitiesScreen from './AmenitiesScreen';


class AmenitiesScreenHOC extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }


  
  render() {
    return (
      <AppConsumer>
        {(appContext) => (
          <ManagePropertyConsumer>
            {(values) => (
              <AmenitiesScreen appContext={appContext} propertyContext={values} {...this.props} />
            )}
          </ManagePropertyConsumer>
        )}
      </AppConsumer>
    );
  }
}

export default AmenitiesScreenHOC;
