/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Image, ScrollView } from 'react-native';
import colors from '../../colors';
import { CustomInput, MyText, CustomButton } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import Header from '../../components/Header';
import { AppContext } from '../../../AppProvider';
import { setContext } from '../../utils';

class signUp extends Component {
  //import AppContext
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setContext(this.context);
    /**
     * can access global context using this.context.state[value] || can set using this.context.set({v:v})
     * any value set in this page can be accessed globally.. even functions :D
     * e.g
     * **/
    console.log(this.context.state.name)
    /**
     * using the setContext function cos, sometimes i need to access data in the context or change stuff in 
     * the context  e.g onLogout reset context to default value
     * so i save the current context object locally in the utils.js file as the file is not a react component
     */
  }

  OtpScreen = () => {
    //temporary, afer this check my pages booking inbox... content rendered should be different
    this.context.set({isLoggedIn: true});
    //
    this.props.navigation.navigate('Otp');
  }
  render() {
    // eslint-disable-next-line prettier/prettier
    const { textWhite, textBold, textExtraBold, textH1Style } = GStyles;
    const {inputContainer } = styles
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <Header title="Sign Up With Email" {...this.props} />
          <ScrollView>
            <View style={styles.container}>
              {/* <View><Image
                source={require('../../assets/images/icons/cheveron-left/cheveron-left.png')}
              /></View>
              <View style={{ paddingTop: 20 }}><MyText style={[textExtraBold, textH1Style]}>Sign Up With Email</MyText></View> */}
              <View style={inputContainer}>
                <CustomInput placeholder='First Name' label="First Name" />
              </View>
              <View style={inputContainer}>
                <CustomInput placeholder='Last Name' label="Last Name" />
              </View>
              <View style={inputContainer}>
                <CustomInput placeholder='Email' label="Email" />
              </View>
              <View style={inputContainer}>
                <CustomInput label="Phone Number" />
              </View>
              <View style={inputContainer}>
                <CustomInput password secureTextEntry placeholder='Password' label="Password" />
              </View>
              <View style={{ paddingTop: 50 }}>
                <CustomButton onPress={this.OtpScreen} buttonText="Sign Up With Email"/>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 40, paddingTop: 140,
    flex: 1,
  },
  fnStyle: {
    color: colors.grey,
    paddingTop: 10,
  },
  lnStyle: {
    color: colors.grey,
    paddingTop: 10,
  },
  emailStyle: {
    color: colors.grey,
    paddingTop: 10,
  },
  phoneStyle: {
    color: colors.grey,
    paddingTop: 10,
  },
  passwordStyle: {
    color: colors.grey,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 30
  }
});

export default signUp;
