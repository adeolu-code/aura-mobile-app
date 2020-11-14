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
  renderTourComingSoon = () => {
    const { comingSoonContainer, comingSoonImg } = styles
    const { imgStyle, textH3Style, textExtraBold, textOrange, textCenter } = GStyles
    return (
      <View style={comingSoonContainer}>
        <View style={comingSoonImg}>
          <Image source={require('../../../../assets/images/photo/pic3.png')} style={imgStyle} />
        </View>
        <MyText style={[textExtraBold, textH3Style, textOrange, textCenter]}>Coming Soon</MyText>
      </View>
    )
  }

  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey } = GStyles
    return (
      <View style={container}>
        <View style={contentMainContainer}>
          <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Tour Guides & Experiences On Aura</MyText>
          {this.renderTourComingSoon()}
        </View>
        {/* <TouchableOpacity style={filterContainer}>
          <MyText style={[textH4Style, textDarkGrey]}>Filters</MyText>
        </TouchableOpacity>
        <MyText style={[textH3Style, textExtraBold, { marginTop:30}]}>Tour Guides & Experiences On Aura</MyText>
        <View style={contentContainer}>
          <ItemComponent title="LaCampagne Tropicana" price="₦ 5,000 / person" location="Lagos" 
          img={require('../../../../assets/images/photo/pic3.png')} />
        </View> */}
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
  },
  contentMainContainer: {
      marginTop:180,
  },
  comingSoonContainer: {
    paddingVertical: 20
  },
  comingSoonImg: {
    height: 240, width: '100%', marginBottom: 20, borderRadius: 10, overflow: 'hidden'
  }
});

export default Index;
