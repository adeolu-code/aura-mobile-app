import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import colors from '../../colors';
import GStyles from '../../assets/styles/GeneralStyles';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';
import { Header, Content, Container, Text, View } from 'native-base';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const description = `Keep track and manage all your listings and guests’ bookings here when you become a host.`
    return (
      <Container>
        <Content>
          <PlaceHolderComponent title="Dashboard" description={description} img={require('../../assets/images/dash/dash.png')} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default Index;
