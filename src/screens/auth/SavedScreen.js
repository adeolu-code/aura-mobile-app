/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';


class SavedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
//   ListScreen = () => {
//     this.props.navigation.navigate('List');
//   }
  render() {
    const {container, middleRow } = styles
    const {  textExtraBold, textLgStyle, textDarkBlue} = GStyles
    return (
      <SafeAreaView style={container}>
          <View style={middleRow}>
                <Icon name="checkmark-circle" style={{color:"#FD8323", fontSize: 80}} />
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
  }, middleRow:{
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
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
