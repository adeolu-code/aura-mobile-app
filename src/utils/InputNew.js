/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity, Platform
} from 'react-native';
import {Icon} from 'native-base';
import {MyText} from './MyText';
import { Spinner } from './Spinner'
import GStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';

class CustomInputNew extends Component {
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
  renderImage = () => {
    const {iconName, imgUrl } = this.props;
    if(iconName || imgUrl) {
        return (
            <View style={styles.showImgContainerStyle}>
                {iconName ? <Icon name={iconName || 'user'} type="Feather" style={{ color: 'rgba(125, 149, 182, 1)', fontSize: 24 }} /> : 
                <View>
                    <Image source={imgUrl} style={{ width: 20, height: 20 }} resizeMode="contain" />
                </View>}
            </View>
        )
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
      placeholderColor, disabled, textAlignVertical, multiline
    } = this.props;
    // const inputImgStyle = imageUrl || iconName ? '' : InputWithImgStyle;
    const paddingRight = password ? '' : inputRightPadding;
    const keyboard = this.props.keyType ? this.props.keyType : 'default';
    return (
      <View style={styles.container}>
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
            multiline={multiline}
            placeholderTextColor={placeholderColor || 'rgba(99, 99, 99, 0.7)'} textAlignVertical={textAlignVertical || "center"}
          />
          {this.renderImage()}
          {/* {this.renderShow()} */}
          {disabled ? <View style={overlay}></View> : <></>}
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1, borderRadius: 6, paddingHorizontal: 15, paddingTop: 10, borderColor: colors.lightGrey,
    backgroundColor: 'rgba(215, 228, 248, 0.05)'
  },
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
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
    fontSize: 17,
    color: colors.darkGrey,
    fontFamily: Platform.OS === 'ios' ? 'Nunito-Regular' : 'Nunito-bold',
    // paddingHorizontal: 15,
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
    bottom: 0,
    height: 50,
    width: 35,
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

export { CustomInputNew };
