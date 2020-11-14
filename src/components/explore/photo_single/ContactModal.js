import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, ScrollView, Linking, Platform } from 'react-native';
import { Icon } from 'native-base';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, CustomButton } from '../../../utils/Index';
import LocationComponent from '../LocationComponent';

import { GOOGLE_API_KEY, GetRequest } from '../../../utils'




class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, location: '' };
  }
    renderVerified = () => {
        const { photo } = this.props;
        if(photo && photo.isVerified) {
            return (
                <View style={{ position: 'absolute', right: 0, top: -5}}>
                    <View style={styles.iconVerifiedContainer}>
                        <Icon name="check" type="FontAwesome5" style={styles.verifiedStyle} />
                    </View>
                </View>
            )
        }
    }
    getGeolocation = async () => {
        const { photo } = this.props
        this.setState({ loading: true })
        const res = await GetRequest('https://maps.googleapis.com/maps/', `api/geocode/json?address=${photo.address.street}&key=${GOOGLE_API_KEY}`)
        this.setState({ loading: false })
        this.setLocation(res.results[0])
    }

    setLocation = (result) => {
        const geometry = result.geometry
        const latitude = geometry.location.lat
        const longitude = geometry.location.lng
        this.setState({ location: { latitude, longitude }})
    }

    componentDidMount = () => {
        this.getGeolocation()
    }
    call = () => {
        const { photo } = this.props
        const number = photo.phoneNumber
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        } else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    }
    message = () => {
        const { photo } = this.props
        const number = photo.phoneNumber
        const phoneNumber = `sms:${number}`;
        Linking.openURL(phoneNumber);
    }

  render() {
    const { visible, onDecline, photo } = this.props;
    const { modalContainer, container, modalHeader, closeStyle,headerStyle, profileContainer, profileStyles, 
        imgTextContainer, imgContainer, infoContainer, imgContainer1,  
        thumbStyle, divider, locationContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textGrey, textH3Style, textSuccess, textLgStyle, imgStyle, textBold } = GStyles
    const fullName = photo ? `${photo.firstName} ${photo.lastName}` : '****';
    const imgUrl = photo && photo.coverPhoto ? {uri: photo.coverPhoto} : require('../../../assets/images/profile.png');
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
            
            <View style={container}>  
                <View style={modalContainer}>
                    <View style={[modalHeader]}>
                        <TouchableOpacity style={closeStyle} onPress={onDecline}>
                            <Icon type="Feather" name="x" />
                        </TouchableOpacity>
                        <MyText style={[textH2Style, textExtraBold, textDarkGrey, textCenter]}>
                            Contact Information
                        </MyText>
                        
                    </View>
                    <ScrollView>
                        <View style={[profileContainer]}>
                            <View style={profileStyles}>
                                <View style={imgContainer}>
                                    <Image source={imgUrl} style={thumbStyle} resizeMode="cover" />
                                    {this.renderVerified()}
                                </View>
                                <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>{fullName}</MyText>
                                <View style={[flexRow, infoContainer]}>
                                    <TouchableOpacity style={imgTextContainer} onPress={this.call}>
                                        <View style={imgContainer1}>
                                            <Image source={require('../../../assets/images/icons/phone.png')} resizeMode="contain"  />
                                        </View>
                                        <MyText style={[textH4Style, textSuccess, textBold]}>Phone Call</MyText>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={imgTextContainer} onPress={this.message}>
                                        <View style={imgContainer1}>
                                            <Image source={require('../../../assets/images/icons/envelope.png')} resizeMode="contain" />
                                        </View>
                                        <MyText style={[textH4Style, textSuccess, textBold]}>Message</MyText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={divider}></View>
                        <View style={locationContainer}>
                            {photo ? <LocationComponent noDivider wrapper={{paddingHorizontal: 0}} 
                            address={photo ? photo.address.street : '***'} location={this.state.location ? this.state.location : false} /> : <></>}
                        </View>
                    </ScrollView>

                </View>
            </View>
                
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end', width: '100%', flex: 1, paddingTop: 60, backgroundColor: 'rgba(79, 79, 79,0.3)'
    },
    
    modalContainer: {
        backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 5,
        paddingHorizontal: 20, marginTop: 80
    },
    modalHeader: {
        paddingTop: 20,width: '100%',
        paddingBottom: 10
        // paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 80
    },
    closeStyle: {
        height: 30, justifyContent:'flex-end',alignItems: 'flex-end', 
        // borderWidth: 1
    },
    profileContainer: {
        marginBottom: 30, marginTop: 50
    },
    profileStyles: {
        justifyContent: 'center', width: '100%', display: 'flex', alignItems: 'center'
    },
    imgContainer: {
        width:60, height: 60, marginBottom: 15,
        // borderRadius: 60, overflow:'hidden', 
    },
    thumbStyle: {
        width: 60, height: 60, borderRadius: 60,
    },
    infoContainer: {
        marginTop: 25
    },
    imgTextContainer: {
        justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15
    },
    imgContainer1: {
        backgroundColor: colors.success, borderRadius: 40, height: 35, width: 35,
        justifyContent:'center', alignItems: 'center', marginBottom: 5, elevation: 3
    },
    iconVerifiedContainer: {
        width: 25, height: 25, borderWidth:2, borderColor: colors.white, borderRadius: 20, backgroundColor: colors.orange,
        justifyContent: 'center', alignItems: 'center',
    },
    verifiedStyle: {
        fontSize: 12, color: colors.white
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.greyWhite,
    },
    locationContainer: {
        
    }
    
});

export default ContactModal;
