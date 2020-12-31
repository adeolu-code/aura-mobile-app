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
import { MyText, CustomButton, Loading, Error } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider'

import { urls, Request, GetRequest, successMessage } from '../../utils'

class TourActionModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = { loading: false, errors: [] };
    }
    closeFilterModal = () => {
        this.props.onDecline();
    }
    // renderError = () => {
    //     const { formErrors } = this.state
    //     if(formErrors.length !== 0) {
    //       return (<Error errors={formErrors} />)
    //     }
    //   }

    renderError = () => {
        const { errors } = this.state;
        if(errors.length !== 0) {
            return (
                <Error errors={errors} />
            )
        }
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    viewPhotos = () => {
        const { tour, navigation, onDecline } = this.props
        const { state, set } = this.context;
        onDecline()
        navigation.navigate('Photos', { id: tour.id, type: 'tour', title: tour.title } )
    }
    onEdit = () => {
        const { tour, navigation, onDecline } = this.props
        const { state, set } = this.context;
        // this.checkStep()
        set({ tourOnboard: tour, editTour: true })
        onDecline()
        navigation.navigate('TourStack', { screen: 'TourLocation'})
    }
    checkStep = () => {
        const { tour } = this.props;
        const { state, set } = this.context;
        if(tour.pricePerNight) {
            set({ step: 4})
        } else if(tour.mainImage && tour.title && (tour.longitude || tour.latitude) && !tour.pricePerNight) {
            set({ step: 3})
        } else if ((tour.longitude || tour.latitude) && (!tour.mainImage || !tour.title)) {
            set({ step: 2})
        }
    }

    onDelete = () => {
        const { tour, onDecline } = this.props 
        console.log(this.props)
        Alert.alert(
            "Delete tour",
            "Are you sure, you want to delete this tour",
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
        const { tour, onDecline, deleteTour } = this.props
        this.setState({ loading: true })
        Request(urls.experienceBase, `${urls.v}experience?id=${tour.id}`, null, false, "DELETE")
        .then((res) => {
            console.log('Res ', res)
            deleteTour(tour.id)
            onDecline()
            setTimeout(() => {
                successMessage('Property was deleted successfully !!')
            }, 10);
        })
        .finally(() => {
            this.setState({ loading: false })
        })
    }
    

    publishTour = async () => {
        const { tour, onDecline } = this.props
        this.setState({ loading: true })
        const res = await Request(urls.experienceBase, `${urls.v}experience/publish?id=${tour.id}`)
        console.log(res)
        this.setState({ loading: false })
        if(res.isError || res.IsError) {
            const message = res.message || res.Message
            this.setState({ errors: [message]})
        } else {
            onDecline()
            setTimeout(() => {
                successMessage('Tour has been sent to admin for review')
            }, 10);
        }
    }
    changeActiveState = (properties, isActive) => {
        const { tour } = this.props
        const elementsIndex = properties.findIndex(element => element.id == tour.id )
        let newArray = [...properties]
        newArray[elementsIndex] = { ...tour, isActive }
        return newArray
    }

    renderPublish = () => {
        const { tour } = this.props;
        const { tabThree, activeStyle, bgGreen, bgDanger } = styles
        const { textDarkBlue, textBold, flexRow, textOrange } = GStyles
        if(tour) {
            if(tour.statusName.toLowerCase() === 'saved') {
                return (
                    <TouchableOpacity style={tabThree} onPress={this.publishTour.bind(this, true)}>
                        <View style={[flexRow, { alignItems: 'center'}]}>
                            <View style={[activeStyle, {backgroundColor: colors.orange} ]}></View>
                            <MyText style={[textOrange, textBold]}>
                                Publish Tour
                            </MyText>
                        </View>
                    </TouchableOpacity>
                )
            } 
        }
    }
    onDecline = () => {
        this.setState({ errors: []})
        this.props.onDecline()
    }

    render() {
        const { visible, title, img } = this.props;
        const { textDarkGrey, textBold, textDanger, textDarkBlue } = GStyles;
        const { container, dash, tabOne, tabTwo, tabThree, tabFour,  imgStyle, container2 } = styles;
        return (

            <Modal visible={visible} onRequestClose={() => { }} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={this.onDecline}>
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
                                    {this.renderError()}
                                </View>
                                <TouchableOpacity style={tabTwo} onPress={this.viewPhotos}>
                                    <MyText style={[textDarkBlue, textBold]}>
                                        View/Edit Photos
                                    </MyText>
                                </TouchableOpacity>
                                <View style={[dash]}></View>
                                <TouchableOpacity style={tabTwo} onPress={this.onEdit}>
                                    <MyText style={[textDarkBlue, textBold]}>
                                            Edit Tour
                                    </MyText>
                                </TouchableOpacity>
                                <View style={[dash]}></View>
                                {this.renderPublish()}
                                <View style={[dash]}></View>
                                <TouchableOpacity style={tabFour} onPress={this.onDelete}>
                                    <MyText style={[textDanger, textBold]}>
                                        Delete Tour
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
        height: 1, width: '100%',
        backgroundColor: colors.lightGrey,
    },
    tabOne: {
        backgroundColor: '#EEF1F8', paddingVertical: 20,
        // minHeight: 150,
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

export default TourActionModal;
