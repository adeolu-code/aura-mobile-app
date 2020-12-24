/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'native-base';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, CustomButton } from '../../../utils/Index';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';




class CheckInModal extends Component {
  constructor(props) {
    super(props);
    this.state = { check_In_Date: '', day: '', markedDates: {}, toggle: true, bookedDates: {} };
  }

  next = () => {
    const { check_In_Date } = this.state
    this.props.onDecline();
    this.props.next(check_In_Date)
  }
  selectDate = (day) => {
    const date = `${day.month}/${day.day}/${day.year}`;
    const obj = {[day.dateString]: {selected: true, selectedColor: colors.orange}}
    this.setState({ check_In_Date: date, day, markedDates: {...this.state.bookedDates, ...obj} })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.props.bookedDays.length !== prevProps.bookedDays.length) {
        let obj = {}
        this.props.bookedDays.filter(item => {
            const newDate = new Date(item)
            const yr = newDate.getFullYear()
            const month = newDate.getMonth() + 1
            const day = newDate.getDate()
            const date = `${yr}-${month}-${day < 10 ? "0"+day : day}`
            obj[`${date}`] = {selected: true, selectedColor: colors.lightGrey, textColor: colors.darkBlue, disabled: true, disableTouchEvent: true}
        })
        this.setState(() => ({ markedDates: { ...obj }, bookedDates: { ...obj }, toggle: false}), ()=>{
            this.setState({ toggle: true })
        })
    }
  }

  render() {
    const { visible, onDecline } = this.props;
    const { modalContainer, buttonContainer, modalHeader, lineStyle, closeStyle, buttomStyle, 
        headerStyle, calendarContainer, daysStyles, dayStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textGrey, textH3Style } = GStyles;
    const { toggle } = this.state
    const markedDates = Object.assign({}, this.state.markedDates)
    // console.log('Render marked dates ', markedDates)
    
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
            <View style={{ flex: 1}}>
                <View style={buttomStyle}>
                    <View style={buttonContainer}>
                        <CustomButton buttonText="Next" onPress={this.next} disabled={!this.state.check_In_Date} />
                    </View>
                </View>
                <View style={modalContainer}>
                    <View style={[flexRow, modalHeader]}>
                        <View style={{ flex: 6, alignItems: 'center'}}>
                            <View style={lineStyle}></View>
                        </View>
                        <TouchableOpacity style={closeStyle} onPress={onDecline}>
                            <Icon type="Feather" name="x" />
                        </TouchableOpacity>
                    </View>
                    <View style={headerStyle}>
                        <MyText style={[textH3Style, textExtraBold, textDarkGrey, textCenter]}>
                            Select A Check-In Date
                        </MyText>
                    </View>
                    <View style={[flexRow, daysStyles]}>
                        <View style={dayStyle}>
                            <MyText style={[textH5Style, textGrey]}>Sun</MyText>
                        </View>
                        <View style={dayStyle}>
                            <MyText style={[textH5Style, textGrey]}>Mon</MyText>
                        </View>
                        <View style={dayStyle}>
                            <MyText style={[textH5Style, textGrey]}>Tue</MyText>
                        </View>
                        <View style={dayStyle}>
                            <MyText style={[textH5Style, textGrey]}>Wed</MyText>
                        </View>
                        <View style={dayStyle}>
                            <MyText style={[textH5Style, textGrey]}>Thu</MyText>
                        </View>
                        <View style={dayStyle}>
                            <MyText style={[textH5Style, textGrey]}>Fri</MyText>
                        </View>
                        <View style={dayStyle}>
                            <MyText style={[textH5Style, textGrey]}>Sat</MyText>
                        </View>
                    </View>

                    <View style={calendarContainer}>
                        {toggle ? <CalendarList
                            // Callback which gets executed when visible months change in scroll view. Default = undefined
                            onVisibleMonthsChange={(months) => {}}

                            markedDates={markedDates}

                            onDayPress={this.selectDate}

                            // Max amount of months allowed to scroll to the past. Default = 50
                            pastScrollRange={50}
                            // Max amount of months allowed to scroll to the future. Default = 50
                            futureScrollRange={50}
                            // Enable or disable scrolling of calendar list
                            scrollEnabled={true}
                            // Enable or disable vertical scroll indicator. Default = false
                            showScrollIndicator={true}
                            hideDayNames={true}
                            // minDate={'2020-09-18'}
                            minDate={new Date()}
                            // ...calendarParams
                            theme={{ 
                                textDayFontFamily: 'Nunito-Regular',
                                textMonthFontFamily: 'Nunito-Bold',
                                textDayHeaderFontFamily: 'Nunito-Regular',
                                textDayFontSize: 14,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16,
                            }}
                        /> : <></>}
                    </View>
                    
                </View>
                
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    container: {

    },
    daysStyles: {
        paddingVertical: 15, borderTopColor: colors.lightGrey, borderTopWidth: 1, 
        borderBottomColor: colors.lightGrey, borderBottomWidth: 1,
        paddingLeft: 10, paddingRight: 15
    },
    dayStyle: {
        flex: 1, alignItems: 'center',
        // borderWidth: 1,
    },
    modalContainer: {
        backgroundColor: colors.white, 
        // paddingHorizontal: 20
    },
    modalHeader: {
        marginTop: Platform.OS === 'ios' ? 50 : 30, marginBottom: 20, alignItems: 'center',
        paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 10
    },
    lineStyle: {
        width: '20%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
    },
    closeStyle: {
        height: 30, flex: 1, justifyContent:'flex-end',alignItems: 'flex-end'
    },
    calendarContainer: {
        // borderWidth: 1
    },
    buttomStyle: {
        backgroundColor: colors.white, elevation: 3, width: '100%', position: 'absolute',
        zIndex: 20, bottom: 0, paddingTop: 15, paddingHorizontal: 20, alignItems: 'flex-end',
        paddingBottom: 15
    },
    buttonContainer: {
        width: '30%'
    }
});

export default CheckInModal;
