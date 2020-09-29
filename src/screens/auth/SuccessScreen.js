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
    const {container, middleRow, bottomRow, header, iconContainer  } = styles
    const { textBold, textSuccess, textUnderline, textCenter, textExtraBold, textLgStyle, textH4Style, textGrey, textH5Style} = GStyles
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={header}>
            <MyText style={[textLgStyle, textExtraBold]}>Account Successfully Created</MyText>
        </View>
          <View style={container}>
            <View>
              <MyText style={[textH5Style, textGrey, { lineHeight: 25}]}>
                A verification link has been sent to josh***d@gmail.com
              </MyText>
            </View>
            <View style={middleRow}>
                <View style={iconContainer}>
                  <Icon type="Feather" name="check" style={{color:colors.white, fontSize: 40}} />
                </View>
            </View>
            <View>
                <CustomButton onPress={this.ListScreen} buttonText='Resend Mail' 
                buttonStyle={{borderColor: '#000', borderWidth: 1,borderRadius: 8, backgroundColor: '#fff', elevation: 1}} textStyle={{color: '#222222'}}/>
            </View>
            <View style={bottomRow}>
              <TouchableOpacity><MyText style={[textGrey, textH5Style]}>Don’t have access to your mail?{' '}
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
    paddingTop: 130,
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
    paddingBottom: 77,
  },
  header: {
    width: '100%', paddingTop: 40, backgroundColor: colors.white, paddingHorizontal: 20,
        position: 'absolute', top: 0, zIndex: 100,
  },
  iconContainer: {
    width: 70, height: 70, borderRadius: 50, backgroundColor: colors.orange, justifyContent: 'center', alignItems:'center'
  }
    
});

export default SuccessScreen;
