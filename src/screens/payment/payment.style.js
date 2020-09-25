import { StyleSheet } from "react-native";
import { GLOBAL_PADDING } from "../../utils";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    container: {
        marginTop: 100,
        padding: GLOBAL_PADDING
    },
    imgContainer: {
        height: 230,
        marginTop: 50,
        marginBottom: 50,
    },
    buttonStyle: {
        borderColor: 
        colors.orange, 
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.orange, 
        elevation: 2,
        marginTop: 20,
    },
    customTextStyle:{color: colors.white },
    cardView: {
        height: 100,
        width: 150,
        elevation: 2,
        shadowOffset: {
            height: 2,
            width: 2,
        },
        borderColor: colors.lightGreyOne,
        borderRadius: 5,
        justifyContent: "center",
        padding: 10,
        marginRight: 10,
        marginTop: 10,
    },
    cardImage: {
        alignSelf: "center",
        flex: 0.8,
    },
    cardRow: {
        flexDirection: "row",
        marginTop: 20,
    },
    cardText: {
        flex: 0.2,
    },
    cameraIcon: {
        color: colors.green,
    },
    rowView: {
        width: "100%",
        flexDirection: "row",
    }
});