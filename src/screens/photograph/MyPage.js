import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import Header from '../../components/Header';
import SinglePageHeader from '../../components/explore/photo_single/Header';


import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';


import { AppContext } from '../../../AppProvider';
import { urls, GetRequest, errorMessage } from '../../utils';

import { formatAmount } from '../../helpers'

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: ''};
    this.state.profile = props.route.params?.profile

  }

  renderLoading = () => {
    const { loading } = this.state;
    if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
  }

  render() {
    const { profile } = this.state
    const title = profile && profile.title ? profile.title : '****';
    const location = profile && profile.address ? `${profile.address.state} photoshot` : ''
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {/* <Header {...this.props} title="My Page" wrapperStyles={{ paddingBottom: 5}} /> */}
        <ScrollView>
          <View>
            <SinglePageHeader title={title} location={location} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default MyPage;
