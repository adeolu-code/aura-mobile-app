import React from "react";
import { TouchableOpacity } from "react-native";
import { MyStyle } from "../../../../myStyle";
import GStyles from "../../../../assets/styles/GeneralStyles";
import { MyText } from "../../../../utils/Index";

/**
 * 
 * @param {{String}} label 
 * @param {{Function}} onClick
 */
export function RoundButton(props) {
    const {textCenter, textH3Style, textWhite, textBold} = GStyles;
    return (
        <TouchableOpacity
            style={[MyStyle.nextButton, {height: 40, borderRadius: 5, marginBottom: 40}]}
            onPress={() => {
                props.onClick && props.onClick();
            }}
        >
            <MyText style={[textH3Style, textCenter, textWhite, textBold]}>{props.label}</MyText>
        </TouchableOpacity>
    );
}