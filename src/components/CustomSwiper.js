import React, { useRef} from 'react'
import { View, Text, ScrollView, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import colors from '../colors';
import GStyles from '../assets/styles/GeneralStyles';
import { Card, MyText } from '../utils/Index';

const ScreenWidth = Dimensions.get('screen').width




export default function CustomSwiper(props) {
    const { slides } = props
    const scrollViewRef = useRef(null);
    const { textH4Style, textWhite, textBold } = GStyles
    const renderSlides = () => {
        return slides.map((slide, i) => {
            return (
                <View style={styles.slideStyles} key={i}>
                    <ImageBackground source={slide} style={styles.imageBgStyle}>
                        <View style={styles.contentContainer}>
                            
                            <View style={styles.overlayStyles}></View>
                            <View style={styles.cContainer}>
                                <View style={styles.countContainer}>
                                    <MyText style={[textH4Style, textWhite, textBold]}>{i+1}/{slides.length}</MyText>
                                </View>
                            </View>
                            
                        </View>
                    </ImageBackground>
                </View>
            )
        })
    }
    return (
        <View style={{ flex: 1}}>
            <ScrollView horizontal style={{ flex: 1}} pagingEnabled={true} showsHorizontalScrollIndicator={false} ref={scrollViewRef} >
                {renderSlides()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    slideStyles: {
        // width: '100%', flex: 1,
        // borderWidth: 1,
        width: ScreenWidth - 40, 
    },
    imageBgStyle: {
        width: '100%', height: '100%', 
    },
    contentContainer: {
        // paddingHorizontal: 20, 
        width: '100%', height: '100%', flex:1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: colors.lightBlack
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between', alignItems: 'flex-end', padding: 20
    },
    cContainer: {
        position: 'absolute', bottom: 20, right: 20
    },
    countContainer: {
        borderRadius: 30, paddingHorizontal: 20, paddingTop:10, paddingBottom: 12, backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
});
