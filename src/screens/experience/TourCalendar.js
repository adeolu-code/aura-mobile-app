import React, { Component } from "react";
import { Styles } from "../host/host.style";
import { Footer, Container, Content, View, } from "native-base";
import { MyText, Switch, CustomButton, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import {Calendar} from 'react-native-calendars';

import ProgressBar from '../../components/ProgressBar';


import { AppContext } from '../../../AppProvider';
import { urls, Request, GetRequest, errorMessage, SCREEN_HEIGHT } from '../../utils';
import { isEmpty } from '../../helpers';

import CancelComponent from '../../components/experience/CancelComponent';


import moment from 'moment';


export default class TourCalendar extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
            selectedDays: {}, available: true, markedDates: {}, blockedMonths: [], currentMonth: new Date().getMonth() + 1, 
            currentYear: new Date().getFullYear(), loading: false, gettingCalendar: false
        }
    }
    renderLoading = () => {
        const { loading, gettingCalendar } = this.state;
        if (loading || gettingCalendar) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 1000 }} />); }
    }
    getDaysInMonth = (month, year) => {
        return new Date(year,month,0).getDate()
    }

    onMonthChange = (month) => {
        const yr = month.year;
        const mth = month.month
        this.setState({ currentMonth: mth, currentYear: yr })
        this.checkSelectedMonths(month)
    }
    checkSelectedMonths = (month) => {
        const yr = month.year;
        const mth = month.month
        const { selectedDays } = this.state
        const obj = { ...selectedDays }
        const arr = []
        for (const item in obj) {
            const getYr = new Date(item).getFullYear()
            const getMonth = new Date(item).getMonth() + 1
            // console.log(item, getYr, getMonth)
            if(getYr === yr && getMonth === mth) {
                arr.push(item)
            }
        }
        const daysInMonth = this.getDaysInMonth(mth, yr)
        if(arr.length === daysInMonth) {
            this.setState({ available: false})
        } else {
            this.setState({ available: true })
        }
    }

    toggleSelectedDate = (date) => {
        const getYr = new Date(date).getFullYear()
        const getMonth = new Date(date).getMonth() + 1
        const monthObj = { month: getMonth, year: getYr }
        let selectedDatesKey = Object.keys(this.state.selectedDays);
        if (selectedDatesKey.includes(date)) {
            let selectedDates = this.state.selectedDays;
            delete selectedDates[date];
            
            this.setState(() => ({selectedDays: selectedDates}), ()=>{
                this.checkSelectedMonths(monthObj)
            });

        } else {
            this.setState(() => ({
                selectedDays: {...this.state.selectedDays, ...{
                    [date]: {
                        startingDay: true, endingDay: true, textColor: colors.lightGrey
                    }
                }}
            }), () => {
                this.checkSelectedMonths(monthObj)
            });
        }
    }
    submit = () => {
        this.setUnAvailable()
    }
    disableEnableMonth = (bool) => {
        this.setState(() => ({ available: bool}), () => {
            const { currentMonth, currentYear, selectedDays } = this.state
            const daysInMonth = this.getDaysInMonth(currentMonth, currentYear)
            if(!bool) {
                const markedSetting = { selected: true, textColor: colors.lightGrey }
                let obj = { ...selectedDays }
                for (let index = 1; index <= daysInMonth; index++) {
                    const date = `${currentYear}-${currentMonth}-${index < 10 ? "0"+index : index}`
                    obj[date] = {...markedSetting}
                }
                this.setState({ selectedDays: obj });
            } else {
                let obj = { ...selectedDays }
                for (let index = 1; index <= daysInMonth; index++) {
                    const date = `${currentYear}-${currentMonth}-${index < 10 ? "0"+index : index}`
                    delete obj[date]
                }
                this.setState({ selectedDays: obj });
            } 
        })
    }

    setUnAvailable = async () => {
        const { tourOnboard } = this.context.state;
        const { selectedDays } = this.state
        this.setState({ loading: true });
        const dateKeys = Object.keys(selectedDays)
        const dates = dateKeys.map(item => moment(item).toISOString())
        const obj = {
            dates, 
            id: tourOnboard.id
        }
        const res = await Request(urls.experienceBase, `${urls.v}experience/update`, obj );
        console.log('update experience ', res)
        this.setState({ loading: false });
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.navigation.navigate('TourStack', { screen: 'TourGuestPricing' })
        } 
    }

    getCalendar = async () => {
        const { state, set } = this.context
        const ppty = state.propertyFormData;
        try {
            this.setState({ gettingCalendar: true })
            const res = await GetRequest(urls.experienceBase, `${urls.v}listing/property/calendar/?propertyId=${ppty.id}`);
            this.setState({ gettingCalendar: false })
            if(res.isError) {
                const message = res.Message;
            } else {
                const data = res.data;
                if(data !== null) {
                    const bookedDays = data.bookedDays
                    bookedDays.filter(item => {
                        const newDate = new Date(item)
                        const yr = newDate.getFullYear()
                        const month = newDate.getMonth() + 1
                        const day = newDate.getDate()
                        const date = `${yr}-${month}-${day < 10 ? "0"+day : day}`
                        this.toggleSelectedDate(date)
                    })
                }
            }
        } catch (error) {
            this.setState({ gettingCalendar: false })
        }
        
    }

    componentDidMount = () => {
        const { tourOnboard, editTour } = this.context.state;
        // const ppty = state.propertyFormData;
        // this.getCalendar()
    }

    render() {
        const {
            textBold, textGrey, textGreen,
            textH4Style,
            textCenter,
            textWhite, textOrange, textH3Style, flexRow
          } = GStyles;
        const { container } = styles
        const markedDates = Object.assign({}, this.state.selectedDays)
        // const { markedDates } = this.state;

        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header {...this.props} title="Set your experience availability" />
                    <View style={[container]}>
                        <View style={{ marginTop: 50}}>
                            <MyText style={[textOrange, textBold, textH3Style]}>Step 5 / 6</MyText>
                            <ProgressBar width={16.7 * 5} />
                            <ProgressBar width={12.5 * 6} />
                        </View>
                        <Content scrollEnabled>
                            <View style={[Styles.rowView, {flexWrap: "wrap", alignItems: "flex-start", marginTop: 10}]}>
                                <MyText style={[textH4Style]}><MyText style={[textGreen, textBold]}>Tips: </MyText>
                                    <MyText style={[textGrey]}>
                                    Editing your calendar is easy — just select a date to block or unblock it. You can always make changes after you publish. 
                                    {/* Toggle the <MyText style={[textBold]}>“Available This Month”</MyText> switch if your property won’t be available for a particular month. */}
                                    </MyText>
                                </MyText>
                            </View>
                            <View style={{ paddingHorizontal: 2, ...GStyles.shadow, elevation: 2 }}>
                                <View style={[Styles.calendarContainer]}>
                                    <Calendar
                                        // Callback which gets executed when visible months change in scroll view. Default = undefined
                                        onVisibleMonthsChange={() => {}}
                                        // Max amount of months allowed to scroll to the past. Default = 50
                                        pastScrollRange={50}
                                        // Max amount of months allowed to scroll to the future. Default = 50
                                        futureScrollRange={50}
                                        // Enable or disable scrolling of calendar list
                                        scrollEnabled={true}
                                        // Enable or disable vertical scroll indicator. Default = false
                                        showScrollIndicator={true}
                                        hideDayNames={false}
                                        minDate={new Date()}
                                        hideExtraDays={true}
                                        // ...calendarParams
                                        theme={{ 
                                            textDayFontFamily: 'Nunito-Regular',
                                            textMonthFontFamily: 'Nunito-Bold',
                                            textDayHeaderFontFamily: 'Nunito-Regular',
                                            textDayFontSize: 14,
                                            textMonthFontSize: 16,
                                            textDayHeaderFontSize: 16,
                                        }}
                                        markingType="period"
                                        markedDates={markedDates}
                                        onDayPress={(day) => this.toggleSelectedDate(day.dateString)}
                                        onMonthChange={this.onMonthChange}
                                    />
                                </View>
                            </View>
                            {/* <View style={[Styles.rowView, {justifyContent: 'flex-end', marginTop: 20, marginBottom: 20}]}>

                                <MyText style={[textGrey, textH4Style]}>Available This Month:</MyText>
                                <View style={[{marginLeft: 10}]}>
                                    <Switch
                                        // onValueChange={() => {}}
                                        value={this.state.available} 
                                        onPress={this.disableEnableMonth}
                                    />
                                </View>
                            </View> */}
                            <View style={{marginBottom: 20, marginTop: 40}}>
                                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.submit} />
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
                        </Content>
                        
                    </View>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
    skipStyle: {
        marginBottom: 30
    }
});