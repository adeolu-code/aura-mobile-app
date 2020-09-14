import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, Image, ScrollView } from 'react-native';
import colors from '../../colors';
import { CustomInput, MyText, CustomButton } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';

class signUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { textWhite, textBold, textExtraBold, textH1Style } = GStyles;
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <ScrollView>
            <View style={styles.container}>
              <View><Image
                source={require('../../assets/images/icons/cheveron-left/cheveron-left.png')}
              /></View>
              <View style={{ paddingTop: 20 }}><MyText style={[textExtraBold, textH1Style]}>Sign Up With Email</MyText></View>
              <View>
                <MyText style={styles.fnStyle}>First Name</MyText>
                <CustomInput placeholder='First Name' />
              </View>
              <View>
                <MyText style={styles.lnStyle}>Last Name</MyText>
                <CustomInput placeholder='Last Name' />
              </View>
              <View>
                <MyText style={styles.emailStyle}>Email</MyText>
                <CustomInput placeholder='Email' />
              </View>
              <View>
                <MyText style={styles.phoneStyle}>Phone Number</MyText>
                <CustomInput />
              </View>
              <View>
                <MyText style={styles.passwordStyle}>Password</MyText>
                <CustomInput password secureTextEntry placeholder='Password' />
              </View>
              <View style={{ paddingTop: 50 }}>
                <CustomButton buttonText="Sign Up With Email" />
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
    paddingHorizontal: 24,
    paddingVertical: 40,
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
});

export default signUp;
