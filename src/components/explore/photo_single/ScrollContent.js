import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText } from '../../../utils/Index';
import GStyles from '../../../assets/styles/GeneralStyles';
import HouseComponent from '../HouseComponent';
;
class ScrollContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { scrollItemContainer, scrollContainer } = styles
    const { width } = Dimensions.get('window')

    const { photo } = this.props

    // const actualWidth = (20/width) * 100
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
            <View style={[scrollContainer, { width: '100%' }]}>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../assets/images/photo/pic8.png')} 
                    title="Miguel Davis" location="Lagos" price="₦ 6000" {...this.props} />
                </View>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../assets/images/photo/pic1.png')} 
                    title="Sussy Sanders" location="Lagos" price="₦ 6000" {...this.props} />
                </View>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../assets/images/photo/pic2.png')} 
                        title="Miguel Davis" location="Lagos" price="₦ 6000" {...this.props} />
                </View>
                <View style={scrollItemContainer}>
                    <HouseComponent img={require('../../../assets/images/photo/pic3.png')} 
                        title="Sussy Sanders" location="Lagos" price="₦ 6000" {...this.props} />
                </View>
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '21.5%'
    },
});

export default ScrollContent;
