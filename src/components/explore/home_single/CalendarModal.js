import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, CustomButton } from '../../../utils/Index';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



class CalendarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visible, onDecline } = this.props;
    const { modalContainer, buttonContainer, modalHeader, lineStyle, closeStyle, buttomStyle, 
        headerStyle, calendarContainer, daysStyles, dayStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textGrey, textH3Style } = GStyles
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
            <View style={{ flex: 1}}>
                <View style={buttomStyle}>
                    <View style={buttonContainer}>
                        <CustomButton buttonText="Next" />
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
                        <CalendarList
                            // Callback which gets executed when visible months change in scroll view. Default = undefined
                            onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                            // Max amount of months allowed to scroll to the past. Default = 50
                            pastScrollRange={50}
                            // Max amount of months allowed to scroll to the future. Default = 50
                            futureScrollRange={50}
                            // Enable or disable scrolling of calendar list
                            scrollEnabled={true}
                            // Enable or disable vertical scroll indicator. Default = false
                            showScrollIndicator={true}
                            hideDayNames={true}
                            minDate={'2020-09-18'}
                            // ...calendarParams
                            theme={{ 
                                textDayFontFamily: 'Nunito-Regular',
                                textMonthFontFamily: 'Nunito-Bold',
                                textDayHeaderFontFamily: 'Nunito-Regular',
                                textDayFontSize: 14,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 16
                            }}
                        />
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
        marginTop: 30, marginBottom: 20, alignItems: 'center',
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

export default CalendarModal;