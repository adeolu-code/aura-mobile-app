import React, { Component } from "react";
import { Styles } from "./host.style";
import { View, Footer, Container, Content } from "native-base";
import { MyText, ItemCountPicker, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import IncrementingInput from "../../components/incrementing_input/incrementingInput.component";
import { TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";

import { AppContext } from '../../../AppProvider'

export default class BookingDuration extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { maxNoOfNights: 0, minNoOfNights: 0 }
    }

    setMaxNights = (value) => {
        this.setState({ maxNoOfNights: value })
    }
    setMinNights = (value) => {
        this.setState({ minNoOfNights: value })
    }

    submit = () => {
        const { state, set } = this.context
        const { maxNoOfNights, minNoOfNights } = this.state
        const propertyFormData = state.propertyFormData
        const obj = { ...propertyFormData, maximumDaysUsable: maxNoOfNights, minimumDaysUsable: minNoOfNights }
        // console.log(obj)
        set({ propertyFormData: obj })
        this.props.navigation.navigate('BookInAdvance')
    }


    render() {
        const {
            textOrange, textGrey, textBold,
            flexRow, textH4Style, textH3Style,
            textCenter, imgStyle, textWhite,
            textH5Style, textlightGreyTwo,
            textGreen,
          } = GStyles;
        const { maxNoOfNights, minNoOfNights } = this.state
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="When Should We Notify You Before A Guest Shows Up" />
                    <Container style={[Styles.container, {marginTop: 200}]}>
                        <Content scrollEnabled>
                            <View style={[Styles.rowView, {flexWrap: "wrap", alignItems: "flex-start"}]}>
                                <MyText style={[textH4Style]}><MyText style={[textGreen, textBold]}>Tips: </MyText>
                                    <MyText style={[textGrey]}>
                                    Shorter trips can mean more reservations, but you Might have to turn over your space often.
                                    </MyText>
                                </MyText>
                            </View>
                            <ItemCountPicker title="Nights Minimum" countValue={this.setMinNights} value={minNoOfNights} />
                            <ItemCountPicker title="Nights Maximum" countValue={this.setMaxNights} value={maxNoOfNights} />
                            {/* <IncrementingInput
                                 label={"Nights Minimum"}
                                 onValueChange={() => {}}
                            />*/}
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.submit} disabled={!maxNoOfNights || !minNoOfNights} />
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        )
    }
}