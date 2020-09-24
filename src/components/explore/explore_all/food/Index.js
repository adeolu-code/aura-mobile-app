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
        <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Food & Restaurants On Aura</MyText>
        <View style={contentContainer}>
          <ItemComponent title="Bernandines Pancakes" price="₦ 3,000" location="Lagos" verified
          img={require('../../../../assets/images/food/food.png')} />
          <ItemComponent title="Debonairs Pizza" price="₦ 3,600" location="Lagos" 
          img={require('../../../../assets/images/food/food1.png')} />
          <ItemComponent title="Mega Chops" price="₦ 4,000" location="Lagos" verified
          img={require('../../../../assets/images/food/food2.png')} />
          <ItemComponent title="Ocean Basket" price="₦ 9,000" location="Lagos" 
          img={require('../../../../assets/images/food/food3.png')} />
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
