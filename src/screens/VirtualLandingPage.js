import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, Linking,
  Dimensions, FlatList, SafeAreaView } from 'react-native';
import GStyles from '../assets/styles/GeneralStyles';

import Header from '../components/Header';
import moment from 'moment';

import { MyText, Spinner, Loading, CustomButton } from '../utils/Index';
import colors from '../colors';

import { Icon } from 'native-base';
import ItemComponent from '../components/explore/explore_all/ItemComponent';
import { urls, GetRequest } from '../utils'

class VirtualLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
    // console.log(this.state.type)
  }
  
  linkTo = () => {
    this.props.navigation.navigate('Tabs', {screen: 'Explore', params: { screen: 'Explore'} })
  }
  linkToRegister = () => {
    this.props.navigation.navigate('VirtualRegistration')
  }
  linkToPrivacy = async () => {
    const url = 'https://aura.transcorphotels.com/privacy'
    try {
        await Linking.openURL(url);
    } catch (error) {
        Alert.alert(`Don't know how to open this URL: ${url}`);
    }

  }
  updateTimer = () => {
      const requiredDate = new Date(2021, 6, 8, 18, 0)
      
      this.x = setInterval(()=>{
        const timeNeeded = moment(requiredDate).unix();
        const timeLeft = timeNeeded - moment().unix();
          // console.log('Updating timer ', this.timeInSecs())
        if(timeLeft <= 0){
            clearInterval(this.x)
            this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        } else {
            const eventDate = moment.duration(timeLeft - 1, "seconds");
            const days = eventDate.days()
            const hours = eventDate.hours()
            const minutes = eventDate.minutes()
            const seconds = eventDate.seconds()
            this.setState({ minutes, days, hours, seconds })
            // console.log(this.state)
        }
      },1000)
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
  }
  
  componentDidMount = () => {
    this.updateTimer()
  }
  componentWillUnmount = () => {
      clearInterval(this.x)
  }

  
  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey, flexRow, textWhite, textH1Style, 
      textH2Style, textH5Style, textXlStyle, textCenter, textBold, textUnderline, textOrange } = GStyles
    const { photographers } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
        <ImageBackground source={require('../assets/images/aura_bg.png')} style={container}>
          <ScrollView>
          <View style={contentContainer}>
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/aura_white_logo.png')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
            </View>
            <View>
              <MyText style={[textExtraBold, textH1Style, textWhite]}>Say hello to your {'\n'}new adventure</MyText>
              <MyText style={[textH4Style, textWhite, { marginTop: 20}]}>We are thrilled to tell you all about Aura by Transcorp Hotels, 
                your plug for quality accommodation, great food and experiences to treasure.
              </MyText>
              <View style={[flexRow, styles.timerStyles]}>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10, alignItems: 'center' }}>
                  <MyText style={[textExtraBold, textXlStyle, textWhite]}>{this.state.days}</MyText>
                  <MyText style={[textH5Style, textWhite]}>Days</MyText>
                </View>
                <MyText style={[textExtraBold, textXlStyle, textWhite, { alignSelf: 'flex-start'}]}>:</MyText>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10, alignItems: 'center' }}>
                  <MyText style={[textExtraBold, textXlStyle, textWhite]}>{this.state.hours}</MyText>
                  <MyText style={[textH5Style, textWhite ]}>Hours</MyText>
                </View>
                <MyText style={[textExtraBold, textXlStyle, textWhite, { alignSelf: 'flex-start'}]}>:</MyText>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10, alignItems: 'center' }}>
                  <MyText style={[textExtraBold, textXlStyle, textWhite]}>{this.state.minutes}</MyText>
                  <MyText style={[textH5Style, textWhite]}>Minutes</MyText>
                </View>
                <MyText style={[textExtraBold, textXlStyle, textWhite, { alignSelf: 'flex-start'}]}>:</MyText>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10, alignItems: 'center' }}>
                  <MyText style={[textExtraBold, textXlStyle, textWhite]}>{this.state.seconds}</MyText>
                  <MyText style={[textH5Style, textWhite]}>Seconds</MyText>
                </View>
              </View>

              <MyText style={[textH3Style, textExtraBold, textWhite]}>Join us on July 8 at 6PM to see how Aura works</MyText>

              <View style={{ marginTop: 40}}>
                <View style={{ marginBottom: 20}}>
                  <CustomButton buttonText="Register for Virtual Launch" buttonStyle={{ paddingTop: 20, paddingBottom: 20}} onPress={this.linkToRegister} />
                </View>
                <CustomButton buttonText="Check Out Aura" buttonStyle={{ paddingTop: 20, paddingBottom: 20, backgroundColor: '#253858'}} onPress={this.linkTo} />
              </View>

              <View style={{ marginTop: 30, marginBottom: 40, paddingHorizontal: 20}}>
                <MyText style={[textCenter, textWhite]}>Your information is private and protected. Click to view our {' '}  
                  <MyText style={[textBold, textOrange, textUnderline ]} onPress={this.linkToPrivacy}>Privacy Policy</MyText>
                </MyText>
              </View>
            </View>
          </View>
          </ScrollView>
        </ImageBackground>
        {/* {this.renderLoading()} */}
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20, 
    width: '100%', height: '100%'
  },
  logoContainer: {
    width: 100, height: 50, marginBottom: 30
  },
  contentContainer: {
    paddingHorizontal: 30, paddingTop: 60
  },
  timerStyles: {
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, marginTop: 30,
    paddingVertical: 20, marginBottom: 30
  }
  
});

export default VirtualLandingPage;
