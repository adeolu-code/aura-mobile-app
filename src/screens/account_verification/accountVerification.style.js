import { StyleSheet } from "react-native";
import { GLOBAL_PADDING } from "../../utils";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    container: {
        marginTop: 125,        
        paddingLeft: GLOBAL_PADDING,
        paddingRight: GLOBAL_PADDING,
    },
    imgContainer: {
        marginVertical: 30,
        height: 200,
        paddingHorizontal: 20,
    },
    imgStyle: {
        height: 200,
        width: "100%",
        
    },
    nextButton: {
        backgroundColor: colors.orange,
        alignSelf: "center",
        width: "100%",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    footer: {
        backgroundColor: colors.orange,
        justifyContent: "center"
    },
    lowerView: {
        flexDirection: "row",
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    imageShield: {
        height: 20, 
        width:20,
        marginTop: 5,
    },
    shieldIcon: {
        color: colors.orange,
    },
    lowerText: {
        textAlign: "center"
    },
    shiedlView: {
        backgroundColor: colors.orange,
        borderRadius: 50,
        height: 30, 
        width:30,
        alignItems: "center",
        marginRight: 5,
    },
    // select verification
    selectVerificationContainer: {
        marginTop: 170,
        padding: GLOBAL_PADDING,
    },

    // Upload verification
    imageView: {
        height: 250,
        width: "100%",
        backgroundColor: colors.lightOrange,
        marginBottom: 10,
    },
    centerItems: {
        alignItems: "center",
        justifyContent: "center",
    },
    galleryIcon: {
        color: colors.orange,
        fontSize: 120,
    }
});