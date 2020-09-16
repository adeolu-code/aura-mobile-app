import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        flexDirection: 'row',
        backgroundColor: "transparent",
        height: 75,
        borderBottomWidth: 1,
        borderColor: colors.lightGrey,
        marginTop: 3,
        padding: 5
    },
    image: {
        borderRadius: 50,
        height: 60,
        width: 60,
    },
    content: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    textSection: {
        width: "70%",
    },
    infoSection: {
        width: "20%",
    },
    messageContent: {
        color: colors.grey,
        marginTop: 3,
    },
    timeContent: {
        color: colors.grey,
        alignSelf: "center",
    },
    newMessageCount: {
        backgroundColor: colors.orange,
        color: colors.white,
        borderRadius: 50,
        height: 25,
        width: 25,
        textAlign: 'center',
        alignSelf: "center",
        marginTop: 10,
    },
    messageView: {
        backgroundColor: colors.darkBlue,
        padding: 10,
        width: 300,
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    icon: {
        color: colors.white,
        alignSelf: "flex-end",
        fontSize: 16,
    },
    userImage: {
        height: 45,
        width: 45,
        borderRadius: 50,
        position: "absolute",
        borderColor: colors.darkBlue,
        borderWidth: 2,
        alignSelf: "flex-end",
        left: 7,
        paddingTop: 10,
    },
    viewLeft: {
        flexDirection: "row"
    },
    messageInfo: {flexDirection: "row", alignSelf: "flex-end", alignItems: "center"},
    viewRight: {
        flexDirection: "row-reverse"
    },
    messageViewRight: {
        backgroundColor: colors.white,
        padding: 10,
        width: 300,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    userImageRight: {
        height: 45,
        width: 45,
        borderRadius: 50,
        position: "absolute",
        borderColor: colors.darkBlue,
        borderWidth: 2,
        alignSelf: "flex-end",
        left: 7,
        paddingTop: 10,
    },
    messageInfoRight: {
        flexDirection: "row", 
        alignSelf: "flex-end", 
        alignItems: "center",
        marginRight: 50,
    },
    messageText: {
        padding: 5,
    }
});