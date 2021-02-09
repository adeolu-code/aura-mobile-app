import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput, Error } from '../../utils/Index';


import { Container, Content, Footer, Button, Icon } from "native-base";
import { LabelInput } from "../../components/label_input/labelInput.component";
import { Styles } from "../../screens/account_verification/accountVerification.style";

import ImagePicker from 'react-native-image-crop-picker';
import { prepareMedia, uploadImageApi } from "../../utils";
import RNFetchBlob from "rn-fetch-blob";
import { uploadIdentityImageApi } from "../../api/profile.api";


import colors from '../../colors';

import { AppContext } from '../../../AppProvider';
import { urls, Request, GetRequest, errorMessage } from '../../utils'

class UploadIdentityComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedId: "", identityNumber: '', imageOriginal: null, imageFile: undefined, isCaptured: false, formErrors: []};
  }
  renderError = () => {
    const { formErrors } = this.state
    if(formErrors.length !== 0) {
      return (<Error errors={formErrors} />)
    }
  }
  onSave = () => {
    const { imageOriginal } = this.state;
    this.setState({ formErrors: []})
    if (!this.state.isCaptured) {
        this.setState({ formErrors: ['Please select a file']})
        return;
    }
    if (!this.state.identityNumber) {
      this.setState({ formErrors: ['Please enter ID Number.']})
      return;
    }
    
    if(imageOriginal.uri && !imageOriginal.mime) {
        this.setState({ formErrors: ['Please change photo or re-upload same image to update']})
        return;
    } 
    this.props.loading(true)
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
            uploadIdentityImageApi({
                "identityTypeId": this.state.selectedId,
                "identityNumber": this.state.identityNumber,
                "imageName": this.state.imageFile.name,
            })
            .then((res) => {
                if(res.isError || res.IsError) {
                this.setState({ formErrors: [res.message]})
                } else {
                    //   this.props.onDecline(true)
                    this.props.navigation.navigate('TourStack', { screen: 'TourSuccess' })
                }
            })
            .finally(() => {
                this.props.loading(false)
            })
        } else {
            this.setState({ formErrors: [result.message]})
            this.props.loading(false)
        }
    });
  }
  selectImage = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 600,
            cropping: true,
            writeTempFile: true,
            includeBase64: true,
            
        }).then(image => {
            //   console.log("image", image)
            const source = {uri: image.path, width: image.width, height: image.height, mime: image.mime};
            this.setState({
                imageOriginal: {...source},
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

    pickID = (id) => {
        console.log(id)
        this.setState({ selectedId: id })
    }

    componentDidMount = () => {
        const { idTypes, identityInfo } = this.props
        if(idTypes.length > 0) {
            this.setState({ selectedId: idTypes[0].id })
        }
        if(identityInfo) {
            this.setState({ identityNumber: identityInfo.identityNumber, isCaptured: true, 
                imageOriginal: {uri: identityInfo.assetPath, mime: '' }, selectedId: identityInfo.identityTypeId })
        }
    }

  render() {
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, flexRow,
        textGreen, textBold, textExtraBold, textH3Style, textGrey, textOrange } = GStyles;
      const { modalContainer, inputContainer, lineStyle, headerStyle,
        buttonContainer, closeStyle } = styles
    const { edit } = this.props
    return (
      <View>
        <View style={modalContainer}>
          
          <KeyboardAvoidingView style={[flexRow, headerStyle]} behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <MyText style={[textH3Style, textExtraBold, textDarkGrey, textCenter]}>
                  {edit ? `Edit your document` : 'Choose Your Means Of Identification'}
              </MyText>
              {edit ? <TouchableOpacity onPress={() => {this.props.changeEdit()}}>
                <Icon name="close" />
              </TouchableOpacity> : <></>}
          </KeyboardAvoidingView>
          
          <ScrollView>
            <View style={{ flex: 1, paddingVertical: 30}}>
                <View style={{ flex: 1 }}>
                  <LabelInput label={"Choose ID Type To Add"} picker labelStyle={[textGrey]}
                      pickerOptions={this.props.idTypes.map(type => {
                          return {
                              label: type.name,
                              value: type.id,
                          }
                      })}
                      selectedOption={this.state.selectedId || (this.props.idTypes.length > 0 ? this.props.idTypes[0] : "")}
                      onPickerChange={this.pickID}
                  />
                  <View style={{ marginTop: 20}}>
                    <LabelInput labelStyle={[textGrey]} label={"Enter Id Number"} value={this.state.identityNumber}
                    onChangeText={(e) => this.setState({identityNumber: e})} />
                  </View>
                </View>
                
                <View style={{ flex: 1, marginTop: 30, marginBottom: 30}}>
                  <View style={[Styles.imageView, Styles.centerItems, (this.state.isCaptured && {backgroundColor: "transparent"})]}>
                      {
                          !this.state.isCaptured ?
                              <> 
                                  <Icon name={"md-image"} style={[Styles.galleryIcon]} />
                                  <TouchableOpacity onPress={() => this.selectImage()}>
                                      <MyText style={[textUnderline, textOrange, textH4Style]}>Tap to Upload Picture of ID</MyText>
                                  </TouchableOpacity>
                              </>   
                          :
                              <Image source={this.state.imageOriginal} style={[Styles.imageView]} />
                      }
                      
                  </View>
                  {
                      this.state.isCaptured && 
                      <TouchableOpacity onPress={() => this.selectImage()} >
                          <MyText style={[textUnderline, textOrange, textCenter, textBold, textH4Style]}>Change Picture</MyText>
                      </TouchableOpacity>
                  }
                </View>

                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                  {this.renderError()}
                  <CustomButton buttonText="Send Document" buttonStyle={{ elevation: 3}} onPress={this.onSave} />
                </View>
            </View>
          </ScrollView>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: {
        justifyContent: 'space-between'
    }
});

export default UploadIdentityComponent;
