/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Dimensions, Platform, LayoutAnimation, UIManager,
TouchableWithoutFeedback } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, CustomButton, CheckBox, Switch, ItemCountPicker } from '../../../../utils/Index';
import colors from '../../../../colors';
import {Input} from '../../../auth/Input';

import { urls, GetRequest } from '../../../../utils';
import { AppContext } from '../../../../../AppProvider';
import Slider from '../../../auth/RangeSlider';

import { Icon } from 'native-base';

class FilterModal extends Component {
    static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = { loadingAmenities: false, amenities: [], amenitiesValues: [], 
        loadingHouseType: false, houseTypes: [], houseTypeValues:[], noOfBathrooms: '', noOfRooms: '', noOfBeds: '', 
        minPrice: 0, maxPrice: 500000, max: 500000, isVerified: '', toggleComponent: false,
        contentBody : {
          one: false, two: false, three: false, four: false, five: false
        }
       };
    
  }

  setNoOfBathroom = (value) => {
    this.setState({ noOfBathrooms: value })
  }
  setNoOfBedroom = (value) => {
    this.setState({ noOfRooms: value })
  }
  setNoOfBeds = (value) => {
    this.setState({ noOfBeds: value })
  }

  getAmmenities = async () => {
    this.setState({ loadingAmenities: true })
    const res = await GetRequest(urls.listingBase, `api/v1/listing/ammenity`);
    // console.log(res)
    if(res.isError) {
        const message = res.message;
        const error = [message]
        this.setState({ errors: error, loadingAmenities: false })
    } else {
      this.setState({ amenities: res.data, loadingAmenities: false })
    }
  }
  renderAmmenities = () => {
    const { amenities, toggleComponent } = this.state;
    if(amenities.length !== 0 && !toggleComponent) {
      return amenities.map((item, i) => {
        return (
          <CheckBox title={item.name} key={i} item={item} onPress={this.onCheckAmmenity} value={this.getAmmenityValue(item.id)}  />
        )
      })
    }
  }
  onCheckAmmenity = (arg) => {
    const { amenitiesValues } = this.state
    const item = arg.item;
    const value = arg.value;
    let arr = [...amenitiesValues]
    if(value) {
      arr.push(item.id)
      this.setState({ amenitiesValues: arr })
    } else {
      const index = arr.findIndex(x => x === item.id )
      if(index !== -1) {
        arr.splice(index, 1)
        this.setState({ amenitiesValues: arr})
      }
    }
  }
  getAmmenityValue = (id) => {
    const { amenitiesValues } = this.state;
    const found = amenitiesValues.find(item => item === id)
    return found ? true : false
  }

  getHouseType = async () => {
    this.setState({ loadingHouseType: true })
    const res = await GetRequest(urls.listingBase, `api/v1/listing/propertytype`);
    // console.log(res)
    if(res.isError) {
        const message = res.message;
        const error = [message]
        this.setState({ errors: error, loadingHouseType: false })
    } else {
      this.setState({ houseTypes: res.data, loadingHouseType: false })
    }
  }
  renderHouseType = () => {
    const { houseTypes, toggleComponent } = this.state;
    if(houseTypes.length !== 0 && !toggleComponent) {
      return houseTypes.map((item, i) => {
        return (
          <CheckBox title={item.name} key={item.id} item={item} onPress={this.onCheckHouseType} value={this.getHouseTypeValue(item.id)}  />
        )
      })
    }
  }
  onCheckHouseType = (arg) => {
    const { houseTypeValues } = this.state
    const item = arg.item;
    const value = arg.value;
    let arr = [...houseTypeValues]
    if(value) {
      arr.push(item.id)
      this.setState({ houseTypeValues: arr })
    } else {
      const index = arr.findIndex(x => x === item.id )
      if(index !== -1) {
        arr.splice(index, 1)
        this.setState({ houseTypeValues: arr})
      }
    }
  }
  getHouseTypeValue = (id) => {
    const { houseTypeValues } = this.state;
    const found = houseTypeValues.find(item => item === id)
    return found ? true : false
  }
  onMinPriceChange = (value) => {
    this.setState({ minPrice: Number(value) })
  }
  onMaxPriceChange = (value) => {
    this.setState({ maxPrice: Number(value)})
  }
  switchValue = (bool) => {
    this.setState({ isVerified: bool})
  }
  applyFilter = () => {
    const { amenitiesValues, houseTypeValues, noOfBathrooms, noOfRooms, noOfBeds, minPrice, maxPrice, isVerified } = this.state
    const obj = { amenitiesValues, houseTypeValues, noOfBathrooms, noOfRooms, noOfBeds, minPrice, maxPrice, isVerified }
    this.props.filter(obj)
    this.props.onDecline();
  }
  clearFilter = () => {
    this.setState(() => ({ toggleComponent: true }), () => {
        this.setState({ toggleComponent: false })
    })
    this.setState({ amenitiesValues: [], houseTypeValues:[], noOfBathrooms: 0, noOfRooms: 0, noOfBeds: 0, 
        minPrice: 0, maxPrice: 500000, isVerified: false })
    this.props.clearFilter()
  }
  componentDidMount = () => {
    this.getAmmenities()
    this.getHouseType()
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
                        <Header title="Property Type" subtitle="Filter out the type of properties you’re searching for" 
                        onPress={this.setVisibility.bind(this, 'one')} collapsed={contentBody.one} />
                        <View style={[contentBody.one ? hideContainer : showContainer, { marginTop: 30} ]}>
                            {this.renderHouseType()}
                        </View>
                    </View>
                    
                    <View style={divider}></View>

                    <View style={body}>
                        <Header title="Price Range"  subtitle="Find homes & hotels that fit your budget" 
                        onPress={this.setVisibility.bind(this, 'two')} collapsed={contentBody.two} />
                        <View style={[contentBody.two ? hideContainer : showContainer]}>
                            
                            {!toggleComponent ? <Slider initialLowValue={this.state.minPrice} initialHighValue={this.state.maxPrice} max={this.state.max}
                                onValueChanged={(low, high, fromUser) => {
                                    this.setState({ minPrice: low, maxPrice: high})
                                }} 
                            /> : <></>}
                            <View style={{marginBottom: 30, marginTop: 10}}>
                                <View style={[flexRow, {flex: 1}]}>
                                    <View style={{flex: 1, marginRight: 10}}>
                                        <Input label="min price" placeholder="N 0" value={this.state.minPrice.toString()} onChangeText={this.onMinPriceChange} />
                                    </View>
                                    <View style={{flex: 1, marginLeft: 10}}>
                                        <Input label="max price" placeholder="N 500,000+" value={this.state.maxPrice.toString()} onChangeText={this.onMaxPriceChange} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={divider}></View>

                    <View style={body}>
                        <Header title="Rooms & Beds"  subtitle="Filter by the number of rooms & beds you want" 
                        onPress={this.setVisibility.bind(this, 'three')} collapsed={contentBody.three} />
                        {!toggleComponent ? <View style={[contentBody.three ? hideContainer : showContainer, { marginTop: 10, marginBottom: 20} ]}>
                            <ItemCountPicker title="Beds" countValue={this.setNoOfBeds} value={noOfBeds} />
                            <ItemCountPicker title="Bedroom" countValue={this.setNoOfBedroom} value={noOfRooms} />
                            <ItemCountPicker title="Bathroom" countValue={this.setNoOfBathroom} value={noOfBathrooms} />
                        </View> : <></>}
                    </View>

                    <View style={divider}></View>

                    <View style={body}>
                        <Header title="Amenities" subtitle="Find homes & hotels with the amenities you need"
                        onPress={this.setVisibility.bind(this, 'four')} collapsed={contentBody.four}  />
                        <View style={[contentBody.four ? hideContainer : showContainer, {marginTop: 30}]}>
                          {this.renderAmmenities()}
                        </View>
                    </View>

                    {/* <View style={divider}></View>

                    <View style={body}>
                        <Header title="House Rules"  subtitle="Find homes that are flexible enough for your plans" />
                        <View style={{marginTop: 20}}>
                            <CheckBox title="Suitable for children (2 - 12 years)" />
                            <CheckBox title="Suitable for children" />
                            <CheckBox title="Suitable for pets" />
                            <CheckBox title="Smoking allowed" />
                            <CheckBox title="Events or parties allowed" />
                        </View>
                    </View> */}

                    <View style={divider}></View>

                    <View style={body}>
                        {/* <View style={[divider, {marginTop: 10}]}></View> */}
                        <View style={[flexRow, property]}>
                            <View style={{flex: 8}}>
                                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Verified Properties</MyText>
                                <MyText style={[textGrey, textH5Style, {marginTop: 10}]}>Find properties that have been verified</MyText>
                                {/* <View style={[divider, {marginTop: 20}]}></View> */}
                            </View>
                            <View style={{flex: 2, alignItems: 'flex-end'}}>
                                <Switch value={this.state.isVerified} onPress={this.switchValue} />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={[flexRow, bottomContainer]}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TouchableOpacity onPress={this.clearFilter}>
                            <MyText style={[textGreen, textH4Style, textUnderline, textBold]}>Clear All</MyText>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1.3}}>
                        <View style={buttonContainer}>
                            <CustomButton buttonText="Apply Filter" onPress={this.applyFilter}
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
        alignItems: 'center', backgroundColor: colors.white, paddingVertical: 30, paddingTop: Platform.OS === 'ios' ? 50 : 30,
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
