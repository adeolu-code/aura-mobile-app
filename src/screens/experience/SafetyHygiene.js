import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, errorMessage } from '../../utils';

import { AppContext } from '../../../AppProvider';
import ProgressBar from '../../components/ProgressBar'




class SafetyHygiene extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, experience: null, ansOne: false, ansTwo: false, ansThree: false, value: null };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  
  
  next = () => {
    this.props.navigation.navigate('TourStack', { screen: 'TourSafetyPhysical' })
  }
  

  

  render() {
    const { container, button, imageContainer, textContainer, divider, radioContainer, activeRadio, selectRow, alertStyle, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <Header { ...this.props } title="Practice good hygiene" wrapperStyles={{ position: 'relative'}} />
            <View style={container}>
                <View>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 6 / 6</MyText>
                    <ProgressBar width={100} />
                    <ProgressBar width={12.5 * 2} />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        
                        <View>
                            <View style={imageContainer}>
                                <Image source={require('../../assets/images/tour_hygiene.jpg')} resizeMode="cover" style={imgStyle} />
                            </View>
                        </View>
                        <MyText style={[textH4Style, textBold, { marginBottom: 15, marginTop: 15}]}>
                        While hosting, wear a protective face covering, and wash your hands regularly.
                        </MyText>

                        <View style={textContainer}>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 10, }]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                All hosts and guests of experiences must wear facial coverings. 
                                Check your relevant regulatory authority for guidance on specific rules in your region.</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 10}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Wash your hands before, during and after your experience. 
                                Scrub for at least 20 seconds with warm soap and water.</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 10}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Bring hand sanitizer for you and your guests.</MyText>
                            </View>
                            
                            
                        </View>


                    </View>


                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.next}  />
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
        paddingHorizontal: 24, 
        // marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, marginTop: 20, justifyContent: 'flex-end'
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    divider: {
        height: 2, backgroundColor: colors.lightGrey, width: '100%'
    },
    radioContainer: {
        borderRadius: 18, width: 18, height: 18, borderWidth: 2, borderColor: colors.orange, justifyContent: 'center', alignItems: 'center', 
        marginRight: 10, marginTop: 5
    },
    activeRadio: {
        width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10, 
    },
    selectRow: {
        alignItems: 'flex-start', paddingVertical: 10
    },
    alertStyle: {
        paddingHorizontal: 15,paddingVertical: 15, backgroundColor: colors.white, borderRadius: 8, elevation: 2, marginTop: 10
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey, alignSelf: 'flex-start', marginTop: 8
    }
});

export default SafetyHygiene;
