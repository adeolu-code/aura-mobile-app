import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import { AppContext } from '../../../AppProvider';

import AddDetailsModal from './AddDetailsModal';

class AddDetailsComponent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { experienceProvisions: '', showModal: false };
    }
    openModal = () => {
        this.setState({ showModal: true })
    }
    closeModal = () => {
        this.setState({ showModal: false })
    }

    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }

    setValue = (value) => {
        console.log(value)
        this.setState({ experienceProvisions: value })
    }

    updateExperience = async () => {
        const { tourOnboard } = this.context.state
        this.props.setLoader(true)
        const obj = {
            id: tourOnboard.id,
            experienceProvisions: this.state.experienceProvisions.id
        }
        const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
        console.log('update experience ', res)
        this.props.setLoader(false)
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.getValue(this.state.experienceProvisions)
            this.props.setCount({ count: 5 })
        }  
    }

    renderSelectButton = () => {
        const { experienceProvisions } = this.state;
        const { textH4Style, textH3Style, textGrey, textBold } = GStyles
        if(experienceProvisions) {
            const { name, description } = experienceProvisions
            return (
                <>
                    <View style={{flex: 6, paddingLeft: 10}}>
                        <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 5}]}>{name}</MyText>
                        {/* <MyText style={[textH4Style]}>{description}</MyText> */}
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}}>
                        <Icon name="caret-forward" style={{ color: colors.orange, marginLeft: 20}} />
                    </View>
                </>
            )
        }
        return (
            <>
                <View>
                    <Icon name="md-add-circle" style={{ color: colors.orange, marginRight: 20}} />
                </View>
                <MyText style={[textH4Style]}>Add an Item</MyText>
            </>
        )
    }


    render() {
        const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle, textH2Style,
            textH4Style, textH5Style, textH6Style } = GStyles;
        const { container, selectStyle, profileImgContainer, textContainer, icon } = styles
        const { userData } = this.context.state
        const imgUrl = userData.profilePicture ? {uri: userData.profilePicture} : require('../../assets/images/profile.png')
        return (
            <View style={[container]}>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>
                    You can provide food and drink, special equipment, a ticket to a concert, 
                    or anything else special to make your guests comfortable.
                </MyText>

                <TouchableOpacity style={[flexRow, selectStyle]} onPress={this.openModal}>
                    {this.renderSelectButton()}
                </TouchableOpacity>
                

                <View>
                    <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, marginBottom: 30 }} />
                </View>
                <AddDetailsModal visible={this.state.showModal} onDecline={this.closeModal} setValue={this.setValue} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',paddingHorizontal: 1
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
    },
    selectStyle: {
        backgroundColor: colors.white, borderRadius: 10, elevation: 2, 
        paddingHorizontal: 10, paddingVertical: 15, marginVertical: 40,
        justifyContent: 'center', alignItems: 'center'
    }
});

export default AddDetailsComponent;
