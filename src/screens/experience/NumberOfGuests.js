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
        this.props.navigation.navigate('TourStack', { screen: 'TourDuration' })
        // const { tourOnboard } = this.context.state;
        // const { maximumGroupSize } = this.state
        // this.setState({ loading: true });
        // const obj = {
        //     maximumGroupSize, 
        //     id: tourOnboard.id
        // }
        // const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        // console.log('update experience ', res)
        // this.setState({ loading: false });
        // if (res.isError || res.IsError) {
        //     errorMessage(res.message || res.Message)
        // } else {
        //     this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
        //     this.props.navigation.navigate('TourStack', { screen: 'TourDuration' })
        // }  
    }

    renderPickerItem = () => {
        const { textOrange, textH4Style, textBold } = GStyles
        const numbers = new Array(11).fill(0)
        const pickerItems = ['Choose Number Of Guests', ...numbers]
        return (
            <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.minimumAge}
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
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 6 / 8</MyText>
                    <ProgressBar width={80} />
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
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2}} 
                        onPress={this.updateExperience} />
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
        flex: 1, marginBottom: 40, marginTop: 50, justifyContent: 'flex-end'
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
});

export default NumberOfGuests;
