/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import colors from "../../../colors";
import { MyText } from "../../../utils/Index";
import GStyles from "../../../assets/styles/GeneralStyles";

export default class RadioButton extends Component {
	state = {
		value: null,
	};

	render() {
		const { options } = this.props;
        const { value } = this.state;
        
        const { textWhite, textH2Style, textExtraBold, textDarkBlue,textH3Style, textH6Style, textGrey, textH5Style, imgStyle, textH4Style, textCenter, textDarkGrey, textUnderline, 
            textGreen, textBold, flexRow } = GStyles;
          const { radio, circle, checkedCircle, checkedCircleOne } = styles

		return (
			<View>
				{options.map(item => {
					return (
                        <View key={item.key} style={[flexRow, radio]}>
							<TouchableOpacity
								style={[circle]}
								onPress={() => {
									this.setState({
										value: item.key,
									});
								}}
							>
								{value === item.key && <View style={checkedCircle} />}
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