import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';
import { Icon } from 'native-base'

class DashboardCardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderIcon = () => {
    const { iconName, type, img } = this.props;
    const { imgStyle } = GStyles
    if(iconName) {
        return (
            <Icon name={iconName || 'home' } type={ type || 'MaterialIcons'} style={{ color: colors.grey }} />
        )
    }
    return (
        <Image source={img} resizeMode="contain" style={imgStyle} />
    )
  }

  render() {
    const { cardStyle, imgContainer, leftContainer, rightContainer, iconStyle } = styles
    const { textH4Style, textFadedBlack, textBold, textH3Style, lineHeightText, marginBottomSmall, imgStyle, textH5Style , textGrey} = GStyles;
    const { title, description, img, iconX, onPressOut, onPressIn, onPress, iconName } = this.props
    const iconType = iconX ? "close" : "add";
    return (
      <View>  
        <TouchableOpacity onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={{ width: '100%', backgroundColor: colors.white,}}>
            <Card style={cardStyle}>
                <View style={leftContainer}>
                    <View style={imgContainer}>
                        {this.renderIcon()}
                        <Icon type="Ionicons" name={iconType} style={iconStyle} />
                    </View>
                    
                </View>
                <View style={rightContainer}>
                    <MyText style={[textFadedBlack, textH4Style, textBold, marginBottomSmall]}>{title}</MyText>
                    <MyText style={[lineHeightText, textH5Style, textGrey]}>
                        {description}
                    </MyText>
                </View>
            </Card>
        </TouchableOpacity>
      </View>
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
        position: 'absolute', fontSize: 12, color: colors.orange,
        // top: 20, right: 8,
        top: -10, right: -2
        // borderWidth: 1,
    }
});

export default DashboardCardComponent;
