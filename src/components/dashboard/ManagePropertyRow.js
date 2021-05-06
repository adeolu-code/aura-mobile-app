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
        // this.props.navigation.navigate('HomeDetails')
        this.props.onPress()

    }
    openFilterModal = () => {
        const { openModal } = this.props
        openModal()
    }
    textColor = () => {
        const { status } = this.props
        const { textOrange, textDarkBlue, textFadedBlack, textGreen, textGrey} = GStyles
        switch (status.toLowerCase()) {
            case 'saved':
                return textOrange;
            case 'reviewed':
                return textGreen;
            case 'pending':
                return textGrey;
            default:
                return textFadedBlack;
        }
    }
    renderPropertyId = () => {
        const { textH5Style, textExtraBold} = GStyles
        if(this.props.propertyId) {
            return (
                <MyText style={[textH5Style]}>Unique Id: <MyText style={[textExtraBold]}>{this.props.propertyId}</MyText> </MyText>
            )
        }
    }
    render() {
        const { container, imgContainer, rightContainer, typeStyle, iconStyle, activeStyle, bgDanger, bgGreen } = styles
        const { flexRow, imgStyle, textBold, textH4Style, textH5Style, textGrey, textFadedBlack,
            textDarkGrey, textExtraBold, textH1Style, textSuccess, textOrange, textH6Style } = GStyles;
        const { title, location, status, img, roomType, propertyType, item } = this.props
        return (
            <View style={{ width: '100%' }}>
                <TouchableOpacity style={[flexRow, container]} onPress={this.linkToHome}>
                    <View style={imgContainer}>
                        <Image source={img} resizeMode="cover" style={imgStyle} />
                        <View style={[activeStyle, item.isActive ? bgGreen : bgDanger ]}></View>
                    </View>
                    <View style={[rightContainer]}>
                        <View style={[flexRow]}>
                            <View style={{ flex: 9 }}>
                                <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>{title}</MyText>
                                <MyText style={[textH5Style, textGrey, { marginVertical: 6 }]}>{location}</MyText>
                                <View style={[flexRow, typeStyle]}>
                                    <MyText style={[textH5Style, textGrey]}>{roomType}</MyText>
                                    <Icon name="ellipse" style={iconStyle} />
                                    <MyText style={[textH5Style, textGrey]}>{propertyType}</MyText>
                                </View>
                                <View style={[flexRow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                                    <MyText style={[textH5Style, textExtraBold, this.textColor()]}>
                                        {status}</MyText>
                                    {this.renderPropertyId()}
                                </View>
                            </View>
                            <TouchableOpacity onPress={this.openFilterModal} style={{flex: 1.4, }}>
                                <View>
                                    <Icon style={{color: colors.grey, fontSize: 20}} name={"ios-ellipsis-vertical-sharp"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        width: '100%', paddingVertical: 15, paddingLeft: 15, paddingRight: 0, 
        backgroundColor: colors.white, elevation: 2, borderRadius: 8, ...GStyles.shadow
    },
    imgContainer: {
        width: 120, height: 100, borderRadius: 6, overflow: 'hidden', marginRight: 20, backgroundColor: colors.lightGrey,
    },
    typeStyle: {
        marginBottom:10, alignItems: 'center'
    },
    iconStyle: {
        fontSize: 5, marginHorizontal: 6
    },
    rightContainer: {
        flex: 1
    },
    activeStyle: {
        height: 20, width: 20, position: 'absolute', right: 5, bottom: 5,
        borderRadius: 14, elevation: 4, ...GStyles.shadow
    },
    bgGreen: {
        backgroundColor: colors.success,
    },
    bgDanger: {
        backgroundColor: colors.danger
    }
});

export default ManagePropertyRow;