import React from "react";
import { Container, Header, Content } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { Styles } from "./splashScreenStyle";


const auraAnimated = require("./../../assets/aura_splash_animation.gif");
// const auraAnimated = require("./../../assets/aura_animation.gif");
const splashTimeout = 3800;

const navigateToTab = (props) => {
    props.navigation.navigate("Tabs");
}

const SplashScreen = (props) => {
    setTimeout(() => {
        navigateToTab(props);
    }, splashTimeout);

    return (
        <Container>
            <Header androidStatusBarColor={"black"} style={{backgroundColor: "black"}} />
            <Content style={Styles.contentStyle} contentContainerStyle={Styles.contentContainerStyle}>
                <TouchableOpacity style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignSelf: "stretch"}} onPress={() => navigateToTab(props)}>
                    <Image source={auraAnimated} style={Styles.imageStyle} />
                </TouchableOpacity>
                
            </Content>
        </Container>
    );
}

export default SplashScreen;