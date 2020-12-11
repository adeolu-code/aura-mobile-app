import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import SubHeader from '../SubHeader';
import { amenityIcons, servicesIcons } from '../../../helpers'



class ServicesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderServices = () => {
    const { services } = this.props;
    const {  iconStyle, rowStyle } = styles;
    const { flexRow, textH3Style, textDarkGrey } = GStyles
    const defaultIcon = servicesIcons.find(icon => icon.name === 'default')
    if(services.length > 0) {
        return services.map(item => {
            const iconObj = servicesIcons.find(icon => icon.name.toLowerCase() === item.name.toLowerCase())
            const icon = iconObj ? iconObj : defaultIcon
            return (
                <View style={[flexRow, rowStyle]} key={item.id}>
                    <Icon type={icon.type} name={icon.iconName} style={iconStyle} />
                    <MyText style={[textH3Style]}>{item.name}</MyText>
                </View>
            )
        })
    }
  }

  render() {
    const {  contentContainer, divider, container, iconStyle, rowStyle, buttonStyle, buttonContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    const { btn, title } = this.props
    return (
        <View style={container}>
            <SubHeader title={title} />
            <View style={contentContainer}>
                <View style={[flexRow, { flexWrap: 'wrap'}]}>
                    {this.renderServices()}
                </View>
                

                {btn ? <View style={buttonContainer}>
                    <CustomButton buttonText="Show All Available Amenities" buttonStyle={buttonStyle} textStyle={{color: colors.black}} />
                </View>: <Fragment></Fragment>}
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
        marginBottom: 25,  alignItems: 'center', width: '50%'
    },
    
    contentContainer: {
        
    },
    buttonStyle: {
        borderColor: colors.black, borderWidth: 1, backgroundColor: colors.white, borderRadius: 10, elevation: 2
    },
    buttonContainer: {
        marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
});

export default ServicesComponent;
