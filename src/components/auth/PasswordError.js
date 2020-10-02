import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';

class PasswordError extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [
        { title: 'capitalLetter', description: 'Password should contain at least a capital letter', resolved: false},
        { title: 'smallLetter', description: 'Password should contain at least a small letter', resolved: false},
        { title: 'numberDigit', description: 'Password should contain at least a digit', resolved: false},
        { title: 'specialCharacter', description: 'Password should contain at least a special character', resolved: false}
    ]};
  }

  renderErrors = () => {
      const { errors } = this.state;
      const { iconStyle, errorRow, errorContainer } = styles
      const { textWhite, textBold, textExtraBold, textH1Style, flexRow, textH5Style, textSuccess, textGrey } = GStyles;

      return errors.map((item, i) => {
          return (
            <View style={[flexRow, errorRow]} key={i}>
                <Icon type="Feather" name={item.resolved ? "check" : "x"} style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>{item.description}</MyText>
            </View>
          )
      })
  }

  render() {
    const { textWhite, textBold, textExtraBold, textH1Style, flexRow, textH5Style, textSuccess, textGrey } = GStyles;
    const { iconStyle, errorRow, errorContainer } = styles
    return (
      <View>
        <View style={errorContainer}>
            {this.renderErrors()}
            {/* <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a capital letter</MyText>
            </View>
            <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a small letter</MyText>
            </View>
            <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a digit</MyText>
            </View>
            <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a special character</MyText>
            </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    iconStyle: {
        fontSize: 14, color: colors.secondary, marginRight: 4, marginBottom: -2
    }, 
    errorRow: {
        alignItems: 'center',marginBottom: 5
    },
    errorContainer: {
        marginTop: 10
    }
});

export default PasswordError;
