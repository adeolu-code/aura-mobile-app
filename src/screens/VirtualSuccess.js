import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, 
  Dimensions, FlatList, SafeAreaView } from 'react-native';
import GStyles from '../assets/styles/GeneralStyles';
import { Input, Picker } from "native-base";

import Header from '../components/Header';


import { MyText, Spinner, Loading, CustomButton, CustomInputNew, CustomInput, CountryPickerNew } from '../utils/Index';
import colors from '../colors';

import { Icon } from 'native-base';
import ItemComponent from '../components/explore/explore_all/ItemComponent';
import { urls, GetRequest } from '../utils'

class VirtualSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photographers: [], totalItems: 0, activePage: 1, perPage: 10, pageCount: 0, loading: false, loadMore: false, type: ''
    };
    this.state.type = props.route.params?.type
    // console.log(this.state.type)
  }
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack()
    
  }
  linkToPhoto = (photo) => {
    this.props.navigation.navigate('Other', { screen: 'PhotoSingle', params: { photo } })
  }
  renderLoading = () => {
      const { loading } = this.state;
      if (loading) { return (<Loading wrapperStyles={{ height: '100%', width: '100%', zIndex: 100 }} />); }
  }
  submit = () => {
    this.props.navigation.navigate('Tabs', {screen: 'Explore', params: { screen: 'Explore'} })
  }
  
  componentDidMount = () => {

  }

  
  render() {
    const {filterContainer, container, contentContainer, contentMainContainer } = styles
    const { textH3Style, textExtraBold, textH4Style, textDarkGrey, flexRow, textWhite, textH1Style, 
      textH2Style, textH5Style, textXlStyle, textCenter, textBold, textUnderline, textOrange } = GStyles
    const { photographers } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
        <ImageBackground source={require('../assets/images/bg_virtual.png')} style={container}>
          <ScrollView>
            <View style={contentContainer}>

              <View style={styles.imageContainer}>
                <Image source={require('../assets/images/confetti.png')} style={{ width: '100%', height: '100%' }} />
              </View>

              <View>
                <MyText style={[textH2Style, textCenter, textExtraBold, textDarkGrey]}>Registration Successful</MyText>
                <MyText style={[textH4Style,  textCenter, { marginTop: 10}]}>Thank you, your virtual registration was successful</MyText>
                
                
              </View>
              <View style={{ marginBottom: 60, marginTop: 80 }}>
                <CustomButton buttonText="Click to continue" buttonStyle={{ paddingTop: 20, paddingBottom: 20 }} onPress={this.submit} />
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
    paddingHorizontal: 30, paddingTop: 40, justifyContent: 'center'
  },
  imageContainer: {
    width: 250, height: 350, alignSelf: 'center', marginTop: 40
  }
  
});

export default VirtualSuccess;
