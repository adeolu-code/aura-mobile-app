/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, CustomButton, ItemCountPicker } from '../../../utils/Index';
import TimePicker from './TimePicker'



class ReserveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getTime = (value) => {

  }

  render() {
    const { visible, onDecline } = this.props;
    const { modalContainer, contentContainer, modalHeader, lineStyle, closeStyle, buttomStyle, container, itemCountContainer,
        headerStyle, mainHeader, checkInStyle, checkOutStyle, buttonStyle, buttonContainerStyle, timeContainer } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textCenter, textH5Style, textH6Style,
        textH4Style, textGrey, textH3Style } = GStyles
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
            <View style={container}>
                <View style={modalContainer}>
                    <View style={mainHeader}>
                        <View style={[flexRow, modalHeader]}>
                            <TouchableOpacity style={closeStyle} onPress={onDecline}>
                                <Icon type="Feather" name="chevron-left" />
                            </TouchableOpacity>
                            <View style={{ flex: 6, alignItems: 'center', paddingRight: 50 }}>
                                <View style={lineStyle}></View>
                            </View>
                        </View>
                        <View style={headerStyle}>
                            <MyText style={[textH3Style, textExtraBold, textDarkGrey, textCenter]}>
                                How many Guests are Coming ?
                            </MyText>
                        </View>
                    </View>
                    <View>
                        <View style={[flexRow, contentContainer]}>
                            <View style={checkInStyle}>
                                <MyText style={[textH6Style, textGrey, { marginBottom: 10}]}>CHECK-IN</MyText>
                                <MyText style={[textH4Style]}>19, May 2020</MyText>
                            </View>
                            <View style={checkOutStyle}>
                                <MyText style={[textH6Style, textGrey, { marginBottom: 10}]}>CHECK-OUT</MyText>
                                <MyText style={[textH4Style]}>31, May 2020</MyText>
                            </View>
                        </View>
                        <View style={[flexRow, { paddingHorizontal: 10, marginTop: 20}]}>
                            <View style={timeContainer}>
                                <TimePicker receiveTime={this.getTime} title="SELECT CHECK-IN TIME" />
                            </View>
                            <View style={[timeContainer]}>
                                <TimePicker receiveTime={this.getTime} title="SELECT CHECK-OUT TIME" />
                            </View>
                        </View>

                        <View style={itemCountContainer}>
                            <View>
                                <ItemCountPicker title="Adults" value={0} />
                            </View>
                            <View>
                                <ItemCountPicker title="Children" value={10} />
                            </View>
                            <ItemCountPicker title="Infants" value={0} />
                        </View>
                        <View style={buttonContainerStyle}>
                            <CustomButton buttonText="Reserve Space" disabled buttonStyle={buttonStyle} />
                        </View>
                    </View>
                </View>
                
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.white, 
        width: '100%', height: '100%',
        justifyContent: 'flex-end'
    },
    
    modalContainer: {
        backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden', elevation: 4,
        // flex: 1
        // paddingHorizontal: 20
    },
    mainHeader: {
        backgroundColor: colors.white, 
    },
    modalHeader: {
        marginTop: 20, alignItems: 'center', paddingHorizontal: 20,
    },
    headerStyle: {
        paddingBottom: 10, paddingTop: 10
    },
    
    lineStyle: {
        width: '22%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
    },
    closeStyle: {
        height: 30, flex: 1
    },
    buttonContainerStyle: {
        paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40, backgroundColor: colors.white, elevation: 6
    },
    buttonStyle: {
        elevation: 2, borderRadius: 0
    },
    contentContainer: {
        borderBottomColor: colors.lightGrey, borderBottomWidth: 1, borderTopColor: colors.lightGrey,
        borderTopWidth: 1, 
    },
    checkOutStyle: {
        flex: 1, paddingHorizontal: 20, paddingVertical:8, alignItems: 'flex-end'
    },
    checkInStyle: {
        flex: 1, paddingHorizontal: 20, paddingVertical:8, borderRightColor: colors.lightGrey, borderRightWidth: 1 
    },
    itemCountContainer: {
        paddingHorizontal: 20,marginBottom: 20, width: '100%', marginTop: 30
    },
    timeContainer: {
        // width: '48%'
        flex: 1, paddingHorizontal: 10
    }
});

export default ReserveModal;
