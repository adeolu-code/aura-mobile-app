import React, { useState } from "react";
import { Container, Header, Content } from "native-base";
import { Image, TouchableOpacity } from "react-native";
import { Styles } from "./splashScreenStyle";


const auraAnimated = require("./../../assets/aura_splash_animation.gif");
// const auraAnimated = require("./../../assets/aura_animation.gif");
const splashTimeout = 3800;

const navigateToTab = (props) => {
    props.navigation.navigate("Tabs");
    console.log("moved", new Date().getMinutes(), new Date().getSeconds());
}

const SplashScreen = (props) => {
    const [play, setPlay] = useState(true);
    
    setTimeout(() => {
        console.log("timer out", play, new Date().getMinutes(), new Date().getSeconds());
        setPlay(false);
        navigateToTab(props);
    }, splashTimeout);

    return (
        <Container>
            <Header androidStatusBarColor={"black"} style={{backgroundColor: "black"}} />
            <Content style={Styles.contentStyle} contentContainerStyle={Styles.contentContainerStyle}>
                <TouchableOpacity style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center", alignSelf: "stretch"}} onPress={() => navigateToTab(props)}>
                    {
                        play &&
                        <Image source={auraAnimated} style={Styles.imageStyle} />
                    }
                    
                </TouchableOpacity>
                
            </Content>
        </Container>
    );
}

export default SplashScreen;