/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
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
    
      checkClicked = async () => {
        await this.setState(prevState => ({
          isCheck: !prevState.isCheck,
        }));
        this.props.clicked && this.props.clicked(this.props.value, this.state.isCheck);
      }

  render() {
    const {
      InputContainerStyles,
      inputStyle,
      InputWithImgStyle,
      inputRightPadding,
      lStyles,
      lTextStyles,
    } = styles;
    const {textH4Style, textH6Style, textGrey, textBold, flexRow} = GStyles;
    const {title, subtitle} = this.props;
    // const paddingRight = password ? '' : inputRightPadding;
    // const keyboard = this.props.keyType ? this.props.keyType : 'default';
    return (
      <View style={[flexRow, {flex: 1}]}>
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.checkClicked} style={this.props.style}>
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
        </TouchableOpacity>
        </View>
        <View style={{flex: 9}}>
            <MyText style={[textBold]}>{title}</MyText>
            {subtitle ? (
            <MyText style={[lStyles]}>
                <MyText style={[textGrey, textH6Style]}>{subtitle}</MyText>
            </MyText>
            ) : (
            <MyText></MyText>
            )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  InputContainerStyles: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    // flex: 1
  },
  inputStyle: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    fontSize: 17,
    color: colors.darkGrey,
    fontFamily: 'Nunito-bold',
    paddingHorizontal: 15,
  },
  InputWithImgStyle: {
    paddingLeft: 0,
  },
  inputRightPadding: {
    paddingRight: 20,
  },
  showImgContainerStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 50,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1
  },
  lStyles: {
    color: colors.grey,
    marginBottom: 10,
  },
  lTextStyles: {
    paddingRight: 10,
  },
  showImg: {
    width: 22,
    height: 22,
  },
});

export {CheckBox};
