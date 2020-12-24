import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';
import { urls, Request, GetRequest, errorMessage } from '../../utils'


import { AppContext } from '../../../AppProvider'

class DescribeComponent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { guestPreExperienceInfomration: ''};
    }

    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
      }

      updateExperience = async () => {
        const { tourOnboard } = this.context.state
            this.props.loading(true)
            const obj = {
                id: tourOnboard.id,
                guestPreExperienceInfomration: this.state.guestPreExperienceInfomration
            }
            const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
            console.log('update experience ', res)
            this.props.loading(false)
            if (res.isError || res.IsError) {
                errorMessage(res.message || res.Message)
            } else {
                this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
                this.props.getValue(this.state.guestPreExperienceInfomration)
                this.props.setCount({ count: 4 })
            }  
    }

    componentDidMount = () => {
        const { tourOnboard, editTour } = this.context.state;
        if(editTour) {
            this.setState({ guestPreExperienceInfomration: tourOnboard.guestPreExperienceInfomration })
        }
    }


    render() {
        const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle, textH2Style,
            textH4Style, textH5Style, textH6Style } = GStyles;
        const { container, profileImgContainer, textContainer, icon } = styles
        const { userData } = this.context.state
        const imgUrl = userData.profilePicture ? {uri: userData.profilePicture} : require('../../assets/images/profile.png')
        return (
            <View style={[container]}>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>
                    You don’t need to include the address here — you’ll do that later.
                </MyText>
                <MyText style={[textH2Style,textGrey, textBold, { marginVertical: 15}]}>Describe where the experience takes place</MyText>

                <View style={textContainer}>
                    <View style={[flexRow, { alignItems: 'center', marginBottom: 10, }]}>
                        <Icon name="ellipse" style={icon} />
                        <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                        Talk about the atmosphere, the sights and sounds, or what makes it unique.
                        </MyText>
                    </View>
                    
                    <View style={[flexRow, { alignItems: 'center', marginBottom: 10}]}>
                        <Icon name="ellipse" style={icon} />
                        <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                        Don’t leave it entirely up to your guest to choose. We’re looking for 
                        hosts who already have a clear idea of where they’re going.
                        </MyText>
                    </View>
                    <View style={[flexRow, { alignItems: 'center', marginBottom: 10}]}>
                        <Icon name="ellipse" style={icon} />
                        <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                        It’s okay to vary the location each time you host, as long as it’s the same type of location. 
                        If there will be variations, mention it.
                        </MyText>
                    </View>
                    
                </View>

                <View>
                    <CustomInput placeholder="Where we'll be" textInputStyle={{ height: 150, marginBottom:10 }} textAlignVertical="top" 
                    value={this.state.guestPreExperienceInfomration} onChangeText={this.onChangeValue} attrName="guestPreExperienceInfomration" />
                </View>
                <View>
                    <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, marginBottom: 30 }} onPress={this.updateExperience}
                    disabled={!this.state.guestPreExperienceInfomration} />
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
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey, alignSelf: 'flex-start', marginTop: 10
    },
    textContainer: {
        paddingHorizontal: 10
    }
});

export default DescribeComponent;
