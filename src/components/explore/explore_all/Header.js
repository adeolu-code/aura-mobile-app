import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { tabOne: true, tabTwo: false, tabThree: false, tabFour: false, tabFive: false };
    this.tabs = {}
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
            // this.scrollViewRef.scrollTo({ x: this.tabs[tab], y: 0, animated: true})
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
  

  render() {
    const { iconStyle, container, searchContainer, inputStyles, headerContainer, leftStyle, rightStyle, lastItem,
        searchIconStyle, secondHeaderContainer, smallIconStyle, menuItemStyle, menuItemActive, iconActive } = styles;
    const { imgStyle, flexRow, textH5Style, textH4Style, textGrey, textOrange } = GStyles;
    const { tabOne, tabTwo, tabThree, tabFour, tabFive } = this.state
    return (
      <View style={container}>
        <View style={[flexRow, headerContainer]}>
            <View style={leftStyle}>
                <Icon type="Feather" name="chevron-left" style={iconStyle} />
            </View>
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
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white
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
        // borderWidth: 1
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
        // borderWidth: 1
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
    }
});

export default Header;
