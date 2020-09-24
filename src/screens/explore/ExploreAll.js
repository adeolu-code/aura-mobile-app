import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
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

import ExploreLocation from '../../components/explore/explore_all/ExploreLocation';

class ExploreAll extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOne: true, tabTwo: false, tabThree: false, tabFour: false, tabFive: false };
    this.tabs = {}
  }
  goBack = () => {
      this.props.navigation.goBack()
  }
  linkTo = (tab) => {
    this.scrollViewRef.scrollTo({ x: this.tabs[tab] - 20, y: 0, animated: true})
    switch (tab) {
        case 'one':
            this.setState({ tabOne: true, tabTwo: false, tabThree: false, tabFour: false, tabFive: false })
            break;
        case 'two':
            this.setState({ tabOne: false, tabTwo: true, tabThree: false, tabFour: false, tabFive: false })
            break;
        case 'three':
            this.setState({ tabOne: false, tabTwo: false, tabThree: true, tabFour: false, tabFive: false })
            break;
        case 'four':
            this.setState({ tabOne: false, tabTwo: false, tabThree: false, tabFour: true, tabFive: false })
            break;
        case 'five':
            this.setState({ tabOne: false, tabTwo: false, tabThree: false, tabFour: false, tabFive: true })
            break;
        default:
            break;
    }
  }
  onLayout = (tab, event) => {
    // if (this.state.dimensions) return // layout was already called
    const layout = event.nativeEvent.layout;
    // console.log('Event ', event, tab,layout)
    this.tabs[tab] = layout.x
    // let {width, height} = event.nativeEvent.layout
    // this.setState({dimensions: {width, height}})
  }
  renderTabs = () => {
    const { tabOne, tabTwo, tabThree, tabFour, tabFive } = this.state;
    if(tabOne) {
        return <TopRatedComponent />
    } else if(tabTwo) {
        return <HomesComponent />
    } else if (tabThree) {
        return <FoodComponent />
    } else if (tabFour) {
        return <PhotographersComponent />
    } else {
        return <ToursComponent />
    }
  }

  render() {
    const { iconStyle, fixedHeaderContainer, searchContainer, inputStyles, headerContainer, leftStyle, rightStyle, lastItem,
        searchIconStyle, secondHeaderContainer, smallIconStyle, menuItemStyle, menuItemActive, iconActive, container,
    contentContainer } = styles;
    const { imgStyle, flexRow, textH5Style, textH4Style, textGrey, textOrange } = GStyles;
    const { tabOne, tabTwo, tabThree, tabFour, tabFive } = this.state
    return (
        <SafeAreaView style={container}>
            <View style={fixedHeaderContainer}>
                <View style={[flexRow, headerContainer]}>
                    <TouchableOpacity style={leftStyle} onPress={this.goBack}>
                        <Icon type="Feather" name="chevron-left" style={iconStyle} />
                    </TouchableOpacity>
                    <View style={rightStyle}>
                        <View style={[flexRow, searchContainer]}>
                            <TextInput style={[inputStyles]} placeholder="Location, landmark, restaurant" />
                            <Icon name="search" style={searchIconStyle}  /> 
                        </View>
                    </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={ref => {this.scrollViewRef = ref }}>
                    <View style={[flexRow, secondHeaderContainer]}>
                        <TouchableOpacity style={[flexRow, menuItemStyle, tabOne ? menuItemActive : '']} 
                        onPress={this.linkTo.bind(this, 'one')} onLayout={this.onLayout.bind(this, 'one')}>
                            <Icon name="star" style={[smallIconStyle, tabOne ? iconActive : '']} />
                            <MyText style={[textH5Style, tabOne ? textOrange : textGrey ]}>Top Rated On Aura</MyText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[flexRow, menuItemStyle, tabTwo ? menuItemActive : '']} 
                        onPress={this.linkTo.bind(this, 'two')} onLayout={this.onLayout.bind(this, 'two')}>
                            <Icon type="MaterialIcons" name="hotel" style={[smallIconStyle, tabTwo ? iconActive : '']} />
                            <MyText style={[textH5Style, tabTwo ? textOrange : textGrey]}>Homes & Hotels</MyText>
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
                            <MyText style={[textH5Style, tabFive ? textOrange : textGrey]}>Tour Experience</MyText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <ScrollView>
                <View style={contentContainer}>
                    <ExploreLocation />
                    {this.renderTabs()}
                </View>
            </ScrollView>

        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.white
    },
    fixedHeaderContainer: {
        backgroundColor: colors.white, position: 'absolute', zIndex: 100
    },
    iconStyle: {
        padding: 0,margin: 0, fontSize: 35, marginLeft: -10
    },
    headerContainer: {
        width: '100%', alignItems: 'center',
        paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20, backgroundColor: colors.white, 
        borderBottomWidth: 1, borderBottomColor: colors.lightGrey
    },
    leftStyle: {
        flex: 1
    },
    rightStyle: {
        flex:5, 
    },
    searchContainer: {
        elevation: 4, backgroundColor: colors.white, alignItems: 'center', borderRadius: 4
    }, 
    inputStyles: {
        flex: 1, height: 40, paddingHorizontal: 20, fontFamily: 'Nunito-Regular'
    },
    searchIconStyle: {
        paddingHorizontal: 20, fontSize: 18, color: colors.grey
    },
    secondHeaderContainer: {
        paddingTop: 30, paddingHorizontal: 20, borderBottomColor: colors.lightGrey, borderBottomWidth: 1,
    },
    smallIconStyle: {
        fontSize: 15, marginRight: 4, color: colors.grey
    },
    menuItemStyle: {
        alignItems: 'center', marginRight: 30, paddingBottom: 8,
    },
    menuItemActive: {
        borderBottomWidth: 3, borderBottomColor: colors.orange
    },
    iconActive: {
        color: colors.orange
    },
    lastItem: {
        marginRight: 0
    },
    contentContainer: {
        marginTop:180
    }
});

export default ExploreAll;
