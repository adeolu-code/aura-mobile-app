import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";

export default class NotifyHost extends Component {
    constructor() {
        super();

        this.state = {};
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
                            <View style={[Styles.rowView]}>
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
                            
                            <MyText style={[textBold, {marginTop: 20}]}>When Can Guests Check In?</MyText>
                        </Content>
                        <Footer style={[Styles.footer, {borderRadius: 5,}]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('BookingPreview')}
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