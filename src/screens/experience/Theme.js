import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { errorMessage, Request, urls, } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ThemeListModal from '../../components/experience/ThemeListModal';

import ProgressBar from '../../components/ProgressBar'


class Theme extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showCatThemeModal: false, themeValues: null, loading: false, themes: [] };
  }
  getThemes = (themes) => {
    const { tourOnboard, editTour } = this.context.state;
    this.setState({ themes })
    if(editTour) {
        const f = themes.find(item => item.id === tourOnboard.themeId)
        if(f) {
            const obj = { listValue: f, subListValue: '' }
            this.setState({ themeValues: obj })
        }
    }
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  openCatThemeModal = () => {
    this.setState({ showCatThemeModal: true })
  }
  closeCatThemeModal = () => {
    this.setState({ showCatThemeModal: false })
  }
  getThemeValue = (themeValues) => {
    this.setState({ themeValues })
  }
  renderSelectButton = () => {
    const { themeValues } = this.state;
    const { textH4Style, textH3Style, textGrey, textBold } = GStyles
    if(themeValues) {
        const { listValue, subListValue } = themeValues
        return (
            <>
                <View style={{flex: 6, paddingLeft: 10}}>
                    <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 5}]}>{listValue.name}</MyText>
                    {/* <MyText style={[textH4Style]}>{subListValue.name}</MyText> */}
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
                    <Icon name="caret-forward" style={{ color: colors.orange, marginLeft: 20}} />
                </View>
            </>
        )
    }
    return (
        <>
            <View>
                <Icon name="md-add-circle" style={{ color: colors.orange, marginRight: 20}} />
            </View>
            <MyText style={[textH4Style]}>Select A Primary Theme</MyText>
        </>
    )
  }

  createExperience = async () => {
    const { tourOnboard, editTour } = this.context.state
    const { themeValues } = this.state
    
    this.setState({ loading: true, errors: [] });
    let obj;
    if(!themeValues && editTour){
        obj = { location: tourOnboard.location, themeId: tourOnboard.themeId}
    } else {
        obj = {
            location: tourOnboard.location,
            // themeId: themeValues.subListValue.id,
            themeId: themeValues.listValue.id
        }
    }
    if(editTour) {
        obj.id = tourOnboard.id
    }
    try {
        const url = editTour ? `${urls.v}Experience/update` : `${urls.v}Experience`
        const res = await Request(urls.experienceBase, url, obj );
        console.log('create experience ', res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...obj, ...res.data }})
            this.props.navigation.navigate('TourStack', { screen: 'TourStepTwo', params: { experience: res.data }})
        }  
    } catch (error) {
        this.setState({ loading: false });
    }
    
  }
  componentDidMount = () => {
    const { tourOnboard } = this.context.state
    
    // console.log(tourOnboard)
    // this.getThemeCatById()
  }

  render() {
    const { container, button, selectStyle } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Your Theme" />
            
            <View style={container}>
                <View style={{ marginTop: 25}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 1 / 6</MyText>
                    <ProgressBar width={16.7} />
                    <ProgressBar width={100} />
                </View>
                <View style={{ flex: 1, marginTop: 20 }}>
                
                    <View style={[{ paddingHorizontal: 1 }]}>
                   
                        <MyText style={[textH3Style, textGrey,textBold, { marginBottom: 20}]}>What type of experience will you host ?</MyText>
                        
                        <MyText style={[textH4Style, textGrey, { marginBottom: 15}]}>
                            Select a theme that best describes what guests will mainly be doing on your experience. 
                            This will help guests find and book your experience.
                        </MyText>

                        
                        <Pressable onPress={this.openCatThemeModal}>
                            <View style={[flexRow, selectStyle]}>
                                {this.renderSelectButton()}
                            </View>
                        </Pressable>
                        
                        
                    </View>
                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.createExperience} 
                    disabled={this.state.themeValues === null && !this.context.state.editTour} />
                </View>
            </View>
            <ThemeListModal visible={this.state.showCatThemeModal} onDecline={this.closeCatThemeModal} value={this.getThemeValue} getThemes={this.getThemes} />
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
        flex: 1, marginBottom: 40, justifyContent: 'flex-end'
    },
    selectStyle: {
        backgroundColor: colors.white, borderRadius: 10, elevation: 2, width: '100%',
        paddingHorizontal: 10, paddingVertical: 15, marginTop: 20,
        justifyContent: 'center', alignItems: 'center', ...GStyles.shadow
    }
});

export default Theme;
