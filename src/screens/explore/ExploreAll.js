
import React, { Component, Fragment } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText } from '../../utils/Index';
import colors from '../../colors';

import { Icon } from 'native-base';
import Header from '../../components/explore/explore_all/Header';

import TopRatedComponent from '../../components/explore/explore_all/top_rated/Index';
import HomesComponent from '../../components/explore/explore_all/homes/Index';
import FoodComponent from '../../components/explore/explore_all/food/Index';
import ToursComponent from '../../components/explore/explore_all/tour/Index';
import PhotographersComponent from '../../components/explore/explore_all/photograph/Index';

import SearchToggle from '../../components/explore/SearchToggle';
import SearchRestaurant from '../../components/explore/SearchRestaurant';

import { SCREEN_WIDTH } from '../../utils'

class ExploreAll extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOne: true, tabTwo: false, tabThree: false, tabFour: false, tabFive: false, selectedTab: 'one', 
    active: false, activeRestaurant: false, activePhoto: false, activeTour: false, showSearch: true };
    this.tabs = {}
    const { tab } = props.route.params;
    this.state.selectedTab = tab
    // this.linkTo(tab)
  }
  closeSearch = () => {
    this.setState({ active: false });
  }
  openSearch = () => {
    this.setState({ active: true });
  }
  openRestaurant = () => {
    this.setState({ activeRestaurant: true })
  }
  closeRestaurant = () => {
    this.setState({ activeRestaurant: false })
  }
  openPhoto = () => {
    this.setState({ activePhoto: true })
  }
  closePhoto = () => {
    this.setState({ activePhoto: false })
  }

  openTour = () => {
    this.setState({ activeTour: true })
  }
  closeTour = () => {
    this.setState({ activeTour: false })
  }
  
  componentDidMount = () => {
      const { selectedTab } = this.state
      this.linkTo(selectedTab)
      
      setTimeout(() => {
        console.log('This tabs ', this.tabs)
        this.shiftHeading(selectedTab)
      }, 500);
  }
  shiftHeading = (tab) => {
    if(tab !== 'one' || tab !== 'five') {
        const remainingWidth = SCREEN_WIDTH - this.tabs[tab]?.width
        const space = remainingWidth/2
        this.scrollViewRef.scrollTo({ x: this.tabs[tab]?.x - space, y: 0, animated: true})
    }
    if(tab === 'one' ) {
        this.scrollViewRef.scrollTo({ x: this.tabs[tab]?.x - 20, y: 0, animated: true})
    }
    if(tab === 'five') {
        this.scrollViewRef.scrollTo({ x: this.tabs[tab]?.x - 20, y: 0, animated: true})
    }
  }
  goBack = () => {
      this.props.navigation.goBack()
  }
  linkToTab = (value) => {
    this.linkTo(value)
  }
  linkTo = (tab) => {
    switch (tab) {
        case 'one':
            this.setState(() => ({ tabOne: true, tabTwo: false, tabThree: false, tabFour: false, tabFive: false, showSearch: true }), () => {
                this.shiftHeading(tab)
            })
            break;
        case 'two':
            this.setState(() => ({ tabOne: false, tabTwo: true, tabThree: false, tabFour: false, tabFive: false, showSearch: true }),
            () => {
                this.shiftHeading(tab)
            })
            break;
        case 'three':
            this.setState(() => ({ tabOne: false, tabTwo: false, tabThree: true, tabFour: false, tabFive: false, showSearch: true }), () => {
                this.shiftHeading(tab)
            })
            break;
        case 'four':
            this.setState(() => ({ tabOne: false, tabTwo: false, tabThree: false, tabFour: true, tabFive: false, showSearch: false }), () => {
                this.shiftHeading(tab)
            })
            break;
        case 'five':
            this.setState(() => ({ tabOne: false, tabTwo: false, tabThree: false, tabFour: false, tabFive: true, showSearch: false }), () => {
                this.shiftHeading(tab)
            })
            break;
        default:
            break;
    }
    console.log('Got to here after switch')
  }
  onLayout = (tab, event) => {
    const layout = event.nativeEvent.layout;
    // console.log('Event ', event, tab,layout)
    // this.tabs[tab] = layout.x
    this.tabs[tab] = {width:layout.width, x:layout.x}
    // console.log(tab, this.tabs, layout)
  }
  renderTabs = () => {
    const { tabOne, tabTwo, tabThree, tabFour, tabFive } = this.state;
    if(tabOne) {
        return <TopRatedComponent link={this.linkToTab} {...this.props} />
    } else if(tabTwo) {
        return <HomesComponent link={this.linkToTab} {...this.props} />
    } else if (tabThree) {
        return <FoodComponent link={this.linkToTab} {...this.props} />
    } else if (tabFour) {
        return <PhotographersComponent link={this.linkToTab} {...this.props} />
    } else {
        return <ToursComponent link={this.linkToTab} {...this.props} />
    }
  }
  searchContainer = () => {
    const { iconStyle, searchContainer, inputStyles } = styles;
    const { flexRow, textH5Style, textGrey, textOrange } = GStyles;
      return (
        <>
            <TouchableOpacity style={[inputStyles, { justifyContent: 'center'}]} onPress={this.openSearch}>
                <MyText style={[textGrey]}>Search location</MyText>
            </TouchableOpacity>
        </>
      )
  }
  renderHeading = () => {
    const { tabOne, tabTwo, tabThree, tabFour, tabFive } = this.state;
    const { inputStyles, searchIconStyle } = styles;
    const { flexRow, textH5Style, textGrey, textOrange } = GStyles;
    if(tabOne) {
        return <>{this.searchContainer()}</>
    } else if(tabTwo) {
        return <>{this.searchContainer()}</>
    } else if (tabThree) {
        return (
            <TouchableOpacity style={[inputStyles, { justifyContent: 'center'}]} onPress={this.openRestaurant}>
                <MyText style={[textGrey]}>Search Restaurants near you</MyText>
            </TouchableOpacity>
        )
    } else if (tabFour) {
        return (
            <TouchableOpacity style={[inputStyles, { justifyContent: 'center'}]} onPress={this.openPhoto}>
                <MyText style={[textGrey]}>Search Photographers near you</MyText>
            </TouchableOpacity>
        )
    } else {
        return (<></>
            // <TouchableOpacity style={[inputStyles, { justifyContent: 'center'}]} onPress={this.openTour}>
            //     <MyText style={[textGrey]}>Search Experiences/Tours near you</MyText>
            // </TouchableOpacity>
        )
    }
  }

  render() {
    const { iconStyle, fixedHeaderContainer, searchContainer, inputStyles, headerContainer, leftStyle, rightStyle, lastItem,
        searchIconStyle, secondHeaderContainer, smallIconStyle, menuItemStyle, menuItemActive, iconActive, container,
    contentContainer } = styles;
    const { flexRow, textH5Style, textGrey, textOrange } = GStyles;
    const { tabOne, tabTwo, tabThree, tabFour, tabFive, showSearch } = this.state;
    return (
        <SafeAreaView style={container}>
            {this.state.active ? <><SearchToggle close={this.closeSearch} {...this.props} /></> : <Fragment />}
            {this.state.activeRestaurant ? <><SearchRestaurant close={this.closeRestaurant} {...this.props} /></> : <Fragment />}
                <View style={fixedHeaderContainer}>
                    <View style={[flexRow, headerContainer]}>
                    <TouchableOpacity style={leftStyle} onPress={this.goBack}>
                        <Icon type="Feather" name="chevron-left" style={iconStyle} />
                    </TouchableOpacity>
                    <View style={rightStyle}>
                        {showSearch ? <View style={[flexRow, searchContainer]}>
                            {this.renderHeading()}
                            {/* <TextInput style={[inputStyles]} placeholder="search Location" /> */}
                            <Icon name="search" style={searchIconStyle}  />
                        </View> : <></>}
                    </View>
                </View>
                
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={ref => {this.scrollViewRef = ref}}>
                    <View style={[flexRow, secondHeaderContainer]}>
                        <TouchableOpacity style={[flexRow, menuItemStyle, tabOne ? menuItemActive : '']}
                        onPress={this.linkTo.bind(this, 'one')} onLayout={this.onLayout.bind(this, 'one')}>
                            <Icon name="star" style={[smallIconStyle, tabOne ? iconActive : '']} />
                            <MyText style={[textH5Style, tabOne ? textOrange : textGrey ]}>Top Rated On Aura</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[flexRow, menuItemStyle, tabTwo ? menuItemActive : '']}
                        onPress={this.linkTo.bind(this, 'two')} onLayout={this.onLayout.bind(this, 'two')}>
                            <Icon type="MaterialIcons" name="hotel" style={[smallIconStyle, tabTwo ? iconActive : '']} />
                            <MyText style={[textH5Style, tabTwo ? textOrange : textGrey]}>Hotels & Apartments</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[flexRow, menuItemStyle, tabThree ? menuItemActive : '']}
                        onPress={this.linkTo.bind(this, 'three')} onLayout={this.onLayout.bind(this, 'three')}>
                            <Icon type="MaterialIcons" name="restaurant" style={[smallIconStyle, tabThree ? iconActive : '']} />
                            <MyText style={[textH5Style, tabThree ? textOrange : textGrey]}>Food & Restaurant</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[flexRow, menuItemStyle, tabFour ? menuItemActive : '']} 
                        onPress={this.linkTo.bind(this, 'four')} onLayout={this.onLayout.bind(this, 'four')}>
                            <Icon type="MaterialIcons" name="local-see" style={[smallIconStyle, tabFour? iconActive : '']} />
                            <MyText style={[textH5Style, tabFour ? textOrange : textGrey]}>Photographers</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[flexRow, menuItemStyle, lastItem, tabFive ? menuItemActive : '']} 
                        onPress={this.linkTo.bind(this, 'five')} onLayout={this.onLayout.bind(this, 'five')}>
                            <Icon type="MaterialCommunityIcons" name="sail-boat" style={[smallIconStyle, tabFive ? iconActive : '']} />
                            <MyText style={[textH5Style, tabFive ? textOrange : textGrey]}>Experiences & Tours</MyText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View>
                {this.renderTabs()}
                {/* <View style={contentContainer}>
                    <ExploreLocation />
                    {this.renderTabs()}
                </View> */}
            </View>

        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.white,
    },
    fixedHeaderContainer: {
        backgroundColor: colors.white, position: 'absolute', zIndex: 100,
    },
    iconStyle: {
        padding: 0,margin: 0, fontSize: 35, marginLeft: -10,
    },
    headerContainer: {
        width: '100%', alignItems: 'center',
        paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 70 : 40, paddingBottom: 20, backgroundColor: colors.white,
        borderBottomWidth: 1, borderBottomColor: colors.lightGrey,
    },
    leftStyle: {
        flex: 1,
    },
    rightStyle: {
        flex:7,
    },
    searchContainer: {
        elevation: 4, backgroundColor: colors.white, alignItems: 'center', borderRadius: 4,
        ...GStyles.shadow
    },
    inputStyles: {
        flex: 1, height: 40, paddingHorizontal: 20, fontFamily: 'Nunito-Regular',
    },
    searchIconStyle: {
        paddingHorizontal: 20, fontSize: 18, color: colors.grey,
    },
    secondHeaderContainer: {
        paddingTop: 30, paddingHorizontal: 20, borderBottomColor: colors.lightGrey, borderBottomWidth: 1,
    },
    smallIconStyle: {
        fontSize: 15, marginRight: 4, color: colors.grey,
    },
    menuItemStyle: {
        alignItems: 'center', marginRight: 30, paddingBottom: 8,
    },
    menuItemActive: {
        borderBottomWidth: 3, borderBottomColor: colors.orange,
    },
    iconActive: {
        color: colors.orange,
    },
    lastItem: {
        marginRight: 0,
    },
    contentContainer: {
        marginTop:180,
    },
});

export default ExploreAll;
