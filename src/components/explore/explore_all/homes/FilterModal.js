/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../../utils/Index';
import colors from '../../../../colors';
import {CheckBox} from '../../../auth/CheckBox';
import {Input} from '../../../auth/Input';
import ListProperty from '../../../auth/ListProperty';
import Slider from '../../../auth/RangeSlider';
import Switch from '../../../Switch';

import { Icon } from 'native-base';

class FilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {visible, onDecline } = this.props;
    const { textH3Style, textExtraBold, textDarkGrey, textCenter, flexRow, textH2Style, textH4Style, textBold, textDarkBlue, textUnderline, textGreen, textGrey, textH6Style, textBlack, textH5Style } = GStyles
    const { closeStyle, modalContainer, modalHeader, body, property, divider, bottomMenu, bottomContainer, buttonStyle, contentContainer, buttonContainer } = styles
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
                        <View style={[flexRow, property]}>
                            <View style={{flex: 9}}>
                                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Property Type</MyText>
                                <MyText style={[textGrey, textH6Style, {marginTop: 10}]}>Filter out the type of properties you’re searching for</MyText>
                                <View style={{marginTop: 20}}>
                                    <CheckBox title="Home" />
                                    <CheckBox title="Flat" />
                                    <CheckBox title="Hotel" />
                                    <CheckBox title="Serviced Apartment" />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Icon type="MaterialIcons" name="keyboard-arrow-up" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={divider}></View>
                    <View style={body}>
                        <View style={[flexRow, property]}>
                            <View style={{flex: 9}}>
                                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Price Range</MyText>
                                <MyText style={[textGrey, textH6Style, {marginTop: 10}]}>Find homes & hotels that fit your budget</MyText>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Icon type="MaterialIcons" name="keyboard-arrow-up" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Slider/>
                            <View style={{marginBottom: 30}}>
                                <View style={[flexRow, {flex: 1}]}>
                                    <View style={{flex: 1, marginRight: 10}}>
                                        <Input label="min price" placeholder="N 0" placeholderColor={colors.black}/>
                                    </View>
                                    <View style={{flex: 1, marginLeft: 10}}>
                                        <Input label="max price" placeholder="N 500,000+" placeholderColor={colors.black} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={divider}></View>
                    <View style={body}>
                        <View style={[flexRow, property]}>
                            <View style={{flex: 9}}>
                                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Rooms & Beds</MyText>
                                <MyText style={[textGrey, textH6Style, {marginTop: 10}]}>Filter by the number of rooms & beds you want</MyText>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Icon type="MaterialIcons" name="keyboard-arrow-up" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom: 40}}>
                                    <ListProperty title="Bed"/>
                                    <ListProperty title="Bedroom"/>
                                    <ListProperty title="Bathroom"/>
                                </View>
                    </View>
                    <View style={divider}></View>
                    <View style={body}>
                        <View style={[flexRow, property]}>
                            <View style={{flex: 9}}>
                                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Amenities</MyText>
                                <MyText style={[textGrey, textH6Style, {marginTop: 10}]}>Find homes & hotels with the amenities you need</MyText>
                                <View style={{marginTop: 20}}>
                                    <CheckBox title="Essentials" />
                                    <CheckBox title="WiFi" />
                                    <CheckBox title="Television" />
                                    <CheckBox title="Heat" />
                                    <CheckBox title="Air Conditioning" />
                                    <CheckBox title="Iron" />
                                    <CheckBox title="Shampoo" />
                                    <CheckBox title="Hair Dryer" />
                                    <CheckBox title="Breakfast, Coffee, Tea" />
                                    <CheckBox title="Desk/Workspace" />
                                    <CheckBox title="Fire Place" />
                                    <CheckBox title="Closet/Drawers" />
                                    <CheckBox title="Private Entrance" />
                                    <CheckBox title="Smoke Detectors" />
                                    <CheckBox title="Carbon Monoxide Detectors" />
                                    <CheckBox title="Fire Extinguisher" />
                                    <CheckBox title="First Aid Kit" />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Icon type="MaterialIcons" name="keyboard-arrow-up" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={divider}></View>
                    <View style={body}>
                        <View style={[flexRow, property]}>
                            <View style={{flex: 9}}>
                                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>House Rules</MyText>
                                <MyText style={[textGrey, textH6Style, {marginTop: 10}]}>Find homes that are flexible enough for your plans</MyText>
                                <View style={{marginTop: 20}}>
                                    <CheckBox title="Suitable for children (2 - 12 years)" />
                                    <CheckBox title="Suitable for children" />
                                    <CheckBox title="Suitable for pets" />
                                    <CheckBox title="Smoking allowed" />
                                    <CheckBox title="Events or parties allowed" />
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Icon type="MaterialIcons" name="keyboard-arrow-up" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={divider}></View>
                    <View style={body}>
                        {/* <View style={[divider, {marginTop: 10}]}></View> */}
                        <View style={[flexRow, property]}>
                            <View style={{flex: 8}}>
                                <MyText style={[textExtraBold, textH2Style, textDarkBlue]}>Verified Properties</MyText>
                                <MyText style={[textGrey, textH6Style, {marginTop: 10}]}>Find properties that have been verified</MyText>
                                {/* <View style={[divider, {marginTop: 20}]}></View> */}
                            </View>
                            <View style={{flex: 3}}>
                                <Switch />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[flexRow, bottomContainer]}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <View></View>
                        <MyText style={[textGreen, textH5Style, textUnderline, textBold]}>Clear All</MyText>
                    </View>
                    <View style={{flex: 1.3}}>
                        <View style={buttonContainer}>
                            <CustomButton buttonText="Apply Filter"
                            buttonStyle={buttonStyle} textStyle={[textH5Style]}  />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
  }
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
        paddingHorizontal: 24,
    },
    property: {
        flex: 1,
        marginTop: 18,
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
});

export default FilterModal;
