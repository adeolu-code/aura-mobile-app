/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Dimensions, Platform, LayoutAnimation, UIManager,
TouchableWithoutFeedback } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CheckBox, Switch, ItemCountPicker, CustomInput } from '../../../../utils/Index';
import colors from '../../../../colors';
import {Input } from '../../../auth/Input';

import { urls } from '../../../../utils';
import { AppContext } from '../../../../../AppProvider';

import { Icon, Picker } from 'native-base';

class FilterModal extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loadingAmenities: false, toggleComponent: false, location: '', pricePerGuest: '',
        contentBody : {
          one: false, two: false, three: false, four: false, five: false
        }
    };
    
    
  }

  onChangeValue = (attrName, value) => {
    this.setState({ [attrName]: value });
  }
  
  
  
  applyFilter = () => {
    const { pricePerGuest, location } = this.state
    if(location || pricePerGuest) {
      const obj = { pricePerGuest, location }
      this.props.filter(obj)
      this.props.onDecline();
    } else {}
    
  }
  clearFilter = () => {
    this.setState(() => ({ toggleComponent: true }), () => {
        this.setState({ toggleComponent: false })
    })
    this.setState({ pricePerGuest: '', location: '' })
    this.props.clearFilter()
  }
  componentDidMount = () => {
    
  }

  
  setVisibility = (value) => {
    const { contentBody } = this.state
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ contentBody: {...contentBody, [value]: !contentBody[value]} })
  }

  render() {
    const {visible, onDecline } = this.props;
    const { textH3Style, textExtraBold, textDarkGrey, textCenter, flexRow, textH2Style, textH4Style, textBold, textDarkBlue, textUnderline, 
        textGreen, textGrey, textH6Style, textBlack, textH5Style } = GStyles
    const { closeStyle, modalContainer, modalHeader, body, property, divider, bottomMenu, bottomContainer, buttonStyle,
         contentContainer, buttonContainer, showContainer, hideContainer } = styles
    const { toggleComponent, noOfBathrooms, noOfBeds, noOfRooms, contentBody } = this.state
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
                
            <View style={modalContainer}>
                <View style={[flexRow, modalHeader]}>
                    <View style={{ flex: 6}}>
                        <MyText style={[textH3Style, textExtraBold, textDarkGrey, textCenter]}>
                            Filters
                        </MyText>
                    </View>
                    <TouchableOpacity style={closeStyle} onPress={onDecline}>
                        <Icon type="Feather" name="x" />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={body}>
                        <Header title="Filter By State"  subtitle="Type search state"
                        onPress={this.setVisibility.bind(this, 'one')} collapsed={contentBody.one} />
                        <View style={[{ marginBottom: 20 },contentBody.one ? hideContainer : showContainer ]}>
                          <CustomInput placeholder="State" attrName="location" value={this.state.location} 
                          onChangeText={this.onChangeValue} /> 
                        </View>
                    </View>

                    <View style={divider}></View>
                    <View style={body}>
                        <Header title="Filter By Price" subtitle="Type search amount" 
                        onPress={this.setVisibility.bind(this, 'two')} collapsed={contentBody.two} />
                        <View style={[{ marginBottom: 20 }, contentBody.two ? hideContainer : showContainer]}>
                          <CustomInput placeholder="Price" attrName="pricePerGuest" value={this.state.pricePerGuest} 
                          onChangeText={this.onChangeValue} />
                        </View>
                    </View>

                    <View style={divider}></View>
                    
                </ScrollView>

                <View style={[flexRow, bottomContainer]}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity onPress={this.clearFilter}>
                            <MyText style={[textGreen, textH4Style, textUnderline, textBold]}>Clear All</MyText>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1.3}}>
                        <View style={buttonContainer}>
                            <CustomButton buttonText="Find Experience" onPress={this.applyFilter}
                            buttonStyle={buttonStyle} textStyle={[textH4Style]}  />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
  }
}

const Header = (props) => {
    const {textExtraBold, textH2Style, textDarkBlue, textH5Style, textGrey, flexRow } = GStyles
    const { headerLeft, headerRight } = styles
    const arrowName = !props.collapsed ? "keyboard-arrow-up" : "keyboard-arrow-down"
    return (
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={[flexRow]} >
            <View style={headerLeft}>
                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>{props.title}</MyText>
                <MyText style={[textGrey, textH5Style, {marginTop: 10}]}>{props.subtitle}</MyText>
            </View>
            <View style={headerRight}>
                <Icon type="MaterialIcons" name={arrowName} />
            </View>
        </View>
      </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.white, width: '100%', flex:1, 
        // borderWidth: 1
    },
    modalHeader: {
        alignItems: 'center', backgroundColor: colors.white, paddingVertical: 30,
        paddingHorizontal: 20, elevation: 3,
    },
    headerStyle: {
        paddingBottom: 10
    },
    closeStyle: {
        height: 30, flex: 1, justifyContent:'flex-end', alignItems: 'flex-end',
    },
    body: {
        paddingHorizontal: 24,marginTop: 18,
        marginBottom: 20,
    },
    property: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    divider: {
        height: 1, backgroundColor: colors.lightGrey,
        // marginTop: 30,
        width: '100%',
        },
    bottomMenu: {
        // flex: 1,
        height: 80,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,

    },
    bottomContainer: {
        paddingHorizontal: 20, elevation: 4, width: '100%', backgroundColor: colors.white,
        paddingTop: 15, paddingBottom: 25
    },
    
    contentContainer: {
        marginBottom: 30,
    },
    buttonStyle: {
        borderRadius: 4,
        elevation: 2,
        backgroundColor: colors.black,
    },
    buttonContainer: {
        // marginVertical: 40
    },
    headerRight: {
        flex: 1, alignItems: 'flex-end'
    },
    headerLeft: {
        flex:10
    },
    hideContainer: {
      height: 0, opacity: 0
    },
    showContainer: {
      height: 'auto', opacity: 1
    }
});

export default FilterModal;
