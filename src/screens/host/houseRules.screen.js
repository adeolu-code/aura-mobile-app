import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";

export default class HouseRules extends Component {
    constructor() {
        super();

        this.state = {};
    }

    rules = [
        "Suitable for children (2-12 years)",
        "Suitable for children",
        "Suitable for pets",
        "Events or parties allowed"
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
                        title="House Rules Of Need To Know" 
                        sub={"Inform your guests about rules they need to follow if you are hosting them"}
                    />
                    <Container style={[Styles.container,]}>
                        <Content scrollEnabled>
                            <View style={[{marginTop: 20}]}>
                                {
                                    this.rules.map((option, index) => 
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