/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, SafeAreaView,StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'native-base';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import GStyles from '../../assets/styles/GeneralStyles';


class ListProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0,
      };
  }

  increment = () => {
    const count = this.state.count + 1
    this.props.countValue(count)
    this.setState({ count });
  }

  decrement = () => {
    if (this.state.count === 0){
      this.props.countValue(0)
      this.setState({ count:0 });
    } else {
      const count = this.state.count - 1
      this.props.countValue(count)
      this.setState({ count });
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
            <View style={[flexRow, {flex: 2.5, alignContent: 'space-between'}]}>
                <View>
                  <TouchableOpacity style={decrement} onPress={this.decrement}>
                      <Icon name="remove-outline"  style={{color: colors.orange, fontSize: 20}} />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <MyText style={[textBold, textH4Style]}>{this.state.count}</MyText>
                </View>
                <View>
                    <TouchableOpacity style={increment} onPress={this.increment}>
                        <Icon name="add-outline" style={{color: '#fff', fontSize: 22, marginRight: -1}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.white,
//     paddingHorizontal: 24,
//     marginTop: 140,
//     flex: 1,
//   },
  rowContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGreyOne,
      // height: 50,
      paddingTop: 20, paddingBottom: 15
  },
  button: {
      marginTop: 50,
       marginBottom: 20,
    },
decrement: {
    color: '#FF8300',
    backgroundColor: '#FFD9B2',
    height: 25,
    width: 25,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
    borderWidth: 1,
    borderColor: '#FF8300',
},
increment: {
    backgroundColor: '#FD8323',
    height: 25,
    width: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FD8323',
},
});

export default ListProperty;
