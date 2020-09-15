import React, { Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { CustomButton, MyText } from '../utils/Index';
import colors from '../colors';
import GStyles from '../assets/styles/GeneralStyles';
import LoginModal from '../screens/auth/LoginModal';
import SignUpModal from '../screens/auth/SignUpModal';

class PlaceHolderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
  }
  openLoginModal = () => {
    this.setState({ showModal: true })
  }
  closeLoginModal = () => {
    this.setState({ showModal: false })
  }
  openSignUpModal = () => {
    this.setState({ showModal: true })
  }
  closeSignUpModal = () => {
    this.setState({ showModal: false })
  }
  render() {
    const {
      textWhite,
      textBold,
      textH1Style,
      textExtraBold,
      textDarkBlue,
      textGrey,
      textH4Style,
      imgStyle,
      textUnderline,
    } = GStyles;
    const {
      container,
      btnSection,
      buttonStyle,
      btnText,
      accountStyle,
      imgContainer,
    } = styles;
    const { title, description, img } = this.props;
    return (
      <View>
        <View style={container}>
          <View>
            <MyText style={[textExtraBold, textH1Style, textDarkBlue, { marginBottom: 5 }]}>{title}</MyText>
            <MyText style={[textGrey, textH4Style]}>{description}</MyText>
          </View>
          <View style={imgContainer}>
            <Image source={img} resizeMode="contain" style={imgStyle} />
          </View>
          <View style={btnSection}>
            <CustomButton buttonText={this.props.buttonText ?? "Log In"} onPress={this.openLoginModal} buttonStyle={buttonStyle} textStyle={{ color: colors.orange }} />
          </View>
          <View style={accountStyle}>
            <MyText style={[textH4Style, textDarkBlue]}> Don’t have an account? </MyText>
            <TouchableOpacity onPress={this.openSignupModal}>
              <MyText style={[btnText, textH4Style, textUnderline, textBold]}>Sign Up</MyText>
            </TouchableOpacity>
          </View>
          <LoginModal visible={this.state.showModal}/>
          <SignUpModal visible={this.state.showModal}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  accountStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
  },
  container: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 40,
    flex: 1,
  },
  imgContainer: {
    marginVertical: 70,
    height: 330,
    paddingHorizontal: 20,
  },
  btnSection: {
    // paddingTop: 105,
  },
  buttonStyle: {
    borderColor: colors.orange,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.white,
    elevation: 2,
  },
  btnText: { color: colors.success, marginLeft: 5 },
});

export default PlaceHolderComponent;
