/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback,
} from "react-native";
import colors from "../../colors";
import { MyText, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';
import { AppContext } from '../../../AppProvider'

class FilterModal extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {};
    }
    closeFilterModal = () => {
        this.props.onDecline();
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

    render() {
        const { visible, onDecline, title, img } = this.props;
        const { textDarkGrey, textBold, textDanger, textDarkBlue } = GStyles;
        const { container, dash, tabOne, tabTwo, tabThree, tabFour,  imgStyle, container2 } = styles;
        return (

            <Modal visible={visible} onRequestClose={() => { }} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={onDecline}>
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
                            <TouchableOpacity style={tabFour}>
                                <MyText style={[textDanger, textBold]}>
                                    Delete
                            </MyText>
                            </TouchableOpacity>
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
