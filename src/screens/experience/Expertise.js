import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { errorMessage } from '../../utils';

import { AppContext } from '../../../AppProvider';
import ProgressBar from '../../components/ProgressBar';
import CancelComponent from '../../components/experience/CancelComponent';





class Expertise extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, ansOne: false, ansTwo: false, ansThree: false, value: null };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  selectOne = () => {
    this.setState({ ansOne: true, ansThree: false, ansTwo: false, value: { expertise: 'Yes_Professionally' } })
  }
  selectTwo = () => {
    this.setState({ ansOne: false, ansTwo: true, ansThree: false, value: { expertise: 'Yes_Informally' } })
  }
  selectThree = () => {
    this.setState({ ansOne: false, ansTwo: false, ansThree: true, value: { expertise: 'No' } })
  }

  validate = () => {
    const { value } = this.state
    if(value === null || value && value.expertise === 'No' ) {
        return true
    }
    return false
  }
  
  next = () => {
    const { tourOnboard } = this.context.state
    this.context.set({ tourOnboard: { ...tourOnboard, ...this.state.value }})
    this.props.navigation.navigate('TourStack', { screen: 'TourAccess' })
  }
  
  componentDidMount = () => {
    const { tourOnboard, editTour } = this.context.state;
    if(editTour) {
        const arr = [ 'Yes_Professionally', 'Yes_Informally', 'No' ]
        const arrSt = [ 'ansOne', 'ansTwo', 'ansThree' ]
        const getName = arrSt[tourOnboard.expertise]
        this.setState({ value: { expertise: arr[tourOnboard.expertise] }, [getName]: true})
    }
    console.log(tourOnboard)
  }

  

  render() {
    const { container, button, imageContainer, textContainer, divider, radioContainer, activeRadio, selectRow, alertStyle, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <Header { ...this.props } title="Expertise" />
            <View style={container}>
                <View style={{ marginTop: 20}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 2 / 6</MyText>
                    <ProgressBar width={16.7 * 2} />
                    <ProgressBar width={25*2} />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        <View>
                            <View style={imageContainer}>
                                <Image source={require('../../assets/images/tour1.jpg')} resizeMode="cover" style={imgStyle} />
                            </View>
                        </View>
                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                        We’re looking for passionate storytellers who can share a unique perspective and insider knowledge.
                        </MyText>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15 }]}>This could include:</MyText>
                        <View style={textContainer}>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6, }]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Being a well-informed enthusiast</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Having specialized training</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Having achievements in your field</MyText>
                            </View>
                            
                        </View>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                        Guests value hosts with a distinctive point of view they can’t easily find elsewhere.
                        </MyText>

                        <View style={divider}></View>

                        <View>
                            <MyText style={[textH4Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                                Have you hosted this activity before?
                            </MyText>
                            <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectOne}>
                                <View style={radioContainer}>
                                    <View style={[ansOne ? activeRadio : '']}></View>
                                </View>
                                <MyText style={[textH4Style, textGrey, { flex: 1}]}>Yes, I’ve hosted or taught this activity professionally</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectTwo}>
                                <View style={radioContainer}>
                                    <View style={[ansTwo ? activeRadio : '']}></View>
                                </View>
                                <MyText style={[textH4Style, textGrey, { flex: 1}]}>Yes, I’ve hosted this activity informally for friends or family</MyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectThree}>
                                <View style={radioContainer}>
                                    <View style={[ansThree ? activeRadio : '']}></View>
                                </View>
                                <MyText style={[textH4Style, textGrey, { flex: 1}]}>No, I’ve never hosted this activity before</MyText>
                            </TouchableOpacity>

                        </View>

                        {ansThree ? <View style={alertStyle}>
                            <Icon name="warning" type="MaterialIcons" style={{ color: colors.orange, fontSize: 30}} />
                            <MyText style={[textH4Style, textGrey, textBold, { marginBottom: 10, marginTop: 10}]}>
                                We're looking for hosts who have done this before
                            </MyText>
                            <MyText style={[textH4Style, textGrey ]}>
                                It’s challenging to keep a group engaged, and successful hosts usually have experience with this already.
                            </MyText>
                        </View> : <></>}
                    </View>


                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.next} disabled={this.validate()} />
                </View>
                <View style={[flexRow, styles.skipStyle]}>
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
    divider: {
        height: 2, backgroundColor: colors.lightGrey, width: '100%'
    },
    radioContainer: {
        borderRadius: 18, width: 18, height: 18, borderWidth: 2, borderColor: colors.orange, justifyContent: 'center', alignItems: 'center', 
        marginRight: 10, marginTop: 3
    },
    activeRadio: {
        width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10, 
    },
    selectRow: {
        alignItems: 'flex-start', paddingVertical: 10
    },
    alertStyle: {
        paddingHorizontal: 15,paddingVertical: 15, backgroundColor: colors.white, borderRadius: 8, elevation: 2, marginTop: 10,
        ...GStyles.shadow
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    },
    skipStyle: {
        marginBottom: 30, 
    }
});

export default Expertise;
