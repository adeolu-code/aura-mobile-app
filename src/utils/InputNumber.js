import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native';

class CustomInputNumber extends Component {
    
    render() {
        const { onChangeText, value, refs, style } = this.props;
        const { TextInputStyle } = styles;
        return (
            <View>
                <TextInput style={[TextInputStyle, style]} 
                ref={refs} maxLength={1}
                onChangeText={onChangeText} value={value} keyboardType="numeric"
                numberOfLines={1} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    TextInputStyle: {
        borderWidth: 1,
        borderColor: '#D9E1F0',
        width: 50, height: 50,
        fontSize: 20, fontWeight: 'bold',color: '#121429',
        // fontFamily: 'NotoSans-Regular',
        paddingVertical: 0, textAlign: 'center',
        elevation: 0.3,
        backgroundColor: 'white'
    }
})

export { CustomInputNumber }
