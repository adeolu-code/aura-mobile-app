import React, { Component } from "react";
import { StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { Separator, Text, View, Switch, Container, Content } from "native-base";
import { Styles } from "./settings.style";
import { MyText } from "../../utils/Index";
import GeneralStyles from "./../../assets/styles/GeneralStyles";
import colors from "../../colors";
import NotificationSettingsItem from "../../components/notification_settings/notificationSetting.component";

export default class NotificationSettings extends Component {
    constructor(props) {
        super();

        this.state = {
            emailActive: true,
            pushNotificationActive: true,
            textMessageActive: false,
            reminderEmail: true,
            reminderPush: false,
            reminderText: true,
            reminderCalls: true,
            policyEmail: true,
            policyPush: false,
            policyText: true,
            policyCalls: true,
        };
    }

    set = (v) => {
        this.setState(v);
    }



    render() {
        const {textH4Style} = GeneralStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Notifications" />
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
                                <NotificationSettingsItem 
                                    title={"Push Notification"} 
                                    initialState={this.state.pushNotificationActive}
                                    onValueChange={(v) => this.set({pushNotificationActive: v})} 
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
                                <NotificationSettingsItem 
                                    title={"Push Notification"} 
                                    initialState={this.state.reminderPush}
                                    onValueChange={(v) => this.set({reminderPush: v})} 
                                />
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
                                <NotificationSettingsItem 
                                    title={"Push Notification"} 
                                    initialState={this.state.policyPush}
                                    onValueChange={(v) => this.set({policyPush: v})} 
                                />
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
 
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}