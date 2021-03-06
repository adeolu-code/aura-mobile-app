import { Container, Content, View } from "native-base";
import React, { Component } from "react";
import { Image, SafeAreaView, TouchableOpacity } from "react-native";
import colors from "../../colors";
import Header from "../../components/Header";
import { MyText } from "../../utils/Index";
import { Styles } from "../host/host.style";
import GStyles from "../../assets/styles/GeneralStyles";

export default class RestaurantUploadImage extends Component {
    constructor() {
        super();

        this.state = {};
    }
    componentDidMount = () => {
        
    }


    render() {
        console.log("this.props.navigation?.route?.params?.nextScreen", this.props.route?.params?.nextScreen);
        const {
            textWhite,
            textBlack,
          } = GStyles;
        return(
            <>
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    
                    <Header {...this.props} title="Upload Quality Photos" sub={"Catch guests’ attention with high quality images."} />
                    
                    <Container style={[Styles.container, {marginTop: 180}]}>
                        <Content scrollEnabled>
                            <Section 
                                style={{backgroundColor: colors.lightGreen, marginBottom: 40}} 
                                label={"Hire A"}
                                title={"Photographer"}
                                desciption={"You can always use Aura photographers"}
                                hireStyle={{backgroundColor: colors.fadedGreen,}}
                                titleStyle={textWhite}
                                desciptionStyle={textWhite}
                                image={require("./../../assets/images/img_upload/photograph.png")}
                                onPress={() => this.props.navigation.push('Other', { screen: 'HirePhotographers', params:{type: 'restaurant'} }) }
                            />
                            <Section 
                                style={{backgroundColor: colors.white, borderStyle: "dashed", borderWidth: 1, borderColor: colors.grey, overflow: "hidden"}} 
                                label={"I Can"}
                                title={"Take My Own Pictures"}
                                desciption={"Upload pictures from your gallery or take a picture."}
                                hireStyle={{backgroundColor: colors.black,}}
                                titleStyle={textBlack}
                                desciptionStyle={textBlack}
                                image={require("./../../assets/images/img_upload/take_photo.png")}
                                onPress={() => this.props.navigation.navigate(this.props.route?.params?.nextScreen, {new: this.props.route?.params?.new, profileId: this.props.route?.params?.profileId})}
                            />

                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}

const Section = (props) => {
    const {
        textWhite, textH3Style,
        textBold,
        textH2Style,
        textExtraBold,
        textH5Style,
      } = GStyles;
    return (
        <TouchableOpacity style={[Styles.sectionView, props.style]} onPress={() => props.onPress && props.onPress()}>
            <View style={[Styles.contentView]}>
                <View style={[Styles.hireView, props.hireStyle]}>
                    <MyText style={[textBold,textWhite]}>
                        {props.label}
                    </MyText>
                </View>
                <View style={[Styles.lowerTextView]}>
                    <MyText style={[textExtraBold,textH3Style,{ marginBottom: 10}, props.titleStyle ]}>{props.title}</MyText>
                    <MyText style={[textH5Style,props.desciptionStyle]}>
                    {props.desciption}
                    </MyText>
                </View>
            </View>
            <View style={[Styles.imageView]}>
                <Image 
                    source={props.image} 
                    resizeMode={"contain"}
                    style={[Styles.cameraImage]}
                />
            </View>
        </TouchableOpacity>
    );
}