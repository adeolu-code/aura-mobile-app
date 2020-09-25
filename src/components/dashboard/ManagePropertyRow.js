/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base';

class ManagePropertyRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    linkToHome = () => {
        this.props.navigation.navigate('HomeDetails')
    }
    openFilterModal = () => {
        const { openModal } = this.props
        openModal()
    }
    render() {
        const { container, imgContainer, rightContainer, typeStyle, iconStyle } = styles
        const { flexRow, imgStyle, textBold, textH4Style, textH5Style, textGrey, textFadedBlack,
            textDarkGrey, textExtraBold, textH1Style, textSuccess, textOrange, textH6Style } = GStyles;
        const { title, location, status, img } = this.props
        return (
            <View style={{ width: '100%' }}>
                <TouchableOpacity style={[flexRow, container]} onPress={this.linkToHome}>
                    <View style={imgContainer}>
                        <Image source={img} resizeMode="cover" style={imgStyle} />
                    </View>
                    <View style={[rightContainer]}>
                        <View style={[flexRow]}>
                            <View style={{ flex: 9 }}>
                                <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>{title}</MyText>
                                <MyText style={[textH5Style, textGrey, { marginVertical: 6 }]}>{location}</MyText>
                                <View style={[flexRow, typeStyle]}>
                                    <MyText style={[textH5Style, textGrey]}>Platinum Room</MyText>
                                    <Icon name="ellipse" style={iconStyle} />
                                    <MyText style={[textH5Style, textGrey]}>Hotel</MyText>
                                </View>
                                <View style={[flexRow, { alignItems: 'center' }]}>
                                    <MyText style={[textH5Style, textExtraBold, status.toLowerCase() === 'pending' ? textOrange : textSuccess]}>
                                        {status}</MyText>
                                </View>
                            </View>
                            <View style={{flex: 1 }}>
                                <TouchableOpacity onPress={this.openFilterModal}>
                                    <Icon style={{color: colors.grey, fontSize: 20}} name={"ios-ellipsis-vertical-sharp"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        width: '100%', paddingVertical: 15, paddingLeft: 15, paddingRight: 8, 
        backgroundColor: colors.white, elevation: 3, borderRadius: 8
    },
    imgContainer: {
        width: 120, height: 100, borderRadius: 6, overflow: 'hidden', marginRight: 20,
    },
    typeStyle: {
        marginBottom:10, alignItems: 'center'
    },
    iconStyle: {
        fontSize: 5, marginHorizontal: 6
    },
    rightContainer: {
        flex: 1
    }
});

export default ManagePropertyRow;