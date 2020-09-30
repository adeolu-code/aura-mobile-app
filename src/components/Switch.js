/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform} from 'react-native';
import {Icon} from 'native-base';
import colors from '../colors';


class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: false,
      };
}

handleSwitchToggle = () => {
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
        active: !this.state.active,
    });
}
  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={{
                    backgroundColor: this.state.active ? colors.green : colors.lightGrey,
                    borderRadius: 15,
                    height: 30,
                    width: 80,
                    }}>
                <TouchableOpacity style={{
                    height: 26,
                    width: 26,
                    borderRadius: 15,
                    backgroundColor: colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: this.state.active ? 'flex-end' : 'flex-start',
                    overflow: 'hidden',
                    marginTop: 2,
                    marginBottom: 2,
                    marginLeft: 2,
                    marginRight: 2,
                    }}
                    onPress={this.handleSwitchToggle}>
                    <Icon type={this.state.active ? 'AntDesign' : 'Feather'} name={this.state.active ? 'check' : 'x' } style={{color: this.state.active ? colors.green : colors.lightGrey,
                    fontSize: this.state.active ? 14 : 14}}/>
                </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
});

export default Switch;
