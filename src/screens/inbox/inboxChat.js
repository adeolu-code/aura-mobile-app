import React, { Component } from "react";
import { AppContext } from "../../../AppProvider";
import colors from "../../colors";
const { Container, Content, Header } = require("native-base");
import { Styles } from "./inbox.style";

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
                <Header  style={[Styles.chatHeader]} />
                <Content>
                    
                </Content>
            </Container>
        );
    }
}