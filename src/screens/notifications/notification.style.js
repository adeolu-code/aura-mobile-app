import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        flex: 1,
        marginTop: 20,
        padding: 10
    },
    scrollView: {
        borderTopWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: 10,
        flexGrow: 1,
    },
    icon: {
        color: colors.grey
    },
    item: {
        height: 40,
        borderRadius: 5,
        borderColor: colors.lightGrey,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    imageDetail: {
        height: 150,
        width: "100%"
    },
    safeArea: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.white,
    },
    imageDetailView: {
        backgroundColor: "royalblue",
        height: 150,
        marginTop: 120,
        width: "100%",
        marginBottom: 10,
    },
    detailScrollView: {
        flexGrow: 1,
    }
});