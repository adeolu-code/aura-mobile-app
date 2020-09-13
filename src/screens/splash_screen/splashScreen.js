import React from "react";
import { Container, Header, Content, Toast } from "native-base";
import { Image, TouchableOpacity, Pressable } from "react-native";
import { Styles } from "./splashScreenStyle";

const auraAnimated = require("./../../../assets/aura_animation.gif");
const splashTimeout = 5500;

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
                <Pressable style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center",   alignSelf: "stretch"}} onPress={() => navigateToTab(props)}>
                    <Image source={auraAnimated} style={Styles.imageStyle} />
                </Pressable>
                
            </Content>
        </Container>
    );
}

export default SplashScreen;