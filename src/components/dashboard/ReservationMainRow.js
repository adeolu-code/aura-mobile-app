/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base';

class ReservationMainRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  linkToHome = () => {
      this.props.navigation.navigate('HomeDetails')
  }

  render() {
    const { container, imgContainer, rightContainer, typeStyle, iconStyle } = styles
    const { flexRow, imgStyle, textBold, textH4Style, textH5Style, textGrey, textFadedBlack, 
        textDarkGrey, textExtraBold, textH1Style, textSuccess } = GStyles;
    const { title, location, reserve, img, propertyType, roomType } = this.props
    return (
        <View style={{ width: '100%'}}>
            <TouchableOpacity style={[flexRow, container]} onPress={this.linkToHome}>
                <View style={imgContainer}>
                    <Image source={img} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={rightContainer}>
                    <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>{title}</MyText>
                    <MyText style={[textH5Style, textGrey, { marginVertical: 6}]}>{location}</MyText>
                    <View style={[flexRow, typeStyle]}>
                        <MyText style={[textH5Style, textBold, textSuccess]}>{roomType}</MyText>
                        <Icon name="ellipse" style={iconStyle} />
                        <MyText style={[textH5Style, textBold, textDarkGrey]}>{propertyType}</MyText>
                    </View>
                    <View style={[flexRow, { alignItems: 'center'}]}>
                        <Image source={require('../../assets/images/icons/date/date-add.png')} resizeMode="contain" style={{ marginRight: 5}} />
                        <MyText style={[textH5Style, textGrey]}>{reserve}</MyText>
                    </View>
                    
                </View>
                
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
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
    }
});

export default ReservationMainRow;
