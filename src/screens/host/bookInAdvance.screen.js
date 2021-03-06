import React, { Component } from "react";
import { Styles } from "./host.style";
import { MyText, CustomButton, CheckBox } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { TouchableOpacity, SafeAreaView, ScrollView, View } from "react-native";
import Header from "../../components/Header";
import colors from "../../colors";

import { AppContext } from '../../../AppProvider'


export default class BookInAdvance extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = { values: []}
    }
    durations = [
        { name: 'Anytime', value: 0, description: '' },
        { name: '1 day in advance', value: 1, description: '' },
        { name: '2 days in advance', value: 2, description: '' },
        { name: '3 days in advance', value: 3, description: '' },
        // { name: '4 days in advance', value: 4, description: '' },
        { name: '7 days in advance', value: 7, description: '' },
        // { name: '6 months in advance', value: 6, description: '' },
        // { name: '9 months in advance', value: 9, description: '' },
        { name: 'Dates unavailable by default', value: null, description: 'Your entire calendar will be blocked by default, which means you’ll have to manually unblock dates to get booked.' }
    ];
    getDuration = (value) => {
        const { values } = this.state
        const found = values.find(item => item.value === value)
        return found ? true : false
    }
    onCheckDuration = (arg) => {
        // console.log(arg)
        const { values } = this.state
        const item = arg.item;
        const value = arg.value;
        let arr = []
        if(value) {
            arr.push(item)
            this.setState({ values: arr })
        } else {
            arr = [...values]
            const index = arr.findIndex(x => x.value === item.value )
            if(index !== -1) {
                arr.splice(index, 1)
                this.setState({ values: arr})
            }
        }
    }

    renderDurations = () => {
        const { textNormal, textH5Style } = GStyles
        return this.durations.map((item, index) => {
            let key = `D_${index}`;
            return (
                <CheckBox title={item.name} key={key} item={item} onPress={this.onCheckDuration} value={this.getDuration(item.value)} 
                    labelTextStyles={[textNormal, textH5Style]} subtitle={item.description}  />
            ) 
        })
    }

    submit = () => {
        const { state, set } = this.context
        const { values } = this.state
        const propertyFormData = state.propertyFormData
        const obj = { ...propertyFormData, maxPreBokingDays: values[0].value }
        console.log(obj)
        set({ propertyFormData: obj })
        this.props.navigation.navigate('PropertyAvailability')
    }
    componentDidMount = () => {
        const { state } = this.context
        const ppty = state.propertyFormData;
        const duration = this.durations.find(item => item.value === ppty.maxPreBokingDays)
        if(duration) {
            this.setState({ values: [duration] })
        }
    }

    render() {
        const {
            textOrange, textGrey,
            textBold,
            flexRow,
            textH4Style,
            textGreen,
          } = GStyles;
        return (
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="How Far In Advance Can A Guest Book?" wrapperStyles={{ position: 'relative'}} />
                    <View style={[Styles.container, {marginTop: 0, marginBottom: 160}]}>
                        <ScrollView>
                            <View style={[Styles.rowView, {flexWrap: "wrap", marginTop: 0, alignItems: "flex-start"}]}>
                                <MyText style={[textH4Style]}><MyText style={[textGreen]}>Tips: </MyText>
                                    <MyText style={[textGrey]}>
                                    At least 2 days’ notice can help you plan for a guest’s arrival, but you might miss out on last minutes trips.
                                    </MyText>
                                </MyText>
                            </View>
                            {/* <TipViewComponent text={"At least 2 days’ notice can help you plan for a guest’s arrival, but you might miss out on last minutes trips."} /> */}
                            {this.renderDurations()}
                            <View style={[{marginTop: 40}]}>
                                <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.submit} disabled={this.state.values.length === 0} />
                            </View>
                        </ScrollView>
                        
                    </View>
                </SafeAreaView>
            </>
        )
    }
}