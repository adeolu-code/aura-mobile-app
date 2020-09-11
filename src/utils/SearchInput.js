import React, { Component } from 'react'
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { MyText } from './MyText';
import GStyles from '../assets/styles/GeneralStyles';

class SearchInput extends Component {
    state = { secure: true }
    
    
    render() {
        const { InputContainerStyles, inputStyle, lTextStyles
         } = styles;
        const { textH4Style, textBold } = GStyles;
        const { placeholder, imageUrl, onChangeText, secureTextEntry, value, onFocus, onBlur, password,
            autoCapitalize,textInputStyle, onChange, iconName, label, sublabel, placeholderColor } = this.props;
        
        const keyboard = this.props.keyType ? this.props.keyType : 'default'
        return (
            <View>
                
                <View style={InputContainerStyles}>
                    <TextInput style={[inputStyle, textInputStyle ]} onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && this.state.secure} autoCorrect={false} value={value}
                    onBlur={onBlur} onFocus={onFocus} autoCapitalize={ autoCapitalize || 'none'}
                    placeholder={placeholder || 'Placeholder'} onChange={onChange} keyboardType={keyboard}
                    placeholderTextColor={placeholderColor || "rgba(193, 221, 247, 0.5)"} />

                    <View>
                        
                    </View>
                    
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    InputContainerStyles:{
        display: 'flex',
        position: 'relative',
        width: '100%',
        // flex: 1
    },
    
    ImageStyles: {
        width: 18,
        height: 18,
    },
    inputStyle: {
        paddingLeft: 40,
        paddingRight: 20,
        height: 45,
        borderBottomColor: '#D5D5D5',
        borderBottomWidth: 1,
        // borderWidth: 1,
        fontSize: 17, color: '#D7E8F7', fontFamily: 'Nunito-bold'
    },
    InputWithImgStyle: {
        paddingLeft: 0
    },
    inputRightPadding: {
        paddingRight: 20
    },
    showImgContainerStyle: {
        position: 'absolute', right: 0, top: 0, height: 50,
        width: 50, display: 'flex',justifyContent: 'center',alignItems: 'center',
    },
    lStyles: {
        paddingLeft: 40, color: 'rgba(193, 221, 247, 0.6)', 
    },
    lTextStyles: {
        paddingRight: 10
    },
    showImg:{
        width: 22, height: 22
    }
})

export { SearchInput }
