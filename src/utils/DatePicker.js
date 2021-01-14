import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import GeneralStyles from '../assets/styles/GeneralStyles';
import moment from 'moment';
import {MyText} from './MyText';

class DatePicker extends Component {
  state = {
    show: false,
    date: '',
    // date: new Date(moment().subtract(18, 'years').format()),
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
          minimumDate={this.renderMinDate()}
        />
      );
    }
  };
  renderMinDate = () => {
    const { minDate } = this.props;
    if(minDate) {
      return minDate
    } else {
      return new Date('1900-1-1')
    }
  }
  renderEighteenYrs = () => {
    const { minDate } = this.props;
    if(minDate) {
      return new Date('2050-1-1')
    } else {
      const yr = moment().subtract(18, 'years').format();
      return new Date(yr);
    }
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
  componentDidMount = () => {
    const { minDate, defaultValue } = this.props
    if(minDate) {
      this.setState({ date: minDate })
    } else {
      this.setState({ date: new Date(moment().subtract(18, 'years').format()) })
    }
    if(defaultValue) {
      const day = moment(defaultValue).format('DD');
      const month = moment(defaultValue).format('MM');
      const year = moment(defaultValue).format('YYYY');
      this.setState({ value: `${day}/${month}/${year}`})
    }
  }
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
