import React, { Component } from "react";
import { Styles } from "./host.style";
import { View, Footer, Container, Content } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import IncrementingInput from "../../components/incrementing_input/incrementingInput.component";
import { TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";
import TipViewComponent from "../../components/tip_view/tipView.component";

export default class BookInAdvance extends Component {
    constructor(props) {
        super(props);
    }

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
            textGreen,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="How Far In Advance Can A Guest Book?" 
                    />
                    <Container style={[Styles.container, {marginTop: 140}]}>
                        <Content scrollEnabled>
                            <TipViewComponent text={"At least 2 days’ notice can help you plan for a guest’s arrival, but you might miss out on last minutes trips."} />
                            <LabelCheckbox 
                                label={"Anytime"}
                            />
                            <LabelCheckbox 
                                label={"3 months in advance"}
                            />
                            <LabelCheckbox 
                                label={"6 months in advance"}
                            />
                            <LabelCheckbox 
                                label={"9 months in advance"}
                            />
                            <LabelCheckbox 
                                label={"1 year"}
                            />
                            <LabelCheckbox 
                                label={"Dates unavailable by default"}
                                description={"Your entire calendar will be blocked by default, which means you’ll have to manually unblock dates to get booked."}
                            />
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('PropertyAvailability')}
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