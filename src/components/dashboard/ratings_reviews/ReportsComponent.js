import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GStyles from '../../../assets/styles/GeneralStyles';
import { MyText } from '../../../utils/Index';
import colors from '../../../colors';

import RatingsRowComponent from './RatingsRowComponent';



class ReportsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderEmptyContainer = () => {
    const { emptyContainerStyle } = styles;
    const { imgStyle, textCenter, textOrange, textBold, textH4Style } = GStyles
    const { state } = this.props.reviewsContext
    
    return (
        <View style={{ flex: 1, paddingVertical: 60}}>
            <View style={emptyContainerStyle}>
                <Image source={require('../../../assets/images/photo/undraw.png')} style={imgStyle} resizeMode="contain" />
            </View>
            <MyText style={[textBold, textCenter, textOrange, textH4Style]}>No reports</MyText>
        </View>
    )
    
}

  render() {
    return (
      <View style={styles.contentContainer}>
        {this.renderEmptyContainer()}
        {/* <RatingsRowComponent />
        <RatingsRowComponent /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
      paddingTop: 210, paddingBottom:30
  },
  emptyContainerStyle: {
      height: 200, width: '100%', marginBottom: 20
  }
});

export default ReportsComponent;
