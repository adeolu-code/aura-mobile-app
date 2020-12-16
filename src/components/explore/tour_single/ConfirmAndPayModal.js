/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Icon, Picker } from 'native-base';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, CustomButton, ItemCountPicker, Error, CustomInput, Loading } from '../../../utils/Index';
import StarComponent from '../../../components/StarComponent';
import { LabelInput } from "../../../components/label_input/labelInput.component";
import { urls, GetRequest, Request } from '../../../utils'

import moment from 'moment';

import { formatAmount } from '../../../helpers'



class ConfirmAndPayModal extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [], operationValue: '', selectedId: '', orderedForMobile: '', orderedForName: '', orderedForAddress: '', 
        delivery: false, loading: false, paymentTypes: [], gettingPayments: false };
    }
    onValueChange = (value) => {
        this.setState({ operationValue: value })
        const { restaurant } = this.props;
        
    }
    
    
    renderLoading = () => {
        const { loading, gettingPayments, gettingDeductions } = this.state;
        if(loading || gettingDeductions ) { return (<Loading />) }
    }
    renderError = () => {
        const { errors } = this.state
        if(errors.length !== 0) {
            return (<Error errors={errors} />)
        }
    }
    
    makePayment = async () => {
        this.setState({ loading: true })
        const { orderDetails, tour } = this.props
        const obj = {
          reference: orderDetails.id, 
          amount: orderDetails.total_Cost,
          currency: 'NGN',
          paymentMethod: this.state.selectedId,
          transactionType: "EXPERIENCE",
          payee: orderDetails.host_Id
        }
        const res = await Request(urls.paymentBase,  `${urls.v}pay`, obj);
        console.log('confirm pay ', res)
        this.setState({ loading: false })
        if(res.isError || res.IsError) {
          this.setState({ formErrors: [res.message || res.Message] })
        } else {
            this.props.onDecline()
            this.props.navigation.navigate('Other', { screen: 'TourPayment', params: { tour, orderDetails, url: res.data }})
        }
      }

    
    getPaymentMethods = async () => {
        this.setState({ gettingPayments: true })
        const res = await GetRequest(urls.paymentBase,  `${urls.v}pay/methods`);
        this.setState({ gettingPayments: false })
        if(res.isError) {
            const message = res.Message;
            errorMessage(message)
        } else {
            const data = res.data;
            this.setState({ paymentTypes: data })
        }
    }

    componentDidMount = () => {
        console.log('Mounted')
        this.getPaymentMethods()
    }
    onDecline = () => {
        this.props.onDecline();
    }
    goBack = () => {
        this.props.onDecline()
        this.props.goBack()
    }

  render() {
    const { visible, onDecline } = this.props;
    const { modalContainer, contentContainer, modalHeader, lineStyle, closeStyle, buttomStyle, container, itemCountContainer,
        headerStyle, mainHeader, totalContainer, buttonStyle, buttonContainerStyle, detailsRow } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textCenter, textGrey, textH3Style, textOrange, textH5Style,
        textBold, textH4Style, imgStyle, textSuccess } = GStyles;
    const { tour, orderDetails } = this.props
    const imgUrl = tour && tour.mainImage ? {uri: tour.mainImage.assetPath} : require('../../../assets/images/profile.png')
    // const address = tour ? `${restaurant.locations[0].city}, ${restaurant.locations[0].state}, ${restaurant.locations[0].country}` : '****'
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
            <View style={container}>
                
                <View style={modalContainer}>
                {this.renderLoading()}
                    <View style={mainHeader}>
                        <View style={[flexRow, modalHeader]}>
                            <TouchableOpacity style={closeStyle} onPress={this.goBack}>
                                <Icon type="Feather" name="chevron-left" />
                            </TouchableOpacity>
                            <View style={{ flex: 6, alignItems: 'center',  paddingRight: 50 }}>
                                <View style={lineStyle}></View>
                            </View>
                            <TouchableOpacity style={closeStyle} onPress={this.onDecline}>
                                <Icon type="Feather" name="x" />
                            </TouchableOpacity>
                        </View>
                        <View style={headerStyle}>
                            <MyText style={[textH3Style, textBold, textGrey, textCenter]}>
                                Confirm Order 
                            </MyText>
                            
                        </View>
                    </View>
                    
                    <View style={{ flex: 1}}>
                        <ScrollView>
                            
                            <View style={{ paddingHorizontal: 25 }}>
                                <View style={{ width: '100%', marginBottom: 10, marginTop: 10}}>
                                    <TouchableOpacity style={[flexRow, styles.propertyContainer]} >
                                        <View style={styles.imgContainer}>
                                            <Image source={imgUrl} resizeMode="cover" style={imgStyle} />
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <MyText style={[textExtraBold, textH4Style, textDarkGrey]}>
                                                { tour ? tour.title : '***'}
                                            </MyText>
                                            <View style={{marginTop: 4}}>
                                                <StarComponent grey rating={tour && tour.rating ? tour.rating : 0} />
                                            </View>
                                            {/* <MyText style={[textH5Style, textGrey, { marginBottom: 15}]}>{address}</MyText> */}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[flexRow, detailsRow ]}>
                                    <View style={{ flex: 1}}>
                                        <MyText style={[textH5Style, textGrey]}>NAME</MyText>
                                    </View>
                                    <View style={{ flex: 1.6}}>
                                        <MyText style={[textBold, textH4Style]}>{orderDetails ? orderDetails.guest_Name : '***'}</MyText>
                                    </View>
                                </View>
                                <View style={[flexRow, detailsRow ]}>
                                    <View style={{ flex: 1}}>
                                        <MyText style={[textH5Style, textGrey]}>PHONE NUMBER</MyText>
                                    </View>
                                    <View style={{ flex: 1.6}}>
                                        <MyText style={[textBold, textH4Style]}>{orderDetails ? orderDetails.guest_PhoneNumber : '****'}</MyText>
                                    </View>
                                </View>
                                
                                
                                <View style={[flexRow, styles.checkRow, { borderTopWidth: 0, marginTop: 10}]}>
                                    <View style={{ alignItems: 'center'}}>
                                        <MyText style={[textH5Style,textGrey, { marginBottom: 30}]}>AMOUNT</MyText>
                                        <MyText style={[textBold, textH4Style]}>
                                            ₦ {orderDetails ? formatAmount(orderDetails.cost_Per_Person) : 0}
                                        </MyText>
                                    </View>
                                    <View style={{ alignItems: 'center'}}>
                                        <MyText style={[textH5Style,textGrey, { marginBottom: 30}]}>NO OF PEOPLE</MyText>
                                        <MyText style={[textBold, textH4Style]}>
                                            {orderDetails ? orderDetails.number_Of_People : 0}
                                        </MyText>
                                    </View>
                                    <View style={{ alignItems: 'center'}}>
                                        <MyText style={[textH5Style,textGrey, { marginBottom: 15}]}>TOUR DATE</MyText>
                                        <MyText style={[textBold, textH4Style]}>{orderDetails ? moment(orderDetails.start_Date).format('MMM DD, YYYY') : ''}</MyText>
                                        <MyText> - </MyText>
                                        <MyText style={[textBold, textH4Style]}>{orderDetails ? moment(orderDetails.end_Date).format('MMM DD, YYYY') : ''}</MyText>
                                        {/* <MyText style={[textBold, textH4Style]}>₦ {orderDetails ? formatAmount(orderDetails.orders[0].deliveryFee) : 0}</MyText> */}
                                    </View>
                                </View>

                                <View>
                                    <View style={[flexRow, styles.amountRow]}>
                                        <MyText style={[textGrey, textH4Style, textBold]}>Total Amount</MyText>
                                        <MyText style={[textH4Style, textSuccess, textH4Style, textBold]}>
                                            ₦ {orderDetails ? formatAmount(orderDetails.total_Cost) : 0}
                                        </MyText>
                                    </View>
                                </View>

                                <View style={{ marginBottom: 30, marginTop: 10}}>
                                    <LabelInput label={"Select A Payment Method"} picker labelStyle={[textGrey]}
                                        pickerOptions={this.state.paymentTypes.map(type => {
                                            return {
                                                label: type.name,
                                                value: type.name,
                                            }
                                        })}
                                        selectedOption={this.state.selectedId || (this.state.paymentTypes.length > 0 ? this.state.paymentTypes[0] : "")}
                                        onPickerChange={(e) => this.setState({selectedId: e})}
                                    />
                                </View>
                                
                            </View>
                            
                            <View style={{ paddingHorizontal: 20 }}>
                                {this.renderError()}
                            </View>
                            <View style={buttonContainerStyle}>
                                <CustomButton buttonText="Make Payment" buttonStyle={buttonStyle} onPress={this.makePayment} />
                            </View>
                        </ScrollView>
                    </View>
                    
                </View>
                
            </View>
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)', 
        width: '100%', height: '100%',
        justifyContent: 'flex-end'
    },
    
    modalContainer: {
        backgroundColor: colors.white, overflow: 'hidden', elevation: 4,
        flex: 1
        // paddingHorizontal: 20
    },
    mainHeader: {
        backgroundColor: colors.white, 
        // flex: 1
    },
    modalHeader: {
        marginTop: 20, alignItems: 'center', paddingHorizontal: 20,
    },
    headerStyle: {
        paddingBottom: 10, paddingTop: 10
    },
    imgContainer: {
        width: 70, height: 70, borderRadius: 70, overflow: 'hidden', marginRight: 20, backgroundColor: colors.lightGrey,
        borderWidth: 2, borderColor: colors.orange
    },
    lineStyle: {
        width: '22%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, 
        marginLeft: 40
    },
    checkRow: {
        paddingVertical: 15, borderBottomWidth: 1, borderTopWidth: 1, justifyContent: 'space-between',
        borderColor: colors.lightGrey, paddingHorizontal: 5
    },
    amountRow: {
        justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderColor: colors.lightGrey,
        marginBottom: 10
    },
    detailsRow: {
        paddingHorizontal: 8, paddingVertical: 18, alignItems: 'center', borderBottomWidth: 1,
        borderColor: colors.lightGrey,
    },
    closeStyle: {
        height: 30, flex: 1, alignItems: 'flex-end', 
        // borderWidth: 1
    },
    buttonContainerStyle: {
        paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20, backgroundColor: colors.white, elevation: 6
    },
    buttonStyle: {
        elevation: 2, borderRadius: 0
    },
    
});

export default ConfirmAndPayModal;
