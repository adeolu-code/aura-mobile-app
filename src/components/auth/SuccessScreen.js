/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';


class SuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  ListScreen = () => {
    this.props.navigation.navigate('List');
  }
  render() {
    const {container, middleRow, bottomRow  } = styles
    const { textBold, textSuccess, textUnderline} = GStyles
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Account Successfully Created" />
          <View style={container}>
            <View>
            <MyText>
            A verification link has been sent to josh***d@gmail.com
            </MyText>
            </View>
            <View style={middleRow}>
                <Icon name="checkmark-circle" style={{color:"#FD8323", fontSize: 70}} />
            </View>
            <View>
                <CustomButton onPress={this.ListScreen} buttonText='Resend Mail' buttonStyle={{borderColor: '#000', borderWidth: 1,borderRadius: 8, backgroundColor: '#fff'}} textStyle={{color: '#000'}}/>
            </View>
            <View style={bottomRow}>
            <TouchableOpacity><MyText>Don’t have access to your mail?{' '}
                <MyText style={[textSuccess, textBold, textUnderline]}>Skip This</MyText></MyText>
                </TouchableOpacity>
            </View>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 120,
    flex: 1,
  }, middleRow:{
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
  },
  bottomRow: {
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 40,
}
    
});

export default SuccessScreen;
