/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CustomButton, MyText, CustomInputNumber } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';


class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { numbers: [],};
    this.num1 = React.createRef();
    this.num2 = React.createRef();
    this.num3 = React.createRef();
    this.num4 = React.createRef();
    this.num5 = React.createRef();
    this.num6 = React.createRef();
  }
  changeNumValue = (item, index, value) => {
    const { numbers } = this.state
    const values = [ ...numbers ]
    const numberRefs = [this.num1, this.num2, this.num3, this.num4, this.num5, this.num6]
    if(value) {
        values.push(value)
        this.setState({ numbers: values })
        // this.setState({ numbers: values })
        if(numberRefs[index+1] !== undefined) {
            numberRefs[index+1].current.focus()
        }
    } else {
        values.splice(index, 1)
        this.setState({ numbers: values })
        if(numberRefs[index-1] !== undefined) {
            numberRefs[index-1].current.focus()
        }
    }
}

renderNumberInput = () => {
    const { inputStyle } = styles
    const numberRefs = [this.num1, this.num2, this.num3, this.num4, this.num5, this.num6]
    return numberRefs.map((item, index) => {
        return (
            <CustomInputNumber refs={item} key={index} style={inputStyle}
            onChangeText={this.changeNumValue.bind(this, item, index)} />
        )
    })
}
  SuccessScreen = () => {
    this.props.navigation.navigate('Success');
  }
  render() {
    const { container, middleRow, bottomRow, inputContainer, topRow, buttonStyle } = styles
    const { textBold, textH4Style, flexRow, imgStyle, textH3Style, textGrey, textWhite,
      textH5Style, textGreen, 
      textUnderline, textOrange } = GStyles
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Header {...this.props} title="Authentication Code" />
          <View style={container} >
            <View style={topRow}>
              <MyText style={[textH4Style, textGrey, { lineHeight: 25}]}>
                An OTP code has been sent to +2347033934020 Kindly enter below the 6 digit code or {' '}
                <TouchableOpacity >
                  <MyText style={[textOrange, textUnderline, textBold, { marginBottom: -4}]}>Change Phone Number</MyText>
                </TouchableOpacity>
              </MyText>
              
            </View>
            
            <View style={middleRow}>
              <View>
                <View style={inputContainer}>
                    {this.renderNumberInput()}
                </View>
              </View>
              <View>
                  <MyText style={[textH4Style, textGrey]}>Didn’t receive a code? {' '}<TouchableOpacity>
                    <MyText style={[textUnderline, textOrange, textBold, { marginBottom: -4}]}>Resend Code</MyText>
                    </TouchableOpacity></MyText>
              </View>

              <View style={{paddingTop: 40}}>
                  <MyText style={[textUnderline, textGreen, textBold, textH5Style]}>Request Call</MyText>
              </View>
            </View>
            <View style={bottomRow}>
                <CustomButton onPress={this.SuccessScreen} buttonText="Next" buttonStyle={buttonStyle} />
            </View>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 130,
    flex: 1,
  },
  topRow: {
    // borderWidth: 1
  },
  middleRow: {
      justifyContent: 'center',
      alignContent: 'space-between',
      flex: 3,
      // borderWidth: 1
  },
  bottomRow: {
      justifyContent: 'flex-end',
      paddingBottom: 30,
      flex: 1,
      // borderWidth: 1
  },
  inputContainer: {
      display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
      width: '100%', marginBottom: 60, 
  },
  buttonStyle: {
    elevation: 1
  }
});

export default OtpScreen;
