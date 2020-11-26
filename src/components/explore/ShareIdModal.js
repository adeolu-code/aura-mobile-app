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

import colors from "../../colors";
import { MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Styles } from "../../screens/account_verification/accountVerification.style";

import ImagePicker from 'react-native-image-crop-picker';
import { prepareMedia, uploadImageApi } from "../../utils";
import RNFetchBlob from "rn-fetch-blob";
import { uploadIdentityImageApi } from "../../api/profile.api";

import { Container, Content, Footer, Button, Icon, Toast } from "native-base";
import { LabelInput } from "../label_input/labelInput.component";

import { setContext, Request, urls, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';


class ShareIdModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    // this.state = { formErrors: [], loading: false };
    this.state = {
      isCaptured: false, selectedId: props.route.params.selectedId, imageFile: undefined, loading: false,  formErrors: [], 
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

  onShareId = async () => {
    // this.props.onDecline()
    // this.props.navigation.navigate('HostPropertyStack', { screen: 'ConfirmAndPay'})
    this.setState({loading: true});
    const { booked, house } = this.props
    const obj = { bookingId: booked.id}
    const res = await Request(urls.bookingBase,  `${urls.v}bookings/property/shareid`, obj);
    this.setState({loading: false });
    console.log('Share id ', res)
    if(res.isError) {
        const message = res.Message;
        this.setState({ formErrors: [message]})
    } else {
        this.props.onDecline()
        const data = res.data;
        this.props.navigation.navigate('HostPropertyStack', { screen: 'ConfirmAndPay', params: { house, bookedId: booked.id }})
    }
    
  }
  
  

  render() {
    const { visible, onDecline, house } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, flexRow,
      textGreen, textBold, textExtraBold, textH3Style, textGrey, textOrange } = GStyles;
    const { modalHeader, closeContainer, logoContainer, modalContainer, inputContainer, lineStyle, headerStyle,
      buttonContainer, closeStyle, imgContainer, hostContainer } = styles
    const imgUrl = house && house.hostPicture ? { uri: house.hostPicture } : require('../../assets/images/profile.png')
    return (
          
      <Modal visible={visible} onRequestClose={() => {}} animationType="slide">
        <View style={modalContainer}>
          {this.renderLoading()}
          <View style={[flexRow, modalHeader]}>
              <View style={{ flex: 4, alignItems: 'center', paddingLeft: 20}}>
                  <View style={lineStyle}></View>
              </View>
              <TouchableOpacity style={closeStyle} onPress={onDecline}>
                  <Icon type="Feather" name="x" />
              </TouchableOpacity>
          </View>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <View style={[flexRow, hostContainer]}>
              <View style={imgContainer}>
                <Image source={imgUrl} resizeMode="cover" style={imgStyle} />
              </View>
              <MyText style={[textBold, textH3Style]}>{house ? house.hostName : '****'}</MyText>
            </View>
            <View style={headerStyle}>
                <MyText style={[textH4Style, textBold, textDarkGrey, textCenter]}>
                  This Host is requesting that we share your Id with them
                </MyText>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 50}}>
                {this.renderError()}
                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                  <CustomButton buttonText="View Settings" textStyle={{ color: colors.orange}}
                  buttonStyle={{ elevation: 3, backgroundColor: colors.white,borderWidth: 1, borderColor: colors.orange, marginBottom: 20}} />
                  <CustomButton buttonText="Share My ID" buttonStyle={{ elevation: 3}}
                  onPress={() => this.onShareId()} />
                </View>
          </View>

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
      paddingBottom: 10, paddingHorizontal: 20
  },
  lineStyle: {
      width: '20%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
  },
  closeStyle: {
      height: 30, flex: 1, justifyContent:'flex-end',alignItems: 'flex-end'
  },
  imgContainer: {
    height: 60, width: 60, borderRadius: 60, overflow: 'hidden', marginRight: 20,
  },
  hostContainer: {
    marginVertical:50, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center'
  }
});

export default ShareIdModal;
