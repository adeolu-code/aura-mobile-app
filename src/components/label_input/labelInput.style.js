/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    input: {
        padding: 3,
        alignSelf: "stretch",
        height: 55,
    },
    item: {
        borderBottomWidth: 0,
    },
    label: {
        color: colors.greyWhite,
        marginBottom: 5,
        fontFamily: 'Nunito-Regular'
    },
    personalInfo: {
        flexDirection: "row",
        width: "100%",
    },
    datePicker: {
        alignItems: "flex-start",
        backgroundColor: "red"
    },
    personalContentView: {
        width: "100%",
        borderColor: colors.lightGrey,
        borderRadius: 5,
        padding: 3,
        borderWidth: 1,
    },
    nextOfKinView: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
    },
    icon: {
        color: colors.green,
    },
    phoneItem: {
        paddingBottom: 15,
        borderBottomWidth: 0,
    },
    inputView: {
        flexDirection: "row",
        width: "100%",
        borderWidth: 1,
        borderColor: colors.lightGrey,
        borderRadius: 5,
        alignItems: "center",
    },
    left: {
        //width: "90%",
        flex: 0.9,
    },
    right: {
        //width: "10%",
        flex: 0.1,
    },
    textarea: {
        flex: 1,
    }
});