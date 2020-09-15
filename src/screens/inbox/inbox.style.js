import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        flex: 1,
        marginTop: 20,
        padding: 10
    },
    item: {
        height: 40,
        borderRadius: 5,
        borderColor: colors.lightGrey,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    icon: {
        color: colors.grey
    },
    scrollView: {
        borderTopWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: 10,
    }
});