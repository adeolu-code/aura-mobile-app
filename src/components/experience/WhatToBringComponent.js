import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import { AppContext } from '../../../AppProvider';


class AddDetailsComponent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { inputValue: '', values: [] };
    }

    renderValues = () => {
        const { values } = this.state
        const { flexRow, textH4Style, textGrey } = GStyles
        if(values.length > 0) {
            return values.map((item, i) => {
                return (
                    <View style={[flexRow, styles.itemContainer]}>
                        <MyText style={[textH4Style, textGrey, { flex: 1}]}>{item}</MyText>
                        <TouchableOpacity onPress={this.removeItem.bind(this, item)}>
                            <Icon name="trash" style={{ fontSize: 22, color: colors.orange }} />
                        </TouchableOpacity>
                    </View>
                )
            })
        }
    }

    updateExperience = async () => {
        const { tourOnboard } = this.context.state
        this.props.setLoader(true)
        const obj = {
            id: tourOnboard.id,
            guestShouldBring: this.state.values
        }
        const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
        console.log('update experience ', res)
        this.props.setLoader(false)
        if (res.isError || res.IsError) {
            errorMessage(res.message || res.Message)
        } else {
            this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
            this.props.getValue(this.state.values)
            this.props.setCount({ count: 6 })
        }  
    }

    addItem = () => {
        const { inputValue, values } = this.state;
        if(inputValue) {
            const valueArr = [ ...values ]
            valueArr.push(inputValue)
            this.setState({ values: valueArr, inputValue: ''})
        }
    }
    removeItem = (item) => {
        const { values } = this.state;
        const valueArr = [ ...values ];
        valueArr.splice(valueArr.findIndex(x => item), 1)
        this.setState({ values: valueArr })
    }

    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }


    render() {
        const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle, textH2Style,
            textH4Style, textH5Style, textH6Style } = GStyles;
        const { container, selectStyle, profileImgContainer, textContainer, icon } = styles
        return (
            <View style={[container]}>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>
                    If guests need anything in order to enjoy your experience, this is the place to tell them. 
                    Cooking experience hosts should make sure to include a complete list of ingredients here instead of planning to send them to guests later. 
                    We can’t accept submissions that don’t have a complete and specific list.
                </MyText>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>
                    This list will be emailed to guests when they book your experience to help them prepare.
                </MyText>
                <MyText style={[textGrey, textH4Style, { marginTop: 15}]}>
                    Be as detailed as possible and add each item individually.
                </MyText>
                {this.renderValues()}

                <CustomInput placeholder="Enter Item here" value={this.state.inputValue} 
                onChangeText={this.onChangeValue} attrName="inputValue" />

                <TouchableOpacity style={[flexRow, { marginVertical: 10}]} onPress={this.addItem}>
                    <Icon name="add" style={{ color: colors.orange, fontSize: 25}} />
                    <MyText style={[textOrange, textH3Style, textBold]}>Add Item</MyText>
                </TouchableOpacity>

                <View>
                    <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, marginBottom: 30 }} onPress={this.updateExperience} />
                </View>
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

export default AddDetailsComponent;
