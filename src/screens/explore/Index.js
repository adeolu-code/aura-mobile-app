/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import {
  View,SafeAreaView,ScrollView,ImageBackground,StyleSheet,TouchableOpacity, PermissionsAndroid, Platform, StatusBar, Image, RefreshControl
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
import ScrollContentPlaces from '../../components/explore/ScrollContentPlaces';
import TourImgComponent from '../../components/explore/TourImgComponent';
import SearchToggle from '../../components/explore/SearchToggle';

import AutoCompleteComponent from '../../components/explore/AutoCompleteComponent';

import { setContext, Request, urls, GetRequest } from '../../utils';
import { AppContext } from '../../../AppProvider';
import Geolocation from 'react-native-geolocation-service';


class Index extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { active: false, loadingPlaces: false, places: [], refreshPlaces: false, refreshing: false };
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


  requestLocationPermission = async () => {
    if(Platform.OS === 'android') {
      this.requestPermissionAndroid()
    } else {
      this.requestPermissionIos()
    }
  };
  requestPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Aura App Location Permission",
          message: "Aura App needs access to your location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getCurrentPos()
      } else { console.log("Location permission denied"); }
    } catch (err) {
      console.warn("Warn error ", err);
    }
  }

  requestPermissionIos = async () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS)
    .then((result) => {
      switch (result) {
        case 'granted':
          this.getCurrentPos();
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      console.log('Permissions catched error ', error)
    });
  }
  getCurrentPos = async () => {
    Geolocation.getCurrentPosition(
        async (position) => {
          const cord = position.coords;
          this.context.set({ location: cord })
          this.setState({ refreshPlaces: !this.state.refreshPlaces })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  onRefresh = () => {
      this.setState({ refreshing: true })
      this.setState(() => ({ refreshPlaces: !this.state.refreshPlaces }), () => {
        setTimeout(() => {
          this.setState({ refreshing: false })
        }, 1000);
      })
      // this.props.propertyContext.getAllProperties()
      // .finally(() => {
      //     this.setState({ refreshing: false })
      // })
  }

  componentDidMount = () => {
    // console.log('Explore ',this.context.state)
    // const { location } = this.context.state
    // this.requestLocationPermission()
  }
  
  // handleSearchToggle = () => {
  //   this.setState({
  //       active: !this.state.active,
  //   });
  // }
  closeSearch = () => {
    this.setState({
        active: false,
    });
  }
  openSearch = () => {
    this.setState({
        active: true,
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
      <SafeAreaView style={{flex: 1, backgroundColor: 'white' }}>
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
        
        <ScrollView style={{position: 'relative', backgroundColor: colors.white}} 
            refreshControl={
              <RefreshControl onRefresh={this.onRefresh} refreshing={this.state.refreshing}
              colors={[colors.orange, colors.success]} progressBackgroundColor={colors.white} />
          } decelerationRate={0.8}>
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
              {/* <SearchInput onFocus={this.openSearch} placeholder="Location, landmark, address" /> */}
              <SearchInput onPress={this.openSearch} placeholder="Location" />
              {/* <AutoCompleteComponent /> */}
            </View>
          </ImageBackground>

          <ScrollContentPlaces {...this.props} onPhoneLocation={this.requestLocationPermission} refresh={this.state.refreshPlaces} />

          <ImageBackground  source={require('../../assets/images/food_bg/food_bg.png')}
            style={foodBgStyles}>
            <ScrollContentFood {...this.props} refresh={this.state.refreshPlaces} />
          </ImageBackground>

          {/* <View style={foodAroundContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to get great food" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent {...this.props} />
            </View>
            <View style={buttonContainer}>
              <CustomButton buttonText="View More Places" iconName="arrow-right" buttonStyle={buttonStyle} onPress={this.linkToFood} />
            </View>
          </View> */}
          <ScrollContent {...this.props} onPhoneLocation={this.requestLocationPermission} refresh={this.state.refreshPlaces} />
          {/* <View style={placeStayContainer}>
            <View style={headerContainer}>
              <ScrollHeader title="Places to stay around you" />
            </View>
            <View style={scrollContainer}>
              <ScrollContent {...this.props} />
            </View>
            <View style={buttonContainer}>
              <CustomButton buttonText="View More Places" iconName="arrow-right" buttonStyle={buttonStyle} onPress={this.linkToHouses} />
            </View>
          </View> */}
          <ScrollContentPhoto {...this.props} refresh={this.state.refreshPlaces} />

          <View style={tourContainer}>
            <MyText style={[textWhite, textExtraBold, textH2Style, textCenter, { marginBottom: 15 }]}>Are you New in a city ?</MyText>
            <MyText style={[textWhite, textH4Style, textCenter, lineHeightText, { marginBottom: 25 }]}>Book a Tour Guide Today</MyText>
            <MyText style={[textWhite, textH4Style, textCenter, { lineHeight: 30 }]}>
              Bring your passion to life and make some extra money while leading 
              and teaching people on activities you love in your own city.
              </MyText>
            <View style={tourContentStyle}>
              <TourImgComponent {...this.props} />
            </View>
            <View>
              <CustomButton buttonText="Find More Tour" iconName="arrow-right" onPress={this.linkToTour} />
            </View>
          </View>


        </ScrollView>
        {this.state.active ? <SearchToggle close={this.closeSearch} {...this.props} /> : <Fragment />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerBg: {
    width: '100%',
    height: 370,
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

   comingSoonContainer: {
     padding: 20
   },
   comingSoonImg: {
     height: 240, width: '100%', marginBottom: 20, borderRadius: 10, overflow: 'hidden'
   }
});

export default Index;
