import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    icon: {
        
        height: 40,
        padding: 10,
        color: colors.black,
        
    },
    parent: {
        backgroundColor: colors.white,
        alignSelf: 'flex-end',

    },
    absoluteParent: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    itemText: {
        color: colors.black,
    },
    content:  {
        zIndex: 5,
        width: '100%',
        top: 30,
        marginRight: 5,
        shadowColor: colors.greyWhite,
        borderRadius: 5,
        borderColor: colors.greyWhite,
        marginRight: 50,
        backgroundColor: colors.lightGreyOne,
        elevation: 10,
    },
});