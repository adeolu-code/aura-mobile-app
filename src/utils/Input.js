/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {MyText} from './MyText';
import { Spinner } from './Spinner'
import GStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';

class CustomInput extends Component {
  state = {secure: true};
  _onChangeText = (updatedValue) => {
    const { attrName, onChangeText } = this.props; 
    onChangeText(attrName, updatedValue)
}
  renderShow() {
    const {password, iconStyle} = this.props;
    const {showImgContainerStyle, inputIconStyle, showImg} = styles;
    const showUrl = !this.state.secure ? 'eye-off' : 'eye';
    if (password) {
      return (
        <TouchableOpacity
          style={showImgContainerStyle}
          onPress={() => {
            this.setState({secure: !this.state.secure});
          }}>
          <Icon
            name={showUrl}
            type="Ionicons"
            style={[inputIconStyle, iconStyle]}
          />
        </TouchableOpacity>
      );
    }
  }
  renderSpinner() {
    const {password, iconStyle, loading} = this.props;
    const {showImgContainerStyle, inputIconStyle, showImg} = styles;
    if (loading) {
      return (
        <View style={showImgContainerStyle}>
          <Spinner color={colors.orange} size={20} />
        </View>
      );
    }
  }
  render() {
    const {
      InputContainerStyles,
      inputStyle,
      InputWithImgStyle,
      inputRightPadding,
      lStyles,
      lTextStyles, overlay
    } = styles;
    const {textH4Style} = GStyles;
    const {
      placeholder,
      imageUrl,
      onChangeText,
      secureTextEntry,
      value,
      onFocus,
      onBlur,
      password,
      autoCapitalize,
      textInputStyle,
      onChange,
      iconName,
      label,
      sublabel,
      placeholderColor, disabled
    } = this.props;
    // const inputImgStyle = imageUrl || iconName ? '' : InputWithImgStyle;
    const paddingRight = password ? '' : inputRightPadding;
    const keyboard = this.props.keyType ? this.props.keyType : 'default';
    return (
      <View>
        {label ? (
          <MyText style={[lStyles]}>
            <MyText style={[lTextStyles, textH4Style]}>{label}</MyText>
          </MyText>
        ) : (
          <MyText></MyText>
        )}
        <View style={InputContainerStyles}>
          <TextInput
            style={[inputStyle, textInputStyle, paddingRight]}
            onChangeText={this._onChangeText}
            secureTextEntry={secureTextEntry && this.state.secure}
            autoCorrect={false}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            autoCapitalize={autoCapitalize || 'none'}
            placeholder={placeholder || 'Placeholder'}
            onChange={onChange}
            keyboardType={keyboard}
            placeholderTextColor={placeholderColor || 'rgba(99, 99, 99, 0.7)'}
          />
          {this.renderSpinner()}
          {this.renderShow()}
          {disabled ? <View style={overlay}></View> : <></>}
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  InputContainerStyles: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    // flex: 1
  },
  inputStyle: {
    height: 55,
    width: '100%',
    borderRadius: 5,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    fontSize: 17,
    color: colors.darkGrey,
    fontFamily: 'Nunito-bold',
    paddingHorizontal: 15,
  },
  InputWithImgStyle: {
    paddingLeft: 0,
  },
  inputRightPadding: {
    paddingRight: 20,
  },
  showImgContainerStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 55,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },
  lStyles: {
    color: colors.grey,
    marginBottom: 10,
  },
  lTextStyles: {
    paddingRight: 10,
  },
  showImg: {
    width: 22,
    height: 22,
  },
  overlay: {
      backgroundColor: 'rgba(0,0,0,0.05)', width: '100%', height: '100%', position: 'absolute', borderRadius: 5
  },
});

export {CustomInput};
