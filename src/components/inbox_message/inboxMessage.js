import { View } from "native-base";
import React, { Component } from "react";
import { Styles } from "./inboxMessage.style";
import { Image, Pressable } from "react-native";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class InboxMessage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        const { textBold } = GStyles;
        return (
            <Pressable 
                style={[Styles.parentView, this.props.parentStyle]}
                onPress={() => this.props.onPress()}
            >
                <Image 
                    source={this.props.imageSource} 
                    style={[Styles.image]} 
                />
                <View style={[Styles.content]}>
                    <View style={[Styles.textSection]}>
                        <MyText style={[textBold]}>{this.props.messageSender}</MyText>
                        <MyText style={[Styles.messageContent]}>
                            {this.props.messageContent}
                        </MyText>
                    </View>
                    <View style={[Styles.infoSection]}>
                        <MyText style={[Styles.timeContent]}>{this.props.time}</MyText>
                        {
                            (this.props.newMessageCount != undefined && this.props.newMessageCount > 0 ) &&
                            <MyText style={[Styles.newMessageCount]}>
                                {/* {this.props.newMessageCount} */}
                            </MyText>
                        }
                    </View>
                </View>
            </Pressable>
        );
    }

}