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

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { visible, onDecline } = this.props;
    const { textWhite, textBold, textExtraBold, textH1Style } = GStyles;
    return (
      <>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <ScrollView>
            <Modal
              visible={visible}
              onDismiss={onDecline}
              onRequestClose={() => {}}
              animationType="slide"
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: 24,
                  paddingVertical: 20,
                }}
              >
                <View style={{ width: 100, height: 20 }}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    source={require("../../assets/images/icons/aura/aura.png")}
                  />
                </View>

                <TouchableOpacity>
                  <Image
                    source={require("../../assets/images/icons/close/close.png")}
                    style={{ alignSelf: "flex-end" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={{ marginTop: 10 }}>
                  <CustomInput placeholder="Email" label="Email" />
                </View>
                <View style={{ marginTop: 30 }}>
                  <CustomInput
                    password
                    secureTextEntry
                    placeholder="Password"
                    label="Password"
                  />
                </View>
                <View style={{ paddingTop: 50 }}>
                  <CustomButton buttonText="Log In" />
                </View>
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity>
                    <MyText style={{ alignSelf: "center" }}>
                      Forgot password?
                    </MyText>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    marginTop: 40,
                    marginBottom: 31,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: 2,
                      backgroundColor: "#E5E5E5",
                      width: 125,
                    }}
                  ></View>
                  <MyText>
                    {"     "}
                    OR
                    {"      "}
                  </MyText>
                  <View
                    style={{
                      height: 2,
                      backgroundColor: "#E5E5E5",
                      width: 125,
                    }}
                  ></View>
                </View>
                <View>
                  <CustomButton
                    buttonText="Log In With Facebook"
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ color: colors.orange }}
                  />
                  <CustomButton
                    buttonText="Log In With Google"
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ color: colors.orange }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 50 }}
                  >
                    <MyText>
                      Don't have an account? {""}
                      <MyText
                        style={{
                          color: colors.green,
                          textDecorationLine: "underline",
                        }}
                      >
                        Sign Up
                      </MyText>
                    </MyText>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 40,
    flex: 1,
    justifyContent: "center",
  },
  emailStyle: {
    color: colors.grey,
    marginTop: 10,
  },
  passwordStyle: {
    color: colors.grey,
    marginTop: 10,
  },
  buttonStyle: {
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.orange,
    elevation: 2,
    marginTop: 20,
  },
});

export default LoginModal;
