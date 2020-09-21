/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';


class ListPropertyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: "key1",
      };
    }
    onValueChange(value: string) {
      this.setState({
        selected: value
      });
  }

  render() {
    const { container, picker, rowContainer, button } = styles;
    const { textBold, textH4Style, flexRow, textGrey} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title={"List A Property In\nMinutes"} />
          <ScrollView style={container}>
            <View>
                <View style={{marginTop: 20}}>
                    <MyText style={textGrey}>
                    Choose A Type Of Property
                    </MyText>
                    <View style={picker}>
                        <Picker
                        mode="dropdown"
                        iosHeader="Choose A Type of Property"
                        Icon={<Icon name="md-arrow-down" />}
                        style={{ width: undefined }}
                        // selectedValue={this.state.selected}
                        // onValueChange={this.onValueChange.bind(this)}
                        >
                        <Picker.Item label="Choose A Type of Property"/>
                        <Picker.Item label="Item 1" value="key0" />
                        <Picker.Item label="Item 2" value="key1" />
                        <Picker.Item label="Item 3" value="key2" />
                        <Picker.Item label="Item 4" value="key3" />
                        <Picker.Item label="Item 5" value="key4" />
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
                        // selectedValue={this.state.selected}
                        // onValueChange={this.onValueChange.bind(this)}
                        >
                        <Picker.Item label="Choose Room Type"/>
                        <Picker.Item label="Item 1" value="key0" />
                        <Picker.Item label="Item 2" value="key1" />
                        <Picker.Item label="Item 3" value="key2" />
                        <Picker.Item label="Item 4" value="key3" />
                        <Picker.Item label="Item 5" value="key4" />
                        </Picker>
                    </View>
                </View>
                <View style={{marginTop: 30}}>
                    <MyText>
                        Check That You Have Enough Beds To Accommodate All Your Guests Comfortably
                    </MyText>
                    <View style={[flexRow, rowContainer]}>
                        <View style={{flex: 9}}>
                            <MyText style={[textBold, textH4Style]}>Guest</MyText>
                        </View>
                        <View style={[flexRow, {alignContent: 'flex-end'}]}>
                            <TouchableOpacity>
                            <Icon name="remove-circle" style={{color: '#FFD9B2', fontSize: 25}} />
                            </TouchableOpacity>
                            <MyText>0</MyText>
                            <TouchableOpacity>
                            <Icon name="ios-add-circle" style={{color: '#FD8323', fontSize: 25}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[flexRow, rowContainer]}>
                        <View style={{flex: 9}}>
                            <MyText style={[textBold, textH4Style]}>Beds</MyText>
                        </View>
                        <View style={[flexRow, {alignContent: 'flex-end'}]}>
                            <TouchableOpacity>
                            <Icon name="remove-circle" style={{color: '#FFD9B2', fontSize: 25}} />
                            </TouchableOpacity>
                            <MyText>0</MyText>
                            <TouchableOpacity>
                            <Icon name="ios-add-circle" style={{color: '#FD8323', fontSize: 25}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[flexRow, rowContainer]}>
                        <View style={{flex: 9}}>
                            <MyText style={[textBold, textH4Style]}>Bedroom</MyText>
                        </View>
                        <View style={[flexRow, {alignContent: 'flex-end'}]}>
                            <TouchableOpacity>
                            <Icon name="remove-circle" style={{color: '#FFD9B2', fontSize: 25}} />
                            </TouchableOpacity>
                            <MyText>0</MyText>
                            <TouchableOpacity>
                            <Icon name="ios-add-circle" style={{color: '#FD8323', fontSize: 25}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[flexRow, rowContainer]}>
                        <View style={{flex: 9}}>
                            <MyText style={[textBold, textH4Style]}>Bathroom</MyText>
                        </View>
                        <View style={[flexRow, {alignContent: 'flex-end'}]}>
                            <TouchableOpacity>
                            <Icon name="remove-circle" style={{color: '#FFD9B2', fontSize: 25}} />
                            </TouchableOpacity>
                            <MyText>0</MyText>
                            <TouchableOpacity>
                            <Icon name="ios-add-circle" style={{color: '#FD8323', fontSize: 25}} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
                        // selectedValue={this.state.selected}
                        // onValueChange={this.onValueChange.bind(this)}
                        >
                        <Picker.Item label="Choose Category"/>
                        <Picker.Item label="Item 1" value="key0" />
                        <Picker.Item label="Item 2" value="key1" />
                        <Picker.Item label="Item 3" value="key2" />
                        <Picker.Item label="Item 4" value="key3" />
                        <Picker.Item label="Item 5" value="key4" />
                        </Picker>
                    </View>
                </View>
                <View style={button}>
                <CustomButton buttonText="Next" />
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
       marginBottom: 20,
    },
});

export default ListPropertyScreen;
