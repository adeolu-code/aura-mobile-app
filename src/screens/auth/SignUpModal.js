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
import { MyText, CustomButton } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";

class SignUpModal extends Component {
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
                  paddingHorizontal: 24,
                  paddingVertical: 40,
                  flexDirection: "column",
                }}
              >
                <MyText style={{ alignSelf: "flex-start" }}>Aura</MyText>
                <Image
                  source={require("../../assets/images/icons/close/close.png")}
                  style={{ alignSelf: "flex-end" }}
                />
              </View>
              <View style={styles.container}>
                <View>
                  <CustomButton buttonText="Sign Up With Email" />
                </View>
                <View>
                  <MyText
                    style={{
                      alignSelf: "center",
                      marginTop: 40,
                      marginBottom: 31,
                    }}
                  >
                    OR
                  </MyText>
                </View>
                <View>
                  <CustomButton
                    buttonText="Sign Up With Facebook"
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ color: colors.orange }}
                  />
                  <CustomButton
                    buttonText="Sign Up With Google"
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ color: colors.orange }}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 50 }}
                  >
                    <MyText>
                      Already have an account? {""}
                      <MyText
                        style={{
                          color: colors.green,
                          textDecorationLine: "underline",
                        }}
                      >
                        Log In
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
    alignContent: "center",
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

export default SignUpModal;
