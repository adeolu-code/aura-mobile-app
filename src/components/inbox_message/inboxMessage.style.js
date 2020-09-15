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
    }
});