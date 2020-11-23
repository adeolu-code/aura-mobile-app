/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
// import { MyText } from '../../utils/Index';
// import GStyles from '../../assets/styles/GeneralStyles';
import PhotoComponent from './PhotoComponent';
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
                    <PhotoComponent img={require('../../../assets/images/photo/photo5.png')} 
                    title2="Ronald Matthews" location="Lagos" title1="N 6,000/ person" {...this.props} />
                </View>
                <View style={scrollItemContainer}>
                    <PhotoComponent img={require('../../../assets/images/photo/pic2.png')} 
                    title2="Carmen Cooper" location="Lagos" title1="N 3,500/ person" {...this.props} />
                </View>
            </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: 'row', marginVertical: 30,
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '21.5%',
    },
});

export default ScrollContent;
