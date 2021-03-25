import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'native-base';
import { MyText } from '../utils/Index';
import GStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';

class BackHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { iconStyle, iconContainer, titleContainer, container } = styles;
    const { textH1Style, textExtraBold, textLgStyle } = GStyles
    const { title, wrapperStyles } = this.props
    return (
      <View style={[container, wrapperStyles]}>
        <TouchableOpacity style={iconContainer} onPress={this.goBack}>
            <Icon type="Feather" name="chevron-left" style={iconStyle} />
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', paddingTop: Platform.OS === 'ios' ? 30 : 20, backgroundColor: colors.white, paddingHorizontal: 20,
        position: 'absolute', top: 0, zIndex: 100, paddingBottom: 0
    },
    iconContainer:{
        marginBottom: 10, 
        // borderWidth: 1
    },
    iconStyle: {
        // borderWidth: 1, 
        padding: 0,margin: 0, fontSize: 35, marginLeft: -10
    },
    titleContainer: {

    }
});

export default BackHeader;
