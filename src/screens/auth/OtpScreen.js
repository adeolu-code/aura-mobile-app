/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CustomButton, MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';


class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  SuccessScreen = () => {
    this.props.navigation.navigate('Success');
  }
  render() {
    const { container, middleRow, bottomRow } = styles
    const { textBold, textH4Style, flexRow, imgStyle, textH3Style, textGrey, textWhite, 
      textH5Style, textGreen, 
      textUnderline, textOrange } = GStyles
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Authentication Code" />
          <View style={container} >
            <View>
            <MyText>
              An OTP code has been sent to +2347033934020 Kindly enter below the 6 digit code or {' '}
            <TouchableOpacity>
              <MyText style={[textOrange, textUnderline, textBold]}>Change Phone Number</MyText>
            </TouchableOpacity>
            </MyText>
            </View>
            <View style={middleRow}>
            <View></View>
            <View style={[flexRow]}>
                <MyText>Didn’t receive a code? {' '}</MyText>
                <TouchableOpacity>
                  <MyText style={[textUnderline, textOrange, textBold]}>Resend Code</MyText>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 20}}>
                <MyText style={[textUnderline, textGreen, textBold]}>Request Call</MyText>
            </View>
            </View>
            <View style={bottomRow}>
                <CustomButton onPress={this.SuccessScreen} buttonText="Next" />
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
  },
  middleRow: {
      justifyContent: 'center',
      alignContent: 'space-between',
      flex: 2,
  },
  bottomRow: {
      justifyContent: 'flex-end',
      paddingBottom: 30,
      flex: 1,
  }
});

export default OtpScreen;
