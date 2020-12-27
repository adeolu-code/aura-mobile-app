import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar';
import CancelComponent from '../../components/experience/CancelComponent';




class Language extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, languages: [], languageOne: null, languageTwo: null  };
  }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    getLanguageList = async () => {
        this.setState({ loading: true, errors: [] });
        const res = await GetRequest(urls.experienceBase, `${urls.v}experience/language/list`);
        console.log(res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message);
        } else {
            
            const obj = { description: '', name: 'Please Select a language', id: null }
            this.setState({ languages: [obj, ...res.data] })
            const { tourOnboard, editTour } = this.context.state;
            if(editTour) {
                const lOne = res.data.find(item => item.id === tourOnboard.languageId[0])
                const lTwo = res.data.find(item => item.id === tourOnboard.languageId[1])
                this.setState({ languageOne: lOne.id, languageTwo: lTwo.id })
            }
        }
    }

    onValueChange = (value) => {
        this.setState(() => ({ languageOne: value }), () => {
            
        });
    }
    validate = () => {
        const { languageOne, languageTwo } = this.state;
        if(languageOne === null || languageTwo === null) {
            return true
        }
        return false
    }

    onValueChangeTwo = (value) => {
        this.setState({ languageTwo: value })
    }

    renderPickerItem = () => {
        const { languages, loading } = this.state;
        const { textOrange, textH4Style, textBold } = GStyles
        if(languages.length !== 0) {
            return (<Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.languageOne}
                onValueChange={this.onValueChange}>
                {languages.map(item => {
                    return (
                        <Picker.Item label={item.name} value={item.id} key={item.id} />
                    )
                })}
            </Picker>)
        }
        if(loading) {
            return (
                <View style={{paddingHorizontal: 20}}>
                    <MyText style={[textBold, textOrange, textH4Style]}>Loading...</MyText>
                </View>
            )
        }
    }
    renderPickerItemTwo = () => {
        const { languages, loading } = this.state;
        const { textOrange, textH4Style, textBold } = GStyles
        if(languages.length !== 0) {
            return (<Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: undefined }}
                selectedValue={this.state.languageTwo}
                onValueChange={this.onValueChangeTwo}>
                {languages.map(item => {
                    const key = `Ke_${item.id}`
                    return (
                        <Picker.Item label={item.name} value={item.id} key={key} />
                    )
                })}
            </Picker>)
        }
        if(loading) {
            return (
                <View style={{paddingHorizontal: 20}}>
                    <MyText style={[textBold, textOrange, textH4Style]}>Loading...</MyText>
                </View>
            )
        }
    }
  
  next = () => {
    const { tourOnboard } = this.context.state
    const { languageOne, languageTwo } = this.state
    this.context.set({ tourOnboard: { ...tourOnboard, languageOne, languageTwo }})
    this.props.navigation.navigate('TourStack', { screen: 'TourAudience' })
  }

  componentDidMount = () => {
    this.getLanguageList()
  }
  

  

  render() {
    const { container, button, picker, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {/* {this.renderLoading()} */}
            <Header { ...this.props } title="Language" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 3 / 6</MyText>
                    <ProgressBar width={16.7 * 3} />
                    <ProgressBar width={50} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 30 }}>
                        <View>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                                What's your primary language?
                            </MyText>
                            <MyText style={[textH4Style, textGrey ]}>
                            You should be able to read, write, and speak in this language.
                            </MyText>
                            <View style={picker}>
                                {this.renderPickerItem()}
                            </View>
                        </View>

                        <View style={{ marginTop: 40, marginBottom: 30}}>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                            What other language do you speak fluently?
                            </MyText>
                            <MyText style={[textH4Style, textGrey ]}>
                                Only add a language you'd be comfortable hosting in.
                            </MyText>
                            <View style={picker}>
                                {this.renderPickerItemTwo()}
                            </View>
                        </View>
                        


                        
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.next} disabled={this.validate()} />
                    </View>
                    <View style={[flexRow, styles.skipStyle]}>
                        {this.context.state.editTour ? <CancelComponent {...this.props} /> : <></>}
                        <View style={{ flex: 1}}>
                            <CustomButton buttonText="Skip To Step 4" 
                            buttonStyle={{ elevation: 2, ...GStyles.shadow, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} 
                            textStyle={{ color: colors.orange }}
                            onPress={()=> { this.props.navigation.navigate('TourStack', { screen: 'TourDescribeActivity' }) }} />
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
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    },
    picker: {
        borderWidth: 1, borderRadius: 5, height: 50,
        borderColor: colors.lightGreyOne,
        marginTop: 15, justifyContent: 'center'
    },
    skipStyle: {
        marginBottom: 30, 
    }
});

export default Language;
