import { StyleSheet } from "react-native";
import colors from "../../colors";
import { GLOBAL_PADDING } from "../../utils";

export const Styles = StyleSheet.create({
    container: {
        marginTop: 140,
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
        flexDirection: "row",
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
        borderBottomWidth: 1,
        paddingBottom: 10,
        padding: GLOBAL_PADDING,
    },
    topView: {
        flexDirection: "row",
    },
    completedView: {
        flexDirection: "row",
        alignItems: "center",
        flex: 0.4,
    },
    completedIcon: {
        color: colors.green,
    },
    reviewView: {
        padding: GLOBAL_PADDING,
    },
    propertyContainer: {
        width: '100%', padding: 20, backgroundColor: colors.white, elevation: 2, borderRadius: 8
    },
    imgContainer: {
        width: 120, height: 110, borderRadius: 6, overflow: 'hidden', marginRight: 20,
        borderWidth: 1
    },

    //slider
    sliderContainer: {
        marginTop: 100,
        padding: GLOBAL_PADDING,
        paddingBottom: 10,
    },
    sliderImgContainer: {
        width: '100%', height: 200, borderRadius: 10, overflow: 'hidden'
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
        height: 10,
        width: 10,
        borderRadius: 50,
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
        height: 200,
        width: "100%",
        flexDirection: "row",
        marginBottom: 20,
        borderRadius: 5,
    },
    imageView: {
        flex: 0.4,
        alignItems: "center",
        paddingTop: 30,
        paddingRight: 20,
        
    },
    contentView: {
        flex: 0.6,
        
    },
    cameraImage: {
        width: 115,
        height: 200,
    },
    hireView: {
        
        height: 40,
        width: 100,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    lowerTextView: {
        paddingTop: 10,
        padding: 10,
    },

    //pick image
    centerItems: {
        alignItems: "center",
        justifyContent: "center",
    },
    galleryIcon: {
        color: colors.orange,
        fontSize: 120,
    },
    miniGalleryIcon: {
        color: colors.orange,
        fontSize: 40,
    },
    pickImageImageView: {
        height: 250,
        width: "100%",
        backgroundColor: colors.lightOrange,
        marginBottom: 5,
        marginLeft: 5,
    },
    miniPickImageImageView: {
        height: 120,
        width: 140,
        backgroundColor: colors.lightOrange,
        borderRadius: 5,
        
    },
    picturesRowView: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    miniSelectedImage: {
        height: 120,
        width: 120,
        marginLeft: 5,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    miniSelectedImageView: {
        justifyContent: "flex-end",
    },
    trashIcon: {
        backgroundColor: colors.white,
        width: 25,
        height: 25,
        borderRadius: 50,
        color: colors.black,
        padding: 5,
        position: "absolute",
        alignSelf: "flex-end",
        fontSize: 16,
        right: 5,
        bottom: 10,
    }

});