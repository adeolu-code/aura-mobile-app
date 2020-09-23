import React, { Component } from "react";
import { Image, Pressable } from "react-native";
import { Container, Content, View, Separator, Text, Icon } from "native-base";
import { Styles } from "./profileItem.style";
import { MyText } from "../../utils/Index";
import GStykes from "./../../assets/styles/GeneralStyles";

export default class ProfileComponent extends Component {
    constructor(props) {
        super();

        this.state = {};
    }

    render() {
        const {textH3Style, textH6Style} = GStykes;
        return (
            <Pressable style={[Styles.parentView]} onPress={() => this.props.onPress && this.props.onPress()}>
                <Image style={[Styles.image]} source={this.props.iconImage} resizeMode="center" />
                <View style={[Styles.contentView]}>
                    <MyText style={[textH3Style]}>{this.props.title}</MyText>
                    <MyText style={[textH6Style]}>{this.props.description}</MyText>
                </View>
                <Icon style={[Styles.icon]} name={"ios-chevron-forward-circle-outline"} />
            </Pressable>
        );
    }
}