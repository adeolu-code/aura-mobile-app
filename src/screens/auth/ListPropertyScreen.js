/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import ListProperty from '../../components/auth/ListProperty';


class ListPropertyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: "key0",
        selected1: "key0",
        selected2: "key0",
      };
    }
    onValueChange(value: string) {
      this.setState({
        selected: value
      });
  }
  onValueChangeOne(value: string) {
    this.setState({
      selected1: value
    });
}
onValueChangeTwo(value: string) {
    this.setState({
      selected2: value
    });
}
LocationScreen = () => {
  this.props.navigation.navigate('Location');
}

  render() {
    const { container, picker, button } = styles;
    const { textGrey} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title={"List A Property In\nMinutes"} />
          <ScrollView style={container}>
            <View>
                <View style={{marginTop: 42}}>
                    <MyText style={textGrey}>
                    Choose A Type Of Property
                    </MyText>
                    <View style={picker}>
                        <Picker
                        mode="dropdown"
                        iosHeader="Choose A Type of Property"
                        Icon={<Icon name="md-arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                        >
                        <Picker.Item label="Choose A Type of Property" value="key0"/>
                        <Picker.Item label="Hotels" value="key1" />
                        <Picker.Item label="Apartments" value="key2" />
                        </Picker>
                    </View>
                </View>
                <View style={{marginTop: 40}}>
                    <MyText style={textGrey}>
                    Choose A Type Of Property
                    </MyText>
                    <View style={picker}>
                        <Picker
                        mode="dropdown"
                        iosHeader="Room Type"
                        Icon={<Icon name="md-arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChangeOne.bind(this)}
                        >
                        <Picker.Item label="Choose Room Type" value="key0"/>
                        <Picker.Item label="Deluxe" value="key1" />
                        <Picker.Item label="Platinum" value="key2" />
                        </Picker>
                    </View>
                </View>
                <View>
                <MyText style={[textGrey, {marginTop: 30}]}>
                        Check That You Have Enough Beds To Accommodate All Your Guests Comfortably
                    </MyText>
                </View>
                <View>
                    <ListProperty title="Guest"/>
                    <ListProperty title="Beds"/>
                    <ListProperty title="Bedroom"/>
                    <ListProperty title="Bathroom"/>
                </View>
                <View style={{marginTop: 40}}>
                    <MyText style={textGrey}>
                    Are You Listing As A Part Of A Company?
                    </MyText>
                    <View style={picker}>
                        <Picker
                        mode="dropdown"
                        iosHeader="Room Type"
                        Icon={<Icon name="md-arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChangeTwo.bind(this)}
                        >
                        <Picker.Item label="Choose Category" value="key0"/>
                        <Picker.Item label="Yes, I Am Listing As A Company" value="key1" />
                        <Picker.Item label="No, I Am A Private Individual" value="key2" />
                        </Picker>
                    </View>
                </View>
                <View style={button}>
                <CustomButton buttonText="Next" onPress={this.LocationScreen}/>
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
  picker: {
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      borderColor: colors.lightGreyOne,
      marginTop: 10,
  },
  rowContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGreyOne,
      height: 50,
      paddingTop: 20,
  },
  button: {
      marginTop: 50,
       marginBottom: 86,
    },
});

export default ListPropertyScreen;
