import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import SubHeader from './SubHeader';
import { rulesIcons} from '../../helpers'




class RulesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderRules = () => {
    const { rules } = this.props;
    const {  iconStyle, rowStyle } = styles;
    const { flexRow, textH3Style } = GStyles
    const defaultIcon = rulesIcons.find(icon => icon.name === 'default')
    if(rules) {
        return rules.map(item => {
            const iconObj = rulesIcons.find(icon => icon.name === item.rule.toLowerCase().trim())
            const icon = iconObj ? iconObj : defaultIcon
            return (
                <View style={[flexRow, rowStyle]} key={item.id}>
                    <Icon type={icon.type} name={icon.iconName} style={iconStyle} />
                    <MyText style={[textH3Style]}>{item.rule}</MyText>
                </View>
            )
        })
    }
  }

  render() {
    const {  contentContainer, divider, container, iconStyle, rowStyle, buttonStyle, buttonContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    const { title } = this.props
    return (
        <View style={container}>
            <SubHeader title={title} />
            <View style={contentContainer}>
                {this.renderRules()}
                {/* <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="access-time" style={iconStyle} />
                    <MyText style={[textH3Style]}>Check-in: Flexible</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="access-time" style={iconStyle} />
                    <MyText style={[textH3Style]}>Check-out: 10:00 am</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="child-friendly" style={iconStyle} />
                    <MyText style={[textH3Style]}>Suitable For Infants</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="pets" style={iconStyle} />
                    <MyText style={[textH3Style]}>Pets Allowed</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="local-bar" style={iconStyle} />
                    <MyText style={[textH3Style]}>Parties & Events Allowed</MyText>
                </View>
                <View style={[flexRow, rowStyle]}>
                    <Icon type="MaterialIcons" name="smoke-free" style={iconStyle} />
                    <MyText style={[textH3Style]}>No Smoking Allowed</MyText>
                </View> */}

            </View>
            <View style={divider}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    iconStyle: {
        fontSize: 25, marginRight: 25
    },
    rowStyle: {
        marginBottom: 25,  alignItems: 'center'
    },
    
    contentContainer: {
        
    },
    buttonStyle: {
        borderColor: colors.black, borderWidth: 1, backgroundColor: colors.white, borderRadius: 10
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
});

export default RulesComponent;
