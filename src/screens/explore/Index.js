import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {MyText, CustomButton, CustomInput} from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {headerBg} = styles;
    const {textWhite, textBold, textH1Style, textExtraBold} = GStyles;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <ImageBackground
            source={require('../../assets/images/mask/mask.png')}
            style={[headerBg]}>
            <MyText style={[textWhite, textExtraBold, textH1Style]}>
              Book unique places
            </MyText>
            <MyText style={[textWhite]}>to stay and things to do</MyText>
          </ImageBackground>

          <CustomButton
            buttonText="button"
            iconName="md-arrow-forward-outline"
            iconType="Ionicons"
          />
          <CustomInput
            label="Login"
            placeholder="login Details"
            secureTextEntry
            password
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerBg: {
    width: '100%',
    height: 300,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default Index;
