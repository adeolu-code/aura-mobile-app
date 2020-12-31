import { StyleSheet, Dimensions } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    buttonStyle: {
        borderColor: colors.black, borderRadius: 10,borderWidth: 1,backgroundColor: colors.black, elevation: 2
    },
    myTextTitle: { marginBottom: 15, marginTop: 5},
    myTextNoRecord: { marginBottom: 15, marginTop: 25},
    imgContainer: {height: 230},
    myTextDescription: { marginBottom: 15, marginTop: 25},
    parentView: {
        flex:1, 
        width: "100%", 
        backgroundColor: "transparent", 
        height: Dimensions.get("window").height * 0.84, 
        padding: 10,
        paddingBottom: 10,

    },
    customTextStyle:{color: colors.white },
});