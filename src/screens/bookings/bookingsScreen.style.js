import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20, paddingTop: 150, borderBottomColor: colors.lightGrey, borderBottomWidth: 4, paddingBottom: 20
    },
    imgContainer: {
        width: '100%', height: 220, borderRadius: 8, overflow: 'hidden',
    },
    titleStyle: {
        marginTop: 20, marginBottom: 30, paddingVertical:8, borderBottomColor: colors.lightGrey, borderBottomWidth: 1
    },
    rowContainer: {
        paddingBottom: 25, justifyContent: 'space-between'
    },
    lowerContainer: {
        paddingHorizontal: 20, paddingVertical: 20
    },
    divider: {
        height: 1, width: '100%', backgroundColor: colors.lightGrey
    },
    pressable: {
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        color: colors.white,
        backgroundColor: colors.green,
        alignSelf: "center",
    },
    invoiceView: {
        flexDirection: 'row',
    },
    invoiceText: { 
        textAlignVertical: "center",
    }
});