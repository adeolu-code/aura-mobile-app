import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, StatusBar } from "react-native";
import { AppContext } from "../../../AppProvider";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
const { Container, Content, Header, Footer, Icon, Item, Input, Text, Left, Button, Body, Right, View } = require("native-base");
import { Styles } from "./inbox.style";
import GStyles from "./../../assets/styles/GeneralStyles";
import SingleMessage from "../../components/inbox_message/singleMessage";

export default class InboxChat extends Component {
    static contextType = AppContext;
    
    constructor(props) {
        super(props);
    
        this.state = {
            
        };
    }

    render() {
        const {textBold, textH4Style } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
           
                <Container>
                    <Header style={[Styles.chatHeader]} iosBarStyle={"dark-content"}  androidStatusBarColor={"white"}>
                        <Left>
                            <Button icon transparent>
                                <Icon name={"ios-chevron-back-sharp"} style={[Styles.headerIcon]} />
                            </Button>
                        </Left>
                        <Body style={[Styles.headerBody]}>
                            <View style={[Styles.userImageView]}>
                                <Image 
                                    source={this.props.route.params.userImage} 
                                    style={[Styles.userImage]}
                                />
                                <View style={[Styles.userOnline]}></View>
                            </View>
                            <View style={[Styles.userInfoView]}>
                                <MyText style={[textBold, textH4Style]}>{this.props.route.params.name}</MyText>
                                <MyText>{this.props.route.params.status}</MyText>
                            </View>
                            
                        </Body>
                        <Right>
                            <Button icon transparent>
                                <Icon name={"ios-ellipsis-vertical"} style={[Styles.headerIcon]} />
                            </Button>
                        </Right>
                    </Header>
                    <Content scrollEnabled={false}>
                        <ImageBackground style={[Styles.chatBackground]} source={require("./../../assets/images/inbox/pattern_3x.png")}>
                            <ScrollView contentContainerStyle={[Styles.chatScrollView]}>
                                <SingleMessage 
                                    message={"Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                    time={"12:00"}
                                    type={"left"}
                                />
                                <SingleMessage 
                                    message={"Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                                    time={"12:05"}
                                    type={"right"}
                                />
                            </ScrollView>
                        </ImageBackground>
                    </Content>
                    <Footer style={[Styles.footer]}>
                        <Image 
                            source={require("./../../../assets/aura_attachment_2x.png")} 
                            style={[Styles.attachmentImage]} 
                            resizeMode={"center"}
                        />
                        <Icon style={[Styles.icon]} name={"ios-mic"} />
                        <Item style={[Styles.chatInputItem]}>
                            <Input style={[Styles.chatInput]} placeholder={"Start a message"} />
                            <Icon name={"ios-happy-outline"} />
                        </Item>
                        <Icon style={[Styles.icon]} name={"ios-send-sharp"} />
                    </Footer>
                </Container>
            </>
        );
    }
}