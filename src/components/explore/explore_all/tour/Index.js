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
        <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Tour Guides & Experiences On Aura</MyText>
        <View style={contentContainer}>
          <ItemComponent title="Kongo Mountains" price="₦ 10, 000 / person" location="Jos" verified
          img={require('../../../../assets/images/photo/pic.png')} />
          <ItemComponent title="LaCampagne Tropicana" price="₦ 5,000 / person" location="Lagos" 
          img={require('../../../../assets/images/photo/pic3.png')} />
          <ItemComponent title="Sea World" price="₦ 7,000 / person" location="Abuja" verified
          img={require('../../../../assets/images/photo/pic4.png')} />
          <ItemComponent title="Sea World" price="₦ 9,000" location="Lagos" 
          img={require('../../../../assets/images/photo/pic5.png')} />
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
