import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ManageOnlineRow from '../../components/dashboard/ManageOnlineRow';
import ManagePendingRow from '../../components/dashboard/ManagePendingRow';

class ManageProperties extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true, tabTwoSelected: false, tabThreeSelected: false };
  }
  

  selectTabOne = () => {
    this.setState({ tabOneSelected: true, tabTwoSelected: false, tabThreeSelected: false });
  }

  selectTabTwo = () => {
    this.setState({ tabOneSelected: false, tabTwoSelected: true, tabThreeSelected: false });
  }

  selectTabThree = () => {
    this.setState({tabOneSelected: false, tabThreeSelected: true, tabTwoSelected: false});
  }
  render() {
    const { flexRow, textGrey, textH3Style, textH4Style, textSuccess, textWhite, textH5Style,imgStyle,textExtraBold, textDarkGrey, textBold, } = GStyles;
    const { manageHeader, container, imgContainer, rightContainer, typeStyle, iconStyle, tabsContainer, tabStyle, rightTabStyle, activeTab, contentContainer, rowContainer } = styles;
    const { tabOneSelected, tabTwoSelected, tabThreeSelected } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <Header {...this.props} title="Manage Properties" wrapperStyles={{ paddingBottom: 5}} />
        <View style={manageHeader}>
            <View style={tabsContainer}>
                <TouchableOpacity style={[tabStyle, tabOneSelected ? activeTab : '']} onPress={this.selectTabOne}>
                    <MyText style={[textH5Style,textBold, tabOneSelected ? textWhite : textSuccess]}>All Properties</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={[tabStyle, tabTwoSelected ? activeTab : '']} onPress={this.selectTabTwo}>
                    <MyText style={[textH5Style, textBold, tabTwoSelected ? textWhite : textSuccess]}>Hotels</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={[tabStyle,  tabThreeSelected ? activeTab : '']} onPress={this.selectTabThree}>
                    <MyText style={[textH5Style, textBold, tabThreeSelected ? textWhite : textSuccess]}>Apartments</MyText>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
            <View style={contentContainer}>
              <View style={rowContainer}>
                <ManagePendingRow title="Umbaka Homes" img={require('../../assets/images/places/bed2.png')} location="Transcorp Hilton Abuja" status="Pending" {...this.props} />
              </View>
              <View style={rowContainer}>
              <ManageOnlineRow title="Umbaka Homes" img={require('../../assets/images/places/bed1.png')} location="Transcorp Hilton Abuja" status="Online" {...this.props} />
              </View>
              <View style={rowContainer}>
              <ManageOnlineRow title="Westgate Suites" img={require('../../assets/images/places/bed.png')} location="Transcorp Hilton Abuja" status="Online" {...this.props} />
              </View>
            </View>
        </ScrollView>
        <View>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#FD8323' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="home" />
          </Fab>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    manageHeader: {
        position: 'absolute', backgroundColor: colors.white, paddingTop: 130, width: '100%', paddingHorizontal: 20, zIndex: 1
    }, 
    tabsContainer: {
        display: 'flex', flexDirection: 'row', backgroundColor: colors.lighterGreen, borderRadius: 6, padding: 4,
        marginTop: 20
    },
    tabStyle: {
        flex: 1, paddingVertical: 12, justifyContent: 'center', alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.green, borderRadius: 6,
    },
    contentContainer: {
        paddingTop: 250, paddingHorizontal: 20, paddingBottom:30,
    },
    rowContainer: {
        marginBottom: 20,
    },
    statusPending: {
      textAlignVertical: "bottom",
      height: 30,
      marginTop: 5,
      color: colors.orange
  },
  statusOnline: {
    textAlignVertical: "bottom",
    height: 30,
    marginTop: 5,
    color: colors.green,
},
icon: {
  flex: 0.1,
  color: colors.grey,
},
container: {
  width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8
},
imgContainer: {
  width: 120, height: 110, borderRadius: 6, overflow: 'hidden', marginRight: 20,
  borderWidth: 1
},
typeStyle: {
  marginBottom: 20, alignItems: 'center'
},
iconStyle: {
  fontSize: 6, marginHorizontal: 6
},

});

export default ManageProperties;
