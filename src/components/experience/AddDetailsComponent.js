import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import { AppContext } from '../../../AppProvider';
import { urls, Request, GetRequest, errorMessage } from '../../utils'


import AddDetailsModal from './AddDetailsModal';

class AddDetailsComponent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { experienceProvisions: [], showModal: false };
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
        const { experienceProvisions } = this.state;
        const arr = [ ...experienceProvisions, value.name ]
        console.log(value)
        this.setState({ experienceProvisions: arr })
    }
    

    updateExperience = async () => {
        const { tourOnboard } = this.context.state
        this.props.loading(true)
        const obj = {
            id: tourOnboard.id,
            experienceProvisions: this.state.experienceProvisions.id
        }
        const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
        console.log('update experience ', res)
        this.props.loading(false)
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.getValue(this.state.experienceProvisions)
            this.props.setCount({ count: 5 })
        }  
    }

    removeItem = (item) => {
        const { experienceProvisions } = this.state
        const arr = [ ...experienceProvisions ]
        const index = arr.findIndex(x => x === item)
        arr.splice(index, 1)
        this.setState({ experienceProvisions: arr })
    }

    renderSelected = () => {
        const { experienceProvisions } = this.state;
        const { textH4Style, textH3Style, textGrey, textBold, flexRow } = GStyles
        if(experienceProvisions.length > 0) {
            return experienceProvisions.map((item, i) => {
                return (
                    <View style={[flexRow, styles.selectedContainer]} key={i}>
                        <View style={{flex: 6, paddingLeft: 10}}>
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 5}]}>{item}</MyText>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}} onPress={this.removeItem.bind(this, item)}>
                            <Icon name="trash" style={{ color: colors.orange, marginLeft: 20}} />
                        </TouchableOpacity>
                    </View>
                )
            })
        }
    }


    render() {
        const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle, textH2Style,
            textH4Style, textH5Style, textH6Style } = GStyles;
        const { container, selectStyle, profileImgContainer, textContainer, icon } = styles
        const { userData } = this.context.state
        const imgUrl = userData.profilePicture ? {uri: userData.profilePicture} : require('../../assets/images/profile.png')
        return (
            <View style={[container]}>
                <MyText style={[textGrey, textH4Style, { marginTop: 15, marginBottom:30 }]}>
                    You can provide food and drink, special equipment, a ticket to a concert, 
                    or anything else special to make your guests comfortable.
                </MyText>
                {this.renderSelected()}
                <TouchableOpacity style={[flexRow, selectStyle]} onPress={this.openModal}>
                    <View>
                        <Icon name="md-add-circle" style={{ color: colors.orange, marginRight: 20}} />
                    </View>
                    <MyText style={[textH4Style]}>Add an Item</MyText>
                </TouchableOpacity>
                

                <View>
                    <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, marginBottom: 30 }} onPress={this.updateExperience} />
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
        paddingHorizontal: 10, paddingVertical: 15, marginTop: 0, marginBottom: 40,
        justifyContent: 'center', alignItems: 'center'
    },
    selectedContainer: {
        borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 8, 
        paddingVertical: 8, paddingHorizontal: 0, backgroundColor: colors.white, marginBottom: 10
    }
});

export default AddDetailsComponent;
