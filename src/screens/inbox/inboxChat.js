import React, { Component } from "react";
import { Image, ImageBackground, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { AppContext } from "../../../AppProvider";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
const { Container, Content, Header, Footer, Icon, Item, Input, Text, Left, Button, Body, Right, View } = require("native-base");
import { Styles } from "./inbox.style";
import GStyles from "./../../assets/styles/GeneralStyles";
import SingleMessage from "../../components/inbox_message/singleMessage";
import { getChatConvoApi, messageHostApi, messageUserApi } from "../../api/chat.api";
import { consoleLog } from "../../utils";
import moment from "moment";

export default class InboxChat extends Component {
    static contextType = AppContext;
    
    constructor(props) {
        super(props);
    
        this.state = {
            convo: [],
            message: "",
            lastMessageId: props.route.params.chatId,
            host: props.route.params?.host
        };
    }

    interval=undefined

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.interval = undefined;
    }

    init = () => {
        this.getChatConvo();
        this.interval = setInterval(() => {
            this.getChatConvo();
        }, 60000);
    }
      
    getChatConvo = () => {
        getChatConvoApi({
        propertyId: this.props.route.params.propertyId,
        userId: this.props.route.params.userId,
        }).then(result => {
            this.setState({convo: result,});
        })
    };

    sendMessage = () => {
        const { host } = this.state
        const obj = host ? {
            message_Body: this.state.message,
            property_Id: this.props.route.params.propertyId
        } : {
            "message_to_Host_Id": this.state.lastMessageId,
            "message_Body": this.state.message
        }
        const arg = host ? true : false
        messageUserApi(obj, arg).then(result => {
            if (result.isError == false) {
                this.getChatConvo();
                this.setState({message: ""});
            }
        });
    }

    render() {
        const {textBold, textH4Style } = GStyles;
        const defaultImage = require("./../../assets/images/profile.png");
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Container style={{marginTop: 25}}>
                        <Header style={[Styles.chatHeader]} iosBarStyle={"dark-content"}  androidStatusBarColor={"white"}>
                            <Left>
                                <Button icon transparent onPress={() => this.props.navigation.goBack()}>
                                    <Icon name={"ios-chevron-back-sharp"} style={[Styles.headerIcon]} />
                                </Button>
                            </Left>
                            <Body style={[Styles.headerBody]}>
                                <View style={[Styles.userImageView]}>
                                    <Image 
                                        source={this.props.route.params.userImage || defaultImage} 
                                        style={[Styles.userImage]}
                                    />
                                    {/* <View style={[Styles.userOnline]}></View> */}
                                </View>
                                <View style={[Styles.userInfoView]}>
                                    <MyText style={[textBold, textH4Style]}>{this.props.route.params.name}</MyText>
                                    {/* <MyText>{this.props.route.params.status}</MyText> */}
                                </View>
                                
                            </Body>
                            <Right>
                                {/* <Button icon transparent>
                                    <Icon name={"ios-ellipsis-vertical"} style={[Styles.headerIcon]} />
                                </Button> */}
                            </Right>
                        </Header>
                        <Content 
                            scrollEnabled={true}
                        >
                            <ImageBackground style={[Styles.chatBackground]} source={require("./../../assets/images/inbox/pattern_3x.png")}>
                                <ScrollView 
                                    ref={(c) => {this.scroll = c}}
                                    contentContainerStyle={[Styles.chatScrollView]}
                                    onContentSizeChange={() => {
                                        this.scroll.scrollToEnd({x: 0, y: 0, animated: true});
                                    }}
                                >
                                    {
                                        this.state.convo.map((convo, index) => {
                                            return (
                                                <SingleMessage 
                                                    key={index}
                                                    message={convo.message_Body}
                                                    time={moment(convo.dateSent, "MM/DD/YYYY HH:mm:ss").fromNow()}
                                                    type={convo.from == this.context.state.userData.id ? "right" : "left"}
                                                    source={this.props.route.params.userImage || defaultImage} 
                                                    isRead={convo.is_Read}
                                                />
                                            );
                                        })
                                    }
                                </ScrollView>
                            </ImageBackground>
                        </Content>
                        <Footer style={[Styles.footer]}>
                            {/* <Image 
                                source={require("./../../../assets/aura_attachment_2x.png")} 
                                style={[Styles.attachmentImage]} 
                                resizeMode={"center"}
                            />
                            <Icon style={[Styles.icon]} name={"ios-mic"} /> */}
                            <Item style={[Styles.chatInputItem]}>
                                <Input 
                                    style={[Styles.chatInput]} 
                                    placeholder={"Start a message"} 
                                    onChangeText={(e) => this.setState({message: e})}
                                    value={this.state.message}
                                />
                                {/* <Icon name={"ios-happy-outline"} /> */}
                            </Item>
                            <TouchableOpacity
                                onPress={() => this.sendMessage()}
                            >
                                <Icon 
                                    style={[Styles.icon]} 
                                    name={"ios-send-sharp"} 
                                />
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}