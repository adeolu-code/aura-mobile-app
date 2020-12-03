/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import Swiper from "react-native-swiper";
import colors from "../../colors";
import { Styles } from "./host.style";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Container, Content, Text, View } from "native-base";
import { Image, SafeAreaView, TouchableOpacity } from "react-native";
import Header from "../../components/Header";
import { MyText } from "../../utils/Index";

export default class HostSlider extends Component{
    constructor() {
        super();

        this.state = {
            imgArr: [
                require('../../assets/images/profile/objects/OBJECTS_2x.png'), 
                require('../../assets/images/profile/restaurant/restaurant_2x.png'), 
                require('../../assets/images/profile/Group4613/Group4613_2x.png'),
            ],
            titleText: [
                "Host your Home Or Hotel Easily",
                "Host Your Resturant",
                "Host An Experience",
            ],
            descriptionText: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
            ],
            readMoreText: [
                "Read more about hosting a home or hotel",
                "Read more about hosting a resturant",
                "Read more about hosting a resturant",
            ],
            currentIndex: 0,
        };
    }

    indexChange = (index) => {
        this.setState({ currentIndex: index})
        
    }

    renderImages = () => {
        const { imgArr } = this.state;
        const { sliderImgContainer, overlayStyles } = Styles
        const { 
            textExtraBold, textH4Style, textCenter, textGrey, textH6Style,
            textGreen, textUnderline, textWhite,textBold
            } = GStyles
        return imgArr.map((item, index) => {
            return (
                <View key={index}>
                    <View style={sliderImgContainer} key={index}>
                        <Image source={item} style={[Styles.sliderImg]} resizeMode="contain" />
                    </View>
                    <View style={[Styles.dotView]}>
                        <View style={[Styles.dot, (this.state.currentIndex == 0 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        <View style={[Styles.dot, (this.state.currentIndex == 1 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        <View style={[Styles.dot, (this.state.currentIndex == 2 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                    </View>
                    <View style={[Styles.textBodyView]}>
                        <MyText style={[textH4Style, textExtraBold, textCenter]}>
                            {this.state.titleText[this.state.currentIndex]}
                        </MyText>
                        <MyText style={[textH6Style, textCenter, textGrey]}>
                            {this.state.descriptionText[this.state.currentIndex]}
                        </MyText>
                        <MyText style={[textH6Style, textCenter, textGreen, textUnderline, {marginTop: 10}]}>
                            {this.state.readMoreText[this.state.currentIndex]}
                        </MyText>
                        {
                            (this.state.currentIndex == this.state.imgArr.length - 1) &&
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 30, backgroundColor: colors.black}]}
                                onPress={() => this.props.navigation.navigate("HostSteps")}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Become A Host</MyText>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            )
        })
    }

    render() {
        return (
            <>
            <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                <Header {...this.props} title="" />
                <Container style={[Styles.sliderContainer]}>
                    <Content scrollEnabled>
                        <Swiper 
                            style={{height: '100%'}} 
                            showsButtons={false} 
                            index={0} 
                            activeDotColor={colors.green} 
                            showsPagination={false} 
                            onIndexChanged={this.indexChange} 
                            loop={false}    
                        >
                            {this.renderImages()}
                        </Swiper>
                    </Content>
                </Container>
                </SafeAreaView>
            </>
            
        );
    }
}