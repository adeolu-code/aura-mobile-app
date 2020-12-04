import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import { AppContext } from '../../../AppProvider';


class ExperienceTitleComponent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }


    updateExperience = async () => {
        const { tourOnboard } = this.context.state
        this.props.setLoader(true)
        const obj = {
            id: tourOnboard.id,
            title: this.state.title
        }
        const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
        console.log('update experience ', res)
        this.props.setLoader(false)
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.getValue(this.state.title)
            this.props.navigation.navigate('TourAddImages')
        }  
    }

    
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }


    render() {
        const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, 
            textH4Style } = GStyles;
        const { container } = styles
        return (
            <View style={[container]}>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>
                Make it short, descriptive, and exciting.
                </MyText>

                <MyText style={[textGrey, textH3Style, textBold, { marginTop: 15}]}>
                    What is the title of your experience ?
                </MyText>

                <View style={{ marginBottom: 40}}>
                    <CustomInput placeholder="Enter Your title" value={this.state.title} 
                    onChangeText={this.onChangeValue} attrName="title" />
                </View>

                <View>
                    <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, marginBottom: 30 }} onPress={this.updateExperience} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',paddingHorizontal: 1, paddingTop: 40
    },
    divider: {
        height: 2, backgroundColor: colors.lightGrey, width: '100%', marginVertical: 20
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
    },
    itemContainer: {
        borderRadius: 8, elevation: 2, backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 10,
        justifyContent: 'space-between', marginTop: 15
    }
});

export default ExperienceTitleComponent;
