import React, { Component } from "react";
import { View, Icon, Text } from "native-base";
import { Image, Pressable } from "react-native";
import { Styles } from "./bookingProperty.style";
import colors from "../../colors";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class BookingPropertyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { textGrey, textH2Style, textH3Style, textBold, textDarkBlue, textH4Style, imgContainer, imgStyle, textCenter } = GStyles;
        return (
            <>
                <Pressable style={[Styles.parentView]} onPress={() => this.props.onClick && this.props.onClick()}>
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
                                {this.props.title}
                            </MyText>
                            <MyText style={[Styles.properyLocation]}>
                                {this.props.location}
                            </MyText>
                            <MyText style={[Styles.properyType]}>
                                {this.props.type}
                            </MyText>
                            <MyText style={[Styles.properyCheckinDays, textBold]}>
                                {this.props.dayLeft} days to Check-in
                            </MyText>
                        </View>
                        <Icon style={[Styles.iconSection]} name={"ios-ellipsis-vertical-sharp"} style={[Styles.icon]} />
                    </View>
                </Pressable>
            </>
        );
    }
}