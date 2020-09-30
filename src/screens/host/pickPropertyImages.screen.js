import React, { Component } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity, Image  } from "react-native";
import Header from "../../components/Header";
import { Container, Content, View, Icon } from "native-base";
import { MyText } from "../../utils/Index";
import GStyles from "./../../assets/styles/GeneralStyles";
import { Styles } from "./host.style";
import colors from "../../colors";

export default class PickPropertyImage extends Component {
    constructor() {
        super();
        
        this.state = {
            isCaptured: true,
        };
    }

    render() {
        const {
            textWhite,
            textBold,
            textCenter,
            textOrange,
            textH4Style,
            textGreen,
            textUnderline,
          } = GStyles;
        return (
            <>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
                    <Header 
                        {...this.props} 
                        title="Upload Your Pictures" 
                        sub={"Lorem Ipsum Text Lorenzo"}
                    />
                    <Container style={[Styles.container]}>
                        <Content>
                            <MyText style={[textGreen, textUnderline, {marginBottom: 10}]}>See Photography Tips</MyText>
                                <View style={[Styles.pickImageImageView, Styles.centerItems, (this.state.isCaptured && {backgroundColor: "transparent"}), {marginLeft: 20}]}>
                                    {
                                        !this.state.isCaptured ?
                                            <> 
                                                <Icon name={"md-image"} style={[Styles.galleryIcon]} />
                                            </>   
                                        :
                                            <View style={[Styles.picturesRowView]}>
                                                <View style={[Styles.miniSelectedImage, Styles.centerItems, {backgroundColor: colors.lightOrange}]}>
                                                    <Icon name={"add-circle-sharp"} style={[Styles.miniGalleryIcon]} />
                                                    <TouchableOpacity onPress={() => this.setState({isCaptured: true})}>
                                                        <MyText style={[textUnderline, textOrange]}>Add Photo</MyText>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[Styles.miniSelectedImageView]}>
                                                    <Image 
                                                        style={[Styles.miniSelectedImage]}
                                                        source={require("./../../assets/images/photo/photo.png")} 
                                                    />
                                                    <Icon name={"trash-sharp"} style={[Styles.trashIcon]} />
                                                </View>
                                                <View style={[Styles.miniSelectedImageView]}>
                                                    <Image 
                                                        style={[Styles.miniSelectedImage]}
                                                        source={require("./../../assets/images/photo/photo.png")} 
                                                    />
                                                    <Icon name={"trash-sharp"} style={[Styles.trashIcon]} />
                                                </View>
                                                <View style={[Styles.miniSelectedImageView]}>
                                                    <Image 
                                                        style={[Styles.miniSelectedImage]}
                                                        source={require("./../../assets/images/photo/photo.png")} 
                                                    />
                                                    <Icon name={"trash-sharp"} style={[Styles.trashIcon]} />
                                                </View>
                                                

                                            </View>
                                            
                                    }
                                    
                                </View>
                                {
                                    !this.state.isCaptured ?
                                        <TouchableOpacity 
                                            style={[Styles.nextButton, {marginTop: 10}]}
                                            onPress={() => this.setState({isCaptured: true})}
                                        >
                                            <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Choose A Picture</MyText>
                                        </TouchableOpacity>
                                    :
                                        <TouchableOpacity 
                                            style={[Styles.nextButton, {marginTop: 10}]}
                                            onPress={() => this.props.navigation.navigate('AddProfilePicture')}
                                        >
                                            <MyText style={[textWhite, textH4Style, textBold, textCenter]}>Next</MyText>
                                        </TouchableOpacity>
                                }
                        </Content>
                    </Container>
                </SafeAreaView>
            </>
        );
    }
}