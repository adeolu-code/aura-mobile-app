import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        width: "100%", 
        backgroundColor: colors.white,
        height: 160,
        flexDirection: "row",
        marginTop: 15,
        borderRadius: 8,
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1, 
        elevation: 2,
        paddingLeft: 15,
        paddingTop: 15,
    },
    imageView: {
        flex: 0.4, 
        // borderWidth: 1
    },
    imageStyle: {
        height: 125,width: '100%', backgroundColor: colors.lightGrey,
        borderRadius: 8,
        marginTop: 3,
    },
    textSection: {
        flexDirection: "row", flex: 0.62, paddingHorizontal: 10, 
        // borderWidth: 1
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