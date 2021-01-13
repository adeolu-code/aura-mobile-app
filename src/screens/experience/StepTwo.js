import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage } from '../../utils';

import { AppContext } from '../../../AppProvider';
import ProgressBar from '../../components/ProgressBar'
import CancelComponent from '../../components/experience/CancelComponent';


class StepTwo extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, experience: null };
    this.state.experience = props.route.params?.experience
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  
  next = () => {
    this.props.navigation.navigate('TourStack', { screen: 'TourExpertise' })
  }

  

  render() {
    const { container, button, selectStyle, imageContainer, textContainer, icon, skipStyle } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <Header { ...this.props } title="Overview" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 2 / 6</MyText>
                    <ProgressBar width={16.7 * 2} />
                    <ProgressBar width={25} />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        <MyText style={[textH3Style, textGrey,textBold, { marginBottom: 20}]}>What we're looking for ?</MyText>
                        <View>
                            <View style={imageContainer}>
                                <Image source={require('../../assets/images/tour.jpg')} resizeMode="cover" style={imgStyle} />
                            </View>
                        </View>
                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                            Experience hosts are passionate locals who can make people feel at 
                            home while they’re trying something new. They must meet these standards:
                        </MyText>

                        <View style={textContainer}>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6, }]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                    <MyText style={[textBold ]}>Expertise:</MyText> Having exceptional skill, ability, or background</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                    <MyText style={[textBold]}>Access:</MyText> Giving guests something they couldn’t do on their own</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                    <MyText style={[textBold]}>Connection:</MyText> Making meaningful interactions happen</MyText>
                            </View>
                            
                        </View>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                            Let’s go over them together in more detail.
                        </MyText>

                        
                        
                    </View>
                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.next} />
                </View>
                <View style={[flexRow, skipStyle]}>
                    {this.context.state.editTour ? <CancelComponent {...this.props} /> : <></>}
                    <View style={{ flex: 1}}>
                        <CustomButton buttonText="Skip To Step 3" 
                        buttonStyle={{ elevation: 2, ...GStyles.shadow, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
                        textStyle={{ color: colors.orange }}
                        onPress={()=> { this.props.navigation.navigate('TourStack', { screen: 'TourLanguage' }) }} />
                    </View>
                </View>
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 20, marginTop: 20, justifyContent: 'flex-end'
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey, alignSelf: 'flex-start', marginTop: 8
    },
    skipStyle: {
        // width: '50%', 
        marginBottom: 30, 
        // alignSelf: 'flex-end'
    }
});

export default StepTwo;
