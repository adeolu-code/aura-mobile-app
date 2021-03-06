import { StyleSheet } from "react-native";
import colors from "../../colors";
import { GLOBAL_PADDING } from "../../utils";

export const Styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        padding: GLOBAL_PADDING,
        marginTop: 125,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.lightGrey,
        borderRadius: 5,
        padding: 3,
    },
    item: {
        borderBottomWidth: 0,
    },
    footer: {
        backgroundColor: colors.orange,
        alignItems: "center",
    },
    transparentFooter: {
        backgroundColor: 'transparent', 
        elevation: 0, 
        shadowOffset:{height: 0, width: 0}
    },
    label: {
        color: colors.greyWhite,
        marginBottom: 5,
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
        height: 55,
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

    //add profile pic
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
    roundedUser: {
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: colors.lightGrey,
        alignSelf: "center",
    },
    userIcon: {
        color: colors.grey,
        fontSize: 45,
        alignSelf: "center",
        padding: 30,
    },
    fbProfilePic: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: "center",
    }
});