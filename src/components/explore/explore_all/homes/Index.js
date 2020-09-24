import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText } from '../../../../utils/Index';
import colors from '../../../../colors';

import { Icon } from 'native-base';
import ItemComponent from '../ItemComponent';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {filterContainer, container, contentContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey } = GStyles
    return (
      <View style={container}>
        <TouchableOpacity style={filterContainer}>
          <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
        </TouchableOpacity>
        <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Homes & Hotels On Aura</MyText>
        <View style={contentContainer}>
          <ItemComponent title="Umbaka Home Park" price="₦ 200,341 / night" location="Lagos" verified
          img={require('../../../../assets/images/places/bed1.png')} type="Home" />
          <ItemComponent title="Umbaka Home Park" price="₦ 200,341 / night" location="Lagos" 
          img={require('../../../../assets/images/places/bed2.png')} type="Hotel" />
          <ItemComponent title="Umbaka Home Park" price="₦ 200,341 / night" location="Lagos" verified
          img={require('../../../../assets/images/places/bed3.png')} type="Home" />
          <ItemComponent title="Umbaka Home Park" price="₦ 200,341 / night" location="Lagos" 
          img={require('../../../../assets/images/places/house.png')} type="Hotel" />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  contentContainer: {
    paddingVertical: 30
  },
  filterContainer: {
    borderRadius: 30, borderWidth:1, borderColor: colors.darkGrey, paddingHorizontal: 20, paddingTop: 4, paddingBottom:6, 
    flexDirection: 'row', alignSelf: 'flex-start', marginTop: 20
  }
});

export default Index;
