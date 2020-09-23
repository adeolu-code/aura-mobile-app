import React, {Component} from 'react';
import {ScrollView, SafeAreaView, StatusBar} from 'react-native';
import colors from '../../colors';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';
import InboxScreen from '../inbox/inboxScreen';
import { AppContext } from '../../../AppProvider';

class Index extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const description = `Keep in touch with your host in real-time and get notified on any updates in your notifications tab.`;
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
          <ScrollView>
            
            {
              !this.context.state.isLoggedIn ?
              <PlaceHolderComponent title="Inbox" description={description} img={require('../../assets/images/inbox/inbox.png')} />
              :
              <InboxScreen />
            }
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default Index;
