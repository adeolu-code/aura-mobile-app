import React from 'react';
import { Container, Header, Content } from "native-base";
import { Image } from 'react-native';
import { Styles } from "./splashScreenStyle";

const auraAnimated = require("../../assets/aura_animation.gif");

const SplashScreen = () => {
    return (
        <Container>
            <Header androidStatusBarColor={"black"} style={{backgroundColor: "black"}} />
            <Content style={Styles.contentStyle} contentContainerStyle={Styles.contentContainerStyle}>
                <Image source={auraAnimated} style={Styles.imageStyle} />
            </Content>
        </Container>
    );
}

export default SplashScreen;