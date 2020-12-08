import React, { Component } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../../colors';
import PlaceHolderComponent from '../../components/PlaceHolderComponent';
import { AppContext } from '../../../AppProvider';
import BookingsScreen from '../bookings/bookingsScreen';

class Index extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const description = `Information about all your trips and bookings are here.`;
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <ScrollView>
            {
              !this.context.state.isLoggedIn || !this.context.state.userData ?
              <PlaceHolderComponent {...this.props} title="Bookings" description={description} img={require('../../assets/images/booking/booking.png')} {...this.props} />
              :
              <BookingsScreen {...this.props} />
            }
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});

export default Index;
