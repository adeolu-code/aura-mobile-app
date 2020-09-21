import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import LunchComponent from './LunchComponent';
import BreakfastComponent from './BreakfastComponent';
import DinnerComponent from './DinnerComponent';
import OtherMenuComponent from './OtherMenuComponent';


class MenuSectionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOne: true, tabTwo: false, tabThree: false, tabFour: false };
  }

  selectTab = (name) => {
    switch (name) {
      case 'one':
        this.setState({ tabOne: true, tabTwo: false, tabThree: false, tabFour: false })
        break;
      case 'two':
        this.setState({ tabOne: false, tabTwo: true, tabThree: false, tabFour: false })
        break;
      case 'three':
        this.setState({ tabOne: false, tabTwo: false, tabThree: true, tabFour: false })
        break;
      case 'four':
        this.setState({ tabOne: false, tabTwo: false, tabThree: false, tabFour: true })
        break;
    
      default:
        break;
    }
  }

  renderTabs = () => {
    const { tabOne, tabTwo, tabThree, tabFour } = this.state
    if(tabOne) {
      return <BreakfastComponent />
    } else if(tabTwo) {
      return <LunchComponent />
    } else if(tabThree) {
      return <DinnerComponent />
    } else {
      return <OtherMenuComponent />
    }
  }

  render() {
    const { textH2Style, textExtraBold, textBold, textLgStyle, textH5Style, textGrey, textH4Style, 
        textH3Style, textDarkGrey, flexRow, textOrange } = GStyles
    const { title } = this.props;
    const { tabContainer, headerContainer, menuItem, activeMenu, container, bodyContainer } = styles
    const { tabOne, tabTwo, tabThree, tabFour } = this.state
    return (
      <View style={container}>
        <View style={tabContainer}>
          <View style={[flexRow, headerContainer]}>
            <TouchableOpacity style={[menuItem, tabOne ? activeMenu : '']} onPress={this.selectTab.bind(this, 'one')}>
              <MyText style={[textH5Style, textGrey, tabOne ? textOrange : '']}>Breakfast</MyText>
            </TouchableOpacity>
            <TouchableOpacity style={[menuItem, tabTwo ? activeMenu : '']} onPress={this.selectTab.bind(this, 'two')}>
              <MyText style={[textH5Style, textGrey, tabTwo ? textOrange : '']}>Lunch</MyText>
            </TouchableOpacity>
            <TouchableOpacity style={[menuItem, tabThree ? activeMenu : '']} onPress={this.selectTab.bind(this, 'three')}>
              <MyText style={[textH5Style, textGrey, tabThree ? textOrange : '']}>Dinner</MyText>
            </TouchableOpacity>
            <TouchableOpacity style={[menuItem, tabFour ? activeMenu : '']} onPress={this.selectTab.bind(this, 'four')}>
              <MyText style={[textH5Style, textGrey, tabFour ? textOrange : '']}>Other Menus</MyText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={bodyContainer}>
          {this.renderTabs()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      // borderWidth: 1, borderColor: 'red',
      borderBottomColor: colors.lightGrey, borderBottomWidth: 3, paddingBottom: 10,
    },
    tabContainer: {
        borderTopWidth: 2, borderTopColor: colors.lightGrey, backgroundColor: colors.white,
        elevation: 3, paddingTop: 30,
        justifyContent: 'flex-end', paddingBottom: 0,
        // borderBottomWidth: 1, borderBottomColor: colors.lightGrey, 
    },
    headerContainer: {
      justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 0
    },
    menuItem: {
      paddingBottom: 4
      // flex: 1
    },
    activeMenu: {
      borderBottomColor: colors.orange, borderBottomWidth: 3
    },
    bodyContainer: {
      paddingTop: 10
    }
});

export default MenuSectionComponent;
