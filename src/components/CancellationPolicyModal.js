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



class CancellationPolicyModal extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, formErrors: [] };
    }
    onPress = () => {
        this.props.next();
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
                            <MyText style={[textH3Style, textExtraBold, textOrange, textCenter]}>Booking Cancellation and Cash Refund Policies</MyText>
                        </View>
                        
                        <View style={{ marginBottom: 10}}>
                            <MyText style={[textH4Style, textGrey]}>
                            Hosts and Guests are responsible for any Booking Modifications, and agree to pay any additional Listing Fees, 
                                Host Fees or Guest Fees and/or Taxes associated with such Booking Modifications.
                            </MyText>
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 60}}>
                            <CustomButton buttonText="I Understand" onPress={this.onPress} />
                        </View>
                        

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

export default CancellationPolicyModal;
