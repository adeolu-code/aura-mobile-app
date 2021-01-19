/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal, Platform
} from "react-native";

import colors from "../../colors";
import { MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Styles } from "../../screens/account_verification/accountVerification.style";

import { Container, Content, Footer, Button, Icon, Toast } from "native-base";
import { LabelInput } from "../label_input/labelInput.component";

import { setContext, Request, urls, GetRequest, successMessage } from '../../utils';
import { AppContext } from '../../../AppProvider';
import { getIdentityTypesApi } from "../../api/users.api";



class ShareIdModal extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    // this.state = { formErrors: [], loading: false };
    this.state = {
      isCaptured: false, selectedId: props.route.params.selectedId, imageFile: undefined, loading: false,  formErrors: [], 
      identityInfo: '', idTypes: []
    };
  }
  
  
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 1000 }} />) }
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
        successMessage('Your Id was shared successfully!!')
        this.props.navigation.navigate('HostPropertyStack', { screen: 'ConfirmAndPay', params: { house, bookedId: booked.id }})
    }
    
  }

  getIdTypes = () => {
    this.setState({ loading: true })
    getIdentityTypesApi().then(result => {
      console.log(result)
        if (result != undefined) {
            this.setState({idTypes: result});
            this.context.set({idTypes: result})
            this.getIdentityInfo(result)
        } else {
          this.setState({ formErrors: ['Something went wrong, try again, if error persists contact support'], loading: false })
        }
    });
  }

  getIdentityInfo = async (types) => {
    const { userData } = this.context.state
    const res = await GetRequest(urls.identityBase,  `${urls.v}user/identity/display/${userData.id}`);
    this.setState({loading: false });
    console.log('User identity', res)
    this.setState({ loading: false })
    if(res.isError) {
        const message = res.Message;
        this.setState({ formErrors: [message]})
    } else {
        const data = res.data;
        const idType = types.find((item) => item.id === data.identityTypeId)
        this.setState({ identityInfo: {...data, idTypeName: idType.name } })
    }
  }
  
  renderViewButton = () => {
    const { userData } = this.context.state
    const { identityInfo } = this.state
    if(userData && userData.identificationDocument) {
      if(!identityInfo) {
        return (
          <CustomButton buttonText="View Settings" textStyle={{ color: colors.orange}} onPress={this.getIdTypes}
                    buttonStyle={{ elevation: 3, backgroundColor: colors.white,borderWidth: 1, borderColor: colors.orange, marginBottom: 20}} />
        )
      }
      
    }
  }

  renderIdentityInfo = () => {
    const { identityInfo } = this.state
    const { textH4Style, textBold, imgStyle } = GStyles
    const { imgInfoContainer } = styles
    if(identityInfo) {
      return (
        <View style={{ flex: 1, paddingHorizontal: 20}}>
          <View>
            <MyText style={[textH4Style, { marginBottom: 10 }]}>Identity Type: <MyText style={[textBold]}>{identityInfo.idTypeName}</MyText></MyText>
            <MyText style={[textH4Style]}>Identity Number: <MyText style={[textBold]}>{identityInfo.identityNumber}</MyText></MyText>
          </View>
          <View style={imgInfoContainer}>
            <Image source={{ uri: identityInfo.assetPath }} resizeMode="cover" style={imgStyle} />
          </View>
        </View>
      )
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
          
          {this.renderIdentityInfo()}
          <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 50}}>
                {this.renderError()}
                <View style={{ flex: 1, justifyContent: 'flex-end'}}>
                  {this.renderViewButton()}
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
      marginTop: Platform.OS === 'ios' ? 50 : 30, marginBottom: 20, alignItems: 'center',
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
  },
  imgInfoContainer: {
    width: '100%', borderRadius: 10, overflow:'hidden', marginTop: 20,
    borderWidth: 1, borderColor: colors.orange
  }
});

export default ShareIdModal;
