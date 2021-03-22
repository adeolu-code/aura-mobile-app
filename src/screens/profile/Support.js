import React, { Component } from "react";
import { SafeAreaView, ScrollView, Pressable, Image, StyleSheet, Keyboard, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { View, Icon } from "native-base";
// import { Styles } from "./profile.style";
import { Styles } from "../host/host.style";
import colors from "../../colors";
import { MyText, CustomInput, Error, CustomButton, Loading } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { setContext, urls, GetRequest, Request, uploadMultipleFile, successMessage, errorMessage } from '../../utils';
import SelectImageModal from '../../components/SelectImageModal';
import ImagePicker from 'react-native-image-crop-picker';
import { AppContext } from "../../../AppProvider";

import moment from 'moment';

export default class Support extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { subject: '', information: '', email: '', name: '', phoneNumber: '', media: [], loading: false, 
        formErrors: [], toggleFile: false, uploading: false,
        selectModal: false, images: [] };
    }

    renderLoading = () => {
        const { loading } = this.state;
        if (loading) { return (<Loading />); }
    }
    renderError = () => {
        const { formErrors } = this.state;
        if (formErrors.length !== 0) {
        return (<Error errors={formErrors} />)
        }
    }

    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    disabled = () => {
        const { subject, information} = this.state;
        if (subject === '' || information === '') {
        return true;
        }
        return false;
    }
    openSelectModal = (cover) => {
        this.setState({ selectModal: true })
    }
    closeSelectModal = () => {
        this.setState({ selectModal: false })
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
            this.setState({ images: arr }) 
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
            cropping: true,
            multiple: true
        }).then((imgs) => {
            const arr = [...images, ...imgs]
            this.setState({ images: arr })
                
        }).catch(error => {
            console.log("Error from camera ", error);
        }).finally(() => {
            this.closeSelectModal()
        })
    }
    uploadFiles = () => {
        const { images } = this.state
        const imgs = images.filter(item => item.mime)
        this.setState({ uploading: true })
        uploadMultipleFile(imgs)
        .then((res) => {
            if(!res.isError) {
                const data = res.data;
                const urls = data.map(item => item.fileName)
                this.setState(()=>({ media: urls }), () => {
                    this.submitReport()
                })
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
        .finally(() => {
            this.setState({ uploading: false })
        })
    }
    submitReport = async () => {
        const { subject, information, media } = this.state;
        const obj = {
            subject, information, media
        }
        try {
            const res = await Request(urls.messagingBase, `messaging/${urls.v}complaints`, obj);
            this.setState({ loading: false })
            console.log('Res ',res);
            if (!res.isError) {
                this.setState({ images: [], toggleFile: false, information: '', subject: ''})
                // this.props.navigation.navigate('Resend', { email })
                successMessage('Your message has been received !')
            } else {
                const message = res.message;
                const error = [message]
                errorMessage('Something went wrong, please try again, if error continues please contact support');
                // this.setState({ formErrors: error });
            }
        } catch (error) {
            console.log('Catched error ', error)
            this.setState({ loading: false})
        }
    }
    submit = async () => {
        Keyboard.dismiss()
        const { images } = this.state;
        const { isLoggedIn } = this.context.state
        this.setState({ loading: true, formErrors: [] })
        if(isLoggedIn) {
            if(images.length > 0) {
                this.uploadFiles()
            } else {
                this.submitReport()
            }
        } else {
            this.submitSupport()
        }
    }
    submitSupport = async () => {
        const { name, email, subject, information, phoneNumber } = this.state
        const obj = {
            subject, message: information, phoneNumber, email, name
        }
        try {
            const res = await Request(urls.identityBase, `${urls.v}misc/contactform`, obj);
            this.setState({ loading: false })
            console.log('Res ',res);
            if (!res.isError) {
                this.setState({ toggleFile: false, information: '', subject: '', phoneNumber: '', email: '', name: ''})
                successMessage('Your message has been received !')
            } else {
                const message = res.message;
                const error = [message]
                errorMessage('Something went wrong, please try again, if error continues please contact support');
            }
        } catch (error) {
            console.log('Catched error ', error)
            this.setState({ loading: false})
        }

    }
    toggleAddFiles = () => {
        const { toggleFile } = this.state
        this.setState(() => ({ toggleFile: !toggleFile }), () => {
            if(!this.state.toggleFile) {
                this.setState({ images: []})
            }
        })
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
                    <Image style={[Styles.miniSelectedImage]} source={{ uri: item.path || item.assetPath }} resizeMode="cover" />
                    <TouchableOpacity style={{ position: "absolute", alignSelf: "flex-end", right: 15, bottom: 10 }} onPress={this.removeImg.bind(this, index)}>
                        <Icon name={"trash-sharp"} style={[Styles.trashIcon]} />
                    </TouchableOpacity>
                </View>
            )
        })
    }

  renderAttachFile = () => {
      const {textOrange, textDanger, textH6Style, textUnderline, flexRow } = GStyles
      if(this.state.toggleFile) {
        return (
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
          )
      }
      
  }
  render() {
    const { textOrange, textH4Style, textBold, textUnderline, flexRow } = GStyles
    const { toggleFile, uploading } = this.state
    const { isLoggedIn } = this.context.state
    return (
        <>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
            <Header {...this.props} title={ "Send a Message"} />
            {this.renderLoading()}
            <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1}}>
                <View style={[ {marginTop: 120, paddingHorizontal: 20, paddingVertical: 20}]}>
                    <View>
                        <MyText style={[textOrange, textH4Style ]}>Please fill in the form below to get in touch with us.</MyText>
                    </View>
                    {!isLoggedIn && <View>
                        <View style={[styles.inputContainer, { marginTop: 10}]}>
                            <CustomInput placeholder="Name" label="" onChangeText={this.onChangeValue} 
                            value={this.state.name}
                            attrName="name" />
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 10}]}>
                            <CustomInput placeholder="Email" label="" onChangeText={this.onChangeValue} 
                            value={this.state.email}
                            attrName="email" />
                        </View>
                        <View style={[styles.inputContainer, { marginTop: 10}]}>
                            <CustomInput placeholder="Phone Number" label="" onChangeText={this.onChangeValue} 
                            value={this.state.phoneNumber}
                            attrName="phoneNumber" />
                        </View>
                    </View>}
                    <View style={[styles.inputContainer, { marginTop: 10}]}>
                        <CustomInput placeholder="Subject" label="" onChangeText={this.onChangeValue} value={this.state.subject}
                        attrName="subject" />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomInput placeholder="Hi, I would like to ..." label="" multiline textInputStyle={{ height: 200}}
                        onChangeText={this.onChangeValue} value={this.state.information}
                        attrName="information" textAlignVertical="top" />
                    </View>
                    {isLoggedIn && <TouchableOpacity onPress={this.toggleAddFiles} style={[flexRow, { marginTop: 20}]}>
                        <Icon type="Feather" name="file-text" style={{ fontSize: 20, color: colors.orange, marginRight: 10}} />
                        <MyText style={[textUnderline,textOrange, textBold, { marginBottom: 15 }]}>
                            {toggleFile ? 'Cancel Files upload' : 'Attach Files' }
                        </MyText>
                    </TouchableOpacity>}
                    { uploading && <MyText style={[textOrange, textH4Style, textBold, { marginBottom: 10 }]}>Uploading...</MyText>}
                    {this.renderAttachFile()}

                    <View style={styles.buttonContainer} >
                        {this.renderError()}
                        <CustomButton buttonText="Submit" onPress={this.submit} disabled={this.disabled()} />
                    </View>
                </View>
            </ScrollView>
            <SelectImageModal visible={this.state.selectModal} onDecline={this.closeSelectModal} onPressCamera={this.cameraSelected} onPressGallery={this.gallerySelected} />
        </SafeAreaView>
    </>
    );
  }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 0, marginTop: 20
    },
    buttonContainer: {
        marginTop: 30, marginBottom: 20,
    },
});
