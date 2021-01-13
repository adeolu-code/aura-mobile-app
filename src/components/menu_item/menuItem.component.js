import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Platform, TouchableWithoutFeedback } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { Styles } from './menuItem.style';
import { Button, Icon } from 'native-base';
import { consoleLog } from '../../utils';

export default class MenuItemComponent extends Component {
    constructor(props) {
        super(props);
        console.log("prop", props);
        this.state = {
            shown: false,
        };
    }

    render() {
        return (
            <View style={[Styles.parent, this.props.style]}>
                <TouchableOpacity onPress={() => this.setState({shown: !this.state.shown})} style={[{width:30, alignSelf: 'flex-end'}]}>
                    <Icon name="ios-menu" color={[ Styles.icon,this.props.color]} />

                </TouchableOpacity>
                {this.state.shown && 
                    // <View style={[{backgroundColor: colors.white, }]}>

                        <TouchableWithoutFeedback style={[Styles.absoluteParent,Styles.content, ]}>
                            <>
                            {this.props.items && this.props.items.map((item, index) => {
                                return (
                                    <Button transparent onPress={() => {
                                        this.props.onPress && this.props.onPress(index); this.setState({shown: false})
                                    }} style={[{paddingLeft: 10, paddingTop: 10, width: 100, height: 30, marginBottom: 5,  elevation: 5, zIndex: 10000}]}>
                                        <Text style={[Styles.itemText]}>{item}</Text>
                                    </Button>
                                );
                            })}
                            </>
                        </TouchableWithoutFeedback>
                    // </View>
                }
            </View>
        );
    }

}