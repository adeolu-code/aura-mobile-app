import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon, Fab, Button } from 'native-base';

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPress = () => {
    this.props.onPress()
  }

  render() {
    const { textDarkGrey, textH4Style, textH1Style, textBold, textExtraBold } = GStyles;
    const { container, headerStyle, iconContainer } = styles;
    const { title, onPress } = this.props
    return (
      <View>
        <View style={headerStyle}>
            <View style={{ flex: 1}}>
                <MyText style={[textDarkGrey, textH1Style, textExtraBold ]}>{title || 'Dashboard'}</MyText>
            </View>
            <TouchableOpacity style={iconContainer} onPress={this.onPress}>
              <Icon name="menu" style={{ fontSize: 27, color: colors.grey }} />
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        marginBottom: 30, backgroundColor: colors.white, position: 'absolute', top: 0,zIndex: 10,
        width: '100%', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    iconContainer: {
      height: 40, width: 40, backgroundColor: colors.white, borderRadius: 5, justifyContent: 'center',
      alignItems: 'center', 
      borderWidth: 1, borderColor: colors.lightGrey, 
      // borderColor: colors.orange
    },
    menuStyles: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000,
    }
});

export default DashboardHeader;
