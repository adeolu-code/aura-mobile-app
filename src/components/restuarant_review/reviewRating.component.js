import { Icon, View } from "native-base";
import React, { Component } from "react"
import { TouchableOpacity, Image } from "react-native";
import { AppContext } from "../../../AppProvider";
import { MyText } from "../../utils/Index";
import GStyles from "../../assets/styles/GeneralStyles";
import { Styles } from "./reviewRating.style";

export default class RestaurantReviewRating extends Component {
    static contextType = AppContext;
    
    constructor() {
        super();
        
        this.state = {
            
        };
    }

    render() {
        const {textBold } = GStyles;
        const alert = (this.props.alert == undefined) ? false : ((this.props.alert) ? true : false);
        const rating = (this.props.rating == undefined) ? false : ((this.props.rating) ? true : false);
        return (
            <TouchableOpacity
                style={[Styles.parentView, (alert ? Styles.alertView: undefined)]}
                onPress={() => this.props.onPress() && this.props.onPress()}
            >
                <View style={[Styles.iconParent ]}>
                    <Image style={[Styles.alertIcon]} source={this.props.imageSource} />
                </View>
                
                <View style={[Styles.middleSection]}>
                    {
                        this.props.user &&
                        <MyText style={[textBold, Styles.title]}>{this.props.user}</MyText>
                    }
                    {
                        rating ?
                            <View>
                                {this.props.child}
                            </View>
                        :
                            <MyText style={[Styles.content]}>
                                {this.props.comment}
                            </MyText>
                    }
                </View>
                {
                    this.props.date &&
                    <MyText style={[Styles.time]}>{this.props.date}</MyText>
                }
                
            </TouchableOpacity>
        );
    }
}