import React, { Component } from "react";
import { Image, Pressable } from "react-native";
import { Container, Content, View, Separator, Text, Icon } from "native-base";
import { Styles } from "./profileItem.style";
import { MyText } from "../../utils/Index";
import GStykes from "./../../assets/styles/GeneralStyles";
import colors from '../../colors';

export default class ProfileComponent extends Component {
    constructor(props) {
        super();

        this.state = {};
    }

    render() {
        const {textH3Style, textH6Style,textH5Style, textGrey, textFont13} = GStykes;
        const { wrapperStyles } = this.props
        return (
            <Pressable style={[Styles.parentView, wrapperStyles]} onPress={() => this.props.onPress && this.props.onPress()}>
                <View style={{ flex: 1}}>
                    <Image style={[Styles.image]} source={this.props.iconImage} resizeMode="contain" />
                </View>
                <View style={[Styles.contentView]}>
                    <MyText style={[textH3Style, { marginBottom: 8, paddingTop: 0}]}>{this.props.title}</MyText>
                    <MyText style={[textFont13, textGrey]}>{this.props.description}</MyText>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Icon style={[Styles.icon]} name={"ios-chevron-forward-circle-outline"}  />
                </View>
            </Pressable>
        );
    }
}