import { View } from "native-base";
import React, { Component } from "react"
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../../AppProvider";
import Header from "../../components/Header";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./notification.style";
import { getPropertyByIdApi } from "../../api/property.api";
import { markNotificationApi } from "../../api/notifications.api";
import { consoleLog } from "./../../utils";

export default class NotificationDetail extends Component {
    static contextType = AppContext;
    
    constructor(props) {
        super(props);
        this.state = {
            property: {},
        }
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.getProperyById();
        this.markNotificationAsRead();
    }

    getProperyById = () => {
        getPropertyByIdApi(this.props.route.params.propertyId).then(result => result != undefined && this.setState({property: result}));
    }

    markNotificationAsRead = () => {
        console.log("marking notification")
        //
        markNotificationApi(this.props.route.params.id).then(result => result != undefined && consoleLog("Notification res", result));
    }

    render() {
        const {textH4Style } = GStyles;
        return (
            <SafeAreaView style={[Styles.safeArea]}>
                <Header {...this.props} title={this.props.route.params.title} />
                <ScrollView style={[Styles.detailScrollView]}>
                    <View style={[Styles.imageDetailView]}>
                        <Image 
                            source={this.state.property.mainImage != undefined ? {uri: this.state.property.mainImage.assetPath} : this.props.route.params.imageSource} 
                            style={Styles.imageDetail} 
                        />
                    </View>
                    <MyText style={[textH4Style]}>
                    {this.props.route.params.content}
                    </MyText>
                </ScrollView>
            </SafeAreaView>
            
        );
    }
}