import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'native-base';
import { MyText } from '../utils/Index';
import GStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';
import { consoleLog } from '../utils';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  goBack = () => {
    if(this.props.onPress) {
      this.props.onPress()
    } else {
      if (this.props.goBackTo) {
        this.props.navigation.navigate(this.props.goBackTo);
      }
      else {
        this.props.navigation.goBack();
      }
    }
  }

  renderSubTitle = () => {
    const { sub } = this.props;
    const { textGrey, textH5Style } = GStyles;
    if(sub) {
        return (
            <View style={{ marginTop: 3}}>
                <MyText style={[textH5Style, textGrey]}>{sub}</MyText>
            </View>
        )
    }
  }

  render() {
    const { iconStyle, iconContainer, titleContainer, container } = styles;
    const { textExtraBold, textLgStyle } = GStyles
    const { title, wrapperStyles } = this.props
    return (
      <View style={[container, wrapperStyles]}>
        <TouchableOpacity style={iconContainer} onPress={this.goBack}>
          <Icon type="Feather" name="chevron-left" style={iconStyle} />
        </TouchableOpacity>
        <View style={titleContainer}>
            <MyText style={[textLgStyle, textExtraBold]}>{title}</MyText>
        </View>
        {this.renderSubTitle()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', backgroundColor: colors.white, paddingHorizontal: 20, 
        paddingTop: Platform.OS === 'ios' ? 30 : 30,
        paddingBottom: Platform.OS === 'ios' ? 10 : 10,
        position: 'absolute', top: 0, zIndex: 100, 
        // borderWidth: 1
        // marginTop: 10
    },
    iconContainer:{
        marginBottom: Platform.OS === 'ios' ? 6 : 10, 
        // borderWidth: 1
    },
    iconStyle: {
        // borderWidth: 1, 
        padding: 0,margin: 0, fontSize: 35, marginLeft: -10
    },
    titleContainer: {

    }
});

export default Header;
