import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MyText, Loading, CustomButton } from '../../utils/Index';
import colors from '../../colors';
import Header from '../../components/Header';
import SelectImageModal from '../../components/SelectImageModal';

import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from 'native-base';

import GStyles from '../../assets/styles/GeneralStyles';
import PhotoComponent from '../../components/photograph/PhotoComponent';
import PhotographTipsModal from '../../components/PhotographTipsModal';


import { AppContext } from '../../../AppProvider';
import { urls, GetRequest, errorMessage, uploadMultipleFile, uploadFile, Request } from '../../utils';

import { formatAmount } from '../../helpers'

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [], selectModal: false, loading: false, profile: '', portfolio: [], tipModal: false };
    this.state.profile = props.route.params?.profile
  }

  removeImg = (index) => {
      const { images } = this.state
      const arrImgs = images
      arrImgs.splice(index, 1)
      this.setState({ images: arrImgs })
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />); }
  }
  openTipModal = () => {
    this.setState({ tipModal: true })
  }
  closeTipModal = () => {
    this.setState({ tipModal: false })
  }

  renderImages = () => {
      const { images } = this.state
      return images.map((item, index) => {
          return (
              <View style={[styles.miniSelectedImageView]} key={index}>
                  <Image style={[styles.miniSelectedImage]} source={{ uri: item.path }} resizeMode="cover" />
                  <TouchableOpacity style={{ position: "absolute", alignSelf: "flex-end", right: 15, bottom: 10 }} onPress={this.removeImg.bind(this, index)}>
                      <Icon name={"trash-sharp"} style={[styles.trashIcon]} />
                  </TouchableOpacity>
              </View>
          )
      })
  }
  openSelectModal = () => {
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
          freeStyleCropEnabled: true,
          compressImageQuality: 0.8,
          cropping: true,
          multiple: true
      }).then((imgs) => {
          const arr = [...images, ...imgs]
          this.setState({ images: arr })
          console.log(arr)
      }).catch(error => {
          console.log("Error from camera ", error);
      }).finally(() => {
          this.closeSelectModal()
      })
  }

  renderUpload = () => {
    const { images } = this.state;
    if(images.length !== 0) {
      return (
        <View style={{marginTop: 15}}>
          <CustomButton buttonText="Upload Images" buttonStyle={{ elevation: 2}} onPress={this.submit} />
        </View>
      )
    }
  }

  getPortfolio = async () => {
    try {
      this.setState({ loading: true })
      const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/photo/portfolio/${this.state.profile.id}`)
      console.log('res photo ', res)
      this.setState({ loading: false })
      if(res.isError || res.IsError) {
        errorMessage(res.message)
      } else {
        this.setState({ portfolio: res.data })
      }
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  setLoading = (bool) => {
    this.setState({ loading: bool })
  }
  refresh = () => {
    this.getPortfolio()
  }

  renderPortfolio = () => {
    const { portfolio, profile } = this.state
    if(portfolio.length !== 0 ) {
      return portfolio.map((item, index) => {
        const key = `PIC_${index}`
        return (
          <PhotoComponent key={key} photo={item} loading={this.setLoading} refresh={this.refresh} />
        )
      })
      
    }
  }

  submit = () => {
      this.setState({ loading: true })
      const { images } = this.state
      uploadMultipleFile(images)
      .then((res) => {
          if(!res.isError) {
            console.log('Upload ', res.data)
              const data = res.data;
              // const urls = data.map(item => item.displayUrl)
              const urls = data.map(item => item.fileName)
              this.updateOtherImages(urls)
          } else {
              errorMessage('Failed to upload images, try again else contact support')
              this.setState({ loading: false })
          }
      })
  }
  updateOtherImages = async (imageUrls) => {
    const { profile } = this.state
    const obj = {
      photographerProfileId: profile.id, description: "", photos: imageUrls
    }
    const res = await Request(urls.photographyBase, `${urls.v}photographer/photo/portfolio/multiple`, obj )
    console.log('photo ', res)
    if(res.isError || res.IsError) {
      errorMessage(res.message)
      this.setState({ loading: false})
    } else {
      this.getPortfolio()
      this.setState({ images: []})
    }
  }

  componentDidMount = () => {
    this.getPortfolio()
  }

  render() {
    const { contentContainer, picContainer, picsContainer, picTextContainer, radioContainer, activeRadio } = styles
    const { textSuccess, textH4Style, textBold, textUnderline, imgStyle, flexRow, textGrey, textOrange } = GStyles
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        {this.renderLoading()}
        <Header {...this.props} title="Portfolio" wrapperStyles={{ paddingBottom: 5, position: 'relative'}} sub="Upload your own pictures" />
        <ScrollView>
          <View style={contentContainer}>
            <TouchableOpacity onPress={this.openTipModal}>
              <MyText style={[textH4Style, textSuccess, textUnderline, textBold]}>Photograph Tips</MyText>
            </TouchableOpacity>

            
              <View style={[styles.picturesRowView]}>
                  <TouchableOpacity style={[ 
                      {backgroundColor: colors.lightOrange, justifyContent: 'center', alignItems: 'center',
                      width: '48%', borderRadius: 10, height: 200, marginTop: 5, elevation: 2 }]}
                      onPress={this.openSelectModal.bind(this, false)}>
                      <Icon name={"add-circle-sharp"} style={[styles.miniGalleryIcon]} />
                      <View>
                          <MyText style={[textUnderline, textOrange]}>Add Photo</MyText>
                      </View>
                  </TouchableOpacity>
                  {this.renderImages()}
              </View>

              {this.renderUpload()}
              
              <View style={[flexRow, picsContainer]}>
                  {this.renderPortfolio()}
                
              </View>
          </View>
        </ScrollView>
        <SelectImageModal visible={this.state.selectModal} onDecline={this.closeSelectModal} onPressCamera={this.cameraSelected} onPressGallery={this.gallerySelected} />
        <PhotographTipsModal visible={this.state.tipModal} onDecline={this.closeTipModal} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20, 
    // paddingTop: 150, 
    paddingTop: 10,
    borderBottomColor: colors.lightGrey, borderBottomWidth: 4, paddingBottom: 20
  },
  picTextContainer: {
    width: '48%', 
  },
  picContainer: {
    width: '100%', height: 200, borderRadius: 10, elevation: 3, marginBottom: 12, backgroundColor: colors.white,
    ...GStyles.shadow,
  },
  picsContainer: {
    justifyContent: 'space-between', marginVertical: 20, flexWrap: 'wrap'
  },
  
  picturesRowView: {
      flexDirection: "row", justifyContent: 'space-between', width: '100%',  marginTop:20,
      // borderWidth: 1,
      flexWrap: "wrap", 
  },
  
  miniSelectedImageView: {
      width: '48%', height: 200, marginBottom: 15
  },
  miniSelectedImage: {
      width: '100%', height: '100%',
      borderRadius: 10,
      marginTop: 5,
  },
  trashIcon: {
      backgroundColor: colors.white, width: 30,
      height: 30, borderRadius: 50, color: colors.black,
      padding: 5, fontSize: 20, 
  },
  miniGalleryIcon: {
      color: colors.orange,
      fontSize: 40,
  },
});

export default Portfolio;
