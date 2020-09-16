import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import ReservationMainRow from '../../components/dashboard/ReservationMainRow';

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true };
  }

  selectTabOne = () => {
    this.setState({ tabOneSelected: true });
  }

  selectTabTwo = () => {
    this.setState({ tabOneSelected: false });
  }

  selectTabThree = () => {
    this.setState({tabOneSelected: false});
  }
  render() {
    const { textGrey, textH3Style, textH4Style, textSuccess, textWhite, textH5Style, textBold, } = GStyles;
    const { manageHeader, tabsContainer, tabStyle, rightTabStyle, activeTab, contentContainer, rowContainer } = styles;
    const { tabOneSelected, tabTwoSelected, tabThreeSelected } = this.state
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <Header {...this.props} title="Manage Properties" wrapperStyles={{ paddingBottom: 5}} />
        <View style={manageHeader}>
            <View style={tabsContainer}>
                <TouchableOpacity style={[tabStyle, tabOneSelected ? activeTab : '']} onPress={this.selectTabOne}>
                    <MyText style={[textH5Style,textBold, tabOneSelected ? textWhite : textSuccess]}>All Properties</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={[tabStyle, !tabTwoSelected ? activeTab : '']} onPress={this.selectTabTwo}>
                    <MyText style={[textH5Style, textBold, !tabTwoSelected ? textWhite : textSuccess]}>Hotels</MyText>
                </TouchableOpacity>
                <TouchableOpacity style={[tabStyle,  tabThreeSelected ? activeTab : '']} onPress={this.selectTabThree}>
                    <MyText style={[textH5Style, textBold, tabThreeSelected ? textWhite : textSuccess]}>Apartments</MyText>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView>
            <View style={contentContainer}>
                <View style={rowContainer}>
                    <ReservationMainRow title="Umbaka Homes" img={require('../../assets/images/places/bed2.png')}
                    location="Transcorp Hilton Abuja"  {...this.props} />
                </View>
                <View style={rowContainer}>
                    <ReservationMainRow title="Umbaka Homes" img={require('../../assets/images/places/bed1.png')}
                    location="Transcorp Hilton Abuja"  {...this.props} />
                </View>
                <View style={rowContainer}>
                    <ReservationMainRow title="Westgate Suites" img={require('../../assets/images/places/bed.png')}
                    location="Transcorp Hilton Abuja"  {...this.props} />
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
    }
});

export default Reservations;
