import React, { Component } from "react";
import { StatusBar, SafeAreaView,TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import { Container, View, Content, Footer, Button, Toast, Icon } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import { LabelInput } from "../../components/label_input/labelInput.component";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";
// import ImagePicker from 'react-native-image-picker';
import { prepareMedia } from "./../../utils";

export default class UploadVerification extends Component {
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
                    <Header {...this.props} title="Upload Your Means Of Identification" />
                    <Container style={[Styles.selectVerificationContainer]}>
                        <Content>
                                <View style={[Styles.imageView, Styles.centerItems, (this.state.isCaptured && {backgroundColor: "transparent"})]}>
                                    {
                                        !this.state.isCaptured ?
                                            <> 
                                                <Icon name={"md-image"} style={[Styles.galleryIcon]} />
                                                <TouchableOpacity onPress={() => this.setState({isCaptured: true})}>
                                                    <MyText style={[textUnderline, textOrange]}>Tap to Upload Picture of ID</MyText>
                                                </TouchableOpacity>
                                            </>   
                                        :
                                            <Image source={require("./../../assets/images/photo/photo.png")} />
                                    }
                                    
                                </View>
                                {
                                    this.state.isCaptured && 
                                    <TouchableOpacity>
                                        <MyText style={[textUnderline, textOrange, textCenter]}>Change Picture</MyText>
                                    </TouchableOpacity>
                                }
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
                                    Send Document
                                </MyText>
                            </Button>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}