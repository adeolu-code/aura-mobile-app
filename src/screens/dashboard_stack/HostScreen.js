/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MyText, CustomButton } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';

class HostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  HostProperty = () => {
    this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSlider'});
  }

  HostSteps = () => {
    this.props.navigation.navigate('HostPropertyStack', {screen: 'HostSteps'});
  }

  render() {
    const { contentContainer, middleStyle, buttonContainer } = styles;
    const {  textH5Style, textH4Style, textBold, textGrey, textH6Style, textUnderline, textH1Style, textExtraBold, textDarkBlue, textCenter, textGreen } = GStyles
    return (
      <SafeAreaView style={contentContainer}>
        <ScrollView style={{flex: 1}}>
                    <View style={{flex: 2}}>
                        <MyText style={[textExtraBold, textH1Style, textDarkBlue]}>Dashboard</MyText>
                    </View>
                    <View style={middleStyle}>
                        <MyText style={[textGrey, textH6Style, textCenter]}>
                            You have no property listed on Aura yet. Become a host to get started.
                        </MyText>
                    </View>
                    <View style={buttonContainer}>
                        <CustomButton buttonText='Become A Host' onPress={this.HostSteps} buttonStyle={{backgroundColor: colors.black}} textStyle={[textH4Style,{color: colors.white}]}/>
                        <TouchableOpacity onPress={this.HostProperty}>
                            <MyText style={[textUnderline, textGreen, textH5Style, {marginTop: 20}]}>Learn about Hosting</MyText>
                        </TouchableOpacity>
                    </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
         paddingHorizontal: 24,
         paddingVertical: 20,
         flex: 1,
         backgroundColor: colors.white,
    },
    middleStyle: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
        marginBottom: 170,
    },
    buttonContainer: {
        alignItems: 'center',
         flex: 2,
         justifyContent: 'center',
    },
});

export default HostScreen;
