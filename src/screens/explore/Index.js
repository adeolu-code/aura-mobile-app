/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
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
import ScrollContentPhoto from '../../components/explore/ScrollContentPhoto';
import TourImgComponent from '../../components/explore/TourImgComponent';

import { Icon } from 'native-base';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  linkToHouses = () => {
    this.props.navigation.navigate('ExploreAll', { tab: 'two' })
  }
  linkToFood = () => {
    this.props.navigation.navigate('ExploreAll', { tab: 'three' })
  }
  linkToPhotograph = () => {
    this.props.navigation.navigate('ExploreAll', { tab: 'four' })
  }
  linkToTour = () => {
    this.props.navigation.navigate('ExploreAll', { tab: 'five' })
  }

  handleSearchToggle = () => {
    this.setState({
        active: !this.state.active,
    });
}
  render() {
    const {
      headerBg, searchContainer, placeAroundContainer,
      headerContainer, scrollContainer, buttonContainer,
      buttonStyle, foodContainer,
      foodBgStyles,
      textContainer,
      foodAroundContainer, tourContentStyle,
      placeStayContainer, photoContainer, tourContainer,
       search, iconStyle, SearchArea, searchGroup,
       icons, iconsArea,
    } = styles;
    const {
      textWhite, textH3Style, textCenter,
      textH1Style,
      textExtraBold,
      marginBottomSmall,
      marginTopLarge,
      textH2Style,
      textH4Style,
      lineHeightText, textDarkGrey,
      textDarkBlue,
      flexRow,
      textH5Style,
      textH6Style,
      textH7Style,
      textBold,
    } = GStyles;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[search, {zIndex: this.state.active ? 10 : -10}]}>
          <View style={[flexRow, searchGroup]}>
            <TouchableOpacity style={iconStyle}>
              <Icon type="MaterialIcons" name="keyboard-arrow-left" style={{fontSize: 30}} />
            </TouchableOpacity>
            <View style={SearchArea}>
              <SearchInput placeholder="Where are you going?" />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={[flexRow, iconsArea]}>
              <View style={icons}>
                <TouchableOpacity onPress={this.handleSearchToggle}>
                  <Icon type="FontAwesome" name="location-arrow" style={{fontSize: 20, color: colors.white}} />
                </TouchableOpacity>
              </View>
              <View >
                <MyText style={[textH5Style, {paddingTop: 9}]}>
                  Nearby Places
                </MyText>
              </View>
            </View>
          </View>
          <View>
            <MyText style={textDarkBlue, textH6Style, textBold}>
              POPULAR SEARCHES BY CITY
            </MyText>
          </View>
          <View style={{marginTop: 20}}>
            <View style={[flexRow, iconsArea]}>
                <View style={icons}>
                  <TouchableOpacity>
                    <Icon type="Ionicons" name="location-outline" style={{fontSize: 20, color: colors.white}} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <MyText style={[textH5Style, {paddingTop: 9}]}>
                    Lagos
                  </MyText>
                </TouchableOpacity>
            </View>
            <View style={[flexRow, iconsArea]}>
                <View style={icons}>
                  <TouchableOpacity>
                    <Icon type="Ionicons" name="location-outline" style={{fontSize: 20, color: colors.white}} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <MyText style={[textH5Style, {paddingTop: 9}]}>
                    Abuja
                  </MyText>
                </TouchableOpacity>
            </View>
            <View style={[flexRow, iconsArea]}>
                <View style={icons}>
                  <TouchableOpacity>
                    <Icon type="Ionicons" name="location-outline" style={{fontSize: 20, color: colors.white}} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity >
                  <MyText style={[textH5Style, {paddingTop: 9}]}>
                    Ibadan
                  </MyText>
                </TouchableOpacity>
            </View>
            <View style={[flexRow, iconsArea]}>
                <View style={icons}>
                  <TouchableOpacity>
                    <Icon type="Ionicons" name="location-outline" style={{fontSize: 20, color: colors.white}} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <MyText style={[textH5Style, {paddingTop: 9}]}>
                    Calabar
                  </MyText>
                </TouchableOpacity>
            </View>
          </View>
        </View>




        <ScrollView style={{position: 'relative', backgroundColor: colors.white}}>
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
              <SearchInput onFocus={this.handleSearchToggle} placeholder="Location, landmark, address" />
            </View>
          </ImageBackground>

          <View style={placeAroundContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to stay around you" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent {...this.props} />
            </View>
            <View style={buttonContainer}>
              <CustomButton onPress={this.linkToHouses} buttonText="View More Places" iconName="arrow-right" buttonStyle={buttonStyle} />
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
                <ScrollContentFood {...this.props} />
              </View>
              <View style={buttonContainer}>
                <CustomButton buttonText="Find More Restaurants" iconName="arrow-right" onPress={this.linkToFood} />
              </View>
            </View>
          </ImageBackground>

          <View style={foodAroundContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to get great food" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent {...this.props} />
            </View>
            <View style={buttonContainer}>
              <CustomButton buttonText="View More Places" iconName="arrow-right" buttonStyle={buttonStyle} onPress={this.linkToFood} />
            </View>
          </View>

          <View style={placeStayContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to stay around you" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent {...this.props} />
            </View>
            <View style={buttonContainer}>
              <CustomButton buttonText="View More Places" iconName="arrow-right" buttonStyle={buttonStyle} onPress={this.linkToHouses} />
            </View>
          </View>

          <View style={photoContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Book photographers on Aura" noDot />
            </View>
            <View style={textContainer}>
              <MyText style={[textDarkGrey, textH4Style, lineHeightText]}>
                Curabitur vulputate arcu odio, ac facilisis diam accumsan ut.
                Ut imperdiet et leo in vulputate.
              </MyText>
            </View>
            <View style={scrollContainer}>
              <ScrollContentPhoto {...this.props} />
            </View>
            <View style={buttonContainer}>
              <CustomButton buttonText="Find More Photographers" iconName="arrow-right" onPress={this.linkToPhotograph} />
            </View>
          </View>

          <View style={tourContainer}>
            <MyText style={[textWhite, textExtraBold, textH2Style, textCenter, { marginBottom: 15 }]}>Are you New in a city ?</MyText>
            <MyText style={[textWhite, textH4Style, textCenter, lineHeightText, { marginBottom: 25 }]}>Book a Tour Guide Today</MyText>
            <MyText style={[textWhite, textH4Style, textCenter, { lineHeight: 30 }]}>
              Curabitur vulputate arcu odio, ac facilisis diam accumsan ut. Ut imperdiet et leo in vulputate.
              </MyText>
            <View style={tourContentStyle}>
              <TourImgComponent {...this.props} />
            </View>
            <View>
              <CustomButton buttonText="Find More Photographers" iconName="arrow-right" onPress={this.linkToTour} />
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
    marginVertical: 15,
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
  photoContainer: {
    paddingVertical: 20,
  },
  tourContainer: {
    paddingHorizontal: 20, paddingVertical: 40, backgroundColor: colors.black,
  },
  tourContentStyle: {
    marginBottom: 40,
  },
  search: {
    paddingTop: 30,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  iconStyle: {
    height: 40, flex: 1, justifyContent: 'center', marginRight: 15,
  },
  SearchArea: {
    flex: 8,
    elevation: 5,
    backgroundColor: colors.orange,
    borderWidth: 0.01,
    borderColor: colors.orange,
    borderRadius: 5,
    height: 43.7,
    justifyContent: 'center',
   },
   searchGroup: {
    justifyContent: 'center',
    // flex: 1,
    marginBottom: 20,
   },
   icons: {
     height: 36,
     width: 36,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: colors.orange,
     borderRadius: 4,
     borderWidth: 1,
     borderColor: colors.orange,
     marginRight: 10,
     marginBottom: 10,
   },
   iconsArea: {
     marginBottom: 10,
    //  justifyContent: 'center',
   },
});

export default Index;
