import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {MyText, CustomButton} from '../../utils/Index';
import colors from '../../colors';
import GStyles from '../../assets/styles/GeneralStyles';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {textWhite, textBold, textH1Style, textExtraBold} = GStyles;
    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
          <View style={styles.container}>
            <View style={{marginTop: 30}}>
              <MyText style={[textExtraBold, textH1Style]}>Inbox</MyText>
              <MyText>
                Keep in touch with your host in real-time and get notified on
                any updates in your notifications tab.
              </MyText>
            </View>
            <View style={{paddingTop: 10}}>
              <Image source={require('../../assets/images/inbox/inbox.png')} />
            </View>
            <View style={styles.btnSection}>
              <CustomButton
                buttonText="Log In"
                buttonStyle={{
                  color: '#FD8323',
                  borderColor: '#FD8323',
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}
                textStyle={{color: '#FD8323'}}
              />

              <TouchableOpacity style={styles.register}>
                <MyText style={colors.darkBlue}>
                  Don’t have an account?{' '}
                  <MyText style={styles.btnText}>Sign Up</MyText>
                </MyText>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingLeft: 24,
    paddingRight: 25,
    flex: 1,
  },
  btnSection: {
    paddingTop: 75,
  },
  btnText: {color: '#378915', fontSize: 14},
});

export default Index;
