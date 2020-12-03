import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import { AppContext } from '../../../AppProvider'

class AboutComponent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { story: ''};
    }

    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
      }

    changePhoto = () => {

    }

    render() {
        const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle, textH2Style,
            textH4Style, textH5Style, textH6Style } = GStyles;
        const { container, profileImgContainer } = styles
        const { userData } = this.context.state
        const imgUrl = userData.profilePicture ? {uri: userData.profilePicture} : require('../../assets/images/profile.png')
        return (
            <View style={[container]}>
                <MyText style={[textH2Style,textGrey, textBold]}>Your full name </MyText>
                <MyText style={[textH3Style, { marginTop: 10}]}>{userData.firstName} {userData.lastName}</MyText>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>Guests want to know who’s hosting them. This must be your actual name, not the name of a business. 
                    Only your first name will appear on your page. If you have co-hosts, you'll be able to add them later.</MyText>
                <View style={styles.divider}></View>
                <MyText style={[textH2Style,textGrey, textBold]}>Your profile photo </MyText>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>It’s important that guests can see your face. No company logos, 
                favorite pets, blank images, etc. We can’t accept photos that don’t show the real you.</MyText>

                <View>
                    <View style={profileImgContainer}>
                        <Image source={imgUrl} style={imgStyle} />
                    </View>
                    <TouchableOpacity onPress={this.changePhoto} style={{ paddingHorizontal: 30}}>
                        <MyText style={[textOrange, textH4Style, textUnderline, textBold]}>Update Photo</MyText>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>
                <View>
                    <CustomInput placeholder="Your story" textInputStyle={{ height: 150, marginBottom:10 }} textAlignVertical="top" 
                    value={this.state.story} onChangeText={this.onChangeValue} attrName="story" />
                </View>
                <View>
                    <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, marginBottom: 30 }} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%', marginTop: 20
    },
    divider: {
        height: 2, backgroundColor: colors.lightGrey, width: '100%', marginVertical: 20
    },
    profileImgContainer: {
        height: 150, width: 150, borderColor: colors.orange, borderWidth: 3, borderRadius: 150, overflow: 'hidden', marginVertical: 20
    }
});

export default AboutComponent;
