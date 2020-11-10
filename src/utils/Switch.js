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
  const { value } = this.props
  const active = !!value
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  this.props.onPress(!active)
  // this.setState(() => ({ active: !this.state.active }), 
  // () => {
  //   this.props.onPress(this.state.active)
  // });
}
  render() {
    const { value } = this.props
    const active = !!value
    return (
      <View style={{ flex: 1}}>
        <TouchableOpacity onPress={this.handleSwitchToggle} style={{ backgroundColor: active ? colors.green : colors.lightGrey,
          borderRadius: 15, height: 30,width: 60,
        }}>
          <View style={{height: 26, width: 26,
              borderRadius: 15,
              backgroundColor: colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: active ? 'flex-end' : 'flex-start',
              overflow: 'hidden',
              marginTop: 2,
              marginBottom: 2,
              marginLeft: 2,
              marginRight: 2,
              }}
              >
              <Icon type='Feather' name={active ? 'check' : 'x' } style={{color: active ? colors.green : colors.lightGrey,
              fontSize: 14}}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export {Switch};
