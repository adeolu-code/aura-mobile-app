import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';




class BottomMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {   container, buttonStyle, buttonContainer } = styles;
    const { flexRow, textExtraBold, textBold, textGrey, textH4Style, textSuccess, textH6Style } = GStyles;
    const { onPress } = this.props
    return (
        <View style={[flexRow, container]}>
            <View style={{flex: 1}}>
                <MyText style={[textGrey, textH6Style]}>Price:</MyText>
                <MyText style={[textSuccess, textH4Style, textBold]}>N 200,341/night</MyText>
            </View>
            <View style={{flex: 1}}>
                <View style={buttonContainer}>
                    <CustomButton buttonText="Check Availability" 
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
        borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        // marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
    },
});

export default BottomMenuComponent;
