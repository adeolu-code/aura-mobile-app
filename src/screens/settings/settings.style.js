import { StyleSheet } from "react-native";
import colors from "../../colors";
import { GLOBAL_PADDING } from "../../utils";

export const Styles = StyleSheet.create({
    separator: {
        backgroundColor: colors.lightGrey,
        maxHeight: 40,
    },
    separatorText: {
        color: colors.grey,
    },
    parentView: {
        flexDirection: "row",
        width: "100%",
        padding: 10,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
    },
    noBorderBottom: {
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 0,
    },
    container: {
        marginTop: 125,        
    },
    scrollView: {
        
        marginBottom: 10,
    },
    switch: {
        width: 60,   
        flex: 0.3
    },
    textTitle: {
        flex: 0.7
    },
    descriptionText: {
        padding: GLOBAL_PADDING,
    },
    contentView: {
        padding: GLOBAL_PADDING,
    },
    transparentFooter: {
        backgroundColor: 'transparent', 
        elevation: 0, 
        shadowOffset:{height: 0, width: 0}
    },
    footer: {
        justifyContent: "center",
        backgroundColor: colors.white,
        paddingLeft: GLOBAL_PADDING,
        paddingRight: GLOBAL_PADDING,
    },
    nextButton: {
        backgroundColor: colors.orange,
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 5,
        height: 40,
        borderRadius: 5,
    },
    
});