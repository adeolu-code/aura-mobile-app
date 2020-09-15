import React, { Component } from "react";
import { AppContext } from "../../../AppProvider";
import colors from "../../colors";
const { Container, Content, Header } = require("native-base");

export default class InboxChat extends Component {
    static contextType = AppContext;
    
    constructor(props) {
        super(props);
    
        this.state = {
            
        };
    }

    render() {
        return (
            <Container>
                <Header  androidStatusBarColor={colors.white} />
                <Content>
                    
                </Content>
            </Container>
        );
    }
}