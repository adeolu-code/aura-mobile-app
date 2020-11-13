import React, { Component } from "react";
import { View, Icon } from "native-base";
import { Image, Pressable } from "react-native";
import { Styles } from "./bookingProperty.style";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class BookingPropertyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { textBold, textH4Style } = GStyles;
        let daysLeft = this.props.dayLeft;
        if ((this.props.dayLeft < 1 && this.props.dayLeft > 0)) {
            daysLeft = "< 1 day left";
        }
        else if (this.props.dayLeft == 0) {
            daysLeft =  "Checked in";
        }

        return (
            <>
                <Pressable style={[Styles.parentView]} onPress={() => this.props.onClick && this.props.onClick()}>
                    <View style={[Styles.imageView]}>
                        <Image 
                            source={this.props.image} 
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
                                {daysLeft}
                            </MyText>
                        </View>
                        <Icon style={[Styles.iconSection]} name={"ios-ellipsis-vertical-sharp"} style={[Styles.icon]} />
                    </View>
                </Pressable>
            </>
        );
    }
}