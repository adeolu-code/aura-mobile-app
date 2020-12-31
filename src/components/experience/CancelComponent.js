import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MyText, CustomButton, Error } from "../../utils/Index";
import colors from "../../colors";

import { AppContext } from '../../../AppProvider';



class CancelComponent extends Component {
    static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = { };
  }
  cancel = () => {
    const { tourOnboard, editTour } = this.context.state
    this.context.set({ editTour: false })
    this.props.navigation.navigate('Tabs', { screen: 'Dashboard' })
  }

  render() {
    return (
        <View style={{ flex: 1, paddingRight: 10, ...this.props.wrapper}}>
            <CustomButton buttonText="Cancel" 
                buttonStyle={{ elevation: 2, borderColor: colors.orange, borderWidth: 1, backgroundColor: colors.white, }} 
                textStyle={{ color: colors.orange }}
                onPress={this.cancel} />
        </View>
    );
  }
}

export default CancelComponent;
