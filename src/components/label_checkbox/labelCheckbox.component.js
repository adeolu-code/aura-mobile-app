import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, CheckBox } from "native-base";
import { Styles } from "./labelComponent.style";
import GStyles from "../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";

/**
 * #props
 * 
 * onPress [function]
 * 
 * checked [bool || false]
 * 
 * label [string]
 * 
 * description [string]
 */
export default class LabelCheckbox extends Component {
    constructor() {
        super();
    }

    render() {
        let {textH6Style} = GStyles;
        let props = this.props;
        console.log("isAlcoholAllowed", props.checked);
        
        return (
            <TouchableOpacity 
                style={[Styles.rowView, Styles.itemView]}
                onPress={() => props.onPress && props.onPress()} 
            >
                <CheckBox 
                    checked={props.checked || false} 
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