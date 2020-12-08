import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls, } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ThemeListModal from '../../components/experience/ThemeListModal';

import ProgressBar from '../../components/ProgressBar'


class Theme extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { showCatThemeModal: false, themeValues: null, loading: false };
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
                    <MyText style={[textH4Style]}>{subListValue.name}</MyText>
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
    const { tourOnboard } = this.context.state
    this.setState({ loading: true, errors: [] });
    const { themeValues } = this.state
    const obj = {
        location: tourOnboard.location,
        themeId: themeValues.subListValue.id
    }
    const res = await Request(urls.experienceBase, `${urls.v}Experience`, obj );
    console.log('create experience ', res)
    this.setState({ loading: false });
    if (res.isError || res.IsError) {
        errorMessage(res.message)
    } else {
        this.context.set({ tourOnboard: { ...tourOnboard, ...obj, ...res.data }})
        this.props.navigation.navigate('TourStack', { screen: 'TourStepTwo', params: { experience: res.data }})
    }  
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
                <View style={{ marginTop: 40}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 1 / 6</MyText>
                    <ProgressBar />
                </View>
                
                <View style={{ flex: 1, marginTop: 40 }}>
                    <View style={[{ paddingHorizontal: 1}]}>
                        <MyText style={[textH3Style, textGrey,textBold, { marginBottom: 20}]}>What type of experience will you host ?</MyText>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15}]}>
                            Select a theme that best describes what guests will mainly be doing on your experience. 
                            This will help guests find and book your experience.
                        </MyText>

                        <TouchableOpacity style={[flexRow, selectStyle]} onPress={this.openCatThemeModal}>
                            {this.renderSelectButton()}
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
                
                <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.createExperience} disabled={this.state.themeValues === null} />
                </View>
            </View>
            <ThemeListModal visible={this.state.showCatThemeModal} onDecline={this.closeCatThemeModal} value={this.getThemeValue} />
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
        flex: 1, marginBottom: 40, justifyContent: 'flex-end'
    },
    selectStyle: {
        backgroundColor: colors.white, borderRadius: 10, elevation: 2, 
        paddingHorizontal: 10, paddingVertical: 15, marginTop: 40,
        justifyContent: 'center', alignItems: 'center'
    }
});

export default Theme;
