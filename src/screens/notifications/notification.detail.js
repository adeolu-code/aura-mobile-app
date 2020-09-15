import { View } from "native-base";
import React, { Component } from "react"
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../../../AppProvider";
import Header from "../../components/Header";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./notification.style";

export default class NotificationDetail extends Component {
    static contextType = AppContext;
    
    constructor(props) {
        super(props);
    }

    render() {
        const {textBold, textH4Style } = GStyles;
        return (
            <SafeAreaView style={[Styles.safeArea]}>
                <Header {...this.props} title="Cash Refunded" />
                <ScrollView style={[Styles.detailScrollView]}>
                    <View style={[Styles.imageDetailView]}>
                        <Image source={this.props.route.params.imageSource} style={Styles.imageDetail} />
                    </View>
                    <MyText style={[textH4Style]}>
                    {this.props.route.params.content}
                    </MyText>
                </ScrollView>
            </SafeAreaView>
            
        );
    }
}