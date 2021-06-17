import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Pressable, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import GeneralStyles from '../assets/styles/GeneralStyles';
import moment from 'moment';
import {MyText} from './MyText';
import colors from '../colors';

class DatePickerTwo extends Component {
  state = {
    show: false,
    date: '',
    // date: new Date(moment().subtract(18, 'years').format()),
    mode: 'date',
    value: '',
  };

  closeDate = () => {
    this.setState({ show: false })
  }
  
  renderPicker = () => {
    const { flexRow, textOrange, textH4Style } = GeneralStyles
    if (this.state.show) {
      return (
        <View>
          {Platform.OS === 'ios' && <Pressable style={{ borderWidth: 1, alignSelf: 'flex-end', paddingVertical: 1, 
            paddingHorizontal: 7, borderRadius: 5, marginTop: 5, borderColor: colors.orange }} onPress={this.closeDate}>
            <MyText style={[textOrange, textH4Style]}>x</MyText>
          </Pressable>}
          <DateTimePicker style={{ height: 50}}
            value={this.state.date} mode={this.state.mode} onChange={this.setDate} minimumDate={this.renderMinDate()} />
        </View>
      );
    }
  };
  renderMinDate = () => {
    const { minDate } = this.props;
    if(minDate) {
      return minDate
    } else {
      return new Date()
    }
  }
  
  setDate = (event, date) => {
    if (event.type === 'dismissed') {
      this.setState({ show: false });
      this.props.receiveData('');
    } else {
      const day = moment(date).format('DD');
      const month = moment(date).format('MM');
      const year = moment(date).format('YYYY');
      if(Platform.OS !== 'ios') {
        this.setState({ show: false })
      }
      this.setState({
        value: `${day}/${month}/${year}`,
        date
        // show: false,
      });
      // if(Platform.OS === 'ios') {
      //   this.setState({ date })
      // }
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
    const { selectDate, defaultValue } = this.props
    if(selectDate) {
      this.setState({ date: selectDate })
    } else {
      this.setState({ date: new Date() })
    }
    if(defaultValue) {
      const day = moment(defaultValue).format('DD');
      const month = moment(defaultValue).format('MM');
      const year = moment(defaultValue).format('YYYY');
      this.setState({ value: `${day}/${month}/${year}`})
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
      if(this.props.defaultValue !== prevProps.defaultValue) {
          const { defaultValue } = this.props
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

export {DatePickerTwo};
