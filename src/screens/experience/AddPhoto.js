import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import { Container, Content } from "native-base";
import { CustomButton, MyText, Loading } from '../../utils/Index';
import colors from '../../colors';

import { Styles } from "../host/host.style";


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, errorMessage, Request, urls } from '../../utils';

import { AppContext } from '../../../AppProvider';

import ProgressBar from '../../components/ProgressBar'



class AddPhoto extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false  };
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  

  updateExperience = async () => {
    const { tourOnboard } = this.context.state
    this.setState({ loading: true, errors: [] });
    const obj = {
        access: tourOnboard.access,
        expertise: tourOnboard.expertise,
        id: tourOnboard.id
    }
    const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
    console.log('update experience ', res)
    this.setState({ loading: false });
    if (res.isError || res.IsError) {
        errorMessage(res.message || res.Message)
    } else {
        this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
        this.props.navigation.navigate('TourStack', { screen: 'TourLanguage' })
    }  
  }
  

  

  render() {
    const { container, button, imageContainer, textContainer, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle, textBlack,
        textH4Style, textH5Style, textH2Style} = GStyles;
    const { ansOne, ansThree, ansTwo } = this.state
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title="Photos" />
            <View style={container}>
                <View style={{ marginTop: 20}}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 4 / 6</MyText>
                    <ProgressBar width={16.7 * 4} />
                    <ProgressBar width={100} />
                </View>
                <ScrollView>
                <View style={{ flex: 1, marginTop: 30 }}>
                    <View style={[{ paddingHorizontal: 1, marginBottom: 20}]}>
                        
                        <MyText style={[textH2Style, textGrey, textBold, { marginBottom: 15}]}>
                            Add Photos To Your Experience
                        </MyText>

                        <MyText style={[textH4Style, textGrey, { marginBottom: 15 }]}>Add at least 7 high-quality photos to 
                        show guests what it’s like to take your experience. They will be reviewed by our team so make sure 
                        they meet our photo standards.</MyText>

                    </View>

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
                            onPress={() => this.props.navigation.navigate('Other',{ screen: 'HirePhotographers'} )}
                        />
                        <Section 
                            style={{backgroundColor: colors.white, borderStyle: "dashed", borderWidth: 1, borderColor: colors.grey, overflow: "hidden"}} 
                            label={"I Can"}
                            title={"Take My Own Pictures"}
                            desciption={"Upload quality images from your device"}
                            hireStyle={{backgroundColor: colors.black,}}
                            titleStyle={textBlack}
                            desciptionStyle={textBlack}
                            image={require("./../../assets/images/img_upload/take_photo.png")}
                            onPress={() => this.props.navigation.navigate('TourPickImage')}
                        />

                    </Content>
                    
                </View>
                
                {/* <View style={button}>
                    <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.updateExperience} />
                </View> */}
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: Platform.OS === 'ios' ? 80 : 100,
        flex: 1, flexGrow: 1
    },
  
    button: {
        flex: 1, marginBottom: 40, marginTop: 20, justifyContent: 'flex-end'
    },
    imageContainer: {
        borderRadius: 10, borderColor: colors.orange, borderWidth: 4, width: '100%', height: 250, overflow: 'hidden',
    },
    textContainer: {
        paddingHorizontal: 10
    },
    progressContainer: {
        height: 8, width: '100%', backgroundColor: colors.lightGrey, borderRadius: 8, overflow: 'hidden', marginTop:10
    },
    progress: {
        height: '100%', backgroundColor: colors.orange
    },
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    }
});

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

export default AddPhoto;
