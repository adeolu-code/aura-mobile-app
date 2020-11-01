import React, { Component } from 'react';
import { Card, MyText } from '../../utils/Index';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GStyles from '../../assets/styles/GeneralStyles';

import FilterModal from './FilterModal';
import ManagePropertyRow from './ManagePropertyRow';


import colors from '../../colors';
import { Icon } from 'native-base';

class ApartmentsTab extends Component {
  constructor(props) {
    super(props);
    this.state = { showFilterModal: false };
  }
  openFilterModal = () => {
    this.setState({ showFilterModal: true });
  }
  closeFilterModal = () => {
    this.setState({ showFilterModal: false });
  }

  render() {
    const { contentContainer, rowContainer } = styles
    return (
        <View style={contentContainer}>
            <View style={rowContainer}>
                <ManagePropertyRow title="Umbaka Homes" img={require('../../assets/images/places/bed2.png')} 
                location="Transcorp Hilton Abuja" status="Pending" {...this.props} openModal={this.openFilterModal} />
            </View>
            <View style={rowContainer}>
                <ManagePropertyRow title="Umbaka Homes" img={require('../../assets/images/places/bed1.png')} openModal={this.openFilterModal}
                location="Transcorp Hilton Abuja" status="Online" {...this.props} />
            </View>
            <View style={rowContainer}>
                <ManagePropertyRow title="Westgate Suites" img={require('../../assets/images/places/bed.png')} 
                location="Transcorp Hilton Abuja" status="Online" {...this.props} openModal={this.openFilterModal} />
            </View>
            <FilterModal visible={this.state.showFilterModal} onDecline={this.closeFilterModal} img={require('../../assets/images/places/bed.png')}  title='Umbaka Homes' {...this.props} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingTop: 210, paddingHorizontal: 20, paddingBottom:30,
    },
    rowContainer: {
        marginBottom: 20,
    },
});

export default ApartmentsTab;
