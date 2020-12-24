import React, {Component} from 'react';
import {
  Pressable,
} from 'react-native';
import { AppContext } from '../../../AppProvider';
import { Styles } from "./topTab.style";
import { View, Text } from 'native-base';

/**
 * 
 * @param {*} props
 * 
 *  tabs [array]
 * 
 * onClick [function]
 * 
 */

class TopTab extends Component {
  static contextType = AppContext;
  
  constructor(props) {
    super(props);
    
    this.state = {
        activeTab: this.props.activeTab ? this.props.activeTab : 0
    };
  }

  set = (value) => {
      this.setState(value);
  }

  updateActiveTab = (index) => {
      this.set({activeTab: index});
  }

  pressableOnPress = (index) => {
    const activeTab = this.state.activeTab;
    if (activeTab != index) {
        this.updateActiveTab(index);
    }
    this.props.onClick && this.props.onClick(index);
  }

  render() {
      const activeTab = this.state.activeTab;
    return (
      <>
        <View style={[Styles.topTabParent, this.props.parentStyle]}>
            {
                this.props.tabs.map((tab, index) => {
                    return (
                        (activeTab == index) 
                        ?
                            <Pressable 
                                key={index} 
                                style={[Styles.sectionActive, this.props.section]}
                                onPress={() => this.pressableOnPress(index)}
                            >
                                <Text style={[Styles.sectionTextActive, this.props.sectionText]}>{tab}</Text>
                            </Pressable>
                        :
                            <Pressable 
                                key={index} 
                                style={[Styles.sectionInactive, this.props.section]}
                                onPress={() => this.pressableOnPress(index)}
                            >
                                <Text style={[Styles.sectionTextInactive, this.props.sectionText]}>{tab}</Text>
                            </Pressable>
                    );
                })
            }
        </View>
      </>
    );
  }
}

export default TopTab;
