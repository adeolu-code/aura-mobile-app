/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, TextInput, checkBox } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText } from '../../utils/Index';
import {Input} from '../../components/auth/Input';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { CheckBox } from '../../components/auth/CheckBox';


class AmenitiesScreen extends Component {
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
SavedScreen = () => {
    this.props.navigation.navigate('Saved');
  }

  render() {
    const { container, picker, button, imageView, iconStyle, input, header, tiles } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH4Style, textH5Style, textH6Style, textExtraBold, textH2Style, textH3Style, textDarkBlue} = GStyles;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Amenities Available At Your Place" />
          <ScrollView style={container}>
            <View>
                <View style={{marginTop: 20}}>
                    <CheckBox title="Kitchen" />
                    <CheckBox title="WiFi" />
                    <CheckBox title="Television" />
                    <CheckBox title="Heat" />
                    <CheckBox title="Air Conditioning" />
                    <CheckBox title="Iron" />
                    <CheckBox title="Swimming Pool" />
                    <CheckBox title="Gym" />
                    <CheckBox title="Breakfast, Coffee, Tea" />
                    <CheckBox title="Desk/Workspace" />
                    <CheckBox title="Parking Space" />
                    <CheckBox title="Closet/Drawers" />
                    <CheckBox title="Private Entrance" />
                    <MyText style={[textOrange, textH5Style, textBold,textUnderline]}>
                        Add Additional Amenities
                    </MyText>
                </View>
                <View>
                    <View style={header}>
                        <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Safety Amenities</MyText>
                    </View>
                    <View style={tiles}>
                        <CheckBox title="Smoke Detector" subtitle="Check your local laws, which may require a working Smoke detector in every room"/>
                    </View>
                    <View style={tiles}>
                        <CheckBox title="Carbon Monoxide Detector" subtitle="Check your local laws, which may require a working Smoke detector in every room"/>
                    </View>
                    <View style={tiles}>
                        <CheckBox title="First Aid Kit" />
                    </View>
                    <View style={tiles}>
                        <CheckBox title="Fire Extinguisher" />
                    </View>
                    <View style={tiles}>
                        <CheckBox title="Lock On Bedroom Door" subtitle="Private room can be locked For Safety & Privacy"/>
                    </View>
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" onPress={this.SavedScreen}/>
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
//   picker: {
//       borderWidth: 1,
//       borderRadius: 5,
//       height: 50,
//       borderColor: colors.lightGreyOne,
//       marginTop: 10,
//   },
//   rowContainer: {
//       borderBottomWidth: 1,
//       borderBottomColor: colors.lightGreyOne,
//       height: 50,
//       paddingTop: 20,
//   },
    header:{
        marginTop: 40,
        marginBottom: 31,
    },
    tiles: {
        marginBottom: 20,
    },
  button: {
      marginTop: 50,
       marginBottom: 86,
    },
    // imageView: {
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderWidth: 1,
    //     borderColor: colors.orange,
    //     borderRadius: 25,
    //     height: 25,
    //     width: 25,
    // },
    // iconStyle: {
    //     fontSize: 20,
    //     color: colors.orange,
    // },
    // input: {
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     height: 80,
    //     borderColor: colors.lightGreyOne,
    //     marginTop: 10,
    // },
});

export default AmenitiesScreen;