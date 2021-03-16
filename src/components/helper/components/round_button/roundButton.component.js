import React from "react";
import { TouchableOpacity } from "react-native";
import { MyStyle } from "../../../../myStyle";
import GStyles from "../../../../assets/styles/GeneralStyles";
import { MyText } from "../../../../utils/Index";
import { View, Icon } from "native-base";

/**
 * 
 * @param {{String}} label 
 * @param {{Function}} onClick
 */
export function RoundButton(props) {
    const {textCenter, textH3Style, textWhite, textBold} = GStyles;
    const icon = (props.icon == undefined) ? false : ((props.icon) ? props.icon : false);
    return (
        <TouchableOpacity
            style={[MyStyle.nextButton, {height: 40, borderRadius: 5, }, props.style]}
            onPress={() => {
                props.onClick && props.onClick();
            }}
        >
            <View style={[MyStyle.row, {justifyContent: 'center', alignItems: 'center'}]}>
                {
                    icon && <Icon name={icon} style={{padding: 10, color: 'white'}} />
                }
                
                <MyText style={[textH3Style, textCenter, textWhite, textBold]}>{props.label}</MyText>
            </View>
        </TouchableOpacity>
    );
}