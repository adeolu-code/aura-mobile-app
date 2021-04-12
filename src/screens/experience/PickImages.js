import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, Image, ScrollView  } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon } from "native-base";
import { MyText, CustomButton, Loading, CustomInput } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Styles } from "../host/host.style";
import colors from "../../colors";
import SelectImageModal from '../../components/SelectImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import { urls, Request, UploadRequest, uploadMultipleFile, uploadFile, errorMessage, GetRequest, SCREEN_HEIGHT } from '../../utils';
import { AppContext } from '../../../AppProvider';
import PhotographTipsModal from '../../components/PhotographTipsModal';

import CancelComponent from '../../components/experience/CancelComponent';


export default class PickImages extends Component {
    static contextType = AppContext
    constructor() {
        super();
        
        this.state = {
            isCaptured: false, selectModal: false, errors: '', images: [], loading: false, coverImage: '', coverImgUrl: '',
            cover: false, additionalInformation: '', showTipsModal: false, photos: []
        };
    }
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    openTipsModal = () => {
        this.setState({ showTipsModal: true })
    }
    closeTipsModal = () => {
        this.setState({ showTipsModal: false })
    }
    componentDidMount = () => {
        const { tourOnboard, editTour } = this.context.state;
        console.log(tourOnboard)
        if(editTour && tourOnboard.mainImage) {
            this.getPhotos(tourOnboard.id)
            this.setState({ coverImage: { path: tourOnboard.mainImage.assetPath }, 
                additionalInformation: tourOnboard.mainImage.additionalInformation })
        }
    }
    getPhotos = async (id) => {
        this.setState({ loadingImages: true })
        try {
            const res = await GetRequest(urls.experienceBase, `${urls.v}experience/photo/experience?experienceid=${id}`);
            console.log('Photos tour ', res)
            this.setState({ loadingImages: false })
            if(res.isError || res.IsError) {
                const message = res.Message || res.message;
                errorMessage(message)
            } else {
                const imgData = res.data;
                const images = imgData.filter(item => !item.isMain)
                this.setState({ photos: imgData, images })
            }
        } catch (error) {
            this.setState({ loadingImages: false })
        }
        
    }
    deletePhoto = async (id) => {
        try {
            const res = await Request(urls.experienceBase, `${urls.v}experience/photo/delete?photoId=${id}`, null, false, 'DELETE');
        } catch (error) {
            
        }
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: SCREEN_HEIGHT, width: '100%', zIndex: 100 }} />); }
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
        const img = images[index]
        // console.log(img)
        if(img.id) {
            this.deletePhoto(img.id)
        }
        const arrImgs = images
        arrImgs.splice(index, 1)
        this.setState({ images: arrImgs })
    }
    renderImages = () => {
        const { images } = this.state
        return images.map((item, index) => {
            return (
                <View style={[Styles.miniSelectedImageView]} key={index}>
                    <Image style={[Styles.miniSelectedImage]} source={{ uri: item.path || item.assetPath }} resizeMode="cover" />
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
            // this.setState({ isCaptured: true })
            if(coverImage.size && coverImage.mime) {
                const { tourOnboard, editTour } = this.context.state;
                if(editTour && tourOnboard.mainImage && tourOnboard.mainImage.assetPath) {
                    this.deletePhoto(tourOnboard.mainImage.id)
                }
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
                this.updateCoverPhoto(data.displayUrl)
            }
        })
    }
    updateCoverPhoto = async (imgUrl) => {
        const { additionalInformation } = this.state
        const { tourOnboard } = this.context.state
        const obj = {
            experienceId: tourOnboard.id, additionalInformation, assetPath: imgUrl, isMain: true
        }
        const res = await Request(urls.experienceBase,`${urls.v}experience/photo/upload`, obj )
        this.setState({ loading: false })
        if(res.isError || res.IsError) {
            errorMessage('Failed to update cover image, try again else contact support')
        } else {
            this.setState({ isCaptured: true, cover: false })
            this.makeCover(res.data)
        }
       
    }

    makeCover = async (data) => {
        const obj = {
            photoId: data.id,
            experienceId: data.experienceId
        }
        try {
            await Request(urls.experienceBase,`${urls.v}experience/photo/cover`, obj )
        } catch (error) {
            
        }
        
        // const res = await GetRequest(urls.experienceBase, `${urls.v}experience/photo/experience?experienceid=${data.}`)
        // if(res.isError || res.IsError) {

        // } else {
            
        // }
    }
    
    submit = async () => {
        const { editTour } = this.context.state
        const { images } = this.state
        const imgs = images.filter(item => item.mime)
        if(imgs.length !== 0) {
            this.setState({ loading: true })
            try {
                const res = await uploadMultipleFile(imgs)
                if(res.isError || res.IsError) {
                    errorMessage(res.message || res.Message)
                    this.setState({ loading: false })
                } else {
                    const data = res.data;
                    const urls = data.map(item => item.displayUrl)
                    this.updateOtherImages(urls)
                } 
            } catch (error) {
                errorMessage('Something went wrong, please try again or contact support')
                this.setState({ loading: false })
            }
            
        } else {
            if(editTour) {
                this.props.navigation.navigate("TourMeetingLocation");
            } else {
                errorMessage('Please add images')
            }
        }
        
    }
    updateOtherImages = (imageUrls) => {
        const { tourOnboard } = this.context.state
        const obj = {
            experienceId: tourOnboard.id, imageNames: imageUrls
        }
        Request(urls.experienceBase, `${urls.v}experience/photo/multiple/upload`, obj )
        .then((res) => {
            console.log('Res ', res)
            this.props.navigation.navigate("TourMeetingLocation");
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
            console.log(imgs)
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
            textGreen,
            textUnderline, flexRow, textH6Style, textDanger
          } = GStyles;
        const { coverImage, isCaptured, additionalInformation } = this.state
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header 
                        {...this.props} title="Upload Your Photos" 
                        sub={!isCaptured ? "Upload cover image" : "Upload other images for this tour"}
                    />
                    <ScrollView>
                    <View style={[Styles.container]}>
                        <Content>
                                <TouchableOpacity onPress={this.openTipsModal}>
                                    <MyText style={[textGreen, textUnderline, textBold, {marginBottom: 40}]}>See Photography Tips</MyText>
                                </TouchableOpacity>
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
                                                    <View style={[flexRow, { paddingHorizontal: 8, marginTop: 15}]}>
                                                        <Icon name="alert-circle" style={{ fontSize: 16, color: colors.danger, marginRight: 5 }} />
                                                        <MyText style={[textH6Style, textDanger]}>Total Upload Limit Is 20mb!</MyText>
                                                    </View>
                                                </TouchableOpacity>
                                                {this.renderImages()}
                                                

                                            </View>
                                            
                                    }
                                    
                                </View>
                                {!isCaptured ? <View style={{ marginTop: 20}}>
                                    <CustomInput label="Cover Image description (optional)" placeholder=" " attrName="additionalInformation"
                                    value={additionalInformation} onChangeText={this.onChangeValue} />
                                </View> : <></>}
                                <View style={{ marginTop: 60}}>
                                    {
                                        !isCaptured ?
                                            <CustomButton buttonText={coverImage ? "Next" : "Choose A Cover Picture"} onPress={this.submitCover} 
                                            buttonStyle={{elevation: 2, ...GStyles.shadow }} />
                                        :
                                        // <CustomButton buttonText="Next" onPress={() => this.props.navigation.navigate('AddProfilePicture')} buttonStyle={{elevation: 2}} />
                                        <CustomButton buttonText="Next" onPress={this.submit} buttonStyle={{elevation: 2}} />
                                    }
                                </View>
                                {this.context.state.editTour ? <CancelComponent {...this.props} wrapper={{ paddingRight: 0, marginTop: 20}} /> : <></>}
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