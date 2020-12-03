import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    separator: {
        backgroundColor: colors.grey,
    },
    parentView: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 15,
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
    },
    image: {
        width: 18,
        height: 18,
        // width: "10%",
        // alignSelf: "center",
        marginRight: 10, marginTop: 5
    },
    contentView: {
        // width: "80%", 
        flex: 9,
        // borderWidth: 1,
        paddingHorizontal: 5,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.lightGrey,
        // padding: 5,
    },
    icon: {
        // width: "10%",
        alignSelf: "center",
        fontSize: 24,
        color: colors.grey,
        // borderWidth: 1, 
        marginRight: -10
    }
});