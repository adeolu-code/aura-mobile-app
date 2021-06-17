/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity, Alert,
    Modal, TouchableWithoutFeedback, Pressable
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider'

import { urls, Request, successMessage, GetRequest } from '../../utils'

class FilterModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, gettingHouse: false };
    }
    closeFilterModal = () => {
        this.props.onDecline();
    }
    renderLoading = () => {
        const { loading, gettingHouse } = this.state;
        if(loading || gettingHouse) { return (<Loading />) }
    }
    viewPhotos = () => {
        const { property, navigation, onDecline } = this.props
        const { state, set } = this.context;
        onDecline()
        navigation.navigate('Photos', { id: property.id, type: 'property', title: property.title } )
    }
    onEdit = () => {
        const { property, navigation, onDecline } = this.props
        const { set } = this.context;
        this.checkStep()
        set({ propertyFormData: property })
        onDecline()
        navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
    }
    getProperty = async () => {
        const { property, navigation, onDecline } = this.props
        const { set } = this.context;
        try {
            this.setState({ gettingHouse: true })
            const res = await GetRequest(urls.listingBase, `${urls.v}listing/property/${property.id}`);
            console.log('House Details ', res, 'property ',property)
            this.setState({ gettingHouse: false })
            if(res.isError) {
                const message = res.Message;
            } else {
                const data = res.data;
                if(data !== null) {
                    // this.checkStep()
                    // set({ propertyFormData: property })
                    // onDecline()
                    // navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
                }
            }
        } catch (error) {
            this.setState({ gettingHouse: false })
        }
    }
    checkStep = () => {
        const { property } = this.props;
        const { state, set } = this.context;
        if(property.pricePerNight) {
            set({ step: 4})
        } else if(property.mainImage && property.title && (property.longitude || property.latitude) && !property.pricePerNight) {
            set({ step: 3})
        } else if ((property.longitude || property.latitude) && (!property.mainImage || !property.title)) {
            set({ step: 2})
        }
    }

    onDelete = () => {
        const { property, onDecline } = this.props 
        console.log(this.props)
        Alert.alert(
            "Delete property",
            "Are you sure, you want to delete this property",
            [
              {
                text: "Cancel",
                onPress: this.cancel,
                style: "cancel"
              },
              { text: "OK", onPress: this.accepted }
            ],
            { cancelable: false }
          );      
    }
    cancel = () => {

    }
    accepted = () => {
        const { property, onDecline, propertyContext } = this.props
        this.setState({ loading: true })
        Request(urls.listingBase, `${urls.v}listing/property?id=${property.id}`, null, false, "DELETE")
        .then((res) => {
            console.log('Res ', res)
            const properties = this.deletePpty(propertyContext.state.properties)
            // const propertyIndex = properties.findIndex(item => item.id === property.id)
            // properties.splice(propertyIndex, 1)
            propertyContext.set({ properties })
            if(property.propertyType.name === 'Apartment') {
                const apartments = this.deletePpty(propertyContext.state.apartments)
                propertyContext.set({ apartments })
            } else {
                const hotels = this.deletePpty(propertyContext.state.hotels)
                propertyContext.set({ hotels })
            }
            onDecline()
            setTimeout(() => {
                successMessage('Property was deleted successfully !!')
            }, 10);
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            this.setState({ loading: false })
        })
    }
    deletePpty = (properties) => {
        const { property } = this.props
        const propertyIndex = properties.findIndex(item => item.id === property.id)
        properties.splice(propertyIndex, 1)
        return properties
    }

    goOnline = (bool) => {
        const { property, onDecline, propertyContext } = this.props
        this.setState({ loading: true })
        const message = bool ? 'Property is now Online' : 'Property is now Offline' 
        Request(urls.listingBase, `${urls.v}listing/property/status/?id=${property.id}`,)
        .then((res) => {
            console.log('Res ', res)
            const properties = this.changeActiveState(propertyContext.state.properties, bool)
            propertyContext.set({ properties })
            if(property.propertyType.name === 'Apartment') {
                const apartments = this.changeActiveState(propertyContext.state.apartments, bool)
                propertyContext.set({ apartments })
            } else {
                const hotels = this.changeActiveState(propertyContext.state.hotels, bool)
                propertyContext.set({ hotels })
            }
            onDecline()
            setTimeout(() => {
                successMessage(message)
            }, 10);
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            this.setState({ loading: false })
        })
    }
    changeActiveState = (properties, isActive) => {
        const { property } = this.props
        const elementsIndex = properties.findIndex(element => element.id == property.id )
        let newArray = [...properties]
        newArray[elementsIndex] = { ...property, isActive }
        return newArray
    }

    renderOnlineOffline = () => {
        
        const { property } = this.props;
        
        const { tabThree, activeStyle, bgGreen, bgDanger } = styles
        const { textDarkBlue, textBold, flexRow } = GStyles
        if(property) {
            if(property.status.toLowerCase() === 'reviewed' && !property.isActive) {
                return (
                    <Pressable style={tabThree} onPress={this.goOnline.bind(this, true)}>
                        <View style={[flexRow, { alignItems: 'center'}]}>
                            <View style={[activeStyle, bgGreen ]}></View>
                            <MyText style={[textDarkBlue, textBold]}>
                                Go Online
                            </MyText>
                        </View>
                    </Pressable>
                )
            }
            if(property.status.toLowerCase() === 'reviewed' && property.isActive) { 
                return (
                    <Pressable style={tabThree} onPress={this.goOnline.bind(this, false)}>
                        <View style={[flexRow, { alignItems: 'center'}]}>
                            <View style={[activeStyle, bgDanger ]}></View>
                            <MyText style={[textDarkBlue, textBold]}>
                                Go Offline
                            </MyText>
                        </View>
                    </Pressable>
                )
            }
        }
    }

    render() {
        const { visible, onDecline, title, img } = this.props;
        const { textDarkGrey, textBold, textDanger, textDarkBlue, textCenter, textH4Style, textH5Style } = GStyles;
        const { container, dash, tabOne, tabTwo, tabThree, tabFour,  imgStyle, container2 } = styles;
        return (

            <Modal visible={visible} onRequestClose={() => { }} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={onDecline}>
                    <View>
                        {this.renderLoading()}
                        <View style={container2}>
                            <View style={container}>
                                <View style={tabOne}>
                                    <View style={imgStyle}>
                                        <Image source={img} style={{width: '100%', height: '100%'}} />
                                    </View>
                                    <View style={{marginTop: 20, paddingHorizontal:10}}>
                                        <MyText style={[textDarkGrey, textBold, textCenter, textH5Style]}>{title}</MyText>
                                    </View>
                                </View>
                                <Pressable style={tabTwo} onPress={this.viewPhotos}>
                                    <MyText style={[textDarkBlue, textBold, textH5Style]}>
                                        View/Edit Photos
                                    </MyText>
                                </Pressable>
                                <View style={[dash]}></View>
                                <Pressable style={tabTwo} onPress={this.onEdit}>
                                    <MyText style={[textDarkBlue, textBold, textH5Style]}>
                                        Edit Property
                                    </MyText>
                                </Pressable>
                                <View style={[dash]}></View>
                                {this.renderOnlineOffline()}
                                <View style={[dash]}></View>
                                <Pressable style={tabFour} onPress={this.onDelete}>
                                    <MyText style={[textDanger, textBold, textH5Style]}>
                                        Delete
                                    </MyText>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: 5, overflow: 'hidden',
        width: '95%',
    },
    container2: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        width: '100%', 
        height: '100%', 
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        borderRadius: 60,
        height: 60,
        width: 60,
        alignContent: 'center',
        overflow: "hidden",
    },
    dash: {
        height: 1, width: '100%',
        backgroundColor: colors.lightGrey,
    },
    tabOne: {
        backgroundColor: '#EEF1F8',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabTwo: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 74,
    },
    tabThree: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 74,
    },
    tabFour: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 74,
    },
    activeStyle: {
        height: 16, width: 16, marginRight: 10,
        borderRadius: 14, 
    },
    bgGreen: {
        backgroundColor: colors.success,
    },
    bgDanger: {
        backgroundColor: colors.secondary
    }
});

export default FilterModal;
