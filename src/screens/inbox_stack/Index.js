import React, {Component} from 'react';
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {MyText, CustomButton} from '../../utils/Index';
import colors from '../../colors';
import GStyles from '../../assets/styles/GeneralStyles';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const description = `Keep in touch with your host in real-time and get notified on any updates in your notifications tab.`
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
          <ScrollView>
            <PlaceHolderComponent title="Inbox" description={description} img={require('../../assets/images/inbox/inbox.png')} />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Index;
