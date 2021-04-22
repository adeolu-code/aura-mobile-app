import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Card, MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon, Fab, Button } from 'native-base';

import { AppContext } from '../../../AppProvider';

import { PHOTOGRAPH, EXPERIENCE, RESTAURANT, HOST } from '../../utils'


class MenuItems extends Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  linkToPhotographerDashboard = () => {
    const { set } = this.context
    set({ currentDashboard: 2 })
    this.props.onPress()
  }
  linkToPhotographer = () => {
    // this.props.onPress closes the menu item
    this.props.onPress()
    const { set } = this.context
    set({ edit: false })
    const { onPressPhoto } = this.props;
    if(onPressPhoto) {
      onPressPhoto()
    } else {
      this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: PHOTOGRAPH } })
    }
  }
  linkToExperienceDashboard = () => {
    // this.linkToExperience()
    const { set } = this.context
    set({ currentDashboard: 4 })
    this.props.onPress()
  }
  linkToExperience = () => {
    // this.props.onPress closes the menu item
    this.props.onPress()
    const { set } = this.context
    set({ edit: false })
    const { onPressExperience } = this.props;
    if(onPressExperience) {
      onPressExperience()
    } else {
      this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: EXPERIENCE } })
    }
  }
  
  linkToHost = () => {
    const { set } = this.context
    set({ currentDashboard: 1 })
    this.props.onPress()
  }
  linkToBecomeHost = () => {
    this.props.onPress()
    const { set } = this.context
    set({ edit: false })
    this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: HOST } })
  }

  linkToRestaurantDashboard = () => {
    // this.props.onPress closes the menu item
    this.props.onPress()
    const { set } = this.context
    set({ edit: false, currentDashboard: 3 })
    const { onPressRestaurant } = this.props;
    this.props.navigation.navigate('RestaurantStack');
  }

  linkToHostRestaurant = () => {
    this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: RESTAURANT } });
  }

  renderPhotograph = () => {
    const { userData, currentDashboard } = this.context.state
    const rolePhotograph = userData.roles.find(item => item === PHOTOGRAPH)
    const { flexRow, textH4Style } = GStyles
    const { itemRow, iconStyle } = styles
    if(rolePhotograph && currentDashboard !== 2) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToPhotographerDashboard}>
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
    const roleHost = userData.roles.find(item => item === HOST)
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
    if(!roleHost) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToBecomeHost}>
          <View>
            <Icon name="home" type="MaterialIcons" style={iconStyle} />
          </View>
          <MyText style={[textH4Style]}>Become a Host</MyText>
        </TouchableOpacity>
      )
    }
  }

  renderExperience = () => {
    const { userData, currentDashboard } = this.context.state
    const roleExperience = userData.roles.find(item => item === 'Tour-Guide')
    const { flexRow, textH4Style } = GStyles
    const { itemRow, iconStyle } = styles;
    if(roleExperience && currentDashboard !== 4) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToExperienceDashboard}>
          <View>
            <Icon name="directions-subway" type="MaterialIcons" style={iconStyle} />
          </View>
          <MyText style={[textH4Style]}>Experience Dashboard</MyText>
        </TouchableOpacity>
      )
    }
    if(!roleExperience) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToExperience}>
          <View>
            <Icon name="directions-subway" type="MaterialIcons" style={iconStyle} />
          </View>
          <MyText style={[textH4Style]}>Host an Experience</MyText>
        </TouchableOpacity>
      )
    }
  }

  
  renderRestaurant = () => {
    const { userData, currentDashboard } = this.context.state
    const roleRestaurant = userData.roles.find(item => item === RESTAURANT)
    const { flexRow, textH4Style } = GStyles
    const { itemRow, iconStyle } = styles;
    if(roleRestaurant && currentDashboard !== 3) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToRestaurantDashboard}>
          <View>
          <Icon name="fast-food" style={iconStyle}  />
          </View>
          <MyText style={[textH4Style]}>Restaurant Dashboard</MyText>
        </TouchableOpacity>
      )
    }
    if(!roleRestaurant) {
      return (
        <TouchableOpacity style={[flexRow, itemRow]} onPress={this.linkToHostRestaurant}>
          <View>
            <Icon name="fast-food" style={iconStyle} />
          </View>
          <MyText style={[textH4Style]}>Host a Restaurant</MyText>
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
                  {this.renderExperience()}
                  {this.renderRestaurant()}
                  
              </View>
          
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', 
        paddingTop: 40, alignItems: 'flex-end', paddingHorizontal: 8, paddingRight: 20
    },
    contentStyle: {
        backgroundColor: colors.white, padding:10, borderRadius: 8,
        width: '70%', elevation: 3, ...GStyles.shadow
    },
    itemRow: {
      alignItems: 'center', paddingVertical: 8, backgroundColor: colors.white
    },
    iconStyle: {
      fontSize: 25, marginRight: 10, 
      // color: colors.grey,
      color: colors.orange
    },
    iconContainer: {
      height: 40, width: 40, backgroundColor: colors.white, borderRadius: 5, justifyContent: 'center',
      alignItems: 'center', borderWidth: 1, borderColor: colors.orange
    }
});

export default MenuItems;
