import { Icon, View } from "native-base";
import React, { Component } from "react";
import { MyText } from "../../utils/Index";
import { Styles } from "./inboxMessage.style";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Image } from "react-native";
import colors from "../../colors";

export default class SingleMessage extends Component {
    constructor(props) {
        super();

        this.state = {
            left: false,
        };
    }

    render() {
        return(
            this.props.type == "left" ?
                <Left {...this.props} />
            :
                <Right {...this.props} />
        );
    }
}

const Left = (props) => {
    const { textWhite, textRight, textH6Style, textH4Style } = GStyles;
    return (
        <View style={[Styles.viewLeft]}>
            <View style={[Styles.messageView]}>
                <MyText style={[textWhite, textH4Style, Styles.messageText]}>
                {props.message}
                </MyText>
                <View style={[Styles.messageInfo]}>
                    <MyText style={[textWhite, textRight, textH6Style]}>{props.time}</MyText>
                    {
                        props.isRead &&
                        <Icon name={"ios-checkmark-done"} style={[Styles.icon]} />
                    }
                    
                </View>
                
            </View>
            <Image 
                source={props.source} 
                style={[Styles.userImage]}
            />
        </View>
    );
}

const Right = (props) => {
    const { textDarkGrey, textRight, textH6Style, textH4Style } = GStyles;
    return (
        <View style={{flexDirection: "row-reverse"}}>
            <View style={[Styles.messageViewRight]}>
                <MyText style={[textDarkGrey, textH4Style, Styles.messageText]}>
                {props.message}
                </MyText>
                <View style={[Styles.messageInfoRight]}>
                    <MyText style={[textDarkGrey, textRight, textH6Style]}>{props.time}</MyText>
                    {
                        props.isRead &&
                        <Icon name={"ios-checkmark-done"} style={[Styles.icon, {color: colors.black}]} />
                    }
                </View>
                
            </View>
            <Image 
                source={props.source} 
                style={[Styles.userImageRight]}
            />
        </View>
    );
};