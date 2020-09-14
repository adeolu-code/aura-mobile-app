import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        width: "100%",
        height: 140,
        flexDirection: "row",
        marginTop: 15,
        borderRadius: 5,
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1, 
        elevation: 2,
        paddingLeft: 10,
        paddingTop: 10,
    },
    imageView: {
        flex: 0.38
    },
    imageStyle: {
        height: 117,
        width: 120,
        borderRadius: 10,
        marginTop: 3,
    },
    textSection: {
        flexDirection: "row",
        flex: 0.62,
        padding: 10,
    },
    textView: {
        flex: 0.9,
        paddingLeft: 10,
    },
    iconSection: {
        flex: 0.1
    },
    properyTitle: {
        padding: 3,
    },
    properyLocation: {
        padding: 3,
        color: colors.grey
    },
    properyType:{
        padding: 2,
        color: colors.grey
    },
    properyCheckinDays: {
        textAlignVertical: "bottom",
        height: 30,
        marginTop: 5,
        color: colors.orange
    },
    icon: {
        flex: 0.1,
        color: colors.grey,
    }
});