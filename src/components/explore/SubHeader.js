import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import { MyText } from '../../utils/Index';


class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { textH2Style, textExtraBold, textBold, textLgStyle, textH5Style, textGrey, textH4Style, 
        textH3Style, textDarkGrey } = GStyles
    const { title } = this.props
    return (
      <View style={styles.container}>
        <MyText style={[textH2Style, textExtraBold]}>{title}</MyText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginVertical:20, marginBottom: 30
    }
});

export default SubHeader;
