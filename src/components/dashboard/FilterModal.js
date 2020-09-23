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


class FilterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    closeFilterModal = () => {
        this.props.onDecline();
       }
    //   openSignUpModal = () => {
    //     this.setState({ showRegisterModal: true })
    //   }
    //   closeSignUpModal = () => {
    //     this.setState({ showRegisterModal: false })
    //   }
    //   linkToLogin = () => {
    //     this.props.openLogin();
    //     setTimeout(() => {
    //       this.props.onDecline();
    //     }, 300);
    //   }
    //   linkToSignUp = () => {
    //     this.props.onDecline();
    //     this.props.navigation.navigate('Auth')
    //   }

    render() {
        const { visible, onDecline, title, img } = this.props;
        const { textWhite, textH5Style, textH4Style, textCenter, textDarkGrey, textUnderline,
            textGreen, textBold, textDanger, textDarkBlue } = GStyles;
        const { container, dash, tabOne, tabTwo, tabThree, tabFour,  imgStyle, container2 } = styles
        return (

            <Modal visible={visible} onRequestClose={() => { }} animationType="slide">
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
                            <TouchableOpacity style={tabTwo}>
                                <MyText style={[textDarkBlue, textBold]}>
                                    Edit Property
                            </MyText>
                            </TouchableOpacity>
                            <View style={[dash]}>
                            </View>
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
        backgroundColor: '#0000004D', 
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
        height: 60,
    },
    tabThree: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    },
    tabFour: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
    }
});

export default FilterModal;
