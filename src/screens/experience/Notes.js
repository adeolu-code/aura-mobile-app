import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar';
import CancelComponent from '../../components/experience/CancelComponent';




class Notes extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, notes: ''  };
  }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    updateExperience = async () => {
        // this.props.navigation.navigate('TourStack', { screen: 'TourGuestRequirement' })

        const { tourOnboard } = this.context.state
        this.setState({ loading: true, errors: [] });
        const obj = {
            notes: this.state.notes,
            id: tourOnboard.id
        }
        const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        console.log('update experience ', res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.navigation.navigate('TourStack', { screen: 'TourGuestRequirement' })
        }  
    }

  

  componentDidMount = () => {
    const { tourOnboard, editTour } = this.context.state;
    if(editTour) {
        this.setState({ notes: tourOnboard.notes })
    }
  }

  render() {
    const { container, button } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    const placeholder = `Try addressing any concerns guests might have about booking your experience`
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Notes" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                    <ProgressBar width={16.7 * 5} />
                    <ProgressBar width={14.2 * 2} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 20 }}>
                        <View>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                            What else do guests need to know before they book?
                            </MyText>
                            <MyText style={[textH4Style, textGrey ]}>
                            Some information may seem obvious, but be detailed so guests are over-prepared.
                            </MyText>

                            <View style={{paddingHorizontal: 2, marginTop: 30}}>
                                <View>
                                    <CustomInput placeholder={placeholder} 
                                    textInputStyle={{ height: 150, marginBottom:10 }} textAlignVertical="top" 
                                    value={this.state.notes} onChangeText={this.onChangeValue} attrName="notes" />
                                </View>
                            </View>
                            
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2}} onPress={this.updateExperience} />
                    </View>
                    <View style={[flexRow, styles.skipStyle]}>
                        {this.context.state.editTour ? <CancelComponent {...this.props} /> : <></>}
                        <View style={{ flex: 1}}>
                            <CustomButton buttonText="Skip To Step 6" 
                            buttonStyle={{ elevation: 2, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
                            textStyle={{ color: colors.orange }}
                            onPress={()=> { this.props.navigation.navigate('TourStack', { screen: 'TourSafetyOverview' }) }} />
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
        flex: 1, marginBottom: 20, marginTop: 100, justifyContent: 'flex-end'
    },
    selectRow: {
        alignItems: 'flex-start', paddingBottom: 10
    },
    skipStyle: {
        marginBottom: 30
    }
});

export default Notes;
