import { StyleSheet } from "react-native";
import { GLOBAL_PADDING } from "../../utils";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    upperTextView: {
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
    },
    container: {
        marginTop: 100,
        padding: GLOBAL_PADDING,
    },
    referalView: {
        backgroundColor: colors.fadedOrange,
        height: 100,
        width: "100%",
        marginTop: 30,
        borderRadius: 5,
    },
    copyView: {
        alignSelf: "flex-end",
        flexDirection: "row",
        padding: 5,
        
    },
    copyIcon: {
        color: colors.orange,
        fontSize: 18,
        marginRight: 5,
        marginLeft: 5,
    },
    copyText: {
        color: colors.orange
    },
    socialView: {
        flexDirection: "row",
    },
    instagramImageView: {
        alignSelf: "center",
        alignItems: "center",
        padding: 7,
        backgroundColor: colors.brilliantRose,
        borderRadius: 50,
        height: 30,
        width: 30,
    },
    facebookImageView: {
        marginLeft:5,
        marginRight: 5,
    },
    instagramImage: {},
});