import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "../host/host.style";
import { MyText, CheckBox, CustomButton, CustomInput } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";

import { urls, Request, GetRequest, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider'

export default class Equipments extends Component {
    static contextType = AppContext
    constructor() {
        super();

        this.state = { equipments: [], gettingEquipments: false, equipmentValues: [], toggleAddEquipment: false,
            name: '', description: '', addingInfo: false, };
    }

    getEquipments = async () => {
        try {
            this.setState({ gettingEquipments: true })
            const res = await GetRequest(urls.photographyBase, `${urls.v}photographer/equipment`);
            console.log('Equipments ', res)
            this.setState({ gettingEquipments: false})
            if(res.IsError || res.isError) {
                console.log(res.error)
                // errorMessage('Something went wrong, please try again')
            } else {
                const data = res.data;
                this.setState({ equipments: data });
                if(this.context.state.editPhotograph && this.context.state.photographOnboard.equipment) {
                    const equip = this.context.state.photographOnboard.equipment;
                    const equipmentValues = equip.map(item => item.id )
                    this.setState({ equipmentValues })
                }
            } 
        } catch (error) {
            this.setState({ gettingEquipments: false})
        }
    }
    getEquipment = (id) => {
        const { equipmentValues } = this.state;
        const found = equipmentValues.find(item => item === id)
        return found ? true : false
    }
    onCheckEquipment = (arg) => {
        const { equipmentValues } = this.state
        const item = arg.item;
        const value = arg.value;
        let arr = [...equipmentValues]
        if(value) {
            arr.push(item.id)
            this.setState({ equipmentValues: arr })
        } else {
            const index = arr.findIndex(x => x === item.id )
            if(index !== -1) {
                arr.splice(index, 1)
                this.setState({ equipmentValues: arr})
            }
        }
        console.log(this.state.equipmentValues)
    }
    // onChangeText = (text, value) => {
    //     this.setState({ addInfoValue: value })
    // }
    onChangeText = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    saveNewEquipment = async () => {
        try {
            this.setState({ addingInfo: true })
            const obj = { name: this.state.name, description: this.state.description }
            const res = await Request(urls.photographyBase, `${urls.v}photographer/equipment`, obj);
            console.log('Equipment ', res)
            this.setState({ addingInfo: false})
            if(res.IsError || res.isError) {
                console.log(res.error)
                errorMessage(res.message)
            } else {
                const data = res.data;
                this.setState({ name: '', description: ''})
                this.getEquipments()
            }  
        } catch (error) {
            this.setState({ addingInfo: false})
        }
        
    }
    renderEquipments = () => {
        const { equipments, gettingEquipments } = this.state;
        const { textNormal, textH5Style, textH4Style, textOrange, textBold } = GStyles
        if(gettingEquipments) {
            return (
                <MyText style={[textH4Style, textOrange, textBold]}>Loading...</MyText>
            )
        }
        if(equipments.length !== 0 && !gettingEquipments) {
            return equipments.map((item, index) => {
                let key = "HR_"+index;
                return (
                    <CheckBox title={item.name} key={key} item={item} subtitle={item.description}
                    onPress={this.onCheckEquipment} value={this.getEquipment(item.id)} 
                        labelTextStyles={[textNormal, textH5Style]}  />
                ) 
            })
        }
    }

    componentDidMount = () => {
        const { state } = this.context
        const ppty = state.photographOnboard;
        this.getEquipments()
    }
    renderAddInfo = () => {
        const { toggleAddEquipment, addingInfo } = this.state
        const { flexRow, textH4Style, textOrange, textBold } = GStyles
        if(addingInfo) {
            return (
                <MyText style={[textH4Style, textOrange, textBold, { marginTop: 20}]}>Saving...</MyText>
            )
        }
        if(toggleAddEquipment) {
            return (
                <View style={{ width: '100%'}}>
                    <View style={{ flex: 8 }}>
                        <CustomInput placeholder="Equipment Description" value={this.state.description} attrName="description" onChangeText={this.onChangeText} />
                    </View>
                    <View style={[flexRow, { flex: 1, alignItems: 'flex-end', marginTop: 5}]}>
                        <View style={{ flex: 8, paddingRight: 20}}>
                            <CustomInput placeholder="Equipment Name" value={this.state.name} attrName="name" onChangeText={this.onChangeText} />
                        </View>
                        <View style={{ flex: 2}}>
                            <CustomButton buttonText="Save" buttonStyle={{ height: 55}} disabled={this.state.addInfoValue === ''}
                            onPress={this.saveNewEquipment} />
                        </View>
                    </View>
                </View>
            )
        }
    }

    toggleAddEquipment = () => {
        const { toggleAddEquipment } = this.state
        this.setState({ toggleAddEquipment: !toggleAddEquipment })
    }

    submit = () => {
        const { state, set } = this.context
        const { equipmentValues } = this.state
        const photographOnboard = state.photographOnboard
        const obj = { ...photographOnboard, equipments: equipmentValues }
        // console.log(obj)
        set({ photographOnboard: obj })
        this.props.navigation.navigate('PhotographStack', { screen: 'PhotographAdditionalInfo'})
        // this.props.navigation.navigate('PhotographStack', { screen: 'PhotographUploadImages' })

    }

    render() {
        const { textOrange, textBold, textUnderline, textDarkGrey, flexRow } = GStyles;
        const { toggleAddEquipment } = this.state
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Equipment Available On The Go" wrapperStyles={{ position: 'relative'}} />
                    <View style={[pStyles.container]}>
                        <ScrollView>
                            
                            <View style={{ paddingBottom: 30}}>
                                <View style={[{marginTop: 10}]}>
                                    {this.renderEquipments()}
                                </View>
                                <TouchableOpacity onPress={this.toggleAddEquipment} style={[flexRow, { marginTop: 20, alignItems: 'center'}]}>
                                    <MyText style={[textUnderline,textOrange, textUnderline, textBold ]}>Add Additional Equipments</MyText>
                                    <Icon name={toggleAddEquipment ? "chevron-up" : "chevron-down"} style={{ fontSize: 24, color: colors.orange, marginLeft: 5 }} />
                                </TouchableOpacity>

                                {this.renderAddInfo()}
                            </View>
                            <View style={[{borderRadius: 5, marginBottom: 50}]}>
                                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} disabled={this.state.equipmentValues.length === 0}
                                    onPress={this.submit} />
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

const pStyles = StyleSheet.create({
    container: {
        // marginTop: Platform.OS === 'ios' ? 120 : 150,
        paddingHorizontal: 20,
        paddingBottom: 140, 
        // borderWidth: 1
    }
});