import { MyText } from "../../utils/Index";
import GeneralStyles from "./../../assets/styles/GeneralStyles";
import React from 'react';

/**
 * Props
 * 
 * text [string]
 */
export default class NoContentComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            textCenter, textBold, textH3Style
        } = GeneralStyles;
        return (
            <MyText style={[textCenter, textBold, textH3Style]}>
                {
                    this.props.text || "Nothing to show."
                }
            </MyText>
        );
    }
}