import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
        width: width <= 360 || height <= 667 ? 40 : 50, height: width <= 360 || height <= 667 ? 40 : 50,
        fontSize: 20, fontWeight: 'bold',color: '#121429',
        // fontFamily: 'NotoSans-Regular',
        paddingVertical: 0, textAlign: 'center',
        elevation: 0.3,
        backgroundColor: 'white'
    }
})

export { CustomInputNumber }
