import { StyleSheet, Platform } from "react-native";
import colors from "../../colors";
import { GLOBAL_PADDING } from "../../utils";
import GStyles from '../../assets/styles/GeneralStyles';

export const Styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 120 : 145,
        padding: GLOBAL_PADDING,
        paddingBottom: 10,
    },
    footer: {
        backgroundColor: colors.orange,
        justifyContent: "center",
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
    propertyInfoText: {
        marginTop: 20,
    },
    partOfCompanyInput: {
        marginTop: 20,
        marginBottom: 20,
    },
    topDescriptionText: {
        marginBottom: 20,
    },
    rowView: {
        flexDirection: "row", marginBottom: 10
    },
    transparentFooter: {
        backgroundColor: 'transparent', 
        elevation: 0, 
        shadowOffset:{height: 0, width: 0}
    },
    calendarContainer: {
        borderRadius: 10, elevation: 3, backgroundColor: colors.white, marginVertical: 10,
        paddingHorizontal: 2, paddingVertical: 10, ...GStyles.shadow
    },

    //amenities
    checkBox: {
        marginRight: 20,
    },
    itemView: {
        marginBottom: 5,
        width: "80%",
    },

    //Host Steps
    cardView: {
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 2,
        paddingBottom: 30,
        padding: GLOBAL_PADDING,
    },
    topView: {
        flexDirection: "row", alignItems: 'center', marginBottom: 12, marginTop: 15
    },
    completedView: {
        flexDirection: "row",
        alignItems: "center", justifyContent: 'flex-end',
        flex: 0.4,
    },
    completedIcon: {
        color: colors.pureGreen, fontSize: 18, marginRight: 5
    },
    reviewView: {
        padding: GLOBAL_PADDING,
    },
    propertyContainer: {
        width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8,
        ...GStyles.shadow
    },
    imgContainer: {
        width: 120, height: 110, borderRadius: 6, overflow: 'hidden', marginRight: 20,
        // borderWidth: 1
    },
    buttonStyle: {

    },

    //slider
    sliderContainer: {
        marginTop: 100,
        padding: GLOBAL_PADDING,
        paddingBottom: 10,
    },
    sliderImgContainer: {
        width: '100%', height: 240, borderRadius: 10, overflow: 'hidden',
        // marginLeft: 50,
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between', alignItems: 'flex-end', padding: 20
    },
    sliderImg: {
        width: "100%",
        height: 200,
    },
    dotView: {
        flexDirection: "row",
        justifyContent: "center",
        height: 20,
        marginTop: 10
    },
    dot: {
        height: 10, width: 10, borderRadius: 50,
        marginRight: 5,
    },
    activeDot: {
        backgroundColor: colors.green
    },
    inActiveDot: {
        backgroundColor: colors.lightGrey
    },
    textBodyView: {
        marginTop: 20,
    },

    //Upload
    sectionView: {
        height: 210, width: "100%",
        flexDirection: "row",
        marginBottom: 20,
        borderRadius: 5, elevation: 2, ...GStyles.shadow
    },
    imageView: {
        flex: 0.4,
        alignItems: "flex-start",
        paddingTop: 30,
        justifyContent: 'flex-end'
        
    },
    contentView: {
        flex: 0.6,
        
    },
    cameraImage: {
        width: 130, height: 180, marginBottom: -30
    },
    hireView: {
        height: 40, width: 100,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center", borderTopRightRadius: 5, borderBottomRightRadius: 5
    },
    lowerTextView: {
        paddingTop: 15, paddingLeft: 25, 
    },

    //pick image
    centerItems: {
        alignItems: "center",
        justifyContent: "center",
    },
    galleryIcon: {
        color: colors.orange,
        fontSize: 100,
    },
    miniGalleryIcon: {
        color: colors.orange,
        fontSize: 40,
    },
    pickImageImageView: {
        minHeight: 280,
        width: "100%",
        backgroundColor: colors.lightOrange,
        borderRadius: 8, flex: 1
        // marginLeft: 5, 
        // borderWidth: 1
    },
    miniPickImageImageView: {
        height: 120,
        width: 140,
        backgroundColor: colors.lightOrange,
        borderRadius: 5,
        
    },
    picturesRowView: {
        flexDirection: "row", justifyContent: 'space-between', width: '100%', 
        // borderWidth: 1,
        flexWrap: "wrap", 
    },
    miniSelectedImage: {
         width: '100%', height: '100%',
        // width: 120,
        // marginLeft: 5, marginRight: 5,
        borderRadius: 10,
        marginTop: 5,
        // marginBottom: 20,
    },
    miniSelectedImageView: {
        width: '46.5%', height: 150, marginBottom: 30
        // flex: 0.9,  
        // justifyContent: "flex-end",
    },
    trashIcon: {
        backgroundColor: colors.white, width: 30,
        height: 30, borderRadius: 50, color: colors.black,
        padding: 5, fontSize: 20, 
        // position: "absolute", alignSelf: "flex-end", right: 15, bottom: 10,
    },

    //booking information requirements
    lockIcon: {
        color:colors.lightGrey,
        marginRight: 10,
        fontSize: 24
    },

    //booking info preview
    shieldView: {
        backgroundColor: colors.orange,
        borderRadius: 50,
        height: 27, 
        width:27,
        alignItems: "center", justifyContent: 'center',
        borderWidth: 2, borderColor: colors.lightOrange
    },
    checkContainer: {
        backgroundColor: colors.orange,
        borderRadius: 50, height: 27, width:27,
        alignItems: "center", justifyContent: 'center', borderWidth: 2, borderColor: colors.lightOrange
    },
    imageShield: {
        height: 15, 
        width:15,
        // marginTop: 5,
    },
    previewParentView: {
        padding: 10,
        flexDirection: 'row',
        overflow: "hidden"
    },
    previewIconParent: {
        flex: 0.1,
    },
    alertIcon: {
        backgroundColor: colors.white,
        color: colors.orange,
        borderRadius: 50,
        height: 20,
        width: 20,
        textAlign: 'center',
        marginTop: 0,
        fontSize: 18,
    },
    middleSection: {  
        flex: 0.85
    },
    previewTitle: {
        marginTop: 0,marginLeft: 0,marginBottom: 5,
        width: "100%",
        textAlign: "left",
    },
    content: {
        marginTop: 5, lineHeight: 22
    },

    //set pricing
    averageItem: {
        marginTop: 10, 
        paddingBottom: 10, paddingTop: 5, 
        // borderWidth: 1,
        borderBottomWidth: 1, 
        borderBottomColor: colors.lightGrey
    },
    averageItemParent: {
        borderBottomColor: colors.veryLightGrey,
        borderBottomWidth: 5,
        paddingBottom: 40,
        paddingHorizontal: 22
        // height: 150,
    },
    pricingInput: {
        // height: 40,
        width: '68%',alignItems: 'center', paddingLeft: 10, paddingRight: 10
    },
    pricingPicker: {
        // height: 40,
        width: '32%', paddingLeft: 10
    },
    pricingInputParent: {
        borderColor: colors.lightGrey,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
    },
    currencyPicker: {
        borderWidth: 1, 
        borderColor: colors.lightGrey,
        borderRadius: 5,
    }

});