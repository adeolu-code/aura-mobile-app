import React, { Component } from "react";
import { View, Icon, Text } from "native-base";
import { Image } from "react-native";
import { Styles } from "./bookingProperty.style";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class BookingPropertyCompoenent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { textGrey, textH2Style, textH3Style, textBold, textDarkBlue, textH4Style, imgContainer, imgStyle, textCenter } = GStyles;
        return (
            <>
                <View style={[Styles.parentView]}>
                    <View style={[Styles.imageView]}>
                        <Image 
                            source={require("./../../../assets/aura_property_3.png")} 
                            style={[Styles.imageStyle]} 
                            resizeMode={"contain"} 
                        />
                    </View>
                    <View style={[Styles.textSection]}>
                        <View style={[Styles.textView]}>
                            <MyText style={[Styles.properyTitle, textH4Style, textBold]}>
                                Umbaka Homes
                            </MyText>
                            <MyText style={[Styles.properyLocation]}>
                                Transcorp Hotels Abuja
                            </MyText>
                            <MyText style={[Styles.properyType]}>
                                Platinum Room
                            </MyText>
                            <MyText style={[Styles.properyCheckinDays, textBold]}>
                                10 days to Check-in
                            </MyText>
                        </View>
                        <Icon style={[Styles.iconSection]} name={"ios-ellipsis-vertical-sharp"} style={[Styles.icon]} />
                    </View>
                </View>
            </>
        );
    }
}