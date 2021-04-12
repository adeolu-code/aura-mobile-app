/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React, { Component } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback, ScrollView, Dimensions, Keyboard,
} from "react-native";
import colors from "../colors";
import { MyText, CustomButton, CustomInputNumber, Loading, Error } from "../utils/Index";
import GStyles from "../assets/styles/GeneralStyles";
import { Icon } from 'native-base';



class PhotographTipsModal extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, formErrors: [] };
    }
    openModal = () => {
        this.setState({ showModal: true })
    }
    closeModal = () => {
        this.setState({ showModal: false })
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading />) }
    }
    

    render() {
        const { visible, onDecline } = this.props;
        const { modalContainer, modalHeader, lineStyle, closeStyle, 
            headerStyle, container, } = styles;
        const { textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, 
        textH4Style, textBold, flexRow, imgStyle, textH3Style, textGrey, textWhite, textGreen, textUnderline, textOrange } = GStyles;

        return (

            <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
               
                <View style={modalContainer}>
                    
                        
                        <View style={container} >
                            <View style={[flexRow, modalHeader]}>
                                <View style={{ flex: 6, alignItems: 'center'}}>
                                    <View style={lineStyle}></View>
                                </View>
                                <TouchableOpacity style={closeStyle} onPress={onDecline}>
                                    <Icon type="Feather" name="x" />
                                </TouchableOpacity>
                            </View>
                            <View style={headerStyle}>
                                <MyText style={[textH3Style, textExtraBold, textOrange, textCenter]}>Photo Tips</MyText>
                            </View>
                            
                            <View style={{ marginBottom: 10}}>
                                <MyText style={[textH3Style, textBold, textGrey]}>
                                    These easy tips will help you get the best of your home photography
                                </MyText>
                            </View>
                            
                            <ScrollView>
                                <View style={{ borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 10, marginVertical: 20}}>
                                    <View style={{ paddingVertical: 20,paddingHorizontal: 20, borderBottomColor: colors.lightGrey, borderBottomWidth: 1}}>
                                        <MyText style={[textH4Style, textGrey]}>
                                            Take photos in landscape mode as opposed to portrait to capture as much of your space as possible. 
                                            Capturing from corners also helps add perspective.
                                        </MyText>
                                    </View>
                                    <View style={{ paddingVertical: 20,paddingHorizontal: 20, borderBottomColor: colors.lightGrey, borderBottomWidth: 1}}>
                                        <MyText style={[textH4Style, textGrey]}>
                                            Use as much natural light as possible. Take photos during the day and open your curtains 
                                            to allow as much light as possible in. Avoid using a flash.
                                        </MyText>
                                    </View>
                                    <View style={{ paddingVertical: 20, paddingHorizontal: 20}}>
                                        <MyText style={[textH4Style, textGrey]}>
                                            Ensure to capture various areas your guest will access during their stay like the bathroom, kitchen, sitting room and more.
                                        </MyText>
                                    </View>
                                </View>
                            </ScrollView>


                        </View>
                        
                </View>
                    
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)', flex: 1, 
        // height: Dimensions.get('window').height - 20
        // paddingHorizontal: 20,
        justifyContent: 'flex-end',
        // alignItems: 'flex-end'
    },
    modalHeader: {
        marginTop: 30, marginBottom: 30, alignItems: 'center',
        // paddingHorizontal: 20
    },
    headerStyle: {
        paddingBottom: 20, paddingHorizontal: 20
    },
    lineStyle: {
        width: '20%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
    },
    closeStyle: {
        height: 30, flex: 1, justifyContent:'flex-end',alignItems: 'flex-end', 
    },
    container: {
        backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15,
        paddingHorizontal: 24,
        // paddingTop: 130,
        // flex: 1, 
        justifyContent: 'flex-end'
      },
});

export default PhotographTipsModal;
