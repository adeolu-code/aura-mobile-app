/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, ScrollView, Keyboard, Platform } from 'react-native';
import { Icon, Picker } from 'native-base';
import colors from '../../../colors';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText, CustomButton, ItemCountPicker, Error, CustomInput, Loading } from '../../../utils/Index';

import moment from 'moment';

import { formatAmount, notEmpty, shortenXterLength } from '../../../helpers'

import { urls, Request } from '../../../utils'



class OrderFoodModal extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [], operationValue: '', orderedForMobile: '', orderedForName: '', orderedForAddress: '', 
        delivery: false, loading: false, groupedFoods: {} };
    }
    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.foods.length !== prevProps.foods.length) {
            this.groupFoods()
        }
    }
    groupFoods = () => {
        const { foods } = this.props
        if(foods.length > 0) {
            const obj = {}
            foods.forEach(food => {
                if(obj[food.id]) {
                    obj[food.id] = [...obj[food.id], food]
                } else {
                    obj[food.id] = [food]
                }
            });
            this.setState({ groupedFoods: obj })
        } else if(foods.length === 0) {
            this.setState({ groupedFoods: {} })
        }
    }
    onValueChange = (value) => {
        this.setState({ operationValue: value })
        const { restaurant } = this.props;
        const operations = restaurant.operations
        const operation = operations.find(item => item.id === value)
        if(operation && operation.name.toLowerCase() === 'delivery') {
            this.setState({ delivery: true })
        } else {
            this.setState({ delivery: false })
        }
    }
    onChangeValue = (attrName, value) => {
        this.setState({ [attrName]: value });
    }
    renderLoading = () => {
        const { loading } = this.state;
        if(loading) { return (<Loading wrapperStyles={{ width: '100%', height: '100%', zIndex: 1000}} />) }
    }
    
    setCountValue = (value, food) => {
        // const { foods } = this.props
        // const obj = { item: foods[0], count: value }
        // this.props.setCount(obj)
        const obj = { item: food, count: value }
        this.props.setCount(obj)
    }
    onDecline = () => {
        this.props.onDecline();
    }
    renderError = () => {
        const { errors } = this.state
        if(errors.length !== 0) {
            return (<Error errors={errors} />)
        }
    }
    validate = () => {
        const { foods } = this.props
        const { orderedForName, orderedForAddress, orderedForMobile } = this.state
        if(foods.length < 1 || orderedForAddress === '' || orderedForMobile === '' || orderedForName === '') {
            return true
        }
        return false
    }
    
    submit = async () => {
        // this.props.onDecline();
        // this.props.next()
        Keyboard.dismiss()
        const { foods, restaurant } = this.props
        const { groupedFoods } = this.state
        // const food = foods[0]
        const { orderedForAddress, orderedForMobile, orderedForName } = this.state
        const keys = Object.keys(groupedFoods)
        const orders = keys.map((item) => {
            const values = groupedFoods[item]
            const food = values[0]
            return { menuId: food.id, quantity: values.length, 
                unitCost: food.price, deliveryFee: restaurant.averageDeliveryFee, serviceCharge: 0 }
        })
        const obj = {
            orderedForAddress,
            orderedForMobile,
            orderedForName,
            orders
            // orders: [{
            //     menuId: food.id,
            //     quantity: foods.length, 
            //     unitCost: food.price, deliveryFee: restaurant.averageDeliveryFee, serviceCharge: 0
            // }]
        }
        // console.log(obj)
        try {
            this.setState({ loading: true })
            const res = await Request(urls.restaurantBase, `${urls.v}restaurant/orders/${restaurant.id}`, obj);
            console.log('orders ', res)
            this.setState({ loading: false })
            if(res.isError || res.IsError) {
                this.setState({ errors: [res.message]})
            } else {
                this.props.onDecline();
                this.props.next(res.data)
            }
        } catch (error) {
            this.setState({ loading: false })
        }
        
    }

    renderName = () => {
        const { restaurant } = this.props;
        if(restaurant) {
            return restaurant.name
        }
    }
    renderFood = () => {
        const { imgStyle, textExtraBold, textH4Style, textH5Style, flexRow, textGrey } = GStyles
        const { foodContainer, leftContainer, imgContainer, contentContainer } = styles
        const { groupedFoods } = this.state
        const keys = Object.keys(groupedFoods)
        return keys.map((item) => {
            const values = groupedFoods[item]
            const food = values[0]
            const imgUrl = food.assetPath ? { uri: food.assetPath } : require('../../../assets/images/no_food.png')
            return (
                <View style={[flexRow, foodContainer]}>
                    <View style={leftContainer}>
                        <View style={imgContainer}>
                            <Image source={imgUrl} resizeMode="cover" style={imgStyle} />
                        </View>
                    </View>
                    <View style={contentContainer}>
                        <MyText style={[textH4Style, textExtraBold, { marginBottom: 2, marginTop: -3, paddingTop: 0 }]}>{food.mealName}</MyText>
                        <MyText style={[textH5Style, textGrey, { marginBottom: 5 }]}>{shortenXterLength(food.description,30)}</MyText>
                        {/* <MyText style={[textExtraBold, textSuccess, textH5Style]}>₦ {formatAmount(item.price)} / plate</MyText> */}
                    </View>
                </View>
            )
        })
        
    }

    renderCountPicker = () => {
        const { groupedFoods } = this.state
        const keys = Object.keys(groupedFoods)
        return keys.map((item) => {
            const values = groupedFoods[item]
            const firstValue = values[0]
            const title = `${firstValue.mealName}`
            const subtitle = `@ ₦${firstValue.price}`
            return (
                <ItemCountPicker title={title} subtitle={subtitle} value={values.length} countValue={(value) => {this.setCountValue(value, firstValue)}}  />
            )
        })
        
    }
    totalAmount = () => {
        const { foods, restaurant } = this.props;
        const { delivery } = this.state
        if(foods.length > 0) {
            let price = foods.reduce((sum, current) => sum + current.price, 0);;
            // const food = foods[0];
            // let price = food.price * foods.length
            if(delivery) {
                price += restaurant.averageDeliveryFee
            }
            return formatAmount(price)
        }
    }
    renderTotal = () => {
        const { foods } = this.props;
        const { textH3Style, textBold, textExtraBold, textSuccess, textH4Style, flexRow, textGrey} = GStyles
        
        if(foods.length > 0) {
            const food = foods[0];
            return (
                <View style={[flexRow, styles.totalContainer]}>
                    <MyText style={[textH4Style, textGrey ]}>
                        {/* <MyText style={[textBold]}>Total Amount</MyText> ( {food.price} * {foods.length} )</MyText> */}
                        <MyText style={[textBold]}>Total Amount</MyText> </MyText>
                    <MyText style={[textH3Style, textExtraBold, textSuccess ]}>₦ {this.totalAmount()}</MyText>
                </View>
            )
        }
    }

    renderDeliveryAmount = () => {
        const { delivery } = this.state;
        const { restaurant } = this.props
        const { textH3Style, textBold, textExtraBold, textSuccess, textH4Style, flexRow, textGrey} = GStyles
        if(delivery) {
            return (
                <View style={[flexRow, styles.totalContainer]}>
                    <MyText style={[textH4Style, textGrey, textBold ]}>Delivery Fee</MyText>
                    <MyText style={[textH3Style, textExtraBold, textSuccess ]}>₦ {formatAmount(restaurant.averageDeliveryFee)}</MyText>
                </View>
            )
        }
    }

  render() {
    const { visible, onDecline } = this.props;
    const { modalContainer, contentContainer, modalHeader, lineStyle, closeStyle, buttomStyle, container, itemCountContainer,
        headerStyle, mainHeader, totalContainer, buttonStyle, buttonContainerStyle, picker } = styles;
    const { flexRow, textH2Style, textExtraBold, textDarkGrey, textCenter, textGrey, textH3Style, textOrange, 
        textBold, textH4Style } = GStyles;
    const { restaurant } = this.props
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
            <View style={container}>
                
                <View style={modalContainer}>
                {this.renderLoading()}
                    <View style={mainHeader}>
                        <View style={[flexRow, modalHeader]}>
                            
                            <View style={{ flex: 6, alignItems: 'center',  paddingRight: 50 }}>
                                <View style={lineStyle}></View>
                            </View>
                            <TouchableOpacity style={closeStyle} onPress={this.onDecline}>
                                <Icon type="Feather" name="x" />
                            </TouchableOpacity>
                        </View>
                        <View style={headerStyle}>
                            <MyText style={[textH3Style, textBold, textGrey, textCenter]}>
                                Order from 
                            </MyText>
                            <MyText style={[textH2Style, textExtraBold, textOrange, textCenter, { marginTop: 10}]}>
                                {this.renderName()}
                            </MyText>
                        </View>
                    </View>
                    
                    <View style={{ flex: 1}}>
                        <ScrollView keyboardShouldPersistTaps="always">
                            {this.renderFood()}
                            <View style={{ paddingHorizontal: 25, marginTop: 20 }}>
                                <MyText style={[textH3Style, textBold, textGrey ]}>Delivery Options</MyText>
                                <View style={picker}>
                                    {restaurant ? <Picker mode="dropdown" Icon={<Icon name="md-arrow-down" />} 
                                    placeholder="Select delivery option"
                                        style={{ width: Platform.OS === 'ios' ? '100%' : undefined }} 
                                        selectedValue={this.state.operationValue}
                                        onValueChange={this.onValueChange}>
                                        {restaurant.operations.map(item => {
                                            return (
                                                <Picker.Item label={item.name} value={item.id} key={item.id} />
                                            )
                                        })}
                                    </Picker> : <></>}
                                </View>
                            </View>
                            <View style={itemCountContainer}>
                                {this.renderCountPicker()}
                                {this.renderDeliveryAmount()}
                                {this.renderTotal()}
                                <View style={[flexRow, { marginTop: 25}]}>
                                    <Icon name="navigate" style={{ color: colors.orange, fontSize: 20, marginRight: 10}} />
                                    <MyText style={[textH3Style, textBold, textGrey, textCenter]}>Delivery to</MyText>
                                </View>
                                <CustomInput placeholder="Please enter phone number" attrName="orderedForMobile"
                                value={this.state.orderedForMobile} onChangeText={this.onChangeValue} />
                                <CustomInput placeholder="Please enter name" attrName="orderedForName"
                                value={this.state.orderedForName} onChangeText={this.onChangeValue} />
                                <CustomInput placeholder="Please delivery address" attrName="orderedForAddress"
                                value={this.state.orderedForAddress} onChangeText={this.onChangeValue} />
                            </View>
                            <View style={{ paddingHorizontal: 20 }}>
                                {this.renderError()}
                            </View>
                            <View style={buttonContainerStyle}>
                                <CustomButton buttonText="Proceed to Checkout" disabled={this.validate()} buttonStyle={buttonStyle} onPress={this.submit} />
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
        marginTop: Platform.OS === 'ios' ? 50 : 20, alignItems: 'center', paddingHorizontal: 20,
    },
    headerStyle: {
        paddingBottom: 10, paddingTop: 10
    },
    
    lineStyle: {
        width: '22%', height: 4, backgroundColor: colors.lightGrey, borderRadius: 10, 
        marginLeft: 80
    },
    closeStyle: {
        height: 30, flex: 1, alignItems: 'flex-end', 
        // borderWidth: 1
    },
    buttonContainerStyle: {
        paddingHorizontal: 20, paddingTop: 10, paddingBottom: 50, backgroundColor: colors.white, elevation: 6
    },
    buttonStyle: {
        elevation: 2, 
    },
    contentContainer: {
        flex: 4, 
        // borderWidth: 1
    },
    foodContainer: {
        paddingTop: 10, 
        // borderWidth: 1, 
        paddingHorizontal: 25
    },
    leftContainer: {
        flex: 1, 
        // borderWidth: 1
    },
    imgContainer: {
        width: 50, height: 40, borderRadius: 8, overflow: 'hidden', elevation: 1, backgroundColor: colors.lightGrey,
        ...GStyles.shadow
    },
    
    itemCountContainer: {
        paddingHorizontal: 25,marginBottom: 20, width: '100%', marginTop: 0
    },
    picker: {
        borderWidth: 1, borderRadius: 5, height: 50,
        borderColor: colors.lightGreyOne,
        marginTop: 15, justifyContent: 'center'
    },
    totalContainer: {
        justifyContent: 'space-between', borderBottomWidth: 1, paddingVertical: 15, borderBottomColor: colors.lightGrey
    }
});

export default OrderFoodModal;
