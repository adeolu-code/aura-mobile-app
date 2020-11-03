import React, { Component } from "react";
import { View, Switch } from "native-base";
import { MyText } from "../../utils/Index";
import { Styles } from "./notificationSetting.style";
import colors from "../../colors";
import GeneralStyles from "./../../assets/styles/GeneralStyles";

export default class NotificationSettingsItem extends Component {
    constructor(props) {
        super();        
    }

    render() {
        const {textH4Style} = GeneralStyles;
        return(
            <View style={[Styles.parentView, this.props.style]}>
                <MyText style={[Styles.textTitle, textH4Style]}>{this.props.title}</MyText>
                <Switch 
                    style={[Styles.switch]} 
                    trackColor={colors.white} 
                    thumbColor={colors.green} 
                    onValueChange={(v) => {this.props.onValueChange(v)}}
                    value={this.props.initialState}
                />
            </View>
        );
    }
}