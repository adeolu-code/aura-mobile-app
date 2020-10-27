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
import {MyText} from '../../utils/MyText';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';

class Input extends Component {
  state = {secure: true};

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
  render() {
    const {
      InputContainerStyles,
      inputStyle,
      InputWithImgStyle,
      inputRightPadding,
      lStyles,
      lTextStyles, leftStyle
    } = styles;
    const {textH4Style, textH6Style, flexRow, textBold, textH3Style} = GStyles;
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
      placeholderColor,
    } = this.props;
    // const inputImgStyle = imageUrl || iconName ? '' : InputWithImgStyle;
    const paddingRight = password ? '' : inputRightPadding;
    const keyboard = this.props.keyType ? this.props.keyType : 'default';
    return (
      <View>
        {label ? (
          <MyText style={[lStyles]}>
            <MyText style={[lTextStyles, textH4Style, textBold]}>{label}</MyText>
          </MyText>
        ) : (
          <MyText></MyText>
        )}
        <View style={[flexRow, InputContainerStyles]}>
          <View style={leftStyle}>
            <MyText style={[textH3Style, { marginBottom: 4}]}>₦</MyText>
          </View>
          <TextInput
            style={[inputStyle, textInputStyle, paddingRight]}
            onChangeText={onChangeText}
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
          {this.renderShow()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  InputContainerStyles: {
    display: 'flex',
    position: 'relative',
    width: '100%', borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 5
    // flex: 1
  },
  leftStyle: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  inputStyle: {
    height: 40, flex: 4,
    borderRadius: 5,
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
    fontSize: 16,
    color: colors.darkGrey,
    fontFamily: 'Nunito-bold',
    // paddingHorizontal: 10,
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
    height: 50,
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
});

export {Input};
