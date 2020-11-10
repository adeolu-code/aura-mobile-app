/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { MyText } from "../../../utils/Index";
import GStyles from "../../../assets/styles/GeneralStyles";

export default class RadioButton extends Component {
	state = {
		value: null,
	};

	render() {
		const { options, selectedOption } = this.props;
        const { value } = this.state;
        
        const { flexRow } = GStyles;
          const { radio, circle, checkedCircle } = styles

		return (
			<View>
				{options.map((item, index) => {
					return (
                        <View key={item.key} style={[flexRow, radio, this.props.style]}>
							<TouchableOpacity
								style={[circle]}
								onPress={() => {
									this.setState({
										value: item.key,
									});

									this.props.onPress && this.props.onPress(index);
								}}
							>
								{value === item.key || selectedOption == item.key && <View style={checkedCircle} />}
							</TouchableOpacity>
                            <View style={{flex: 9, marginLeft: 20}}>
                                <MyText>{item.text}</MyText>
                            </View>
						</View>
					);
				})}
			</View>
            //     {/* <Text>{this.state.value} </Text> */}
		);
	}
}

const styles = StyleSheet.create({
    radio: {
        flex: 1,
        height: 40,
    },
    circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#D9E1F0',
		alignItems: 'center',
		justifyContent: 'center',
	},
  
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
        backgroundColor: '#378915',
        // borderColor: '#378915',
        // borderWidth: 1,
    },
    // checkedCircleOne: {
	// 	width: 14,
	// 	height: 14,
	// 	borderRadius: 7,
    //     backgroundColor: '#378915',
    //     alignItems: 'center',
	// 	justifyContent: 'center',
    //     // borderColor: '#378915',
    //     // borderWidth: 1,
	// },
});