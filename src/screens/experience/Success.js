import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { errorMessage, urls, Request } from '../../utils';

import { AppContext } from '../../../AppProvider';
import ProgressBar from '../../components/ProgressBar'




class Success extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, experience: null, ansOne: false, ansTwo: false, ansThree: false, value: null };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  
  
  next = async () => {
    
    const { tourOnboard } = this.context.state;
    this.setState({ loading: true, errors: [] });
    
    const res = await Request(urls.experienceBase, `${urls.v}experience/publish?id=${tourOnboard.id}` );
    console.log('update experience ', res)
    this.setState({ loading: false });
    if (res.isError || res.IsError) {
        errorMessage(res.message || res.Message)
    } else {
        
        // this.props.navigation.navigate('Tabs', { screen: 'Dashboard' })
        // this.props.navigation.navigate('ManageTour', { tour: tourOnboard})
        // this.props.navigation.push('ManageTour')
        // this.props.navigation.push('Tabs', { screen: 'Dashboard', params: { screen: 'ManageTour'} })
        this.props.navigation.navigate('ManageTour', { tour: tourOnboard})
        this.context.set({ tourOnboard: null, editTour: false })
    }  
  }
  

  

  render() {
    const { container, button, imageContainer, textContainer, divider, radioContainer, activeRadio, selectRow, alertStyle, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { userData } = this.context.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="You are Done" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 6 / 6</MyText>
                    <ProgressBar width={100} />
                    <ProgressBar width={12.5 * 8} />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={imageContainer}>
                                <Image source={require('../../assets/images/tour_completed.png')} resizeMode="cover" style={imgStyle} />
                            </View>
                        </View>

                        <View style={textContainer}>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 15, marginTop:20}]}>
                                
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1, lineHeight: 24}]}>
                                Hi <MyText style={[textBold]}>{userData.firstName}</MyText>, your identity is currently being verified with the identity information you provided to us.
                                We will review all details you submitted. This should take less than 72 hours.
                                Once all is verified, your tour/experience will be approved and guests can begin booking your tour/experience</MyText>
                            </View>
                            
                        </View>

                    </View>


                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="I Understand" buttonStyle={{ elevation: 2}} onPress={this.next}  />
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
        paddingHorizontal: 20, marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, marginTop: 20, justifyContent: 'flex-end', paddingHorizontal: 10
    },
    imageContainer: {
        borderRadius: 300, borderColor: colors.orange, borderWidth: 4, width: '78%', height: 285, overflow: 'hidden',
        padding: 20
    },
    textContainer: {
        paddingHorizontal: 10
    },
    
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey, alignSelf: 'flex-start', marginTop: 8
    }
});

export default Success;
