/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  
} from "react-native";
import colors from "../../../colors";
import { CustomInput, MyText, CustomButton } from "../../../utils/Index";
import GStyles from "../../../assets/styles/GeneralStyles";
import { Icon, Picker } from 'native-base';

import ListGuest from './ListGuest';
import RadioButton from './RadioButton';
import BottomMenuComponent from "./BottomMenuComponent";

class TourModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selected: "key0",
      };
  }
 
onValueChange(value: string) {
    this.setState({
      selected: value
    });
}

  render() {
    const options = [
        {
            key: 'one',
            text: 'Morning Tour (Starts 8:00 am)',
        },
        {
            key: 'two',
            text: 'Afternoon Tour (Start 1:00 pm)',
        },
        {
            key: 'three',
            text: 'Evening Tour (Start 5:00 pm)',
        },
        
    ];
    const { visible, onDecline } = this.props;
    const { textH2Style, textExtraBold, textDarkBlue,textH3Style, textH6Style, textGrey, textH4Style, flexRow, textSuccess } = GStyles;
    const { modalHeader, closeContainer, modalContainer, modalBody,
      buttonContainer, modalBodyStyle, divider, picker } = styles
    return (
      
        <Modal visible={visible} transparent onRequestClose={() => {}} animationType="slide">
        <View style={modalContainer}>
            <View style={[modalHeader, {flex: 1}]} >
                <View style={{flex: 9, alignItems: 'center'}}>
                    <MyText style={[textH2Style, textExtraBold, textDarkBlue]}>Book Tour Date</MyText>
                </View>
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={onDecline} style={closeContainer}>
                    <Icon type="Feather" name="x" />
                </TouchableOpacity>
              </View>
            </View>
        <ScrollView>
            <View style={modalBodyStyle}>
                    <MyText style={[textH3Style, textExtraBold, textDarkBlue]}>Select A Date For Your Tour</MyText>
                <View style={{marginTop: 20}}>
                    <MyText style={[textGrey, textH6Style]}>
                        Pick A Date
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
            </View>
            <View style={divider}></View>
                <View style={[modalBody]}>
                    <MyText style={[textH3Style, textExtraBold, textDarkBlue]}>Tour Time</MyText>
                    <MyText style={[textGrey, textH6Style, {paddingTop: 5}]}>
                        Choose the best time for you to take your tour
                    </MyText>
                    <View style={{paddingTop: 20}}>
                        <RadioButton options={options}/>
                    </View>
                </View>
            <View style={divider}></View>
            <View style={modalBody}>
                <MyText style={[textH3Style, textExtraBold, textDarkBlue]}>Number Of Guests</MyText>
                <MyText style={[textGrey, textH6Style, {paddingTop: 5, paddingBottom: 5}]}>
                    How many guests will be going on his tour
                </MyText>
                <ListGuest title='Guests'/>
            </View>
            <View style={divider}></View>
            <View style={[modalBody, {marginBottom: 50}]}>
                <View style={[flexRow, {justifyContent: 'space-between'}]}>
                    <MyText style={[textDarkBlue, textH4Style]}>Amount</MyText>
                    <MyText style={[textH3Style, textExtraBold, textSuccess]}>₦ 200,341 / person</MyText>
                </View>
                <View style={[flexRow, {justifyContent: 'space-between', marginTop: 30}]}>
                    <MyText style={[textDarkBlue, textH4Style]}>Total Amount</MyText>
                    <MyText style={[textH3Style, textExtraBold, textSuccess]}>₦ 400,682</MyText>
                </View>
            </View>
        </ScrollView>
        <View style={buttonContainer}>
                <BottomMenuComponent title='Book Date' price='₦ 400,682' />
            </View>        
          </View>
        </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, width: '100%', backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: "row", paddingHorizontal: 20, borderBottomWidth: 0.8, elevation: 2,
    paddingVertical: 20, position: 'absolute', top: 0,zIndex: 4, width: '100%', backgroundColor: colors.white,
    borderBottomColor: colors.lightGreyOne,
    // borderWidth: 1
  },
  logoContainer: { width: 70, height: 25 },
  closeContainer: {
    // width: 50, height: 50
  },
  modalBodyStyle: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 90,
  },
  modalBody: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 30
  },
  buttonContainer: {
    
  },
  dashContainer: {
    flexDirection: "row", flex: 1,marginTop: 40, marginBottom: 20, alignItems: "center",justifyContent: "center",
  },
  dashStyles: {
    height: 1, backgroundColor: colors.lightGrey, flex: 1
  },
  socialContainer: {

  },
  accountStyle: {
    marginBottom: 90, marginTop: 70, alignSelf: 'center'
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    borderColor: colors.lightGreyOne,
    marginTop: 10,
},
divider: {
    height: 1, backgroundColor: colors.lightGrey,
    marginTop: 30,
    width: '100%'
    },
    radio: {
        flex: 1,
        height: 40,
    }
});

export default TourModal;
