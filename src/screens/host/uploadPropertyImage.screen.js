import { Container, Content, View } from "native-base";
import React, { Component } from "react";
import { Image, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import colors from "../../colors";
import Header from "../../components/Header";
import { MyText } from "../../utils/Index";
import { Styles } from "./host.style";
import GStyles from "./../../assets/styles/GeneralStyles";

export default class UploadPropertyImage extends Component {
    constructor() {
        super();

        this.state = {};
    }


    render() {
        const {
            textWhite,
            textBlack,
          } = GStyles;
        return(
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header {...this.props} title="Upload Quality Photos" sub={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} />
                    <Container style={[Styles.container, {marginTop: 180}]}>
                        <Content scrollEnabled>
                            <Section 
                                style={{backgroundColor: colors.lightGreen}} 
                                label={"Hire A"}
                                title={"Photographer"}
                                desciption={"Lorem ipsum dolor sit amet, consectetur adipiscing."}
                                hireStyle={{backgroundColor: colors.fadedGreen,}}
                                titleStyle={textWhite}
                                desciptionStyle={textWhite}
                                image={require("./../../assets/images/profile/Group3990/Group3990_2x.png")}
                            />
                            <Section 
                                style={{backgroundColor: colors.white, borderStyle: "dashed", borderWidth: 1, overflow: "hidden"}} 
                                label={"I Can"}
                                title={"Take My Own Pictures"}
                                desciption={"Lorem ipsum dolor sit amet, consectetur adipiscing."}
                                hireStyle={{backgroundColor: colors.black,}}
                                titleStyle={textBlack}
                                desciptionStyle={textBlack}
                                image={require("./../../assets/images/profile/Component125-1/Component125–1_2x.png")}
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
        textWhite,
        textBold,
        textH2Style,
        textExtraBold,
        textH5Style,
      } = GStyles;
    return (
        <TouchableOpacity style={[Styles.sectionView, props.style]}>
            <View style={[Styles.contentView]}>
                <View style={[Styles.hireView, props.hireStyle]}>
                    <MyText style={[textBold,textWhite]}>
                        {props.label}
                    </MyText>
                </View>
                <View style={[Styles.lowerTextView]}>
                    <MyText style={[textExtraBold,textH2Style,props.titleStyle]}>{props.title}</MyText>
                    <MyText style={[textH5Style,props.desciptionStyle]}>
                    {props.desciption}
                    </MyText>
                </View>
            </View>
            <View style={[Styles.imageView]}>
                <Image 
                    source={props.image} 
                    resizeMode={"center"}
                    style={[Styles.cameraImage]}
                />
            </View>
        </TouchableOpacity>
    );
}