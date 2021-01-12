import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import { MyText } from '../../utils/Index';
import colors from '../../colors';
import { Icon } from 'native-base'
import moment from 'moment';
import StarComponent from '../StarComponent';
import { formatAmount } from '../../helpers';

class TransactionRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { container, headerStyles, bodyStyles, headerImgContainer, headerTextContainer, checkStyle } = styles
    const { flexRow, imgStyle, textH5Style, textBold, textH4Style, textDarkGrey, textGrey, textH6Style, textGreen } = GStyles;
    const { wrapperStyle } = this.props;
    

    const { transaction } = this.props
    const checkInDate = moment(transaction.check_In_Date).format('DD/MM/YYYY')
    const checkOutDate = moment(transaction.check_Out_Date).format('DD/MM/YYYY')

    const arrivalTime = moment(transaction.arrival_Time_From, "hh:mm:ss").format("h:mm a")
    const leaveTime = moment(transaction.arrival_Time_To, "hh:mm:ss").format("h:mm a");

    const imgUrl = transaction.userIdentityUrl ? { uri: transaction.userIdentityUrl } : require('../../assets/images/profile.png');
    const title = transaction.propertyInfo ? transaction.propertyInfo.title : '***'

    return (
        
      <View style={[container, wrapperStyle]}>
          <View style={[flexRow, headerStyles]}>
              <View style={headerImgContainer}>
                  <Image source={imgUrl} resizeMode="cover" style={imgStyle} />
              </View>
              <View style={headerTextContainer}>
                  <View style={[flexRow, { justifyContent: 'space-between'}]}>
                    <MyText style={[textBold, textH4Style]}>{title}</MyText>
                    <MyText style={[textH4Style, textGreen, textBold]}>₦ {formatAmount(transaction.total_Cost)}</MyText>
                  </View>
                  <View style={[flexRow, { justifyContent: 'space-between'}]}>
                    <View style={checkStyle}>
                      <MyText style={[textGrey, textH5Style, { marginBottom: 5}]}>Check In</MyText>
                      <MyText style={[textGrey, textH5Style]}>{checkInDate} {arrivalTime}</MyText>
                    </View>
                    <View style={[checkStyle, { alignItems: 'flex-end'}]}>
                      <MyText style={[textGrey, textH5Style, { marginBottom: 5}]}>Check Out</MyText>
                      <MyText style={[textGrey, textH5Style]}>{checkOutDate} {leaveTime}</MyText>
                    </View>
                  </View>
                  <MyText style={[textGrey, textH5Style]}>No of Room(s): <MyText style={[textBold]}>{transaction.no_Of_Rooms}</MyText></MyText>
              </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      // paddingHorizontal: 20, 
      paddingTop: 20, width: '100%', paddingBottom: 10,
      // borderWidth: 1,
      borderBottomWidth: 1, borderBottomColor: colors.lightGrey
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
    lowerContainer: {
      alignItems: 'center', marginTop: 10, borderBottomWidth: 1, borderBottomColor: colors.lightGrey, width: '100%',
      paddingBottom: 25
    },
    thumbStyles: {
      height: 30, width: 30, overflow: 'hidden', borderRadius: 40, marginRight: 10
    },
    checkStyle: {
      marginVertical: 8, flex: 1
    }
  });

export default TransactionRow;
