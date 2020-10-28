import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";

export default class GuestPolicy extends Component {
    constructor() {
        super();
    }

    render() {
        const {
            textBold,
            textH4Style,
            textCenter,
            textWhite,
          } = GStyles;
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Aura Guest Policy" 
                    />
                    <Container style={[Styles.container, {marginTop: 120}]}>
                        <Content scrollEnabled>
                            <MyText style={[textH4Style]}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                            </MyText>
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5,}]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.props.navigation.navigate('HostSteps')}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>I Understand</MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}