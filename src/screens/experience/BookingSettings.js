import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar'
import { formatAmount } from '../../helpers';

const CHOOSE_TIME = 'Choose Amount of Time';

class BookingSettings extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, value: '', cutOffTimeForAdditionalGuest: '', cutOffTimeForFirstGuest:''  };
        this.times = [
            'Choose Amount of Time',
            '0 hour before start time', '1 hour before start time', '2 hours before start time', '3 hours before start time',
            '4 hours before start time', '5 hours before start time', '6 hours before start time', '1 day before start time',
            '2 days before start time', '3 days before start time', '4 days before start time', '1 week before start time'
        ]
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    
    onChangePickerOne = (cutOffTimeForAdditionalGuest) => {
        this.setState({ cutOffTimeForAdditionalGuest })
    }
    onChangePickerTwo = (cutOffTimeForFirstGuest) => {
        this.setState({ cutOffTimeForFirstGuest })
    }
    
    validate = () => {
        
        return false
    }

    updateExperience = async () => {
        // this.props.navigation.navigate('TourStack', { screen: 'TourSafetyOverview' })

        const { tourOnboard } = this.context.state;
        const { cutOffTimeForAdditionalGuest, cutOffTimeForFirstGuest } = this.state
        this.setState({ loading: true, errors: [] });
        const obj = {
            cutOffTimeForAdditionalGuest, cutOffTimeForFirstGuest,
            id: tourOnboard.id
        }
        const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        console.log('update experience ', res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.navigation.navigate('TourStack', { screen: 'TourSafetyOverview' })
        }  
    }
    renderPickerOne = () => {
        return (
            <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.cutOffTimeForAdditionalGuest}
                onValueChange={this.onChangePickerOne}>
                {this.times.map((item, i) => {
                    return (
                        <Picker.Item label={item} value={CHOOSE_TIME === item ? '' : item} key={i} />
                    )
                })}
            </Picker>
        ) 
    }
    renderPickerTwo = () => {
        return (
            <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.cutOffTimeForFirstGuest}
                onValueChange={this.onChangePickerTwo}>
                {this.times.map((item, i) => {
                    return (
                        <Picker.Item label={item} value={CHOOSE_TIME === item ? '' : item} key={i} />
                    )
                })}
            </Picker>
        ) 
    }
    
    componentDidMount = () => {

    }


  render() {
    const { container, button, currencyContainer } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Booking Settings" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                    <ProgressBar width={16.7 * 5} />
                    <ProgressBar width={14.3 * 7} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View>
                            <MyText style={[textH4Style, textGrey, { marginBottom: 40, marginTop: 15}]}>
                            We recommend setting your cutoff time close to your start time so more guests can book. 
                            Be sure to give yourself enough time to prepare for your guests.
                            </MyText>

                            <MyText style={[textH4Style, textGrey, textBold ]}>Cutoff time for additional guests</MyText>
                            <View style={styles.picker}>
                                {this.renderPickerOne()}
                            </View>

                            <MyText style={[textH4Style, textGrey, textBold, { marginTop: 50} ]}>Cutoff time for your first guest</MyText>
                            <View style={styles.picker}>
                                {this.renderPickerTwo()}
                            </View>
                            
                            
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2}} onPress={this.updateExperience} />
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
        flex: 1, marginBottom: 40, marginTop: 80, justifyContent: 'flex-end'
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    },
    
    picker: {
        borderWidth: 1, borderRadius: 5, height: 50,
        borderColor: colors.lightGreyOne,
        marginTop: 10, justifyContent: 'center'
    },
});

export default BookingSettings;
