/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import { formatAmount } from '../../../helpers';

import { urls, GetRequest } from '../../../utils';




class BottomMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPrice = () => {
      const { foods, onRemove } = this.props;
      const { flexRow, textExtraBold, textBold, textGrey, textH4Style, textSuccess, textH6Style, textH5Style } = GStyles;
      if(foods.length > 0) {
        const getFirstFood = foods[0]
        return (
            <View style={{flex: 1}}>
                {/* <Icon name="cart" /> */}
                <MyText style={[textGrey, textH6Style]}>Price:</MyText>
                <View style={[flexRow]}>
                    <MyText style={[textSuccess, textH4Style, textBold]}>₦ {formatAmount(getFirstFood.price)} / plate * {foods.length}</MyText>
                    <TouchableOpacity style={styles.iconStyle} onPress={onRemove}>
                        <Icon name="remove-outline" style={{ color: colors.white, fontSize: 18, marginRight: -1}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
      }
  }


  render() {
    const {   container, buttonStyle, buttonContainer } = styles;
    const { flexRow, textExtraBold, textBold, textGrey, textH4Style, textSuccess, textH6Style } = GStyles;
    const { onPress, disabled } = this.props
    return (
        <View style={[flexRow, container]}>
            <View style={{flex: 1.5}}>
                {this.renderPrice()}
                {/* <Icon name="cart" />
                <MyText style={[textGrey, textH6Style]}>Price:</MyText>
                <MyText style={[textSuccess, textH4Style, textBold]}>₦ {house ? formatAmount(house.pricePerNight) : '***'} / plate</MyText> */}
            </View>
            <View style={{flex: 1}}>
                <View style={buttonContainer}>
                    <CustomButton buttonText="Order Food" disabled={disabled}
                    buttonStyle={buttonStyle} onPress={onPress} />
                </View>
            </View>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, elevation: 4, width: '100%', backgroundColor: colors.white,
        paddingTop: 15, paddingBottom: 25
    },
    
    contentContainer: {
        marginBottom: 30
    },
    buttonStyle: {
        borderRadius: 6, elevation: 2
    },
    buttonContainer: {
        // marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
    },
    iconStyle: {
        width: 25, height: 25, backgroundColor: colors.orange, borderRadius: 25, justifyContent: 'center', alignItems: 'center',
        marginLeft: 20, opacity: 0.8
    },
});

export default BottomMenuComponent;
