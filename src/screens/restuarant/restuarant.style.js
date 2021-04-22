import { StyleSheet } from "react-native";
import colors from "../../colors";
import { GLOBAL_PADDING } from "../../utils";
import GStyles from '../../assets/styles/GeneralStyles'

export const Styles = StyleSheet.create({
    subHeaderContainer: {
      paddingTop: 140, backgroundColor: colors.white, paddingBottom: 30,
      paddingHorizontal: 20, borderBottomWidth: 4, borderBottomColor: colors.lightGrey
    },
    imgContainer: {
      width: 55, height: 55, borderRadius: 60, overflow:'hidden'
    },
    profileImg: {
      flex: 1, 
      // borderWidth: 1
    },
    profileText: {
      flex: 4, flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 2,
      // borderWidth: 1, 
    },
    walletContainer: {
      backgroundColor: colors.lightGreen, borderRadius: 8, marginTop: 30, paddingVertical: 20, paddingHorizontal: 25, elevation: 2
    },
    firstRow: {
      justifyContent: 'space-between', marginBottom: 30
    },
    secondRow: {
      justifyContent: 'space-between'
    },
    walletImgContainer: {
      width: 40, height: 40, borderRadius: 40, backgroundColor: colors.fadedGreen,
      padding: 8
    },
    viewContainer: {
      backgroundColor: colors.green, paddingHorizontal: 25, paddingVertical: 10, borderRadius: 6
    },
    contentContainer: {
      paddingHorizontal: 20, paddingVertical: 25, backgroundColor: colors.white, borderBottomWidth: 4, borderBottomColor: colors.lightGrey
  
    },
    contentHeader: {
      marginBottom: 30, justifyContent: 'space-between', alignItems: 'flex-end'
    },
    rowContainer: {
      marginBottom: 20,
    },
    divider: {
      height: 1, width: '100%', backgroundColor: colors.lightGrey,
    },
    noBorderBottom: {
      borderBottomWidth: 0,
    },
    reservation: {
      width: '100%',
      paddingHorizontal: 20,
      height: 150,
      marginBottom: 20,
      marginTop: 20,
      flex: 1,
    },
    wrapper: {
      minHeight: 200
    },
    
    // index restuarant
    container: {
        width: '100%',
        paddingRight: GLOBAL_PADDING,
        paddingLeft: GLOBAL_PADDING,
        // borderWidth: 1
    },
    headerStyle: {
        marginBottom: 30, backgroundColor: colors.white, position: 'absolute', top: 0,zIndex: 10,
        width: '100%', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 30,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sectionStyle: {
        marginBottom: 25
    },
    contentStyle: {
        zIndex: 1, paddingVertical: 0, 
        paddingHorizontal: 20, 
        marginTop:20
    },
    iconContainer: {
      height: 40, width: 40, backgroundColor: colors.white, borderRadius: 5, justifyContent: 'center',
      alignItems: 'center', 
      borderWidth: 1, borderColor: colors.lightGrey
      // borderColor: colors.orange
    },
    menuStyles: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2000,
    },
    
    //order
    itemParentView: {
        width: "90%",
        height: 120,
        flexDirection: "row",
        borderRadius: 5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1, 
        elevation: 1,
        paddingLeft: 10,
        paddingTop: 10,
        marginBottom: 20,
        marginLeft: '5%',
    },
    center: {
      alignSelf: 'center'
    },
    pizzaImage: {
      height:250,
      // width: 250,
      width: '100%',
      borderColor: colors.orange,
      borderWidth: 4,
      borderRadius: 20,
    },
    //add restaurant
    addIcon: {
      backgroundColor: colors.orange, 
      color: colors.white, 
      borderRadius: 100, 
      marginRight: 20, 
      fontSize: 23, paddingLeft: 2, paddingTop: 1
    },
    addIconView: {
      flexDirection: 'row', ...GStyles.shadow,
      elevation: 2, 
      borderRadius: 5, 
      marginBottom: 10, 
      marginTop: 10, backgroundColor: colors.white, paddingVertical: 12, paddingHorizontal: 16
    },
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
    halfWidth: {
      width: '49%',
    },
    fullWidth: {
      width: '99%',
    },
    quarterWidth: {
      width: '24%',
    },
  });
  