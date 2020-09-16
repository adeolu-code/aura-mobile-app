import { Icon, View } from "native-base";
import React, { Component } from "react";
import { MyText } from "../../utils/Index";
import { Styles } from "./inboxMessage.style";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Image } from "react-native";

export default class SingleMessage extends Component {
    constructor(props) {
        super();

        this.state = {
            left: false,
        };
    }

    render() {
        const { textWhite, textRight, textH6Style, textH4Style } = GStyles;
        return(
            
                this.state.left ?
                    <View style={[Styles.viewLeft]}>
                        <View style={[Styles.messageView]}>
                            <MyText style={[textWhite, textH4Style]}>
                            Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            </MyText>
                            <View style={[{flexDirection: "row", alignSelf: "flex-end", alignItems: "center"}]}>
                                <MyText style={[textWhite, textRight, textH6Style]}>12: 00</MyText>
                                <Icon name={"ios-checkmark-done"} style={[Styles.icon]} />
                            </View>
                            
                        </View>
                        <Image 
                            source={require("./../../assets/images/photo/photo.png")} 
                            style={[Styles.userImage]}
                        />
                    </View>
                :
                <View style={{flexDirection: "row-reverse"}}>
                    <View style={[Styles.messageView]}>
                        <MyText style={[textWhite, textH4Style]}>
                        Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        </MyText>
                        <View style={[{flexDirection: "row", alignSelf: "flex-end", alignItems: "center"}]}>
                            <MyText style={[textWhite, textRight, textH6Style]}>12: 00</MyText>
                            <Icon name={"ios-checkmark-done"} style={[Styles.icon]} />
                        </View>
                        
                    </View>
                    <Image 
                        source={require("./../../assets/images/photo/photo.png")} 
                        style={[Styles.userImage]}
                    />
                </View>

            
        );
    }
}