import React,{ Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image  } from "react-native";
import { Styles } from "./editProfile.style";
import { Container, Content, View, Icon, Footer, Toast, Button } from "native-base";
import colors from "../../colors";
import Header from "../../components/Header";
import GStyles from "./../../assets/styles/GeneralStyles";
import { MyText } from "../../utils/Index";
import ImagePicker from 'react-native-image-crop-picker';
import { prepareMedia, uploadImageApi } from "../../utils";
// - use fb photos
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

        let data = new FormData();
        data.append("File", this.state.imageFile);
        data.append("FileName", this.state.imageFile.name);
        uploadImageApi([
            { 
                name : 'attachments', filename : this.state.imageFile.fileName, type:this.state.imageFile.mime, data: RNFetchBlob.wrap(this.state.imageFile.uri)
            },
            {
                name: 'FileName', 
                data: 1
             }
        ]).then(result => console.log("res", result));

        /**
         * [
      // element with property `filename` will be transformed into `file` in form data
      { 
          name : this.state.type, filename : this.state.video.fileName, type:this.state.video.type, data: RNFetchBlob.wrap(this.state.video.path)
      },
      {
         name: 'glam_id', 
         data: this.context.state.user_data.id.toString()
      }
      
    ]
         */

        // this.props.navigation.navigate('VerifyPhoneNumber');
    }

    selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            writeTempFile: true,
            
          }).then(image => {
              console.log("file", prepareMedia(
                {
                    ...image,
                    ...{
                        fileName: image.path.substr(image.path.lastIndexOf("/")).replace("/","")
                    }
                }));
            this.setState({
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
                                        source={this.state.imageFile} 
                                        style={[Styles.userImage]}
                                    />
                                    :
                                        <Icon name={"ios-person"} style={[Styles.userIcon]} />
                                }
                            </View>
                            <TouchableOpacity onPress={() => this.selectImage()}>
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
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <TouchableOpacity
                                style={[Styles.nextButton, {backgroundColor: (!this.state.isCaptured ? colors.lightOrange : colors.orange)}]}
                                onPress={() => this.onSave()}
                            >
                                <MyText
                                    style={[textWhite, textH4Style, textBold, textCenter]}
                                >
                                    Next
                                </MyText>
                            </TouchableOpacity>
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}