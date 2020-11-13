/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';

import { AppContext } from '../../../AppProvider';


class SavedScreen extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  //TODO prevent people from using the back button to go back
  
  onPress = () => {
    this.props.navigation.navigate('HostSteps')
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('HostSteps')
    }, 2000);
  }
  render() {
    const {container, middleRow } = styles
    const {  textExtraBold, textLgStyle, textDarkBlue, textH2Style, textCenter} = GStyles
    return (
      <SafeAreaView style={container}>
          <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: 20, paddingVertical: 30}} onPress={this.onPress}>
            <Icon name="x" type="Feather" style={{ fontSize: 40, color: colors.orange}} />
          </TouchableOpacity>
          <View style={middleRow}>
                <Icon name="checkmark-circle" style={{color:"#FD8323", fontSize: 100, marginTop: -70, marginBottom: 40}} />
                <MyText style={[textH2Style, textExtraBold, textDarkBlue, textCenter]}>Property Successfully Saved And Ready For Publishing</MyText>
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
