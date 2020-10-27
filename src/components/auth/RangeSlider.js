/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import RangeSlider from 'rn-range-slider';
import {Icon} from 'native-base';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';


class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rowContainer, increment, decrement} = styles;
    const { textBold, textH4Style, flexRow} = GStyles;
    const { title, onValueChanged, initialLowValue, initialHighValue, max } = this.props;
    return (
      <SafeAreaView>
        <View style={[flexRow]}>
            {/* <RangeSlider
                style={{width: '100%', height: 80 }} thumbColor='#9E008E' thumbRadius={13} thumbBorderColor="#9E008E"
                gravity={'center'} min={0} max={150000} step={200} labelBackgroundColor="#9E008E" labelBorderColor="#9E008E"
                selectionColor="#9E008E" initialLowValue={this.state.value1} initialHighValue={this.state.value2}
                blankColor="#c4c4c4"
                onValueChanged={(low, high, fromUser) => {
                    this.setState({value1: low, value2: high})
                }}
            /> */}
            <RangeSlider
                style={{width: '100%', height: 90}} gravity={'center'}
                min={0} max={max} step={1000}
                // textFormat= {String}
                textSize={20} selectionColor={colors.orange} blankColor="#f618" thumbBorderColor="#FF8300" labelBorderColor="#D9E1F0"
                lineWidth={8} labelGapHeight={8}
                labelBackgroundColor={colors.white}
                labelTextColor={colors.black}
                labelBorderWidth={0.5} labelPadding={10}
                initialLowValue={initialLowValue} initialHighValue={initialHighValue}
                onValueChanged={onValueChanged} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.white,
//     paddingHorizontal: 24,
//     marginTop: 140,
//     flex: 1,
//   },
  
});

export default Slider;
