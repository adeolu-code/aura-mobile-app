import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer, View, Icon } from "native-base";
import { Styles } from "./host.style";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { GLOBAL_PADDING } from "../../utils";
import { RenderStars } from "../../components/render_stars/renderStars";

export default class HostSteps extends Component {
    constructor() {
        super();

        this.state = {
            step: 1,
            isComplete: true,
        }
    }

    getStarted = () => {
        if (this.state.step == 1) {
            this.props.navigation.navigate("HostPropertyStack")
        }
        else if (this.state.step == 2) {

        }
        else if (this.state.step == 3) {

        }
    }

    render() {
        const {
            textWhite,
            textBold,
            flexRow,
            textH4Style,
            textCenter,
            imgStyle,
            textExtraBold,
            textH5Style, 
            textGrey,
            textGreen,
            textDarkGrey,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Host A Home Or Hotel" />
                    <Container style={[Styles.container, {padding: 0}]}>
                        <Content>
                            {
                                this.state.isComplete && 
                                <View style={[Styles.reviewView]}>

                                    <View style={{ width: '100%'}}>
                                        <TouchableOpacity style={[flexRow, Styles.propertyContainer]} >
                                            <View style={Styles.imgContainer}>
                                                <Image source={require("./../../assets/images/places/bed.png")} resizeMode="cover" style={imgStyle} />
                                            </View>
                                            <View style={Styles.rightContainer}>
                                                <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>Umbaka Homes</MyText>
                                                <RenderStars 
                                                    stars={4} 
                                                    style={{marginTop: 10}}
                                                    starActive={{fontSize: 16}}
                                                    starInactive={{fontSize: 16}}
                                                    
                                                />
                                                <MyText style={[textH5Style, textGrey, { marginVertical: 6}]}>Lagos</MyText>
                                                <MyText style={[textH5Style, textGreen]}>NGN 200340</MyText>
                                            </View>
                                            
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity 
                                        style={[Styles.nextButton, {marginTop: 10}]}
                                        onPress={() => alert("")}
                                    >
                                        <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Publish For Review</MyText>
                                    </TouchableOpacity>
                                </View>
                            }
                            <Card 
                                title={"Facilities And Location"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                completed={true}
                                step={"1"}
                            />
                            <Card 
                                title={"Upload Picture And Short Description Of Your Place"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                completed={true}
                                step={"2"}
                            />
                            <Card 
                                title={"Welcome Your First Guest"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                completed={true}
                                step={"3"}
                            />
                        </Content>
                        {
                            !this.state.isComplete &&
                        
                            <Footer style={[Styles.footer, {backgroundColor: "transparent",padding: GLOBAL_PADDING}]} >
                                <TouchableOpacity style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.getStarted()}
                                >
                                    <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Get Started</MyText>
                                </TouchableOpacity>
                            </Footer>
                        }
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const Card = (props) => {
    const {
        textUnderline,
        textOrange,
        textH6Style,
        textH4Style,
        textCenter,
        textGreen,
        textBold,
      } = GStyles;
    return (
        <View style={[Styles.cardView]}>
            <View style={[Styles.topView]}>
                <MyText style={[textH4Style, {flex: 0.6}]}>Step {props.step}</MyText>
                {
                    props.completed &&
                    <View style={[Styles.completedView]}>
                        <Icon name={"checkmark-circle"} style={[Styles.completedIcon]} />
                        <MyText style={[textH4Style, textGreen]}>Completed</MyText>
                    </View>
                }
            </View>
            <View>
                <MyText style={[textBold, {marginTop: 5, marginBottom: 5}]}>
                    {props.title}
                </MyText>
                <MyText style={[textH6Style]}>
                    {props.description}
                </MyText>
            </View>
            <TouchableOpacity>
                <MyText style={[textH4Style, textUnderline, textOrange, {marginTop: 20}]}>Edit Changes</MyText>
            </TouchableOpacity>
        </View>
    );
}