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
              <View style={styles.container}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <MyText style={[textExtraBold]}>Aura</MyText>

                  <Image
                    source={require("../../assets/images/icons/close/close.png")}
                    style={{ alignSelf: "flex-end" }}
                  />
                </View>
              </View>
              <View style={styles.container2}>
                <View>
                  <CustomButton buttonText="Sign Up With Email" />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 0.1,
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
                <View style={{ marginTop: 50, flex: 0.1}}>
                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
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
     alignContent: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    flex: 0.1,
    justifyContent: "center",
  },
  container2: {
    // alignContent: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 40,
    flex: 1,
    justifyContent: "center",
    marginTop: 150,
  },
//   emailStyle: {
//     color: colors.grey,
//     // marginTop: 10,
//   },
//   passwordStyle: {
//     color: colors.grey,
//     marginTop: 10,
//   },
  buttonStyle: {
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.orange,
    elevation: 2,
    marginTop: 20,
  },
});

export default SignUpModal;
