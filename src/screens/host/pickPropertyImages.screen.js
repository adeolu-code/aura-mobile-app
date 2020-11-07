import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image  } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon } from "native-base";
import { MyText, CustomButton, Loading } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./host.style";
import colors from "../../colors";
import SelectImageModal from '../../components/SelectImageModal';
import ImagePicker from 'react-native-image-crop-picker';

import { urls, Request, UploadRequest, uploadMultipleFile } from '../../utils';
import { AppContext } from '../../../AppProvider';


export default class PickPropertyImage extends Component {
    static contextType = AppContext
    constructor() {
        super();
        
        this.state = {
            isCaptured: false, images: [], selectModal: false, errors: '', imgUrls: [], loading: false
        };
    }
    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
    }
    openSelectModal = () => {
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
    
    submit = () => {
        this.setState({ loading: true })
        const { images } = this.state
        uploadMultipleFile(images)
        .then((res) => {
            console.log('Res ', res)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            this.setState({ loading: false})
        })
    }
    uploadImage = async () => {

    }
    cameraSelected = () => {
        const { images } = this.state
        ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.8,
            cropping: true
        }).then((image) => {
            const arr = [...images, image]
            // arr.push(image)
            this.setState({ images: arr })
            console.log(arr)
        }).catch(error => {
            console.log("Error from camera ", error);
        }).finally(() => {
            this.closeSelectModal()
        })
    }
    gallerySelected = () => {
        const { images } = this.state
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.8,
            cropping: true
        }).then((image) => {
            const arr = [...images, image]
            // arr.push(image)
            this.setState({ images: arr })
            console.log(arr, arr[0].path.substring(arr[0].path.lastIndexOf('/') + 1))
        }).catch(error => {
            console.log("Error from camera ", error);
        }).finally(() => {
            this.closeSelectModal()
        })
    }

    render() {
        const {
            textWhite,
            textBold,
            textCenter,
            textOrange,
            textH4Style,
            textGreen,
            textUnderline,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    {this.renderLoading()}
                    <Header 
                        {...this.props} title="Upload Your Pictures" 
                        sub={"Lorem Ipsum Text Lorenzo"}
                    />
                    <Container style={[Styles.container]}>
                        <Content>
                            <MyText style={[textGreen, textUnderline, textBold, {marginBottom: 40}]}>See Photography Tips</MyText>
                                <View style={[Styles.pickImageImageView, Styles.centerItems, (this.state.isCaptured && {backgroundColor: "transparent", justifyContent: 'flex-start'})]}>
                                    {
                                        !this.state.isCaptured ?
                                            <> 
                                                <Icon name={"md-image"} style={[Styles.galleryIcon]} />
                                            </>   
                                        :
                                            <View style={[Styles.picturesRowView]}>
                                                <TouchableOpacity style={[ Styles.centerItems, 
                                                    {backgroundColor: colors.lightOrange, width: '46.5%', borderRadius: 10, height: 150, marginTop: 5, marginBottom: 20}]}
                                                    onPress={this.openSelectModal}>
                                                    <Icon name={"add-circle-sharp"} style={[Styles.miniGalleryIcon]} />
                                                    <View>
                                                        <MyText style={[textUnderline, textOrange]}>Add Photo</MyText>
                                                    </View>
                                                </TouchableOpacity>
                                                {this.renderImages()}
                                                {/* 
                                                <View style={[Styles.miniSelectedImageView]}>
                                                    <Image style={[Styles.miniSelectedImage]} source={require("./../../assets/images/photo/photo.png")} />
                                                    <TouchableOpacity style={{ position: "absolute", alignSelf: "flex-end", right: 15, bottom: 10,}}>
                                                        <Icon name={"trash-sharp"} style={[Styles.trashIcon]} />
                                                    </TouchableOpacity>
                                                </View>
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
                                {
                                    !this.state.isCaptured ?
                                        <CustomButton buttonText="Choose A Picture" onPress={() => this.setState({isCaptured: true})} buttonStyle={{elevation: 2}} />
                                    :
                                    // <CustomButton buttonText="Next" onPress={() => this.props.navigation.navigate('AddProfilePicture')} buttonStyle={{elevation: 2}} />
                                    <CustomButton buttonText="Next" onPress={this.submit} buttonStyle={{elevation: 2}} />
                                }
                        </Content>
                        <SelectImageModal visible={this.state.selectModal} onDecline={this.closeSelectModal} onPressCamera={this.cameraSelected} onPressGallery={this.gallerySelected} />
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}