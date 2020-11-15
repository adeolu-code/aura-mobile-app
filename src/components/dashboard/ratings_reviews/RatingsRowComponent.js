import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText } from '../../../utils/Index';
import colors from '../../../colors';
import { Icon } from 'native-base'
import moment from 'moment';
import StarComponent from '../../StarComponent';

class RatingsRowComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { container, headerStyles, bodyStyles, headerImgContainer, headerTextContainer, thumbStyles, 
      lowerContainer, iconStyle, orangeIcon, starContainer } = styles
    const { flexRow, imgStyle, textH5Style, textBold, textH4Style, textDarkGrey, textGrey, textH6Style } = GStyles;
    const { wrapperStyle, propertyName, address, review, profilePicture, propertyUrl, guestName, reviewedOn, rating } = this.props;
    const formattedDate = moment(reviewedOn).format('hh:mm')


    return (
        
        <View style={[container, wrapperStyle]}>
            <View style={[flexRow, headerStyles]}>
                <View style={headerImgContainer}>
                    <Image source={propertyUrl} resizeMode="cover" style={imgStyle} />
                </View>
                <View style={headerTextContainer}>
                    <View style={[flexRow, { justifyContent: 'space-between'}]}>
                      <MyText style={[textBold, textH4Style]}>{propertyName}</MyText>
                      <MyText style={[textH5Style, textGrey]}>{formattedDate}</MyText>
                    </View>
                    <MyText style={[textGrey, textH5Style, { marginTop:4}]}>{address}</MyText>

                    <View style={[flexRow, starContainer]}>
                        <StarComponent rating={rating} starContainer={{ marginBottom: 0}} />
                        <MyText style={[textH5Style, textGrey]}>({rating}/5)</MyText>
                    </View>
                </View>
            </View>

            <View style={[flexRow, lowerContainer]}>
                <View style={thumbStyles}>
                    <Image source={profilePicture} resizeMode="cover" style={imgStyle} />
                </View>
                <MyText style={[textH6Style, textGrey]}>Rated by <MyText style={[textBold]}>{guestName}</MyText></MyText>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20, paddingTop: 20, width: '100%'
      // borderWidth: 1
    },
    headerStyles: {
      marginBottom: 10
    },
    headerImgContainer: {
      width: 55, height: 55, borderRadius: 55, overflow: 'hidden', marginRight: 15
    },
    headerTextContainer: {
      flex: 1, justifyContent: 'center'
    },
    starContainer: {
        marginTop: 10, alignItems: 'center', 
    },
    lowerContainer: {
      alignItems: 'center', marginTop: 10, borderBottomWidth: 1, borderBottomColor: colors.lightGrey, width: '100%',
      paddingBottom: 25
    },
    thumbStyles: {
      height: 30, width: 30, overflow: 'hidden', borderRadius: 40, marginRight: 10
    },
    iconStyle: {
      fontSize: 12, marginRight: 6, color: colors.grey
    },
    orangeIcon: {
        color: colors.orange
    },
  });

export default RatingsRowComponent;
