import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import FoodComponent from './FoodComponent';
;
class ScrollContentFood extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { scrollItemContainer, scrollContainer } = styles;
    const { width } = Dimensions.get('window')

    // const actualWidth = (20/width) * 100
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
            <View style={[scrollContainer, { width: '100%' }]}>
                <View style={scrollItemContainer}>
                    <FoodComponent title="Breakfast Hub" img={require('../../assets/images/food/food.png')} location="Lagos" />
                </View>
                <View style={scrollItemContainer}>
                    <FoodComponent title="Breakfast Hub" img={require('../../assets/images/places/bed1.png')} location="Lagos" />
                </View>
                <View style={scrollItemContainer}>
                    <FoodComponent title="Breakfast Hub" img={require('../../assets/images/places/bed2.png')} location="Lagos" />
                </View>
                <View style={scrollItemContainer}>
                    <FoodComponent title="Breakfast Hub" img={require('../../assets/images/places/bed3.png')} location="Lagos" />
                </View>
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30
    }, 
    scrollItemContainer: {
        marginRight: '1.8%', width: '21.5%', 
    },
});

export default ScrollContentFood;
