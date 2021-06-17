/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import {Icon} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext } from '../../../AppProvider';

import { getToken } from '../../helpers'


class SavedScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick = () => {
    this.cancel()
    return true;
  };
  cancel = () => {
    return null
  }
  onPress = async () => {
    this.context.set({ currentDashboard: 2 })
    const token = await getToken()
    this.context.getUserProfile(token.access_token)
    this.props.navigation.navigate('Tabs', { screen: 'Dashboard' })
  }
  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    setTimeout( async() => {
      this.context.set({ currentDashboard: 2 })
      const token = await getToken()
      this.context.getUserProfile(token.access_token)
      this.props.navigation.navigate('Tabs', { screen: 'Dashboard' })
    }, 3000);
  }
  render() {
    const {container, middleRow } = styles
    const {  textExtraBold, textLgStyle, textDarkBlue, textH2Style, textCenter} = GStyles
    return (
      <SafeAreaView style={container}>
          <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: 20, paddingVertical: 30}} onPress={this.onPress}>
            <Icon name="x" type="Feather" style={{ fontSize: 35, color: colors.orange}} />
          </TouchableOpacity>
          <View style={middleRow}>
                <Icon name="checkmark-circle" style={{color:"#FD8323", fontSize: 100, marginTop: -70, marginBottom: 40}} />
                <MyText style={[textH2Style, textExtraBold, textDarkBlue, textCenter]}>You are now a Photographer on Aura</MyText>
            </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  }, 
  middleRow:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white, paddingHorizontal: 30
      // borderWidth: 1
  },
});

export default SavedScreen;
