/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';


class LocationScreen extends Component {
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
AmenitiesScreen = () => {
    this.props.navigation.navigate('Amenities');
  }

  render() {
    const { container, picker, button, imageView, iconStyle, input } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH5Style, textH6Style} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title={"Where Is Your Place\nLocated"} />
          <ScrollView style={container}>
            <View>
                <View style={{marginTop: 18}}>
                    <MyText style={textGrey}>
                        Guests will only get your exact address once they’ve booked a reservation
                    </MyText>
                    <TouchableOpacity style={{marginTop: 44}}>
                        <View style={[flexRow]}>
                            <View style={[imageView]}>
                                <Icon type="FontAwesome" name="location-arrow" style={iconStyle} />
                            </View>
                            <View style={{marginLeft: 20, justifyContent: 'center'}}>
                                <MyText style={[textOrange, textH5Style, textBold,textUnderline]}>
                                    Use Present Location
                                </MyText>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{marginTop: 45}}>
                        <MyText style={[textGrey, textH6Style]}>
                            Are You Listing As A Part Of A Company?
                        </MyText>
                        <TextInput style={input}/>
                    </View>
                    <View style={{marginTop: 30}}>
                        <View style={[flexRow, {flex: 1, marginBottom: 30}]}>
                                <View style={{flex: 1, marginRight: 10}}>
                                    <Input label="Country" />
                                </View>
                                <View style={{flex: 1, marginLeft: 10}}>
                                    <Input label="State" />
                                </View>
                        </View>
                        <View style={[flexRow, {flex: 1}]}>
                                <View style={{flex: 1, marginRight: 10}}>
                                    <Input label="City" />
                                </View>
                                <View style={{flex: 1, marginLeft: 10}}>
                                    <Input label="Zip Code" />
                                </View>
                        </View>
                    </View>
                    {/* <View style={picker}>
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
                    </View> */}
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" onPress={this.AmenitiesScreen}/>
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
      marginTop: 150,
       marginBottom: 86,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.orange,
        borderRadius: 25,
        height: 25,
        width: 25,
    },
    iconStyle: {
        fontSize: 20,
        color: colors.orange,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 80,
        borderColor: colors.lightGreyOne,
        marginTop: 10,
    },
});

export default LocationScreen;
