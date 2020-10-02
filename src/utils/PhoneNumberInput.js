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
import CountryPicker, { DARK_THEME, getAllCountries } from 'react-native-country-picker-modal';
import {Icon} from 'native-base';
import {MyText} from './MyText';
import GStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';

class PhoneNumberInput extends Component {
  state = { secure: true, country: '', cca2: 'NG', countryCode: 'NG', callingCode: "234", showCountryPicker: false };

  componentDidMount = () => {
    getAllCountries().then((countries) => {
      // console.log(countries)
      const country = countries.find((c) => (c.cca2 === this.state.cca2));
      this.props.getCountry(country)
    });
  }
  openModal = () => {
    this.setState({ showCountryPicker: true })
  }
  closeModal = () => {
    console.log('closed')
    this.setState({ showCountryPicker: false })
  }
  onSelect = (country) => {
    console.log(country, country.callingCode[0])
    this.setState({ country, countryCode: country.cca2, callingCode: country.callingCode[0] })
    this.props.getCountry(country)
  }
  _onChangeText = (updatedValue) => {
      const { attrName, onChangeText } = this.props; 
      onChangeText(attrName, updatedValue)
  }

  renderCountryPicker = () => {
    const { flexRow, textWhite,textH4Style } = GStyles
    const { pickerContainer } = styles
    return (
      <View style={[flexRow, pickerContainer]}>
        <CountryPicker onSelect={this.onSelect}
            translation='eng' countryCode={this.state.countryCode} withCallingCode={true} withFilter={true} withCallingCodeButton={false} 
            withFlagButton={true}  withCloseButton={true} containerButtonStyle={{ marginHorizontal: 0}}
            // withAlphaFilter={true}  
            onClose={this.closeModal} 
            visible={this.state.showCountryPicker} />
        <Icon name="chevron-down-outline" style={{ color: colors.grey, fontSize: 25}}  />
      </View>
    )
  }

  
  render() {
    const {
      InputContainerStyles,
      inputStyle,
      InputWithImgStyle,
      inputRightPadding,
      lStyles,
      lTextStyles, phoneContainer
    } = styles;
    const {textH4Style, flexRow} = GStyles;
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
            <MyText style={[lTextStyles, textH4Style]}>{label}</MyText>
          </MyText>
        ) : (
          <MyText></MyText>
        )}
        <View style={[flexRow, phoneContainer]}>
          {this.renderCountryPicker()}
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
            
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  InputContainerStyles: {
    display: 'flex',
    position: 'relative',
    // width: '100%',
    flex: 3.5
  },
  inputStyle: {
    height: 55,
    width: '100%',
    borderRadius: 5,
    // borderColor: colors.lightGrey,
    // borderWidth: 1,
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
  lStyles: {
    color: colors.grey,
    marginBottom: 10,
  },
  lTextStyles: {
    paddingRight: 10,
  },
  pickerContainer: {
    display: 'flex', alignItems: 'center', flex: 1,  justifyContent: 'center', 
    // backgroundColor: colors.greyWhite,
    backgroundColor: '#F8F8F8'
  },
  phoneContainer: {
    borderWidth: 1, borderRadius: 5, borderColor: colors.lightGrey,overflow: 'hidden'
  }
});

export {PhoneNumberInput};
