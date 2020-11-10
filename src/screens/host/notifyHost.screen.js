import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText, CheckBox, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";
import DateTimePickerComponent from "../../components/date_time_picker/dateTimePicker.component";

import { AppContext } from '../../../AppProvider'


// const DP = require("react-native-zdatepicker");

export default class NotifyHost extends Component {
    static contextType = AppContext
    constructor() {
        super();
        this.state = { time: new Date(), date: new Date(), values: [] };
    }

    days = [
        { name: 'Same day', value: 0 },
        { name: '1 day before', value: 1 },
        { name: '2 days before', value: 2 },
        { name: '3 days before', value: 3 },
        { name: '7 days before', value: 7 }
    ];
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
        const { values, time, date } = this.state
        const propertyFormData = state.propertyFormData
        const obj = { ...propertyFormData, daysToNotifyHost: values[0].value, 
            checkInTimeFrom: new Date().getTime(time), checkInTimeTo: new Date().getTime(date) }
        // console.log(obj)
        set({ propertyFormData: obj })
        this.props.navigation.navigate('BookingDuration')
    }

    render() {
        const {
            textOrange, textBold, textGrey, flexRow, textH4Style, textH3Style, textCenter, imgStyle,
            textWhite, textH5Style, textlightGreyTwo, textUnderline, textGreen,
          } = GStyles;
        return(
            <>
                {/* <StatusBar backgroundColor={colors.white} barStyle="dark-content" /> */}
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="When Should We Notify You Before A Guest Shows Up" />
                    <Container style={[Styles.container, {marginTop: 200}]}>
                        <Content scrollEnabled>
                            <View style={[Styles.rowView, {}]}>

                                <MyText style={[textH4Style]}><MyText style={[textGreen]}>Tips: </MyText>
                                    <MyText style={[textGrey]}>
                                    At least 2 days’ notice can help you plan for a guest’s arrival, but you might miss out on last minutes trips.
                                    </MyText>
                                </MyText>
                            </View>
                            <View style={[{marginTop: 20}]}>
                                {this.renderDays()}
                                {/* {
                                    this.days.map((option, index) => 
                                    {
                                        let key = "D_"+index;
                                        return (
                                            <LabelCheckbox 
                                                key={index}
                                                label={option.name}
                                                checked={this.state[key]}
                                                onPress={() => this.setState({[key]: !this.state[key]})}
                                            />
                                        );
                                    })
                                } */}
                            </View>
                            
                            <MyText style={[textBold, textH4Style, {marginTop: 20, marginBottom: 10 }]}>When Can Guests Check In?</MyText>
                            <View style={[Styles.rowView]}>
                                <MyText style={[textlightGreyTwo, {marginTop: 5, flex: 1}]}>From</MyText>
                                <MyText style={[textlightGreyTwo, {marginTop: 5, flex: 1}]}>To</MyText>
                            </View>
                            <View style={[Styles.rowView]}>                            
                                <DateTimePickerComponent 
                                    mode={"time"}
                                    onChange={(e) => this.setState({time: e})}
                                    value={new Date()}
                                    display="spinner"
                                    format="HH:MM A"
                                    style={{flex: 1, marginRight: 10}}
                                />
                                <DateTimePickerComponent 
                                    mode={"time"}
                                    onChange={(e) => this.setState({date: e})}
                                    value={new Date()}
                                    display="spinner"
                                    format="HH:MM A"
                                    style={{flex: 1}}
                                />
                            </View>
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5, }]}>
                            <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.submit} disabled={this.state.values.length === 0} />
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}