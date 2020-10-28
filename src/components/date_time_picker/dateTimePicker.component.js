import DateTimePicker  from '@react-native-community/datetimepicker';
import { View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import  React, { Component } from 'react';
import colors from '../../colors';
import { MyText } from '../../utils/Index';
import Moment from 'moment';
import { Styles } from "./dateTimePicker.style";

export default class DateTimePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPicker: false,
            date: props.value || new Date(),
        }
    }

    


    render() {//HH:MM A
        return (
            <>        
            <TouchableOpacity 
                style={[Styles.parent, this.props.style]}
                onPress={() => this.setState({showPicker: true})}
            >
                <MyText>{Moment(this.state.date).format(this.props.format || "YYYY-MM-DD")}</MyText>
            </TouchableOpacity>
            {
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
            }
            </>
        );
    }
}