import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MyText } from '../../utils/Index';
import GStyles from '../../assets/styles/GeneralStyles';
import colors from '../../colors';

class ScrollHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { title, white, noDot } = this.props
    const { dotStyle, dotContainer, textDotContainer, container, textContainer, dotActiveStyle, bottomBorderStyle, dotWhite } = styles;
    const { flexRow, textExtraBold, textH2Style, textWhite } = GStyles
    return (
      <View style={container}>
        <View style={[flexRow, textDotContainer]}>
            <View style={textContainer}>
                <MyText style={[textH2Style, textExtraBold, white ? textWhite : '']}>{title}</MyText>
            </View>
            {!noDot ? <View style={[flexRow, dotContainer]}>
                <View style={[dotStyle, white ? dotWhite: '', dotActiveStyle] }></View>
                <View style={[dotStyle, white ? dotWhite: '']}></View>
            </View> : <Fragment></Fragment>}
        </View>
        <View style={bottomBorderStyle}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {

    },
    textDotContainer: {
        alignItems: 'center', paddingHorizontal: 6
    },
    textContainer: {
        flex: 5, 
    },
    dotContainer: {
        flex:1, justifyContent: 'flex-end'
    },
    dotStyle: {
        height: 10, width: 10, backgroundColor: colors.lightGrey, borderRadius: 10, marginLeft:5
    },
    dotWhite: {
        backgroundColor: colors.white
    },
    dotActiveStyle: {
        backgroundColor: colors.orange
    },
    bottomBorderStyle: {
        backgroundColor: colors.orange, marginVertical: 12, height: 6, width: '35%', borderRadius:10
    }
});

export default ScrollHeader;
