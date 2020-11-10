import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon, Footer } from "native-base";
import colors from "../../colors";
import { Styles } from "./host.style";
import { MyText, CheckBox, CustomButton, CustomInput } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import LabelCheckbox from "../../components/label_checkbox/labelCheckbox.component";

import { urls, Request, GetRequest, errorMessage } from '../../utils';
import { AppContext } from '../../../AppProvider'

export default class HouseRules extends Component {
    static contextType = AppContext
    constructor() {
        super();

        this.state = { houseRules: [], gettingHouseRules: false, houseRuleValues: [], toggleAddHouseRule: false,
            addInfoValue: '', addingInfo: false, };
    }

    getHouseRules = async () => {
        this.setState({ gettingHouseRules: true })
        const res = await GetRequest(urls.listingBase, `${urls.v}listing/houserule`);
        this.setState({ gettingHouseRules: false})
        if(res.IsError || res.isError) {
            console.log(res.error)
            // errorMessage('Something went wrong, please try again')
        } else {
            const data = res.data;
            this.setState({ houseRules: data });
            console.log(data);
        }
    }
    getHouseRule = (id) => {
        const { houseRuleValues } = this.state;
        const found = houseRuleValues.find(item => item === id)
        return found ? true : false
    }
    onCheckHouseRule = (arg) => {
        const { houseRuleValues } = this.state
        const item = arg.item;
        const value = arg.value;
        let arr = [...houseRuleValues]
        if(value) {
            arr.push(item.id)
            this.setState({ houseRuleValues: arr })
        } else {
            const index = arr.findIndex(x => x === item.id )
            if(index !== -1) {
                arr.splice(index, 1)
                this.setState({ houseRuleValues: arr})
            }
        }
    }
    onChangeText = (text, value) => {
        this.setState({ addInfoValue: value })
    }
    saveNewHouseRule = async () => {
        this.setState({ addingInfo: true })
        const obj = { rule: this.state.addInfoValue }
        const res = await Request(urls.listingBase, `${urls.v}listing/houserule`, obj);
        this.setState({ addingInfo: false})
        console.log(res)
        if(res.IsError || res.isError) {
            console.log(res.error)
            errorMessage(res.message)
        } else {
            const data = res.data;
            this.setState({ addInfoValue: ''})
            this.getHouseRules()
            console.log('New ',data);
        }
    }
    renderHouseRules = () => {
        const { houseRules, gettingHouseRules } = this.state;
        const { textNormal, textH5Style, textH4Style, textOrange, textBold } = GStyles
        if(gettingHouseRules) {
            return (
                <MyText style={[textH4Style, textOrange, textBold]}>Loading...</MyText>
            )
        }
        if(houseRules.length !== 0 && !gettingHouseRules) {
            return houseRules.map((item, index) => {
                let key = "HR_"+index;
                return (
                    <CheckBox title={item.rule} key={key} item={item} 
                    onPress={this.onCheckHouseRule} value={this.getHouseRule(item.id)} 
                        labelTextStyles={[textNormal, textH5Style]}  />
                ) 
            })
        }
    }

    componentDidMount = () => {
        this.getHouseRules()
    }
    renderAddInfo = () => {
        const { toggleAddHouseRule, addingInfo } = this.state
        const { flexRow, textH4Style, textOrange, textBold } = GStyles
        if(addingInfo) {
            return (
                <MyText style={[textH4Style, textOrange, textBold, { marginTop: 20}]}>Saving...</MyText>
            )
        }
        if(toggleAddHouseRule) {
            return (
                <View style={[flexRow, { flex: 1, alignItems: 'flex-end', marginTop: 10}]}>
                    <View style={{ flex: 8, paddingRight: 20}}>
                        <CustomInput placeholder=" " value={this.state.addInfoValue} attrName="addInfo" onChangeText={this.onChangeText} />
                    </View>
                    <View style={{ flex: 2}}>
                        <CustomButton buttonText="Save" buttonStyle={{ height: 55}} disabled={this.state.addInfoValue === ''}
                        onPress={this.saveNewHouseRule} />
                    </View>
                </View>
            )
        }
    }

    toggleHouseRule= () => {
        const { toggleAddHouseRule } = this.state
        this.setState({ toggleAddHouseRule: !toggleAddHouseRule })
    }

    submit = () => {
        const { state, set } = this.context
        const { houseRuleValues } = this.state
        const propertyFormData = state.propertyFormData
        const obj = { ...propertyFormData, houseRules: houseRuleValues }
        console.log(obj)
        set({ propertyFormData: obj })
        this.props.navigation.navigate('BookingPreview')
    }

    render() {
        const { textOrange, textBold, flexRow, textH4Style, textH3Style, textNormal, textExtraBold,
            textCenter, imgStyle, textWhite, textH5Style, textlightGreyTwo,
            textUnderline, textDarkGrey,
          } = GStyles;
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="House Rules Of Need To Know" 
                        sub={"Inform your guests about rules they need to follow if you are hosting them"}
                    />
                    <Container style={[Styles.container]}>
                        <Content scrollEnabled>
                            <View style={[{marginTop: 50}]}>
                                {this.renderHouseRules()}
                            </View>
                            <TouchableOpacity onPress={this.toggleHouseRule}>
                                <MyText style={[textUnderline,textOrange, textUnderline, textBold, { marginTop: 20}]}>Add Additional Requirement</MyText>
                            </TouchableOpacity>

                            {this.renderAddInfo()}
                        </Content>
                        <Footer style={[Styles.footer, Styles.transparentFooter, {borderRadius: 5,}]}>
                            <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} 
                                onPress={this.submit} />
                        </Footer>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}