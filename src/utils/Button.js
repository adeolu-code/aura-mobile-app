import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image, Pressable} from 'react-native';
import GeneralStyles from '../assets/styles/GeneralStyles';
import {Spinner} from './Spinner';
import {MyText} from './MyText';
import {Icon} from 'native-base';
import colors from '../colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils';

class CustomButton extends Component {
  renderImage() {
    const {buttonImg, iconName, iconType, iconStyle, socialImg} = this.props;
    const {imageContainerStyle, buttonIconStyle} = styles;
    if (buttonImg) {
      return (
        <View style={imageContainerStyle}>
          <Image source={buttonImg} resizeMode="contain" />
        </View>
      );
    }
    
    if (iconName) {
      return (
        <View style={imageContainerStyle}>
          <Icon
            name={iconName}
            type={iconType || 'Feather'}
            style={[buttonIconStyle, iconStyle]}
          />
        </View>
      );
    }
  }
  renderSocialImg = () => {
    const {socialImg} = this.props;
    const {imgSocialStyle} = styles;
    if (socialImg) {
      return (
        <View style={imgSocialStyle}>
          <Image source={socialImg} resizeMode="contain" />
        </View>
      );
    }
  }
  renderSpinnerOrText() {
    const {loading, spinnerColor, textStyle, buttonText} = this.props;
    const {buttonTextStyles} = styles;
    const {textH4Style, textWhite} = GeneralStyles;
    const color = spinnerColor ? spinnerColor : 'rgb(248,106,39)';
    if (loading) {
      return <Spinner color={color} size={25} />;
    }
    return <MyText style={[buttonTextStyles, textStyle]}>{buttonText} </MyText>;
  }
  render() {
    const {
      containerStyle,
      touchableContainerStyle,
      contentContainer,
      disabledStyles,
    } = styles;
    const {centerContentStyle} = GeneralStyles;
    const {
      onPress,
      disabled,
      loading,
      buttonStyle,
      onPressOut,
      onPressIn,
      onLongPress,
    } = this.props;
    const buttonDisabled = disabled || loading ? true : false;
    const buttonDisabledStyle = disabled || loading ? disabledStyles : '';
    return (
      <View style={[containerStyle]}>
        <Pressable
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onLongPress={onLongPress}
          disabled={buttonDisabled}
          style={[touchableContainerStyle,buttonDisabledStyle, centerContentStyle, buttonStyle]}>
          {this.renderSocialImg()}
          <View style={contentContainer}>
            
            {this.renderSpinnerOrText()}
            {this.renderImage()}
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
  },
  touchableContainerStyle: {
    paddingTop: 10, paddingBottom: 13,
    // borderWidth: 3,
    borderRadius: 6,
    backgroundColor: colors.orange,
    
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyles: {
    color: colors.white,
    fontSize: SCREEN_WIDTH <= 360 || SCREEN_HEIGHT <= 667 ? 14 : 17, 
    fontFamily: 'Nunito-SemiBold'
  },
  imageContainerStyle: {
    marginLeft: 10,
    display: 'flex',
    justifyContent: 'flex-end',
    // paddingBottom: 4,
  },
  imgSocialStyle: {
    position: 'absolute', left: 15
  },
  buttonIconStyle: {
    fontSize: 25,
    color: colors.white,
  },
  disabledStyles: {
    opacity: 0.6,
  },
});

export {CustomButton};
