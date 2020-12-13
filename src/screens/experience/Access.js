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



class Access extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, experience: null, ansOne: false, ansTwo: false, ansThree: false, value: null };
    this.state.experience = props.route.params?.experience
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  selectOne = () => {
    this.setState({ ansOne: true, ansThree: false, ansTwo: false, value: { access: 'GuestNeedMe' } })
  }
  selectTwo = () => {
    this.setState({ ansOne: false, ansTwo: true, ansThree: false, value: { access: 'GuestMayNeedMe' } })
  }
  selectThree = () => {
    this.setState({ ansOne: false, ansTwo: false, ansThree: true, value: { access: 'GuestDontNeedMe' } })
  }

  validate = () => {
    const { value } = this.state
    if(value === null || value && value.access === 'GuestDontNeedMe' ) {
        return true
    }
    return false
  }
  
  next = () => {
    const { tourOnboard } = this.context.state
    this.context.set({ tourOnboard: { ...tourOnboard, ...this.state.value }})
    this.props.navigation.navigate('TourStack', { screen: 'TourConnection' })
  }
  
  componentDidMount = () => {
    const { tourOnboard, editTour } = this.context.state;
    if(editTour) {
        const arr = [ 'GuestNeedMe', 'GuestMayNeedMe', 'GuestDontNeedMe' ]
        const arrSt = [ 'ansOne', 'ansTwo', 'ansThree' ]
        const getName = arrSt[tourOnboard.access]
        this.setState({ value: { access: arr[tourOnboard.access] }, [getName]: true})
    }
  }
  

  render() {
    const { container, button, imageContainer, textContainer, divider, radioContainer, activeRadio, selectRow, alertStyle, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <Header { ...this.props } title="Access" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 2 / 6</MyText>
                    <ProgressBar width={16.7 * 2} />
                    <ProgressBar width={25*3} />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        <View>
                            <View style={imageContainer}>
                                <Image source={require('../../assets/images/tour_access.jpg')} resizeMode="cover" style={imgStyle} />
                            </View>
                        </View>
                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                        We’re looking for insiders who can show off a side of their city that visitors couldn’t find otherwise.
                        </MyText>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15 }]}>This could include:</MyText>
                        <View style={textContainer}>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6, }]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Places only locals know about</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Interesting people</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Special items that are hard to find</MyText>
                            </View>
                            
                        </View>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                        Guests love going beyond the typical tourist destinations.
                        </MyText>

                        <View style={divider}></View>

                        <View>
                            <MyText style={[textH4Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                            Which of these best describes what you’ll do?
                            </MyText>
                            <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectOne}>
                                <View style={radioContainer}>
                                    <View style={[ansOne ? activeRadio : '']}></View>
                                </View>
                                <MyText style={[textH4Style, textGrey, { flex: 1}]}>It’s very unique — guests couldn’t do it without me</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectTwo}>
                                <View style={radioContainer}>
                                    <View style={[ansTwo ? activeRadio : '']}></View>
                                </View>
                                <MyText style={[textH4Style, textGrey, { flex: 1}]}>Guests could do this on their own, but I bring a unique perspective to the activity</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectThree}>
                                <View style={radioContainer}>
                                    <View style={[ansThree ? activeRadio : '']}></View>
                                </View>
                                <MyText style={[textH4Style, textGrey, { flex: 1}]}>Guests could do this on their own without me</MyText>
                            </TouchableOpacity>

                        </View>

                        {ansThree ? <View style={alertStyle}>
                            <Icon name="warning" type="MaterialIcons" style={{ color: colors.orange, fontSize: 30}} />
                            <MyText style={[textH4Style, textGrey ]}>
                            Experiences should include places, activities, or perspectives that only a local host could provide.
                            </MyText>
                        </View> : <></>}
                    </View>


                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.next} disabled={this.validate()} />
                </View>
                <View style={[flexRow, styles.skipStyle]}>
                    {this.context.state.editTour ? <CancelComponent {...this.props} /> : <></>}
                    <View style={{ flex: 1}}>
                        <CustomButton buttonText="Skip To Step 3" 
                        buttonStyle={{ elevation: 2, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
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
        paddingHorizontal: 24, marginTop: 100,
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
        fontSize: 8, marginRight: 15, color: colors.grey
    },
    skipStyle: {
        marginBottom: 30, 
    }
});

export default Access;
