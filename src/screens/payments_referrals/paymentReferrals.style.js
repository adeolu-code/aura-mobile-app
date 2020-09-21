import { StyleSheet } from "react-native";
import colors from "../../colors";

export const Styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    headerStyle: {
        marginBottom: 30, backgroundColor: colors.white, position: 'absolute', top: 0,zIndex: 10,
        width: '100%', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30
    },
    sectionStyle: {
        marginBottom: 25
    },
    contentStyle: {
        zIndex: 1, paddingVertical: 20, paddingHorizontal: 20, marginTop:100
    }
});