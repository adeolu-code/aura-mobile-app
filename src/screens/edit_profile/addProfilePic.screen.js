import React,{ Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image  } from "react-native";
import { Styles } from "./editProfile.style";
import { Container, Content, View, Icon, Footer, Toast, Button } from "native-base";
import colors from "../../colors";
import Header from "../../components/Header";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";

export default class AddProfilePicture extends Component {
    constructor() {
        super();

        this.state = {
            isCaptured: false,
        };
    }

    onSave = () => {
        if (!this.state.isCaptured) {
            Toast.show({
                text: "Please select a file",
                type: "warning",
            });
            return;
        }

        this.props.navigation.navigate('VerifyPhoneNumber');
    }

    render() {
        const {
            textWhite,
            textBold,
            textH5Style,
            textCenter,
            textDarkBlue,
            textOrange,
            textH4Style,
            imgStyle,
            textUnderline,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header
                        {...this.props} 
                        title="Add A Profile Picture" 
                        sub={"Make sure the photo clearly shows your face"}
                    />
                    <Container style={[Styles.container, {marginTop: 150}]}>
                        <Content>
                            <View style={[Styles.roundedUser]}>
                                {
                                    this.state.isCaptured ? 
                                    <Image 
                                        source={require("./../../assets/images/photo/photo.png")} 
                                        style={[Styles.userImage]}
                                    />
                                    :
                                        <Icon name={"ios-person"} style={[Styles.userIcon]} />
                                }
                            </View>
                            <TouchableOpacity onPress={() =>this.setState({isCaptured: true})}>
                                <MyText style={[textCenter, textOrange, textUnderline, {marginTop: 10}]}>
                                    {
                                        this.state.isCaptured ?
                                            "Change Profile Picture"
                                        : 
                                            "Add A Profile Picture"
                                    }
                                </MyText>
                            </TouchableOpacity>
                            <View style={[Styles.fbProfilePic]}>
                                <Image source={require("./../../assets/images/profile/facebook/facebook.png")} />
                                <MyText style={[textUnderline, {marginTop: 5, marginLeft: 5}]}>Use Facebook Photo</MyText>
                            </View>
                        </Content>
                        <Footer style={[Styles.footer, {backgroundColor: (!this.state.isCaptured ? colors.lightOrange : colors.orange)}]}>
                            <Button
                                transparent 
                                style={[Styles.nextButton, {backgroundColor: (!this.state.isCaptured ? colors.lightOrange : colors.orange)}]}
                                onPress={() => this.onSave()}
                            >
                                <MyText
                                    style={[textWhite, textH4Style, textBold]}
                                >
                                    Next
                                </MyText>
                            </Button>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}