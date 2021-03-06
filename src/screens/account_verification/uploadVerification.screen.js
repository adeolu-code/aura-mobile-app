import React, { Component } from "react";
import { StatusBar, SafeAreaView,TouchableOpacity, Image } from "react-native";
import Header from "../../components/Header";
import { Container, View, Content, Footer, Button, Toast, Icon } from "native-base";
import { Styles } from "./accountVerification.style";
import colors from "../../colors";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText, Loading } from "../../utils/Index";
import ImagePicker from 'react-native-image-crop-picker';
import { prepareMedia, uploadImageApi, consoleLog, errorMessage } from "../../utils";
import RNFetchBlob from "rn-fetch-blob";
import { uploadIdentityImageApi } from "../../api/profile.api";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { FILE_NOT_UPLOADED } from "../../strings";
import { AppContext } from "../../../AppProvider";

//upload photo
export default class UploadVerification extends Component {
    static contextType = AppContext;
    constructor(props) {
        super();
        this.state = {
            isCaptured: false,
            selectedId: props.route.params.selectedId,
            imageFile: undefined,
            loading: false,
            isIdenificationDocumentVerfied: props.route.params.force || false,
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
        if (!this.state.identityNumber) {
            Toast.show({
                text: "Please enter ID Number.",
                type: "warning",
            });
            return;
        }

        this.setState({loading: true});
        
        uploadImageApi([
            { 
                name : 'File', filename : this.state.imageFile.name, type:this.state.imageFile.mime, data: RNFetchBlob.wrap(decodeURIComponent(Platform.OS == "ios" ? String(this.state.imageFile.uri).replace("file://","") : String(this.state.imageFile.uri)))
            },
            {
                name: 'FileName', 
                data: String(this.state.imageFile.name),
             }
        ]).then(result => {
            result = JSON.parse(result.data);
            
            if (result.isError == false) {
                // successMessage(result.message || "Picture uploaded");
                uploadIdentityImageApi({
                    "identityTypeId": this.state.selectedId,
                    "identityNumber": this.state.identityNumber,
                    "imageName": this.state.imageFile.name,
                  })
                
                this.setState({loading: false});
                
                setTimeout(() => {
                    this.props.navigation.navigate("Profile")
                }, 1500);
               
            }
            else {
                errorMessage(result.message || FILE_NOT_UPLOADED);
            }
        });
    }

    selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            writeTempFile: true,
            includeBase64: true,
            
          }).then(image => {
            //   console.log("image", image)
              const source = {uri: image.path, width: image.width, height: image.height, mime: image.mime};
            this.setState({
                imageOriginal: source,
                imageFile: prepareMedia(
                    {
                        ...image,
                        ...{
                            fileName: image.path.substr(image.path.lastIndexOf("/")).replace("/","")
                        }
                    }),
            isCaptured: true,
            })
          }).catch(err => console.log(err));
    }
    
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
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
          consoleLog("update_res", this.context.state.userData)
          let uri = undefined;
          if (!this.state.isIdenificationDocumentVerfied || this.state.isCaptured) {
              uri = this.state.imageOriginal;
          }
          else {
              uri = {uri: this.context.state.userData.identificationDocument};
          }
          consoleLog("uri", {uri: this.context.state.userData.identificationDocument}, (!this.state.isCaptured && !this.state.isIdenificationDocumentVerfied), uri);
        return (
            <>
                <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title={!this.state.isIdenificationDocumentVerfied ? "Upload Your Means Of Identification": "Identification Document"} />
                    {this.renderLoading()}
                    <Container style={[Styles.selectVerificationContainer]}>
                        <Content scrollEnabled>
                                <View style={[Styles.imageView, Styles.centerItems, (this.state.isCaptured && {backgroundColor: "transparent"})]}>
                                    {
                                        !this.state.isCaptured && !this.state.isIdenificationDocumentVerfied ?
                                            <> 
                                                <Icon name={"md-image"} style={[Styles.galleryIcon]} />
                                                <TouchableOpacity onPress={() => this.selectImage()}>
                                                    <MyText style={[textUnderline, textOrange]}>Tap to Upload Picture of ID</MyText>
                                                </TouchableOpacity>
                                            </>   
                                        :
                                            <>
                                                <Image 
                                                    source={uri}
                                                    style={[Styles.imageView]} 
                                                />
                                                {
                                                    this.state.isIdenificationDocumentVerfied && !this.state.isCaptured && 
                                                    <TouchableOpacity onPress={() => this.selectImage()}>
                                                        <MyText style={[textUnderline, textOrange, {marginTop: 10, marginBottom: 10, height: 40}]}>Tap to Upload Picture of ID</MyText>
                                                    </TouchableOpacity>
                                                }
                                            </>  
                                    }
                                    
                                </View>
                                {
                                    this.state.isCaptured && 
                                    <TouchableOpacity 
                                        onPress={() => this.selectImage()}
                                    >
                                        <MyText style={[textUnderline, textOrange, textCenter, textBold]}>Change Picture</MyText>
                                    </TouchableOpacity>
                                }
                                {
                                    this.state.isCaptured &&
                                    <LabelInput
                                        label={"Enter Id Number"}
                                        onChangeText={(e) => this.setState({identityNumber: e})}
                                    />
                                }
                        </Content>
                        {
                            <Footer style={[Styles.footer, Styles.transparentFooter,]}>
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
                        }
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}