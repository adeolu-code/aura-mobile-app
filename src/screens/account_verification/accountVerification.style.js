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
        width: 50,
        height: 50,
    },
    shieldIcon: {
        color: colors.orange,
    },
    lowerText: {
        textAlign: "center"
    }
});