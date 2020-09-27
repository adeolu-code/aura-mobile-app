/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import { MyText } from '../../../utils/Index';
import colors from '../../../colors';

import GStyles from '../../../assets/styles/GeneralStyles';


class ListGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0,
      };
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  }

  decrement = () => {
    if (this.state.count === 0){
        this.setState({
            count:0,
        });
      } else {
        this.setState({
            count: this.state.count - 1,
        });
  }
}
disabled = () => {

}
  render() {
    const { rowContainer, increment, decrement} = styles;
    const { textBold, textH4Style, flexRow} = GStyles;
    const { title } = this.props;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={[flexRow, rowContainer]}>
            <View style={{flex: 7}}>
                <MyText style={[textBold, textH4Style, {color: '#1E2B37'}]}>{title}</MyText>
            </View>
            <View style={[flexRow, {flex: 3, alignContent: 'space-between'}]}>
                <View>
                <TouchableOpacity style={decrement} onPress={this.decrement}>
                    <Icon name="remove-outline"  style={{color: '#FFF', fontSize: 20}} />
                </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <MyText style={[textBold, textH4Style]}>{this.state.count}</MyText>
                </View>
                <View>
                    <TouchableOpacity style={increment} onPress={this.increment}>
                        <Icon name="add-outline" style={{color: '#fff', fontSize: 20}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
      height: 50,
      paddingTop: 20,
  },
  button: {
      marginTop: 50,
       marginBottom: 20,
    },
decrement: {
    backgroundColor: '#FD8323',
    height: 20,
    width: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
    borderWidth: 1,
    borderColor: '#FD8323',
},
increment: {
    backgroundColor: '#FD8323',
    height: 20,
    width: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FD8323',
},
});

export default ListGuest;
