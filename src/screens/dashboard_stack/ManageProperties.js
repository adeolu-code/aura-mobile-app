/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import { ManagePropertyContext } from '../../../ManagePropertyProvider';

import AllPropertiesTab from '../../components/dashboard/AllPropertiesTab';
import HotelsTab from '../../components/dashboard/HotelsTab';
import ApartmentsTab from '../../components/dashboard/ApartmentsTab';


class ManageProperties extends Component {
  static contextType = ManagePropertyContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true, tabTwoSelected: false, tabThreeSelected: false, showFilterModal: false };
  }

  linkToHost = () => {
    const { appContext } = this.props
    appContext.set({ propertyFormData: null, step: 1 })
    this.props.navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
  }

  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
  }

  componentDidMount = () => {
    const { propertyContext } = this.props
    propertyContext.getAllProperties()
    propertyContext.getHotels()
    propertyContext.getApartments()

  }

  renderTabs = () => {
    const { tabOneSelected, tabTwoSelected, tabThreeSelected } = this.state;
    if(tabOneSelected) {
        return <AllPropertiesTab {...this.props}  />
    } else if(tabTwoSelected) {
        return <HotelsTab {...this.props}  />
    } else if (tabThreeSelected) {
        return <ApartmentsTab {...this.props} />
    } 
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
  openFilterModal = () => {
    this.setState({ showFilterModal: true });
  }
  closeFilterModal = () => {
    this.setState({ showFilterModal: false });
  }
  render() {
    const { textSuccess, textWhite, textH5Style, textBold, } = GStyles;
    const { manageHeader, tabsContainer, tabStyle, activeTab } = styles;
    const { tabOneSelected, tabTwoSelected, tabThreeSelected } = this.state;
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
        {this.renderTabs()}
        <View style={{ flex: 1 }}>
          <Fab active={this.state.active} direction="up" containerStyle={{ }} style={{ backgroundColor: colors.orange }} 
            position="bottomRight" onPress={this.linkToHost}>
            <Icon name="home" />
          </Fab>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    manageHeader: {
        position: 'absolute', backgroundColor: colors.white, paddingTop: 110, width: '100%', paddingHorizontal: 20, zIndex: 1,
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
        paddingTop: 210, paddingHorizontal: 20, paddingBottom:30,
    },
    rowContainer: {
        marginBottom: 20,
    },
    statusPending: {
      textAlignVertical: "bottom",
      height: 30,
      marginTop: 5,
      color: colors.orange,
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
  hideTab: {
    opacity: 0
  },
  showTab: {
    opacity: 1
  }

});

export default ManageProperties;
