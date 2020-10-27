/* eslint-disable prettier/prettier */
import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {MyText} from './MyText';
import GStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';


class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {isCheck: false};
  }
  // checkItem = () => {
  //   const { item } = this.props
  //   this.setState(() => ({ isCheck: !this.state.isCheck }), () => {
  //     this.props.onPress({ item, value: this.state.isCheck })
  //   })
  // }
  checkItem = () => {
    const { item, value } = this.props
    this.props.onPress({ item, value: !value })
  }

  renderCheck = () => {
    const { value } = this.props
    const { boxStyle, checkedStyle } = styles;
    if (value) {
      return (
        <TouchableOpacity style={[boxStyle, checkedStyle]} onPress={this.checkItem}>
          <View>
            <Icon name="md-checkmark" style={{ color: colors.white, fontSize: 20}} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={[boxStyle]} onPress={this.checkItem}></TouchableOpacity>
      );
    }
  }

  render() {
    const {
      inputRightPadding,
      lStyles,
      lTextStyles,
    } = styles;
    const {textH4Style, textH6Style, textGrey, textBold, flexRow, textH5Style} = GStyles;
    const {title, subtitle} = this.props;
    return (
      <View style={[flexRow, {flex: 1, marginVertical: 8, alignItems: 'center'}]}>
        <View style={{flex: 1}}>
            {this.renderCheck()}
        </View>
        <View style={{flex: 8, justifyContent: 'center'}}>
            <MyText style={[textBold, textH4Style, { marginBottom: 4}]}>{title}</MyText>
            {subtitle ? (
                <MyText style={[textGrey, lStyles,textH5Style]}>{subtitle}</MyText>
            ) : (<Fragment></Fragment>)}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  inputRightPadding: {
    paddingRight: 20,
  },
  lStyles: {
    color: colors.grey,
    // marginBottom: 10,
  },
  lTextStyles: {
    paddingRight: 10,
  },
  showImg: {
    width: 22,
    height: 22,
  },
  boxStyle: {
    height: 25, width: 25, borderWidth: 1, borderColor: colors.lightGrey, marginRight: 20, borderRadius: 4, display: 'flex',
    justifyContent: 'center', alignItems: 'center'
  },
  checkedStyle: {
    backgroundColor: colors.orange
  },
});

export {CheckBox};
