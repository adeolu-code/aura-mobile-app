import React, { Component } from "react";
import { StatusBar, SafeAreaView,TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import { Container, View, Content, Footer, Button, Toast, Icon } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';

export default class UploadVerification extends Component {
    constructor(props) {
        super();
        this.state = {
            isCaptured: false,
            selectedId: props.route.params.selectedId,
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

    selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
          });
    }
    

    render() {
        const {
            textWhite,
            textBold,
            textCenter,
            textOrange,
            textH4Style,
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
                                                <TouchableOpacity onPress={() => this.selectImage()}>
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
                        <Footer style={[Styles.footer, Styles.transparentFooter, {backgroundColor: (!this.state.isCaptured ? colors.lightOrange : colors.orange)}]}>
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