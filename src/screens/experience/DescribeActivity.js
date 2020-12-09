import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity, Image, ScrollView, Platform, Keyboard } from 'react-native';
import {Icon, Picker} from 'native-base';
import { CustomButton, MyText, Loading, CustomInput } from '../../utils/Index';
import colors from '../../colors';


import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { GOOGLE_API_KEY, GetRequest, errorMessage, urls,Request } from '../../utils';

import { AppContext } from '../../../AppProvider';
import ProgressBar from '../../components/ProgressBar';
import AboutComponent from '../../components/experience/AboutComponent';
import DescribeComponent from '../../components/experience/DescribeComponent';
import AddDetailsComponent from '../../components/experience/AddDetailsComponent';
import WhatToBringComponent from '../../components/experience/WhatToBringComponent';
import ExperienceTitleComponent from '../../components/experience/ExperienceTitleComponent';


class DescribeActivity extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loading: false, experience: null, experienceDescription: '', story: '', guestPreExperienceInfomration:'',
     experienceProvisions: '', guestShouldBring: [], title: '',
     isCaptured: false, count: 1 };
    this.state.experience = props.route.params?.experience
  }
  renderLoading = () => {
    const { loading } = this.state;
    if(loading) { return (<Loading />) }
  }
  goBack = () => {
    const { count } = this.state;
    switch (count) {
      case 1:
          this.props.navigation.goBack();
          break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        this.setState({ count: count - 1 });
        break;
      default:
        this.props.navigation.goBack();
        return ''
    }
  }
  
  next = () => {
    this.props.navigation.navigate('TourStack', { screen: 'TourExpertise' })
  }
  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }
  updateExperience = async () => {
    // this.props.navigation.navigate('TourAddImages')
    Keyboard.dismiss()
    const { tourOnboard } = this.context.state
    this.setState({ loading: true });
    const obj = {
        experienceDescription: this.state.experienceDescription,
        id: tourOnboard.id
    }
    const res = await Request(urls.experienceBase, `${urls.v}Experience/update`, obj );
    console.log('update experience ', res)
    this.setState({ loading: false });
    if (res.isError || res.IsError) {
        errorMessage(res.message || res.Message)
    } else {
        this.context.set({ tourOnboard: { ...tourOnboard, ...res.data }})
        this.setState({ count: 2 })
    }  
  }

  description = () => {
    const { container, button, textContainer, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
      return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <View style={[{ paddingHorizontal: 1}]}>
                    <MyText style={[textH4Style, textGrey, { marginBottom: 15, marginTop: 15}]}>
                        Your activity description is a chance to inspire guests to take your experience. 
                        Think about it like a story, with a beginning, middle, and end.
                    </MyText>
                    <MyText style={[textH3Style, textGrey,textBold, { marginBottom: 20}]}>Describe your experience</MyText>
                    

                    <View style={textContainer}>
                        <View style={[flexRow, { alignItems: 'center', marginBottom: 8, }]}>
                            <MyText style={[textH4Style, textGrey, { alignSelf: 'flex-start', marginRight: 5}]}>1. </MyText>
                            <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                First, briefly describe what you’ll do with your guests. 
                                What unique details set it apart from other similar experiences?
                            </MyText>
                        </View>
                        <View style={[flexRow, { alignItems: 'center', marginBottom: 8}]}>
                            <MyText style={[textH4Style, textGrey, { alignSelf: 'flex-start', marginRight: 5}]}>2. </MyText>
                            <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Then, get more specific. How will you kick things off? How will you make 
                                guests feel included and engaged during your time together?
                            </MyText>
                        </View>
                        <View style={[flexRow, { alignItems: 'center', marginBottom: 8}]}>
                            <MyText style={[textH4Style, textGrey, { alignSelf: 'flex-start', marginRight: 5}]}>3. </MyText>
                            <MyText style={[textH4Style, textGrey, {flexWrap: 'wrap', flex: 1}]}>
                                Finally, say what you want guests to leave with. 
                                Friends? Knowledge? A greater appreciation for your culture? End with a strong selling point.
                            </MyText>
                        </View>
                        
                    </View>

                    <View>
                        <CustomInput placeholder="What we'll do" textInputStyle={{ height: 150, marginBottom:10 }} textAlignVertical="top" 
                        value={this.state.experienceDescription} onChangeText={this.onChangeValue} attrName="experienceDescription" />
                    </View>
                    <View>
                        <CustomButton buttonText="Save" 
                        buttonStyle={{ elevation: 2, marginBottom: 30 }}
                        // textStyle={{ color: colors.orange, fontFamily: 'Nunito-Bold' }} 
                        onPress={this.updateExperience} 
                        disabled={!this.state.experienceDescription} />
                    </View>

                </View>
                
            </View>
      )
  }
  setLoader = (bool) => {
    this.setState({ loading: bool })
  }
  getStoryValue = (story) => {
    this.setState({story})
  }
  getDValue = (guestPreExperienceInfomration) => {
    this.setState({ guestPreExperienceInfomration })
  }
  getAddValue = (experienceProvisions) => {
    this.setState({ experienceProvisions })
  }
  getWhatValue = (guestShouldBring) => {
    this.setState({ guestShouldBring })
  }
  getTitleValue = () => {
      
  }

  setCount = (count) => {
      this.setState(count)
  }
  renderSteps = () => {
      const { count } = this.state;
      switch (count) {
        case 1:
            return this.description()
        case 2:
            return <AboutComponent loading={this.setLoader} {...this.props} getValue={this.getStoryValue} setCount={this.setCount} />
        case 3:
            return <DescribeComponent loading={this.setLoader} {...this.props} getValue={this.getDValue} setCount={this.setCount} />
        case 4:
            return <AddDetailsComponent loading={this.setLoader} {...this.props} getValue={this.getAddValue} setCount={this.setCount} />
        case 5:
            return <WhatToBringComponent loading={this.setLoader} {...this.props} getValue={this.getWhatValue} setCount={this.setCount} />
        case 6:
            return <ExperienceTitleComponent loading={this.setLoader} {...this.props} getValue={this.getTitleValue} setCount={this.setCount} />
        default:
            break;
      }
  }

  renderTitle = () => {
      const { count } = this.state;
      switch (count) {
        case 1:
            return "What we'll do"
        case 2:
            return "About You"
        case 3:
            return "Where we’ll be"
        case 4:
            return "Add details about what you’ll provide";
        case 5:
            return 'What guest should bring';
        case 6:
            return 'Give Your Experience A Title'
        default:
            return ''
      }
  }
  

  render() {
    const { container, button, textContainer, icon } = styles;
    const { textGrey, flexRow, textOrange, textUnderline, textBold, textWhite, textH3Style, imgStyle,
        textH4Style, textH5Style, textH6Style} = GStyles;
    const { experienceDescription, isCaptured, count } = this.state

    const percent = count/6 * 100
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            {this.renderLoading()}
            <Header { ...this.props } title={this.renderTitle()} onPress={this.goBack} />
            <View style={container}>
                <View style={{ marginTop: count === 4 || count === 6 ? 75 : 30 }}>
                    <MyText style={[textOrange, textBold, textH3Style]}>Step 4 / 6</MyText>
                    <ProgressBar width={75} />
                    <ProgressBar width={percent} />
                </View>
                <ScrollView keyboardShouldPersistTaps="always">
                    {this.renderSteps()}
                
                    <View style={button}>
                        <CustomButton buttonText="Next" buttonStyle={{ elevation: 2}} onPress={this.next} 
                        disabled={this.state.count !== 6} />
                    </View>
                </ScrollView>
            </View>
            
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: 24, marginTop: 100,
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
    icon: {
        fontSize: 8, marginRight: 15, color: colors.grey
    }
});

export default DescribeActivity;
