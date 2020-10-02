import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";

export default class BookingInformationRequirements extends Component {
    constructor() {
        super();

        this.state = {};
    }

    guestProvisionList = [
        "Agree to your House Rules",
        "Message you about their trip",
        "Let yu know how many guests are coming over",
        "Confirm their check-in time if they are arriving withing 2 days"
    ];

    auraProvisionList = [
        "Government issued submitted to Aura",
        "Recommendation by other host with no negative feedbacks",
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
            textDarkGrey,
          } = GStyles;
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Booking Information Requirements" 
                    />
                    <Container style={[Styles.container,]}>
                        <Content scrollEnabled>
                            <MyText style={[textBold, textH3Style]}>Guest Must Provide</MyText>
                            <MyText style={[textH5Style, textlightGreyTwo]}>
                                Before Booking any apartment, users must provide any of the following informations
                            </MyText>
                            <View style={[{marginTop: 20}]}>
                                {
                                    this.guestProvisionList.map((option, index) => 
                                    {
                                        let key = "GL_"+index;
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
                            
                            <TouchableOpacity>
                                <MyText style={[textUnderline,textOrange]}>Add Additional Requirement</MyText>
                            </TouchableOpacity>
                            <MyText style={[textBold, textH3Style, {marginTop: 20,}]}>Aura Must Provide</MyText>
                            <MyText style={[textH5Style, textlightGreyTwo]}>
                                All Aura guests provide
                            </MyText>
                            <LockItem label={"Email Address"} />
                            <LockItem label={"Payment Information"} />
                            <LockItem label={"Confirm Payment"} />
                            <TouchableOpacity>
                                <MyText style={[textUnderline,textOrange]}>Add Additional Requirement</MyText>
                            </TouchableOpacity>
                            <View style={[{marginTop: 20}]}>
                                {
                                    this.auraProvisionList.map((option, index) => 
                                    {
                                        let key = "AL_"+index;
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
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('HouseRules')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                            </TouchableOpacity>
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const LockItem = (props) => {
    return (
        <View style={[Styles.rowView, {alignItems: "center"}]}>
            <Icon name={"lock-closed-sharp"} style={[Styles.lockIcon]} />
            <MyText>{props.label}</MyText>
        </View>
    );
}