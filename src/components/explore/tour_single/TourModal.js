/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity, Keyboard,
  Modal,
  
} from "react-native";
import colors from "../../../colors";
import { CustomInput, MyText, CustomButton, ItemCountPicker, Loading, Error } from "../../../utils/Index";
import GStyles from "../../../assets/styles/GeneralStyles";
import { Icon, Picker } from 'native-base';

import ListGuest from './ListGuest';
import RadioButton from './RadioButton';
import BottomMenuComponent from "./BottomMenuComponent";
import moment from 'moment';
import { formatAmount } from '../../../helpers';

import { urls, GetRequest, Request, SCREEN_HEIGHT } from '../../../utils'

class TourModal extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: "key0", selectedDate: '', count: 1, errors: [], loading: false };
  }
  renderLoading = () => {
      const { loading } = this.state;
      if(loading) { return (<Loading wrapperStyles={{ width: '100%', height: SCREEN_HEIGHT, zIndex: 1000}} />) }
  }
  renderError = () => {
      const { errors } = this.state
      if(errors.length !== 0) {
          return (<Error errors={errors} />)
      }
  }
 
  onValueChange(value) {
      this.setState({ selected: value });
  }
  setCountValue = (value) => {
    this.setState({ count: value })
  }

  renderCountPicker = () => {
    const { foods } = this.props;
    if(foods.length > 0) {
        const food = foods[0];
        return (
            <ItemCountPicker title="Guests" value={this.state.count} countValue={this.setCountValue}  />
        )
    }
  }
  onDecline = () => {
      this.props.onDecline();
      this.props.back()
  }


  renderPicker = () => {
    const { tour } = this.props
    if(tour && tour.dates) {
      return (<Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />}
      style={{ width: undefined }}
      selectedValue={this.state.selectedDate}
      onValueChange={this.onValueChange}>
        {tour.dates.map((item, i) => {
          const startDate = `${moment(item.startDate).format('MMM DD, YYYY')}`
          const endDate = `${moment(item.endDate).format('MMM DD, YYYY')}`
          const formatDate = `${startDate} - ${endDate}`;
          return (
            <Picker.Item label={formatDate} value={item} />
          )
        })}
      </Picker>)
      
    }
  }

  submit = async () => {
    Keyboard.dismiss()
    const { tour, formData } = this.props
    const { selectedDate, count } = this.state
    console.log(formData)
    const obj = {
      experience_Id: tour.id,
      number_Of_People: count,
      start_Date: formData.check_In_Date,
      end_Date: formData.check_Out_Date
    }
    this.setState({ loading: true })
    const res = await Request(urls.bookingBase, `${urls.v}bookings/experience`, obj);
    console.log('order details ', res)
    this.setState({ loading: false })
    if(res.isError || res.IsError) {
        this.setState({ errors: [res.message || res.Message]})
    } else {
        this.props.onDecline();
        this.props.next(res.data)
    }
  }

  componentDidMount = () => {
    const { tour } = this.props
    if(tour && tour.dates && tour.dates.length > 0) {
      this.setState({ selectedDate: tour.dates[0]})
    }
  }

  render() {
    const options = [
        {
            key: 'one',
            text: 'Morning Tour (Starts 8:00 am)',
        },
        {
            key: 'two',
            text: 'Afternoon Tour (Start 1:00 pm)',
        },
        {
            key: 'three',
            text: 'Evening Tour (Start 5:00 pm)',
        },
        
    ];
    const { visible, onDecline, tour } = this.props;
    const { textH2Style, textExtraBold, textDarkBlue,textH3Style, textH6Style, textGrey, textH4Style, flexRow, 
      textSuccess, textH5Style, textBold, textDarkGrey, textCenter } = GStyles;
    const { modalHeader, closeContainer, modalContainer, modalBody, mainHeader, closeStyle, lineStyle, container,
      buttonContainer, modalBodyStyle, divider, picker, headerStyle, contentContainer, checkInStyle, checkOutStyle } = styles
    const { count } = this.state
    const { formData } = this.props
    return (
      
        <Modal visible={visible} transparent onRequestClose={() => {}} animationType="slide">
          {this.renderLoading()}
          <View style={container}>
            
            <View style={modalContainer}>
            
              <View style={mainHeader}>
                <View style={[flexRow, modalHeader]}>
                    <TouchableOpacity style={closeStyle} onPress={this.onDecline}>
                        <Icon type="Feather" name="chevron-left" />
                    </TouchableOpacity>
                    <View style={{ flex: 6, alignItems: 'center', paddingRight: 50, marginTop: 10 }}>
                        <View style={lineStyle}></View>
                    </View>
                    <TouchableOpacity style={closeStyle} onPress={onDecline}>
                        <Icon type="Feather" name="x" />
                    </TouchableOpacity>
                </View>
                <View style={headerStyle}>
                    <MyText style={[textH2Style, textExtraBold, textDarkGrey, textCenter]}>
                      Book Tour Date
                    </MyText>
                </View>
              </View>
              <ScrollView>
                  {/* <View style={modalBodyStyle}>
                      <MyText style={[textH3Style, textExtraBold, textDarkBlue]}>Select A Date For Your Tour</MyText>
                      <View style={{marginTop: 20}}>
                          <MyText style={[textGrey, textH5Style]}>
                              Pick A Date
                          </MyText>
                          <View style={picker}>
                              {this.renderPicker()}
                          </View>
                      </View>
                  </View>
                  <View style={divider}></View> */}
                  {/* <View style={[modalBody]}>
                      <MyText style={[textH3Style, textExtraBold, textDarkBlue]}>Tour Time</MyText>
                      <MyText style={[textGrey, textH5Style, {paddingTop: 5}]}>
                          Choose the best time for you to take your tour
                      </MyText>
                      <View style={{paddingTop: 20}}>
                          <RadioButton options={options}/>
                      </View>
                  </View>
                  <View style={divider}></View> */}
                  <View>
                    <View style={[modalBody, { marginBottom: 5}]}>
                        <MyText style={[textH3Style, textExtraBold, textDarkBlue]}>Number Of Guests</MyText>
                        <MyText style={[textGrey, textH5Style, {paddingTop: 5, paddingBottom: 5}]}>
                            How many guests will be going on this tour
                        </MyText>
                        <ItemCountPicker title="Guest(s)" value={this.state.count} container={{ borderBottomWidth: 0}}
                        countValue={this.setCountValue}  />
                    </View>
                    <View style={[flexRow, contentContainer]}>
                        <View style={checkInStyle}>
                            <MyText style={[textH6Style, textGrey, { marginBottom: 10}]}>CHECK-IN</MyText>
                            <MyText style={[textH4Style]}>{formData ? moment(new Date(formData.check_In_Date)).format('DD, MMM YYYY') : ''}</MyText>
                        </View>
                        <View style={checkOutStyle}>
                            <MyText style={[textH6Style, textGrey, { marginBottom: 10}]}>CHECK-OUT</MyText>
                            <MyText style={[textH4Style]}>{formData ? moment(new Date(formData.check_Out_Date)).format('DD, MMM YYYY') : ''}</MyText>
                        </View>
                    </View>
                    <View style={[modalBody, {marginBottom: 0, marginTop: 5}]}>
                        <View style={[flexRow, {justifyContent: 'space-between'}]}>
                            <MyText style={[textDarkBlue, textH4Style]}>Experience Time Starts: </MyText>
                            <MyText style={[textH3Style, textExtraBold, textDarkGrey]}>{tour ? tour.experienceStartTime : ''} </MyText>
                        </View>
                    </View>
                    <View style={divider}></View>
                    <View style={[modalBody, {marginBottom: 50}]}>
                        <View style={[flexRow, {justifyContent: 'space-between'}]}>
                            <MyText style={[textDarkBlue, textH4Style]}>Amount * {this.state.count}</MyText>
                            <MyText style={[textH3Style, textExtraBold, textSuccess]}>
                              ₦ {tour ? formatAmount(tour.pricePerGuest) : ''} / Night</MyText>
                        </View>
                        <View style={[flexRow, {justifyContent: 'space-between', marginTop: 30}]}>
                            <MyText style={[textDarkBlue, textH4Style, textBold]}>Total Amount</MyText>
                            <MyText style={[textH3Style, textExtraBold, textSuccess]}>₦ {tour ? formatAmount(tour.pricePerGuest * count) : ''}</MyText>
                        </View>
                    </View>
                    {this.renderError()}
                  </View>
              </ScrollView>
              <View style={buttonContainer}>
                  <BottomMenuComponent title='Book Date' disabled={this.state.count === 0} onPress={this.submit}
                  price={`₦ ${tour ? formatAmount(tour.pricePerGuest * count) : ''}`} />
              </View>        
            </View>
            
          </View>
        </Modal>
      
    );
  }
}

const styles = StyleSheet.create({
  // modalContainer: {
  //   flex: 1, width: '100%', backgroundColor: colors.white,
  // },
  container: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
      width: '100%', height: '100%',
      justifyContent: 'flex-end', 
  },
  modalContainer: {
      backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: 'hidden', 
      elevation: 2,...GStyles.shadow, 
  },
  modalHeader: {
    flexDirection: "row", paddingHorizontal: 20, 
    // borderBottomWidth: 0.8, 
    // elevation: 2,
    paddingTop: 20, 
    // position: 'absolute', top: 0,zIndex: 4, 
    width: '100%', backgroundColor: colors.white,
    // borderBottomColor: colors.lightGreyOne,
  },
  mainHeader: {
    backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15,
  },
  lineStyle: {
      width: '22%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft: 40
  },
  closeStyle: {
      height: 30, flex: 1
  },
  closeContainer: {
    // width: 50, height: 50
  },
  headerStyle: {
      paddingBottom: 10, paddingTop: 5, 
      borderBottomWidth: 0.8, borderBottomColor: colors.lightGreyOne,
      // borderWidth: 1
  },
  modalBodyStyle: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 90,
  },
  modalBody: {
    backgroundColor: colors.white, paddingHorizontal: 24,
    flex: 1, justifyContent: "center", paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 30
  },
  contentContainer: {
      borderBottomColor: colors.lightGrey, borderBottomWidth: 1, borderTopColor: colors.lightGrey,
      borderTopWidth: 1, 
  },
  checkOutStyle: {
      flex: 1, paddingHorizontal: 20, paddingVertical:8, alignItems: 'flex-end'
  },
  checkInStyle: {
      flex: 1, paddingHorizontal: 20, paddingVertical:8, borderRightColor: colors.lightGrey, borderRightWidth: 1 
  },
  dashContainer: {
    flexDirection: "row", flex: 1,marginTop: 40, marginBottom: 20, alignItems: "center",justifyContent: "center",
  },
  dashStyles: {
    height: 1, backgroundColor: colors.lightGrey, flex: 1
  },
  socialContainer: {

  },
  accountStyle: {
    marginBottom: 90, marginTop: 70, alignSelf: 'center'
  },
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    borderColor: colors.lightGreyOne,
    marginTop: 10,
},
divider: {
    height: 1, backgroundColor: colors.lightGrey,
    marginTop: 30,
    width: '100%'
    },
    radio: {
        flex: 1,
        height: 40,
    }
});

export default TourModal;
