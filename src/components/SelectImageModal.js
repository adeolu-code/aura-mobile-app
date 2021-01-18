import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import GStyles from '../assets/styles/GeneralStyles';
import { MyText } from '../utils/Index';
import { Icon } from 'native-base';
import colors from '../colors';
import { color } from 'react-native-reanimated';


class SelectImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { container,contentContainer, modalContainer, cameraContainer, galleryContainer } = styles
    const { textH5Style, textWhite, textH4Style, textH3Style, textCenter, textFadedWhite, textH6Style, flexRow } = GStyles;
    const { visible, onDecline, onPressCamera, onPressGallery } = this.props
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={() => {}}>
            <TouchableWithoutFeedback onPress={onDecline}>
                <View>
                    <View style={container}>
                        <View style={modalContainer}>
                            <View style={[flexRow]}>
                                <TouchableOpacity onPress={onPressCamera} style={[flexRow, cameraContainer]}>
                                    <Icon name="camera" style={{ color: colors.white}} />
                                    <MyText style={[textWhite, textH4Style, { marginLeft: 10}]}>Camera</MyText>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onPressGallery} style={[flexRow, galleryContainer]}>
                                    <Icon name="image" style={{ color: colors.white}} />
                                    <MyText style={[textWhite, textH4Style, { marginLeft: 10}]}>Gallery</MyText>
                                </TouchableOpacity>
                            </View>
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
        width: '100%', height: '100%', display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center', alignItems: 'flex-end', paddingHorizontal: 0,
    },
    modalContainer: {
        // padding: 20, 
        backgroundColor: colors.orange, width: '100%', elevation: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10,
        ...GStyles.shadow
    },
    galleryContainer: {
        justifyContent: 'center', alignItems: 'center', flex: 1, paddingVertical: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20
    },
    cameraContainer: {
        alignItems: 'center', flex: 1, justifyContent: 'center', paddingVertical: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 20
    }
});

export default SelectImageModal;
