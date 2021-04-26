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

class CountryPickerComponent extends Component {
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
  onSelect = (country) => {
    // console.log(country, country.callingCode[0]);
    // this.setState({ country, countryCode: country.cca2, callingCode: country.callingCode[0] });
    this.setState({ country });

    this.props.getCountry(country);
  }

  renderValue = () => {
    const { country } = this.state;
    const { flexRow, textWhite,textH4Style, textGrey, textDarkGrey } = GStyles;
    if(country) {
      return (
        <MyText style={[textH4Style, textDarkGrey]}>{country.name}</MyText>
      )
    }
    return (<MyText style={[textH4Style, textGrey]}>Select Country</MyText>)
  }

  componentDidMount = () => {
    
  }
  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.defaultCountry !== this.props.defaultCountry) {
      this.setState({ country: this.props.defaultCountry })
    }
  }

  render() {
    const { flexRow, textWhite,textH4Style, textGrey } = GStyles;
    const { pickerContainer, touchContainer, container} = styles;
    return (
      <View style={container}>
        <View>
          <MyText style={[textH4Style, textGrey, { marginBottom: 10}]}>Country</MyText>
        </View>
        <View style={[flexRow, pickerContainer]}>
          
          <CountryPicker onSelect={this.onSelect}
              translation='eng' countryCode={this.state.countryCode} withCallingCode={true} withFilter={true}  
              withFlagButton={true}  withCloseButton={true} 
              containerButtonStyle={{ marginHorizontal: 0 }}
              // withAlphaFilter={true}  
              placeholder="" preferredCountries={['NG']}
              withCountryNameButton
              onClose={this.closeModal}
              visible={this.state.showCountryPicker} />
          {/* <Icon name="chevron-down-outline" style={{ color: colors.grey, fontSize: 25}}  /> */}
          <TouchableOpacity style={[touchContainer, this.props.touchWrapper]} onPress={this.openModal}>
            {this.renderValue()}
            <Icon name="chevron-down-outline" style={{ color: colors.grey, fontSize: 22, marginLeft: 10}}  />
          </TouchableOpacity>
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
        display: 'flex', alignItems: 'center', flex: 1,  justifyContent: 'center', 
        // backgroundColor: colors.greyWhite,
        // backgroundColor: '#F8F8F8',
        backgroundColor: colors.white, 
        position: 'relative',
        // borderWidth: 1
    },
    touchContainer: {
      position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: colors.white, 
      flexDirection: 'row', height: '100%', alignItems: 'center', zIndex: 2, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10
    }
});

export { CountryPickerComponent };
