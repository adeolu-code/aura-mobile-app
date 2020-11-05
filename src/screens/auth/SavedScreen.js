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
    const { state } = this.context
    if(state.isInApp) {
      this.props.navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
    } else {
      this.props.navigation.navigate('Tabs', { screen: 'Dashboard'})
    }
  }
//   ListScreen = () => {
//     this.props.navigation.navigate('List');
//   }
  componentDidMount = () => {
    const { set, state } = this.context
    if(state.isInApp) {
      set({ step: state.step + 1 })
    }
  }
  render() {
    const {container, middleRow } = styles
    const {  textExtraBold, textLgStyle, textDarkBlue} = GStyles
    return (
      <SafeAreaView style={container}>
          <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: 20, paddingVertical: 30}} onPress={this.onPress}>
            <Icon name="x" type="Feather" style={{ fontSize: 40}} />
          </TouchableOpacity>
          <View style={middleRow}>
                <Icon name="checkmark-circle" style={{color:"#FD8323", fontSize: 80, marginTop: -70}} />
                <MyText style={[textLgStyle, textExtraBold, textDarkBlue]}>Successfully Saved</MyText>
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
      // alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.white, 
      // borderWidth: 1
  },
//   bottomRow: {
//     alignItems: 'center',
//     marginTop: 20,
//     paddingBottom: 77,
//   },
//   header: {
//     width: '100%', paddingTop: 40, backgroundColor: colors.white, paddingHorizontal: 20,
//         position: 'absolute', top: 0, zIndex: 100,
//   },
    
});

export default SavedScreen;
