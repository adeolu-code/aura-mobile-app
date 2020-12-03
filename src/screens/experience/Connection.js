import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar'



class Connection extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false  };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  

  updateExperience = async () => {
    const { tourOnboard } = this.context.state
    this.setState({ loading: true, errors: [] });
    const obj = {
        access: tourOnboard.access,
        expertise: tourOnboard.expertise,
        id: tourOnboard.id
    }
    const res = await Request(urls.experienceBase, `Experience/update`, obj );
    console.log('update experience ', res)
    this.setState({ loading: false });
    if (res.isError || res.IsError) {
        errorMessage(res.message)
    } else {
        this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
        this.props.navigation.navigate('TourStack', { screen: 'TourLanguage' })
    }  
  }
  

  

  render() {
    const { container, button, imageContainer, textContainer, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Connection" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 2 / 6</MyText>
                    <ProgressBar />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        <View>
                            <View style={imageContainer}>
                                <Image source={require('../../assets/images/tour_connection.jpg')} resizeMode="cover" style={imgStyle} />
                            </View>
                        </View>
                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                        We’re looking for warm and welcoming people who can build bridges and help everyone have fun.
                        </MyText>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15 }]}>This could include:</MyText>
                        <View style={textContainer}>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6, }]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Helping guests get to know each other</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Sharing personal stories</MyText>
                            </View>
                            <View style={[flexRow, { alignItems: 'center', marginBottom: 6}]}>
                                <Icon name="ellipse" style={icon} />
                                <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Creating magical moments</MyText>
                            </View>
                            
                        </View>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                        Guests should ideally come as strangers and leave as friends.
                        </MyText>

                    </View>


                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.updateExperience} />
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
        flex: 1, marginBottom: 40, marginTop: 20, justifyContent: 'flex-end'
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    progressContainer: {
        height: 8, width: '100%', backgroundColor: colors.lightGrey, borderRadius: 8, overflow: 'hidden', marginTop:10
    },
    progress: {
        height: '100%', backgroundColor: colors.orange
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    }
});

export default Connection;
