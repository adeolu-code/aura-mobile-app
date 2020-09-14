import React, { Component } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import colors from '../../colors';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const description = `Information about all your trips and bookings are here.`;
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <ScrollView>
            <PlaceHolderComponent
              title="Bookings"
              description={description}
              img={require('../../assets/images/booking/booking.png')}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default Index;
