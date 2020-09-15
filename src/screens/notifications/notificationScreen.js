import { Icon, Input, Item, View } from "native-base";
import React, { Component } from "react"
import { ScrollView } from "react-native";
import { AppContext } from "../../../AppProvider";
import NotificationComponent from "../../components/notification/notificationComponent";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./notification.style";


class NotificationScreenClass extends Component {
    static contextType = AppContext;
    
    constructor(props) {
        super();
    }

    render() {
        const {textBold, } = GStyles;
        const { navigation } = this.props;
        return (
            <View style={[Styles.parentView]}>
                <Item style={[Styles.item]}>
                    <Input placeholder={"Search"} style={[Styles.input]}   />
                    <Icon name={"search"} style={[Styles.icon]} />
                </Item>
            
                <ScrollView contentContainerStyle={[Styles.scrollView]}>
                    <NotificationComponent 
                        {...this.props}
                        title={"Cash Refunded"}
                        content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                        time={"13:39"}
                        alert
                        onPress={() => navigation.navigate("NotificationDetail", {
                            imageSource: require("./../../assets/images/food/food.png"),
                            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
                        })}
                    />
                    <NotificationComponent 
                        title={"Cash Refunded"}
                        content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"}
                        time={"13:39"}
                        onPress={() => navigation.navigate("NotificationDetail", {
                            imageSource: require("./../../assets/images/food/food.png"),
                            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
                        })}
                    />
                </ScrollView>
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