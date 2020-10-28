import React, { Component } from "react";
import { Styles } from "./host.style";
import { Footer, Container, Content, View, Switch } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import TipViewComponent from "../../components/tip_view/tipView.component";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class PropertyAvailability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDays: {},
            available: true,
        }
    }

    toggleSelectedDate = (date) => {
        let selectedDatesKey = Object.keys(this.state.selectedDays);
        
        console.log("keys ", selectedDatesKey)
        
        if (selectedDatesKey.includes(date)) {
            
            let selectedDates = this.state.selectedDays;
            
            delete selectedDates[date];
            
            this.setState({selectedDays: selectedDates});

            setTimeout(() => {
                console.log("new dates ", this.state.selectedDays);
            }, 1000);
        }
        else {
            this.setState({
                selectedDays: {...this.state.selectedDays, ...{
                    [date]: {
                        startingDay: true, color: colors.orange, endingDay: true, textColor: colors.white
                    }
                }}
            });

            setTimeout(() => {
                console.log("add new date", this.state.selectedDays);
            }, 1000);
        }
    }

    render() {
        const {
            textBold,
            textH4Style,
            textCenter,
            textWhite,
          } = GStyles;
        const markedDates = Object.assign({}, this.state.selectedDays)
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Property Availability Dates" 
                    />
                    <Container style={[Styles.container, {marginTop: 140}]}>
                        <Content scrollEnabled>
                            <TipViewComponent text={"Tap the dates of the months in the calendar below that your property would be available for hosting. Toggle the “Available This Month” switch if your property won’t be available for a particular month."} />
                            <View>
                                <Calendar
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
                                    hideDayNames={false}
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
                                    markingType={'period'}
                                    markedDates={markedDates}
                                    onDayPress={(day) => this.toggleSelectedDate(day.dateString)}
                                />
                            </View>
                            <View style={[Styles.rowView, {justifyContent: 'flex-end', marginTop: 10, marginBottom: 10}]}>

                                <MyText>Available This Month:</MyText>
                                <Switch
                                    onValueChange={() => {}}
                                    value={this.state.available} 
                                />
                            </View>
                            
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('SetPricing')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        )
    }
}