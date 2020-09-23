import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base';

class GuestsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  linkToProfile = () => {
      this.props.navigation.navigate('GuestProfile')
  }

  render() {
    const { flexRow, imgStyle, textH4Style,textDarkGrey, textBold } = GStyles;
    const { imgContainer, nameContainer, iconContainer, leftContainer, container } = styles
    const { name, img } = this.props
    return (
        <View>
            <TouchableOpacity style={[flexRow, container]} onPress={this.linkToProfile}>
                <View style={leftContainer}>
                    <View style={imgContainer}>
                        <Image source={img} resizeMode="cover"
                        style={imgStyle} />
                    </View>
                </View>
                <View style={nameContainer}>
                    <MyText style={[textH4Style, textDarkGrey, textBold]}>{name}</MyText>
                </View>
                <View style={iconContainer}>
                    <Icon name="chevron-forward-circle-outline" style={{ fontSize: 26, color: colors.darkGrey}} />
                </View>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 2, paddingVertical: 20
    },
    imgContainer: {
        width: 60,height:60, borderRadius: 60, overflow: 'hidden'
    },
    leftContainer: {
        flex: 2, 
        // borderWidth: 1
    },
    nameContainer: {
        flex: 5, justifyContent: 'center',
        // borderWidth: 1,
    },
    iconContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'flex-end', 
        // borderWidth: 1
    }
});

export default GuestsRow;
