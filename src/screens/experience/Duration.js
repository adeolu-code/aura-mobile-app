import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard, Pressable } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput, DatePicker } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar';
import TimePicker from '../../components/explore/home_single/TimePicker';
import moment from 'moment'

import CancelComponent from '../../components/experience/CancelComponent';



class Duration extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, duration: 1, dates: [], experienceStartTime: '', addDate: false, noOfDays: 1,
        fromDate: '', toDate: '', toggleDate: true,  };
        
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    onValueChange = (duration) => {
        this.setState({ duration })
    }
    onValueChangeSecond = (noOfDays) => {
        this.setState({ noOfDays })
    }
    
    getFromDate = (value) => {
        const { noOfDays, toggleDate } = this.state
        const newDate = new Date(value);
        // const formatDate = moment(newDate).format('MMMM D, YYYY')
        if(noOfDays === 1) {
            this.setState({ toDate: moment(newDate).add(1, 'days') })
            // this.setState({ toDate: moment(newDate).add(1, 'days').format('MMMM D, YYYY') })
        }
        // this.setState({ fromDate: formatDate, toggleDate: false })
        this.setState({ fromDate: newDate, toggleDate: false })
        this.setState({ toggleDate: true })
    }
    getToDate = (value) => {
        const newDate = new Date(value);
        // const formatDate = moment(newDate).format('MMMM D, YYYY')
        this.setState({ toDate: newDate })
    }
    addDate = () => {
        const { noOfDays, fromDate, toDate, dates } = this.state
        const dateArr = [ ...dates ]
        const obj = { fromDate: fromDate.toISOString(), toDate: toDate.toISOString() }
        dateArr.push(obj)
        this.setState({ dates: dateArr, fromDate: '', toDate: '', noOfDays: 1, addDate: false })
    }
    saveDate = () => {
        const { noOfDays, fromDate, toDate } = this.state
        if(noOfDays === 1) {
            if(fromDate === '') {
                errorMessage('Please fill date')
            } else {
                this.addDate()
            }
        } else if (noOfDays === 2) {
            if(fromDate === '' || toDate === '') {
                errorMessage('Please fill the dates')
            } else {
                this.addDate()
            }
        }
    }
    removeItem = (index) => {
        const { dates } = this.state
        const arr = [...dates]
        arr.splice(index, 1)
        this.setState({ dates: arr })
    }

    setStartTime = (value) => {
        this.setState({ experienceStartTime: moment(value).format('h:mmA') })
        // const { formData } = this.state;
        // this.setState({ errors: []})
        // const obj = { ...formData, Arrival_Time_From: moment(value).format('HH:mm:ss') }
        // this.checkTimeNotLowerThanCurrentTime(moment(value).format('HH:mm'), true)
        // this.setState(() => ({ formData: obj }), () => {
        //     if(formData.Arrival_Time_To) {
        //         this.checkTimeNotLowerThanCurrentTime(formData.Arrival_Time_To, false)
        //     }
            
        // })
    }

    onAddDate = () => {
        this.setState({ addDate: !this.state.addDate })
    }

    validate = () => {
        return false
    }

    updateExperience = async () => {
        const { tourOnboard } = this.context.state;
        const { duration, dates, experienceStartTime } = this.state
        this.setState({ loading: true });
        const obj = {
            // dates, 
            duration, experienceStartTime, 
            id: tourOnboard.id
        }
        // this.props.navigation.navigate('TourStack', { screen: 'TourGuestPricing' })
        const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        console.log('update experience ', res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            // this.props.navigation.navigate('TourStack', { screen: 'TourGuestPricing' })
            this.props.navigation.navigate('TourStack', { screen: 'TourCalendar' })
        }  
    }

    renderPickerItem = () => {
        const { textOrange, textH4Style, textBold } = GStyles
        const arr = []
        Array.from(Array(10), (_, i) => {
            arr.push(i+1)
            arr.push(i+1+0.5) 
        })
        return (
            <Picker mode="dropdown" Icon={<Icon name="ios-arrow-down" />}
                style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                selectedValue={this.state.duration}
                placeholder="Duration"
                onValueChange={this.onValueChange}>
                {arr.map((item, i) => {
                    return (
                        <Picker.Item label={`${item} hour${item > 1 ? 's' : ''}`} value={item} key={i} />
                    )
                })}
            </Picker>
        )
    }
    renderSecondPicker = () => {
        const newArr = new Array(2).fill(0)
        return (
            <Picker mode="dropdown" Icon={<Icon name="ios-arrow-down" />}
                style={{ width: Platform.OS === 'ios' ? '100%' : undefined }}
                selectedValue={this.state.noOfDays}
                onValueChange={this.onValueChangeSecond}>
                {newArr.map((item, i) => {
                    return (
                        <Picker.Item label={`${i+1} ${i+1 > 1 ? 'or more days' : 'day'}`} value={i+1} key={i+200} />
                    )
                })}
            </Picker>
        ) 
    }
    renderAddDates = () => {
        const { addDate } = this.state;
        const { textH3Style, textGrey, textBold, textH4Style } = GStyles
        if(addDate) {
            return (
                <View>
                    <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 10, marginTop: 10}]}>
                        How Many Days Will Your Experience Be?
                    </MyText>
                    <MyText style={[textH4Style, textGrey ]}>Experience Number Of Days</MyText>
                    <View style={[styles.picker, { marginBottom: 5}]}>
                        {this.renderSecondPicker()}
                    </View>
                    {this.renderMoreDaysDate()}
                    <View style={{ marginTop: 10}}>
                        <CustomButton buttonText="Save Date" textStyle={{ color: colors.orange }} onPress={this.saveDate}
                        buttonStyle={{ borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white}} />
                    </View>
                </View>
            )
        }
    }

    renderMoreDaysDate = () => {
        const { noOfDays, fromDate, toggleDate } = this.state;
        const { flexRow } = GStyles
        const minEndDate = fromDate ? new Date(moment(fromDate).add(1, 'days').format()) : new Date()
        if(noOfDays > 1) {
            return (
                <View style={[flexRow, { alignItems: 'center', width: '100%', justifyContent: 'space-between'}]}>
                    <View style={{ flex: 1}}>
                        <DatePicker placeholder="Start Date" receiveData={this.getFromDate} minDate={new Date()} />
                    </View>
                    <Icon name="arrow-forward" style={{ color: colors.orange, fontSize: 30, paddingHorizontal: 15 }} />
                    <View style={{ flex: 1}}>
                        {toggleDate ? <DatePicker placeholder="End Date" receiveData={this.getToDate} minDate={minEndDate} />:<></>}
                    </View>
                </View>
            )
        }
        return (
            <DatePicker placeholder="Date" receiveData={this.getFromDate} minDate={new Date()} />
        )
    }

    renderDates = () => {
        const { textH4Style, textH5Style, textGrey, flexRow } = GStyles
        const { dates } = this.state
        if(dates.length > 0) {
            return (
                <View style={{ borderWidth: 1, borderRadius: 8, borderColor: colors.lightGrey, paddingLeft: 10}}>
                    {dates.map((item, i) => {
                            return (
                                <View key={`DAT_${i}`} style={[flexRow, { justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}]}>
                                    <MyText style={[textH5Style, textGrey]}>{i+1}. </MyText>
                                    <MyText style={[textH5Style, textGrey]}>{moment(item.fromDate).format('MMMM D, YYYY')}</MyText>
                                    <Icon name="arrow-forward" style={{ color: colors.orange, fontSize: 16}} />
                                    <MyText style={[textH5Style, textGrey]}>{moment(item.toDate).format('MMMM D, YYYY')}</MyText>
                                    <TouchableOpacity style={{paddingHorizontal: 10}} onPress={this.removeItem.bind(this, i)}>
                                        <Icon name="close-circle" style={{ color: colors.orange, fontSize: 22}} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }) 
                    }
                </View>
            )
        }
    }

    

    componentDidMount = () => {
        const { tourOnboard, editTour } = this.context.state;
        if(editTour) {
            console.log(tourOnboard.experienceStartTime)
            this.setState(() => ({ duration: tourOnboard.duration, experienceStartTime: tourOnboard.experienceStartTime, toggleDate: false }),
            () => {
                this.setState({ toggleDate: true })
            })
            
        }
    }


  render() {
    const { container, button, timeContainer } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { dates, toggleDate, experienceStartTime } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Duration" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                    <ProgressBar width={16.7 * 5} />
                    <ProgressBar width={12.5 * 5} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={{ paddingHorizontal: 5}}>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                                How long is your experience?
                            </MyText>
                            <MyText style={[textH4Style, textGrey ]}>Most experiences are under three hours.</MyText>

                            <MyText style={[textH4Style, textGrey, textBold, { marginTop: 10} ]}>Duration</MyText>
                            <View style={styles.picker}>
                                {this.renderPickerItem()}
                            </View>

                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 15, marginTop: 15}]}>
                                What time would you typically start your experience ?
                            </MyText>
                            <MyText style={[textH4Style, textGrey ]}>Experience start time</MyText>
                            <View style={timeContainer}>
                                {toggleDate ? <TimePicker receiveTime={this.setStartTime} defaultValue={experienceStartTime} 
                                 /> : <></>}
                            </View>

                            {this.renderDates()}
                            {/* <Pressable style={[flexRow, styles.selectStyle]} onPress={this.onAddDate}>
                                <Icon name="md-add-circle" style={{ color: colors.orange, marginRight: 20}} />
                                <MyText style={[textH4Style, textBold]}>{ dates.length > 0 ? `Add Mores Dates` : 'Add Dates'}</MyText>
                            </Pressable> */}

                            {this.renderAddDates()}
                            
                            
                        </View>
                    </View>
                    
                    <View style={button}>
                        <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, ...GStyles.shadow}} 
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
    timeContainer: {
        flex: 1, 
        paddingHorizontal: 2, marginBottom: 30
        // borderWidth: 1
    },
    selectStyle: {
        backgroundColor: colors.white, borderRadius: 10, elevation: 2, ...GStyles.shadow,
        paddingHorizontal: 10, paddingVertical: 10, marginTop: 10, marginBottom: 10,
        justifyContent: 'center', alignItems: 'center'
    },
    skipStyle: {
        marginBottom: 30
    }
});

export default Duration;
