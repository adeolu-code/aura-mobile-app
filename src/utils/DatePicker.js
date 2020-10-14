import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import GeneralStyles from '../assets/styles/GeneralStyles';
import moment from 'moment';
import {MyText} from './MyText';

class DatePicker extends Component {
  state = {
    show: false,
    date: new Date(moment().subtract(18, 'years').format()),
    mode: 'date',
    value: '',
  };
  renderPicker = () => {
    if (this.state.show) {
      return (
        <DateTimePicker
          value={this.state.date}
          mode={this.state.mode}
          onChange={this.setDate}
          maximumDate={this.renderEighteenYrs()}
        />
      );
    }
  };
  renderEighteenYrs = () => {
    const yr = moment()
      .subtract(18, 'years')
      .format();
    return new Date(yr);
  };
  setDate = (event, date) => {
    if (event.type === 'dismissed') {
      this.setState({ show: false });
      this.props.receiveData('');
    } else {
      const day = moment(date).format('DD');
      const month = moment(date).format('MM');
      const year = moment(date).format('YYYY');
      this.setState({
        value: `${day}/${month}/${year}`,
        show: false,
      });
      this.props.receiveData(moment(date));
    }
  };
  toggleDate = () => {
    this.setState({show: true});
  };
  renderValue = () => {
    const {value} = this.state;
    const {placeholder} = this.props;
    const {textGreyColor, textH3Style} = GeneralStyles;
    if (value) {
      return <MyText style={[textH3Style]}>{value}</MyText>;
    }
    return <MyText style={[textGreyColor, textH3Style]}>{placeholder}</MyText>;
  };
  render() {
    const {touchContainerStyle} = style;
    const {textGreyColor, textH3Style} = GeneralStyles;
    return (
      <View>
        <TouchableOpacity onPress={this.toggleDate} style={touchContainerStyle}>
          {this.renderValue()}
        </TouchableOpacity>
        {this.renderPicker()}
      </View>
    );
  }
}

const style = StyleSheet.create({
  touchContainerStyle: {
    borderWidth: 1,
    borderColor: 'rgba(232,232,232,1)',
    borderRadius: 5,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
});

export {DatePicker};
