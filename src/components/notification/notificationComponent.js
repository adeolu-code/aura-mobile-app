import { Icon, View } from "native-base";
import React, { Component } from "react"
import { TouchableOpacity } from "react-native";
import { AppContext } from "../../../AppProvider";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./notification.style";

export default class NotificationComponent extends Component {
    static contextType = AppContext;
    
    constructor() {
        super();
        
        this.state = {
            
        };
    }

    render() {
        const {textBold } = GStyles;
        const alert = (this.props.alert == undefined) ? false : ((this.props.alert) ? true : false);
        return (
            <TouchableOpacity
                style={[Styles.parentView, (alert ? Styles.alertView: undefined)]}
                onPress={() => this.props.onPress()}
            >
                <View style={[Styles.iconParent ]}>
                    {
                        alert &&
                        <Icon name={'ios-alert-sharp'} style={[Styles.alertIcon]} />
                    }
                </View>
                
                <View style={[Styles.middleSection]}>
                    {
                        this.props.title &&
                        <MyText style={[textBold, Styles.title]}>{this.props.title}</MyText>
                    }
                    <MyText style={[Styles.content]}>
                        {this.props.content.substring(0, 95) + "..."}
                    </MyText>
                </View>
                {
                    this.props.time &&
                    <MyText style={[Styles.time]}>{this.props.time}</MyText>
                }
                
            </TouchableOpacity>
        );
    }
}