import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';

import { MyText } from '../../../utils/Index';

import { Icon } from 'native-base';

import colors from '../../../colors';

class ExploreLocation extends Component {
  constructor(props) {
    super(props);
    this.state = { statesArr: [
        {name: 'Lagos', imgUrl: 'https://images.pexels.com/photos/3316337/pexels-photo-3316337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Federal Capital Territory', imgUrl: 'https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Rivers', imgUrl: 'https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Oyo', imgUrl: 'https://images.pexels.com/photos/3172830/pexels-photo-3172830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Kaduna', imgUrl: 'https://images.pexels.com/photos/823696/pexels-photo-823696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Ogun', imgUrl: 'https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
        {name: 'Ondo', imgUrl: 'https://images.pexels.com/photos/1467300/pexels-photo-1467300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
    ], selected: ''};
  }

  renderClose = (item) => {
    const { statesArr, selected } = this.state
    const {closeContainer, iconStyle } = styles
    if(item.name === selected) {
        return (
            <TouchableOpacity style={[closeContainer]} onPress={this.removeState.bind(this, item)}>
                <Icon name="close" style={iconStyle} />
            </TouchableOpacity> 
        )
    }
  }
  selectState = (item) => {
    this.setState({ selected: item.name})
    this.props.onSelectState(item.name)
  }
  removeState = (item) => {
    this.setState({ selected: ''})
    this.props.onRemoveState(item.name)
  }

  renderLocation = () => {
      const { statesArr } = this.state;
      const { width } = Dimensions.get('window')
    //   const percent = ((statesArr.length * width)/statesArr.length)/(statesArr.length * width) * 100;
    const percent = 8
      const { textContainer, imgContainer, closeContainer, scrollItemContainer, overlayStyles, locationStyle, 
        locationContainer, iconStyle } = styles;
      const { imgStyle, flexRow, textWhite, textH5Style, textBold, textH6Style } = GStyles
      return statesArr.map((item, i) => {
        return (
            <TouchableOpacity style={[scrollItemContainer, { width: `${percent}%`}]} key={i} onPress={this.selectState.bind(this, item)}>
                <View style={imgContainer}>
                    <Image source={{uri: item.imgUrl}} resizeMode="cover" style={imgStyle} />
                    <View style={overlayStyles}>
                        <View style={[flexRow, locationContainer]}>
                            <Icon name="location-sharp" style={locationStyle} />
                            <MyText style={[textH5Style, textWhite, textBold]}>{item.name}</MyText>
                        </View>
                        {this.renderClose(item)}
                        {/* <TouchableOpacity style={[closeContainer]}>
                            <Icon name="close" style={iconStyle} />
                        </TouchableOpacity> */}
                    </View>
                </View>

            </TouchableOpacity>
        )
      })
  }

  render() {
    const { width } = Dimensions.get('window')
    const { textContainer, imgContainer, scrollContainer, scrollItemContainer, overlayStyles, locationStyle, locationContainer } = styles;
    const { imgStyle, flexRow, textH3Style, textExtraBold, textWhite, textH4Style,textH5Style, textBold, textH6Style, textBlackClose } = GStyles
    const { statesArr} = this.state
    return (
      <View>
        <View style={textContainer}>
            <MyText style={[textH3Style, textExtraBold, textBlackClose]}>Explore Nigeria</MyText>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: statesArr.length * width }}>
            <View style={[flexRow, scrollContainer]}>
                {this.renderLocation()}
            </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 20
    },
    imgContainer: {
        width: '100%', height: 70, borderRadius: 8, overflow: 'hidden',
    },
    scrollContainer: {
        flexDirection: 'row', marginVertical: 20, paddingHorizontal: 20
        // borderWidth: 1
    }, 
    scrollItemContainer: { 
        marginRight: '1.8%', width: '23%'
    },
    overlayStyles: {
        position: 'absolute', width: '100%', height: '100%', paddingHorizontal: 5, paddingVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'column', justifyContent: "space-between"
    },
    locationStyle: {
        fontSize: 15, color: colors.orange, marginRight: 3, paddingHorizontal: 5,
    },
    locationContainer: {
        alignItems: 'center'
    },
    closeContainer: {
        backgroundColor: colors.white, alignSelf: 'flex-end', borderTopLeftRadius: 5, borderBottomRightRadius: 5, 
        paddingHorizontal: 5, paddingVertical: 2,  elevation: 2
    },
    iconStyle: {
        fontSize: 25, color: colors.orange
    }
});

export default ExploreLocation;
