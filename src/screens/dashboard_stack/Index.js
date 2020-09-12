import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MyText, CustomButton } from '../../utils/Index';
import colors from '../../colors';
import GStyles from '../../assets/styles/GeneralStyles';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const description = `Keep track and manage all your listings and guests’ bookings here when you become a host.`
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
          <ScrollView>
            <PlaceHolderComponent title="Dashboard" description={description} img={require('../../assets/images/dash/dash.png')} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default Index;
