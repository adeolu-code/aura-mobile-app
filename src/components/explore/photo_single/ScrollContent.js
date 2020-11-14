import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { MyText } from '../../../utils/Index';
import GStyles from '../../../assets/styles/GeneralStyles';
import HouseComponent from '../HouseComponent';
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
                    <PhotoComponent img={coverPhoto} {...this.props}
                    title1={fullName} {...this.props} title2="Photographer" />
                </View>
              )
          })
      }
  }

  render() {
    const { scrollItemContainer, scrollContainer } = styles
    const { width } = Dimensions.get('window')

    const { photographers } = this.props

    // const actualWidth = (20/width) * 100
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: 2 * width }}>
            <View style={[scrollContainer, { width: '100%' }]}>
                {this.renderPhotos()}
                {/* <View style={scrollItemContainer}>
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
                </View> */}
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
