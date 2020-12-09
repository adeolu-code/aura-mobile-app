import React, { Component } from "react";
import { View, Icon } from "native-base";
import { Image, Pressable } from "react-native";
import { Styles } from "./bookingProperty.style";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { consoleLog } from "../../utils";

export default class BookingPropertyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { textBold, textH4Style } = GStyles;
        let daysLeft = this.props.dayLeft;
        // if ((this.props.dayLeft < 1 && this.props.dayLeft > 0)) {
        //     daysLeft = "< 1 day left";
        // }
        // else if (this.props.dayLeft == 0) {
        //     daysLeft =  "Checked in";
        // }

        if (this.props.isExpired) {
            daysLeft =  "Expired";
        }
        else {
            daysLeft =  "";
        }

        return (
            <>
                <Pressable style={[Styles.parentView, {marginBottom: 5}]} onPress={() => this.props.onClick && this.props.onClick()}>
                    <View style={[Styles.imageView]}>
                        <Image 
                            source={this.props.image} 
                            style={[Styles.imageStyle]} 
                            resizeMode={"contain"} 
                        />
                    </View>
                    <View style={[Styles.textSection]}>
                        <View style={[Styles.textView]}>
                            <MyText style={[Styles.properyTitle, textH4Style, textBold, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                {this.props.title}
                            </MyText>
                            {
                                this.props.location != "" &&
                                <MyText style={[Styles.properyLocation, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                    {this.props.location}
                                </MyText>
                            }
                            {
                                (this.props.location == "" && this.props.amount != undefined) &&
                                <MyText style={[Styles.properyLocation, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                    NGN {this.props.amount}
                                </MyText>
                            }
                            
                            <MyText style={[Styles.properyType, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                {this.props.type}
                            </MyText>
                            <MyText style={[Styles.properyCheckinDays, textBold, {marginTop: 0}]}>
                                {daysLeft}
                            </MyText>
                        </View>
                        <Icon 
                            style={[Styles.iconSection]} 
                            name={"ios-ellipsis-vertical-sharp"} style={[Styles.icon]} 
                            onPress={() => this.props.onEllipsePress()}
                        />
                    </View>
                </Pressable>
            </>
        );
    }
}