import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, CheckBox } from "native-base";
import { Styles } from "./labelComponent.style";
import GStyles from "../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";

export default class LabelCheckbox extends Component {
    constructor() {
        super();
    }

    render() {
        let {textH6Style} = GStyles;
        let props = this.props;
        
        return (
            <TouchableOpacity 
                style={[Styles.rowView, Styles.itemView]}
                onPress={() => props.onPress && props.onPress()} 
            >
                <CheckBox 
                    checked={props.checked} 
                    style={[Styles.checkBox]}
                />
                <View style={[]}>
                    <MyText>{props.label}</MyText>
                    {
                        props.description && 
                        <MyText style={[textH6Style]}>{props.description}</MyText>
                    }
                </View>
                
            </TouchableOpacity>
        );
    }
}