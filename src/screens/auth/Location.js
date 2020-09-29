/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';


class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      };
}
AmenitiesScreen = () => {
    this.props.navigation.navigate('Amenities');
  }

  render() {
    const { container, picker, button, imageView, iconStyle, input } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH5Style, textH6Style} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title={"Did We Get Your\nLocation Right?"} />
          <ScrollView style={container}>
            <View style={{flex: 1}}>
                <View style={{marginTop: 18}}>
                    <MyText style={textGrey}>
                        Guests will only get your exact address once they’ve booked a reservation
                    </MyText>
                    <View style={{marginTop: 45}}>
                    </View>
                </View>
                <View style={[button]}>
                    <CustomButton buttonText="Next" onPress={this.AmenitiesScreen} />
                </View>
            </View>
          </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    marginTop: 140,
    flex: 1,
  },
  button: {
      marginTop: 150,
       marginBottom: 86,
    },
});

export default Location;
