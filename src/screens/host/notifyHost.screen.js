import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, Platform, ScrollView } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText, CheckBox, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";
import DateTimePickerComponent from "../../components/date_time_picker/dateTimePicker.component";

import { AppContext } from '../../../AppProvider';

import moment from 'moment'



export default class NotifyHost extends Component {
    static contextType = AppContext
    constructor() {
        super();
        this.state = { fromValue: '', toValue: '', values: [] };
        this.scrollViewRef = React.createRef();
    }
    componentDidMount = () => {
        // const obj = {
        //     hours: new Date().getHours(),
        //     minutes: new Date().getMinutes(),
        //     totalSeconds: new Date().getTime()
        // }
        // this.setState({ toValue: obj, fromValue: obj })
    }
    extractDateTime = (timeObj) => {
        if(timeObj) {
            const newDate = new Date(moment(timeObj, "hh:mm:ss"))
            // console.log('new DATe ',newDate)
            return newDate
        }
        // if(timeObj && timeObj.hours) {
        //     const newDate = new Date(timeObj.totalSeconds)
        //     return newDate
        // }
        return new Date()
    }

    days = [
        // { name: 'Same day', value: 0 },
        { name: '1 day before', value: 1 },
        { name: '2 days before', value: 2 },
        { name: '3 days before', value: 3 },
        { name: '7 days before', value: 7 }
    ];
    toValue = (date) => {
        // console.log(date)
        const toValue = moment(date, "hh:mm:ss").format("HH:mm:ss")
        // console.log(date, toValue)
        this.setState({ toValue })
        // const obj = {
        //     hours: new Date(date).getHours(),
        //     minutes: new Date(date).getMinutes(),
        //     totalSeconds: new Date(date).getTime()
        // }
        // this.setState({ toValue: obj })
    }
    fromValue = (date) => {
        
        const fromValue = moment(date, "hh:mm:ss").format("HH:mm:ss")
        // console.log(date, fromValue)
        this.setState({ fromValue })
        // const obj = {
        //     hours: new Date(date).getHours(),
        //     minutes: new Date(date).getMinutes(),
        //     totalSeconds: new Date(date).getTime()
        // }
        // this.setState({ fromValue: obj })
        setTimeout(() => {
            this.scrollViewRef.current.scrollToEnd({ animated: true })
        }, 50);
    }
    getDay = (value) => {
        const { values } = this.state
        const found = values.find(item => item.value === value)
        return found ? true : false
    }
    onCheckDay = (arg) => {
        // console.log(arg)
        const { values } = this.state
        const item = arg.item;
        const value = arg.value;
        let arr = []
        if(value) {
            arr.push(item)
            this.setState({ values: arr })
        } else {
            arr = [...values]
            const index = arr.findIndex(x => x.value === item.value )
            if(index !== -1) {
                arr.splice(index, 1)
                this.setState({ values: arr})
            }
        }
    }
    renderDays = () => {
        const { textNormal, textH5Style } = GStyles
        return this.days.map((item, index) => {
            let key = `D_${index}`;
            return (
                <CheckBox title={item.name} key={key} item={item} onPress={this.onCheckDay} value={this.getDay(item.value)} 
                    labelTextStyles={[textNormal, textH5Style]}  />
            ) 
        })
    }
    submit = () => {
        const { state, set } = this.context
        const { values, toValue, fromValue } = this.state
        const propertyFormData = state.propertyFormData
        // const obj = { ...propertyFormData, daysToNotifyHost: values[0].value}
        const obj = { ...propertyFormData, daysToNotifyHost: values[0].value, 
            checkInTimeFrom: fromValue, checkInTimeTo: toValue }
        console.log(obj)
        set({ propertyFormData: obj })
        this.props.navigation.navigate('BookingDuration')
    }
    componentDidMount = () => {
        const { state } = this.context

        // const obj = {
        //     hours: new Date().getHours(),
        //     minutes: new Date().getMinutes(),
        //     totalSeconds: new Date().getTime()
        // }
        // this.setState({ toValue: '', fromValue: '' })

        const ppty = state.propertyFormData;
        const day = this.days.find(item => item.value === ppty.daysToNotifyHost)
        if(day) {
            this.setState({ values: [day] })
        }
    }

    render() {
        const {
            textOrange, textBold, textGrey, flexRow, textH4Style, textH3Style, textCenter, imgStyle,
            textWhite, textH5Style, textlightGreyTwo, textUnderline, textGreen,
          } = GStyles;
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="When Should We Notify You Before A Guest Shows Up" wrapperStyles={{ position: 'relative'}} />
                    <Container style={[Styles.container, {marginTop: 0}]}>
                        <ScrollView ref={this.scrollViewRef}>
                            <View style={[Styles.rowView, {}]}>

                                <MyText style={[textH4Style]}><MyText style={[textGreen, textBold]}>Tips: </MyText>
                                    <MyText style={[textGrey]}>
                                    At least 2 days’ notice can help you plan for a guest’s arrival, but you might miss out on last minutes trips.
                                    </MyText>
                                </MyText>
                            </View>
                            <View style={[{marginTop: 20}]}>
                                {this.renderDays()}
                            </View>
                            
                            <MyText style={[textBold, textH4Style, {marginTop: 20, marginBottom: 10 }]}>When Can Guests Check In?</MyText>
                            <View style={[Styles.rowView]}>
                                <MyText style={[textlightGreyTwo, textH4Style, {marginTop: 5, flex: 1}]}>From</MyText>
                                <MyText style={[textlightGreyTwo, textH4Style, {marginTop: 5, flex: 1}]}>To</MyText>
                            </View>
                            <View style={[Styles.rowView,  ]}>  
                                <View style={{ width: '48%' }}>                          
                                    <DateTimePickerComponent 
                                        mode={"time"}
                                        onChange={this.fromValue}
                                        value={this.extractDateTime(this.state.fromValue)}
                                        display={Platform.OS ? "spinner" : "clock"}
                                        format="hh:mm a"
                                        style={{flex: 1, marginRight: 10 }}
                                    />
                                </View>

                                <View style={{ width: '50%'}}>
                                    <DateTimePickerComponent 
                                        mode={"time"}
                                        onChange={this.toValue}
                                        value={this.extractDateTime(this.state.toValue)}
                                        display={Platform.OS ? "spinner" : "clock"}
                                        format="hh:mm a"
                                        style={{flex: 1}}
                                    />
                                </View>
                            </View>
                            <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5, marginTop: 20 }]}>
                                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.submit} disabled={this.state.values.length === 0} />
                            </Footer>
                        </ScrollView>
                        {/* <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5, }]}>
                            <CustomButton buttonText="Next" buttonStyle={{ elevation: 2, ...GStyles.shadow}} onPress={this.submit} disabled={this.state.values.length === 0} />
                        </Footer> */}
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}