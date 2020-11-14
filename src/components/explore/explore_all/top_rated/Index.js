import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText } from '../../../../utils/Index';

import { Icon } from 'native-base';
import ScrollContent from './ScrollContent';
import ScrollContentFood from './ScrollContentFood';
import ScrollContentPhotograph from './ScrollContentPhotograph';
import ScrollContentTour from './ScrollContentTour';
import ExploreLocation from '../ExploreLocation';



import colors from '../../../../colors';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  
  linkToFood = () => {
    this.props.link('two')
  }
  linkToHouse = () => {
    this.props.link('three')
  }
  linkToPhoto = () => {
    this.props.link('four')
  }
  linkToTour = () => {
    this.props.link('five')
  }

  render() {
    const { contentMainContainer } = styles
    return (
      <Fragment>
        <ScrollView style={contentMainContainer}>
          {/* <ExploreLocation /> */}
          <View>
            <ScrollContent heading="Top Apartments & Hotels" onPress={this.linkToHouse} />
            <ScrollContentFood heading="Top Restaurants" onPress={this.linkToFood} />
            <ScrollContentPhotograph heading="Top Photographers" onPress={this.linkToPhoto} />
            <ScrollContentTour heading="Top Tour Guides" noDivider onPress={this.linkToTour} />
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  contentMainContainer: {
      marginTop:180,
  },
  container: {
    paddingHorizontal: 20
  },
  contentContainer: {
    paddingVertical: 30
  },
});

export default Index;
