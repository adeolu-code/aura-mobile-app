import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../colors'

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { progressContainer, progress } = styles
    const { width } = this.props
    const len = width || 100
    return (
        <View style={progressContainer}>
            <View style={[progress, { width: `${len}%` }]}></View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    progressContainer: {
        height: 8, width: '100%', backgroundColor: colors.lightGrey, borderRadius: 8, overflow: 'hidden', marginTop:10, marginBottom: 6
    },
    progress: {
        height: '100%', backgroundColor: colors.orange
    }
});

export default ProgressBar;
