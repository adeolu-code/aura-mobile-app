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
import { EXPERIENCE, HOST } from '../../utils';
import TermsModal from '../../components/dashboard/TermsModal';


export default class HostSlider extends Component{
    constructor(props) {
        super(props);

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
                "As a host, you can host your hotels and apartments on Aura, give detailed information about them, add beautiful pictures of the properties. People get to see your properties and they are able to book them.",
                "Sign up and host your restaurants on Aura, show the delicacies that you offer and People will order from you from this App.",
                "Be a tour guide to people on various locations of the country. Upload images and describe how the tour experience will be. Aura makes it easy for people to see your tours and book for them.",
            ],
            readMoreText: [
                "As a host, you can host your hotels and apartments on Aura, give detailed information about them, add beautiful pictures of the properties. People get to see your properties and they are able to book them.",
                "Sign up and host your restaurants on Aura, show the delicacies that you offer and People will order from you from this App.",
                "Be a tour guide to people on various locations of the country. Upload images and describe how the tour experience will be. Aura makes it easy for people to see your tours and book for them."
            ],
            currentIndex: 0,
            showTermsModal: false, type: ''
        };
    }

    indexChange = (index) => {
        this.setState({ currentIndex: index});
    }
    closeTermsModal = () => {
        this.setState({ showTermsModal: false })
    }

    handleNavigation = () => {
        switch (this.state.currentIndex) {
            case 0:
                // this.props.navigation.navigate("HostSteps")
                this.setState({ showTermsModal: true, type: HOST })
                break;
            case 1:
                this.props.navigation.navigate('RestaurantStack', {screen: 'AddRestaurant'})
                break;
            case 2:
                this.setState({ showTermsModal: true, type: EXPERIENCE })
                // this.props.navigation.navigate('Other', { screen: 'TermsOfService', params: { type: EXPERIENCE } })
                // btnText = "Host Experience";
                break;
        }
    }

    renderImages = () => {
        let { imgArr } = this.state;
        const { sliderImgContainer, overlayStyles } = Styles
        const { 
            textExtraBold, textH4Style, textCenter, textGrey, textH6Style, textH5Style,
            textGreen, textUnderline, textWhite,textBold
            } = GStyles
        let btnText = "";
        switch (this.state.currentIndex) {
            case 0:
                btnText = "Become A Host";
                break;
            case 1:
                btnText = "Host A Resturant";
                break;
            case 2:
                btnText = "Host An Experience";
                break;
        }
        return imgArr.map((item, index) => {
            return (
                <View key={index} style={{ paddingHorizontal: 20 }}>
                    <View style={sliderImgContainer} key={index}>
                        <Image source={item} style={[Styles.sliderImg]} resizeMode="contain" />
                    </View>
                    <View style={[Styles.dotView]}>
                        <View style={[Styles.dot, (this.state.currentIndex == 0 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        <View style={[Styles.dot, (this.state.currentIndex == 1 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        <View style={[Styles.dot, (this.state.currentIndex == 2 ? Styles.activeDot: Styles.inActiveDot)]}></View>
                        {/* <View style={[Styles.dot, (this.state.currentIndex == 3 ? Styles.activeDot: Styles.inActiveDot)]}></View> */}
                    </View>
                    <View style={[Styles.textBodyView]}>
                        <MyText style={[textH4Style, textExtraBold, textCenter]}>
                            {this.state.titleText[this.state.currentIndex]}
                        </MyText>
                        <MyText style={[textH5Style, textCenter, textGrey, { marginTop: 20} ]}>
                            {this.state.descriptionText[this.state.currentIndex]}
                        </MyText>
                        {/* <MyText style={[textH6Style, textCenter, textGreen, textUnderline, {marginTop: 10}]}>
                            {this.state.readMoreText[this.state.currentIndex]}
                        </MyText> */}
                        {
                            <TouchableOpacity 
                                style={[Styles.nextButton, {marginTop: 30, backgroundColor: colors.black }]}
                                onPress={() => this.handleNavigation()}
                            >
                                <MyText style={[textWhite, textH4Style, textBold, textCenter]}>
                                    {
                                        btnText
                                    }
                                </MyText>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity>

                        </TouchableOpacity>
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
                            style={{height: '100%' }} 
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
                <TermsModal visible={this.state.showTermsModal} onDecline={this.closeTermsModal} {...this.props} type={this.state.type} />
            </SafeAreaView>
            </>
            
        );
    }
}