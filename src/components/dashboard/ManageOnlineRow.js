import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base';

class ManageOnlineRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  linkToHome = () => {
      this.props.navigation.navigate('HomeDetails');
  }
  openFilterModal = () => {
    const { openModal } = this.props
    openModal()
}

  render() {
    const { container, imgContainer, rightContainer, typeStyle, iconStyle, ellipsis } = styles;
    const { flexRow, imgStyle, textBold, textH4Style, textH5Style, textGrey, textFadedBlack,
        textDarkGrey, textExtraBold, textH1Style, textSuccess } = GStyles;
    const { title, location, status, img, onPress } = this.props
    return (
        <View style={{ width: '100%'}}>
            <TouchableOpacity style={[flexRow, container]} onPress={this.linkToHome}>
                <View style={imgContainer}>
                    <Image source={img} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={rightContainer}>
                    <View style={[flexRow]}>
                        <View style={{flex:10}}>
                        <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>{title}</MyText>
                        </View>
                        <View style={{flex:1, paddingTop: 1}}>
                            <TouchableOpacity onPress={this.openFilterModal}>
                                <Icon style={{color: colors.grey, fontSize: 21}} name={"ios-ellipsis-vertical-sharp"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <MyText style={[textH5Style, textGrey, { marginVertical: 6}]}>{location}</MyText>
                    <View style={[flexRow, typeStyle]}>
                        <MyText style={[textH5Style, textBold, textSuccess]}>Platinum Room</MyText>
                        <Icon name="ellipse" style={iconStyle} />
                        <MyText style={[textH5Style, textBold, textDarkGrey]}>Hotel</MyText>
                    </View>
                    <View style={[flexRow, { alignItems: 'center'}]}>
                        <MyText style={[textH5Style, textBold, textSuccess]}>{status}</MyText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
  }
}




const styles = StyleSheet.create({
    container: {
        width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8
    },
    imgContainer: {
        width: 120, height: 110, borderRadius: 6, overflow: 'hidden', marginRight: 20,
        borderWidth: 1,
    },
    typeStyle: {
        marginBottom: 20, alignItems: 'center',
    },
    iconStyle: {
        fontSize: 6, marginHorizontal: 6,
    },
    ellipsis: {
        flex: 9,
    }
});

export default ManageOnlineRow;
