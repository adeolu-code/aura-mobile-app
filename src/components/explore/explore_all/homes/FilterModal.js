import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText } from '../../../../utils/Index';
import colors from '../../../../colors';

import { Icon } from 'native-base';

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {visible, onDecline } = this.props;
    const { textH3Style, textExtraBold, textDarkGrey, textCenter, flexRow } = GStyles
    const { closeStyle, modalContainer, modalHeader } = styles
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
                
            <View style={modalContainer}>
                <View style={[flexRow, modalHeader]}>
                    <View style={{ flex: 6}}>
                        <MyText style={[textH3Style, textExtraBold, textDarkGrey, textCenter]}>
                            Filters
                        </MyText>
                    </View>
                    <TouchableOpacity style={closeStyle} onPress={onDecline}>
                        <Icon type="Feather" name="x" />
                    </TouchableOpacity>
                </View>
                
                
            </View>
                
            
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.white, width: '100%', flex:1, 
        // borderWidth: 1
    },
    modalHeader: {
        alignItems: 'center', backgroundColor: colors.white, paddingVertical: 30,
        paddingHorizontal: 20, elevation: 3
    },
    headerStyle: {
        paddingBottom: 10
    },
    closeStyle: {
        height: 30, flex: 1, justifyContent:'flex-end', alignItems: 'flex-end',
        // borderWidth: 1
    },
});

export default FilterModal;
