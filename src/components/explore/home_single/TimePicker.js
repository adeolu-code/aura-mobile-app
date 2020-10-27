import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText } from '../../../utils/Index';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = { showTimePicker: false, time: new Date().getTime(), };
    }
    toggleTimePicker = () => {
        this.setState({ showTimePicker: true })
    }
    setTime = (event, time) => {
        if (event.type === "dismissed") {
            this.setState({
                showTimePicker: false
            })
        } else {
            const selectedTime = moment(time).format('LT')
            this.setState({ timeValue: selectedTime, showTimePicker: false })
            // this.props.receiveTime(moment(time))
            this.props.receiveTime(time)
        }
    }
    renderTimeValue = () => {
        const {textH4Style, textBold, textOrange, textDarkBlue } = GStyles
        const { timeValue } = this.state
        if(timeValue) {
            return (
                <MyText style={[textH4Style, textDarkBlue, textBold]}>
                    {timeValue}
                </MyText>
            )
        }
        return (
            <MyText style={[textH4Style, { color: colors.grey}]}>
                12:00 am
            </MyText>
        )
    }
    renderTime = () => {
        return (
            <TouchableOpacity style={styles.timeContainer} onPress={this.toggleTimePicker}>
                {this.renderTimeValue()}
            </TouchableOpacity>
        )
       
    }
    renderTimePicker = () => {
        const { showTimePicker, time } = this.state
        if(showTimePicker) {
            return (
                <DateTimePicker value={time} mode={'time'} onChange={this.setTime} is24Hour={false} />
            )
        }
    }

  render() {
    const { container } = styles
    const { title } = this.props;
    const { textH6Style, textGrey } = GStyles
    return (
      <View style={container}>
        <MyText style={[textH6Style, textGrey]}>{title}</MyText>
        {this.renderTime()}
        {this.renderTimePicker()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    timeContainer: {
        // width: '100%', 
        paddingVertical: 10,
        // alignItems: 'center', 
        elevation: 1,
        backgroundColor:'white',  paddingHorizontal:15, marginTop: 10,
   }
});

export default TimePicker;
