import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    topTabParent: {
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: colors.willowBrook,
    },
    sectionActive: {
        backgroundColor: colors.green,
        flex: 1,
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginRight: 3,

    },
    sectionInactive: {
        backgroundColor: "transparent",
        flex: 1,
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
        marginRight: 3,

    },
    sectionTextActive: {
        textAlign: "center",
        color: colors.white,
    },
    sectionTextInactive: {
        textAlign: "center",
        color: colors.green,
    },
});