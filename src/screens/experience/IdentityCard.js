import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';
import ProgressBar from '../../components/ProgressBar'
import UploadIdentity from '../../components/experience/UploadIdentityComponent';

import { getIdentityTypesApi } from "../../api/users.api";

class IdentityCard extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, identityInfo: '', idTypes: [], identity: false };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
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
            errorMessage('Something went wrong, try again, if error persists contact support')
            this.setState({ loading: false })
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
        errorMessage(message)
    } else {
        const data = res.data;
        const idType = types.find((item) => item.id === data.identityTypeId)
        this.setState({ identityInfo: {...data, idTypeName: idType.name } })
    }
  }
  
  
  next = () => {
    this.props.navigation.navigate('TourStack', { screen: 'TourSuccess' })
  }
  
  renderIdentityInfo = () => {
    const { identityInfo } = this.state
    const { textH4Style, textBold, imgStyle } = GStyles
    const { imgInfoContainer } = styles
    if(identityInfo) {
      return (
        <View style={{ flex: 1, paddingBottom: 30}}>
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


  componentDidMount = () => {
    const { userData } = this.context.state
    if(userData.identificationDocument) {
    //   this.openSharedIdModal()
        this.getIdTypes()
    } else {
        this.setState({ identity: false })
    //   this.openIdentityModal()
    }
  }

  renderUploadIdentity = () => {
      const { identity, loading } = this.state;
      if(identity && !loading) {
        return (
            <UploadIdentity {...this.props} idTypes={this.state.idTypes} /> 
        )
      }
  }

  renderButton = () => {
      const { identity, loading } = this.state;
      if(!identity && !loading) {
          return (
            <View style={styles.button}>
                <CustomButton buttonText="Proceed" buttonStyle={{ elevation: 2}} onPress={this.next}  />
            </View>
          )
      }
  }
  

  render() {
    const { container, button, imageContainer, textContainer, policyContainer, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Verify Document" />
            <View style={container}>
                <View style={{ marginTop: 30}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 6 / 6</MyText>
                    <ProgressBar width={100} />
                    <ProgressBar width={12.5 * 8} />
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginTop: 30 }}>
                        {this.renderUploadIdentity()}
                        <View>
                            {this.renderIdentityInfo()}
                        </View>


                        
                    </View>
                    {this.renderButton()}
                
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 20, marginTop: 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, marginTop: 50, justifyContent: 'flex-end', marginTop: 60
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    },
    
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey, alignSelf: 'flex-start', marginTop: 8
    },
    policyContainer: {
        paddingVertical: 15, backgroundColor: colors.white, borderRadius: 6, elevation: 2, marginTop: 20
    },
    imgInfoContainer: {
        width: '100%', borderRadius: 10, overflow:'hidden', marginTop: 20,
        borderWidth: 1, borderColor: colors.orange
    }

});

export default IdentityCard;
