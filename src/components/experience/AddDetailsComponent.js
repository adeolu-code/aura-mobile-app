import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CustomInput } from '../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../colors';

import { AppContext } from '../../../AppProvider';
import { urls, Request, errorMessage } from '../../utils'


import AddDetailsModal from './AddDetailsModal';

class AddDetailsComponent extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { experienceProvisions: [], showModal: false, provisions: [], ansOne: false };
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

    selectOne = () => {
        this.setState(() => ({ ansOne: !this.state.ansOne }), () => {
            if(this.state.ansOne) {
                this.setState({ experienceProvisions: [] })
            }
        })
        
    }

    setValue = (value) => {
        const { experienceProvisions } = this.state;
        const arr = [ ...experienceProvisions ]
        arr.push(value)
        console.log(value)
        this.setState({ experienceProvisions: arr, ansOne: false })
    }

    getProvisions = (provisions) => {
        this.setState({ provisions })
        const { tourOnboard, editTour } = this.context.state;
        const arr = [];
        tourOnboard.experienceProvisions.forEach(element => {
            const provision = provisions.find(pr => pr.id === element)
            arr.push(provision)
        });
        if(editTour) {
            const a = arr.filter(item => item !== undefined)
            this.setState({ experienceProvisions: a })
        }
    }
    

    updateExperience = async () => {
        const { tourOnboard } = this.context.state
        const { ansOne, experienceProvisions } = this.state
        let value = ['Nothing']
        if(experienceProvisions.length > 0) {
            value = experienceProvisions.map(item => item.id)
        }
        this.props.loading(true)
        const obj = {
            id: tourOnboard.id,
            experienceProvisions: value
        }
        try {
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
        } catch (error) {
            this.props.loading(false)
        }
        
    }

    removeItem = (item) => {
        console.log(item)
        const { experienceProvisions } = this.state
        const arr = [ ...experienceProvisions ]
        const index = arr.findIndex(x => x.id === item.id)
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
                            <MyText style={[textH3Style, textGrey, textBold, { marginBottom: 5}]}>{item?.name}</MyText>
                        </View>
                        <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingRight: 5}} onPress={this.removeItem.bind(this, item)}>
                            <Icon name="trash" style={{ color: colors.orange, marginLeft: 10,}} />
                        </TouchableOpacity>
                    </View>
                )
            })
        }
    }

    componentDidMount = () => {
        // const { tourOnboard, editTour, userData } = this.context.state;
        // if(editTour) {
        //     this.setState({ experienceProvisions: tourOnboard.experienceProvisions })
        // }
    }


    render() {
        const { textGrey, flexRow, textH4Style, textH3Style, textBold } = GStyles;
        const { container, selectStyle, profileImgContainer, textContainer, icon, selectRow, radioContainer, activeRadio } = styles
        const { userData } = this.context.state
        const { ansOne } = this.state
        return (
            <View style={[container]}>
                <MyText style={[textGrey, textH4Style, { marginTop: 15, marginBottom:30 }]}>
                    You can provide food and drink, special equipment, a ticket to a concert, 
                    or anything else special to make your guests comfortable.
                </MyText>
                <TouchableOpacity style={[flexRow, selectRow ]} onPress={this.selectOne}>
                    <View style={radioContainer}>
                        <View style={[ansOne ? activeRadio : '']}></View>
                    </View>
                    <MyText style={[textH4Style, textGrey, { flex: 1}]}>I'm not providing anything</MyText>
                </TouchableOpacity>
                
                {this.renderSelected()}
                <TouchableOpacity style={[flexRow, selectStyle]} onPress={this.openModal}>
                    <View>
                        <Icon name="md-add-circle" style={{ color: colors.orange, marginRight: 20}} />
                    </View>
                    <MyText style={[textH4Style]}>Add an Item</MyText>
                </TouchableOpacity>
                

                <View>
                    <CustomButton buttonText="Save" buttonStyle={{ elevation: 2, ...GStyles.shadow, marginBottom: 30 }} onPress={this.updateExperience} />
                </View>
                <AddDetailsModal visible={this.state.showModal} onDecline={this.closeModal} setValue={this.setValue} getProvisions={this.getProvisions} />
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
        backgroundColor: colors.white, borderRadius: 10, elevation: 2, ...GStyles.shadow,
        paddingHorizontal: 10, paddingVertical: 15, marginTop: 0, marginBottom: 40,
        justifyContent: 'center', alignItems: 'center'
    },
    selectedContainer: {
        borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 8, 
        paddingVertical: 8, paddingHorizontal: 0, backgroundColor: colors.white, marginBottom: 10
    },
    radioContainer: {
        borderRadius: 18, width: 18, height: 18, borderWidth: 2, borderColor: colors.orange, justifyContent: 'center', alignItems: 'center', 
        marginRight: 10, marginTop: 3
    },
    activeRadio: {
        width: 10, height: 10, backgroundColor: colors.orange, borderRadius: 10, 
    },
    selectRow: {
        alignItems: 'flex-start', paddingVertical: 10, marginBottom: 10
    },
});

export default AddDetailsComponent;
