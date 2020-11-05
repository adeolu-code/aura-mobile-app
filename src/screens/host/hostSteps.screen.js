import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import { Container, Content, Footer, View, Icon } from "native-base";
import { Styles } from "./host.style";
import colors from "../../colors";
import { MyText, CustomButton } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { GLOBAL_PADDING } from "../../utils";
import { RenderStars } from "../../components/render_stars/renderStars";

import { AppContext } from '../../../AppProvider';
import { ManagePropertyContext } from '../../../ManagePropertyProvider'

export default class HostSteps extends Component {
    static contextType = AppContext;
    constructor() {
        super();
        this.state = { step: 1, isComplete: false }
    }

    set = (v) => {
        this.setState(v);
    }

    getStarted = () => {
        const { set, state } = this.context
        set({ isInApp: true })
        if (state.step === 1) {
            // this.props.navigation.navigate("HostProperty");
            this.props.navigation.navigate('Auth', {screen: "List"});
        }
        else if (state.step === 2) {
            this.props.navigation.navigate("UploadPropertyImage");
        }
        else if (state.step === 3) {
            this.props.navigation.navigate("BookingInformationRequirements");   
        }
        // if (this.state.step == 1) {
        //     // this.props.navigation.navigate("HostProperty");
        //     this.props.navigation.navigate('Auth', {screen: "List"});
        // }
        // else if (this.state.step == 2) {
        //     this.props.navigation.navigate("UploadPropertyImage");
        // }
        // else if (this.state.step == 3) {
        //     this.props.navigation.navigate("BookingInformationRequirements");   
        // }
    }
    edit = () => {

    }

    render() {
        const { textWhite, textBold, flexRow, textH4Style, textCenter, imgStyle,
            textExtraBold, textH5Style, textGrey, textGreen, textDarkGrey,
          } = GStyles;

        const { step } = this.context.state

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
                                                <RenderStars stars={4} style={{marginTop: 10}} starActive={{fontSize: 16}} 
                                                    starInactive={{fontSize: 16}} />
                                                <MyText style={[textH5Style, textGrey, { marginVertical: 6}]}>Lagos</MyText>
                                                <MyText style={[textH5Style, textGreen]}>NGN 200340</MyText>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity style={[Styles.nextButton, {marginTop: 10}]} onPress={() => alert("")}>
                                        <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Publish For Review</MyText>
                                    </TouchableOpacity>
                                </View>
                            }
                            <Card title={"Facilities And Location"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                completed={step > 1 ? true : false} edit={step > 1 ? true : false} step={1} 
                                getStarted={step === 1 ? true : false}
                                onEditPress={this.edit} 
                                onGetStartedPress={this.getStarted}
                            />
                            <Card title={"Upload Picture And Short Description Of Your Place"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                completed={step > 2 ? true : false} 
                                edit={step > 2 ? true : false}
                                getStarted={step === 2 ? true : false}
                                step={2} onEditPress={this.edit} 
                                onGetStartedPress={this.getStarted}
                            />
                            <Card title={"Welcome Your First Guest"}
                                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                step={3}
                                completed={step > 3 ? true : false} 
                                edit={step > 3 ? true : false}
                                getStarted={step === 3 ? true : false}
                                onEditPress={this.edit} 
                                onGetStartedPress={this.getStarted}
                            />
                        </Content>
                        {/* {
                            !this.state.isComplete &&
                        
                            <Footer style={[Styles.footer, {backgroundColor: "transparent",padding: GLOBAL_PADDING}]} >
                                <TouchableOpacity style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.getStarted()}
                                >
                                    <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Get Started</MyText>
                                </TouchableOpacity>
                            </Footer>
                        } */}
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const Card = (props) => {
    const {
        textUnderline, textOrange, textH6Style, textGrey, textH5Style,
        textH4Style, textCenter, textPureGreen, 
        textGreen,
        textBold,
      } = GStyles;
    const renderEdit = () => {
        if(props.edit) {
            return (
                <TouchableOpacity onPress={props.onEditPress}>
                    <MyText style={[textH4Style, textUnderline, textOrange, {marginTop: 20}]}>Edit Changes</MyText>
                </TouchableOpacity>
            )
        }
    }
    const renderGetStarted = () => {
        if(props.getStarted) {
            return (
                <View style={{ marginTop: 20}}>
                    <CustomButton buttonText="Get Started" buttonStyle={Styles.buttonStyle} onPress={props.onGetStartedPress} />
                </View>
            )
        }
    }
    return (
        <View style={[Styles.cardView]}>
            <View style={[Styles.topView]}>
                <MyText style={[textH5Style, textGrey, {flex: 0.6}]}>Step {props.step}</MyText>
                {
                    props.completed &&
                    <View style={[Styles.completedView]}>
                        <Icon type="FontAwesome" name={"check-circle"} style={[Styles.completedIcon]} />
                        <MyText style={[textH5Style, textPureGreen, textBold]}>Completed</MyText>
                    </View>
                }
            </View>
            <View>
                <MyText style={[textBold, textH4Style, {marginTop: 5, marginBottom: 5}]}>
                    {props.title}
                </MyText>
                <MyText style={[textH4Style, textGrey]}>
                    {props.description}
                </MyText>
            </View>
            {renderEdit()}
            {renderGetStarted()}
            {/* <TouchableOpacity onPress={props.onEditPress}>
                <MyText style={[textH4Style, textUnderline, textOrange, {marginTop: 20, marginBottom: 30}]}>Edit Changes</MyText>
            </TouchableOpacity> */}
        </View>
    );
}