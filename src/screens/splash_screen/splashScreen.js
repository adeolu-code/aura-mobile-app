const { Container, Header, Content } = require("native-base");
const { Image } = require("react-native");
import { Styles } from "./splashScreenStyle";

const auraAnimated = require("./../../../assets/aura_animation.gif");

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