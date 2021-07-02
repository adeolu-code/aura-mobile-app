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
import IntlPhoneInput from 'react-native-intl-phone-input';


class CountryPickerNew extends Component {
  constructor(props) {
    super(props);
    this.state = { countryCode: '', showCountryPicker: false, country: null };
  }
  openModal = () => {
    this.setState({ showCountryPicker: true });
  }
  closeModal = () => {
    this.setState({ showCountryPicker: false });
  }
  onChangeText = ({dialCode, unmaskedPhoneNumber, phoneNumber, isVerified}) => {
    console.log(dialCode, unmaskedPhoneNumber, phoneNumber, isVerified);
  };

  onSelect = (country) => {
    console.log(country, country.callingCode[0]);
    this.setState({ country, countryCode: country.cca2, callingCode: country.callingCode[0] });
    // this.setState({ country });

    this.props.getCountry(country);
  }

  renderValue = () => {
    const { country } = this.state;
    const { flexRow, textWhite,textH4Style, textGrey, textDarkGrey, textLightBlack } = GStyles;
    if(country) {
      return (
        <MyText style={[textH4Style, { color: colors.closeBlack }]}>{country.name}</MyText>
      )
    }
    return (<MyText style={[textH4Style, { color: 'rgba(99, 99, 99, 0.7)'}]}>Select Country</MyText>)
  }

  componentDidMount = async () => {
    const countries = await getAllCountries()
    const country = countries.find(item => item.cca2 === 'NG')
    this.setState({ country, countryCode: country.cca2, callingCode: country.callingCode[0] });
    // console.log('Country ', country)
  }
  componentDidUpdate = (prevProps, prevState) => {
    // if(prevProps.defaultCountry !== this.props.defaultCountry) {
    //   this.setState({ country: this.props.defaultCountry })
    // }
  }
  
  render() {
    const { flexRow, textWhite,textH4Style, textGrey } = GStyles;
    const { pickerContainer, touchContainer, container} = styles;
    const { country } = this.state
    return (
      <View style={container}>
        {/* <View>
          <MyText style={[textH4Style, textGrey, { marginBottom: 10}]}>Country</MyText>
        </View> */}
        <View style={[flexRow, pickerContainer]}>
          
          <CountryPicker onSelect={this.onSelect}
            countryCode={this.state.countryCode}
            translation='eng' placeholder=" " 
            // withCallingCode={true} 
            // withFilter={true}  
            //   withFlagButton={true}  withCloseButton={true} 
            //   containerButtonStyle={{ marginHorizontal: 0 }}
            //   withFlag={true} 
            //   withAlphaFilter={true} 
                preferredCountries={['NG']}
                withCallingCodeButton
            //   onClose={this.closeModal}
            //   visible={this.state.showCountryPicker} 
              />
              
              {/* <Icon name="chevron-down" type="Feather" color={country ? colors.grey : 'rgba(99, 99, 99, 0.7)' } style={{ color: colors.grey, fontSize: 22, marginLeft: 10}}  /> */}
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      width: '100%', flex: 1
    },
    pickerContainer: {
        display: 'flex', alignItems: 'flex-end', flex: 1,  justifyContent: 'center', 
        // backgroundColor: colors.greyWhite,
        // backgroundColor: '#F8F8F8',
        backgroundColor: colors.white, 
        position: 'relative', height: 50,
        // borderWidth: 1,
        
        paddingBottom: 8
    },
    touchContainer: {
      position: 'absolute', top: 0, left: 0,
      width: '100%', backgroundColor: colors.white, 
      flexDirection: 'row', height: '100%', alignItems: 'center', zIndex: 2, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 15
    }
});

export { CountryPickerNew };
