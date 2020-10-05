/* eslint-disable prettier/prettier */
import React, { Component, Fragment } from 'react';
import {View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';

import {
    MyText,
    CustomButton,
    CustomInput,
    SearchInput,
  } from '../../utils/Index';
  import GStyles from '../../assets/styles/GeneralStyles';
  import colors from '../../colors';

  import {Icon} from 'native-base';


  class SearchToggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: false,
        };
    }
    // handleSearchToggle = () => {
    // this.setState({
    //     active: !this.state.active,
    // });
    // }
    // openSearch = () => {
    // this.setState({
    //     active: true,
    // });
    // }
    // closeSearch = () => {
    // this.setState({
    //     active: false,
    // });
    // }
    render(){
        const { close } = this.props;
        const {
             search, iconStyle, SearchArea, searchGroup,
             icons, iconsArea,
          } = styles;
          const {
            textDarkBlue,
            flexRow,
            textH5Style,
            textH6Style,
            textBold,
          } = GStyles;
        return (
            <View style={[search, {zIndex:  10}]}>
          <View style={[flexRow, searchGroup]}>
            <TouchableOpacity onPress={close} style={iconStyle}>
              <Icon type="MaterialIcons" name="keyboard-arrow-left" style={{fontSize: 30}} />
            </TouchableOpacity>
            <View style={SearchArea}>
              <SearchInput placeholder="Where are you going?" />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View style={[flexRow, iconsArea]}>
              <View style={icons}>
                <TouchableOpacity>
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
        );
    }
}

const styles = StyleSheet.create({
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
export default SearchToggle;