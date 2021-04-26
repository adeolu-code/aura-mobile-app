import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY,  errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar';
import CancelComponent from '../../components/experience/CancelComponent';




class NumberOfGuests extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, maximumGroupSize: 0  };
        
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    onValueChange = (maximumGroupSize) => {
        this.setState({ maximumGroupSize })
    }

    validate = () => {
        
        return false
    }

    updateExperience = async () => {
        // this.props.navigation.navigate('TourStack', { screen: 'TourDuration' })
        const { tourOnboard } = this.context.state;
        const { maximumGroupSize } = this.state
        this.setState({ loading: true });
        const obj = {
            maximumGroupSize, 
            id: tourOnboard.id
        }
        const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        console.log('update experience ', res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.navigation.navigate('TourStack', { screen: 'TourDuration' })
        }  
    }

    renderPickerItem = () => {
        const { textOrange, textH4Style, textBold } = GStyles
        const numbers = new Array(20).fill(0)
        const pickerItems = ['Choose Number Of Guests', ...numbers]
        return (
            <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                selectedValue={this.state.maximumGroupSize}
                placeholder="Choose number of guests"
                onValueChange={this.onValueChange}>
                {pickerItems.map((item, i) => {
                    return (
                        <Picker.Item label={item === 0 ? `${i}` : item} value={i} key={i} />
                    )
                })}
            </Picker>
        )
    }

    

    componentDidMount = () => {
        const { tourOnboard, editTour } = this.context.state;
        if(editTour) {
            this.setState({ maximumGroupSize: tourOnboard.maximumGroupSize })
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
            <Header { ...this.props } title="Group Size" />
            <View style={container}>
                <View style={{ marginTop: 20}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                    <ProgressBar width={16.7 * 5} />
                    <ProgressBar width={12.5 * 4} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                            Maximum group size
                            </MyText>

                            <MyText style={[textH4Style, textGrey ]}>Think about the group size that works best for your experience. 
                            Should it be small and intimate? Is it fun with a large group?</MyText>
                            <View style={styles.picker}>
                                {this.renderPickerItem()}
                            </View>
                            
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, ...GStyles.shadow }} 
                        onPress={this.updateExperience} />
                    </View>
                    <View style={[flexRow, styles.skipStyle]}>
                        {this.context.state.editTour ? <CancelComponent {...this.props} /> : <></>}
                        <View style={{ flex: 1}}>
                        <CustomButton buttonText="Skip To Step 6" 
                        buttonStyle={{ elevation: 2, ...GStyles.shadow, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
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
        paddingHorizontal: 24, marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 20, marginTop: 50, justifyContent: 'flex-end'
    },
    textContainer: {
        paddingHorizontal: 10
    },
    
    picker: {
        borderWidth: 1, borderRadius: 5, height: 50,
        borderColor: colors.lightGreyOne,
        marginTop: 10, justifyContent: 'center'
    },
    divider: {
        height: 1.5, backgroundColor: colors.lightGrey, width: '100%'
    },
    skipStyle: {
        marginBottom: 30
    }
});

export default NumberOfGuests;
