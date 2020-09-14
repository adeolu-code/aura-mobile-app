import { StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    buttonStyle: {
        borderColor: colors.black, borderRadius: 10,borderWidth: 1,backgroundColor: colors.black, elevation: 2
    },
    myTextNoRecord: { marginBottom: 15, marginTop: 25},
    imgContainer: {height: 230},
    myTextDescription: { marginBottom: 15, marginTop: 25},
    customTextStyle:{color: colors.white },
});