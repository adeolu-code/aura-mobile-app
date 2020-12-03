import { StyleSheet } from "react-native";
import colors from "../../colors";
import { GLOBAL_PADDING } from "../../utils";

export const Styles = StyleSheet.create({
    separator: {
        backgroundColor: colors.lightGrey, marginBottom: 10
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
    container: {
        marginTop: 100,
        padding: GLOBAL_PADDING,
    },

    // device sharing
    deviceItemView: {
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        paddingBottom: 10,
        
    },
    computerImage: {
        width: 25, 
        height: 25,
        alignSelf: "center",
        marginTop: 3,
    },
    rowView: {
        flexDirection: "row",
        padding: 5,
    },
    deviceText: {
        marginLeft: 10,
    },
    logoutText: {
        color: colors.green,
    },
    dateTimeText: {
        marginLeft: 20,
    },
    deviceHistoryScrollView: {
        marginTop: 20,
    },
    loginSignupBtn: {
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 5,
        height: 40,
        borderRadius: 5,
    },
    transparentFooter: {
        backgroundColor: 'transparent', 
        elevation: 0, 
        shadowOffset:{height: 0, width: 0}
    },
    footer: {
        justifyContent: "center",
        height: 130,
        backgroundColor: colors.white,
    },
});