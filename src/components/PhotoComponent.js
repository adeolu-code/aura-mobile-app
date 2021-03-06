
import React, { Component } from "react"
import { TouchableOpacity, View, Image, StyleSheet, Alert } from "react-native";
import { AppContext } from "../../AppProvider";
import colors from '../colors';
import { MyText } from "../utils/Index";
import GStyles from "../assets/styles/GeneralStyles";
import { urls, GetRequest, errorMessage, Request, successMessage, EXPIRED_TOKEN } from '../utils';
import { Icon } from 'native-base'



class PhotoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  makeCoverImage = async () => {
    const { photo, loading, refresh, type, id } = this.props
    const obj = {
        photoId: photo.id,
    };
    loading(true)
    try {
        let res;
        if(type === 'tour') {
            obj.experienceId = id
            res = await Request(urls.experienceBase,`${urls.v}experience/photo/cover`, obj )
        } else {
            obj.propertyId = id
            res = await Request(urls.listingBase, `${urls.v}listing/photo/coverphoto/update`, obj )
        }
        if(res.isError || res.IsError) {
            if(res.message === EXPIRED_TOKEN) {
                errorMessage(EXPIRED_MESSAGE)
            } else {
                errorMessage(res.message)
            }
            loading(false)
        } else {
            refresh()
        } 
    } catch (error) {
        loading(false)
    }
    
  }

  removeImg = async () => {
    Alert.alert(
        "Delete Image",
        "Are you sure, you want to delete this image",
        [
          
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => this.delete() }
        ],
        { cancelable: false }
    );
  }
  delete = async () => {
    const { photo, loading, refresh, type } = this.props
    loading(true)
    let res;
    try {
        if(type === 'tour') {
            res = await Request(urls.experienceBase, `${urls.v}experience/photo/delete?photoId=${photo.id}`, null, false, 'DELETE');
        } else {
            res = await Request(urls.listingBase, `${urls.v}listing/photo?photoId=${photo.id}`, null, false, 'DELETE' )
        }
        console.log('Res ', res)
        if(res.isError || res.IsError) {
            errorMessage(res.message)
            loading(false)
        } else {
            refresh()
            successMessage('Photo Deleted')
        }
    } catch (error) {
        console.log(error)
        loading(false)
    }
    
  }

  render() {
    const { contentContainer, picContainer, picsContainer, picTextContainer, radioContainer, activeRadio } = styles
    const { textSuccess, textH4Style, textBold, textUnderline, imgStyle, flexRow, textGrey } = GStyles
    const { photo } = this.props
    const imgUrl = photo && photo.assetPath ? { uri: photo.assetPath } : require('../assets/images/no_photo.png')
    const active = photo.isMain ? true : false
    return (
        
        <View style={picTextContainer}>
            <View style={picContainer}>
                <Image source={imgUrl} resizeMode="cover" style={[imgStyle, { borderRadius: 10}]} />
                <TouchableOpacity style={{ position: "absolute", alignSelf: "flex-end", right: 15, bottom: 10 }} onPress={this.removeImg}>
                    <Icon name={"trash-sharp"} style={[styles.trashIcon]} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[flexRow, { alignItems: 'center', justifyContent: 'center'}]} onPress={this.makeCoverImage}>
                <View style={radioContainer}>
                    <View style={[photo.isMain ? activeRadio : '']}></View>
                </View>
                <MyText style={[textH4Style, textGrey]}>Make Cover Image</MyText>
            </TouchableOpacity>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    
    picTextContainer: {
        width: '48%', marginBottom: 15
    },
    picContainer: {
        width: '100%', height: 200, borderRadius: 10, elevation: 3, marginBottom: 12, backgroundColor: colors.white
    },
    picsContainer: {
        justifyContent: 'space-between', marginVertical: 20
    },
    radioContainer: {
        borderRadius: 16, width: 16, height: 16, borderWidth: 1, borderColor: colors.success, justifyContent: 'center', alignItems: 'center', 
        marginRight: 8
    },
    activeRadio: {
        width: 10, height: 10, backgroundColor: colors.success, borderRadius: 10
    },
    trashIcon: {
        backgroundColor: colors.white, width: 30,
        height: 30, borderRadius: 50, color: colors.black,
        padding: 5, fontSize: 20, 
    },
});

export default PhotoComponent;
