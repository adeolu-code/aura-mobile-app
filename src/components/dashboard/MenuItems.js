import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon, Fab, Button } from 'native-base';

import { AppContext } from '../../../AppProvider';


class MenuItems extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  linkToDashboard = () => {
    const { set } = this.context
    set({ currentDashboard: 2 })
    this.props.onPress()
  }
  linkToPhotographer = () => {
    this.props.onPress()
    this.props.navigation.navigate('Other', { screen: 'TermsOfService' })
  }
  linkToHost = () => {
    const { set } = this.context
    set({ currentDashboard: 1 })
    this.props.onPress()
  }

  renderPhotograph = () => {
    const { userData, currentDashboard } = this.context.state
    const rolePhotograph = userData.roles.find(item => item === 'Photographer')
    const { flexRow, textH4Style } = GStyles
    const { itemRow, iconStyle } = styles
    if(rolePhotograph && currentDashboard !== 2) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToDashboard}>
          <View>
            <Icon name="camera-alt" type="MaterialIcons" style={iconStyle} />
          </View>
          <MyText style={[textH4Style]}>Photographer Dashboard</MyText>
        </TouchableOpacity>
      )
    }
    if(!rolePhotograph) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToPhotographer}>
          <View>
            <Icon name="camera-alt" type="MaterialIcons" style={iconStyle} />
          </View>
          <MyText style={[textH4Style]}>Become a Photographer</MyText>
        </TouchableOpacity>
      )
    }
    
  }
  renderHost = () => {
    const { userData, currentDashboard } = this.context.state
    const roleHost = userData.roles.find(item => item === 'Host')
    const { flexRow, textH4Style } = GStyles
    const { itemRow, iconStyle } = styles
    if(roleHost && currentDashboard > 1) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToHost}>
          <View>
            <Icon name="home" type="MaterialIcons" style={iconStyle} />
          </View>
          <MyText style={[textH4Style]}>Host Dashboard</MyText>
        </TouchableOpacity>
      )
    }
  }
  

  render() {
    const { textDarkGrey, textH4Style, textH1Style, textBold, textExtraBold, flexRow } = GStyles;
    const { container, contentStyle, itemRow, iconStyle } = styles;
    const dasboardDescription = `View summary of your reservations, comments, properties and ratings`
    const { onPress } = this.props
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={container}>
          
              <View style={contentStyle}>
                  {this.renderPhotograph()}
                  {this.renderHost()}
                  <View style={[flexRow, itemRow]}>
                    <View>
                      <Icon name="tour" type="MaterialIcons" style={iconStyle} />
                    </View>
                    <MyText style={[textH4Style]}>Host an Experience</MyText>
                  </View>
                  <View style={[flexRow, itemRow]}>
                    <View>
                      <Icon name="restaurant-menu" style={iconStyle} type="MaterialIcons" />
                    </View>
                    <MyText style={[textH4Style]}>Host your restaurant</MyText>
                  </View>
                  
              </View>
          
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', 
        paddingTop: 30, alignItems: 'flex-end', paddingHorizontal: 8
    },
    contentStyle: {
        backgroundColor: colors.white, padding:10, borderRadius: 8,
        width: '60%', elevation: 3
    },
    itemRow: {
      alignItems: 'center', paddingVertical: 8, backgroundColor: colors.white
    },
    iconStyle: {
      fontSize: 25, marginRight: 10
    },
    iconContainer: {
      height: 40, width: 40, backgroundColor: colors.white, borderRadius: 5, justifyContent: 'center',
      alignItems: 'center', borderWidth: 1, borderColor: colors.orange
    }
});

export default MenuItems;
