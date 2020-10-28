import React, { Component } from "react";
import { View } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Styles } from "./tipView.style";
/**
 * #props
 * 
 * text [string]
 * 
 * style [object]
 */
export default class TipViewComponent extends Component {
    constructor() {
        super();
    }

    render () {
        const {
            textBold,
            textGreen,
          } = GStyles;
        return (
            <View style={[Styles.rowView, {flexWrap: "wrap", alignItems: "flex-start", paddingBottom: 10}, this.props.style]}>
                <MyText style={[textGreen, textBold]}>Tips: </MyText>
                <MyText style={[textBold, Styles.rowView ,]}>
                    {this.props.text}
                </MyText>
            </View>
        );
    }
}