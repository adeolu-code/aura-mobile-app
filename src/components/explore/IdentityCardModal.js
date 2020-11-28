/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import ImagePicker from 'react-native-image-crop-picker';
import { prepareMedia, uploadImageApi } from "../../utils";
import RNFetchBlob from "rn-fetch-blob";
import { uploadIdentityImageApi } from "../../api/profile.api";

import colors from "../../colors";
import { MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Styles } from "../../screens/account_verification/accountVerification.style";

import { Container, Content, Footer, Button, Icon } from "native-base";
import { LabelInput } from "../../components/label_input/labelInput.component";

import { setContext, Request, urls } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { getIdentityTypesApi } from "../../api/users.api";




class IdentityCardModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    // this.state = { formErrors: [], loading: false };
    this.state = {
        idTypes: [],
        selectedId: "", identityNumber: '',imageFile: undefined, isCaptured: false, loading: false, formErrors: []
    };
  }
  
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  renderError = () => {
    const { formErrors } = this.state
    if(formErrors.length !== 0) {
      return (<Error errors={formErrors} />)
    }
  }

  next = () => {
    // this.props.navigation.navigate('UploadVerification', { selectedId: this.state.selectedId})
    this.props.openPhotoModal(obj);
    setTimeout(() => {
      this.props.onDecline();
    }, 300);
  }

  onSave = () => {
    if (!this.state.isCaptured) {
        this.setState({ formErrors: ['Please select a file']})
        return;
    }
    if (!this.state.identityNumber) {
      this.setState({ formErrors: ['Please enter ID Number.']})
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
              uploadIdentityImageApi({
                "identityTypeId": this.state.selectedId,
                "identityNumber": this.state.identityNumber,
                "imageName": this.state.imageFile.name,
              })
              .finally(() => {
                this.setState({loading: false });
              })
          } else {
            this.setState({ formErrors: [result.message], loading: false })
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

  getIdTypes = () => {
    getIdentityTypesApi().then(result => {
      console.log(result)
        if (result != undefined) {
            this.setState({idTypes: result, selectedId: result[0].id});
            this.context.set({idTypes: result})
        }
    });
  }
  componentDidMount = () => {
    this.getIdTypes()
  }
  

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, flexRow,
      textGreen, textBold, textExtraBold, textH3Style, textGrey, textOrange } = GStyles;
    const { modalHeader, closeContainer, logoContainer, modalContainer, inputContainer, lineStyle, headerStyle,
      buttonContainer, closeStyle } = styles
    return (
          
      <Modal visible={visible} onRequestClose={() => {}} animationType="slide">
        <View style={modalContainer}>
          {this.renderLoading()}
          <View style={[flexRow, modalHeader]}>
              <View style={{ flex: 6, alignItems: 'center'}}>
                  <View style={lineStyle}></View>
              </View>
              <TouchableOpacity style={closeStyle} onPress={onDecline}>
                  <Icon type="Feather" name="x" />
              </TouchableOpacity>
          </View>
          <View style={headerStyle}>
              <MyText style={[textH3Style, textExtraBold, textDarkGrey, textCenter]}>
              Choose Your Means Of Identification
              </MyText>
          </View>
          
          <ScrollView>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 30}}>
                <Content style={{ flex: 1 }}>
                  <LabelInput label={"Choose ID Type To Add"} picker labelStyle={[textGrey]}
                      pickerOptions={this.state.idTypes.map(type => {
                          return {
                              label: type.name,
                              value: type.id,
                          }
                      })}
                      selectedOption={this.state.selectedId || (this.state.idTypes.length > 0 ? this.state.idTypes[0] : "")}
                      onPickerChange={(e) => this.setState({selectedId: e})}
                  />
                  <View style={{ marginTop: 20}}>
                    <LabelInput labelStyle={[textGrey]} label={"Enter Id Number"} onChangeText={(e) => this.setState({identityNumber: e})} />
                  </View>
                </Content>
                
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
      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
      backgroundColor: colors.white, flex: 1
      // paddingHorizontal: 20
  },
  modalHeader: {
      marginTop: 30, marginBottom: 20, alignItems: 'center',
      paddingHorizontal: 20
  },
  buttonStyle: {
    borderWidth: 1, borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    elevation: 2,
    marginTop: 30,
  },
  headerStyle: {
      paddingBottom: 10
  },
  lineStyle: {
      width: '20%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
  },
  closeStyle: {
      height: 30, flex: 1, justifyContent:'flex-end',alignItems: 'flex-end'
  },
});

export default IdentityCardModal;
