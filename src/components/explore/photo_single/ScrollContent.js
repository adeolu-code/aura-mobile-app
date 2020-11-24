import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText } from '../../../utils/Index';
import GStyles from '../../../assets/styles/GeneralStyles';
import PhotoComponent from '../PhotoComponent';

class ScrollContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPhotos = () => {
      const { photographers } = this.props;
      if(photographers.length !== 0 ) {
          return photographers.map((item, i) => {
              const key = `PH_${i}`
              const fullName = `${item.firstName} ${item.lastName}`;
                const coverPhoto = item.coverPhoto ? {uri: item.coverPhoto} : require('../../../assets/images/no_photo_img.png')
              return (
                <View style={styles.scrollItemContainer} key={key}>
                    <PhotoComponent img={coverPhoto} {...this.props} title1={fullName} title2="Photographer" photo={item} />
                </View>
              )
          })
      }
  }

  render() {
    const { scrollContainer } = styles
    const { width } = Dimensions.get('window')
    // const actualWidth = (20/width) * 100
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
            <View style={[scrollContainer, { width: '100%' }]}>
                {this.renderPhotos()}
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
