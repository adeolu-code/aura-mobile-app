/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity, Alert,
    Modal, TouchableWithoutFeedback,
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton, Loading } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider'

import { urls, Request, GetRequest } from '../../utils'

class FilterModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }
    closeFilterModal = () => {
        this.props.onDecline();
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    onEdit = () => {
        const { property, navigation, onDecline } = this.props
        const { state, set } = this.context;
        this.checkStep()
        set({ propertyFormData: property })
        onDecline()
        navigation.navigate("HostPropertyStack", { screen: "HostSteps" })
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
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            this.setState({ loading: false })
        })
    }
    deletePpty = (properties) => {
        const { property } = this.state
        const propertyIndex = properties.findIndex(item => item.id === property.id)
        properties.splice(propertyIndex, 1)
        return properties
    }

    render() {
        const { visible, onDecline, title, img } = this.props;
        const { textDarkGrey, textBold, textDanger, textDarkBlue } = GStyles;
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
                                    <View style={{marginTop: 20}}>
                                    <MyText style={[textDarkGrey, textBold]}>{title}</MyText>
                                    </View>
                                </View>
                                <TouchableOpacity style={tabTwo} onPress={this.onEdit}>
                                    <MyText style={[textDarkBlue, textBold]}>
                                            Edit Property
                                    </MyText>
                                </TouchableOpacity>
                                <View style={[dash]}></View>
                                <TouchableOpacity style={tabThree}>
                                    <MyText style={[textDarkBlue, textBold]}>
                                            Go Offline
                                    </MyText>
                                </TouchableOpacity>
                                <View style={[dash]}></View>
                                <TouchableOpacity style={tabFour} onPress={this.onDelete}>
                                    <MyText style={[textDanger, textBold]}>
                                        Delete
                                </MyText>
                                </TouchableOpacity>
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
        height: 1,
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
    }
});

export default FilterModal;
