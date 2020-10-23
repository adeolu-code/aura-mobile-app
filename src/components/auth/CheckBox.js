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
import {MyText} from '../../utils/MyText';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';


class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {isCheck: false};
  }
  checkItem = () => {
    const { item } = this.props
    this.setState(() => ({ isCheck: !this.state.isCheck }), () => {
      this.props.onPress({ item, value: this.state.isCheck })
    })
    
  }
  
  checkClicked = async () => {
    await this.setState(prevState => ({
      isCheck: !prevState.isCheck,
    }));
    this.props.clicked && this.props.clicked(this.props.value, this.state.isCheck);
  }

  renderCheck = () => {
    const { isCheck } = this.state;
    const { boxStyle, checkedStyle } = styles;
    if (isCheck) {
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
    // const paddingRight = password ? '' : inputRightPadding;
    // const keyboard = this.props.keyType ? this.props.keyType : 'default';
    return (
      <View style={[flexRow, {flex: 1, marginVertical: 8, alignItems: 'center'}]}>
        <View style={{flex: 1}}>
            {this.renderCheck()}
            {/* <TouchableOpacity onPress={this.checkClicked} style={this.props.style}>
                  <View style={{
                  height: 20,
                  width: 20,
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: '#FAFAFA',
                  borderColor: '#D9E1F0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  }}>
                  <View style={{
                      height: 8,
                      width: 14,
                      // backgroundColor: this.state.isCheck ? '#000' : '#FFF',
                      borderBottomColor: this.state.isCheck ? '#1E2B37' : '#FFF',
                      borderBottomWidth: 3,
                      borderLeftColor: this.state.isCheck ? '#1E2B37' : '#FFF',
                      borderLeftWidth: 3,
                      borderRadius: 0,
                      borderBottomLeftRadius: 0,
                      transform: [
                          {rotate: "320deg"},
                          // {rotateZ: "45deg"}
                      ]
                  }} />
                  </View>
          </TouchableOpacity> */}
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
    height: 30, width: 30, borderWidth: 1, borderColor: colors.lightGrey, marginRight: 10, borderRadius: 4, display: 'flex',
    justifyContent: 'center', alignItems: 'center'
  },
  checkedStyle: {
    backgroundColor: colors.orange
  },
});

export {CheckBox};
