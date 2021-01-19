import React, { Component } from "react";
import { View, Icon } from "native-base";
import { Image, Pressable } from "react-native";
import { Styles } from "./bookingProperty.style";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { consoleLog } from "../../utils";
import moment from "moment";

export default class BookingPropertyComponent extends Component {
    constructor(props) {
        super(props);
        consoleLog("props", props);
        console.log(props)
        this.state = {}
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

        const def = (this.props.def == undefined) ? true : ((this.props.def) ? def : true);
        const ellipsis = (this.props.ellipsis == undefined) ? true : ((this.props.ellipsis) ? this.props.ellipsis : false);
        // const title = (this.props.title == undefined) ? "" : ((this.props.title === true) ? this.props.ellipsis : false);

        return (
            <>
                <Pressable style={[Styles.parentView, {marginBottom: 5 }]} onPress={() => this.props.onClick && this.props.onClick()}>
                    <View style={[Styles.imageView]}>
                        <Image source={this.props.image}  style={[Styles.imageStyle]} resizeMode={"cover"} />
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
                            <MyText style={[Styles.properyType, {padding: 0, paddingLeft: 2, paddingRight: 2}]}>
                                {
                                    def === true ?
                                        moment(this.props.date).format("YYYY/MM/DD")
                                    :
                                        moment(this.props.date).format(def)
                                }
                            </MyText>
                            <MyText style={[Styles.properyCheckinDays, textBold, {marginTop: 0}]}>
                                {daysLeft}
                            </MyText>
                        </View>
                        {
                            ellipsis
                            &&
                             <Icon 
                                style={[Styles.iconSection]} 
                                name={"ios-ellipsis-vertical-sharp"} style={[Styles.icon]} 
                                onPress={() => this.props.onEllipsePress()}
                            />
                        }
                        
                    </View>
                </Pressable>
            </>
        );
    }
}