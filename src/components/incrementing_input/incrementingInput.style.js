import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        padding: 5,
    },
    inputText: {
        flex: 0.7,
    },
    inputView: {
        flex: 0.3,
        flexDirection: "row",
        alignItems: "center",
    },
    removeIcon: {
        color: colors.lightOrange,
    },
    addIcon: {
        color: colors.orange,
    },
    input: {
        width: 30,
    }
});