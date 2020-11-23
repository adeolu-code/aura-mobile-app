/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { MyText } from './MyText';
import GStyles from '../assets/styles/GeneralStyles';
import colors from '../colors';
import { color } from 'react-native-reanimated';

class SearchInput extends Component {
    state = { secure: true }
    
    
    render() {
        const { InputContainerStyles, inputStyle, searchContainer, iconStyle,  } = styles;
        const { textH4Style, textGrey, textBold, textLightGrey } = GStyles;
        const { placeholder, imageUrl, onChangeText, secureTextEntry, value, onFocus, onBlur, password,
            autoCapitalize, textInputStyle, onChange, placeholderColor, onPress } = this.props;
        
        const keyboard = this.props.keyType ? this.props.keyType : 'default'
        return (
              
            <View style={InputContainerStyles}>
                {/* <TextInput style={[inputStyle, textInputStyle ]} onChangeText={onChangeText}
                secureTextEntry={secureTextEntry && this.state.secure} autoCorrect={false} value={value}
                onBlur={onBlur} onFocus={onFocus} autoCapitalize={ autoCapitalize || 'none'}
                placeholder={placeholder || 'Placeholder'} onChange={onChange} keyboardType={keyboard}
                placeholderTextColor={placeholderColor || "#646464"} /> */}
                <TouchableOpacity style={[inputStyle, textInputStyle, {justifyContent: 'center'} ]} onPress={onPress}>
                    <MyText style={[textGrey, textH4Style]}>Search locations</MyText>
                </TouchableOpacity>

                <TouchableOpacity style={searchContainer}>
                    <Icon type="Ionicons" name="search" style={iconStyle} />
                </TouchableOpacity>
            </View>
                
        )
    }
}
const styles = StyleSheet.create({
    InputContainerStyles:{
        display: 'flex', flexDirection: 'row', width: '100%', marginVertical: 10
    },
    inputStyle: {
        paddingLeft: 15,paddingRight: 20,height: 45, backgroundColor: colors.white,
        fontSize: 14, color: colors.darkGrey, fontFamily: 'Nunito-bold',
        flex: 4, borderTopEndRadius: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
        // borderTopRightRadius: 20
    },
    searchContainer: {
        backgroundColor: colors.orange, flex: 1, justifyContent: 'center', alignItems: 'center',
        borderTopRightRadius: 5, borderBottomRightRadius: 5
    },
    iconStyle: {
        fontSize: 16, color: colors.white
    }
})

export { SearchInput }
