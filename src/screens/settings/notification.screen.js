import React, { Component } from "react";
import { StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Separator, Text, View, Switch, Container, Content, Footer } from "native-base";
import { Styles } from "./settings.style";
import { MyText, Loading } from "../../utils/Index";
import GeneralStyles from "./../../assets/styles/GeneralStyles";
import colors from "../../colors";
import NotificationSettingsItem from "../../components/notification_settings/notificationSetting.component";
import { setNotificationSettingsApi } from "../../api/notifications.api";
import { AppContext } from "../../../AppProvider";
import { setContext } from "../../utils";

export default class NotificationSettings extends Component {
    static contextType = AppContext;
    constructor(props) {
        super();
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        setContext(this.context);
        this.setState({
            emailActive: this.context.state.notificationSettings.messages.email || false,
            callActive: this.context.state.notificationSettings.messages.call || false,
            pushNotificationActive: false,
            textMessageActive: this.context.state.notificationSettings.messages.sms || false,
            reminderEmail: this.context.state.notificationSettings.reminders.email || false,
            reminderPush: false,
            reminderText: this.context.state.notificationSettings.reminders.sms || false,
            reminderCalls: this.context.state.notificationSettings.reminders.call || false,
            policyEmail: this.context.state.notificationSettings.policy.email || false,
            policyPush: false,
            policyText: this.context.state.notificationSettings.policy.sms || false,
            policyCalls: this.context.state.notificationSettings.policy.call || false,
        });
    }

    set = (v) => {
        this.setState(v);
    }

    onSave = async () => {
        let data = {
            "messages_Call": this.state.callActive,
            "messages_Email": this.state.emailActive,
            "messages_Sms": this.state.textMessageActive,
            "reminders_Call": this.state.reminderCalls,
            "reminders_Email": this.state.reminderEmail,
            "reminders_Sms": this.state.reminderText,
            "policy_Call": this.state.policyCalls,
            "policy_Email": this.state.policyEmail,
            "policy_Sms": this.state.policyText,
        };
        this.setState({loading: true});
        await setNotificationSettingsApi(data, this.context).then(data => data != undefined && this.setState({loading: false}));
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }

    render() {
        const {textH4Style, textWhite, textBold, textCenter} = GeneralStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Notifications" />
                    {this.renderLoading()}
                    <Container style={[Styles.container]}>
                        
                        <Content scrollEnabled={true} style={[Styles.scrollView]}>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText]}>Messages</MyText>
                            </Separator>
                            <View style={[Styles.contentView]}>
                                <MyText style={[Styles.descriptionText]}>
                                    Receive messages from hosts and guests, including booking requests
                                </MyText>
                                <NotificationSettingsItem 
                                    title={"Email"} 
                                    initialState={this.state.emailActive}
                                    onValueChange={(v) => this.set({emailActive: v})} 
                                />
                                {/* <NotificationSettingsItem 
                                    title={"Push Notification"} 
                                    initialState={this.state.pushNotificationActive}
                                    onValueChange={(v) => this.set({pushNotificationActive: v})} 
                                /> */}
                                <NotificationSettingsItem 
                                    title={"Phone Calls"} 
                                    initialState={this.state.callActive}
                                    onValueChange={(v) => this.set({callActive: v})} 
                                />
                                <NotificationSettingsItem 
                                    title={"Text Messages"} 
                                    initialState={this.state.textMessageActive}
                                    onValueChange={(v) => this.set({textMessageActive: v})} 
                                    style={[Styles.noBorderBottom]}
                                />
                            </View>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText]}>Reminders</MyText>
                            </Separator>
                            <View style={[Styles.contentView]}>
                                <MyText style={[Styles.descriptionText]}>
                                    Receive booking reminders, requests to write a review, pricing Notices, and other reminders related to your activities on Aura
                                </MyText>
                                <NotificationSettingsItem 
                                    title={"Email"} 
                                    initialState={this.state.reminderEmail}
                                    onValueChange={(v) => this.set({reminderEmail: v})} 
                                />
                                {/* <NotificationSettingsItem 
                                    title={"Push Notification"} 
                                    initialState={this.state.reminderPush}
                                    onValueChange={(v) => this.set({reminderPush: v})} 
                                /> */}
                                <NotificationSettingsItem 
                                    title={"Text Messages"} 
                                    initialState={this.state.reminderText}
                                    onValueChange={(v) => this.set({reminderText: v})} 
                                />
                                <NotificationSettingsItem 
                                    title={"Phone Calls"} 
                                    initialState={this.state.reminderCalls}
                                    onValueChange={(v) => this.set({reminderCalls: v})} 
                                />
                            </View>
                            <Separator style={[Styles.separator]}>
                                <MyText style={[Styles.separatorText]}>Policy and Communications</MyText>
                            </Separator>
                            <View style={[Styles.contentView]}>
                                <MyText style={[Styles.descriptionText]}>
                                    Receive updates on home sharing regulations.
                                </MyText>
                                <NotificationSettingsItem 
                                    title={"Email"} 
                                    initialState={this.state.policyEmail}
                                    onValueChange={(v) => this.set({policyEmail: v})} 
                                />
                                {/* <NotificationSettingsItem 
                                    title={"Push Notification"} 
                                    initialState={this.state.policyPush}
                                    onValueChange={(v) => this.set({policyPush: v})} 
                                /> */}
                                <NotificationSettingsItem 
                                    title={"Text Messages"} 
                                    initialState={this.state.policyText}
                                    onValueChange={(v) => this.set({policyText: v})} 
                                />
                                <NotificationSettingsItem 
                                    title={"Phone Calls"} 
                                    initialState={this.state.policyCalls}
                                    onValueChange={(v) => this.set({policyCalls: v})} 
                                />
                            </View>
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5, }]}>
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 10}]}
                                onPress={() => this.onSave()}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Save</MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}