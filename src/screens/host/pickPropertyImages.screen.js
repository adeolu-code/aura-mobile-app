import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image, ScrollView  } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon } from "native-base";
import { MyText, CustomButton, Loading, CustomInput } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./host.style";
import colors from "../../colors";
import SelectImageModal from '../../components/SelectImageModal';
import ImagePicker from 'react-native-image-crop-picker';

import { urls, Request, UploadRequest, uploadMultipleFile, uploadFile, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider';


export default class PickPropertyImage extends Component {
    static contextType = AppContext
    constructor() {
        super();
        
        this.state = {
            isCaptured: false, selectModal: false, errors: '', images: [], imgUrls: [], loading: false, coverImage: '', coverImgUrl: '',
            cover: false, additionalInformation: ''
        };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
    }
    openSelectModal = (cover) => {
        
        if(cover) {
            this.setState({ cover: true })
        } else {
            this.setState({ cover: false })
        }
        this.setState({ selectModal: true })
    }
    closeSelectModal = () => {
        this.setState({ selectModal: false })
    }
    removeImg = (index) => {
        const { images } = this.state
        const arrImgs = images
        arrImgs.splice(index, 1)
        this.setState({ images: arrImgs })
    }
    renderImages = () => {
        const { images } = this.state
        return images.map((item, index) => {
            return (
                <View style={[Styles.miniSelectedImageView]} key={index}>
                    <Image style={[Styles.miniSelectedImage]} source={{ uri: item.path }} resizeMode="cover" />
                    <TouchableOpacity style={{ position: "absolute", alignSelf: "flex-end", right: 15, bottom: 10 }} onPress={this.removeImg.bind(this, index)}>
                        <Icon name={"trash-sharp"} style={[Styles.trashIcon]} />
                    </TouchableOpacity>
                </View>
            )
        })
    }

    submitCover = () => {
        const { coverImage } = this.state;
        if(!coverImage) {
            this.openSelectModal(true)
        } else {
            // this.setState({ isCaptured: true })
            this.uploadCover()
        }
    }
    uploadCover = () => {
        const { coverImage } = this.state;
        this.setState({ loading: true })
        uploadFile(coverImage)
        .then((res) => {
            console.log('Res ', res)
            if(!res.isError) {
                const data = res.data;
                this.updateCoverPhoto(data.displayUrl)
            } else {
                errorMessage('Failed to upload Cover Image, try again else contact support')
                this.setState({ loading: false })
            }
        })
        .catch(error => {
            console.log(error)
            this.setState({ loading: false })
            errorMessage(error)
        })
    }
    updateCoverPhoto = (url) => {
        const { additionalInformation } = this.state
        const { propertyFormData } = this.context.state
        const { set } = this.context

        const obj = {
            propertyId: propertyFormData.id, additionalInformation, isMain: true, imageName: url
        }
        Request(urls.listingBase, `${urls.v}listing/photo`, obj )
        .then((res) => {
            this.setState({ isCaptured: true,  })
            console.log('Res ', res)
            const mainImage = res.data
            set({ propertyFormData: {...propertyFormData, mainImage }})
        })
        .catch(error => {
            console.log('Error ', error)
            errorMessage('Failed to update cover image, try again else contact support')
        })
        .finally(() => {
            this.setState({ loading: false, cover: false })
        })
    }
    
    submit = () => {
        this.setState({ loading: true })
        const { images } = this.state
        uploadMultipleFile(images)
        .then((res) => {
            if(!res.isError) {
                const data = res.data;
                const urls = data.map(item => item.displayUrl)
                this.updateOtherImages(urls)
            } else {
                errorMessage('Failed to upload images, try again else contact support')
                this.setState({ loading: false })
            }
        })
        .catch(error => {
            console.log(error)
            this.setState({ loading: false })
            errorMessage('Failed to upload images, try again else contact support')
        })
    }
    updateOtherImages = (imageUrls) => {
        const { propertyFormData } = this.context.state
        const obj = {
            propertyId: propertyFormData.id, imageNames: imageUrls
        }
        Request(urls.listingBase, `${urls.v}listing/photo/multiplephoto`, obj )
        .then((res) => {
            console.log('Res ', res)
            this.props.navigation.navigate("PropertyDescription");
        })
        .catch(error => {
            console.log('Error ', error)
        })
        .finally(() => {
            this.setState({ loading: false})
        })
    }
    
    cameraSelected = () => {
        const { images, cover } = this.state
        ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.8,
            cropping: true
        }).then((image) => {
            if(cover) {
                this.setState({ coverImage: image })
            } else {
                const arr = [...images, image]
                this.setState({ images: arr })
                console.log(arr)
            }
        }).catch(error => {
            console.log("Error from camera ", error);
        }).finally(() => {
            this.closeSelectModal()
        })
    }
    gallerySelected = () => {
        const { images, cover } = this.state
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.8,
            cropping: true,
            multiple: cover ? false : true
        }).then((imgs) => {
            if(cover) {
                this.setState({ coverImage: imgs })
            } else {
                const arr = [...images, ...imgs]
                this.setState({ images: arr })
                console.log(arr)
            }
        }).catch(error => {
            console.log("Error from camera ", error);
        }).finally(() => {
            this.closeSelectModal()
        })
    }

    renderCoverImage = () => {
        const { coverImage } = this.state;
        const { imgStyle, textBold, textH4Style, textOrange, textUnderline} = GStyles
        if(coverImage) {
            return (
                <>
                    <TouchableOpacity style={{ width: '100%', height: 290, borderRadius: 10, overflow: 'hidden'}} onPress={this.openSelectModal.bind(this, true)}>
                        <Image style={[imgStyle]} source={{ uri: coverImage.path }} resizeMode="cover" />
                    </TouchableOpacity>
                </>
            )
        }
        return (
            <>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center'}} onPress={this.openSelectModal.bind(this, true)}>
                    <Icon name={"md-image"} style={[Styles.galleryIcon]} />
                    <MyText style={[textBold, textH4Style, textOrange, textUnderline]}>Add Cover Image</MyText>
                </TouchableOpacity>
            </>
        )
    }

    render() {
        const {
            textWhite, textBold,
            textCenter,
            textOrange,
            textH4Style,
            textGreen,
            textUnderline,
          } = GStyles;
        const { coverImage, isCaptured, additionalInformation } = this.state
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header 
                        {...this.props} title="Upload Your Pictures" 
                        sub={!isCaptured ? "Upload cover image" : "Upload other images of property"}
                    />
                    <ScrollView>
                    <Container style={[Styles.container]}>
                        <Content>
                            <MyText style={[textGreen, textUnderline, textBold, {marginBottom: 40}]}>See Photography Tips</MyText>
                                <View style={[Styles.pickImageImageView, Styles.centerItems, (this.state.isCaptured && {backgroundColor: "transparent", justifyContent: 'flex-start'})]}>
                                    {
                                        !isCaptured ?
                                            <> 
                                                {this.renderCoverImage()}
                                            </>   
                                        :
                                            <View style={[Styles.picturesRowView]}>
                                                <TouchableOpacity style={[ Styles.centerItems, 
                                                    {backgroundColor: colors.lightOrange, width: '46.5%', borderRadius: 10, height: 150, marginTop: 5, marginBottom: 20}]}
                                                    onPress={this.openSelectModal.bind(this, false)}>
                                                    <Icon name={"add-circle-sharp"} style={[Styles.miniGalleryIcon]} />
                                                    <View>
                                                        <MyText style={[textUnderline, textOrange]}>Add Photo</MyText>
                                                    </View>
                                                </TouchableOpacity>
                                                {this.renderImages()}
                                                {/* 
                                                 <View style={[Styles.miniSelectedImageView]}>
                                                    <Image 
                                                        style={[Styles.miniSelectedImage]}
                                                        source={require("./../../assets/images/photo/photo.png")} 
                                                    />
                                                    <Icon name={"trash-sharp"} style={[Styles.trashIcon]} />
                                                </View> */}
                                                

                                            </View>
                                            
                                    }
                                    
                                </View>
                                {!isCaptured ? <View style={{ marginTop: 20}}>
                                    <CustomInput label="Cover Image description (optional)" placeholder=" " 
                                    value={additionalInformation} onChangeText={(text) => { this.setState({ additionalInformation: text })}} />
                                </View> : <></>}
                                <View style={{ marginTop: 60}}>
                                    {
                                        !isCaptured ?
                                            <CustomButton buttonText={coverImage ? "Next" : "Choose A Cover Picture"} onPress={this.submitCover} buttonStyle={{elevation: 2}} />
                                        :
                                        // <CustomButton buttonText="Next" onPress={() => this.props.navigation.navigate('AddProfilePicture')} buttonStyle={{elevation: 2}} />
                                        <CustomButton buttonText="Next" onPress={this.submit} buttonStyle={{elevation: 2}} />
                                    }
                                </View>
                        </Content>
                        <SelectImageModal visible={this.state.selectModal} onDecline={this.closeSelectModal} onPressCamera={this.cameraSelected} onPressGallery={this.gallerySelected} />
                    </Container>
                    </ScrollView>
                </SafeAreaView>
            </>
        );
    }
}