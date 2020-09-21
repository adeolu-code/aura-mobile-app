import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
    },
    switch: {
        width: 60,   
        flex: 0.3
    },
    textTitle: {
        flex: 0.7
    },
});