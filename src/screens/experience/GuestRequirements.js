import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar'
import CancelComponent from '../../components/experience/CancelComponent';




class GuestRequirements extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, value: '', activityLevel: '', skillLevel: '', minimumAge: 0  };
        this.activityLevels = ['Light', 'Moderate', 'Strenuous', 'Extreme'];
        this.skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    onValueChange = (minimumAge) => {
        console.log(minimumAge)
        this.setState({ minimumAge })
    }

    selectLevel = (activityLevel) => {
        this.setState({ activityLevel })
    }

    selectSkill = (skillLevel) => {
        this.setState({ skillLevel })
    }
    validate = () => {
        const { activityLevel, skillLevel } = this.state
        // if(activityLevel === '' || skillLevel === '') {
        //     return true
        // }
        return false
    }

    updateExperience = async () => {
        // this.props.navigation.navigate('TourStack', { screen: 'TourNumberOfGuests' })
        try {
            const { tourOnboard } = this.context.state;
            const { activityLevel, skillLevel, minimumAge } = this.state
            this.setState({ loading: true, errors: [] });
            const obj = {
                activityLevel, 
                skillLevel,
                minimumAge,
                id: tourOnboard.id
            }
            const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
            console.log('update experience ', res)
            this.setState({ loading: false });
            if (res.isError || res.IsError) {
                errorMessage(res.message || res.Message)
            } else {
                this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
                this.props.navigation.navigate('TourStack', { screen: 'TourNumberOfGuests' })
            }
        } catch (error) {
            
        }
          
    }

    renderPickerItem = () => {
        const { textOrange, textH4Style, textBold } = GStyles
        const numbers = new Array(22).fill(0)
        return (
            <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
                style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                placeholder="Select Age"
                selectedValue={this.state.minimumAge}
                onValueChange={this.onValueChange}>
                {numbers.map((item, i) => {
                    return (
                        <Picker.Item label={`${i}`} value={i} key={i} />
                    )
                })}
            </Picker>
        )
    }

    renderActivityLevels = () => {
        const { flexRow, textH4Style, textGrey } = GStyles
        const { activeRadio, selectRow, radioContainer } = styles
        const { activityLevel } = this.state
        return this.activityLevels.map((item, i) => {
            const key = `AL_${i}`
            return (
                <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectLevel.bind(this, item)} key={key}>
                    <View style={radioContainer}>
                        <View style={[activityLevel === item ? activeRadio : '']}></View>
                    </View>
                    <MyText style={[textH4Style, textGrey, { flex: 1}]}>{item}</MyText>
                </TouchableOpacity>
            )
        })
    }
    renderSkillLevels = () => {
        const { flexRow, textH4Style, textGrey } = GStyles
        const { activeRadio, selectRow, radioContainer } = styles;
        const { skillLevel } = this.state
        return this.skillLevels.map((item, i) => {
            const key = `SL_${i}`
            return (
                <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectSkill.bind(this, item)} key={key}>
                    <View style={radioContainer}>
                        <View style={[skillLevel === item ? activeRadio : '']}></View>
                    </View>
                    <MyText style={[textH4Style, textGrey, { flex: 1}]}>{item}</MyText>
                </TouchableOpacity>
            )
        })
    }

    componentDidMount = () => {
        const { tourOnboard, editTour } = this.context.state;
        if(editTour) {
            this.setState({ minimumAge: tourOnboard.minimumAge, 
                skillLevel: this.skillLevels[tourOnboard.skillLevel], activityLevel: this.activityLevels[tourOnboard.activityLevel] })
        }
    }


  render() {
    const { container, button } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Guest Requirements" />
            <View style={container}>
                <View style={{ marginTop: 20}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                    <ProgressBar width={16.7 * 5} />
                    <ProgressBar width={12.5 * 3} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                                Who can attend your experience ?
                            </MyText>

                            <MyText style={[textH4Style, textGrey ]}>Minimum Age</MyText>
                            <View style={styles.picker}>
                                {this.renderPickerItem()}
                            </View>

                            <View style={{paddingHorizontal: 2, marginTop: 30}}>
                                <View style={styles.divider}></View>
                                <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                                    What activity level should people expect ?
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginBottom: 10} ]}>
                                    Think about how active people will get during your entire experience.
                                </MyText>
                                {this.renderActivityLevels()}

                                <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                                    What skill level is required?
                                </MyText>
                                <MyText style={[textH4Style, textGrey, { marginBottom: 10}]}>
                                Think about how experienced people should be to take your activity.
                                </MyText>
                                {this.renderSkillLevels()}
                            </View>
                            
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, ...GStyles.shadow}} disabled={this.validate()} 
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
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    },
    
    radioContainer: {
        borderRadius: 18, width: 18, height: 18, borderWidth: 2, borderColor: colors.orange, justifyContent: 'center', alignItems: 'center', 
        marginRight: 10, marginTop: 2
    },
    activeRadio: {
        width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10, 
    },
    selectRow: {
        alignItems: 'flex-start', paddingBottom: 10, marginTop: 15
    },
    touchContainer: {
        borderRadius: 8, elevation: 2, backgroundColor: colors.white, padding: 15, marginTop: 10, width: '100%'
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

export default GuestRequirements;
