import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, CheckBox as NBCheckBox } from "native-base";
import { Styles } from "./labelComponent.style";
import GStyles from "../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";
import {CheckBox} from '@metasys96/react-native-form-fields';
import { consoleLog } from "../../utils";

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

    componentDidMount() {
        this.state = {
            checked: this.props?.checked || false,
        }
    }


    render() {
        let {textH5Style} = GStyles;
        let {props} = this;
        console.log("isAlcoholAllowed", props.checked);
        
        return (
            <>
                <TouchableOpacity 
                    style={[Styles.rowView, Styles.itemView, {marginBottom: -5}]}
                    onPress={() => {
                        

                    }} 
                >
                    <CheckBox label={props.label} isChecked={props.checked} onChange={(e) => {
                        if (e == true) {
                            props.onPress && props.onPress();
                        }
                        
                    }} />
                    
                </TouchableOpacity>
                <View style={[{marginLeft: 20}]}>
                    {/* <MyText>{props.label}</MyText> */}
                    {
                        props.description && 
                        <MyText style={[textH5Style]}>{props.description}</MyText>
                    }
                </View>
            </>
        );
    }
}