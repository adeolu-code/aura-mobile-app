/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import colors from "../../colors";
import { CustomInput, MyText, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Icon } from 'native-base';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  linkToRegister = () => {
    this.props.openSignUp();
    setTimeout(() => {
      this.props.onDecline();
    }, 300);
  }

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, 
      textGreen, textBold } = GStyles;
    const { modalHeader, closeContainer, logoContainer, container, modalContainer, inputContainer, 
      buttonContainer, modalBodyStyle, dashStyles, dashContainer, socialContainer, buttonStyle, accountStyle } = styles
    return (
      
        <Modal visible={visible} transparent onRequestClose={() => {}} animationType="slide">
          <View style={modalContainer}>
            <View style={modalHeader} >
              <View style={logoContainer}>
                <Image resizeMode="contain" style={imgStyle} source={require("../../assets/images/icons/aura/aura.png")} />
              </View>

              <TouchableOpacity onPress={onDecline} style={closeContainer}>
                <Icon type="Feather" name="x" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={modalBodyStyle}>
                <View style={inputContainer}>
                  <CustomInput placeholder="Email" label="Email" />
                </View>
                <View style={inputContainer}>
                  <CustomInput password secureTextEntry placeholder="Password" label="Password" />
                </View>
                <View style={buttonContainer}>
                  <CustomButton buttonText="Log In" />
                </View>
                <View>
                  <TouchableOpacity>
                    <MyText style={[textH5Style, textCenter, textDarkGrey]}>Forgot password?</MyText>
                  </TouchableOpacity>
                </View>
                <View style={dashContainer}>
                  <View style={dashStyles}></View>
                  <MyText style={[textH4Style, textDarkGrey, { paddingHorizontal: 20}]}>OR</MyText>
                  <View style={dashStyles}></View>
                </View>
                <View style={socialContainer}>
                  <CustomButton buttonText="Log In With Facebook" buttonStyle={buttonStyle} 
                  socialImg={require('../../assets/images/icons/facebook/Facebook.png')}
                    textStyle={{ color: colors.darkGrey }} 
                  />
                  <CustomButton buttonText="Log In With Google" buttonStyle={buttonStyle}
                  socialImg={require('../../assets/images/icons/google/google.png')}
                    textStyle={{ color: colors.darkGrey }}
                  />
                </View>

                <View>
                  <TouchableOpacity style={accountStyle} onPress={this.linkToRegister}>
                    <MyText style={[textH4Style]}>
                      Don't have an account? {""}
                      <MyText style={[textUnderline, textGreen, textBold]}>Sign Up </MyText>
                    </MyText>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, width: '100%', backgroundColor: colors.white
  },
  modalHeader: {
    flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20,
    paddingVertical: 30, position: 'absolute', top: 0,zIndex: 4, width: '100%', backgroundColor: colors.white,
    // borderWidth: 1
  },
  logoContainer: { width: 70, height: 25 },
  closeContainer: {
    // width: 50, height: 50
  },
  modalBodyStyle: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 120
  },
  inputContainer: {
    marginBottom: 30
  },
  buttonContainer: {
    marginTop: 30, marginBottom: 20
  },
  dashContainer: {
    flexDirection: "row", flex: 1,marginTop: 40, marginBottom: 20, alignItems: "center",justifyContent: "center",
  },
  dashStyles: {
    height: 1, backgroundColor: colors.lightGrey, flex: 1
  },
  socialContainer: {

  },
  accountStyle: {
    marginBottom: 90, marginTop: 70, alignSelf: 'center'
  },
  
  
  buttonStyle: {
    borderWidth: 1, borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: colors.darkGrey,
    elevation: 2,
    marginTop: 20,
  },
});

export default LoginModal;
