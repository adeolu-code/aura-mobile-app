import React,{ Component } from "react";
import { SafeAreaView, TouchableOpacity, Image, Platform  } from "react-native";
import { Styles } from "../edit_profile/editProfile.style";
import { Container, Content, View, Icon, Footer, Toast, Button } from "native-base";
import colors from "../../colors";
import Header from "../../components/Header";
import GStyles from "../../assets/styles/GeneralStyles";
import { MyText, Loading, CustomButton } from "../../utils/Index";
import ImagePicker from 'react-native-image-crop-picker';
import { prepareMedia, uploadImageApi, uploadFile, successMessage, errorMessage, urls } from "../../utils";
import RNFetchBlob from "rn-fetch-blob";
import { uploadProfileImageApi } from "../../api/profile.api";
import { AppContext } from "../../../AppProvider";
import { FILE_NOT_UPLOADED } from "../../strings";

// - use fb photos
export default class AddProfilePicture extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);

        this.state = { isCaptured: false, loading: false, profile: ''};
        this.state.profile = props.route.params?.profile
    }

    onSave = () => {
        if (!this.state.isCaptured) {
            Toast.show({
                text: "Please select a file",
                type: "warning",
            });
            return;
        }
        this.setState({loading: true});
        
        uploadImageApi([
            { 
                name : 'File', filename : this.state.imageFile.name, 
                type:this.state.imageFile.mime, 
                data: RNFetchBlob.wrap(decodeURIComponent(Platform.OS == "ios" ? String(this.state.imageFile.uri).replace("file://","") : String(this.state.imageFile.uri)))
            },
            {
                name: 'FileName', 
                data: String(this.state.imageFile.name),
             }
        ]).then(result => {
            result = JSON.parse(result.data);
            
            if (result.isError == false) {
                uploadProfileImageApi({
                    "imageName": result.data.fileName,
                    "profilePicture": result.data.displayUrl,
                }, this.context);
                this.setState({loading: false});
                this.props.navigation.goBack()
                // setTimeout(() => {
                //     if (this.context.state.userData.isPhoneVerified) {
                //         this.props.navigation.navigate("Profile")
                //     }
                //     else {
                //         this.props.navigation.navigate('VerifyPhoneNumber');
                //     }
                // }, 1500);
               
            } else {
                errorMessage(result.message || FILE_NOT_UPLOADED);
            }
        });
    }
    // getUser = async () => {
    //     const { set } = this.context
    //     this.setState({ loading: true })
    //     const res = await GetRequest(urls.identityBase, `${urls.v}user/me`)
    //     console.log('res ', res)
    //     this.setState({ loading: false })
    //     if(res.isError || res.IsError) {
    //         errorMessage(res.message)
    //     } else {
    //         set({ userData: res.data })
    //     }
    // }

    selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            writeTempFile: true,
            
          }).then(image => {
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
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header
                        {...this.props} 
                        title="Add/Change Profile Picture" 
                    />
                    {this.renderLoading()}
                    <Container style={[Styles.container, {marginTop: 150}]}>
                        <Content>
                            <View style={[Styles.roundedUser]}>
                                {
                                    this.state.isCaptured || this.context.state.userData.profilePicture ? 
                                    <Image source={this.state.imageFile || {uri: this.context.state.userData.profilePicture }} 
                                        style={[Styles.userImage]} />
                                    :
                                        <Icon name={"ios-person"} style={[Styles.userIcon]} />
                                }
                            </View>
                            <TouchableOpacity onPress={() => this.selectImage()}>
                                <MyText style={[textCenter, textOrange, textUnderline, {marginTop: 10}]}>
                                    {
                                        this.state.isCaptured || this.context.state.userData.profilePicture  ? "Change Profile Picture" : "Add Profile Picture"
                                    }
                                </MyText>
                            </TouchableOpacity>
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter]}>
                            <CustomButton buttonText="Next" onPress={() => this.onSave()} buttonStyle={{ elevation: 1 }} />
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}