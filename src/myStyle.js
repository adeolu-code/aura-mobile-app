import { StyleSheet } from "react-native";
import colors from "./colors";

export const MyStyle = StyleSheet.create({
    nextButton: {
        backgroundColor: colors.orange,
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        height: 40,
    },
    row: {
        flexDirection: 'row',
    },
    // width
    halfWidth: {
        width: '49%',
    },
    fullWidth: {
        width: '99%',
    },
    quarterWidth: {
        width: '24%',
    },
    customWidth: (value) => {
        return {width: value}
    },
    //margin
    mt05: {
        margin: "5%",
    },
    mt10: {
        margin: "10%",
    },
    mt15: {
        margin: "15%",
    },
    //padding
    pd05: {
        padding: "5%",
    },
    pd10: {
        padding: "10%",
    },
    pd15: {
        padding: "15%",
    },
    underline: {
        width: "100%",
        height: 1,
        backgroundColor: colors.lightGreyOne,
    },
    //height
    hPx50: {
        height: 50,
    },
    hPx60: {
        height: 60,
    },
    hPx70: {
        height: 70,
    },
    hPx: (val) => {
        return {height: val,}
    },
    //
    transparent: {
        backgroundColor: 'transparent'
    },
});