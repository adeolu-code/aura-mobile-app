import { Dimensions, StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        flex: 1,
        marginTop: 20,
        padding: 10
    },
    
    icon: {
        color: colors.grey
    },
    scrollView: {
        borderTopWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: 10,
    },
    item: {
        height: 40,
        borderRadius: 5,
        borderColor: colors.lightGrey,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    chatHeader: {
        backgroundColor: colors.white,
    },
    footer: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    icon: {
        color: colors.orange,
        alignSelf: "center",
        fontSize: 24,
    },
    attachmentImage: {
        alignSelf: "center",
        height: 20,
        backgroundColor: "transparent",
    },
    chatInput: {

    },
    chatInputItem: {
        backgroundColor: "#eee",
        width: 250,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
        
    },
    chatBackground: {
        width: "100%",
        height: Dimensions.get("screen").height * 0.75,
        backgroundColor: colors.lightGrey,
    },
    headerIcon: {
        color: colors.black,
        alignSelf: "center"
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 50,
    },
    userImageView: {
        
    },
    userOnline: {
        height: 10,
        width: 10,
        borderRadius: 50,
        backgroundColor: colors.green,
        position: "absolute",
        alignSelf: "flex-end"
    },
    headerBody: {
        flexDirection: 'row',
    },
    userInfoView: {
        marginLeft: 10,
    }
});