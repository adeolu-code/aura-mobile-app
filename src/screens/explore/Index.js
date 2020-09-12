import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  MyText,
  CustomButton,
  CustomInput,
  SearchInput,
} from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';

import ScrollHeader from '../../components/explore/ScrollHeader';
import ScrollContent from '../../components/explore/ScrollContent';
import ScrollContentFood from '../../components/explore/ScrollContentFood';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      headerBg,
      searchContainer,
      placeAroundContainer,
      headerContainer,
      scrollContainer,
      buttonContainer,
      buttonStyle,
      foodContainer,
      foodBgStyles,
      textContainer,
      foodAroundContainer,
      placeStayContainer,
    } = styles;
    const {
      textWhite,
      textH1Style,
      textExtraBold,
      marginBottomSmall,
      marginTopLarge,
      textH2Style,
      textH4Style,
      lineHeightText,
    } = GStyles;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <ImageBackground
            source={require('../../assets/images/mask/mask.png')}
            style={[headerBg]}>
            <MyText
              style={[
                textWhite,
                textExtraBold,
                textH1Style,
                marginBottomSmall,
                marginTopLarge,
              ]}>
              Book unique places
            </MyText>
            <MyText style={[textWhite, textH2Style, marginBottomSmall]}>
              to stay and things to do
            </MyText>
            <View style={searchContainer}>
              <SearchInput placeholder="Location, landmark, address" />
            </View>
          </ImageBackground>

          <View style={placeAroundContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to stay around you" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent />
            </View>
            <View style={buttonContainer}>
              <CustomButton
                buttonText="View More Places"
                iconName="arrow-right"
                buttonStyle={buttonStyle}
              />
            </View>
          </View>

          <ImageBackground
            source={require('../../assets/images/food_bg/food_bg.png')}
            style={foodBgStyles}>
            <View style={foodContainer}>
              <View style={headerContainer}>
                <ScrollHeader title="Good food & restaurants" white />
              </View>
              <View style={textContainer}>
                <MyText style={[textWhite, textH4Style, lineHeightText]}>
                  Curabitur vulputate arcu odio, ac facilisis diam accumsan ut.
                  Ut imperdiet et leo in vulputate.
                </MyText>
              </View>

              <View style={scrollContainer}>
                <ScrollContentFood />
              </View>
              <View style={buttonContainer}>
                <CustomButton
                  buttonText="Find More Restaurants"
                  iconName="arrow-right"
                />
              </View>
            </View>
          </ImageBackground>

          <View style={foodAroundContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to get great food" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent />
            </View>
            <View style={buttonContainer}>
              <CustomButton
                buttonText="View More Places"
                iconName="arrow-right"
                buttonStyle={buttonStyle}
              />
            </View>
          </View>

          <View style={placeStayContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to stay around you" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent />
            </View>
            <View style={buttonContainer}>
              <CustomButton
                buttonText="View More Places"
                iconName="arrow-right"
                buttonStyle={buttonStyle}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerBg: {
    width: '100%',
    height: 350,
    paddingHorizontal: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  searchContainer: {
    marginTop: 30,
  },
  placeAroundContainer: {
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  scrollContainer: {
    marginLeft: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginVertical: 40,
  },
  buttonStyle: {
    backgroundColor: colors.black,
  },
  textContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  foodBgStyles: {
    width: '100%',
  },
  foodContainer: {
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  foodAroundContainer: {
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  placeStayContainer: {
    paddingVertical: 20,
    backgroundColor: '#F8F8F8',
  },
});

export default Index;
