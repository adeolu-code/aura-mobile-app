import React, { Component, Fragment } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image, ScrollView  } from "react-native";
import Header from "../../components/HeaderClose";
import { Container, Content, View, Icon } from "native-base";
import { MyText, CustomButton, Loading, CustomInput } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "../host/host.style";
import colors from "../../colors";
import SelectImageModal from '../../components/SelectImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import { urls, Request, UploadRequest, uploadMultipleFile, uploadFile, errorMessage, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';

import PhotographTipsModal from '../../components/PhotographTipsModal';


export default class UploadImages extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        
        this.state = {
            isCaptured: false, selectModal: false, errors: '', images: [], imgUrls: [], loading: false, coverImage: '', coverImgUrl: '',
            cover: false, showTipsModal: false, photographer: '', additionalInformation: ''
        };
        this.state.photographer = props.route.params?.photographer
    }
    openTipsModal = () => {
        this.setState({ showTipsModal: true })
    }
    closeTipsModal = () => {
        this.setState({ showTipsModal: false })
    }
    closeUpload = () => {
        this.props.navigation.navigate('Tabs', { screen: 'Dashboard'})
    }

    componentDidMount = () => {
        // const { propertyFormData } = this.context.state
        // console.log(propertyFormData)
        // if(propertyFormData && propertyFormData.mainImage) {
        //     this.setState({ coverImage: { path: propertyFormData.mainImage.assetPath } })
        // }
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
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

    deleteImgFromStorage = (fileName) => {
        Request(urls.storageBase, `${urls.v}upload/delete?fileName=${fileName}`)
        .then((res) => {
            console.log('Res ', res)
        })
        .catch(error => { console.log(error) })
    }

    submitCover = () => {
        const { coverImage } = this.state;
        if(!coverImage) {
            this.openSelectModal(true)
        } else {
            if(coverImage.size && coverImage.mime) {
                this.uploadCover()
            } else {
                this.setState({ loading: true })
                this.updateCoverPhoto(coverImage.path)
            }
        }
    }
    uploadCover = () => {
        const { coverImage } = this.state;
        this.setState({ loading: true })
        uploadFile(coverImage)
        .then((res) => {
            console.log('Res ', res)
            if(res.isError || res.IsError) {
                errorMessage('Failed to upload Cover Image, try again else contact support')
                this.setState({ loading: false })
            } else {
                const data = res.data;
                this.updateCoverPhoto(data.fileName)
            }
        })
    }
    updateCoverPhoto = (imgUrl) => {
        const { additionalInformation, photographer } = this.state
        
        // const obj = {
        //     PhotographerProfileId: photographer.id, Description: additionalInformation, IsCoverPhoto: true, photo: imgUrl
        // }
        const obj = {
            PhotographerProfileId : photographer.id, Description: additionalInformation, photos: [imgUrl]
        }
        // const formData = new FormData()
        // for (const [key, value] of Object.entries(obj)) {
        //     formData.append(key, value)
        // }
        Request(urls.photographyBase,`${urls.v}photographer/photo/portfolio/multiple`, obj )
        .then((res) => {
            if(res.isError || res.IsError) {
                errorMessage('Failed to update cover image, try again else contact support')
            } else {
                this.getPortfolio()
                this.setState({ isCaptured: true, cover: false  })
            }
        })
        .finally(() => {
            this.setState({ loading: false })
        })
    }
    getPortfolio = async () => {
        try {
            this.setState({ loading: true })
            const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/photo/portfolio/${this.state.photographer.id}`)
            this.setState({ loading: false })
            if(res.isError || res.IsError) {
            //   errorMessage(res.message)
            } else {
                this.makeCoverImage(res.data[0])
            }
        } catch (error) {
            this.setState({ loading: false })
        }
        
    }
    makeCoverImage = async (photo) => {
        const obj = {
            photoId: photo.id,
            photographerProfileId: photo.photographerProfileId
        }
        await Request(urls.photographyBase, `${urls.v}photographer/photo/portfolio/coverphoto`, obj )
        // if(res.isError || res.IsError) {
        //     errorMessage(res.message)
        // } else {
        //     this.setState({ loading: false  })
        // }
    }
    
    submit = () => {
        this.setState({ loading: true })
        const { images } = this.state
        uploadMultipleFile(images)
        .then((res) => {
            if(res.isError || res.IsError) {
                errorMessage('Failed to upload images, try again else contact support')
                this.setState({ loading: false })
            } else {
                const data = res.data;
                const urls = data.uploaded.map(item => item.fileName)
                this.updateOtherImages(urls)
            }
        })
    }
    updateOtherImages = (imageUrls) => {
        const { photographer } = this.state
        const obj = {
            photographerProfileId: photographer.id,
            photos: imageUrls
        }
        Request(urls.photographyBase, `${urls.v}photographer/photo/portfolio/multiple`, obj )
        .then((res) => {
            if(res.isError || res.IsError) {
                errorMessage(res.message)
            } else {
                this.props.navigation.navigate("PhotographPolicy");
            }
            
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
            <View>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center'}} onPress={this.openSelectModal.bind(this, true)}>
                    <Icon name={"md-image"} style={[Styles.galleryIcon]} />
                    <MyText style={[textBold, textH4Style, textOrange, textUnderline]}>Add Cover Image</MyText>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const {
            textWhite, textBold,
            textCenter,
            textOrange,
            textGreen,
            textUnderline,
          } = GStyles;
        const { coverImage, isCaptured, additionalInformation } = this.state
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header 
                        {...this.props} title="Upload your Portfolios" onPress={this.closeUpload} wrapperStyles={{ position: 'relative'}}
                        sub={!isCaptured ? "Upload cover image" : "Series of your best works you would like to share with clients or guests"}
                    />
                    <ScrollView>
                        <View style={[Styles.container, { marginTop: 0, paddingTop: 0}]}>
                            <Content>
                                <TouchableOpacity onPress={this.openTipsModal}>
                                    <MyText style={[textGreen, textUnderline, textBold, {marginBottom: 40, marginTop: 0}]}>See Photography Tips</MyText>
                                </TouchableOpacity>
                                <View style={[Styles.pickImageImageView, Styles.centerItems, (this.state.isCaptured && {backgroundColor: "transparent", justifyContent: 'flex-start'})]}>
                                    {
                                        !isCaptured ? <>{this.renderCoverImage()}</>   
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
                                            

                                        </View>
                                            
                                    }
                                    
                                </View>

                                {!isCaptured ? <View style={{ marginTop: 20}}>
                                    <CustomInput label="Cover Image description (optional)" placeholder=" " 
                                    value={additionalInformation} onChangeText={(text) => { this.setState({ additionalInformation: text })}} />
                                </View> : <></>}
                                <View style={{ marginTop: 60, marginBottom: 20}}>
                                    {
                                        !isCaptured ?
                                            <CustomButton buttonText={coverImage ? "Next" : "Choose A Cover Picture"} onPress={this.submitCover} buttonStyle={{elevation: 2}} />
                                        :   <CustomButton buttonText="Next" onPress={this.submit} buttonStyle={{elevation: 2}} />
                                    }
                                </View> 
                            </Content>
                            <SelectImageModal visible={this.state.selectModal} onDecline={this.closeSelectModal} onPressCamera={this.cameraSelected} onPressGallery={this.gallerySelected} />
                        </View>
                    </ScrollView>
                    <PhotographTipsModal visible={this.state.showTipsModal} onDecline={this.closeTipsModal} />
                </SafeAreaView>
            </>
        );
    }
}