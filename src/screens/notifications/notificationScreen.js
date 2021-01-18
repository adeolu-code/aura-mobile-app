import { Icon, Input, Item, View } from "native-base";
import React, { Component } from "react"
import { ScrollView } from "react-native";
import { AppContext } from "../../../AppProvider";
import NotificationComponent from "../../components/notification/notificationComponent";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./notification.style";
import { getNotificationsApi } from "../../api/notifications.api";
import NoContentComponent from "../../components/no_content/noContent.component";
import moment from "moment";
import { consoleLog } from "../../utils";
import FlatlistComponent from "../../components/flat_list/flatList.component";


class NotificationScreenClass extends Component {
    static contextType = AppContext;
    
    constructor() {
        super();
        this.state = {
            notifications: [],
        }
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.getNotifications();
    }

    getNotifications = () => {
        //
        getNotificationsApi().then(result => result != undefined && this.setState({notifications: result}));
    }

    markNotificationAsRead = (notificationId) => {
        let notifications = this.state.notifications;
        notifications.filter(x => {
            if (x.id == notificationId) {
                x.isRead = true;
            }
        });

        this.setState({notifications: notifications});
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={[Styles.parentView]}>
                <Item style={[Styles.item]}>
                    <Input placeholder={"Search"} style={[Styles.input]}   />
                    <Icon name={"search"} style={[Styles.icon]} />
                </Item>
                <FlatlistComponent 
                    data={this.state.notifications}
                    emptyContent={"No new notifications."}
                    renderItem={({item}, index) => {
                        const notification = item;
                        const title = `${notification.propertyName} has been queried` || undefined;
                        return (
                            <NotificationComponent 
                                {...this.props}
                                key={index}
                                title={title}
                                content={notification.message}
                                time={undefined}
                                alert={!notification.isRead}
                                onPress={() => {
                                    this.markNotificationAsRead(notification.id);
                                    navigation.navigate("NotificationDetail", {
                                        imageSource: require("./../../assets/images/food_bg/food_bg.png"),
                                        content: notification.message,
                                        id: notification.id,
                                        propertyId: notification.propertyId,
                                        title: title,
                                    })
                                }}
                            />
                        );
                    }}
                />
            
                {/* <ScrollView 
                    contentContainerStyle={[Styles.scrollView]}
                >
                    {
                        this.state.notifications.length > 0 ?
                        this.state.notifications.map((notification, index) => {
                            const title = `${notification.propertyName} has been queried` || undefined;
                            return (
                                <NotificationComponent 
                                    {...this.props}
                                    key={index}
                                    title={title}
                                    content={notification.message}
                                    time={undefined}
                                    alert={!notification.isRead}
                                    onPress={() => {
                                        this.markNotificationAsRead(notification.id);
                                        navigation.navigate("NotificationDetail", {
                                            imageSource: require("./../../assets/images/food_bg/food_bg.png"),
                                            content: notification.message,
                                            id: notification.id,
                                            propertyId: notification.propertyId,
                                            title: title,
                                        })
                                    }}
                                />
                            );
                        })
                        :
                        <NoContentComponent text={"No new notifications."} />
                    }
                </ScrollView> */}
            </View>
            
        );
    }
}

const NotificationScreen = (props) => {
    return (
        <NotificationScreenClass {...props} />
    );
};

export default NotificationScreen;