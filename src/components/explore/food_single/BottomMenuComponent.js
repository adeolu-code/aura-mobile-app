/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

import { formatAmount, notEmpty } from '../../../helpers';

import { urls } from '../../../utils';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }


function BottomMenuComponent(props){
  const [show, setShow] = useState(false)
  const [state, setState] = useState({ groupedFoods: {} })
  const onRemoveItem = (value) => {
    props.onRemove(value)
  }
  const { flexRow, textExtraBold, textBold, textGrey, textH4Style, textSuccess, textH6Style, textH5Style } = GStyles;
  const { foods, onRemove, onPress, disabled } = props;
  const { container, buttonStyle, buttonContainer } = styles;

  const onShowMore = () => {
    LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.scaleXY
        )
      );
    setShow(!show)
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  useEffect(() => {
      groupFoods()
      return () => {
          
      }
  }, [props.foods])

  const groupFoods = () => {
    if(foods.length > 0) {
        const obj = {}
        foods.forEach(food => {
            if(obj[food.id]) {
                obj[food.id] = [...obj[food.id], food]
            } else {
                obj[food.id] = [food]
            }
        });
        setState((prevState) => ({ ...prevState, groupedFoods: obj }))
    } else if(foods.length === 0) {
        setState((prevState) => ({ ...prevState, groupedFoods: {} }))
    }
  }

  const renderPrice = () => {
      if(notEmpty(state.groupFoods)) {
        
        const keys = Object.keys(state.groupedFoods)
        return keys.map((item) => {
            const values = state.groupedFoods[item]
            const firstValue = values[0]
            return (
                <View style={{ height: 40}}>
                    {/* <Icon name="cart" /> */}
                    {/* <MyText style={[textGrey, textH6Style]}>Price:</MyText> */}
                    <View style={[flexRow, { marginBottom: 6, height: 35}]}>
                        <View style={{ flex: 2.5}}>
                            <MyText style={[textSuccess, textH4Style, textBold]}>₦ {formatAmount(firstValue.price)} / plate * {values.length}</MyText>
                        </View>
                        <View style={{ flex:1}}>
                            <TouchableOpacity style={styles.iconStyle} onPress={() => {onRemoveItem(firstValue)}}>
                                <Icon name="remove-outline" style={{ color: colors.white, fontSize: 18, marginRight: -1}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> 
            )
        })
        // const getFirstFood = foods[0]
        // return (
        //     <View style={{flex: 1}}>
        //         {/* <Icon name="cart" /> */}
        //         <MyText style={[textGrey, textH6Style]}>Price:</MyText>
        //         <View style={[flexRow]}>
        //             <MyText style={[textSuccess, textH4Style, textBold]}>₦ {formatAmount(getFirstFood.price)} / plate * {foods.length}</MyText>
        //             <TouchableOpacity style={styles.iconStyle} onPress={onRemove}>
        //                 <Icon name="remove-outline" style={{ color: colors.white, fontSize: 18, marginRight: -1}} />
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        // )
      }
  }

    

  
    
    return (
        <View>
             <View style={styles.showMoreStyle}>
                <TouchableOpacity style={styles.showMoreIcon} onPress={onShowMore}>
                    <Icon name={show ? "chevron-down" : "chevron-up"} type="Feather" style={{ fontSize: 26, color: colors.orange}} />
                </TouchableOpacity>
            </View>
            <View style={[flexRow, container, show ? styles.heightAuto : '']}>
            
                <View style={{flex: 1.5 }}>
                    {foods.length > 0 && <MyText style={[textGrey, textH6Style]}>Price:</MyText>}
                    {renderPrice()}
                    {/* <Icon name="cart" />
                    <MyText style={[textGrey, textH6Style]}>Price:</MyText>
                    <MyText style={[textSuccess, textH4Style, textBold]}>₦ {house ? formatAmount(house.pricePerNight) : '***'} / plate</MyText> */}
                </View>
                <View style={{flex: 1}}>
                    <View style={buttonContainer}>
                        <CustomButton buttonText="Order Food" disabled={disabled} textStyle={{ ...textH5Style}}
                        buttonStyle={buttonStyle} onPress={onPress} />
                    </View>
                </View>
                
            </View>
        </View>
    );
  
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, elevation: 4, width: '100%', backgroundColor: colors.white,
        paddingTop: 10, paddingBottom: 20, height: 85, overflow: 'hidden'
    },
    heightAuto: {
        height: 'auto'
    },
    
    contentContainer: {
        marginBottom: 30
    },
    buttonStyle: {
        borderRadius: 6, elevation: 2
    },
    buttonContainer: {
        paddingTop: 14,
        // marginVertical: 40
    },
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
    },
    iconStyle: {
        width: 25, height: 25, backgroundColor: colors.orange, borderRadius: 25, justifyContent: 'center', alignItems: 'center',
        marginLeft: 20, opacity: 0.8
    },
    showMoreStyle: {
        width: '100%', justifyContent: 'center', alignItems: 'center'
    },
    showMoreIcon: {
        borderWidth: 1, borderColor: colors.orange, height: 25, width: 45, justifyContent: 'center', alignItems: 'center',
        borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: colors.white
    }
});

export default BottomMenuComponent;
