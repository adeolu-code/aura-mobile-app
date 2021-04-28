import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity, Platform, TouchableWithoutFeedback } from 'react-native';
import { MyText } from '../../utils/Index';
import colors from '../../colors';

import Header from '../../components/Header';
import GStyles from '../../assets/styles/GeneralStyles';
import { Styles } from './menuItem.style';
import { Button, Icon } from 'native-base';
import { consoleLog } from '../../utils';
import {  Menu,  MenuOptions,  MenuOption, MenuTrigger,} from 'react-native-popup-menu';

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
            <View style={[Styles.parent, this.props.style ]}>
                <Menu style={[{ alignSelf: 'flex-end'}]}>
                    <MenuTrigger>
                        <View style={{ height: 40, width: 40, backgroundColor: colors.white, borderRadius: 5, justifyContent: 'center',alignItems: 'center', 
      borderWidth: 1, borderColor: colors.lightGrey, }}>
                            <Icon name="menu" style={{ fontSize: 27, color: colors.grey }} />
                        </View>
                    </MenuTrigger>
                    <MenuOptions style={{ paddingBottom: 10, borderRadius: 8,}} customStyles={{ optionsContainer: {
                            borderRadius: 8, padding: 5 },
                        }} >
                        <>
                            {this.props.items && this.props.items.map((item, index) => {
                                return (
                                    <MenuOption onSelect={() => {
                                        this.props.onPress && this.props.onPress(index); 
                                        this.setState({shown: false})
                                    }} style={[{paddingLeft: 10, paddingTop: 10, height: 30, marginBottom: 5,  elevation: 5, zIndex: 10000}]}>
                                        <MyText style={[Styles.itemText, GStyles.textH4Style]}>{item}</MyText>
                                    </MenuOption>
                                );
                            })}
                        </>
                    </MenuOptions>
                </Menu>
                
            </View>
        );
    }

}