import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    separator: {
        backgroundColor: colors.lightGrey,
    },
    separatorText: {
        color: colors.grey,
    },
    userImageStyle: {
        borderRadius: 50,
        height: 70,
        width: 70,
        alignSelf: "center"
    },
    imageView: {
        padding: 10,
    },
    image: {
        width: 30,
        height: 30,
        width: "10%",
        alignSelf: "center",
        marginRight: 10,
    },
    contentView: {
        width: "80%",
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        padding: 5,
    },
    icon: {
        width: "10%",
        alignSelf: "center",
        color: colors.grey,
    },
    parentView: {
        flexDirection: "row",
        width: "100%",
        padding: 5,
    },
});