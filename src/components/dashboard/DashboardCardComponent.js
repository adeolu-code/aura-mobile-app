import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, Text, StyleSheet, Image } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base'

class DashboardCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { cardStyle, imgContainer, leftContainer, rightContainer, iconStyle } = styles
    const { textH4Style, textFadedBlack, textBold, textH3Style, lineHeightText, marginBottomSmall, imgStyle, textH5Style , textGrey} = GStyles;
    const { title, description, img, iconX } = this.props
    const iconName = iconX ? "close" : "add";
    return (
      <Card style={cardStyle}>
          <View style={leftContainer}>
              <View style={imgContainer}>
                <Image source={img} resizeMode="contain" style={imgStyle} />
              </View>
              <Icon type="Ionicons" name={iconName} style={iconStyle} />
          </View>
          <View style={rightContainer}>
              <MyText style={[textFadedBlack, textH4Style, textBold, marginBottomSmall]}>{title}</MyText>
              <MyText style={[lineHeightText, textH5Style, textGrey]}>
                  {description}
              </MyText>
          </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
    cardStyle: {
        display: 'flex', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 25, borderRadius: 10
    },
    leftContainer: {
        // borderWidth: 1,
        flex: 1.3, justifyContent: 'center', alignItems: 'center'
    },
    rightContainer: {
        flex: 5, paddingHorizontal: 5,paddingLeft: 20
        // borderWidth: 1,
    },
    imgContainer: {
        width: 50, height: 50, borderRadius: 50, backgroundColor: colors.lightGreyOne, justifyContent: 'center', alignItems: 'center',
        padding: 10, 
    },
    iconStyle: {
        position: 'absolute',top: 20, right: 8, fontSize: 10, color: colors.orange,
        // borderWidth: 1,
    }
});

export default DashboardCardComponent;
