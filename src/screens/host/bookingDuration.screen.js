import React, { Component } from "react";
import { Styles } from "./host.style";
import { View, Footer, Container, Content } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import IncrementingInput from "../../components/incrementing_input/incrementingInput.component";
import { TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";

export default class BookingDuration extends Component {
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
                        title="When Should We Notify You Before A Guest Shows Up" 
                    />
                    <Container style={[Styles.container, {marginTop: 180}]}>
                        <Content scrollEnabled>
                            <View style={[Styles.rowView, {flexWrap: "wrap", alignItems: "flex-start"}]}>
                                <MyText style={[textGreen, textBold]}>Tips: </MyText>
                                <MyText style={[textBold, Styles.rowView ,]}>
                                    Shorter trips can mean more reservations, but you Might have to turn over your space often.
                                </MyText>
                            </View>
                            <IncrementingInput
                                 label={"Nights Minimum"}
                                 onValueChange={() => {}}
                            />
                            <IncrementingInput
                                 label={"Nights Maximum"}
                                 onValueChange={() => {}}
                            />
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('BookInAdvance')}
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