/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Platform, 
  Dimensions, UIManager, LayoutAnimation } from 'react-native';
import { MyText, Loading } from '../../utils/Index';
import colors from '../../colors';
import {Fab, Icon} from 'native-base';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';

import { ManagePropertyContext } from '../../../ManagePropertyProvider';

import AllPropertiesTab from '../../components/dashboard/AllPropertiesTab';
import HotelsTab from '../../components/dashboard/HotelsTab';
import ApartmentsTab from '../../components/dashboard/ApartmentsTab';

import TermsModal from '../../components/dashboard/TermsModal';

import { HOST } from '../../utils'

const SCREEN_HEIGHT = Dimensions.get('screen').height

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
class ManageProperties extends Component {
  static contextType = ManagePropertyContext;
  constructor(props) {
    super(props);
    this.state = { tabOneSelected: true, tabTwoSelected: false, tabThreeSelected: false, showFilterModal: false, showTermsModal: false, type: '' };
  }

  linkToHost = () => {
    const { appContext } = this.props
    appContext.set({ propertyFormData: null, step: 1 })
    // this.props.navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
    // this.context.set({ edit: false })
    // this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: HOST } })
    this.setState({ showTermsModal: true, type: HOST })
  }

  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 100 }} />); }
  }

  componentDidMount = () => {
    const { propertyContext } = this.props
    const { set, state, getHotels, getAllProperties, getApartments } = propertyContext
    // propertyContext.getAllProperties()
    set({ activePropertiesPage: 1 }, () => { getAllProperties() })
    // propertyContext.getHotels()
    set({ activeHotelsPage: 1 }, () => {
      getHotels()
    })
    set({ activeApartmentsPage: 1 }, () => { getApartments() })
    // propertyContext.getApartments()

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
    
    this.setState(() => ({ tabOneSelected: true, tabTwoSelected: false, tabThreeSelected: false }), () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    });
    
  }

  selectTabTwo = () => {
    
    this.setState({ tabOneSelected: false, tabTwoSelected: true, tabThreeSelected: false });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  }

  selectTabThree = () => {
    
    this.setState({tabOneSelected: false, tabThreeSelected: true, tabTwoSelected: false});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  }
  openFilterModal = () => {
    this.setState({ showFilterModal: true });
  }
  closeFilterModal = () => {
    this.setState({ showFilterModal: false });
  }
  closeTermsModal = () => {
    this.setState({ showTermsModal: false })
  }
  render() {
    const { textSuccess, textWhite, textH5Style, textBold, } = GStyles;
    const { manageHeader, tabsContainer, tabStyle, activeTab } = styles;
    const { tabOneSelected, tabTwoSelected, tabThreeSelected } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <Header {...this.props} title="Manage Properties" wrapperStyles={{ paddingBottom: 5, position: 'relative' }} />
        <View style={manageHeader}>
            <View style={tabsContainer}>
                <TouchableWithoutFeedback onPress={this.selectTabOne}>
                  <View style={[tabStyle, tabOneSelected ? activeTab : '']} >
                      <MyText style={[textH5Style,textBold, tabOneSelected ? textWhite : textSuccess]}>All Properties</MyText>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.selectTabTwo}>
                  <View style={[tabStyle, tabTwoSelected ? activeTab : '']} >
                      <MyText style={[textH5Style, textBold, tabTwoSelected ? textWhite : textSuccess]}>Hotels</MyText>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={this.selectTabThree}>
                  <View style={[tabStyle,  tabThreeSelected ? activeTab : '']} >
                      <MyText style={[textH5Style, textBold, tabThreeSelected ? textWhite : textSuccess]}>Apartments</MyText>
                  </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
        
        {this.renderTabs()}
          <Fab active={this.state.active} direction="up" containerStyle={{ }} style={{ backgroundColor: colors.orange }} 
            position="bottomRight" onPress={this.linkToHost}>
            <Icon name="home" />
          </Fab>
        <TermsModal visible={this.state.showTermsModal} onDecline={this.closeTermsModal} {...this.props} type={this.state.type} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    manageHeader: {
        // position: 'absolute', 
        backgroundColor: colors.white, 
        // paddingTop: Platform.OS === 'ios' ? 110 : 110, 
        width: '100%', paddingHorizontal: 20, zIndex: 1,
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
        // paddingTop: 210, 
        paddingHorizontal: 20, paddingBottom:30,
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
