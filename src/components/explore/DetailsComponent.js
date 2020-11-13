import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import { MyText, CustomButton } from '../../utils/Index';


import colors from '../../colors';




class DetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderNotes = () => {
      const { house } = this.props
      const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, 
        imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
      const notes = house.notes;
      if(notes.length !== 0) {
          return notes.map((item, index) => {
              return (
                <MyText style={[textH4Style, textGrey]} key={index}>- {item}</MyText>
              )
          })
      }
      return (<MyText style={[textH4Style, textGrey]} >
        Great choice
      </MyText>)
  }

  render() {
    const {  contentContainer, divider, container, iconStyle, rowStyle, headerStyle } = styles;
    const { flexRow, textH2Style, textExtraBold, textBold, textGrey, textH4Style, 
            imgStyle, textWhite, textH3Style, textDarkGrey } = GStyles
    return (
        <View style={container}>
            <View style={headerStyle}>
                <MyText style={[textH2Style, textExtraBold]}>Things To Keep In Mind</MyText>
            </View>
            <View style={contentContainer}>
                <MyText style={[textH4Style, textGrey]}>
                {this.renderNotes()}
                </MyText>
            </View>
            <View style={divider}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    headerStyle: {
        marginBottom: 15, marginTop: 20
    },
    contentContainer: {
        marginBottom: 30
    },
    
    divider: {
        width: '100%', height: 1, backgroundColor: colors.lightGrey,
        // marginVertical: 30
    },
});

export default DetailsComponent;
