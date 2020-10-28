import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";
import DateTimePickerComponent from "../../components/date_time_picker/dateTimePicker.component";

// const DP = require("react-native-zdatepicker");

export default class NotifyHost extends Component {
    constructor() {
        super();

        this.state = {
            time: new Date(),
            date: new Date(),
        };
    }

    days = [
        "Same day",
        "1 day before",
        "2 days before",
        "3 days before",
        "7 days before",
    ];

    render() {
        const {
            textOrange,
            textBold,
            flexRow,
            textH4Style,
            textH3Style,
            textCenter,
            imgStyle,
            textWhite,
            textH5Style, 
            textlightGreyTwo,
            textUnderline,
            textGreen,
          } = GStyles;
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="When Should We Notify You Before A Guest Shows Up" 
                    />
                    <Container style={[Styles.container, {marginTop: 180}]}>
                        <Content scrollEnabled>
                            <View style={[Styles.rowView, {}]}>
                                <MyText style={[textGreen, textBold]}>Tips: </MyText>
                                <MyText style={[textBold]}>
                                  At least 2 days’ notice can help you plan for a guest’s arrival, but you might miss out on last minutes trips.
                                </MyText>
                            </View>
                            <View style={[{marginTop: 20}]}>
                                {
                                    this.days.map((option, index) => 
                                    {
                                        let key = "D_"+index;
                                        return (
                                            <LabelCheckbox 
                                                key={index}
                                                label={option}
                                                checked={this.state[key]}
                                                onPress={() => this.setState({[key]: !this.state[key]})}
                                            />
                                        );
                                    })
                                }
                            </View>
                            
                            <MyText style={[textBold, {marginTop: 20, }]}>When Can Guests Check In?</MyText>
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
                                    style={{flex: 1, marginRight: 10}}
                                />
                            </View>
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5, }]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('BookingDuration')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}