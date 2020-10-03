import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';

class FormError extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderErrors = () => {
    const { errorMessages } = this.props;
    console.log(errorMessages)
    const { textDanger, textH5Style } = GStyles;
    return errorMessages.map((item, i) => {
        return (
            <View key={i}>
                <MyText style={[textH5Style, textDanger]}>{item}</MyText>
            </View>
        )
    })
  }

  render() {
    const { textDanger, textH5Style } = GStyles;
    const { errorMessage } = this.props
    return (
      <View>
        {this.renderErrors()}
      </View>
    );
  }
}

export default FormError;
