import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    parentView: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: colors.lightGrey,
        overflow: "hidden"
    },
    alertView: {
        backgroundColor: colors.fadedOrange,
    },
    middleSection: {
        
        flex: 0.65
    },
    alertIcon: {
        backgroundColor: colors.orange,
        color: colors.white,
        borderRadius: 50,
        height: 20,
        width: 20,
        textAlign: 'center',
        marginTop: 0,
        fontSize: 18,
    },
    iconParent: {
        flex: 0.1,
    },
    title: {
        marginTop: 0,
        marginLeft: 0,
        width: "75%",
        textAlign: "left",
        marginBottom: 10,
        
    },
    time: {
        flex: 0.25,
    },
    content: {
        marginTop: 5,
    },

    
});