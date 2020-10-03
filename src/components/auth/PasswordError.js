import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';

class PasswordError extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [
        { title: 'capitalLetter', description: 'Password should contain at least a capital letter', resolved: false},
        { title: 'smallLetter', description: 'Password should contain at least a small letter', resolved: false},
        { title: 'numberDigit', description: 'Password should contain at least a digit', resolved: false},
        { title: 'specialCharacter', description: 'Password should contain at least a special character', resolved: false}
    ]};
  }

  
  componentDidUpdate = (prevProps, prevState) => {
      
    if(this.props.inputValue !== prevProps.inputValue) {
        // console.log(this.props, prevProps)
        const letters = this.props.inputValue
        const lowerCase = this.checkLowerCase(letters);
        lowerCase ? this.setResolvedTrue('smallLetter') : this.setResolvedFalse('smallLetter')
        
        const upperCase = this.checkUpperCase(letters);
        upperCase ? this.setResolvedTrue('capitalLetter') : this.setResolvedFalse('capitalLetter')

        const specialXter = this.checkSpecialxter(letters);
        specialXter ? this.setResolvedTrue('specialCharacter') : this.setResolvedFalse('specialCharacter')

        const numberDigit = this.checkNumber(letters)
        numberDigit ? this.setResolvedTrue('numberDigit') : this.setResolvedFalse('numberDigit')

        this.checkResolved();

        // console.log('Lowercase ',lowerCase, 'UpperCase ', upperCase, 'special xter ', specialXter, 'Number Digit ', numberDigit)
    }
  }
  checkUpperCase = (letters) => {
    const arr = [];
    for (let index = 0; index < letters.length; index++) {
        const element = letters[index];
        if (/^[A-Z]*$/.test(element)) {
            arr.push(element)
        }
    }
    // console.log('Upper case ', arr)
    if(arr.length > 0) {
        return true
    } else {
        return false
    }
  }
  checkLowerCase = (letters) => {
    const arr = [];
    for (let index = 0; index < letters.length; index++) {
        const element = letters[index];
        if (/[a-z]/.test(element)) {
            arr.push(element)
        }
    }
    // console.log('Lower case ', arr)
    if(arr.length > 0) {
        return true
    }
    return false
  }
  checkSpecialxter = (value) => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(value)
  }
  checkNumber = (value) => {
    const format = /\d+/;
    return format.test(value)
  }
  setResolvedTrue = (type) => {
    const { errors } = this.state;
    const arr = [ ...errors ]
    arr.filter(item => {
        if(type === item.title) {
            item.resolved = true
        }
    })
    this.setState({ errors: arr })
  }
  setResolvedFalse = (type) => {
    const { errors } = this.state;
    const arr = [ ...errors ]
    arr.filter(item => {
        if(type === item.title) {
            item.resolved = false
        }
    })
    this.setState({ errors: arr })
  }

  checkResolved = () => {
    const { errors } = this.state;
    const res = errors.find(item => !item.resolved)
    if(res) {
        this.props.error(true)
    } else {
        this.props.error(false)
    }
  }

  renderErrors = () => {
      const { errors } = this.state;
      const { iconStyle, errorRow, errorContainer, iconGreen } = styles
      const { textWhite, textBold, textExtraBold, textH1Style, flexRow, textH5Style, textSuccess, textGrey } = GStyles;

      return errors.map((item, i) => {
          return (
            <View style={[flexRow, errorRow]} key={i}>
                <Icon type="Feather" name={item.resolved ? "check" : "x"} style={[iconStyle, item.resolved ? iconGreen : '' ]} />
                <MyText style={[textH5Style, textGrey]}>{item.description}</MyText>
            </View>
          )
      })
  }

  render() {
    const { textWhite, textBold, textExtraBold, textH1Style, flexRow, textH5Style, textSuccess, textGrey } = GStyles;
    const { iconStyle, errorRow, errorContainer } = styles
    return (
      <View>
        <View style={errorContainer}>
            {this.renderErrors()}
            {/* <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a capital letter</MyText>
            </View>
            <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a small letter</MyText>
            </View>
            <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a digit</MyText>
            </View>
            <View style={[flexRow, errorRow]}>
                <Icon type="Feather" name="x" style={iconStyle} />
                <MyText style={[textH5Style, textGrey]}>Password should contain at least a special character</MyText>
            </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    iconStyle: {
        fontSize: 14, color: colors.secondary, marginRight: 4, marginBottom: -2
    }, 
    errorRow: {
        alignItems: 'center',marginBottom: 5
    },
    errorContainer: {
        marginTop: 10
    },
    iconGreen: {
        color: colors.success
    }
});

export default PasswordError;
