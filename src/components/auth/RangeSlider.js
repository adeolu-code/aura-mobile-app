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
    const { title } = this.props;
    return (
      <SafeAreaView>
        <View style={[flexRow]}>
            <RangeSlider
                style={{width: '100%', height: 80}}
                gravity={'center'}
                min={0}
                max={8000}
                step={1000}
                // textFormat= {String}
                textSize={20}
                selectionColor={colors.orange}
                blankColor="#f618"
                thumbBorderColor="#FF8300"
                labelBorderColor="#D9E1F0"
                lineWidth={8}
                labelGapHeight={8}
                labelBackgroundColor={colors.white}
                labelTextColor={colors.black}
                labelBorderWidth={0.5}
                onValueChanged={(low, high, fromUser) => {
                this.setState({rangeLow: low, rangeHigh: high});
            }}/>
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
