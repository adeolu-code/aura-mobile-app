import DateTimePicker  from '@react-native-community/datetimepicker';
// import { View } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import  React, { Component, Fragment } from 'react';
import colors from '../../colors';
import { MyText } from '../../utils/Index';
import Moment from 'moment';
import { Styles } from "./dateTimePicker.style";
import GStyles from '../../assets/styles/GeneralStyles';

export default class DateTimePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPicker: false,
            date: props.value || new Date(),
        }
    }

    
    showPicker = () => {
        this.setState({showPicker: true})
    }
    renderPicker = () => {
        const { showPicker } = this.state
        if(showPicker) {
            return (
                <View>
                    <DateTimePicker mode={this.props.mode || "datetime"}
                            onChange={(e, selectedDate) => {
                                console.log("e", selectedDate);
                                this.setState({showPicker: false})
                                if (selectedDate !== undefined) {
                                    this.props.onChange(selectedDate);
                                    this.setState({date: selectedDate})
                                }
                            }}
                            value={this.state.date|| this.props.value}
                            display={this.props.display || "calendar"}
                            
                    />
                </View>
                
            )
        }
    }

    render() {//HH:MM A
        const { textH4Style } = GStyles
        return (
            <>    
            <View style={{ width: '100%'}}>  
              
                <TouchableOpacity  style={[Styles.parent, this.props.style]} onPress={this.showPicker}>
                    <MyText style={[textH4Style]}>{Moment(this.props.value).format(this.props.format || "YYYY-MM-DD")}</MyText>
                </TouchableOpacity>
                {this.renderPicker()}
                {/* {
                    this.state.showPicker &&
                    <DateTimePicker
                        mode={this.props.mode || "datetime"}
                        onChange={(e, selectedDate) => {
                            console.log("e", selectedDate);
                            this.setState({showPicker: false})
                            if (e != undefined) {
                                this.props.onChange(selectedDate);
                                this.setState({date: selectedDate})
                            }
                        }}
                        value={this.state.date|| this.props.value}
                        display={this.props.display || "calendar"}
                        
                    />
                } */}
            </View>
            </>
        );
    }
}