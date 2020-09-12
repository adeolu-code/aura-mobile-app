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
              <MyText style={[textExtraBold, textH1Style]}>Dashboard</MyText>
              <MyText>
                Keep track and manage all your listings and guests’ bookings
                here when you become a host.
              </MyText>
            </View>
            <View style={{paddingTop: 55}}>
              <Image source={require('../../assets/images/dash/dash.png')} />
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
    paddingTop: 105,
  },
  btnText: {color: '#378915', fontSize: 14},
});

export default Index;
