/* eslint-disable prettier/prettier */
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
import LoginModal from '../components/auth/LoginModal';
import SignUpModal from '../components/auth/SignUpModal';

class PlaceHolderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {showLoginModal: false, showRegisterModal: false };
  }
  openLoginModal = () => {
    this.setState({ showLoginModal: true })
  }
  closeLoginModal = () => {
    this.setState({ showLoginModal: false })
  }
  openSignUpModal = () => {
    this.setState({ showRegisterModal: true })
  }
  closeSignUpModal = () => {
    this.setState({ showRegisterModal: false })
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
        <ScrollView style={container} keyboardShouldPersistTaps="always">
          <View>
            <MyText style={[textExtraBold, textH1Style, textDarkBlue, { marginBottom: 5 }]}>{title}</MyText>
            <MyText style={[textGrey, textH4Style]}>{description}</MyText>
          </View>
          <View style={imgContainer}>
            <Image source={img} resizeMode="contain" style={imgStyle} />
          </View>
          <View style={btnSection}>
            <CustomButton buttonText={this.props.buttonText ?? "Log In"} onPress={this.openLoginModal} 
            buttonStyle={buttonStyle} textStyle={{ color: colors.orange }} />
          </View>
          <View style={accountStyle}>
            <MyText style={[textH4Style, textDarkBlue]}> Don’t have an account? </MyText>
            <TouchableOpacity onPress={this.openSignUpModal}>
              <MyText style={[btnText, textH4Style, textUnderline, textBold]}>Sign Up</MyText>
            </TouchableOpacity>
          </View>
          <LoginModal visible={this.state.showLoginModal} onDecline={this.closeLoginModal} {...this.props} openSignUp={this.openSignUpModal} />
          <SignUpModal visible={this.state.showRegisterModal} onDecline={this.closeSignUpModal} {...this.props} openLogin={this.openLoginModal} />
        </ScrollView>
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
